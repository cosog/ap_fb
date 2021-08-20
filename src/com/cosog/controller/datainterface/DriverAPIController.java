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
import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.ElectricCalculateResponseData;
import com.cosog.model.calculate.EnergyCalculateResponseData;
import com.cosog.model.calculate.PCPCalculateRequestData;
import com.cosog.model.calculate.PCPCalculateResponseData;
import com.cosog.model.calculate.RPCCalculateResponseData;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.calculate.TimeEffTotalResponseData;
import com.cosog.model.calculate.TotalAnalysisRequestData;
import com.cosog.model.calculate.TotalAnalysisResponseData;
import com.cosog.model.calculate.TotalCalculateRequestData;
import com.cosog.model.calculate.TotalCalculateResponseData;
import com.cosog.model.calculate.WellAcquisitionData;
import com.cosog.model.drive.AcqGroup;
import com.cosog.model.drive.AcqOnline;
import com.cosog.model.drive.AcquisitionGroupResolutionData;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.datainterface.CalculateDataService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.thread.calculate.CalculateThread;
import com.cosog.thread.calculate.TotalCalculateThread;
import com.cosog.utils.Config;
import com.cosog.utils.Config2;
import com.cosog.utils.Constants;
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
					+ " left outer join tbl_tubingacqdata_latest t3 on t.id =t3.wellid"
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
					realtimeTable="tbl_tubingacqdata_latest";
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
				if("0".equalsIgnoreCase(devicetype)){//如果是泵设备
					realtimeTable="tbl_pumpacqdata_latest";
					historyTable="tbl_pumpacqdata_hist";
				}else{//否则管设备
					realtimeTable="tbl_tubingacqdata_latest";
					historyTable="tbl_yubingacqdata_hist";
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
					webSocketSendData.append("{\"functionCode\":\"pumpDeviceRealTimeMonitoringStatusData\",");
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
					this.DataProcessing_A11(acqGroup, protocolName);
				}else if("private-lq1000".equalsIgnoreCase(protocolName) || "private-kd93".equalsIgnoreCase(protocolName)){
					this.DataProcessing_Pump(acqGroup, protocolName);
				}
				else{
					this.DataProcessing_Unknown(acqGroup, protocolName);
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
				
				if("0".equalsIgnoreCase(devicetype)){
					realtimeTable="tbl_pumpacqdata_latest";
					historyTable="tbl_pumpacqdata_hist";
				}else{
					realtimeTable="tbl_tubingacqdata_latest";
					historyTable="tbl_yubingacqdata_hist";
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
					for(int i=0;acqGroup.getAddr()!=null && acqGroup.getValue()!=null  &&i<acqGroup.getAddr().size();i++){
						for(int j=0;acqGroup.getValue().get(i)!=null && j<protocol.getItems().size();j++){
							if(acqGroup.getAddr().get(i)==protocol.getItems().get(j).getAddr()){
								String itemName=protocol.getItems().get(j).getName();
								String columnName="ADDR"+protocol.getItems().get(j).getAddr();
								String value=StringManagerUtils.objectListToString(acqGroup.getValue().get(i), protocol.getItems().get(j).getIFDataType());
								if(StringManagerUtils.existOrNot(columnsList, columnName, false)){
									updateRealtimeData+=",t."+columnName+"='"+value+"'";
									insertHistColumns+=","+columnName;
									insertHistValue+=",'"+value+"'";
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
				}
			}
		}
		return null;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String DataProcessing_Tubing(AcqGroup acqGroup,String protocolName) throws Exception{
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		
		if(acqGroup!=null){
			boolean ifAddDay=false;
			String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
					+ " t.id"
					+ " from TBL_WELLINFORMATION t,tbl_tubingacqdata_latest  t2  "
					+ " where t.id=t2.wellid "
					+ " and upper(t.protocolcode) not like '%KAFKA%' "
					+ " and upper(t.protocolcode) not like '%MQTT%' "
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave();
			
			String acqColumnsSql="select v1.COLUMN_NAME from "
					+ " (select * from user_tab_cols t where t.TABLE_NAME=UPPER('tbl_tubingacqdata_latest')) v1,"
					+ " (select * from user_tab_cols t where t.TABLE_NAME=UPPER('tbl_tubingacqdata_hist')) v2 "
					+ " where v1.COLUMN_NAME=v2.COLUMN_NAME and v1.COLUMN_NAME like 'ADDR%' "
					+ " order by v1.COLUMN_ID";
			
			List list = commonDataService.findCallSql(sql);
			List<String> columnsList = commonDataService.findCallSql(acqColumnsSql);
			if(list.size()>0){
				Object[] obj=(Object[]) list.get(0);
				String wellName=obj[0]+"";
				String acqTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
				String wellId=obj[obj.length-1]+"";
				
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
					
					
					String updateRealtimeData="update tbl_tubingacqdata_latest t set t.acqTime=to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),t.CommStatus=1";
					String insertHistColumns="wellid,acqTime,CommStatus";
					String insertHistValue=wellId+",to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss'),1";
					String insertHistSql="";
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						updateRealtimeData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
						insertHistColumns+=",commTimeEfficiency,commTime";
						insertHistValue+=","+commResponseData.getCurrent().getCommEfficiency().getEfficiency()+","+commResponseData.getCurrent().getCommEfficiency().getTime();
					}
					for(int i=0;acqGroup.getAddr()!=null && acqGroup.getValue()!=null  &&i<acqGroup.getAddr().size();i++){
						for(int j=0;acqGroup.getValue().get(i)!=null && j<protocol.getItems().size();j++){
							if(acqGroup.getAddr().get(i)==protocol.getItems().get(j).getAddr()){
								String itemName=protocol.getItems().get(j).getName();
								String columnName="ADDR"+protocol.getItems().get(j).getAddr();
								String value=StringManagerUtils.objectListToString(acqGroup.getValue().get(i), protocol.getItems().get(j).getIFDataType());
								if(StringManagerUtils.existOrNot(columnsList, columnName, false)){
									updateRealtimeData+=",t."+columnName+"='"+value+"'";
									insertHistColumns+=","+columnName;
									insertHistValue+=",'"+value+"'";
								}
								break;
							}
						}
					}
					
					updateRealtimeData+=" where t.wellId= "+wellId;
					
					insertHistSql="insert into tbl_tubingacqdata_hist("+insertHistColumns+")values("+insertHistValue+")";
					
					commonDataService.getBaseDao().updateOrDeleteBySql(updateRealtimeData);
					commonDataService.getBaseDao().updateOrDeleteBySql(insertHistSql);
					
					//更新clob类型数据  运行区间
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						List<String> clobCont=new ArrayList<String>();
						String updateRunRangeClobSql="update tbl_tubingacqdata_latest t set t.commrange=? where t.wellId= "+wellId;
						String updateRunRangeClobSql_Hist="update tbl_tubingacqdata_hist t set t.commrange=? where t.wellId= "+wellId+" and t.acqTime=to_date('"+acqTime+"','yyyy-mm-dd hh24:mi:ss')"; 
						
						clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
						int result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRunRangeClobSql,clobCont);
						result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRunRangeClobSql_Hist,clobCont);
					}
				}
			}
		}
		return null;
	}
	
	public String DataProcessing_A11(AcqGroup acqGroup,String protocolName) throws Exception{
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String tiemEffUrl=Config.getInstance().configFile.getAgileCalculate().getRun()[0];
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		String energyUrl=Config.getInstance().configFile.getAgileCalculate().getEnergy()[0];
		String FESdiagramCalculateHttpServerURL=Config.getInstance().configFile.getAgileCalculate().getFESDiagram()[0];
		
		AcquisitionGroupResolutionData acquisitionGroupResolutionData=new AcquisitionGroupResolutionData();
		acquisitionGroupResolutionData.setSDiagram(new ArrayList<String>());
		acquisitionGroupResolutionData.setFDiagram(new ArrayList<String>());
		acquisitionGroupResolutionData.setIDiagram(new ArrayList<String>());
		acquisitionGroupResolutionData.setWattDiagram(new ArrayList<String>());
		if(acqGroup!=null){
			boolean isRunStatusData=false;
			boolean isDistreteData=false;
			boolean isEnergyData=false;
			boolean isProductionData=false;
			boolean isFESDiagramData=false;
			boolean isScrewPumpDataData=false;
			boolean ifAddDay=false;
			String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
					+ " t2.runstatus,t2.runtime,t2.runtimeefficiency,t2.runrange,"
					+ " t2.totalKWattH,t2.totalPKWattH,t2.totalNKWattH,t2.totalKVarH,t2.totalpKVarH,t2.totalNKVarH,t2.totalKVAH,"
					+ " t2.todayKWattH,t2.todayPKWattH,t2.todayNKWattH,t2.todayKVarH,t2.todaypKVarH,t2.todayNKVarH,t2.todayKVAH,"
					+ " t.id"
					+ " from TBL_WELLINFORMATION t,tbl_rpc_discrete_latest  t2  "
					+ " where t.id=t2.wellid "
					+ " and upper(t.protocolcode) not like '%KAFKA%' "
					+ " and upper(t.protocolcode) not like '%MQTT%' "
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave();
			List list = commonDataService.findCallSql(sql);
			if(list.size()>0){
				Object[] obj=(Object[]) list.get(0);
				String wellName=obj[0]+"";
				acquisitionGroupResolutionData.setAcqTime(StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss"));
				acquisitionGroupResolutionData.setWellName(wellName);
				acquisitionGroupResolutionData.setWellId(StringManagerUtils.stringToInteger(obj[24]+""));
				
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
							+ "\"WellName\":\""+acquisitionGroupResolutionData.getWellName()+"\",";
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
							+ "\"AcqTime\":\""+acquisitionGroupResolutionData.getAcqTime()+"\","
							+ "\"CommStatus\":true"
							+ "}"
							+ "}";
					String commResponse="";
					commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
					type = new TypeToken<CommResponseData>() {}.getType();
					commResponseData=gson.fromJson(commResponse, type);
					
					String updateDailyData="";
					String updateProdData="update tbl_rpc_productiondata_latest t set t.acqTime=to_date('"+acquisitionGroupResolutionData.getAcqTime()+"','yyyy-mm-dd hh24:mi:ss')";
					String updateDiscreteData="update tbl_rpc_discrete_latest t set t.CommStatus=1,t.acqTime=to_date('"+acquisitionGroupResolutionData.getAcqTime()+"','yyyy-mm-dd hh24:mi:ss')";
					if(commResponseData!=null&&commResponseData.getResultStatus()==1){
						updateDiscreteData+=",t.commTimeEfficiency= "+commResponseData.getCurrent().getCommEfficiency().getEfficiency()
								+ " ,t.commTime= "+commResponseData.getCurrent().getCommEfficiency().getTime();
					}
					for(int i=0;acqGroup.getAddr()!=null && acqGroup.getValue()!=null  &&i<acqGroup.getAddr().size();i++){
						for(int j=0;acqGroup.getValue().get(i)!=null && j<protocol.getItems().size();j++){
							if(acqGroup.getAddr().get(i)>0 && acqGroup.getAddr().get(i)==protocol.getItems().get(j).getAddr()){
								String itemName=protocol.getItems().get(j).getName();
								if("RunStatus".equalsIgnoreCase(itemName)){//运行状态
									acquisitionGroupResolutionData.setRunStatus(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.RunStatus= "+acquisitionGroupResolutionData.getRunStatus();
									isRunStatusData=true;
									isDistreteData=true;
								}else if("IA".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setIA(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.Ia= "+acquisitionGroupResolutionData.getIA();
									isDistreteData=true;
								}else if("IB".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setIB(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.Ib= "+acquisitionGroupResolutionData.getIB();
									isDistreteData=true;
								}else if("IC".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setIC(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.Ic= "+acquisitionGroupResolutionData.getIC();
									isDistreteData=true;
								}else if("VA".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setVA(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.Va= "+acquisitionGroupResolutionData.getVA();
									isDistreteData=true;
								}else if("VB".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setVB(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.Vb= "+acquisitionGroupResolutionData.getVB();
									isDistreteData=true;
								}else if("VC".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setVC(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.Vc= "+acquisitionGroupResolutionData.getVC();
									isDistreteData=true;
								}else if("KWattH".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setKWattH(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isEnergyData=true;
									isDistreteData=true;
								}else if("KVarH".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setKVarH(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isEnergyData=true;
									isDistreteData=true;
								}else if("Watt3".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setWatt3(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.watt3= "+acquisitionGroupResolutionData.getWatt3();
									isDistreteData=true;
								}else if("Var3".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setVar3(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.var3= "+acquisitionGroupResolutionData.getVar3();
									isDistreteData=true;
								}else if("ReversePower".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setReversePower(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isDistreteData=true;
								}else if("PF3".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setPF3(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.pf3= "+acquisitionGroupResolutionData.getPF3();
									isDistreteData=true;
								}else if("RunFrequency".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setRunFrequency(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.RunFrequency= "+acquisitionGroupResolutionData.getRunFrequency();
									isDistreteData=true;
								}else if("SetFrequency".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setSetFrequency(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateDiscreteData+=",t.SetFrequency= "+acquisitionGroupResolutionData.getSetFrequency();
									isDistreteData=true;
								}else if("TubingPressure".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setTubingPressure(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateProdData+=",t.TubingPressure="+acquisitionGroupResolutionData.getTubingPressure();
									isProductionData=true;
								}else if("CasingPressure".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setCasingPressure(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateProdData+=",t.CasingPressure="+acquisitionGroupResolutionData.getCasingPressure();
									isProductionData=true;
								}else if("BackPressure".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setBackPressure(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isProductionData=true;
								}else if("WellHeadFluidTemperature".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setWellHeadFluidTemperature(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateProdData+=",t.WellHeadFluidTemperature="+acquisitionGroupResolutionData.getWellHeadFluidTemperature();
									isProductionData=true;
								}else if("ProducingfluidLevel".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setProducingfluidLevel(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateProdData+=",t.ProducingfluidLevel="+acquisitionGroupResolutionData.getProducingfluidLevel();
									isProductionData=true;
								}else if("WaterCut".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setWaterCut(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									updateProdData+=",t.volumeWaterCut="+acquisitionGroupResolutionData.getWaterCut();
									isProductionData=true;
								}else if("RPM".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setRPM(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isScrewPumpDataData=true;
								}else if("Torque".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setTorque(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isScrewPumpDataData=true;
								}else if("FESDiagramAcquisitionInterval".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setFESDiagramAcquisitionInterval(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isFESDiagramData=true;
								}else if("FESDiagramSetPointCount".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setFESDiagramSetPointCount(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isFESDiagramData=true;
								}else if("FESDiagramPointCount".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setFESDiagramPointCount(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isFESDiagramData=true;
								}else if("FESDiagramAcqTime".equalsIgnoreCase(itemName)){
									String FESDiagramAcqTime=StringManagerUtils.BCD2TimeString(StringManagerUtils.hexStringToBytes(acqGroup.getValue().get(i).get(0)+""), 0);
									acquisitionGroupResolutionData.setFESDiagramAcqTime(FESDiagramAcqTime);
									isFESDiagramData=true;
								}else if("SPM".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setSPM(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isFESDiagramData=true;
								}else if("Stroke".equalsIgnoreCase(itemName)){
									acquisitionGroupResolutionData.setStroke(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(0), protocol.getItems().get(j).getIFDataType()));
									isFESDiagramData=true;
								}else if("SDiagram".equalsIgnoreCase(itemName)){
									int point=acqGroup.getValue().get(i).size();
									if(acquisitionGroupResolutionData.getFESDiagramPointCount()!=null && StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())>0){
										if(StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())<point){
											point=StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount());
										}
									}
									for(int k=0;k<point;k++){
										acquisitionGroupResolutionData.getSDiagram().add(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(k), protocol.getItems().get(j).getIFDataType()));
									}
									isFESDiagramData=true;
								}else if("FDiagram".equalsIgnoreCase(itemName)){
									int point=acqGroup.getValue().get(i).size();
									if(acquisitionGroupResolutionData.getFESDiagramPointCount()!=null && StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())>0){
										if(StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())<point){
											point=StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount());
										}
									}
									for(int k=0;k<point;k++){
										acquisitionGroupResolutionData.getFDiagram().add(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(k), protocol.getItems().get(j).getIFDataType()));
									}
									isFESDiagramData=true;
								}else if("IDiagram".equalsIgnoreCase(itemName)){
									int point=acqGroup.getValue().get(i).size();
									if(acquisitionGroupResolutionData.getFESDiagramPointCount()!=null && StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())>0){
										if(StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())<point){
											point=StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount());
										}
									}
									for(int k=0;k<point;k++){
										acquisitionGroupResolutionData.getIDiagram().add(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(k), protocol.getItems().get(j).getIFDataType()));
									}
									isFESDiagramData=true;
								}else if("WattDiagram".equalsIgnoreCase(itemName)){
									int point=acqGroup.getValue().get(i).size();
									if(acquisitionGroupResolutionData.getFESDiagramPointCount()!=null && StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())>0){
										if(StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount())<point){
											point=StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getFESDiagramPointCount());
										}
									}
									for(int k=0;k<point;k++){
										acquisitionGroupResolutionData.getWattDiagram().add(StringManagerUtils.objectToString(acqGroup.getValue().get(i).get(k), protocol.getItems().get(j).getIFDataType()));
									}
									isFESDiagramData=true;
								}
								break;
							}
						}
					}
					
					//判断是否采集了运行状态，如采集则进行时率计算
					TimeEffResponseData timeEffResponseData=null;
					if(isRunStatusData){
						String tiemEffRequest="{"
								+ "\"AKString\":\"\","
								+ "\"WellName\":\""+acquisitionGroupResolutionData.getWellName()+"\",";
						if(StringManagerUtils.isNotNull(obj[1]+"")&&StringManagerUtils.isNotNull(StringManagerUtils.CLOBObjectToString(obj[9]))){
							tiemEffRequest+= "\"Last\":{"
									+ "\"AcqTime\": \""+obj[1]+"\","
									+ "\"RunStatus\": "+("1".equals(obj[6]+"")?true:false)+","
									+ "\"RunEfficiency\": {"
									+ "\"Efficiency\": "+obj[8]+","
									+ "\"Time\": "+obj[7]+","
									+ "\"Range\": "+StringManagerUtils.getWellRuningRangeJson(StringManagerUtils.CLOBObjectToString(obj[9]))+""
									+ "}"
									+ "},";
						}	
						tiemEffRequest+= "\"Current\": {"
								+ "\"AcqTime\":\""+acquisitionGroupResolutionData.getAcqTime()+"\","
								+ "\"RunStatus\":"+(StringManagerUtils.stringToInteger(acquisitionGroupResolutionData.getRunStatus())==1?true:false)+""
								+ "}"
								+ "}";
						String timeEffResponse="";
						timeEffResponse=StringManagerUtils.sendPostMethod(tiemEffUrl, tiemEffRequest,"utf-8");
						type = new TypeToken<TimeEffResponseData>() {}.getType();
						timeEffResponseData=gson.fromJson(timeEffResponse, type);
						
						if(timeEffResponseData!=null&&timeEffResponseData.getResultStatus()==1){
							updateDiscreteData+=",t.runTimeEfficiency= "+timeEffResponseData.getCurrent().getRunEfficiency().getEfficiency()
								+ " ,t.runTime= "+timeEffResponseData.getCurrent().getRunEfficiency().getTime();
							if(timeEffResponseData.getDaily()!=null&&StringManagerUtils.isNotNull(timeEffResponseData.getDaily().getDate())){
								ifAddDay=true;
							}
						}
					}
					
					//判断是否采集了电量，如采集则进行电量计算
					EnergyCalculateResponseData energyCalculateResponseData=null;
					if(isEnergyData){
						String energyRequest="{"
								+ "\"AKString\":\"\","
								+ "\"WellName\":\""+acquisitionGroupResolutionData.getWellName()+"\",";
						if(StringManagerUtils.isNotNull(obj[1]+"")){
							energyRequest+= "\"Last\":{"
									+ "\"AcqTime\": \""+obj[1]+"\","
									+ "\"Total\":{"
									+ "\"KWattH\":"+obj[10]+","
									+ "\"PKWattH\":"+obj[11]+","
									+ "\"NKWattH\":"+obj[12]+","
									+ "\"KVarH\":"+obj[13]+","
									+ "\"PKVarH\":"+obj[14]+","
									+ "\"NKVarH\":"+obj[15]+","
									+ "\"KVAH\":"+obj[16]+""
									+ "},\"Today\":{"
									+ "\"KWattH\":"+obj[17]+","
									+ "\"PKWattH\":"+obj[18]+","
									+ "\"NKWattH\":"+obj[19]+","
									+ "\"KVarH\":"+obj[20]+","
									+ "\"PKVarH\":"+obj[21]+","
									+ "\"NKVarH\":"+obj[22]+","
									+ "\"KVAH\":"+obj[23]+""
									+ "}"
									+ "},";
						}	
						energyRequest+= "\"Current\": {"
								+ "\"AcqTime\":\""+acquisitionGroupResolutionData.getAcqTime()+"\","
								+ "\"Total\":{"
								+ "\"KWattH\":"+acquisitionGroupResolutionData.getKWattH()+","
								+ "\"KVarH\":"+acquisitionGroupResolutionData.getKVarH()
								+ "}"
								+ "}"
								+ "}";
						String energyResponse=StringManagerUtils.sendPostMethod(energyUrl, energyRequest,"utf-8");
						type = new TypeToken<EnergyCalculateResponseData>() {}.getType();
						
						energyCalculateResponseData=gson.fromJson(energyResponse, type);
						if(energyCalculateResponseData!=null&&energyCalculateResponseData.getResultStatus()==1){
							updateDiscreteData+=",t.TotalKWattH= "+energyCalculateResponseData.getCurrent().getTotal().getKWattH()
									+ ",t.TotalPKWattH= "+energyCalculateResponseData.getCurrent().getTotal().getPKWattH()
									+ ",t.TotalNKWattH= "+energyCalculateResponseData.getCurrent().getTotal().getNKWattH()
									+ ",t.TotalKVarH= "+energyCalculateResponseData.getCurrent().getTotal().getKVarH()
									+ ",t.TotalPKVarH= "+energyCalculateResponseData.getCurrent().getTotal().getPKVarH()
									+ ",t.TotalNKVarH= "+energyCalculateResponseData.getCurrent().getTotal().getNKVarH()
									+ ",t.TotalKVAH= "+energyCalculateResponseData.getCurrent().getTotal().getKVAH()
									
									+ ",t.TodayKWattH= "+energyCalculateResponseData.getCurrent().getToday().getKWattH()
									+ ",t.TodayPKWattH= "+energyCalculateResponseData.getCurrent().getToday().getPKWattH()
									+ ",t.TodayNKWattH= "+energyCalculateResponseData.getCurrent().getToday().getNKWattH()
									+ ",t.TodayKVarH= "+energyCalculateResponseData.getCurrent().getToday().getKVarH()
									+ ",t.TodayPKVarH= "+energyCalculateResponseData.getCurrent().getToday().getPKVarH()
									+ ",t.TodayNKVarH= "+energyCalculateResponseData.getCurrent().getToday().getNKVarH()
									+ ",t.TodayKVAH= "+energyCalculateResponseData.getCurrent().getToday().getKVAH();
							if(energyCalculateResponseData.getDaily()!=null&&StringManagerUtils.isNotNull(energyCalculateResponseData.getDaily().getDate())){
								updateDailyData="update tbl_rpc_total_day t set t.TotalKWattH= "+energyCalculateResponseData.getDaily().getKWattH()
										+ ",t.TotalPKWattH= "+energyCalculateResponseData.getDaily().getPKWattH()
										+ ",t.TotalNKWattH= "+energyCalculateResponseData.getDaily().getNKWattH()
										+ ",t.TotalKVarH= "+energyCalculateResponseData.getDaily().getKVarH()
										+ ",t.TotalPKVarH= "+energyCalculateResponseData.getDaily().getPKVarH()
										+ ",t.TotalNKVarH= "+energyCalculateResponseData.getDaily().getNKVarH()
										+ ",t.TotalKVAH= "+energyCalculateResponseData.getDaily().getKVAH()
										
										+ ",t.TodayKWattH= "+energyCalculateResponseData.getDaily().getKWattH()
										+ ",t.TodayPKWattH= "+energyCalculateResponseData.getDaily().getPKWattH()
										+ ",t.TodayNKWattH= "+energyCalculateResponseData.getDaily().getNKWattH()
										+ ",t.TodayKVarH= "+energyCalculateResponseData.getDaily().getKVarH()
										+ ",t.TodayPKVarH= "+energyCalculateResponseData.getDaily().getPKVarH()
										+ ",t.TodayNKVarH= "+energyCalculateResponseData.getDaily().getNKVarH()
										+ ",t.TodayKVAH= "+energyCalculateResponseData.getDaily().getKVAH()
										+ " where t.calculatedate=to_date('"+energyCalculateResponseData.getDaily().getDate()+"','yyyy-mm-dd') "
								         +" and t.wellId= (select t2.id from tbl_wellinformation t2 where t2.wellName='"+acquisitionGroupResolutionData.getWellName()+"') ";
							}
						}else{
							updateDiscreteData+= " ,t.totalKWattH= "+acquisitionGroupResolutionData.getKWattH()
									+ " ,t.totalKVarH= "+acquisitionGroupResolutionData.getKVarH();
						}
					}
					updateProdData+=" where t.wellId= (select t2.id from tbl_wellinformation t2 where t2.wellName='"+acquisitionGroupResolutionData.getWellName()+"') ";
					updateDiscreteData+=" where t.wellId= (select t2.id from tbl_wellinformation t2 where t2.wellName='"+acquisitionGroupResolutionData.getWellName()+"') ";
					if(isProductionData){
						commonDataService.getBaseDao().updateOrDeleteBySql(updateProdData);
					}
					if(isDistreteData){
						commonDataService.getBaseDao().updateOrDeleteBySql(updateDiscreteData);
						//更新clob类型数据  运行区间
						if(commResponseData!=null&&commResponseData.getResultStatus()==1){
							List<String> clobCont=new ArrayList<String>();
							String updateRunRangeClobSql="update tbl_rpc_discrete_latest t set t.commrange=?";
							clobCont.add(commResponseData.getCurrent().getCommEfficiency().getRangeString());
							if(timeEffResponseData!=null&&timeEffResponseData.getResultStatus()==1){
								updateRunRangeClobSql+=", t.runrange=?";
								clobCont.add(timeEffResponseData.getCurrent().getRunEfficiency().getRangeString());
							}
							updateRunRangeClobSql+= " where t.wellId= (select t2.id from tbl_wellinformation t2 where t2.wellName='"+acquisitionGroupResolutionData.getWellName()+"') ";
							int result=commonDataService.getBaseDao().executeSqlUpdateClob(updateRunRangeClobSql,clobCont);
						}
						if(StringManagerUtils.isNotNull(updateDailyData)){
							commonDataService.getBaseDao().updateOrDeleteBySql(updateDailyData);
						}
					}
					
					//处理曲线数据
					if(isFESDiagramData){
						acquisitionGroupResolutionData.setFESDiagramAcqTime(acquisitionGroupResolutionData.getAcqTime());
						String requestData=calculateDataService.getFESdiagramCalculateRequestData(acquisitionGroupResolutionData);
						String responseData=StringManagerUtils.sendPostMethod(FESdiagramCalculateHttpServerURL, requestData,"utf-8");
//						System.out.println(requestData);
//						System.out.println(responseData);
						type = new TypeToken<RPCCalculateResponseData>() {}.getType();
						RPCCalculateResponseData rpcCalculateResponseData=gson.fromJson(responseData, type);
						calculateDataService.saveFESDiagramAndCalculateData(acquisitionGroupResolutionData,rpcCalculateResponseData);
						//汇总
						String totalDate = StringManagerUtils.getCurrentTime();
						String totalUrl=Config.getInstance().configFile.getServer().getAccessPath()+"/calculateDataController/FSDiagramDailyCalculation?wellId="+acquisitionGroupResolutionData.getWellId();
						if((rpcCalculateResponseData!=null&&rpcCalculateResponseData.getCalculationStatus().getResultStatus()==1)){
							if(ifAddDay){//如果跨天，汇总前一天数据
								StringManagerUtils.sendPostMethod(totalUrl, "","utf-8");
							}
							totalUrl+="&date="+totalDate;
							totalUrl+="&endAcqTime="+java.net.URLEncoder.encode(acquisitionGroupResolutionData.getFESDiagramAcqTime(), "UTF-8");
							StringManagerUtils.sendPostMethod(totalUrl, "","utf-8");
						}
					}
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
