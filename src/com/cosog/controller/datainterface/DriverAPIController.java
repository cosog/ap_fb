package com.cosog.controller.datainterface;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.ServletInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.TextMessage;

import com.cosog.controller.base.BaseController;
import com.cosog.model.AlarmShowStyle;
import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.calculate.TimeEffTotalResponseData;
import com.cosog.model.calculate.WellAcquisitionData;
import com.cosog.model.drive.AcqGroup;
import com.cosog.model.drive.AcqOnline;
import com.cosog.model.drive.AcquisitionGroupResolutionData;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.datainterface.CalculateDataService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.Config;
import com.cosog.utils.Config2;
import com.cosog.utils.Constants;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.ParamUtils;
import com.cosog.utils.StringManagerUtils;
import com.cosog.websocket.config.WebSocketByJavax;
import com.cosog.websocket.handler.SpringWebSocketHandler;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jxl.DateCell;
import jxl.Sheet;
import jxl.Workbook;

@Controller
@RequestMapping("/api")
@Scope("prototype")
public class DriverAPIController extends BaseController{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private CalculateDataService<?> calculateDataService;
	@Autowired
	private CommonDataService commonDataService;
	@Bean
    public static SpringWebSocketHandler infoHandler() {
        return new SpringWebSocketHandler();
    }
	@Bean
    public static WebSocketByJavax infoHandler2() {
        return new WebSocketByJavax();
    }
	
	
	@RequestMapping("/acq/allDeviceOffline")
	public String AllDeviceOffline() throws Exception {
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		String currentTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
		System.out.println(currentTime+"：ad未运行，所有井离线");
		String protocols="";
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			protocols+="'"+modbusProtocolConfig.getProtocol().get(i).getCode()+"'";
			if(i<modbusProtocolConfig.getProtocol().size()-1){
				protocols+=",";
			}
		}
		if(StringManagerUtils.isNotNull(protocols)){
			String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ "decode(t.devicetype,0,t2.commstatus,t3.commstatus) as commstatus,"
					+ "decode(t.devicetype,0,t2.commtime,t3.commtime) as commtime,"
					+ "decode(t.devicetype,0,t2.commtimeefficiency,t3.commtimeefficiency) as commtimeefficiency,"
					+ "decode(t.devicetype,0,t2.commrange,t3.commrange) as commrange,"
					+ "t.devicetype,t.id from TBL_WELLINFORMATION t "
					+ " left outer join tbl_pumpacqdata_latest  t2 on t.id=t2.wellid "
					+ " left outer join tbl_pipelineacqdata_latest t3 on t.id =t3.wellid"
					+ " where t.protocolcode in("+protocols+")"
					+ " and decode(t.devicetype,0,t2.commstatus,t3.commstatus)=1";
			List list = this.commonDataService.findCallSql(sql);
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				String wellId=obj[obj.length-1]+"";
				String devicetype=obj[obj.length-2]+"";
				
				String realtimeTable="tbl_pumpacqdata_latest";
				String historyTable="tbl_pumpacqdata_hist";
				if("0".equalsIgnoreCase(devicetype)){//如果是泵设备
					realtimeTable="tbl_pumpacqdata_latest";
					historyTable="tbl_pumpacqdata_hist";
				}else{//否则管设备
					realtimeTable="tbl_pipelineacqdata_latest";
					historyTable="tbl_yubingacqdata_hist";
				}
				CommResponseData commResponseData=null;
				String commRequest="{"
						+ "\"AKString\":\"\","
						+ "\"WellName\":\""+obj[0]+"\",";
				if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
					commRequest+= "\"Last\":{"
							+ "\"AcqTime\": \""+obj[1]+"\","
							+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
							+ "\"CommEfficiency\": {"
							+ "\"Efficiency\": "+obj[4]+","
							+ "\"Time\": "+obj[3]+","
							+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
							+ "}"
							+ "},";
				}	
				commRequest+= "\"Current\": {"
						+ "\"AcqTime\":\""+currentTime+"\","
						+ "\"CommStatus\":false"
						+ "}"
						+ "}";
				String commResponse="";
				commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
				type = new TypeToken<CommResponseData>() {}.getType();
				commResponseData=gson.fromJson(commResponse, type);
				String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(commResponseData.getCurrent().getCommStatus()?1:0);
				String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
				
				String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(commResponseData.getCurrent().getCommStatus()?1:0);
				String updateHistCommRangeClobSql="update "+historyTable+" t set t.commrange=?";
				List<String> clobCont=new ArrayList<String>();
				
				if(commResponseData!=null&&commResponseData.getResultStatus()==1){
					updateRealData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
							+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					updateHistData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
							+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					
					clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
				}
				updateRealData+=" where t.wellId= "+wellId;
				updateRealCommRangeClobSql+=" where t.wellId= "+wellId;
				
				updateHistData+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";
				updateHistCommRangeClobSql+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";;
				
				int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRealData);
				result=commonDataService.getBaseDao().updateOrDeleteBySql(updateHistData);
				if(commResponseData!=null&&commResponseData.getResultStatus()==1){
					result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRealCommRangeClobSql,clobCont);
					result=commonDataService.getBaseDao().executeSqlUpdateClob(updateHistCommRangeClobSql,clobCont);
				}
			}
		}
		
		String json = "{success:true,flag:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/acq/online")
	public String AcqOnlineData() throws Exception {
		ServletInputStream ss = request.getInputStream();
		Gson gson=new Gson();
		StringBuffer webSocketSendData = new StringBuffer();
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		String data=StringManagerUtils.convertStreamToString(ss,"utf-8");
		System.out.println("接收到ad推送online数据："+data);
		java.lang.reflect.Type type = new TypeToken<AcqOnline>() {}.getType();
		AcqOnline acqOnline=gson.fromJson(data, type);
		if(acqOnline!=null){
			String realtimeTable="";
			String historyTable="";
			String protocolSql="select t.devicetype"
					+ " from TBL_WELLINFORMATION t,tbl_acq_unit_conf t2  "
					+ " where t.unitcode=t2.unit_code"
					+ " and upper(t.protocolcode) not like '%KAFKA%' "
					+ " and upper(t.protocolcode) not like '%MQTT%' "
					+ " and t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
			List devicetypeList = this.commonDataService.findCallSql(protocolSql);	
			if(devicetypeList.size()>=0 && StringManagerUtils.isNotNull(devicetypeList.get(0)+"")){
				String devicetype=devicetypeList.get(0)+"";
				String functionCode="pumpDeviceRealTimeMonitoringData";
				if("0".equalsIgnoreCase(devicetype)){//如果是泵设备
					realtimeTable="tbl_pumpacqdata_latest";
					historyTable="tbl_pumpacqdata_hist";
					functionCode="pumpDeviceRealTimeMonitoringData";
				}else{//否则管设备
					realtimeTable="tbl_pipelineacqdata_latest";
					historyTable="tbl_yubingacqdata_hist";
					functionCode="pipelineDeviceRealTimeMonitoringData";
				}
				
				String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
						+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
						+ " t.id"
						+ " from TBL_WELLINFORMATION t,"+realtimeTable+"  t2 "
						+ " where t.id=t2.wellid"
						+ " and upper(t.protocolcode) not like '%KAFKA%' "
						+ " and upper(t.protocolcode) not like '%MQTT%' "
						+ " and t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
				List list = this.commonDataService.findCallSql(sql);
				if(list.size()>0){
					Object[] obj=(Object[]) list.get(0);
					webSocketSendData.append("{\"functionCode\":\""+functionCode+"\",");
					String currentTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
					CommResponseData commResponseData=null;
					String wellName=obj[0]+"";
					String wellId=obj[obj.length-1]+"";
					webSocketSendData.append("\"wellName\":\""+wellName+"\",");
					webSocketSendData.append("\"acqTime\":\""+currentTime+"\",");
					webSocketSendData.append("\"commStatus\":1");
					webSocketSendData.append("}");
					String commRequest="{"
							+ "\"AKString\":\"\","
							+ "\"WellName\":\""+wellName+"\",";
					if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
						commRequest+= "\"Last\":{"
								+ "\"AcqTime\": \""+obj[1]+"\","
								+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
								+ "\"CommEfficiency\": {"
								+ "\"Efficiency\": "+obj[4]+","
								+ "\"Time\": "+obj[3]+","
								+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
								+ "}"
								+ "},";
					}	
					commRequest+= "\"Current\": {"
							+ "\"AcqTime\":\""+currentTime+"\","
							+ "\"CommStatus\":"+acqOnline.getStatus()+""
							+ "}"
							+ "}";
					String commResponse="";
					commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
					type = new TypeToken<CommResponseData>() {}.getType();
					commResponseData=gson.fromJson(commResponse, type);
					String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(commResponseData.getCurrent().getCommStatus()?1:0);
					String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
					
					String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(commResponseData.getCurrent().getCommStatus()?1:0);
					String updateHistCommRangeClobSql="update "+historyTable+" t set t.commrange=?";
					List<String> clobCont=new ArrayList<String>();
					
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						updateRealData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
						updateHistData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
						
						clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
					}
					updateRealData+=" where t.wellId= "+wellId;
					updateRealCommRangeClobSql+=" where t.wellId= "+wellId;
					
					updateHistData+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";
					updateHistCommRangeClobSql+=" where t.wellId= "+wellId+" and t.acqtime=( select max(t2.acqtime) from "+historyTable+" t2 where t2.wellid=t.wellid )";;
					
					int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateRealData);
					result=commonDataService.getBaseDao().updateOrDeleteBySql(updateHistData);
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRealCommRangeClobSql,clobCont);
						result=commonDataService.getBaseDao().executeSqlUpdateClob(updateHistCommRangeClobSql,clobCont);
					}
					
					if(StringManagerUtils.isNotNull(webSocketSendData.toString())){
						infoHandler().sendMessageToUserByModule("ApWebSocketClient", new TextMessage(webSocketSendData.toString()));
						infoHandler2().sendMessageToBy("ApWebSocketClient", webSocketSendData.toString());
					}
				}
			}
		}
		String json = "{success:true,flag:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/acq/group")
	public String AcqGroupData() throws Exception{
		ServletInputStream ss = request.getInputStream();
		Gson gson=new Gson();
		String data=StringManagerUtils.convertStreamToString(ss,"utf-8");
		System.out.println(StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"接收到ad推送group数据："+data);
		java.lang.reflect.Type type = new TypeToken<AcqGroup>() {}.getType();
		AcqGroup acqGroup=gson.fromJson(data, type);
		String json = "{success:true,flag:true}";
		if(acqGroup!=null){
			String sql="select t.wellname ,t2.protocol"
					+ " from TBL_WELLINFORMATION t,tbl_acq_unit_conf t2  "
					+ " where t.unitcode=t2.unit_code"
					+ " and upper(t.protocolcode) not like '%KAFKA%' "
					+ " and upper(t.protocolcode) not like '%MQTT%' "
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave();
			List list = this.commonDataService.findCallSql(sql);
			if(list.size()>0){
				Object[] obj=(Object[]) list.get(0);
				String wellName=obj[0]+"";
				String protocolName=obj[1]+"";
				if("A11-Modbus".equalsIgnoreCase(protocolName)){
//					this.DataProcessing_A11(acqGroup, protocolName);
				}
//				else if("private-lq1000".equalsIgnoreCase(protocolName) || "private-kd93".equalsIgnoreCase(protocolName)){
//					this.DataProcessing_Pump(acqGroup, protocolName);
//				}
				else{
					this.DataProcessing_Pump(acqGroup, protocolName);
				}
			}
		}else{
			json = "{success:true,flag:false}";
		}
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	};
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String DataProcessing_Pump(AcqGroup acqGroup,String protocolName) throws Exception{
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		StringBuffer webSocketSendData = new StringBuffer();
		StringBuffer info_json = new StringBuffer();
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			EquipmentDriverServerTask.initAlarmStyle();
			alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		}
		if(acqGroup!=null){
			boolean ifAddDay=false;
			String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
					+ " t.devicetype,"
					+ " t.id"
					+ " from TBL_WELLINFORMATION t,tbl_pumpacqdata_latest  t2  "
					+ " where t.id=t2.wellid "
					+ " and upper(t.protocolcode) not like '%KAFKA%' "
					+ " and upper(t.protocolcode) not like '%MQTT%' "
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave();
			List list = commonDataService.findCallSql(sql);
			if(list.size()>0){
				Object[] obj=(Object[]) list.get(0);
				String wellName=obj[0]+"";
				String acqTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
				String devicetype=obj[obj.length-2]+"";
				String wellId=obj[obj.length-1]+"";
				
				String realtimeTable="tbl_pumpacqdata_latest";
				String historyTable="tbl_pumpacqdata_hist";
				String functionCode="pumpDeviceRealTimeMonitoringData";
				if("0".equalsIgnoreCase(devicetype)){
					realtimeTable="tbl_pumpacqdata_latest";
					historyTable="tbl_pumpacqdata_hist";
					functionCode="pumpDeviceRealTimeMonitoringData";
				}else{
					realtimeTable="tbl_pipelineacqdata_latest";
					historyTable="tbl_yubingacqdata_hist";
					functionCode="pipelineDeviceRealTimeMonitoringData";
				}
				
				String acqColumnsSql="select v1.COLUMN_NAME from "
						+ " (select * from user_tab_cols t where t.TABLE_NAME=UPPER('"+realtimeTable+"')) v1,"
						+ " (select * from user_tab_cols t where t.TABLE_NAME=UPPER('"+historyTable+"')) v2 "
						+ " where v1.COLUMN_NAME=v2.COLUMN_NAME and v1.COLUMN_NAME like 'ADDR%' "
						+ " order by v1.COLUMN_ID";
				List<String> columnsList = commonDataService.findCallSql(acqColumnsSql);
				
				
				Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
				if(equipmentDriveMap.size()==0){
					EquipmentDriverServerTask.loadProtocolConfig();
					equipmentDriveMap = EquipmentDriveMap.getMapObject();
				}
				ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
				
				ModbusProtocolConfig.Protocol protocol=null;
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(protocolName.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getName())){
						protocol=modbusProtocolConfig.getProtocol().get(i);
						break;
					}
				}
				if(protocol!=null){
					//通信计算
					CommResponseData commResponseData=null;
					String commRequest="{"
							+ "\"AKString\":\"\","
							+ "\"WellName\":\""+wellName+"\",";
					if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
						commRequest+= "\"Last\":{"
								+ "\"AcqTime\": \""+obj[1]+"\","
								+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
								+ "\"CommEfficiency\": {"
								+ "\"Efficiency\": "+obj[4]+","
								+ "\"Time\": "+obj[3]+","
								+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
								+ "}"
								+ "},";
					}	
					commRequest+= "\"Current\": {"
							+ "\"AcqTime\":\""+acqTime+"\","
							+ "\"CommStatus\":true"
							+ "}"
							+ "}";
					String commResponse="";
					commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
					type = new TypeToken<CommResponseData>() {}.getType();
					commResponseData=gson.fromJson(commResponse, type);
					
					
					String updateRealtimeData="update "+realtimeTable+" t set t.acqTime=to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),t.CommStatus=1";
					String insertHistColumns="wellid,acqTime,CommStatus";
					String insertHistValue=wellId+",to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),1";
					String insertHistSql="";
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						updateRealtimeData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
						insertHistColumns+=",commTimeEfficiency,commTime";
						insertHistValue+=","+commResponseData.getCurrent().getCommEfficiency().getEfficiency()+","+commResponseData.getCurrent().getCommEfficiency().getTime();
					}
					
					List<String> columnsNameList=new ArrayList<String>();
					List<String> valueList=new ArrayList<String>();
					List<String> columnsDataTypeList=new ArrayList<String>();
					
					for(int i=0;acqGroup.getAddr()!=null && acqGroup.getValue()!=null  &&i<acqGroup.getAddr().size();i++){
						for(int j=0;acqGroup.getValue().get(i)!=null && j<protocol.getItems().size();j++){
							if(acqGroup.getAddr().get(i)==protocol.getItems().get(j).getAddr()){
								String columnName="ADDR"+protocol.getItems().get(j).getAddr();
								String value=StringManagerUtils.objectListToString(acqGroup.getValue().get(i), protocol.getItems().get(j).getIFDataType());
								if(StringManagerUtils.existOrNot(columnsList, columnName, false)){
									updateRealtimeData+=",t."+columnName+"='"+value+"'";
									insertHistColumns+=","+columnName;
									insertHistValue+=",'"+value+"'";
									
									columnsNameList.add(protocol.getItems().get(j).getTitle());
									valueList.add(value);
									columnsDataTypeList.add(protocol.getItems().get(j).getIFDataType());
								}
								
								break;
							}
						}
					}
					
					updateRealtimeData+=" where t.wellId= "+wellId;
					
					insertHistSql="insert into "+historyTable+"("+insertHistColumns+")values("+insertHistValue+")";
					
					commonDataService.getBaseDao().updateOrDeleteBySql(updateRealtimeData);
					commonDataService.getBaseDao().updateOrDeleteBySql(insertHistSql);
					
					//更新clob类型数据  运行区间
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						List<String> clobCont=new ArrayList<String>();
						String updateRunRangeClobSql="update "+realtimeTable+" t set t.commrange=? where t.wellId= "+wellId;
						String updateRunRangeClobSql_Hist="update "+historyTable+" t set t.commrange=? where t.wellId= "+wellId+" and t.acqTime=to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss')"; 
						
						clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
						int result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRunRangeClobSql,clobCont);
						result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRunRangeClobSql_Hist,clobCont);
					}
					
					//处理websocket推送
					int items=4;
					String columns = "[";
					for(int i=1;i<=items;i++){
						columns+= "{ \"header\":\"名称\",\"dataIndex\":\"name"+i+"\",children:[] },"
								+ "{ \"header\":\"变量\",\"dataIndex\":\"value"+i+"\",children:[] }";
						if(i<items){
							columns+=",";
						}
					}
					columns+= "]";
					webSocketSendData.append("{ \"success\":true,\"functionCode\":\""+functionCode+"\",\"wellName\":\""+wellName+"\",\"acqTime\":\""+acqTime+"\",\"columns\":"+columns+",");
					webSocketSendData.append("\"totalRoot\":[");
					info_json.append("[");
					webSocketSendData.append("{\"name1\":\""+wellName+":"+acqTime+",在线\"},");
					int row=1;
					if(valueList.size()%items==0){
						row=valueList.size()/items+1;
					}else{
						row=valueList.size()/items+2;
					}
					
					for(int j=1;j<row;j++){
						webSocketSendData.append("{");
						for(int k=0;k<items;k++){
							int index=items*(j-1)+k;
							String columnName="";
							String value="";
							String column="";
							String columnDataType="";
							int alarmLevel=0;
							if(index<columnsNameList.size()){
								columnName=columnsNameList.get(index);
								value=valueList.get(index);
								column=columnsList.get(index);
								columnDataType=columnsDataTypeList.get(index);
							}
							if(StringManagerUtils.stringToFloat(value)>2){
								alarmLevel=100;
							}
							webSocketSendData.append("\"name"+(k+1)+"\":\""+columnName+"\",");
							webSocketSendData.append("\"value"+(k+1)+"\":\""+value+"\",");
							info_json.append("{\"row\":"+j+",\"col\":"+k+",\"columnName\":\""+columnName+"\",\"column\":\""+column+"\",\"columnDataType\":\""+columnDataType+"\",\"alarmLevel\":"+alarmLevel+"},");
						}
						if(webSocketSendData.toString().endsWith(",")){
							webSocketSendData.deleteCharAt(webSocketSendData.length() - 1);
						}
						webSocketSendData.append("},");
					}
					if(webSocketSendData.toString().endsWith(",")){
						webSocketSendData.deleteCharAt(webSocketSendData.length() - 1);
					}
					
					if(info_json.toString().endsWith(",")){
						info_json.deleteCharAt(info_json.length() - 1);
					}
					info_json.append("]");
					
					webSocketSendData.append("]");
					webSocketSendData.append(",\"CellInfo\":"+info_json);
					webSocketSendData.append(",\"AlarmShowStyle\":"+new Gson().toJson(alarmShowStyle)+"}");
//					System.out.println(webSocketSendData.toString());
					infoHandler().sendMessageToUserByModule("ApWebSocketClient", new TextMessage(webSocketSendData.toString()));
					infoHandler2().sendMessageToBy("ApWebSocketClient", webSocketSendData.toString());
				}
			}
		}
		return null;
	}
	
	public String DataProcessing_Unknown(AcqGroup acqGroup,String protocolName) throws Exception{
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		
		
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		ModbusProtocolConfig.Protocol protocol=null;
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			if(protocolName.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getName())){
				protocol=modbusProtocolConfig.getProtocol().get(i);
				break;
			}
		}

		String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
				+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange"
				+ " from TBL_WELLINFORMATION t,tbl_rpc_discrete_latest  t2 "
				+ " where t.id=t2.wellid"
				+ " and upper(t.protocolcode) not like '%KAFKA%' "
				+ " and upper(t.protocolcode) not like '%MQTT%' "
//				+ " and t.protocolcode ='"+(protocol!=null?protocol.getCode():"")+"'"
				+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave();
		List list = this.commonDataService.findCallSql(sql);
		if(list.size()>0){
			Object[] obj=(Object[]) list.get(0);
			String currentTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
			CommResponseData commResponseData=null;
			String commRequest="{"
					+ "\"AKString\":\"\","
					+ "\"WellName\":\""+obj[0]+"\",";
			if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[5]))){
				commRequest+= "\"Last\":{"
						+ "\"AcqTime\": \""+obj[1]+"\","
						+ "\"CommStatus\": "+("1".equals(obj[2]+"")?true:false)+","
						+ "\"CommEfficiency\": {"
						+ "\"Efficiency\": "+obj[4]+","
						+ "\"Time\": "+obj[3]+","
						+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[5]))+""
						+ "}"
						+ "},";
			}	
			commRequest+= "\"Current\": {"
					+ "\"AcqTime\":\""+currentTime+"\","
					+ "\"CommStatus\":true"
					+ "}"
					+ "}";
			String commResponse="";
			commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
			type = new TypeToken<CommResponseData>() {}.getType();
			commResponseData=gson.fromJson(commResponse, type);
			String updateDiscreteData="update tbl_rpc_discrete_latest t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(commResponseData.getCurrent().getCommStatus()?1:0);
			String updateCommRangeClobSql="update tbl_rpc_discrete_latest t set t.commrange=?";
			List<String> clobCont=new ArrayList<String>();
			
			if(commResponseData!=null&&commResponseData.getResultStatus()==1){
				updateDiscreteData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
						+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
				clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
				//跨天
				if(commResponseData.getDaily()!=null&&StringManagerUtils.isNotNull(commResponseData.getDaily().getDate())){
					updateDiscreteData+=",t.runTime=0,t.runTimeEfficiency=0";
					updateCommRangeClobSql+=",t.runRange=?";
					clobCont.add("");
				}
			}
			updateDiscreteData+=" where t.wellId= (select t2.id from tbl_wellinformation t2 where t2.wellName='"+commResponseData.getWellName()+"') ";
			updateCommRangeClobSql+=" where t.wellId= (select t2.id from tbl_wellinformation t2 where t2.wellName='"+commResponseData.getWellName()+"') ";
			int result=commonDataService.getBaseDao().updateOrDeleteBySql(updateDiscreteData);
			if(commResponseData!=null&&commResponseData.getResultStatus()==1){
				result=commonDataService.getBaseDao().executeSqlUpdateClob(updateCommRangeClobSql,clobCont);
			}
		}
	
		return null;
	}
}
