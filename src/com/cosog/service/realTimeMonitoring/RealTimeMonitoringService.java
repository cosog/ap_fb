package com.cosog.service.realTimeMonitoring;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.WellInformation;
import com.cosog.model.data.DataDictionary;
import com.cosog.model.drive.KafkaConfig;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.model.gridmodel.WellGridPanelData;
import com.cosog.model.gridmodel.WellHandsontableChangedData;
import com.cosog.service.base.BaseService;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.data.DataitemsInfoService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.Config;
import com.cosog.utils.ConfigFile;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.Page;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;

@Service("realTimeMonitoringService")
public class RealTimeMonitoringService<T> extends BaseService<T> {
	@Autowired
	private CommonDataService service;
	@Autowired
	private DataitemsInfoService dataitemsInfoService;
	
	public String getDeviceRealTimeStatus(String orgId,String wellName,String deviceType) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			EquipmentDriverServerTask.initAlarmStyle();
			alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		}
		String tableName="tbl_pumpacqdata_latest";
		String ddicName="pumpRealTimeOverview";
		DataDictionary ddic = null;
		List<String> ddicColumnsList=new ArrayList<String>();
		if(StringManagerUtils.stringToInteger(deviceType)!=0){
			tableName="tbl_tubingacqdata_latest";
		}
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		
		String sql="select t.id,t.wellname,t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel ";
		
		String[] ddicColumns=ddic.getSql().split(",");
		for(int i=0;i<ddicColumns.length;i++){
			if(ddicColumns[i].toUpperCase().contains("ADDR")){
				ddicColumnsList.add(ddicColumns[i]);
			}
		}
		for(int i=0;i<ddicColumnsList.size();i++){
			sql+=",t2."+ddicColumnsList.get(i);
		}
		
		
		sql+= " from tbl_wellinformation t "
				+ "left outer join "+tableName+" t2 on t2.wellid=t.id"
				+ " where  t.orgid in ("+orgId+") and t.devicetype="+deviceType;
		if(StringManagerUtils.isNotNull(wellName)){
			sql+=" and t.wellName='"+wellName+"'";
		}
		sql+=" order by t.sortnum,t.wellname";
		
		
		
		
		int totals=this.getTotalCountRows(sql);
		List<?> list = this.findCallSql(sql);
//		String columns = "["
//				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
//				+ "{ \"header\":\"井名\",\"dataIndex\":\"wellName\" ,children:[] },"
//				+ "{ \"header\":\"通信状态\",\"dataIndex\":\"commStatusName\" ,width:50 ,children:[] }"
//				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalCount\":"+totals+",");
		result_json.append("\"totalRoot\":[");
		for(int i=0;i<list.size();i++){
			Object[] obj=(Object[]) list.get(i);
			result_json.append("{\"id\":"+obj[0]+",");
			result_json.append("\"wellName\":\""+obj[1]+"\",");
			result_json.append("\"commStatus\":"+obj[2]+",");
			result_json.append("\"commStatusName\":\""+obj[3]+"\",");
			result_json.append("\"commAlarmLevel\":"+obj[4]+",");
			
			for(int j=0;j<ddicColumnsList.size();j++){
				result_json.append("\""+ddicColumnsList.get(j).replaceAll(" ", "")+"\":"+obj[5+j]+",");
			}
			if(result_json.toString().endsWith(",")){
				result_json.deleteCharAt(result_json.length() - 1);
			}
			result_json.append("},");
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]");
		result_json.append(",\"AlarmShowStyle\":"+new Gson().toJson(alarmShowStyle)+"}");
		return result_json.toString();
	}

	public String getDeviceRealMonitorData(String deviceName,String deviceType) throws IOException, SQLException{
		int items=4;
		StringBuffer result_json = new StringBuffer();
		StringBuffer info_json = new StringBuffer();
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			EquipmentDriverServerTask.initAlarmStyle();
			alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		}
		String tableName="tbl_pumpacqdata_latest";
		if(StringManagerUtils.stringToInteger(deviceType)!=0){
			tableName="tbl_tubingacqdata_latest";
		}
		
		String itemsSql="select t.wellname,t3.protocol, listagg(t6.itemname, ',') within group(order by t6.id ) key "
				+ " from tbl_wellinformation t,tbl_protocolinstance t2,tbl_acq_unit_conf t3,tbl_acq_group2unit_conf t4,tbl_acq_group_conf t5,tbl_acq_item2group_conf t6 "
				+ " where t.instancecode=t2.code and t2.unitid=t3.id and t3.id=t4.unitid and t4.groupid=t5.id and t5.id=t6.groupid "
				+ " and t.wellname='"+deviceName+"' and t.devicetype= "+StringManagerUtils.stringToInteger(deviceType)
				+ " group by t.wellname,t3.protocol";
		
		
		List<?> itemsList = this.findCallSql(itemsSql);
		String columns = "[";
		for(int i=1;i<=items;i++){
			columns+= "{ \"header\":\"名称\",\"dataIndex\":\"name"+i+"\",children:[] },"
					+ "{ \"header\":\"变量\",\"dataIndex\":\"value"+i+"\",children:[] }";
			if(i<items){
				columns+=",";
			}
		}
		columns+= "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalRoot\":[");
		info_json.append("[");
		for(int i=0;i<itemsList.size();i++){
			Object[] itemsObj=(Object[]) itemsList.get(i);
			String protocolCode=itemsObj[1]+"";
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			
			ModbusProtocolConfig.Protocol protocol=null;
			for(int j=0;j<modbusProtocolConfig.getProtocol().size();j++){
				if(protocolCode.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(j).getName())){
					protocol=modbusProtocolConfig.getProtocol().get(j);
					break;
				}
			}
			
			if(protocol!=null && StringManagerUtils.isNotNull(itemsObj[2]+"")){
				String acqColumns="";
				String[] itemsArr=(itemsObj[2]+"").split(",");
				List<String> columnsList=new ArrayList<String>();
				List<String> columnsNameList=new ArrayList<String>();
				List<String> columnsDataTypeList=new ArrayList<String>();
				List<Integer> alarmLevelList=new ArrayList<Integer>();
				
				for(int j=0;j<itemsArr.length;j++){
					for(int k=0;k<protocol.getItems().size();k++){
						if(itemsArr[j].equalsIgnoreCase(protocol.getItems().get(k).getTitle())){
							String column="ADDR"+protocol.getItems().get(k).getAddr();
							String columnName=protocol.getItems().get(k).getTitle();
							columnsList.add(column);
							columnsNameList.add(columnName);
							columnsDataTypeList.add(protocol.getItems().get(k).getIFDataType());
							break;
						}
					}
				}
				
				String sql="select t.id,t.wellname,to_char(t2.acqtime,'yyyy-mm-dd hh24:mi:ss'), t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel ";
				for(int j=0;j<columnsList.size();j++){
					sql+=",t2."+columnsList.get(j);
				}
				sql+= " from tbl_wellinformation t "
						+ " left outer join "+tableName+" t2 on t2.wellid=t.id"
						+ " where  t.wellName='"+deviceName+"' and t.devicetype="+deviceType;
				List<?> list = this.findCallSql(sql);
				if(list.size()>0){
					int row=1;
					Object[] obj=(Object[]) list.get(0);
					if(columnsList.size()%items==0){
						row=columnsList.size()/items+1;
					}else{
						row=columnsList.size()/items+2;
					}
					result_json.append("{\"name1\":\""+(obj[1]+":"+obj[2]+","+obj[4])+"\"},");
					
					for(int j=1;j<row;j++){
						//记录每一行的详细信息
						
						result_json.append("{");
						
						
						for(int k=0;k<items;k++){
							int index=items*(j-1)+k;
							String columnName="";
							String value="";
							String column="";
							String columnDataType="";
							int alarmLevel=0;
							if(index<columnsNameList.size()){
								columnName=columnsNameList.get(index);
								value=obj[index+6]+"";
								column=columnsList.get(index);
								columnDataType=columnsDataTypeList.get(index);
							}
							if(StringManagerUtils.stringToFloat(value)>2){
								alarmLevel=100;
							}
							result_json.append("\"name"+(k+1)+"\":\""+columnName+"\",");
							result_json.append("\"value"+(k+1)+"\":\""+value+"\",");
							info_json.append("{\"row\":"+j+",\"col\":"+k+",\"columnName\":\""+columnName+"\",\"column\":\""+column+"\",\"columnDataType\":\""+columnDataType+"\",\"alarmLevel\":"+alarmLevel+"},");
							
						}
						if(result_json.toString().endsWith(",")){
							result_json.deleteCharAt(result_json.length() - 1);
						}
						result_json.append("},");
					}
					if(result_json.toString().endsWith(",")){
						result_json.deleteCharAt(result_json.length() - 1);
					}
				}
			}
		}
		if(info_json.toString().endsWith(",")){
			info_json.deleteCharAt(info_json.length() - 1);
		}
		info_json.append("]");
		result_json.append("]");
		result_json.append(",\"CellInfo\":"+info_json);
		result_json.append(",\"AlarmShowStyle\":"+new Gson().toJson(alarmShowStyle));
		result_json.append("}");
//		System.out.println(result_json.toString());
		return result_json.toString().replaceAll("null", "");
	}
	
	
	public String getPumpControlandInfoData(String wellName,String deviceType,int userId)throws Exception {
		StringBuffer result_json = new StringBuffer();
		
		
		String isControlSql="select t2.role_flag from tbl_user t,tbl_role t2 where t.user_type=t2.role_id and t.user_no="+userId;
		String protocolItemsSql="select t.wellname,t3.protocol, listagg(t6.itemname, ',') within group(order by t6.id ) key "
				+ " from tbl_wellinformation t,tbl_protocolinstance t2,tbl_acq_unit_conf t3,tbl_acq_group2unit_conf t4,tbl_acq_group_conf t5,tbl_acq_item2group_conf t6 "
				+ " where t.instancecode=t2.code and t2.unitid=t3.id and t3.id=t4.unitid and t4.groupid=t5.id and t5.id=t6.groupid "
				+ " and t.wellname='"+wellName+"' and t.devicetype= "+StringManagerUtils.stringToInteger(deviceType)
				+ " group by t.wellname,t3.protocol";
		
		List<?> isControlList = this.findCallSql(isControlSql);
		List<?> itemsList = this.findCallSql(protocolItemsSql);
		
		String isControl=isControlList.size()>0?isControlList.get(0).toString():"0";
		
		
		List<String> controlItems=new ArrayList<String>();
		List<String> controlColumns=new ArrayList<String>();
		StringBuffer deviceInfoDataList=new StringBuffer();
		StringBuffer deviceControlList=new StringBuffer();
		deviceInfoDataList.append("[");
		deviceControlList.append("[");
		
		String protocolCode="";
		for(int i=0;i<itemsList.size();i++){
			Object[] obj=(Object[]) itemsList.get(i);
			protocolCode=obj[1]+"";
			String[] itemsArr=(obj[2]+"").split(",");
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			if(modbusProtocolConfig!=null&&modbusProtocolConfig.getProtocol()!=null){
				for(int j=0;j<modbusProtocolConfig.getProtocol().size();j++){
					if(protocolCode.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(j).getCode())){
						for(int k=0;k<modbusProtocolConfig.getProtocol().get(j).getItems().size();k++){
							for(int m=0;m<itemsArr.length;m++){
								if(itemsArr[m].equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getTitle())){
									if("rw".equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getRWType())){
										controlItems.add(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getTitle());
										controlColumns.add("ADDR"+modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getAddr());
									}
									break;
								}
							}
						}
						break;
					}
				}
			}
		}
		
		String tableName="tbl_pumpacqdata_latest";
		String sql="select t.factorynumber,t.model,t.productiondate,t.deliverydate,t.commissioningdate,t.controlcabinetmodel ";
		if(StringManagerUtils.stringToInteger(deviceType)>0){
			tableName="tbl_tubingacqdata_latest";
		}
		for(int i=0;i<controlColumns.size();i++){
			sql+=",t2."+controlColumns.get(i);
		}
		
		if(StringManagerUtils.stringToInteger(deviceType)>0){
			sql+=",t.pipelinelength";
		}
		sql+= "from TBL_WELLINFORMATION t,"+tableName+" t2 where t.id=t2.wellid and t.wellname='"+wellName+"' and t.devicetype="+StringManagerUtils.stringToInteger(deviceType);
		
		result_json.append("{ \"success\":true,\"isControl\":"+isControl+",");
		List<?> list = this.findCallSql(sql);
		if(list.size()>0){
			Object[] obj=(Object[]) list.get(0);
			
			deviceInfoDataList.append("{\"title\":\"出厂编号\",\"name\":\"factorynumber\",\"value\":\""+obj[0]+"\"},");
			deviceInfoDataList.append("{\"title\":\"规格型号\",\"name\":\"model\",\"value\":\""+obj[1]+"\"},");
			deviceInfoDataList.append("{\"title\":\"生产日期\",\"name\":\"productiondate\",\"value\":\""+obj[2]+"\"},");
			deviceInfoDataList.append("{\"title\":\"发货日期\",\"name\":\"deliverydate\",\"value\":\""+obj[3]+"\"},");
			deviceInfoDataList.append("{\"title\":\"投产日期\",\"name\":\"commissioningdate\",\"value\":\""+obj[4]+"\"},");
			deviceInfoDataList.append("{\"title\":\"控制柜型号\",\"name\":\"controlcabinetmodel\",\"value\":\""+obj[5]+"\"}");
			if(StringManagerUtils.stringToInteger(deviceType)>0){
				deviceInfoDataList.append("{\"title\":\"管体长度\",\"name\":\"pipelinelength\",\"value\":\""+obj[6+controlColumns.size()]+"\"}");
			}
			for(int i=0;i<controlColumns.size();i++){
				deviceControlList.append("{\"title\":\""+controlItems.get(i)+"\",\"name\":\""+controlColumns.get(i)+"\",\"value\":\""+obj[6+i]+"\"},");
			}
			if(deviceControlList.toString().endsWith(",")){
				deviceControlList.deleteCharAt(deviceControlList.length() - 1);
			}
			
			
		}
		deviceInfoDataList.append("]");
		deviceControlList.append("]");
		result_json.append("\"deviceInfoDataList\":"+deviceInfoDataList+",");
		result_json.append("\"deviceControlList\":"+deviceControlList);
		result_json.append("}");
		return result_json.toString().replaceAll("null", "");
	}
	
	public String loadCurveTypeComboxList(String wellName,String deviceType)throws Exception {
		StringBuffer result_json = new StringBuffer();
		List<String> controlItems=new ArrayList<String>();
		List<String> controlColumns=new ArrayList<String>();
		String protocolSql="select upper(t.protocolcode) from TBL_WELLINFORMATION t where t.wellname='"+wellName+"' and t.devicetype="+StringManagerUtils.stringToInteger(deviceType);
		List<?> protocolList = this.findCallSql(protocolSql);
		String protocolCode="";
		if(protocolList.size()>0){
			protocolCode=protocolList.get(0)+"";
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			if(modbusProtocolConfig!=null&&modbusProtocolConfig.getProtocol()!=null){
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(protocolCode.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getCode())){
						for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
							if(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getIFDataType().contains("float")||modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getIFDataType().contains("int")){//如果float或者int
								controlItems.add(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getTitle());
								controlColumns.add("ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr());
							}
						}
						break;
					}
				}
			}
		}
		
		result_json.append("{\"totals\":"+controlColumns.size()+",\"list\":[");
		for(int i=0;i<controlColumns.size();i++){
			result_json.append("{boxkey:\"" + controlColumns.get(i) + "\",");
			result_json.append("boxval:\"" + controlItems.get(i) + "\"},");
		}
		if (result_json.toString().endsWith(",")) {
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]}");
		return result_json.toString();
	}
	
	
	public String getRealTimeCurveData(String deviceName,String item,String deviceType)throws Exception {
		StringBuffer result_json = new StringBuffer();
		List<String> controlItems=new ArrayList<String>();
		List<String> controlColumns=new ArrayList<String>();
		String protocolSql="select upper(t3.protocol) from tbl_wellinformation t,tbl_protocolinstance t2,tbl_acq_unit_conf t3 where t.instancecode=t2.code and t2.unitid=t3.id"
				+ " and  t.wellname='"+deviceName+"' and t.devicetype="+StringManagerUtils.stringToInteger(deviceType);
		List<?> protocolList = this.findCallSql(protocolSql);
		String protocolCode="";
		String column="";
		String unit="";
		String dataType="";
		String tableName="tbl_pumpacqdata_hist";
		if(StringManagerUtils.stringToInteger(deviceType)>0){
			tableName="tbl_tubingacqdata_hist";
		}
		if(protocolList.size()>0){
			protocolCode=protocolList.get(0)+"";
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			if(modbusProtocolConfig!=null&&modbusProtocolConfig.getProtocol()!=null){
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(protocolCode.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getCode())){
						for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
							if(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getTitle().equalsIgnoreCase(item)){
								column="ADDR"+modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getAddr();
								unit=modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getUnit();
								dataType=modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getIFDataType();
								break;
							}
						}
						break;
					}
				}
			}
		}
		
		result_json.append("{\"deviceName\":\""+deviceName+"\",\"item\":\""+item+"\",\"column\":\""+column+"\",\"unit\":\""+unit+"\",\"dataType\":\""+dataType+"\",\"list\":[");
		if(dataType.toUpperCase().contains("FLOAT")){//只查询float类型数据的曲线
			String sql="select to_char(t.acqtime,'yyyy-mm-dd hh24:mi:ss'), t."+column+" "
					+ " from "+tableName +" t,tbl_wellinformation t2 "
					+ " where t.wellid=t2.id "
					+ " and t.acqtime >to_date('"+StringManagerUtils.getCurrentTime("yyyy-MM-dd")+"','yyyy-mm-dd') "
					+ " and t2.wellname='"+deviceName+"' and t2.devicetype="+StringManagerUtils.stringToInteger(deviceType)
					+ " order by t.acqtime";
			List<?> list = this.findCallSql(sql);
			for(int i=0;i<list.size();i++){
				Object[] obj=(Object[]) list.get(i);
				result_json.append("{acqTime:\"" + obj[0] + "\",");
				result_json.append("value:\"" + obj[1] + "\"},");
			}
			if (result_json.toString().endsWith(",")) {
				result_json.deleteCharAt(result_json.length() - 1);
			}
		}
		result_json.append("]}");
//		System.out.println(result_json.toString());
		return result_json.toString();
	}
}
