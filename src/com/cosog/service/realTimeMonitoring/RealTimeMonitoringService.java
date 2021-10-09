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
import com.cosog.model.User;
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
import com.cosog.utils.ProtocolItemResolutionData;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;

@Service("realTimeMonitoringService")
public class RealTimeMonitoringService<T> extends BaseService<T> {
	@Autowired
	private CommonDataService service;
	@Autowired
	private DataitemsInfoService dataitemsInfoService;
	
	public String getDeviceRealTimeOverview(String orgId,String deviceName,String deviceType,Page pager) throws IOException, SQLException{
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
			tableName="tbl_pipelineacqdata_latest";
			ddicName="pipelineRealTimeOverview";
		}
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		
		String sql="select t.id,t.wellname,t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel,to_char(t2.acqtime,'yyyy-mm-dd hh24:mi:ss') ";
		
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
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and t.wellName='"+deviceName+"'";
		}
		sql+=" order by t.sortnum,t.wellname";
		
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		int totals=this.getTotalCountRows(sql);
		List<?> list = this.findCallSql(finalSql);
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

	public String getDeviceRealTimeMonitoringData(String deviceName,String deviceType) throws IOException, SQLException{
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
			tableName="tbl_pipelineacqdata_latest";
		}
		String itemsSql="select t.wellname,t3.protocol, listagg(t6.itemname, ',') within group(order by t6.id ) key "
				+ " from tbl_wellinformation t,tbl_protocolinstance t2,tbl_acq_unit_conf t3,tbl_acq_group2unit_conf t4,tbl_acq_group_conf t5,tbl_acq_item2group_conf t6 "
				+ " where t.instancecode=t2.code and t2.unitid=t3.id and t3.id=t4.unitid and t4.groupid=t5.id and t5.id=t6.groupid "
				+ " and t.wellname='"+deviceName+"' and t.devicetype= "+StringManagerUtils.stringToInteger(deviceType)
				+ " group by t.wellname,t3.protocol";
		String alarmItemsSql="select t2.itemname,t2.itemcode,t2.itemaddr,t2.type,t2.bitindex,t2.value, "
				+ " t2.upperlimit,t2.lowerlimit,t2.hystersis,t2.delay,decode(t2.alarmsign,0,0,t2.alarmlevel) as alarmlevel "
				+ " from tbl_wellinformation t, tbl_alarm_item2group_conf t2,tbl_alarm_group_conf t3,tbl_protocolalarminstance t4 "
				+ " where t.alarminstancecode=t4.code and t4.alarmgroupid=t3.id and t3.id=t2.groupid "
				+ " and t.wellname='"+deviceName+"' and t.devicetype= "+StringManagerUtils.stringToInteger(deviceType)
				+ " order by t2.id";
		List<?> itemsList = this.findCallSql(itemsSql);
		List<?> alarmItemsList = this.findCallSql(alarmItemsSql);
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
//				List<Integer> addrList=new ArrayList<Integer>();
//				List<String> columnsList=new ArrayList<String>();
				List<String> columnsNameList=new ArrayList<String>();
//				List<String> columnsDataTypeList=new ArrayList<String>();
				List<ModbusProtocolConfig.Items> protocolItems=new ArrayList<ModbusProtocolConfig.Items>();
				List<ProtocolItemResolutionData> protocolItemResolutionDataList=new ArrayList<ProtocolItemResolutionData>();
				for(int j=0;j<protocol.getItems().size();j++){
					if(!StringManagerUtils.existOrNot(columnsNameList, protocol.getItems().get(j).getTitle(), false)){
						for(int k=0;k<itemsArr.length;k++){
							if(protocol.getItems().get(j).getTitle().equalsIgnoreCase(itemsArr[k])){
								String column="ADDR"+protocol.getItems().get(j).getAddr();
								String columnName=protocol.getItems().get(j).getTitle();
//								addrList.add(protocol.getItems().get(j).getAddr());
//								columnsList.add(column);
								columnsNameList.add(columnName);
//								columnsDataTypeList.add(protocol.getItems().get(j).getIFDataType());
								protocolItems.add(protocol.getItems().get(j));
								break;
							}
						}
					}
				}
				
				String sql="select t.id,t.wellname,to_char(t2.acqtime,'yyyy-mm-dd hh24:mi:ss'), t2.commstatus,decode(t2.commstatus,1,'在线','离线') as commStatusName,decode(t2.commstatus,1,0,100) as commAlarmLevel ";
//				for(int j=0;j<columnsList.size();j++){
//					sql+=",t2."+columnsList.get(j);
//				}
				for(int j=0;j<protocolItems.size();j++){
					sql+=",t2.ADDR"+protocolItems.get(j).getAddr();
				}
				sql+= " from tbl_wellinformation t "
						+ " left outer join "+tableName+" t2 on t2.wellid=t.id"
						+ " where  t.wellName='"+deviceName+"' and t.devicetype="+deviceType;
				List<?> list = this.findCallSql(sql);
				if(list.size()>0){
					int row=1;
					Object[] obj=(Object[]) list.get(0);
					for(int j=0;j<protocolItems.size();j++){
						String columnName="";
						String value=obj[j+6]+"";
						String rawValue=obj[j+6]+"";
						String addr="";
						String column="";
						String columnDataType="";
						String resolutionMode="";
						String bitIndex="";
						if(protocolItems.get(j).getResolutionMode()==1){//如果是枚举量
							boolean isMatch=false;
							columnName=protocolItems.get(j).getTitle();
							addr=protocolItems.get(j).getAddr()+"";
							column="ADDR"+addr;
							columnDataType=protocolItems.get(j).getIFDataType();
							resolutionMode=protocolItems.get(j).getResolutionMode()+"";
							if(protocolItems.get(j).getMeaning()!=null&&protocolItems.get(j).getMeaning().size()>0){
								for(int l=0;l<protocolItems.get(j).getMeaning().size();l++){
									if(value.equals(protocolItems.get(j).getMeaning().get(l).getValue()+"")){
										isMatch=true;
										value=protocolItems.get(j).getMeaning().get(l).getMeaning();
										ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(columnName,value,rawValue,addr,column,columnDataType,resolutionMode,bitIndex);
										protocolItemResolutionDataList.add(protocolItemResolutionData);
										break;
									}
								}
							}
							if(!isMatch){
								ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(columnName,value,rawValue,addr,column,columnDataType,resolutionMode,bitIndex);
								protocolItemResolutionDataList.add(protocolItemResolutionData);
							}
						}else if(protocolItems.get(j).getResolutionMode()==0){//如果是开关量
							boolean isMatch=false;
							columnName=protocolItems.get(j).getTitle();
							addr=protocolItems.get(j).getAddr()+"";
							column="ADDR"+addr;
							columnDataType=protocolItems.get(j).getIFDataType();
							resolutionMode=protocolItems.get(j).getResolutionMode()+"";
							
							if(protocolItems.get(j).getMeaning()!=null&&protocolItems.get(j).getMeaning().size()>0){
								String[] valueArr=value.split(",");
								for(int l=0;l<protocolItems.get(j).getMeaning().size();l++){
									columnName=protocolItems.get(j).getMeaning().get(l).getMeaning();
									if(StringManagerUtils.isNotNull(value)){
										for(int m=0;valueArr!=null&&m<valueArr.length;m++){
											if(m==protocolItems.get(j).getMeaning().get(l).getValue()  ){
												isMatch=true;
												bitIndex=m+"";
												if("bool".equalsIgnoreCase(columnDataType) || "boolean".equalsIgnoreCase(columnDataType)){
													value=("true".equalsIgnoreCase(valueArr[m]) || "1".equalsIgnoreCase(valueArr[m]))?"开":"关";
													rawValue=("true".equalsIgnoreCase(valueArr[m]) || "1".equalsIgnoreCase(valueArr[m]))?"1":"0";
												}else{
													value=valueArr[m];
												}
												
												ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(columnName,value,rawValue,addr,column,columnDataType,resolutionMode,bitIndex);
												protocolItemResolutionDataList.add(protocolItemResolutionData);
												break;
											}
										}
									}else{
										ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(columnName,value,rawValue,addr,column,columnDataType,resolutionMode,bitIndex);
										protocolItemResolutionDataList.add(protocolItemResolutionData);
									}
								}
							}else{
								ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(columnName,value,rawValue,addr,column,columnDataType,resolutionMode,bitIndex);
								protocolItemResolutionDataList.add(protocolItemResolutionData);
							}
						}else{//如果是数据量
							columnName=protocolItems.get(j).getTitle();
							addr=protocolItems.get(j).getAddr()+"";
							column="ADDR"+addr;
							columnDataType=protocolItems.get(j).getIFDataType();
							resolutionMode=protocolItems.get(j).getResolutionMode()+"";
							ProtocolItemResolutionData protocolItemResolutionData =new ProtocolItemResolutionData(columnName,value,rawValue,addr,column,columnDataType,resolutionMode,bitIndex);
							protocolItemResolutionDataList.add(protocolItemResolutionData);
						} 
					}
					
					if(protocolItemResolutionDataList.size()%items==0){
						row=protocolItemResolutionDataList.size()/items+1;
					}else{
						row=protocolItemResolutionDataList.size()/items+2;
					}
					result_json.append("{\"name1\":\""+(obj[1]+":"+obj[2]+" "+obj[4])+"\"},");
					
					for(int j=1;j<row;j++){
						//记录每一行的详细信息
						result_json.append("{");
						for(int k=0;k<items;k++){
							int index=items*(j-1)+k;
							String columnName="";
							String value="";
							String rawValue="";
							String addr="";
							String column="";
							String columnDataType="";
							String resolutionMode="";
							String bitIndex="";
							int alarmLevel=0;
							if(index<protocolItemResolutionDataList.size()){
								columnName=protocolItemResolutionDataList.get(index).getColumnName();
								value=protocolItemResolutionDataList.get(index).getValue();
								rawValue=protocolItemResolutionDataList.get(index).getRawValue();
								addr=protocolItemResolutionDataList.get(index).getAddr();
								column=protocolItemResolutionDataList.get(index).getColumn();
								columnDataType=protocolItemResolutionDataList.get(index).getColumnDataType();
								resolutionMode=protocolItemResolutionDataList.get(index).getResolutionMode();
								bitIndex=protocolItemResolutionDataList.get(index).getBitIndex();
								for(int l=0;l<alarmItemsList.size();l++){
									Object[] alarmItemObj=(Object[]) alarmItemsList.get(l);
									if(protocolItemResolutionDataList.get(index).getAddr().equals(alarmItemObj[2]+"")){
										int alarmType=StringManagerUtils.stringToInteger(alarmItemObj[3]+"");
										if(alarmType==2 && StringManagerUtils.isNotNull(rawValue)){//数据量报警
											float hystersis=StringManagerUtils.stringToFloat(alarmItemObj[8]+"");
											if((StringManagerUtils.isNotNull(alarmItemObj[6]+"") && StringManagerUtils.stringToFloat(rawValue)>StringManagerUtils.stringToFloat(alarmItemObj[6]+"")+hystersis)
													||(StringManagerUtils.isNotNull(alarmItemObj[7]+"") && StringManagerUtils.stringToFloat(rawValue)<StringManagerUtils.stringToFloat(alarmItemObj[7]+"")-hystersis)
													){
												alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
												
											}
											break;
										}else if(alarmType==0){//开关量报警
											if(StringManagerUtils.isNotNull(bitIndex)){
												if(bitIndex.equals(alarmItemObj[4]+"") && StringManagerUtils.stringToInteger(rawValue)==StringManagerUtils.stringToInteger(alarmItemObj[5]+"")){
													alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
												}
											}
										}else if(alarmType==1){//枚举量报警
											if(StringManagerUtils.stringToInteger(rawValue)==StringManagerUtils.stringToInteger(alarmItemObj[5]+"")){
												alarmLevel=StringManagerUtils.stringToInteger(alarmItemObj[10]+"");
											}
										}
									}
								}
							}
							result_json.append("\"name"+(k+1)+"\":\""+columnName+"\",");
							result_json.append("\"value"+(k+1)+"\":\""+value+"\",");
							info_json.append("{\"row\":"+j+",\"col\":"+k+",\"addr\":\""+addr+"\","
									+ "\"columnName\":\""+columnName+"\","
									+ "\"column\":\""+column+"\","
									+ "\"value\":\""+value+"\","
									+ "\"columnDataType\":\""+columnDataType+"\","
									+ "\"resolutionMode\":\""+resolutionMode+"\","
									+ "\"alarmLevel\":"+alarmLevel+"},");
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
	
	
	public String getDeviceControlandInfoData(String wellName,String deviceType,int userId)throws Exception {
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
		List<Integer> controlItemResolutionMode=new ArrayList<Integer>();
		List<String> controlItemMeaningList=new ArrayList<String>();
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
										controlItemResolutionMode.add(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getResolutionMode());
										if(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getResolutionMode()==2){//数据量
											controlItemMeaningList.add("[]");
										}else if(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getResolutionMode()==1){//枚举量
											if(modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getMeaning()!=null && modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getMeaning().size()>0){
												StringBuffer itemMeaning_buff = new StringBuffer();
												itemMeaning_buff.append("[");
												for(int n=0;n<modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getMeaning().size();n++){
													itemMeaning_buff.append("["+modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getMeaning().get(n).getValue()+",'"+modbusProtocolConfig.getProtocol().get(j).getItems().get(k).getMeaning().get(n).getMeaning()+"'],");
												}
												if(itemMeaning_buff.toString().endsWith(",")){
													itemMeaning_buff.deleteCharAt(itemMeaning_buff.length() - 1);
												}
												itemMeaning_buff.append("]");
												controlItemMeaningList.add(itemMeaning_buff.toString());
											}else{
												controlItemMeaningList.add("[]");
											}
											
										}
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
		String sql="select t2.commStatus,t.factorynumber,t.model,t.productiondate,t.deliverydate,t.commissioningdate,t.controlcabinetmodel ";
		if(StringManagerUtils.stringToInteger(deviceType)>0){
			tableName="tbl_pipelineacqdata_latest";
		}
		for(int i=0;i<controlColumns.size();i++){
			sql+=",t2."+controlColumns.get(i);
		}
		
		if(StringManagerUtils.stringToInteger(deviceType)>0){
			sql+=",t.pipelinelength";
		}
		sql+= " from TBL_WELLINFORMATION t,"+tableName+" t2 where t.id=t2.wellid and t.wellname='"+wellName+"' and t.devicetype="+StringManagerUtils.stringToInteger(deviceType);
		
		result_json.append("{ \"success\":true,\"isControl\":"+isControl+",");
		List<?> list = this.findCallSql(sql);
		if(list.size()>0){
			Object[] obj=(Object[]) list.get(0);
			result_json.append("\"commStatus\":\""+obj[0]+"\",");
			deviceInfoDataList.append("{\"title\":\"出厂编号\",\"name\":\"factorynumber\",\"value\":\""+obj[1]+"\"},");
			deviceInfoDataList.append("{\"title\":\"规格型号\",\"name\":\"model\",\"value\":\""+obj[2]+"\"},");
			deviceInfoDataList.append("{\"title\":\"生产日期\",\"name\":\"productiondate\",\"value\":\""+obj[3]+"\"},");
			deviceInfoDataList.append("{\"title\":\"发货日期\",\"name\":\"deliverydate\",\"value\":\""+obj[4]+"\"},");
			deviceInfoDataList.append("{\"title\":\"投产日期\",\"name\":\"commissioningdate\",\"value\":\""+obj[5]+"\"},");
			deviceInfoDataList.append("{\"title\":\"控制柜型号\",\"name\":\"controlcabinetmodel\",\"value\":\""+obj[6]+"\"}");
			if(StringManagerUtils.stringToInteger(deviceType)>0){
				deviceInfoDataList.append(",{\"title\":\"管体长度(m)\",\"name\":\"pipelinelength\",\"value\":\""+obj[7+controlColumns.size()]+"\"}");
			}
			for(int i=0;i<controlColumns.size();i++){
				deviceControlList.append("{\"title\":\""+controlItems.get(i)+"\",\"name\":\""+controlColumns.get(i)+"\",\"resolutionMode\":"+controlItemResolutionMode.get(i)+",\"value\":\""+obj[7+i]+"\",\"itemMeaning\":\""+controlItemMeaningList.get(i)+"\"},");
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
		int resolutionMode=0;
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
								resolutionMode=modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getResolutionMode();
								break;
							}
						}
						break;
					}
				}
			}
		}
		
		result_json.append("{\"deviceName\":\""+deviceName+"\",\"item\":\""+item+"\",\"column\":\""+column+"\",\"unit\":\""+unit+"\",\"dataType\":\""+dataType+"\",\"resolutionMode\":"+resolutionMode+",\"list\":[");
		if(resolutionMode==2){//只查询数据量的曲线
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
	
	public void saveDeviceControlLog(String wellName,String deviceType,String title,String value,User user) throws SQLException{
		getBaseDao().saveDeviceControlLog(wellName,deviceType,title,value,user);
	}
}
