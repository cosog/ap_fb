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
import com.cosog.model.CommStatus;
import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.calculate.TimeEffTotalResponseData;
import com.cosog.model.calculate.WellAcquisitionData;
import com.cosog.model.drive.AcqGroup;
import com.cosog.model.drive.AcqOnline;
import com.cosog.model.drive.AcquisitionGroupResolutionData;
import com.cosog.model.drive.AcquisitionItemInfo;
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
import com.cosog.utils.ProtocolItemResolutionData;
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
					+ " left outer join tbl_protocolinstance t4 on t.instancecode=t4.code"
					+ " left outer join tbl_acq_unit_conf t5 on t4.unitid=t5.id"
					+ " where t5.protocol in("+protocols+")"
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
					historyTable="tbl_pipelineacqdata_hist";
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
//				commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
				type = new TypeToken<CommResponseData>() {}.getType();
				commResponseData=gson.fromJson(commResponse, type);
				String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0";
				String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
				
				String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus=0";
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
					+ " from TBL_WELLINFORMATION t   "
					+ " where t.signinid='"+acqOnline.getID()+"' and to_number(t.slave)="+acqOnline.getSlave();
			List devicetypeList = this.commonDataService.findCallSql(protocolSql);	
			if(devicetypeList.size()>=0 && StringManagerUtils.isNotNull(devicetypeList.get(0)+"")){
				String devicetype=devicetypeList.get(0)+"";
				String functionCode="pumpDeviceRealTimeMonitoringStatusData";
				if("0".equalsIgnoreCase(devicetype)){//如果是泵设备
					realtimeTable="tbl_pumpacqdata_latest";
					historyTable="tbl_pumpacqdata_hist";
					functionCode="pumpDeviceRealTimeMonitoringStatusData";
				}else{//否则管设备
					realtimeTable="tbl_pipelineacqdata_latest";
					historyTable="tbl_pipelineacqdata_hist";
					functionCode="pipelineDeviceRealTimeMonitoringStatusData";
				}
				
				String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
						+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
						+ " t.id"
						+ " from TBL_WELLINFORMATION t,"+realtimeTable+"  t2 "
						+ " where t.id=t2.wellid"
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
					webSocketSendData.append("\"commStatus\":"+(acqOnline.getStatus()?1:0)+",");
					webSocketSendData.append("\"commAlarmLevel\":"+(acqOnline.getStatus()?0:100));
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
//					commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
					type = new TypeToken<CommResponseData>() {}.getType();
					commResponseData=gson.fromJson(commResponse, type);
					String updateRealData="update "+realtimeTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(acqOnline.getStatus()?1:0);
					String updateRealCommRangeClobSql="update "+realtimeTable+" t set t.commrange=?";
					
					String updateHistData="update "+historyTable+" t set t.acqTime=to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"','yyyy-mm-dd hh24:mi:ss'), t.CommStatus="+(acqOnline.getStatus()?1:0);
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
					
					//更新内存中设备通信状态
					Map<String, Object> dataModelMap = DataModelMap.getMapObject();
					List<CommStatus> commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
					if(commStatusList==null){
						EquipmentDriverServerTask.LoadDeviceCommStatus();
						commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
					}
					for(int i=0;i<commStatusList.size();i++){
						if(wellName.equals(commStatusList.get(i).getDeviceName()) && devicetype.equals(commStatusList.get(i).getDeviceType()+"")){
							commStatusList.get(i).setCommStatus(acqOnline.getStatus()?1:0);
							break;
						}
					}
					
					String commAlarm="";
					if(acqOnline.getStatus()){
						commAlarm="update tbl_alarminfo t set t.recoverytime=to_date('"+currentTime+"','yyyy-mm-dd hh24:mi:ss') "
								+ " where t.alarmtime=( select max(t2.alarmtime) from tbl_alarminfo t2 where t2.alarmtype=0 and t2.wellid=t.wellid ) "
								+ " and t.wellid= "+wellId
								+ " and t.alarmtype=0"
								+ " and t.recoverytime is null";
					}else{
						commAlarm="insert into tbl_alarminfo (wellid,alarmtime,itemname,alarmtype,alarmvalue,alarminfo,alarmlevel)"
								+ "values("+wellId+",to_date('"+currentTime+"','yyyy-mm-dd hh24:mi:ss'),'通信状态',0,0,'离线',100)";
						String alarmSMSContent="设备"+wellName+"于"+currentTime+"离线";
						calculateDataService.sendAlarmSMS(wellName, devicetype, alarmSMSContent);
					}
					result=commonDataService.getBaseDao().updateOrDeleteBySql(commAlarm);
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
			String sql="select t.wellname,t.devicetype ,t3.protocol"
					+ " from TBL_WELLINFORMATION t,tbl_protocolinstance t2,tbl_acq_unit_conf t3  "
					+ " where t.instancecode=t2.code and t2.unitid=t3.id"
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave();
			List list = this.commonDataService.findCallSql(sql);
			if(list.size()>0){
				Object[] obj=(Object[]) list.get(0);
				String wellName=obj[0]+"";
				String deviceType=obj[1]+"";
				String protocolName=obj[2]+"";
				if("A11-Modbus".equalsIgnoreCase(protocolName)){
//					this.DataProcessing_A11(acqGroup, protocolName);
				}
//				else if("private-lq1000".equalsIgnoreCase(protocolName) || "private-kd93".equalsIgnoreCase(protocolName)){
//					this.DataProcessing_Pump(acqGroup, protocolName);
//				}
				else{
					this.DataProcessing_Pump(acqGroup, wellName,deviceType,protocolName);
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
	public String DataProcessing_Pump(AcqGroup acqGroup,String wellName,String deviceType,String protocolName) throws Exception{
		Gson gson=new Gson();
		java.lang.reflect.Type type=null;
		String commUrl=Config.getInstance().configFile.getAgileCalculate().getCommunication()[0];
		
		StringBuffer webSocketSendData = new StringBuffer();
		StringBuffer info_json = new StringBuffer();
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		boolean save=false;
		boolean alarm=false;
		boolean sendMessage=false;
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			EquipmentDriverServerTask.initAlarmStyle();
			alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		}
		String realtimeTable="tbl_pumpacqdata_latest";
		String historyTable="tbl_pumpacqdata_hist";
		String functionCode="pumpDeviceRealTimeMonitoringData";
		if("0".equalsIgnoreCase(deviceType)){
			realtimeTable="tbl_pumpacqdata_latest";
			historyTable="tbl_pumpacqdata_hist";
			functionCode="pumpDeviceRealTimeMonitoringData";
		}else{
			realtimeTable="tbl_pipelineacqdata_latest";
			historyTable="tbl_pipelineacqdata_hist";
			functionCode="pipelineDeviceRealTimeMonitoringData";
		}
		if(acqGroup!=null){
			boolean ifAddDay=false;
			String sql="select t.wellname ,to_char(t2.acqTime,'yyyy-mm-dd hh24:mi:ss'),"
					+ " t2.commstatus,t2.commtime,t2.commtimeefficiency,t2.commrange,"
					+ " t6.save_cycle,"
					+ " t.id"
					+ " from TBL_WELLINFORMATION t,"+realtimeTable+"  t2,tbl_protocolinstance t3,tbl_acq_unit_conf t4,tbl_acq_group2unit_conf t5,tbl_acq_group_conf t6    "
					+ " where t.id=t2.wellid and t.instancecode=t3.code and t3.unitid=t4.id and t4.id=t5.unitid and t5.groupid=t6.id"
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave()
					+ " order by t6.id";
			String alarmItemsSql="select t2.itemname,t2.itemcode,t2.itemaddr,t2.type,t2.bitindex,t2.value, "
					+ " t2.upperlimit,t2.lowerlimit,t2.hystersis,t2.delay,decode(t2.alarmsign,0,0,t2.alarmlevel) as alarmlevel "
					+ " from tbl_wellinformation t, tbl_alarm_item2unit_conf t2,tbl_alarm_unit_conf t3,tbl_protocolalarminstance t4 "
					+ " where t.alarminstancecode=t4.code and t4.alarmunitid=t3.id and t3.id=t2.unitid "
					+ " and t.signinid='"+acqGroup.getID()+"' and to_number(t.slave)="+acqGroup.getSlave()
					+ " order by t2.id";
			
			
			List list = commonDataService.findCallSql(sql);
			if(list.size()>0){
				Object[] obj=(Object[]) list.get(0);
				String lastSaveTime=obj[1]+"";
				String acqTime=StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss");
				int save_cycle=StringManagerUtils.stringToInteger(obj[6]+"");
				
				long timeDiff=StringManagerUtils.getTimeDifference(lastSaveTime, acqTime, "yyyy-MM-dd HH:mm:ss");
				if(timeDiff>save_cycle*1000){
					save=true;
				}
				String wellId=obj[obj.length-1]+"";
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
					List<?> alarmItemsList = commonDataService.findCallSql(alarmItemsSql);
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
//					commResponse=StringManagerUtils.sendPostMethod(commUrl, commRequest,"utf-8");
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
					
					List<AcquisitionItemInfo> acquisitionItemInfoList=new ArrayList<AcquisitionItemInfo>();
					List<ProtocolItemResolutionData> protocolItemResolutionDataList=new ArrayList<ProtocolItemResolutionData>();
					
					for(int i=0;acqGroup.getAddr()!=null && acqGroup.getValue()!=null  &&i<acqGroup.getAddr().size();i++){
						for(int j=0;acqGroup.getValue().get(i)!=null && j<protocol.getItems().size();j++){
							if(acqGroup.getAddr().get(i)==protocol.getItems().get(j).getAddr()){
								String columnName="ADDR"+protocol.getItems().get(j).getAddr();
								String value=StringManagerUtils.objectListToString(acqGroup.getValue().get(i), protocol.getItems().get(j).getIFDataType());
								String rawValue=value;
								String addr=protocol.getItems().get(j).getAddr()+"";
								String title=protocol.getItems().get(j).getTitle();
								String columnDataType=protocol.getItems().get(j).getIFDataType();
								String resolutionMode=protocol.getItems().get(j).getResolutionMode()+"";
								String bitIndex="";
								int alarmLevel=0;
								if(StringManagerUtils.existOrNot(columnsList, columnName, false)){
									updateRealtimeData+=",t."+columnName+"='"+value+"'";
									insertHistColumns+=","+columnName;
									insertHistValue+=",'"+value+"'";
									if(protocol.getItems().get(j).getResolutionMode()==1){//如果是枚举量
										boolean isMatch=false;
										if(protocol.getItems().get(j).getMeaning()!=null&&protocol.getItems().get(j).getMeaning().size()>0){
											for(int l=0;l<protocol.getItems().get(j).getMeaning().size();l++){
												if(value.equals(protocol.getItems().get(j).getMeaning().get(l).getValue()+"")){
													isMatch=true;
													value=protocol.getItems().get(j).getMeaning().get(l).getMeaning();
													break;
												}
											}
										}
										ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex);
										protocolItemResolutionDataList.add(protocolItemResolutionData);
									}else if(protocol.getItems().get(j).getResolutionMode()==0){//如果是开关量
										boolean isMatch=false;
										if(protocol.getItems().get(j).getMeaning()!=null&&protocol.getItems().get(j).getMeaning().size()>0){
											String[] valueArr=value.split(",");
											for(int l=0;l<protocol.getItems().get(j).getMeaning().size();l++){
												title=protocol.getItems().get(j).getMeaning().get(l).getMeaning();
												if(StringManagerUtils.isNotNull(value)){
													for(int m=0;valueArr!=null&&m<valueArr.length;m++){
														if(m==protocol.getItems().get(j).getMeaning().get(l).getValue()  ){
															isMatch=true;
															bitIndex=m+"";
															if("bool".equalsIgnoreCase(columnDataType) || "boolean".equalsIgnoreCase(columnDataType)){
																value=("true".equalsIgnoreCase(valueArr[m]) || "1".equalsIgnoreCase(valueArr[m]))?"开":"关";
																rawValue=("true".equalsIgnoreCase(valueArr[m]) || "1".equalsIgnoreCase(valueArr[m]))?"1":"0";
															}else{
																value=valueArr[m];
															}
															
															ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex);
															protocolItemResolutionDataList.add(protocolItemResolutionData);
															break;
														}
													}
												}else{
													ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex);
													protocolItemResolutionDataList.add(protocolItemResolutionData);
												}
											}
										}else{
											ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex);
											protocolItemResolutionDataList.add(protocolItemResolutionData);
										}
									}else{
										ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(title,value,rawValue,addr,columnName,columnDataType,resolutionMode,bitIndex);
										protocolItemResolutionDataList.add(protocolItemResolutionData);
									}
								}
								break;
							}
						}
					}
					
					updateRealtimeData+=" where t.wellId= "+wellId;
					insertHistSql="insert into "+historyTable+"("+insertHistColumns+")values("+insertHistValue+")";
					
					//报警判断
					for(int i=0;i<protocolItemResolutionDataList.size();i++){
						int alarmLevel=0;
						AcquisitionItemInfo acquisitionItemInfo=new AcquisitionItemInfo();
						acquisitionItemInfo.setAddr(StringManagerUtils.stringToInteger(protocolItemResolutionDataList.get(i).getAddr()));
						acquisitionItemInfo.setColumn(protocolItemResolutionDataList.get(i).getColumn());
						acquisitionItemInfo.setTitle(protocolItemResolutionDataList.get(i).getColumnName());
						acquisitionItemInfo.setValue(protocolItemResolutionDataList.get(i).getValue());
						acquisitionItemInfo.setRawValue(protocolItemResolutionDataList.get(i).getRawValue());
						acquisitionItemInfo.setDataType(protocolItemResolutionDataList.get(i).getColumnDataType());
						acquisitionItemInfo.setResolutionMode(protocolItemResolutionDataList.get(i).getResolutionMode());
						acquisitionItemInfo.setBitIndex(protocolItemResolutionDataList.get(i).getBitIndex());
						acquisitionItemInfo.setAlarmLevel(alarmLevel);
						for(int l=0;l<alarmItemsList.size();l++){
							Object[] alarmItemObj=(Object[]) alarmItemsList.get(l);
							if((acquisitionItemInfo.getAddr()+"").equals(alarmItemObj[2]+"")){
								int alarmType=StringManagerUtils.stringToInteger(alarmItemObj[3]+"");
								if(alarmType==2 && StringManagerUtils.isNotNull(acquisitionItemInfo.getRawValue())){//数据量报警
									float hystersis=StringManagerUtils.stringToFloat(alarmItemObj[8]+"");
									if(StringManagerUtils.isNotNull(alarmItemObj[6]+"") && StringManagerUtils.stringToFloat(acquisitionItemInfo.getRawValue())>StringManagerUtils.stringToFloat(alarmItemObj[6]+"")+hystersis){
										alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
										acquisitionItemInfo.setAlarmLevel(alarmLevel);
										acquisitionItemInfo.setHystersis(hystersis);
										acquisitionItemInfo.setAlarmLimit(StringManagerUtils.stringToFloat(alarmItemObj[6]+""));
										acquisitionItemInfo.setAlarmInfo("高报");
										acquisitionItemInfo.setAlarmType(1);
										acquisitionItemInfo.setAlarmDelay(StringManagerUtils.stringToInteger(alarmItemObj[9]+""));
									}else if((StringManagerUtils.isNotNull(alarmItemObj[7]+"") && StringManagerUtils.stringToFloat(acquisitionItemInfo.getRawValue())<StringManagerUtils.stringToFloat(alarmItemObj[7]+"")-hystersis)){
										alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
										acquisitionItemInfo.setAlarmLevel(alarmLevel);
										acquisitionItemInfo.setHystersis(hystersis);
										acquisitionItemInfo.setAlarmLimit(StringManagerUtils.stringToFloat(alarmItemObj[7]+""));
										acquisitionItemInfo.setAlarmInfo("低报");
										acquisitionItemInfo.setAlarmType(1);
										acquisitionItemInfo.setAlarmDelay(StringManagerUtils.stringToInteger(alarmItemObj[9]+""));
									}
									break;
								}else if(alarmType==0){//开关量报警
									if(StringManagerUtils.isNotNull(acquisitionItemInfo.getBitIndex())){
										if(acquisitionItemInfo.getBitIndex().equals(alarmItemObj[4]+"") && StringManagerUtils.stringToInteger(acquisitionItemInfo.getRawValue())==StringManagerUtils.stringToInteger(alarmItemObj[5]+"")){
											alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
											acquisitionItemInfo.setAlarmLevel(alarmLevel);
											acquisitionItemInfo.setAlarmInfo(acquisitionItemInfo.getTitle()+":"+acquisitionItemInfo.getValue());
											acquisitionItemInfo.setAlarmType(3);
											acquisitionItemInfo.setAlarmDelay(StringManagerUtils.stringToInteger(alarmItemObj[9]+""));
										}
									}
								}else if(alarmType==1){//枚举量报警
									if(StringManagerUtils.stringToInteger(acquisitionItemInfo.getRawValue())==StringManagerUtils.stringToInteger(alarmItemObj[5]+"")){
										alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
										acquisitionItemInfo.setAlarmLevel(alarmLevel);
										acquisitionItemInfo.setAlarmInfo(acquisitionItemInfo.getTitle()+":"+acquisitionItemInfo.getValue());
										acquisitionItemInfo.setAlarmType(2);
										acquisitionItemInfo.setAlarmDelay(StringManagerUtils.stringToInteger(alarmItemObj[9]+""));
									}
								}
							}
						}
						if(acquisitionItemInfo.getAlarmLevel()>0){
							alarm=true;
						}
						acquisitionItemInfoList.add(acquisitionItemInfo);
					}
					
					//更新内存中设备通信状态
					Map<String, Object> commStatusModelMap = DataModelMap.getMapObject();
					List<CommStatus> commStatusList=(List<CommStatus>) commStatusModelMap.get("DeviceCommStatus");
					if(commStatusList==null){
						EquipmentDriverServerTask.LoadDeviceCommStatus();
						commStatusList=(List<CommStatus>) commStatusModelMap.get("DeviceCommStatus");
					}
					for(int i=0;i<commStatusList.size();i++){
						if(wellName.equals(commStatusList.get(i).getDeviceName()) && deviceType.equals(commStatusList.get(i).getDeviceType()+"")){
							commStatusList.get(i).setCommStatus(1);
							break;
						}
					}
					
					if(save || alarm){//如果满足保存周期或者有报警，保存数据
						commonDataService.getBaseDao().updateOrDeleteBySql(updateRealtimeData);
						commonDataService.getBaseDao().updateOrDeleteBySql(insertHistSql);
						
						//报警项
						if(alarm){
							calculateDataService.saveAlarmInfo(wellName,deviceType,acqTime,acquisitionItemInfoList);
							calculateDataService.sendAlarmSMS(wellName,deviceType,acqTime,acquisitionItemInfoList);
						}
						
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
					webSocketSendData.append("{\"name1\":\""+wellName+":"+acqTime+" 在线\"},");
					int row=1;
					if(acquisitionItemInfoList.size()%items==0){
						row=acquisitionItemInfoList.size()/items+1;
					}else{
						row=acquisitionItemInfoList.size()/items+2;
					}
					
					for(int j=1;j<row;j++){
						webSocketSendData.append("{");
						for(int k=0;k<items;k++){
							int index=items*(j-1)+k;
							String columnName="";
							String value="";
							String column="";
							String columnDataType="";
							String resolutionMode="";
							int alarmLevel=0;
							if(index<acquisitionItemInfoList.size()){
								columnName=acquisitionItemInfoList.get(index).getTitle();
								value=acquisitionItemInfoList.get(index).getValue();
								column=acquisitionItemInfoList.get(index).getColumn();
								columnDataType=acquisitionItemInfoList.get(index).getDataType();
								resolutionMode=acquisitionItemInfoList.get(index).getResolutionMode()+"";
								alarmLevel=acquisitionItemInfoList.get(index).getAlarmLevel();
							}
							webSocketSendData.append("\"name"+(k+1)+"\":\""+columnName+"\",");
							webSocketSendData.append("\"value"+(k+1)+"\":\""+value+"\",");
							info_json.append("{\"row\":"+j+",\"col\":"+k+",\"columnName\":\""+columnName+"\",\"column\":\""+column+"\",\"value\":\""+value+"\",\"columnDataType\":\""+columnDataType+"\",\"resolutionMode\":\""+resolutionMode+"\",\"alarmLevel\":"+alarmLevel+"},");
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
