package com.cosog.task;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.ServerSocket;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Map.Entry;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.drive.InitId;
import com.cosog.model.drive.InitProtocol;
import com.cosog.model.drive.KafkaConfig;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.utils.AcquisitionItemColumnsMap;
import com.cosog.utils.Config;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.JDBCUtil;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Component("EquipmentDriverServerTask")  
public class EquipmentDriverServerTask {
	public static Connection conn = null;   
	public static PreparedStatement pstmt = null;  
	public static Statement stmt = null;  
	public static ResultSet rs = null;
	public static ServerSocket serverSocket=null;
	public static boolean adStatus=false;
	
	private static EquipmentDriverServerTask instance=new EquipmentDriverServerTask();
	
	public static EquipmentDriverServerTask getInstance(){
		return instance;
	}
	
	@Scheduled(fixedRate = 1000*60*60*24*365*100)
	public void driveServerTast() throws SQLException, ParseException,InterruptedException, IOException{
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		String allOfflineUrl=Config.getInstance().configFile.getServer().getAccessPath()+"/api/acq/allDeviceOffline";
		String probeUrl=Config.getInstance().configFile.getDriverConfig().getProbe();
		
		initWellCommStatus();
		
//		String path="";
//		StringManagerUtils stringManagerUtils=new StringManagerUtils();
//		path=stringManagerUtils.getFilePath("test3.json","test/");
//		String distreteData=stringManagerUtils.readFile(path,"utf-8");
//		String url=Config.getInstance().configFile.getServer().getAccessPath()+"/api/acq/online";
//		StringManagerUtils.sendPostMethod(url, distreteData,"utf-8");
		

		loadProtocolConfig();
		initServerConfig();
		initProtocolConfig("","");
		initDriverAcquisitionInfoConfig(null,"");
		do{
			String responseData=StringManagerUtils.sendPostMethod(probeUrl, "","utf-8");
			type = new TypeToken<DriverProbeResponse>() {}.getType();
			DriverProbeResponse driverProbeResponse=gson.fromJson(responseData, type);
			String Ver="";
			if(driverProbeResponse!=null){
				if(!driverProbeResponse.getHttpServerInitStatus()){
					initServerConfig();
				}
				if(!driverProbeResponse.getProtocolInitStatus()){
					initProtocolConfig("","");
				}
				if(!driverProbeResponse.getIDInitStatus()){
					initDriverAcquisitionInfoConfig(null,"");
				}
				Ver=driverProbeResponse.getVer();
			}else{
				StringManagerUtils.sendPostMethod(allOfflineUrl, "","utf-8");
			}
			Thread.sleep(1000*1);
		}while(true);
	}
	
	public static class DriverProbeResponse{
		public boolean ProtocolInitStatus;
		public boolean IDInitStatus;
		public boolean HttpServerInitStatus;
		public String Ver;
		
		public boolean getProtocolInitStatus() {
			return ProtocolInitStatus;
		}
		public void setProtocolInitStatus(boolean protocolInitStatus) {
			ProtocolInitStatus = protocolInitStatus;
		}
		public boolean getIDInitStatus() {
			return IDInitStatus;
		}
		public void setIDInitStatus(boolean iDInitStatus) {
			IDInitStatus = iDInitStatus;
		}
		public boolean getHttpServerInitStatus() {
			return HttpServerInitStatus;
		}
		public void setHttpServerInitStatus(boolean httpServerInitStatus) {
			HttpServerInitStatus = httpServerInitStatus;
		}
		public String getVer() {
			return Ver;
		}
		public void setVer(String ver) {
			Ver = ver;
		}
	}
	
	@SuppressWarnings("static-access")
	public static void loadProtocolConfig(){
		System.out.println("驱动初始化开始");
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		StringManagerUtils stringManagerUtils=new StringManagerUtils();
		Gson gson = new Gson();
		String path="";
		String protocolConfigData="";
		java.lang.reflect.Type type=null;
		//添加Modbus协议配置
		path=stringManagerUtils.getFilePath("ModbusProtocolConfig.json","protocolConfig/");
		protocolConfigData=stringManagerUtils.readFile(path,"utf-8");
		type = new TypeToken<ModbusProtocolConfig>() {}.getType();
		ModbusProtocolConfig modbusProtocolConfig=gson.fromJson(protocolConfigData, type);
		equipmentDriveMap.put("modbusProtocolConfig", modbusProtocolConfig);
		//添加Kafka协议配置
		path=stringManagerUtils.getFilePath("KafkaDriverConfig.json","protocolConfig/");
		protocolConfigData=stringManagerUtils.readFile(path,"utf-8");
		type = new TypeToken<KafkaConfig>() {}.getType();
		KafkaConfig kafkaConfig=gson.fromJson(protocolConfigData, type);
		equipmentDriveMap.put("KafkaDrive", kafkaConfig);
		
		System.out.println("驱动初始化结束");
	}
	
	public static int loadAcquisitionItemColumns(){
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		Map<String, List<String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		List<String> acquisitionItemColumns=new ArrayList<String>();
		
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
				if(!StringManagerUtils.existOrNot(acquisitionItemColumns, "ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr(),false)){
					acquisitionItemColumns.add("ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr());
				}
			}
		}
//		Collections.sort(acquisitionItemColumns);
		acquisitionItemColumnsMap.put("acquisitionItemColumns", acquisitionItemColumns);
		return 0;
	}
	
	public static int initAcquisitionItemDataBaseColumns(){
		Map<String, List<String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		if(acquisitionItemColumnsMap==null||acquisitionItemColumnsMap.size()==0){
			loadAcquisitionItemColumns();
		}
		int result=initAcquisitionItemDataBaseColumns("tbl_pumpacqdata_hist");
		result=initAcquisitionItemDataBaseColumns("tbl_pumpacqdata_latest");
		result=initAcquisitionItemDataBaseColumns("tbl_tubingacqdata_hist");
		result=initAcquisitionItemDataBaseColumns("tbl_tubingacqdata_latest");
		return result;
	}
	
	public static int initAcquisitionItemDataBaseColumns(String tableName){
		int result=0;
		Map<String, List<String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		if(acquisitionItemColumnsMap==null||acquisitionItemColumnsMap.size()==0){
			loadAcquisitionItemColumns();
		}
		List<String> acquisitionItemColumns=acquisitionItemColumnsMap.get("acquisitionItemColumns");
		List<String> acquisitionItemDataBaseColumns=new ArrayList<String>();
		String sql="select t.COLUMN_NAME from user_tab_cols t where t.TABLE_NAME=UPPER('"+tableName+"') and UPPER(t.COLUMN_NAME) like 'ADDR%'  order by t.COLUMN_ID";
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				acquisitionItemDataBaseColumns.add(rs.getString(1));
			}
			//如数据库中不存在，添加字段
			for(int i=0;i<acquisitionItemColumns.size();i++){
				if(!StringManagerUtils.existOrNot(acquisitionItemDataBaseColumns,acquisitionItemColumns.get(i),false)){
					String addColumsSql="alter table "+tableName+" add "+acquisitionItemColumns.get(i)+" VARCHAR2(50)";
					pstmt = conn.prepareStatement(addColumsSql);
					pstmt.executeUpdate();
					result++;
				}
			}
			//如驱动配置中不存在，删除字段
			
			for(int i=0;i<acquisitionItemDataBaseColumns.size();i++){
				if(!StringManagerUtils.existOrNot(acquisitionItemColumns,acquisitionItemDataBaseColumns.get(i),false)){
					String deleteColumsSql="alter table "+tableName+" drop column "+acquisitionItemDataBaseColumns.get(i);
					pstmt = conn.prepareStatement(deleteColumsSql);
					pstmt.executeUpdate();
					result++;
				}
			}
			System.out.println(StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+"-"+tableName+"同步数据库字段");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		
		return result;
	}
	
	public static void initProtocolConfig(String protocolCode,String method){
		loadAcquisitionItemColumns();
		initAcquisitionItemDataBaseColumns();
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
		String initUrl=Config.getInstance().configFile.getDriverConfig().getProtocol();
		Gson gson = new Gson();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		InitProtocol initProtocol=null;
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		if(modbusProtocolConfig!=null){
			if(StringManagerUtils.isNotNull(protocolCode)){
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(protocolCode.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getCode())){
						initProtocol=new InitProtocol(modbusProtocolConfig.getProtocol().get(i));
						initProtocol.setMethod(method);
						System.out.println("协议初始化："+gson.toJson(initProtocol));
						StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initProtocol),"utf-8");
						break;
					}
				}
			}else{
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					initProtocol=new InitProtocol(modbusProtocolConfig.getProtocol().get(i));
					initProtocol.setMethod(method);
					System.out.println("协议初始化："+gson.toJson(initProtocol));
					StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initProtocol),"utf-8");
				}
			}
		}
		
	}
	
	public static int initDriverAcquisitionInfoConfig(List<String> wellList,String method){
		String initUrl=Config.getInstance().configFile.getDriverConfig().getId();
		Gson gson = new Gson();
		int result=0;
		String wellName=StringManagerUtils.joinStringArr2(wellList, ",");
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
//		wellName="'POC1'";
		String sql=""
//				+ " select wellname, signinid,slave,protocol,unit_code,group_code,acq_cycle,max(key) items from ("
				+ " select  t.wellname,t.signinid,t.slave,t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle,"
//				+ " wm_concat(t5.itemname) over (partition by t.wellname,t.signinid,t.slave,t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle order by t5.id) key"
				+ " listagg(t5.itemname, ',') within group(order by t5.id ) key"
				+ " from tbl_wellinformation t,tbl_acq_unit_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_group_conf t4,tbl_acq_item2group_conf t5 "
				+ " where t.unitcode=t2.unit_code and t2.id=t3.unitid and t3.groupid=t4.id and t4.id=t5.groupid "
				+ " and t.signinid is not null and t.slave is not null and t.unitcode is not null "
				+ " and upper(t.protocolcode) not like '%KAFKA%'"
				+ " and upper(t.protocolcode) not like '%MQTT%'";
		if(StringManagerUtils.isNotNull(wellName)){
			sql+=" and t.wellname in("+wellName+")";
		}
		sql+="  group by t.wellname,t.signinid,t.slave,t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle ";
//		sql+= ") v "
//				+ " group by wellname,signinid,slave,protocol,unit_code,group_code,acq_cycle";
		Map<String,InitId> wellListMap=new HashMap<String,InitId>();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		conn=OracleJdbcUtis.getConnection();
		if(conn==null || modbusProtocolConfig==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				InitId initId=wellListMap.get(rs.getString(2));
				if(initId==null){
					initId=new InitId();
					initId.setMethod(method);
//					initId.setWellName(rs.getString(1));
					initId.setID(rs.getString(2));
					initId.setSlave((byte) rs.getInt(3));
					initId.setProtocolName(rs.getString(4));
					initId.setGroup(new ArrayList<InitId.Group>());
				}
				InitId.Group group=new InitId.Group();
				group.setInterval(rs.getInt(7));
				group.setAddr(new ArrayList<Integer>());
				String[] itemsArr=rs.getString(8).split(",");
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(rs.getString(4))){
//						List<ModbusProtocolConfig.Items> itemsSortList=new ArrayList<ModbusProtocolConfig.Items>();
//						for(int j=0;j<itemsArr.length;j++){
//							for(int k=0;k<modbusProtocolConfig.getProtocol().get(i).getItems().size();k++){
//								if(itemsArr[j].equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getTitle())){
//									itemsSortList.add(modbusProtocolConfig.getProtocol().get(i).getItems().get(k));
//									break;
//								}
//							}
//						}
//						Collections.sort(itemsSortList); // 按地址排序
//						
//						for(int j=0;j<itemsSortList.size();j++){
//							for(int k=0;k<itemsArr.length;k++ ){
//								if(itemsArr[k].equalsIgnoreCase(itemsSortList.get(j).getTitle())){
//									group.getAddr().add(itemsSortList.get(j).getAddr());
//									break;
//								}
//							}
//						}
						
						for(int j=0;j<itemsArr.length;j++){
							for(int k=0;k<modbusProtocolConfig.getProtocol().get(i).getItems().size();k++){
								if(itemsArr[j].equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getTitle())){
									group.getAddr().add(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getAddr());
									break;
								}
							}
						}
						Collections.sort(group.getAddr());
						
						break;
					}
				}
				initId.getGroup().add(group);
				wellListMap.put(rs.getString(2), initId);
			}
			result=wellListMap.size();
			for(Entry<String, InitId> entry:wellListMap.entrySet()){
				try {
					System.out.println("ID初始化："+gson.toJson(entry.getValue()));
					StringManagerUtils.sendPostMethod(initUrl, gson.toJson(entry.getValue()),"utf-8");
				}catch (Exception e) {
					continue;
				}
			}
		} catch (SQLException e) {
			System.out.println("ID初始化sql："+sql);
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return result;
	}
	
	public static int initDriverAcquisitionInfoConfigByProtocol(String protocol){
		String sql="select t.wellname from tbl_wellinformation t,tbl_acq_unit_conf t2 where t.unitcode=t2.unit_code and t2.protocol='"+protocol+"'";
		List<String> wellList=new ArrayList<String>();
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initDriverAcquisitionInfoConfig(wellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initDriverAcquisitionInfoConfigByUnit(String unitId){
		String sql="select t.wellname from tbl_wellinformation t,tbl_acq_unit_conf t2 where t.unitcode=t2.unit_code and t2.id="+unitId;
		List<String> wellList=new ArrayList<String>();
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initDriverAcquisitionInfoConfig(wellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initDriverAcquisitionInfoConfigByGroup(String groupId){
		String sql="select t.wellname from tbl_wellinformation t,tbl_acq_unit_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_group_conf t4 "
				+ "where t.unitcode=t2.unit_code and t2.id=t3.unitid and t3.groupid=t4.id and t4.id="+groupId;
		List<String> wellList=new ArrayList<String>();
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initDriverAcquisitionInfoConfig(wellList,"update");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static void initServerConfig() throws MalformedURLException{
		String accessPath=Config.getInstance().configFile.getServer().getAccessPath();
		String initUrl=Config.getInstance().configFile.getDriverConfig().getServer();
		StringBuffer json_buff = new StringBuffer();
		URL url = new URL(accessPath);
		String host=url.getHost();
		int port=url.getPort();
		String projectName="";
		String path = url.getPath();
		String[] pathArr=path.split("/");
		if(pathArr.length>=2){
			projectName=pathArr[1];
		}
		json_buff.append("{");
		json_buff.append("\"IP\":\""+host+"\",");
		json_buff.append("\"Port\":\""+port+"\",");
		json_buff.append("\"ProjectName\":\""+projectName+"\"");
		json_buff.append("}");
		System.out.println("服务始化："+json_buff.toString());
		StringManagerUtils.sendPostMethod(initUrl,json_buff.toString(),"utf-8");
	}
	
	public static void initAlarmStyle() throws IOException, SQLException{
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			alarmShowStyle=new AlarmShowStyle();
		}
		String sql="select v1.itemvalue,v1.itemname,v2.itemname,v3.itemname from "
				+ " (select * from tbl_code t where t.itemcode='BJYS' ) v1,"
				+ " (select * from tbl_code t where t.itemcode='BJQJYS' ) v2,"
				+ " (select * from tbl_code t where t.itemcode='BJYSTMD' ) v3 "
				+ " where v1.itemvalue=v2.itemvalue and v1.itemvalue=v3.itemvalue order by v1.itemvalue ";
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
			return ;
		}
		pstmt = conn.prepareStatement(sql); 
		rs=pstmt.executeQuery();
		while(rs.next()){
			if(rs.getInt(1)==0){
				alarmShowStyle.getNormal().setValue(rs.getInt(1));
				alarmShowStyle.getNormal().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getNormal().setColor(rs.getString(3));
				alarmShowStyle.getNormal().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==100){
				alarmShowStyle.getFirstLevel().setValue(rs.getInt(1));
				alarmShowStyle.getFirstLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getFirstLevel().setColor(rs.getString(3));
				alarmShowStyle.getFirstLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==200){
				alarmShowStyle.getSecondLevel().setValue(rs.getInt(1));
				alarmShowStyle.getSecondLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getSecondLevel().setColor(rs.getString(3));
				alarmShowStyle.getSecondLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==300){
				alarmShowStyle.getThirdLevel().setValue(rs.getInt(1));
				alarmShowStyle.getThirdLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getThirdLevel().setColor(rs.getString(3));
				alarmShowStyle.getThirdLevel().setOpacity(rs.getString(4));
			}	
		}
		if(!dataModelMap.containsKey("AlarmShowStyle")){
			dataModelMap.put("AlarmShowStyle", alarmShowStyle);
		}
		OracleJdbcUtis.closeDBConnection(conn, stmt, pstmt, rs);
	}
	
	public static int initWellCommStatus(){
		String intPumpCommSql="update tbl_pumpacqdata_latest t set t.commstatus=0 ";
		String intTubingCommSql="update tbl_tubingacqdata_latest t set t.commstatus=0 ";
//		sql="alter table TBL_PUMPACQDATA_HIST add addr201 VARCHAR2(50)";
		int result=0;
		try {
			result = JDBCUtil.updateRecord(intPumpCommSql, null);
			result = JDBCUtil.updateRecord(intTubingCommSql, null);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
