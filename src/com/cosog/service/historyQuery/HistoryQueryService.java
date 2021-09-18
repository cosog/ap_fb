package com.cosog.service.historyQuery;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.data.DataDictionary;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.service.base.BaseService;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.data.DataitemsInfoService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.Page;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;

@Service("historyQueryService")
public class HistoryQueryService<T> extends BaseService<T>  {
	@Autowired
	private CommonDataService service;
	@Autowired
	private DataitemsInfoService dataitemsInfoService;
	
	public String getDeviceHistoryData(String orgId,String deviceName,String deviceType,Page pager) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			EquipmentDriverServerTask.initAlarmStyle();
			alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		}
		String tableName="tbl_pumpacqdata_latest";
		String hisTableName="tbl_pumpacqdata_hist";
		String table="";
		String ddicName="pumpHistoryQuery";
		DataDictionary ddic = null;
		List<String> ddicColumnsList=new ArrayList<String>();
		if(StringManagerUtils.stringToInteger(deviceType)!=0){
			tableName="tbl_pipelineacqdata_latest";
			hisTableName="tbl_pipelineacqdata_hist";
			ddicName="pipelineHistoryQuery";
		}
		table=tableName;
		if(StringManagerUtils.isNotNull(deviceName)){
			table=hisTableName;
		}
		
		
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		
		String sql="select t2.id,t.wellname,t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel,to_char(t2.acqtime,'yyyy-mm-dd hh24:mi:ss') ";
		
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
				+ "left outer join "+table+" t2 on t2.wellid=t.id"
				+ " where  t.orgid in ("+orgId+") and t.devicetype="+deviceType;
		
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and t2.acqTime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd')+1 and t.wellName='"+deviceName+"'";
		}
		sql+=" order by t.sortnum,t.wellname";
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=",t2.acqtime desc";
		}
		
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		int totals=this.getTotalCountRows(sql);
		List<?> list = this.findCallSql(finalSql);
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"start_date\":\""+pager.getStart_date()+"\",");
		result_json.append("\"end_date\":\""+pager.getEnd_date()+"\",");
		result_json.append("\"totalCount\":"+totals+",");
		result_json.append("\"totalRoot\":[");
		for(int i=0;i<list.size();i++){
			Object[] obj=(Object[]) list.get(i);
			result_json.append("{\"id\":"+obj[0]+",");
			result_json.append("\"wellName\":\""+obj[1]+"\",");
			result_json.append("\"commStatus\":"+obj[2]+",");
			result_json.append("\"commStatusName\":\""+obj[3]+"\",");
			result_json.append("\"commAlarmLevel\":"+obj[4]+",");
			result_json.append("\"acqTime\":\""+obj[5]+"\",");
			for(int j=0;j<ddicColumnsList.size();j++){
				result_json.append("\""+ddicColumnsList.get(j).replaceAll(" ", "")+"\":\""+obj[6+j]+"\",");
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
		return result_json.toString().replaceAll("\"null\"", "\"\"");
	}
	
	public String getDeviceHistoryDetailsData(String deviceName,String deviceType,String recordId,String isHis) throws IOException, SQLException{
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
		String hisTableName="tbl_pumpacqdata_hist";
		String table="";
		if(StringManagerUtils.stringToInteger(deviceType)!=0){
			tableName="tbl_pipelineacqdata_latest";
			hisTableName="tbl_pipelineacqdata_hist";
		}
		table=tableName;
		if(StringManagerUtils.stringToInteger(isHis)!=0){
			table=hisTableName;
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
				
//				for(int j=0;j<itemsArr.length;j++){
//					for(int k=0;k<protocol.getItems().size();k++){
//						if(itemsArr[j].equalsIgnoreCase(protocol.getItems().get(k).getTitle())){
//							String column="ADDR"+protocol.getItems().get(k).getAddr();
//							String columnName=protocol.getItems().get(k).getTitle();
//							columnsList.add(column);
//							columnsNameList.add(columnName);
//							columnsDataTypeList.add(protocol.getItems().get(k).getIFDataType());
//							break;
//						}
//					}
//				}
				
				for(int j=0;j<protocol.getItems().size();j++){
					if(!StringManagerUtils.existOrNot(columnsNameList, protocol.getItems().get(j).getTitle(), false)){
						for(int k=0;k<itemsArr.length;k++){
							if(protocol.getItems().get(j).getTitle().equalsIgnoreCase(itemsArr[k])){
								String column="ADDR"+protocol.getItems().get(j).getAddr();
								String columnName=protocol.getItems().get(j).getTitle();
								columnsList.add(column);
								columnsNameList.add(columnName);
								columnsDataTypeList.add(protocol.getItems().get(j).getIFDataType());
								break;
							}
						}
					}
				}
				
				
				
				String sql="select t.id,t.wellname,to_char(t2.acqtime,'yyyy-mm-dd hh24:mi:ss'), t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel ";
				for(int j=0;j<columnsList.size();j++){
					sql+=",t2."+columnsList.get(j);
				}
				sql+= " from tbl_wellinformation t "
						+ " left outer join "+table+" t2 on t2.wellid=t.id"
						+ " where  t2.id="+recordId;
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
							info_json.append("{\"row\":"+j+",\"col\":"+k+",\"columnName\":\""+columnName+"\",\"column\":\""+column+"\",\"value\":\""+value+"\",\"columnDataType\":\""+columnDataType+"\",\"alarmLevel\":"+alarmLevel+"},");
							
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
	
	public String getHistoryQueryCurveData(String deviceName,String item,String deviceType,String startDate,String endDate)throws Exception {
		StringBuffer result_json = new StringBuffer();
		String protocolSql="select upper(t3.protocol) from tbl_wellinformation t,tbl_protocolinstance t2,tbl_acq_unit_conf t3 where t.instancecode=t2.code and t2.unitid=t3.id"
				+ " and  t.wellname='"+deviceName+"' and t.devicetype="+StringManagerUtils.stringToInteger(deviceType);
		List<?> protocolList = this.findCallSql(protocolSql);
		String protocolCode="";
		String column="";
		String unit="";
		String dataType="";
		String tableName="tbl_pumpacqdata_hist";
		if(StringManagerUtils.stringToInteger(deviceType)>0){
			tableName="tbl_pipelineacqdata_hist";
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
					+ " and t.acqtime between to_date('"+startDate+"','yyyy-mm-dd')  and to_date('"+endDate+"','yyyy-mm-dd')+1"
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
