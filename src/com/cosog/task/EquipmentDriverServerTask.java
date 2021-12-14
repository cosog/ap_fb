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
import com.cosog.model.CommStatus;
import com.cosog.model.drive.InitId;
import com.cosog.model.drive.InitInstance;
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
//	public static Connection conn = null;   
//	public static PreparedStatement pstmt = null;  
//	public static Statement stmt = null;  
//	public static ResultSet rs = null;
	public static ServerSocket serverSocket=null;
	public static boolean adStatus=false;
	
	private static EquipmentDriverServerTask instance=new EquipmentDriverServerTask();
	
	public static EquipmentDriverServerTask getInstance(){
		return instance;
	}
	
//	@Scheduled(fixedRate = 1000*60*60*24*365*100)
	public void driveServerTast() throws SQLException, ParseException,InterruptedException, IOException{
		Gson gson = new Gson();
		java.lang.reflect.Type type=null;
		String allOfflineUrl=Config.getInstance().configFile.getServer().getAccessPath()+"/api/acq/allDeviceOffline";
		String probeUrl=Config.getInstance().configFile.getDriverConfig().getProbe().getInit();
		
		initWellCommStatus();
		
//		String path="";
//		StringManagerUtils stringManagerUtils=new StringManagerUtils();
//		path=stringManagerUtils.getFilePath("test1.json","test/");
//		String distreteData=stringManagerUtils.readFile(path,"utf-8");
//		
//		path=stringManagerUtils.getFilePath("test2.json","test/");
//		String distreteData2=stringManagerUtils.readFile(path,"utf-8");
//		
//		path=stringManagerUtils.getFilePath("test3.json","test/");
//		String onLineData=stringManagerUtils.readFile(path,"utf-8");
//		
//		path=stringManagerUtils.getFilePath("test4.json","test/");
//		String offLineData=stringManagerUtils.readFile(path,"utf-8");
//		
//		String url=Config.getInstance().configFile.getServer().getAccessPath()+"/api/acq/group";
//		String onlineUrl=Config.getInstance().configFile.getServer().getAccessPath()+"/api/acq/online";
//		
//		int i=0;
//		while(true){
//			if(i%2==0){
//				StringManagerUtils.sendPostMethod(url, distreteData,"utf-8");
//			}else{
//				StringManagerUtils.sendPostMethod(url, distreteData2,"utf-8");
//			}
//			
////			if(i%2==0){
////				StringManagerUtils.sendPostMethod(onlineUrl, onLineData,"utf-8");
////			}else{
////				StringManagerUtils.sendPostMethod(onlineUrl, offLineData,"utf-8");
////			}
//			i++;
//			
////			StringManagerUtils.sendPostMethod(onlineUrl, onLineData,"utf-8");
//			
//			Thread.sleep(1000*10);
//		}
		
		

		loadProtocolConfig();
		initServerConfig();
		initProtocolConfig("","");
		initInstanceConfig(null,"");
		initSMSInstanceConfig(null,"");
		initPumpDriverAcquisitionInfoConfig(null,"");
		initPipelineDriverAcquisitionInfoConfig(null,"");
		initSMSDevice(null,"");
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
				if(!driverProbeResponse.getInstanceInitStatus()){
					initInstanceConfig(null,"");
					initSMSInstanceConfig(null,"");
				}
				if(!driverProbeResponse.getSMSInitStatus()){
					initSMSDevice(null,"");
				}
				if(!driverProbeResponse.getIDInitStatus()){
					initPumpDriverAcquisitionInfoConfig(null,"");
					initPipelineDriverAcquisitionInfoConfig(null,"");
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
		public boolean InstanceInitStatus;
		public boolean IDInitStatus;
		public boolean HttpServerInitStatus;
		public boolean SMSInitStatus;
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
		public boolean getInstanceInitStatus() {
			return InstanceInitStatus;
		}
		public void setInstanceInitStatus(boolean instanceInitStatus) {
			InstanceInitStatus = instanceInitStatus;
		}
		public boolean getSMSInitStatus() {
			return SMSInitStatus;
		}
		public void setSMSInitStatus(boolean sMSInitStatus) {
			SMSInitStatus = sMSInitStatus;
		}
	}
	
	@SuppressWarnings("static-access")
	public static void loadProtocolConfig(){
		System.out.println("驱动加载开始");
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
		if(modbusProtocolConfig==null){
			modbusProtocolConfig=new ModbusProtocolConfig();
			modbusProtocolConfig.setProtocol(new ArrayList<ModbusProtocolConfig.Protocol>());
		}else if(modbusProtocolConfig.getProtocol()==null){
			modbusProtocolConfig.setProtocol(new ArrayList<ModbusProtocolConfig.Protocol>());
		}
		equipmentDriveMap.put("modbusProtocolConfig", modbusProtocolConfig);
		
		System.out.println("驱动加载结束");
	}
	
	public static int loadAcquisitionItemColumns(){
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		Map<String, List<String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		List<String> pumpDeviceAcquisitionItemColumns=new ArrayList<String>();
		List<String> pipelineDeviceAcquisitionItemColumns=new ArrayList<String>();
		
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==0){
				for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
					if(!StringManagerUtils.existOrNot(pumpDeviceAcquisitionItemColumns, "ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr(),false)){
						pumpDeviceAcquisitionItemColumns.add("ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr());
					}
				}
			}else{
				for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
					if(!StringManagerUtils.existOrNot(pipelineDeviceAcquisitionItemColumns, "ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr(),false)){
						pipelineDeviceAcquisitionItemColumns.add("ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr());
					}
				}
			}
		}
//		Collections.sort(acquisitionItemColumns);
		acquisitionItemColumnsMap.put("pumpDeviceAcquisitionItemColumns", pumpDeviceAcquisitionItemColumns);
		acquisitionItemColumnsMap.put("pipelineDeviceAcquisitionItemColumns", pipelineDeviceAcquisitionItemColumns);
		return 0;
	}
	
	public static int loadAcquisitionItemColumns(int deviceType){
		
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		Collections.sort(modbusProtocolConfig.getProtocol());
		
		Map<String, List<String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		List<String> acquisitionItemColumns=new ArrayList<String>();
		
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==deviceType){
				for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
					if(!StringManagerUtils.existOrNot(acquisitionItemColumns, "ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr(),false)){
						acquisitionItemColumns.add("ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr());
					}
				}
			}
			if(deviceType==0){
				acquisitionItemColumnsMap.put("pumpDeviceAcquisitionItemColumns", acquisitionItemColumns);
			}else{
				acquisitionItemColumnsMap.put("pipelineDeviceAcquisitionItemColumns", acquisitionItemColumns);
			}
		}
		return 0;
	}
	
	public static int initAcquisitionItemDataBaseColumns(){
		int result=initAcquisitionItemDataBaseColumns("tbl_pumpacqdata_hist",0);
		result=initAcquisitionItemDataBaseColumns("tbl_pumpacqdata_latest",0);
		result=initAcquisitionItemDataBaseColumns("tbl_pipelineacqdata_hist",1);
		result=initAcquisitionItemDataBaseColumns("tbl_pipelineacqdata_latest",1);
		return result;
	}
	
	public static int initAcquisitionItemDataBaseColumns(String tableName,int deviceType){
		//pumpDeviceAcquisitionItemColumns  pipelineDeviceAcquisitionItemColumns
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		int result=0;
		String key="pumpDeviceAcquisitionItemColumns";
		if(deviceType==1){
			key="pipelineDeviceAcquisitionItemColumns";
		}
		Map<String, List<String>> acquisitionItemColumnsMap=AcquisitionItemColumnsMap.getMapObject();
		if(acquisitionItemColumnsMap==null||acquisitionItemColumnsMap.size()==0||acquisitionItemColumnsMap.get(key)==null){
			loadAcquisitionItemColumns(deviceType);
		}
		List<String> acquisitionItemColumns=acquisitionItemColumnsMap.get(key);
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
			System.out.println("初始化表："+tableName);
			System.out.println("协议字段"+StringManagerUtils.joinStringArr(acquisitionItemColumns, ","));
			System.out.println("表已有字段"+StringManagerUtils.joinStringArr(acquisitionItemDataBaseColumns, ","));
			//如数据库中不存在，添加字段
			for(int i=0;i<acquisitionItemColumns.size();i++){
				if(!StringManagerUtils.existOrNot(acquisitionItemDataBaseColumns,acquisitionItemColumns.get(i),false)){
					String addColumsSql="alter table "+tableName+" add "+acquisitionItemColumns.get(i)+" VARCHAR2(50)";
					pstmt = conn.prepareStatement(addColumsSql);
					pstmt.executeUpdate();
					System.out.println(StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+":表"+tableName+"添加字段:"+acquisitionItemColumns.get(i));
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
					System.out.println(StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss")+":表"+tableName+"删除字段:"+acquisitionItemDataBaseColumns.get(i));
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
	
	public static int initDataDictionary(String dataDictionaryId,int deviceType){
		int result=0;
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		Collections.sort(modbusProtocolConfig.getProtocol());
		List<String> acquisitionItemColumns=new ArrayList<String>();
		List<String> acquisitionItemsName=new ArrayList<String>();
		List<String> dataTypeList=new ArrayList<String>();
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==deviceType){
				for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
					if((!"w".equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getRWType()))//非只写
						&&(!StringManagerUtils.existOrNot(acquisitionItemColumns, "addr"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr(),false))){
						String unit=modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getUnit();
						
						acquisitionItemColumns.add("addr"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr());
						acquisitionItemsName.add(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getTitle()+(StringManagerUtils.isNotNull(unit)?("("+unit+")"):""));
						dataTypeList.add(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getIFDataType());
					}
				}
//				break;
			}
		}
		List<String> dataDictionaryItems=new ArrayList<String>();
		List<String> dataDictionaryItemsName=new ArrayList<String>();
		List<String> dataDictionaryItemsId=new ArrayList<String>();
		String sql="select t1.dataitemid,t1.cname,t1.ename,t1.sorts "
				+ " from tbl_dist_item t1 where t1.sysdataid=(select t2.sysdataid from tbl_dist_name t2 where t2.sysdataid='"+dataDictionaryId+"') "
				+ " and UPPER(t1.ename) like 'ADDR%'"
				+ " order by t1.sorts";
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			int maxSortNum=1;
			while(rs.next()){
				dataDictionaryItemsId.add(rs.getString(1));
				dataDictionaryItemsName.add(rs.getString(2));
				dataDictionaryItems.add(rs.getString(3));
				maxSortNum=rs.getInt(4);
			}
			if(maxSortNum<5){
				maxSortNum=5;
			}
			//如数字典中不存在，添加字典项
			for(int i=0;i<acquisitionItemColumns.size();i++){
				if(!StringManagerUtils.existOrNot(dataDictionaryItems,acquisitionItemColumns.get(i),false)){
					maxSortNum+=1;
					int status=0;
					if(dataTypeList.get(i).toUpperCase().contains("FLOAT")){
						status=1;
					}
					String addDataDict="insert into tbl_dist_item(sysdataid,cname,ename,sorts,status)"
							+ " values('"+dataDictionaryId+"','"+acquisitionItemsName.get(i)+"','"+acquisitionItemColumns.get(i)+"',"+(maxSortNum)+","+status+")";
					pstmt = conn.prepareStatement(addDataDict);
					pstmt.executeUpdate();
					result++;
				}else{//如果存在，判断名称是否改变
					String tiemColumn=acquisitionItemColumns.get(i);
					String itemName=acquisitionItemsName.get(i);
					for(int j=0;j<dataDictionaryItems.size();j++){
						if(tiemColumn.equalsIgnoreCase(dataDictionaryItems.get(j))){
							if(!itemName.equalsIgnoreCase(dataDictionaryItemsName.get(j))){//如果名称改变
								String addDataDict="update tbl_dist_item t set t.cname='"+itemName+"' where t.dataitemid='"+dataDictionaryItemsId.get(j)+"'";
								pstmt = conn.prepareStatement(addDataDict);
								pstmt.executeUpdate();
							}
							break;
						}
					}
				}
			}
			//删除协议中不存在的字典项
			StringBuffer delItemIds = new StringBuffer();
			for(int i=0;i<dataDictionaryItems.size();i++){
				if(!StringManagerUtils.existOrNot(acquisitionItemColumns,dataDictionaryItems.get(i),false)){
					delItemIds.append("'"+dataDictionaryItemsId.get(i)+"',");
				}
			}
			if(delItemIds.toString().endsWith(",")){
				delItemIds.deleteCharAt(delItemIds.length() - 1);
			}
			if(StringManagerUtils.isNotNull(delItemIds.toString())){
				String delDataDict="delete from tbl_dist_item t where t.dataitemid in("+delItemIds.toString()+")";
				pstmt = conn.prepareStatement(delDataDict);
				pstmt.executeUpdate();
				System.out.println("删除协议中不存在的字典项:"+delItemIds.toString());
			}
			
			System.out.println("同步数据字典:"+dataDictionaryId);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return result;
	}
	
	public static void initProtocolConfig(String protocolName,String method){
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
			if("delete".equalsIgnoreCase(method)){
				initProtocol=new InitProtocol();
				initProtocol.setProtocolName(protocolName);
				initProtocol.setMethod(method);
				System.out.println("删除协议："+gson.toJson(initProtocol));
				StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initProtocol),"utf-8");
			}else{
				if(StringManagerUtils.isNotNull(protocolName)){
					for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
						if(protocolName.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getName())){
							initProtocol=new InitProtocol(modbusProtocolConfig.getProtocol().get(i));
							initProtocol.setMethod(method);
							System.out.println("协议初始化："+gson.toJson(initProtocol));
							StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initProtocol),"utf-8");
//							loadAcquisitionItemColumns(modbusProtocolConfig.getProtocol().get(i).getDeviceType());
//							if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==0){
//								initAcquisitionItemDataBaseColumns("tbl_pumpacqdata_hist",0);
//								initAcquisitionItemDataBaseColumns("tbl_pumpacqdata_latest",0);
//								initDataDictionary("7f13446d19b4497986980fa16a750f95",0);//泵设备实时概览字典
//								initDataDictionary("cd7b24562b924d19b556de31256e22a1",0);//泵设备历史查询字典
//							}else{
//								initAcquisitionItemDataBaseColumns("tbl_pipelineacqdata_hist",1);
//								initAcquisitionItemDataBaseColumns("tbl_pipelineacqdata_latest",1);
//								initDataDictionary("e0f5f3ff8a1f46678c284fba9cc113e8",1);//管设备实时概览字典
//								initDataDictionary("fb7d070a349c403b8a26d71c12af7a05",1);//管设备历史查询字典
//							}
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
			loadAcquisitionItemColumns();
			//同步数据库字段
			initAcquisitionItemDataBaseColumns();
			//同步数据字典
			initDataDictionary("7f13446d19b4497986980fa16a750f95",0);//泵设备实时概览字典
			initDataDictionary("cd7b24562b924d19b556de31256e22a1",0);//泵设备历史查询字典
			initDataDictionary("e0f5f3ff8a1f46678c284fba9cc113e8",1);//管设备实时概览字典
			initDataDictionary("fb7d070a349c403b8a26d71c12af7a05",1);//管设备历史查询字典
		}
	}
	
	public static int initInstanceConfigByProtocolName(String protocolName,String method){
		String sql="select t.name from tbl_protocolinstance t,tbl_acq_unit_conf t2 where t.unitid=t2.id and t2.protocol='"+protocolName+"'";
		List<String> instanceList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				instanceList.add(rs.getString(1));
			}
			if(instanceList.size()>0){
				initInstanceConfig(instanceList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initInstanceConfigByAcqUnitName(String unitName,String method){
		String sql="select t.name from tbl_protocolinstance t,tbl_acq_unit_conf t2 where t.unitid=t2.id and t2.unit_name='"+unitName+"'";
		List<String> instanceList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				instanceList.add(rs.getString(1));
			}
			if(instanceList.size()>0){
				initInstanceConfig(instanceList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initInstanceConfigByAcqUnitId(String unitId,String method){
		String sql="select t.name from tbl_protocolinstance t where t.unitid="+unitId;
		List<String> instanceList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				instanceList.add(rs.getString(1));
			}
			if(instanceList.size()>0){
				initInstanceConfig(instanceList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initInstanceConfigByAcqGroupName(String groupName,String method){
		String sql="select distinct(t.name) from tbl_protocolinstance t,tbl_acq_unit_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_group_conf t4 "
				+ " where t.unitid=t2.id and t2.id=t3.unitid and t3.groupid=t4.id and t4.group_name='"+groupName+"'";
		List<String> instanceList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				instanceList.add(rs.getString(1));
			}
			if(instanceList.size()>0){
				initInstanceConfig(instanceList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initInstanceConfigByAcqGroupId(String groupId,String method){
		String sql="select distinct(t.name) from tbl_protocolinstance t,tbl_acq_unit_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_group_conf t4 where t.unitid=t2.id and t2.id=t3.unitid and t3.groupid=t4.id and t4.id="+groupId;
		List<String> instanceList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				instanceList.add(rs.getString(1));
			}
			if(instanceList.size()>0){
				initInstanceConfig(instanceList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	
	public static int initInstanceConfig(List<String> instanceList,String method){
		String initUrl=Config.getInstance().configFile.getDriverConfig().getInstance();
		Gson gson = new Gson();
		int result=0;
		String instances=StringManagerUtils.joinStringArr2(instanceList, ",");
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
		
		if("delete".equalsIgnoreCase(method)){
			for(int i=0;instanceList!=null&&i<instanceList.size();i++){
				InitInstance initInstance=new InitInstance();
				initInstance.setInstanceName(instanceList.get(i));
				initInstance.setMethod(method);
				System.out.println("删除实例："+gson.toJson(initInstance));
				StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initInstance),"utf-8");
			}
		}else{
			String sql="select t.name,t.acqprotocoltype,t.ctrlprotocoltype,"
					+ "t.signinprefix,t.signinsuffix,t.heartbeatprefix,t.heartbeatsuffix,"
					+ "t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle,t4.type,"
					+ "listagg(t5.itemname, ',') within group(order by t5.id ) key "
					+ " from tbl_protocolinstance t,tbl_acq_unit_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_group_conf t4,tbl_acq_item2group_conf t5  "
					+ " where t.unitid=t2.id and t2.id=t3.unitid and t3.groupid=t4.id and t4.id=t5.groupid  ";
			if(StringManagerUtils.isNotNull(instances)){
				sql+=" and t.name in("+instances+")";
			}
			sql+= "group by t.name,t.acqprotocoltype,t.ctrlprotocoltype,t.signinprefix,t.signinsuffix,t.heartbeatprefix,t.heartbeatsuffix,"
					+ "t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle,t4.type";
			
			Map<String,InitInstance> InstanceListMap=new HashMap<String,InitInstance>();
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			Connection conn = null;   
			PreparedStatement pstmt = null;   
			ResultSet rs = null;
			conn=OracleJdbcUtis.getConnection();
			if(conn==null || modbusProtocolConfig==null){
	        	return -1;
	        }
			try {
				pstmt = conn.prepareStatement(sql);
				rs=pstmt.executeQuery();
				while(rs.next()){
					InitInstance initInstance=InstanceListMap.get(rs.getString(1));
					boolean isCtrl=false;
					if(initInstance==null){
						initInstance=new InitInstance();
						initInstance.setMethod(method);
						initInstance.setInstanceName(rs.getString(1));
						initInstance.setProtocolName(rs.getString(8));
						initInstance.setAcqProtocolType(rs.getString(2));
						initInstance.setCtrlProtocolType(rs.getString(3));
						
						initInstance.setSignInPrefix(rs.getString(4)==null?"":rs.getString(4));
						initInstance.setSignInSuffix(rs.getString(5)==null?"":rs.getString(5));
						
						initInstance.setHeartbeatPrefix(rs.getString(6)==null?"":rs.getString(6));
						initInstance.setHeartbeatSuffix(rs.getString(7)==null?"":rs.getString(7));
						
						initInstance.setAcqGroup(new ArrayList<InitInstance.Group>());
						initInstance.setCtrlGroup(new ArrayList<InitInstance.Group>());
					}
					InitInstance.Group group=new InitInstance.Group();
					group.setInterval(rs.getInt(11));
					group.setAddr(new ArrayList<Integer>());
					String[] itemsArr=rs.getString(13).split(",");
					for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(rs.getString(8))){
							for(int j=0;j<itemsArr.length;j++){
								for(int k=0;k<modbusProtocolConfig.getProtocol().get(i).getItems().size();k++){
									if(itemsArr[j].equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getTitle())){
										if(!StringManagerUtils.existOrNot(group.getAddr(), modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getAddr())){
											group.getAddr().add(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getAddr());
											if("rw".equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getRWType())){
												isCtrl=true;
											}
										}
										break;
									}
								}
							}
							Collections.sort(group.getAddr());
							break;
						}
					}
					if(rs.getInt(12)==1){//控制组
						initInstance.getCtrlGroup().add(group);
					}else{
						initInstance.getAcqGroup().add(group);
					}
					InstanceListMap.put(rs.getString(1), initInstance);
				}
				result=InstanceListMap.size();
				for(Entry<String, InitInstance> entry:InstanceListMap.entrySet()){
					try {
						System.out.println("实例初始化："+gson.toJson(entry.getValue()));
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
		}
		return result;
	}
	
	//初始化短信实例
	public static int initSMSInstanceConfig(List<String> instanceList,String method){
		String initUrl=Config.getInstance().configFile.getDriverConfig().getInstance();
		Gson gson = new Gson();
		int result=0;
		String instances=StringManagerUtils.joinStringArr2(instanceList, ",");
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
		
		if("delete".equalsIgnoreCase(method)){
			for(int i=0;instanceList!=null&&i<instanceList.size();i++){
				InitInstance initInstance=new InitInstance();
				initInstance.setInstanceName(instanceList.get(i));
				initInstance.setMethod(method);
				System.out.println("删除短信实例："+gson.toJson(initInstance));
				StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initInstance),"utf-8");
			}
		}else{
			String sql="select t.id,t.name,t.code,t.acqprotocoltype,t.ctrlprotocoltype,t.sort from tbl_protocolsmsinstance t where 1=1 ";
			if(StringManagerUtils.isNotNull(instances)){
				sql+=" and t.name in("+instances+")";
			}
			sql+= " order by t.sort";
			Connection conn = null;   
			PreparedStatement pstmt = null;   
			ResultSet rs = null;
			conn=OracleJdbcUtis.getConnection();
			if(conn==null){
	        	return -1;
	        }
			try {
				pstmt = conn.prepareStatement(sql);
				rs=pstmt.executeQuery();
				while(rs.next()){
					InitInstance initInstance=new InitInstance();
					initInstance.setMethod(method);
					initInstance.setInstanceName(rs.getString(2));
					initInstance.setAcqProtocolType(rs.getString(4));
					initInstance.setCtrlProtocolType(rs.getString(5));
					System.out.println("短信实例初始化："+gson.toJson(initInstance));
					StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initInstance),"utf-8");
				}
				
			} catch (SQLException e) {
				System.out.println("ID短信实例初始化sql："+sql);
				e.printStackTrace();
			} finally{
				OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
			}
		}
		return result;
	}
	
	public static int initPumpDriverAcquisitionInfoConfig(List<String> wellList,String method){
		String initUrl=Config.getInstance().configFile.getDriverConfig().getId();
		Gson gson = new Gson();
		int result=0;
		String wellName=StringManagerUtils.joinStringArr2(wellList, ",");
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
		String sql="select t.wellname,t.signinid,t.slave,t2.name "
				+ " from tbl_pumpdevice t,tbl_protocolinstance t2 "
				+ " where t.instancecode=t2.code ";
		if("update".equalsIgnoreCase(method)){
			sql+= " and t.signinid is not null and t.slave is not null";
		}	
		if(StringManagerUtils.isNotNull(wellName)){
			sql+=" and t.wellname in("+wellName+")";
		}
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null ){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				InitId initId=new InitId();
				initId.setMethod(method);
				initId.setID(rs.getString(2));
				initId.setSlave((byte) rs.getInt(3));
				initId.setInstanceName(rs.getString(4));
				System.out.println("泵设备ID初始化："+gson.toJson(initId));
				StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initId),"utf-8");
			}
		} catch (SQLException e) {
			System.out.println("ID初始化sql："+sql);
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return result;
	}
	
	public static int initPipelineDriverAcquisitionInfoConfig(List<String> wellList,String method){
		String initUrl=Config.getInstance().configFile.getDriverConfig().getId();
		Gson gson = new Gson();
		int result=0;
		String wellName=StringManagerUtils.joinStringArr2(wellList, ",");
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
		String sql="select t.wellname,t.signinid,t.slave,t2.name "
				+ " from tbl_pipelinedevice t,tbl_protocolinstance t2 "
				+ " where t.instancecode=t2.code ";
		if("update".equalsIgnoreCase(method)){
			sql+= " and t.signinid is not null and t.slave is not null";
		}	
		if(StringManagerUtils.isNotNull(wellName)){
			sql+=" and t.wellname in("+wellName+")";
		}
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null ){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				InitId initId=new InitId();
				initId.setMethod(method);
				initId.setID(rs.getString(2));
				initId.setSlave((byte) rs.getInt(3));
				initId.setInstanceName(rs.getString(4));
				System.out.println("管设备ID初始化："+gson.toJson(initId));
				StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initId),"utf-8");
			}
		} catch (SQLException e) {
			System.out.println("ID初始化sql："+sql);
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return result;
	}
	
	public static int initDriverAcquisitionInfoConfigByProtocolInstance(String instanceCode,String method){
		List<String> wellList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			String sql="select t.wellname from tbl_pumpdevice t where t.instancecode='"+instanceCode+"'";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initPumpDriverAcquisitionInfoConfig(wellList,method);
			}
			
			wellList=new ArrayList<String>();
			sql="select t.wellname from tbl_pipelinedevice t where t.instancecode='"+instanceCode+"'";
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initPipelineDriverAcquisitionInfoConfig(wellList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initDriverAcquisitionInfoConfigByProtocolInstanceId(String instanceId,String method){
		List<String> wellList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
        	return -1;
        }
		try {
			String sql="select t.wellname from tbl_pumpdevice t,tbl_protocolinstance t2 where t.deviceType<>2 and t.instancecode=t2.code and t2.id="+instanceId;
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initPumpDriverAcquisitionInfoConfig(wellList,method);
			}
			
			wellList=new ArrayList<String>();
			sql="select t.wellname from tbl_pipelinedevice t,tbl_protocolinstance t2 where t.deviceType<>2 and t.instancecode=t2.code and t2.id="+instanceId;
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				wellList.add(rs.getString(1));
			}
			if(wellList.size()>0){
				initPipelineDriverAcquisitionInfoConfig(wellList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initSMSDevice(List<String> wellList,String method){
		String initUrl=Config.getInstance().configFile.getDriverConfig().getSMS();
		Gson gson = new Gson();
		int result=0;
		String wellName=StringManagerUtils.joinStringArr2(wellList, ",");
		if(!StringManagerUtils.isNotNull(method)){
			method="update";
		}
		String sql="select t.wellname,t.signinid,t2.name "
				+ " from tbl_smsdevice t,tbl_protocolsmsinstance t2 "
				+ " where t.instancecode=t2.code ";
		if("update".equalsIgnoreCase(method)){
			sql+= " and t.signinid is not null";
		}	
		if(StringManagerUtils.isNotNull(wellName)){
			sql+=" and t.wellname in("+wellName+")";
		}
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null ){
        	return -1;
        }
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()){
				InitId initId=new InitId();
				initId.setMethod(method);
				initId.setID(rs.getString(2));
				initId.setInstanceName(rs.getString(3));
				System.out.println("短信设备初始化："+gson.toJson(initId));
				StringManagerUtils.sendPostMethod(initUrl, gson.toJson(initId),"utf-8");
			}
		} catch (SQLException e) {
			System.out.println("ID初始化sql："+sql);
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return result;
	}
	
	public static int initSMSDeviceByInstanceCode(String instanceCode,String method){
		String sql="select t.wellname from tbl_smsdevice t where t.instancecode='"+instanceCode+"'";
		List<String> wellList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
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
				initSMSDevice(wellList,method);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			OracleJdbcUtis.closeDBConnection(conn, pstmt, rs);
		}
		return 0;
	}
	
	public static int initSMSDeviceByInstanceId(String instanceId,String method){
		String sql="select t.wellname from tbl_smsdevice t,tbl_protocolsmsinstance t2 where t.instancecode=t2.code and t2.id="+instanceId;
		List<String> wellList=new ArrayList<String>();
		Connection conn = null;   
		PreparedStatement pstmt = null;   
		ResultSet rs = null;
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
				initSMSDevice(wellList,method);
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
		String sql="select v1.itemvalue as alarmLevel,v1.itemname as backgroundColor,v2.itemname as color,v3.itemname as opacity from "
				+ " (select * from tbl_code t where t.itemcode='BJYS' ) v1,"
				+ " (select * from tbl_code t where t.itemcode='BJQJYS' ) v2,"
				+ " (select * from tbl_code t where t.itemcode='BJYSTMD' ) v3 "
				+ " where v1.itemvalue=v2.itemvalue and v1.itemvalue=v3.itemvalue "
				+ " order by v1.itemvalue ";
		String sql2="select v1.itemvalue as alarmLevel,v1.itemname as backgroundColor,v2.itemname as color,v3.itemname as opacity from "
				+ " (select * from tbl_code t where t.itemcode='BJYS2' ) v1,"
				+ " (select * from tbl_code t where t.itemcode='BJQJYS2' ) v2,"
				+ " (select * from tbl_code t where t.itemcode='BJYSTMD2' ) v3 "
				+ " where v1.itemvalue=v2.itemvalue and v1.itemvalue=v3.itemvalue "
				+ " order by v1.itemvalue ";
		String sql3="select v1.itemvalue as alarmLevel,v1.itemname as backgroundColor,v2.itemname as color,v3.itemname as opacity from "
				+ " (select * from tbl_code t where t.itemcode='BJYS3' ) v1,"
				+ " (select * from tbl_code t where t.itemcode='BJQJYS3' ) v2,"
				+ " (select * from tbl_code t where t.itemcode='BJYSTMD3' ) v3 "
				+ " where v1.itemvalue=v2.itemvalue and v1.itemvalue=v3.itemvalue "
				+ " order by v1.itemvalue ";
		Connection conn = null;   
		PreparedStatement pstmt = null;  
		Statement stmt = null;  
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
			return ;
		}
		pstmt = conn.prepareStatement(sql); 
		rs=pstmt.executeQuery();
		while(rs.next()){
			if(rs.getInt(1)==0){
				alarmShowStyle.getOverview().getNormal().setValue(rs.getInt(1));
				alarmShowStyle.getOverview().getNormal().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getOverview().getNormal().setColor(rs.getString(3));
				alarmShowStyle.getOverview().getNormal().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==100){
				alarmShowStyle.getOverview().getFirstLevel().setValue(rs.getInt(1));
				alarmShowStyle.getOverview().getFirstLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getOverview().getFirstLevel().setColor(rs.getString(3));
				alarmShowStyle.getOverview().getFirstLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==200){
				alarmShowStyle.getOverview().getSecondLevel().setValue(rs.getInt(1));
				alarmShowStyle.getOverview().getSecondLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getOverview().getSecondLevel().setColor(rs.getString(3));
				alarmShowStyle.getOverview().getSecondLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==300){
				alarmShowStyle.getOverview().getThirdLevel().setValue(rs.getInt(1));
				alarmShowStyle.getOverview().getThirdLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getOverview().getThirdLevel().setColor(rs.getString(3));
				alarmShowStyle.getOverview().getThirdLevel().setOpacity(rs.getString(4));
			}	
		}
		
		pstmt = conn.prepareStatement(sql2); 
		rs=pstmt.executeQuery();
		while(rs.next()){
			if(rs.getInt(1)==0){
				alarmShowStyle.getDetails().getNormal().setValue(rs.getInt(1));
				alarmShowStyle.getDetails().getNormal().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getDetails().getNormal().setColor(rs.getString(3));
				alarmShowStyle.getDetails().getNormal().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==100){
				alarmShowStyle.getDetails().getFirstLevel().setValue(rs.getInt(1));
				alarmShowStyle.getDetails().getFirstLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getDetails().getFirstLevel().setColor(rs.getString(3));
				alarmShowStyle.getDetails().getFirstLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==200){
				alarmShowStyle.getDetails().getSecondLevel().setValue(rs.getInt(1));
				alarmShowStyle.getDetails().getSecondLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getDetails().getSecondLevel().setColor(rs.getString(3));
				alarmShowStyle.getDetails().getSecondLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==300){
				alarmShowStyle.getDetails().getThirdLevel().setValue(rs.getInt(1));
				alarmShowStyle.getDetails().getThirdLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getDetails().getThirdLevel().setColor(rs.getString(3));
				alarmShowStyle.getDetails().getThirdLevel().setOpacity(rs.getString(4));
			}	
		}
		
		pstmt = conn.prepareStatement(sql3); 
		rs=pstmt.executeQuery();
		while(rs.next()){
			if(rs.getInt(1)==0){
				alarmShowStyle.getStatistics().getNormal().setValue(rs.getInt(1));
				alarmShowStyle.getStatistics().getNormal().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getStatistics().getNormal().setColor(rs.getString(3));
				alarmShowStyle.getStatistics().getNormal().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==100){
				alarmShowStyle.getStatistics().getFirstLevel().setValue(rs.getInt(1));
				alarmShowStyle.getStatistics().getFirstLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getStatistics().getFirstLevel().setColor(rs.getString(3));
				alarmShowStyle.getStatistics().getFirstLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==200){
				alarmShowStyle.getStatistics().getSecondLevel().setValue(rs.getInt(1));
				alarmShowStyle.getStatistics().getSecondLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getStatistics().getSecondLevel().setColor(rs.getString(3));
				alarmShowStyle.getStatistics().getSecondLevel().setOpacity(rs.getString(4));
			}else if(rs.getInt(1)==300){
				alarmShowStyle.getStatistics().getThirdLevel().setValue(rs.getInt(1));
				alarmShowStyle.getStatistics().getThirdLevel().setBackgroundColor(rs.getString(2));
				alarmShowStyle.getStatistics().getThirdLevel().setColor(rs.getString(3));
				alarmShowStyle.getStatistics().getThirdLevel().setOpacity(rs.getString(4));
			}	
		}
		
		
		
		if(!dataModelMap.containsKey("AlarmShowStyle")){
			dataModelMap.put("AlarmShowStyle", alarmShowStyle);
		}
		OracleJdbcUtis.closeDBConnection(conn, stmt, pstmt, rs);
	}
	
	public static void LoadDeviceCommStatus() throws IOException, SQLException{
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		List<CommStatus> commStatusList=(List<CommStatus>) dataModelMap.get("DeviceCommStatus");
		if(commStatusList!=null){
			dataModelMap.remove("DeviceCommStatus");
		}
		commStatusList=new ArrayList<CommStatus>();
		Connection conn = null;   
		PreparedStatement pstmt = null;  
		Statement stmt = null;  
		ResultSet rs = null;
		conn=OracleJdbcUtis.getConnection();
		if(conn==null){
			return ;
		}
		String sql="select t.wellname,t.devicetype,t.orgid,t2.commstatus "
				+ " from tbl_pumpdevice t "
				+ " left outer join tbl_pumpacqdata_latest t2 on t2.wellid=t.id "
				+ " order by t.sortnum";
		pstmt = conn.prepareStatement(sql); 
		rs=pstmt.executeQuery();
		while(rs.next()){
			CommStatus commStatus=new CommStatus();
			commStatus.setDeviceName(rs.getString(1));
			commStatus.setDeviceType(rs.getInt(2));
			commStatus.setOrgId(rs.getInt(3));
			commStatus.setCommStatus(rs.getInt(4));
			commStatusList.add(commStatus);
		}
		
		sql="select t.wellname,t.devicetype,t.orgid,t2.commstatus "
				+ " from tbl_pipelinedevice t "
				+ " left outer join tbl_pipelineacqdata_latest t2 on t2.wellid=t.id "
				+ " order by t.sortnum";
		pstmt = conn.prepareStatement(sql); 
		rs=pstmt.executeQuery();
		while(rs.next()){
			CommStatus commStatus=new CommStatus();
			commStatus.setDeviceName(rs.getString(1));
			commStatus.setDeviceType(rs.getInt(2));
			commStatus.setOrgId(rs.getInt(3));
			commStatus.setCommStatus(rs.getInt(4));
			commStatusList.add(commStatus);
		}
		dataModelMap.put("DeviceCommStatus", commStatusList);
//		if(!dataModelMap.containsKey("DeviceCommStatus")){
//			dataModelMap.put("DeviceCommStatus", commStatusList);
//		}
		OracleJdbcUtis.closeDBConnection(conn, stmt, pstmt, rs);
	}
	
	public static int initWellCommStatus(){
		String intPumpCommSql="update tbl_pumpacqdata_latest t set t.commstatus=0 ";
		String intPipelineCommSql="update tbl_pipelineacqdata_latest t set t.commstatus=0 ";
//		sql="alter table TBL_PUMPACQDATA_HIST add addr201 VARCHAR2(50)";
		int result=0;
		try {
			result = JDBCUtil.updateRecord(intPumpCommSql, null);
			result = JDBCUtil.updateRecord(intPipelineCommSql, null);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
