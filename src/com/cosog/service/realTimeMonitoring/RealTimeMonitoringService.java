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
		if(StringManagerUtils.stringToInteger(deviceType)!=0){
			tableName="tbl_tubingacqdata_latest";
		}
		
		String sql="select t.id,t.wellname,t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel from tbl_wellinformation t "
				+ "left outer join "+tableName+" t2 on t2.wellid=t.id"
				+ " where  t.orgid in ("+orgId+") and t.devicetype="+deviceType;
		if(StringManagerUtils.isNotNull(wellName)){
			sql+=" and t.wellName='"+wellName+"'";
		}
		sql+=" order by t.sortnum,t.wellname";
		int totals=this.getTotalCountRows(sql);
		List<?> list = this.findCallSql(sql);
		String columns = "["
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
				+ "{ \"header\":\"井名\",\"dataIndex\":\"wellName\" ,children:[] },"
				+ "{ \"header\":\"通信状态\",\"dataIndex\":\"commStatusName\" ,width:50 ,children:[] }"
				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalCount\":"+totals+",");
		result_json.append("\"totalRoot\":[");
		for(int i=0;i<list.size();i++){
			Object[] obj=(Object[]) list.get(i);
			result_json.append("{\"id\":"+obj[0]+",");
			result_json.append("\"wellName\":\""+obj[1]+"\",");
			result_json.append("\"commStatus\":"+obj[2]+",");
			result_json.append("\"commStatusName\":\""+obj[3]+"\",");
			result_json.append("\"commAlarmLevel\":"+obj[4]+"},");
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
		
		String procotolSql="select  t.wellname,t.signinid,t.slave,t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle,"
				+ " listagg(t5.itemname, ',') within group(order by t5.id ) key"
				+ " from tbl_wellinformation t,tbl_acq_unit_conf t2,tbl_acq_group2unit_conf t3,tbl_acq_group_conf t4,tbl_acq_item2group_conf t5 "
				+ " where t.unitcode=t2.unit_code and t2.id=t3.unitid and t3.groupid=t4.id and t4.id=t5.groupid "
				+ " and t.signinid is not null and t.slave is not null and t.unitcode is not null "
				+"	and t.wellname ='"+deviceName+"' and t.devicetype="+deviceType
				+"  group by t.wellname,t.signinid,t.slave,t2.protocol,t2.unit_code,t4.group_code,t4.acq_cycle ";
		
		
		List<?> procotolCodeList = this.findCallSql(procotolSql);
		String columns = "["
				+ "{ \"header\":\"序号\",\"dataIndex\":\"id\",width:50 ,children:[] },"
				+ "{ \"header\":\"井名\",\"dataIndex\":\"wellName\" ,children:[] },"
				+ "{ \"header\":\"通信状态\",\"dataIndex\":\"commStatusName\" ,width:50 ,children:[] }"
				+ "]";
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalRoot\":[");
		for(int i=0;i<procotolCodeList.size();i++){
			Object[] procotolObj=(Object[]) procotolCodeList.get(i);
			String protocolCode=procotolObj[3]+"";
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
			
			if(protocol!=null && StringManagerUtils.isNotNull(procotolObj[7]+"")){
				String acqColumns="";
				String[] itemsArr=(procotolObj[7]+"").split(",");
				List<String> columnsList=new ArrayList<String>();
				List<String> columnsNameList=new ArrayList<String>();
				
				for(int j=0;j<itemsArr.length;j++){
					for(int k=0;k<protocol.getItems().size();k++){
						if(itemsArr[j].equalsIgnoreCase(protocol.getItems().get(k).getTitle())){
							String column="ADDR"+protocol.getItems().get(k).getAddr();
							String columnName=protocol.getItems().get(k).getTitle();
							columnsList.add(column);
							columnsNameList.add(columnName);
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
						result_json.append("{");
						for(int k=0;k<items;k++){
							int index=6+items*(j-1)+k;
							if(index>obj.length-1){
								result_json.append("\"name"+(k+1)+"\":\"\",");
								result_json.append("\"value"+(k+1)+"\":\"\",");
							}else{
								result_json.append("\"name"+(k+1)+"\":\""+columnsNameList.get(items*(j-1)+k)+"\",");
								result_json.append("\"value"+(k+1)+"\":\""+obj[index]+"\",");
							}
							
							
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
		result_json.append("]");
		result_json.append(",\"AlarmShowStyle\":"+new Gson().toJson(alarmShowStyle)+"}");
		return result_json.toString().replaceAll("null", "");
	}
}
