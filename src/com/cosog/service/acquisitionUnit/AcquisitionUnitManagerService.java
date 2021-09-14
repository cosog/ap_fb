package com.cosog.service.acquisitionUnit;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosog.model.AcquisitionGroup;
import com.cosog.model.AcquisitionGroupItem;
import com.cosog.model.AcquisitionUnitGroup;
import com.cosog.model.drive.KafkaConfig;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.service.base.BaseService;
import com.cosog.service.base.CommonDataService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.DataSourceConfig;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.Page;
import com.cosog.utils.StringManagerUtils;
import com.cosog.utils.TcpServerConfigMap;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * <p>描述：角色维护服务</p>
 * 
 * @author gao 2014-06-06
 *
 * @param <T>
 */
@Service("acquisitionUnitManagerService")
@SuppressWarnings("rawtypes")
public class AcquisitionUnitManagerService<T> extends BaseService<T> {
	@Autowired
private CommonDataService service;

	public String getAcquisitionUnitList(Map map,Page pager) {
		String protocolName = (String) map.get("protocolName");
		String unitName = (String) map.get("unitName");
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select t.id as id,t.unit_code as unitCode,t.unit_name as unitName,t.remark "
				+ " from tbl_acq_unit_conf t where 1=1");
//		if (StringManagerUtils.isNotNull(protocolName)) {
//			sqlBuffer.append(" and t.protocol = '" + protocolName + "' ");
//		}
		sqlBuffer.append(" and t.protocol = '" + protocolName + "' ");
		
		
		sqlBuffer.append(" and t.protocol='"+protocolName+"'");
		if (StringManagerUtils.isNotNull(unitName)) {
			sqlBuffer.append(" and t.unit_name like '%" + unitName + "%' ");
		}
		
		sqlBuffer.append(" order by t.id  asc");
		String json = "";
		String columns=service.showTableHeadersColumns("acquisitionUnit");
		try {
			json=this.findPageBySqlEntity(sqlBuffer.toString(),columns , pager );
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json;
	}
	
	public String doAcquisitionGroupShow(Map map,Page pager) {
		String groupName = (String) map.get("groupName");
		String protocolName = (String) map.get("protocolName");
		StringBuffer sqlBuffer = new StringBuffer();
		StringBuffer jsonBuffer = new StringBuffer();
		sqlBuffer.append("select t.id as id,t.group_name as groupName,t.group_code as groupCode,"
				+ " t.acq_cycle as acqCycle,t.save_cycle as saveCycle,t.remark "
				+ " from tbl_acq_group_conf t"
				+ " where 1=1");
		sqlBuffer.append(" and t.protocol='"+protocolName+"'");
		if (StringManagerUtils.isNotNull(groupName)) {
			sqlBuffer.append(" and t.group_name like '%" + groupName + "%' ");
		}
		sqlBuffer.append(" order by t.id  asc");
		String json = "";
//		String columns=service.showTableHeadersColumns("acquisitionUnit");
		String columns="["
				+ "{ \"header\":\"\",\"dataIndex\":\"checked\",width:50 ,children:[] },"
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
				+ "{ \"header\":\"名称\",\"dataIndex\":\"groupName\" ,children:[] },"
				+ "{ \"header\":\"编码\",\"dataIndex\":\"groupCode\" ,children:[] },"
				+ "{ \"header\":\"采集周期(s)\",\"dataIndex\":\"acqCycle\" ,children:[] },"
				+ "{ \"header\":\"保存周期(s)\",\"dataIndex\":\"saveCycle\" ,children:[] },"
				+ "{ \"header\":\"描述\",\"dataIndex\":\"remark\",width:200 ,children:[] }"
				+ "]";
		List<?> list=this.findCallSql(sqlBuffer.toString());
		jsonBuffer.append("{\"success\":true,\"totalCount\":" + list.size() + ",\"columns\":"+columns+",\"totalRoot\":[");
		for (int i = 0; i < list.size(); i++) {
			Object[] obj = (Object[]) list.get(i);
			jsonBuffer.append("{\"checked\":false,");
			jsonBuffer.append("\"id\":\""+obj[0]+"\",");
			jsonBuffer.append("\"groupName\":\""+obj[1]+"\",");
			jsonBuffer.append("\"groupCode\":\""+obj[2]+"\",");
			jsonBuffer.append("\"acqCycle\":\""+obj[3]+"\",");
			jsonBuffer.append("\"saveCycle\":\""+obj[4]+"\",");
			jsonBuffer.append("\"remark\":\""+obj[5]+"\"},");
		}
		if(jsonBuffer.toString().endsWith(",")){
			jsonBuffer.deleteCharAt(jsonBuffer.length() - 1);
		}
		jsonBuffer.append("]}");
		return jsonBuffer.toString();
	}
	
	public String getProtocolItemsConfigData(String protocolName,String classes,String code){
		StringBuffer result_json = new StringBuffer();
		Gson gson = new Gson();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		String columns = "["
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
//				+ "{ \"header\":\"名称\",\"dataIndex\":\"name\",width:120 ,children:[] },"
				+ "{ \"header\":\"名称\",\"dataIndex\":\"title\",width:120 ,children:[] },"
				+ "{ \"header\":\"地址\",\"dataIndex\":\"addr\",width:80 ,children:[] },"
				+ "{ \"header\":\"数量\",\"dataIndex\":\"quantity\",width:80 ,children:[] },"
				+ "{ \"header\":\"存储数据类型\",\"dataIndex\":\"storeDataType\",width:80 ,children:[] },"
				+ "{ \"header\":\"接口数据类型\",\"dataIndex\":\"IFDataType\",width:80 ,children:[] },"
				+ "{ \"header\":\"读写类型\",\"dataIndex\":\"RWType\",width:80 ,children:[] },"
				+ "{ \"header\":\"单位\",\"dataIndex\":\"unit\",width:80 ,children:[] },"
				+ "{ \"header\":\"换算比例\",\"dataIndex\":\"ratio\",width:80 ,children:[] },"
				+ "{ \"header\":\"采集模式\",\"dataIndex\":\"acqMode\",width:80 ,children:[] }"
				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalRoot\":[");
		
		List<String> itemsList=new ArrayList<String>();
		if("3".equalsIgnoreCase(classes)){
			String sql="select t.itemname from TBL_ACQ_ITEM2GROUP_CONF t,tbl_acq_group_conf t2 where t.groupid=t2.id and t2.group_code='"+code+"' order by t.id";
			List<?> list=this.findCallSql(sql);
			for(int i=0;i<list.size();i++){
				itemsList.add(list.get(i)+"");
			}
		}
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			ModbusProtocolConfig.Protocol protocolConfig=modbusProtocolConfig.getProtocol().get(i);
			if(protocolName.equalsIgnoreCase(protocolConfig.getName())){
				for(int j=0;j<protocolConfig.getItems().size();j++){
					boolean checked=false;
					checked=StringManagerUtils.existOrNot(itemsList, protocolConfig.getItems().get(j).getTitle(),false);
					result_json.append("{\"checked\":"+checked+","
							+ "\"id\":"+(j+1)+","
							+ "\"title\":\""+protocolConfig.getItems().get(j).getTitle()+"\","
							+ "\"addr\":"+protocolConfig.getItems().get(j).getAddr()+","
							+ "\"quantity\":"+protocolConfig.getItems().get(j).getQuantity()+","
							+ "\"storeDataType\":\""+protocolConfig.getItems().get(j).getStoreDataType()+"\","
							+ "\"IFDataType\":\""+protocolConfig.getItems().get(j).getIFDataType()+"\","
							+ "\"ratio\":"+protocolConfig.getItems().get(j).getRatio()+","
							+ "\"RWType\":\""+("r".equalsIgnoreCase(protocolConfig.getItems().get(j).getRWType())?"只读":"读写")+"\","
							+ "\"unit\":\""+protocolConfig.getItems().get(j).getUnit()+"\","
							+ "\"acqMode\":\""+("active".equalsIgnoreCase(protocolConfig.getItems().get(j).getAcqMode())?"主动上传":"被动响应")+"\"},");
				}
				break;
			}
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]");
		result_json.append("}");
		return result_json.toString();
	}
	
	public String getModbusProtocolAlarmItemsConfigData(String protocolName,String classes,String code){
		StringBuffer result_json = new StringBuffer();
		Gson gson = new Gson();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		String columns = "["
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
//				+ "{ \"header\":\"名称\",\"dataIndex\":\"name\",width:120 ,children:[] },"
				+ "{ \"header\":\"名称\",\"dataIndex\":\"title\",width:120 ,children:[] },"
				+ "{ \"header\":\"地址\",\"dataIndex\":\"addr\",width:80 ,children:[] },"
				+ "{ \"header\":\"上限\",\"dataIndex\":\"upperLimit\",width:80 ,children:[] },"
				+ "{ \"header\":\"下限\",\"dataIndex\":\"lowerLimit\",width:80 ,children:[] },"
				+ "{ \"header\":\"报警级别\",\"dataIndex\":\"alarmLevel\",width:80 ,children:[] },"
				+ "{ \"header\":\"报警开关\",\"dataIndex\":\"alarmSign\",width:80 ,children:[] }"
				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalRoot\":[");
		
		List<Integer> itemAddrsList=new ArrayList<Integer>();
		List<?> list=null;
		if("3".equalsIgnoreCase(classes)){
			String sql="select t.itemname,t.itemcode,t.itemaddr,t.upperlimit,t.lowerlimit,t.hystersis,t.delay,"
					+ " t3.itemname as alarmLevel,decode(t.alarmsign,0,'disable','enable') "
					+ " from tbl_alarm_item2group_conf t,tbl_alarm_group_conf t2,tbl_code t3  "
					+ " where t.groupid=t2.id and upper(t3.itemcode)=upper('BJJB') and t.alarmlevel=t3.itemvalue and t2.group_code='"+code+"' "
					+ " order by t.id";
			list=this.findCallSql(sql);
			for(int i=0;i<list.size();i++){
				Object[] obj = (Object[]) list.get(i);
				itemAddrsList.add(StringManagerUtils.stringToInteger(obj[2]+""));
			}
		}
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			ModbusProtocolConfig.Protocol protocolConfig=modbusProtocolConfig.getProtocol().get(i);
			if(protocolName.equalsIgnoreCase(protocolConfig.getName())){
				for(int j=0;j<protocolConfig.getItems().size();j++){
					String upperLimit="",lowerLimit="",hystersis="",delay="",alarmLevel="",alarmSign="";
					boolean checked=false;
					for(int k=0;k<itemAddrsList.size();k++){
						Object[] obj = (Object[]) list.get(k);
						if(itemAddrsList.get(k)==protocolConfig.getItems().get(j).getAddr()){
							checked=true;
							upperLimit=obj[3]+"";
							lowerLimit=obj[4]+"";
							hystersis=obj[5]+"";
							delay=obj[6]+"";
							alarmLevel=obj[7]+"";
							alarmSign=obj[8]+"";
							break;
						}
					}
					result_json.append("{\"checked\":"+checked+","
							+ "\"id\":"+(j+1)+","
							+ "\"title\":\""+protocolConfig.getItems().get(j).getTitle()+"\","
							+ "\"addr\":"+protocolConfig.getItems().get(j).getAddr()+","
							+ "\"upperLimit\":\""+upperLimit+"\","
							+ "\"lowerLimit\":\""+lowerLimit+"\","
							+ "\"hystersis\":\""+hystersis+"\","
							+ "\"delay\":\""+delay+"\","
							+ "\"alarmLevel\":\""+alarmLevel+"\","
							+ "\"alarmSign\":\""+alarmSign+"\"},");
				}
				break;
			}
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]");
		result_json.append("}");
		return result_json.toString();
	}
	
	public String getProtocolInstanceItemsConfigData(String instanceName){
		StringBuffer result_json = new StringBuffer();
		Gson gson = new Gson();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		String columns = "["
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
				+ "{ \"header\":\"名称\",\"dataIndex\":\"title\",width:120 ,children:[] },"
				+ "{ \"header\":\"地址\",\"dataIndex\":\"addr\",width:80 ,children:[] },"
				+ "{ \"header\":\"数量\",\"dataIndex\":\"quantity\",width:80 ,children:[] },"
				+ "{ \"header\":\"存储数据类型\",\"dataIndex\":\"storeDataType\",width:80 ,children:[] },"
				+ "{ \"header\":\"接口数据类型\",\"dataIndex\":\"IFDataType\",width:80 ,children:[] },"
				+ "{ \"header\":\"读写类型\",\"dataIndex\":\"RWType\",width:80 ,children:[] },"
				+ "{ \"header\":\"单位\",\"dataIndex\":\"unit\",width:80 ,children:[] },"
				+ "{ \"header\":\"换算比例\",\"dataIndex\":\"ratio\",width:80 ,children:[] },"
				+ "{ \"header\":\"采集模式\",\"dataIndex\":\"acqMode\",width:80 ,children:[] }"
				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalRoot\":[");
		List<String> itemsList=new ArrayList<String>();
		
		String protocolSql="select t.protocol from tbl_acq_unit_conf t,tbl_protocolinstance t2 where t2.unitid=t.id and t2.name='"+instanceName+"'";
		String itemsSql="select distinct(t.itemname) "
				+ " from tbl_acq_item2group_conf t,tbl_acq_group_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_unit_conf t4,tbl_protocolinstance t5 "
				+ " where t.groupid=t2.id and t2.id=t3.groupid and t3.unitid=t4.id and t4.id=t5.unitid and t5.name='"+instanceName+"'";
		
		List<?> protocolList=this.findCallSql(protocolSql);
		if(protocolList.size()>0){
			String protocolName=protocolList.get(0)+"";
			List<?> list=this.findCallSql(itemsSql);
			for(int i=0;i<list.size();i++){
				itemsList.add(list.get(i)+"");
			}
			for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
				ModbusProtocolConfig.Protocol protocolConfig=modbusProtocolConfig.getProtocol().get(i);
				if(protocolName.equalsIgnoreCase(protocolConfig.getName())){
					for(int j=0;j<protocolConfig.getItems().size();j++){
						if(StringManagerUtils.existOrNot(itemsList, protocolConfig.getItems().get(j).getTitle(),false)){
							result_json.append("{\"id\":"+(j+1)+","
									+ "\"title\":\""+protocolConfig.getItems().get(j).getTitle()+"\","
									+ "\"addr\":"+protocolConfig.getItems().get(j).getAddr()+","
									+ "\"quantity\":"+protocolConfig.getItems().get(j).getQuantity()+","
									+ "\"storeDataType\":\""+protocolConfig.getItems().get(j).getStoreDataType()+"\","
									+ "\"IFDataType\":\""+protocolConfig.getItems().get(j).getIFDataType()+"\","
									+ "\"ratio\":"+protocolConfig.getItems().get(j).getRatio()+","
									+ "\"RWType\":\""+("r".equalsIgnoreCase(protocolConfig.getItems().get(j).getRWType())?"只读":"读写")+"\","
									+ "\"unit\":\""+protocolConfig.getItems().get(j).getUnit()+"\","
									+ "\"acqMode\":\""+("active".equalsIgnoreCase(protocolConfig.getItems().get(j).getAcqMode())?"主动上传":"被动响应")+"\"},");
						}
						
					}
					break;
				}
			}
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]");
		result_json.append("}");
		return result_json.toString();
	}
	
	public String getProtocolAlarmInstanceItemsConfigData(String instanceName){
		StringBuffer result_json = new StringBuffer();
		Gson gson = new Gson();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		String columns = "["
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
				+ "{ \"header\":\"名称\",\"dataIndex\":\"title\",width:120 ,children:[] },"
				+ "{ \"header\":\"地址\",\"dataIndex\":\"addr\",width:80 ,children:[] },"
				+ "{ \"header\":\"上限\",\"dataIndex\":\"upperLimit\",width:80 ,children:[] },"
				+ "{ \"header\":\"下限\",\"dataIndex\":\"lowerLimit\",width:80 ,children:[] },"
				+ "{ \"header\":\"回差\",\"dataIndex\":\"hystersis\",width:80 ,children:[] },"
				+ "{ \"header\":\"延时(s)\",\"dataIndex\":\"delay\",width:80 ,children:[] },"
				+ "{ \"header\":\"报警级别\",\"dataIndex\":\"alarmLevel\",width:80 ,children:[] },"
				+ "{ \"header\":\"报警开关\",\"dataIndex\":\"alarmSign\",width:80 ,children:[] }"
				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalRoot\":[");
		List<Integer> itemAddrsList=new ArrayList<Integer>();
		
		String itemsSql="select t.id, t.itemname,t.itemcode,t.itemaddr,t.upperlimit,t.lowerlimit,t.hystersis,t.delay,"
				+ "t4.itemname as alarmLevel,decode(t.alarmsign,0,'disable','enable') "
				+ " from tbl_alarm_item2group_conf t,tbl_alarm_group_conf t2,tbl_protocolalarminstance t3, tbl_code t4 "
				+ " where t.groupid=t2.id and t2.id=t3.alarmgroupid and upper(t4.itemcode)=upper('BJJB') and t.alarmlevel=t4.itemvalue "
				+ " and t3.name='"+instanceName+"' "
				+ " order by t.id";
		
		List<?> list=this.findCallSql(itemsSql);
		for(int i=0;i<list.size();i++){
			Object[] obj = (Object[]) list.get(i);
			result_json.append("{\"id\":"+(i+1)+","
					+ "\"title\":\""+obj[1]+"\","
					+ "\"code\":\""+obj[2]+"\","
					+ "\"addr\":\""+obj[3]+"\","
					+ "\"upperLimit\":\""+obj[4]+"\","
					+ "\"lowerLimit\":\""+obj[5]+"\","
					+ "\"hystersis\":\""+obj[6]+"\","
					+ "\"delay\":\""+obj[7]+"\","
					+ "\"alarmLevel\":\""+obj[8]+"\","
					+ "\"alarmSign\":\""+obj[9]+"\"},");
		}
		
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]");
		result_json.append("}");
		return result_json.toString().replaceAll("null", "");
	}
	
	public String getModbusProtocolConfigTreeData(){
		StringBuffer result_json = new StringBuffer();
		StringBuffer pumpTree_json = new StringBuffer();
		StringBuffer pipelineTree_json = new StringBuffer();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		pumpTree_json.append("[");
		pipelineTree_json.append("[");
		
		if(modbusProtocolConfig!=null){
			String unitSql="select t.id as id,t.unit_code as unitCode,t.unit_name as unitName,t.remark,t.protocol from tbl_acq_unit_conf t order by t.protocol,t.id";
			String groupSql="select t3.id,t3.group_code,t3.group_name,t3.acq_cycle,t3.save_cycle,t3.remark,t3.protocol,t2.id as unitId "
					+ " from TBL_ACQ_GROUP2UNIT_CONF t,tbl_acq_unit_conf t2,tbl_acq_group_conf t3 "
					+ " where t.unitid=t2.id and t.groupid=t3.id "
					+ " order by t3.protocol,t2.unit_code,t3.group_code";
			List<?> unitList=this.findCallSql(unitSql);
			List<?> groupList=this.findCallSql(groupSql);
			//排序
			Collections.sort(modbusProtocolConfig.getProtocol());
			
			for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
				if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==0){
					pumpTree_json.append("{\"classes\":1,");
					pumpTree_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					pumpTree_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					pumpTree_json.append("\"deviceType\":"+modbusProtocolConfig.getProtocol().get(i).getDeviceType()+",");
					pumpTree_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					pumpTree_json.append("\"iconCls\": \"Protocol\",");
					pumpTree_json.append("\"expanded\": true,");
					pumpTree_json.append("\"children\": [");
					for(int j=0;j<unitList.size();j++){
						Object[] unitObj = (Object[]) unitList.get(j);
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(unitObj[unitObj.length-1]+"")){
							pumpTree_json.append("{\"classes\":2,");
							pumpTree_json.append("\"id\":"+unitObj[0]+",");
							pumpTree_json.append("\"code\":\""+unitObj[1]+"\",");
							pumpTree_json.append("\"text\":\""+unitObj[2]+"\",");
							pumpTree_json.append("\"remark\":\""+unitObj[3]+"\",");
							pumpTree_json.append("\"protocol\":\""+unitObj[4]+"\",");
							pumpTree_json.append("\"iconCls\": \"AcqUnit\",");
							pumpTree_json.append("\"expanded\": true,");
							pumpTree_json.append("\"children\": [");
							for(int k=0;k<groupList.size();k++){
								Object[] groupObj = (Object[]) groupList.get(k);
								if((unitObj[0]+"").equalsIgnoreCase(groupObj[groupObj.length-1]+"")){
									pumpTree_json.append("{\"classes\":3,");
									pumpTree_json.append("\"id\":"+groupObj[0]+",");
									pumpTree_json.append("\"code\":\""+groupObj[1]+"\",");
									pumpTree_json.append("\"text\":\""+groupObj[2]+"\",");
									pumpTree_json.append("\"acq_cycle\":"+groupObj[3]+",");
									pumpTree_json.append("\"save_cycle\":"+groupObj[4]+",");
									pumpTree_json.append("\"remark\":\""+groupObj[5]+"\",");
									pumpTree_json.append("\"protocol\":\""+groupObj[6]+"\",");
									pumpTree_json.append("\"unitId\":"+groupObj[7]+",");
									pumpTree_json.append("\"iconCls\": \"AcqGroup\",");
									pumpTree_json.append("\"leaf\": true");
									pumpTree_json.append("},");
								}
							}
							if(pumpTree_json.toString().endsWith(",")){
								pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
							}
							
							pumpTree_json.append("]},");
						}
					}
					if(pumpTree_json.toString().endsWith(",")){
						pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
					}
					pumpTree_json.append("]},");
				}else{
					pipelineTree_json.append("{\"classes\":1,");
					pipelineTree_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					pipelineTree_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					pipelineTree_json.append("\"deviceType\":"+modbusProtocolConfig.getProtocol().get(i).getDeviceType()+",");
					pipelineTree_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					pipelineTree_json.append("\"iconCls\": \"Protocol\",");
					pipelineTree_json.append("\"expanded\": true,");
					pipelineTree_json.append("\"children\": [");
					for(int j=0;j<unitList.size();j++){
						Object[] unitObj = (Object[]) unitList.get(j);
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(unitObj[unitObj.length-1]+"")){
							pipelineTree_json.append("{\"classes\":2,");
							pipelineTree_json.append("\"id\":"+unitObj[0]+",");
							pipelineTree_json.append("\"code\":\""+unitObj[1]+"\",");
							pipelineTree_json.append("\"text\":\""+unitObj[2]+"\",");
							pipelineTree_json.append("\"remark\":\""+unitObj[3]+"\",");
							pipelineTree_json.append("\"protocol\":\""+unitObj[4]+"\",");
							pipelineTree_json.append("\"iconCls\": \"AcqUnit\",");
							pipelineTree_json.append("\"expanded\": true,");
							pipelineTree_json.append("\"children\": [");
							for(int k=0;k<groupList.size();k++){
								Object[] groupObj = (Object[]) groupList.get(k);
								if((unitObj[0]+"").equalsIgnoreCase(groupObj[groupObj.length-1]+"")){
									pipelineTree_json.append("{\"classes\":3,");
									pipelineTree_json.append("\"id\":"+groupObj[0]+",");
									pipelineTree_json.append("\"code\":\""+groupObj[1]+"\",");
									pipelineTree_json.append("\"text\":\""+groupObj[2]+"\",");
									pipelineTree_json.append("\"acq_cycle\":"+groupObj[3]+",");
									pipelineTree_json.append("\"save_cycle\":"+groupObj[4]+",");
									pipelineTree_json.append("\"remark\":\""+groupObj[5]+"\",");
									pipelineTree_json.append("\"protocol\":\""+groupObj[6]+"\",");
									pipelineTree_json.append("\"unitId\":"+groupObj[7]+",");
									pipelineTree_json.append("\"iconCls\": \"AcqGroup\",");
									pipelineTree_json.append("\"leaf\": true");
									pipelineTree_json.append("},");
								}
							}
							if(pipelineTree_json.toString().endsWith(",")){
								pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
							}
							
							pipelineTree_json.append("]},");
						}
					}
					if(pipelineTree_json.toString().endsWith(",")){
						pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
					}
					pipelineTree_json.append("]},");
				}
			}
		}
		if(pumpTree_json.toString().endsWith(",")){
			pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
		}
		pumpTree_json.append("]");
		
		if(pipelineTree_json.toString().endsWith(",")){
			pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
		}
		pipelineTree_json.append("]");
		
		result_json.append("[");
		
		result_json.append("{\"classes\":0,\"text\":\"泵设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pumpTree_json+"},");
		result_json.append("{\"classes\":0,\"text\":\"管设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pipelineTree_json+"}");
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString().replaceAll("null", "");
	}
	
	
	public String modbusProtocolAddrMappingTreeData(){
		StringBuffer result_json = new StringBuffer();
		StringBuffer pumpTree_json = new StringBuffer();
		StringBuffer pipelineTree_json = new StringBuffer();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		pumpTree_json.append("[");
		pipelineTree_json.append("[");
		
		if(modbusProtocolConfig!=null){
			//排序
			Collections.sort(modbusProtocolConfig.getProtocol());
			for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
				if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==0){
					pumpTree_json.append("{\"classes\":1,");
					pumpTree_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					pumpTree_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					pumpTree_json.append("\"deviceType\":"+modbusProtocolConfig.getProtocol().get(i).getDeviceType()+",");
					pumpTree_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					pumpTree_json.append("\"iconCls\": \"Protocol\",");
					pumpTree_json.append("\"leaf\": true");
					pumpTree_json.append("},");
				}else{
					pipelineTree_json.append("{\"classes\":1,");
					pipelineTree_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					pipelineTree_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					pipelineTree_json.append("\"deviceType\":"+modbusProtocolConfig.getProtocol().get(i).getDeviceType()+",");
					pipelineTree_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					pipelineTree_json.append("\"iconCls\": \"Protocol\",");
					pipelineTree_json.append("\"leaf\": true");
					pipelineTree_json.append("},");
				}
			}
		}
		if(pumpTree_json.toString().endsWith(",")){
			pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
		}
		pumpTree_json.append("]");
		
		if(pipelineTree_json.toString().endsWith(",")){
			pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
		}
		pipelineTree_json.append("]");
		
		result_json.append("[");
		
		result_json.append("{\"classes\":0,\"text\":\"泵设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pumpTree_json+"},");
		result_json.append("{\"classes\":0,\"text\":\"管设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pipelineTree_json+"}");
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString();
	}
	
	public String modbusProtocolAndAcqUnitTreeData(String deviceTypeStr){
		StringBuffer result_json = new StringBuffer();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		int deviceType=0;
		if(StringManagerUtils.stringToInteger(deviceTypeStr)>0){
			deviceType=1;
		}
		
		result_json.append("[");
		if(modbusProtocolConfig!=null){
			String unitSql="select t.id as id,t.unit_code as unitCode,t.unit_name as unitName,t.remark,t.protocol from tbl_acq_unit_conf t order by t.protocol,t.id";
			List<?> unitList=this.findCallSql(unitSql);
			//排序
			Collections.sort(modbusProtocolConfig.getProtocol());
			
			for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
				if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==deviceType){
					result_json.append("{\"classes\":1,");
					result_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					result_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					result_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					result_json.append("\"iconCls\": \"Protocol\",");
					result_json.append("\"expanded\": true,");
					result_json.append("\"disabled\": true,");
					result_json.append("\"children\": [");
					for(int j=0;j<unitList.size();j++){
						Object[] unitObj = (Object[]) unitList.get(j);
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(unitObj[unitObj.length-1]+"")){
							result_json.append("{\"classes\":2,");
							result_json.append("\"id\":"+unitObj[0]+",");
							result_json.append("\"code\":\""+unitObj[1]+"\",");
							result_json.append("\"text\":\""+unitObj[2]+"\",");
							result_json.append("\"remark\":\""+unitObj[3]+"\",");
							result_json.append("\"protocol\":\""+unitObj[4]+"\",");
							result_json.append("\"iconCls\": \"AcqUnit\",");
							result_json.append("\"leaf\": true},");
						}
					}
					if(result_json.toString().endsWith(",")){
						result_json.deleteCharAt(result_json.length() - 1);
					}
					result_json.append("]},");
				}
			}
			if(result_json.toString().endsWith(",")){
				result_json.deleteCharAt(result_json.length() - 1);
			}
		}
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString();
	}
	
	
	public String modbusProtocolAndAlarmGroupTreeData(String deviceTypeStr){
		StringBuffer result_json = new StringBuffer();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		int deviceType=0;
		if(StringManagerUtils.stringToInteger(deviceTypeStr)>0){
			deviceType=1;
		}
		
		result_json.append("[");
		if(modbusProtocolConfig!=null){
			String alarmGroupSql="select t.id,t.group_code,t.group_name,t.remark,t.protocol from tbl_alarm_group_conf t order by t.protocol,t.id";
			List<?> alarmGroupList=this.findCallSql(alarmGroupSql);
			//排序
			Collections.sort(modbusProtocolConfig.getProtocol());
			
			for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
				if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==deviceType){
					result_json.append("{\"classes\":1,");
					result_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					result_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					result_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					result_json.append("\"iconCls\": \"Protocol\",");
					result_json.append("\"expanded\": true,");
					result_json.append("\"disabled\": true,");
					result_json.append("\"children\": [");
					for(int j=0;j<alarmGroupList.size();j++){
						Object[] unitObj = (Object[]) alarmGroupList.get(j);
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(unitObj[unitObj.length-1]+"")){
							result_json.append("{\"classes\":2,");
							result_json.append("\"id\":"+unitObj[0]+",");
							result_json.append("\"code\":\""+unitObj[1]+"\",");
							result_json.append("\"text\":\""+unitObj[2]+"\",");
							result_json.append("\"remark\":\""+unitObj[3]+"\",");
							result_json.append("\"protocol\":\""+unitObj[4]+"\",");
							result_json.append("\"iconCls\": \"AcqGroup\",");
							result_json.append("\"leaf\": true},");
						}
					}
					if(result_json.toString().endsWith(",")){
						result_json.deleteCharAt(result_json.length() - 1);
					}
					result_json.append("]},");
				}
			}
			if(result_json.toString().endsWith(",")){
				result_json.deleteCharAt(result_json.length() - 1);
			}
		}
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString();
	}
	
	
	public String modbusProtocolAlarmGroupTreeData(){
		StringBuffer result_json = new StringBuffer();
		StringBuffer pumpTree_json = new StringBuffer();
		StringBuffer pipelineTree_json = new StringBuffer();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		pumpTree_json.append("[");
		pipelineTree_json.append("[");
		
		if(modbusProtocolConfig!=null){
			String groupSql="select t.id,t.group_code,t.group_name,t.remark,t.protocol"
					+ " from tbl_alarm_group_conf t "
					+ " where 1=1 "
					+ " order by t.protocol,t.group_code";
			List<?> groupList=this.findCallSql(groupSql);
			//排序
			Collections.sort(modbusProtocolConfig.getProtocol());
			
			for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
				if(modbusProtocolConfig.getProtocol().get(i).getDeviceType()==0){
					pumpTree_json.append("{\"classes\":1,");
					pumpTree_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					pumpTree_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					pumpTree_json.append("\"deviceType\":"+modbusProtocolConfig.getProtocol().get(i).getDeviceType()+",");
					pumpTree_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					pumpTree_json.append("\"iconCls\": \"Protocol\",");
					pumpTree_json.append("\"expanded\": true,");
					pumpTree_json.append("\"children\": [");
					for(int j=0;j<groupList.size();j++){
						Object[] groupObj = (Object[]) groupList.get(j);
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(groupObj[groupObj.length-1]+"")){
							pumpTree_json.append("{\"classes\":3,");
							pumpTree_json.append("\"id\":"+groupObj[0]+",");
							pumpTree_json.append("\"code\":\""+groupObj[1]+"\",");
							pumpTree_json.append("\"text\":\""+groupObj[2]+"\",");
							pumpTree_json.append("\"remark\":\""+groupObj[3]+"\",");
							pumpTree_json.append("\"protocol\":\""+groupObj[4]+"\",");
							pumpTree_json.append("\"iconCls\": \"AcqGroup\",");
							pumpTree_json.append("\"leaf\": true");
							pumpTree_json.append("},");
						}
					}
					if(pumpTree_json.toString().endsWith(",")){
						pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
					}
					pumpTree_json.append("]},");
				}else{
					pipelineTree_json.append("{\"classes\":1,");
					pipelineTree_json.append("\"text\":\""+modbusProtocolConfig.getProtocol().get(i).getName()+"\",");
					pipelineTree_json.append("\"code\":\""+modbusProtocolConfig.getProtocol().get(i).getCode()+"\",");
					pipelineTree_json.append("\"deviceType\":"+modbusProtocolConfig.getProtocol().get(i).getDeviceType()+",");
					pipelineTree_json.append("\"sort\":"+modbusProtocolConfig.getProtocol().get(i).getSort()+",");
					pipelineTree_json.append("\"iconCls\": \"Protocol\",");
					pipelineTree_json.append("\"expanded\": true,");
					pipelineTree_json.append("\"children\": [");
					for(int j=0;j<groupList.size();j++){
						Object[] groupObj = (Object[]) groupList.get(j);
						if(modbusProtocolConfig.getProtocol().get(i).getName().equalsIgnoreCase(groupObj[groupObj.length-1]+"")){
							pipelineTree_json.append("{\"classes\":3,");
							pipelineTree_json.append("\"id\":"+groupObj[0]+",");
							pipelineTree_json.append("\"code\":\""+groupObj[1]+"\",");
							pipelineTree_json.append("\"text\":\""+groupObj[2]+"\",");
							pipelineTree_json.append("\"remark\":\""+groupObj[3]+"\",");
							pipelineTree_json.append("\"protocol\":\""+groupObj[4]+"\",");
							pipelineTree_json.append("\"iconCls\": \"AcqGroup\",");
							pipelineTree_json.append("\"leaf\": true");
							pipelineTree_json.append("},");
						}
					}
					if(pipelineTree_json.toString().endsWith(",")){
						pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
					}
					pipelineTree_json.append("]},");
				}
			}
		}
		if(pumpTree_json.toString().endsWith(",")){
			pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
		}
		pumpTree_json.append("]");
		
		if(pipelineTree_json.toString().endsWith(",")){
			pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
		}
		pipelineTree_json.append("]");
		
		result_json.append("[");
		
		result_json.append("{\"classes\":0,\"text\":\"泵设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pumpTree_json+"},");
		result_json.append("{\"classes\":0,\"text\":\"管设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pipelineTree_json+"}");
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString().replaceAll("null", "");
	}
	
	public String getModbusProtocolInstanceConfigTreeData(){
		StringBuffer result_json = new StringBuffer();
		StringBuffer pumpTree_json = new StringBuffer();
		StringBuffer pipelineTree_json = new StringBuffer();
		pumpTree_json.append("[");
		pipelineTree_json.append("[");
		String sql="select t.id,t.name,t.code,t.acqprotocoltype,t.ctrlprotocoltype,t.signinprefix,t.signinsuffix,t.heartbeatprefix,t.heartbeatsuffix,"
				+ " t.unitid,t.devicetype,t.sort "
				+ " from tbl_protocolinstance t "
				+ " order by t.devicetype,t.sort";
		List<?> list=this.findCallSql(sql);
		for(int i=0;i<list.size();i++){
			Object[] obj = (Object[]) list.get(i);
			if(StringManagerUtils.stringToInteger(obj[10]+"")==0){
				pumpTree_json.append("{\"classes\":1,");
				pumpTree_json.append("\"id\":\""+obj[0]+"\",");
				pumpTree_json.append("\"text\":\""+obj[1]+"\",");
				pumpTree_json.append("\"code\":\""+obj[2]+"\",");
				pumpTree_json.append("\"acqProtocolType\":\""+obj[3]+"\",");
				pumpTree_json.append("\"ctrlProtocolType\":\""+obj[4]+"\",");
				pumpTree_json.append("\"signInPrefix\":\""+obj[5]+"\",");
				pumpTree_json.append("\"signInSuffix\":\""+obj[6]+"\",");
				pumpTree_json.append("\"heartbeatPrefix\":\""+obj[7]+"\",");
				pumpTree_json.append("\"heartbeatSuffix\":\""+obj[8]+"\",");
				pumpTree_json.append("\"unitId\":"+obj[9]+",");
				pumpTree_json.append("\"deviceType\":"+obj[10]+",");
				pumpTree_json.append("\"sort\":"+obj[11]+",");
				pumpTree_json.append("\"iconCls\": \"Protocol\",");
				pumpTree_json.append("\"leaf\": true");
				pumpTree_json.append("},");
			}else{
				pipelineTree_json.append("{\"classes\":1,");
				pipelineTree_json.append("\"id\":\""+obj[0]+"\",");
				pipelineTree_json.append("\"text\":\""+obj[1]+"\",");
				pipelineTree_json.append("\"code\":\""+obj[2]+"\",");
				pipelineTree_json.append("\"acqProtocolType\":\""+obj[3]+"\",");
				pipelineTree_json.append("\"ctrlProtocolType\":\""+obj[4]+"\",");
				pipelineTree_json.append("\"signInPrefix\":\""+obj[5]+"\",");
				pipelineTree_json.append("\"signInSuffix\":\""+obj[6]+"\",");
				pipelineTree_json.append("\"heartbeatPrefix\":\""+obj[7]+"\",");
				pipelineTree_json.append("\"heartbeatSuffix\":\""+obj[8]+"\",");
				pipelineTree_json.append("\"unitId\":"+obj[9]+",");
				pipelineTree_json.append("\"deviceType\":"+obj[10]+",");
				pipelineTree_json.append("\"sort\":"+obj[11]+",");
				pipelineTree_json.append("\"iconCls\": \"Protocol\",");
				pipelineTree_json.append("\"leaf\": true");
				pipelineTree_json.append("},");
			}
		}
		
		if(pumpTree_json.toString().endsWith(",")){
			pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
		}
		pumpTree_json.append("]");
		
		if(pipelineTree_json.toString().endsWith(",")){
			pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
		}
		pipelineTree_json.append("]");
		
		result_json.append("[");
		
		result_json.append("{\"classes\":0,\"text\":\"泵设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pumpTree_json+"},");
		result_json.append("{\"classes\":0,\"text\":\"管设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pipelineTree_json+"}");
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString().replaceAll("null", "");
	}
	
	public String getModbusAlarmProtocolInstanceConfigTreeData(){
		StringBuffer result_json = new StringBuffer();
		StringBuffer pumpTree_json = new StringBuffer();
		StringBuffer pipelineTree_json = new StringBuffer();
		pumpTree_json.append("[");
		pipelineTree_json.append("[");
		String sql="select t.id,t.name,t.code,t.alarmGroupId,t.devicetype,t.sort "
				+ " from tbl_protocolalarminstance t "
				+ " order by t.devicetype,t.sort";
		List<?> list=this.findCallSql(sql);
		for(int i=0;i<list.size();i++){
			Object[] obj = (Object[]) list.get(i);
			if(StringManagerUtils.stringToInteger(obj[4]+"")==0){
				pumpTree_json.append("{\"classes\":1,");
				pumpTree_json.append("\"id\":\""+obj[0]+"\",");
				pumpTree_json.append("\"text\":\""+obj[1]+"\",");
				pumpTree_json.append("\"code\":\""+obj[2]+"\",");
				pumpTree_json.append("\"alarmGroupId\":"+obj[3]+",");
				pumpTree_json.append("\"deviceType\":"+obj[4]+",");
				pumpTree_json.append("\"sort\":"+obj[5]+",");
				pumpTree_json.append("\"iconCls\": \"Protocol\",");
				pumpTree_json.append("\"leaf\": true");
				pumpTree_json.append("},");
			}else{
				pipelineTree_json.append("{\"classes\":1,");
				pipelineTree_json.append("\"id\":\""+obj[0]+"\",");
				pipelineTree_json.append("\"text\":\""+obj[1]+"\",");
				pipelineTree_json.append("\"code\":\""+obj[2]+"\",");
				pipelineTree_json.append("\"alarmGroupId\":"+obj[3]+",");
				pipelineTree_json.append("\"deviceType\":"+obj[4]+",");
				pipelineTree_json.append("\"sort\":"+obj[5]+",");
				pipelineTree_json.append("\"iconCls\": \"Protocol\",");
				pipelineTree_json.append("\"leaf\": true");
				pipelineTree_json.append("},");
			}
		}
		
		if(pumpTree_json.toString().endsWith(",")){
			pumpTree_json.deleteCharAt(pumpTree_json.length() - 1);
		}
		pumpTree_json.append("]");
		
		if(pipelineTree_json.toString().endsWith(",")){
			pipelineTree_json.deleteCharAt(pipelineTree_json.length() - 1);
		}
		pipelineTree_json.append("]");
		
		result_json.append("[");
		
		result_json.append("{\"classes\":0,\"text\":\"泵设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pumpTree_json+"},");
		result_json.append("{\"classes\":0,\"text\":\"管设备\",\"iconCls\": \"Device\",\"expanded\": true,\"children\": "+pipelineTree_json+"}");
		result_json.append("]");
//		System.out.println(result_json.toString());
		return result_json.toString().replaceAll("null", "");
	}
	
	public String getModbusProtoclCombList(){
		StringBuffer result_json = new StringBuffer();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		//排序
		Collections.sort(modbusProtocolConfig.getProtocol());
		
		result_json.append("{\"totals\":"+modbusProtocolConfig.getProtocol().size()+",\"list\":[");
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			result_json.append("{boxkey:\"" + modbusProtocolConfig.getProtocol().get(i).getName() + "\",");
			result_json.append("boxval:\"" + modbusProtocolConfig.getProtocol().get(i).getName() + "\"},");
		}
		if (result_json.toString().endsWith(",")) {
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]}");
		return result_json.toString();
	}
	
	public String getAcquisitionUnitCombList(String protocol){
		StringBuffer result_json = new StringBuffer();
		String sql="select t.id,t.unit_name from TBL_ACQ_UNIT_CONF t where 1=1";
		if(StringManagerUtils.isNotNull(protocol)){
			sql+=" and t.protocol='"+protocol+"'";
		}
		
		List<?> list=this.findCallSql(sql);
		result_json.append("{\"totals\":"+list.size()+",\"list\":[");
		for(int i=0;i<list.size();i++){
			Object[] obj = (Object[]) list.get(i);
			result_json.append("{boxkey:\"" + obj[0] + "\",");
			result_json.append("boxval:\"" + obj[1] + "\"},");
		}
		if (result_json.toString().endsWith(",")) {
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]}");
		return result_json.toString();
	}
	
	public void doAcquisitionGroupAdd(AcquisitionGroup acquisitionGroup) throws Exception {
		getBaseDao().addObject(acquisitionGroup);
	}
	
	public void doAcquisitionGroupEdit(AcquisitionGroup acquisitionGroup) throws Exception {
		getBaseDao().updateObject(acquisitionGroup);
	}
	
	public void doAcquisitionGroupBulkDelete(final String ids) throws Exception {
		final String hql = "DELETE AcquisitionGroup u where u.id in (" + ids + ")";
		super.bulkObjectDelete(hql);
	}
	
	public void doAcquisitionUnitAdd(T acquisitionUnit) throws Exception {
		getBaseDao().addObject(acquisitionUnit);
	}
	
	public void doAcquisitionUnitEdit(T acquisitionUnit) throws Exception {
		getBaseDao().updateObject(acquisitionUnit);
	}
	
	public void doAcquisitionUnitBulkDelete(final String ids) throws Exception {
		final String hql = "DELETE AcquisitionUnit u where u.id in (" + ids + ")";
		super.bulkObjectDelete(hql);
	}
	
	public List<T> showAcquisitionGroupOwnItems(Class<AcquisitionGroupItem> class1, String groupCode) {
		String queryString = "select u FROM AcquisitionGroupItem u,AcquisitionGroup u2 where u.groupId= u2.id and  u2.groupCode='" + groupCode + "' order by u.id asc";
		return getBaseDao().find(queryString);
	}
	
	public List<T> showAcquisitionUnitOwnGroups(Class<AcquisitionUnitGroup> class1, String unitId) {
		String queryString = "select u FROM AcquisitionGroup u, AcquisitionUnitGroup u2 "
				+ "where u.id=u2.groupId and u2.unitId=" + unitId + " order by u.id asc";
		return getBaseDao().find(queryString);
	}
	
	public void deleteCurrentAcquisitionGroupOwnItems(final String groupId) throws Exception {
		final String hql = "DELETE AcquisitionGroupItem u where u.groupId ="+groupId+"";
		getBaseDao().bulkObjectDelete(hql);
	}
	
	public void deleteCurrentAcquisitionUnitOwnGroups(final String unitId) throws Exception {
		final String hql = "DELETE AcquisitionUnitGroup u where u.unitId = " + unitId + "";
		getBaseDao().bulkObjectDelete(hql);
	}
	
	public void grantAcquisitionItemsPermission(T acquisitionUnitItem) throws Exception {
		getBaseDao().saveOrUpdateObject(acquisitionUnitItem);
	}
	
	public void grantAcquisitionGroupsPermission(AcquisitionUnitGroup r) throws Exception {
		getBaseDao().saveOrUpdateObject(r);
	}
	
	public void doModbusProtocolInstanceAdd(T protocolInstance) throws Exception {
		getBaseDao().addObject(protocolInstance);
	}
	public void doModbusProtocolInstanceEdit(T protocolInstance) throws Exception {
		getBaseDao().updateObject(protocolInstance);
	}
	
	public void doModbusProtocolInstanceBulkDelete(final String ids) throws Exception {
		final String hql = "DELETE ProtocolInstance u where u.id in (" + ids + ")";
		super.bulkObjectDelete(hql);
	}
	
	public void doAlarmGroupAdd(T doAlarmGroupAdd) throws Exception {
		getBaseDao().addObject(doAlarmGroupAdd);
	}
	
	public void doAlarmGroupEdit(T doAlarmGroupAdd) throws Exception {
		getBaseDao().updateObject(doAlarmGroupAdd);
	}
	
	public void doModbusProtocolAlarmGroupDelete(final String ids) throws Exception {
		final String hql = "DELETE AlarmGroup u where u.id in (" + ids + ")";
		super.bulkObjectDelete(hql);
	}
	
	public void deleteCurrentAlarmGroupOwnItems(final String groupId) throws Exception {
		final String hql = "DELETE AlarmGroupItem u where u.groupId ="+groupId+"";
		getBaseDao().bulkObjectDelete(hql);
	}
	
	public void grantAlarmItemsPermission(T alarmGroupItem) throws Exception {
		getBaseDao().addObject(alarmGroupItem);
	}
	
	public void doModbusProtocolAlarmInstanceEdit(T protocolAlarmInstance) throws Exception {
		getBaseDao().updateObject(protocolAlarmInstance);
	}
	
	public void doModbusProtocolAlarmInstanceBulkDelete(final String ids) throws Exception {
		final String hql = "DELETE ProtocolAlarmInstance u where u.id in (" + ids + ")";
		super.bulkObjectDelete(hql);
	}
	
	public void doModbusProtocolAlarmInstanceAdd(T protocolAlarmInstance) throws Exception {
		getBaseDao().addObject(protocolAlarmInstance);
	}
	
	public static String getDataItemsType(String type){
		String dataType="";
		if(type.equalsIgnoreCase("int")){
			dataType="有符号整型";
		}else if(type.equalsIgnoreCase("uint")){
			dataType="无符号整型";
		}else if(type.equalsIgnoreCase("float")){
			dataType="实型";
		}else if(type.equalsIgnoreCase("bcd")){
			dataType="BCD码";
		}else if(type.equalsIgnoreCase("asc")){
			dataType="ASCII";
		}
		return dataType;
	}
	
	public static String getProtocolType(int type){
		String protocolType="";
		if(type==0){
			protocolType="modbus-tcp";
		}else if(type==1){
			protocolType="modbus-rtu";
		}else if(type==2){
			protocolType="modbus-rtu拓展(主动上传)";
		}
		return protocolType;
	}
}
