package com.cosog.service.alarmQuery;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.data.DataDictionary;
import com.cosog.service.base.BaseService;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.data.DataitemsInfoService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.Page;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;

@Service("alarmQueryService")
public class AlarmQueryService<T> extends BaseService<T>  {

	@Autowired
	private CommonDataService service;
	@Autowired
	private DataitemsInfoService dataitemsInfoService;
	
	public String getAlarmData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,Page pager) throws IOException, SQLException{
		String ddicName="commStatusAlarm";
		if(StringManagerUtils.stringToInteger(alarmType)==1){
			ddicName="numericValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==2){
			ddicName="enumValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==3){
			ddicName="switchingValueAlarm";
		}
		DataDictionary ddic = null;
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from viw_alarminfo t where t.orgid in ("+orgId+") "
				+ " and t.alarmtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd')+1";
		if(StringManagerUtils.isNotNull(deviceType)){
			sql+=" and t.devicetype="+deviceType;
		}
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and t.wellName='"+deviceName+"'";
		}
		if(StringManagerUtils.isNotNull(alarmType)){
			sql+=" and t.alarmType="+alarmType;
		}
		if(StringManagerUtils.isNotNull(alarmLevel)){
			sql+=" and t.alarmLevel="+alarmLevel;
		}
		sql+=" order by t.alarmtime desc";
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		String getResult = this.findCustomPageBySqlEntity(sql,finalSql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public String getAlarmExportData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,Page pager) throws IOException, SQLException{
		String ddicName="commStatusAlarm";
		if(StringManagerUtils.stringToInteger(alarmType)==1){
			ddicName="numericValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==2){
			ddicName="enumValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==3){
			ddicName="switchingValueAlarm";
		}
		DataDictionary ddic = null;
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from viw_alarminfo t where t.orgid in ("+orgId+") "
				+ " and t.alarmtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd')+1";
		if(StringManagerUtils.isNotNull(deviceType)){
			sql+=" and t.devicetype="+deviceType;
		}
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and t.wellName='"+deviceName+"'";
		}
		if(StringManagerUtils.isNotNull(alarmType)){
			sql+=" and t.alarmType="+alarmType;
		}
		if(StringManagerUtils.isNotNull(alarmLevel)){
			sql+=" and t.alarmLevel="+alarmLevel;
		}
		sql+=" order by t.alarmtime desc";
		
		String getResult = this.findExportDataBySqlEntity(sql,sql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public String getAlarmOverviewData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,Page pager) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		String columns="["
				+ "{\"header\":\"序号\",\"dataIndex\":\"id\",width:50,children:[]},"
				+ "{\"header\":\"井名\",\"dataIndex\":\"wellName\",width:80,children:[]},"
				+ "{\"header\":\"报警时间\",\"dataIndex\":\"alarmTime\",width:150,children:[]}"
				+ "]";
		String sql="select v.wellid,v.wellname,v.devicetype,v.alarmtype,v.alarmtime from "
				+ " (select t.orgid,t.wellid,t.wellname,t.devicetype,t.alarmtype,max(t.alarmtime) as alarmtime "
				+ " from VIW_ALARMINFO_LATEST t "
				+ " group by t.orgid,t.wellid,t.wellname,t.devicetype,t.alarmtype) v "
				+ " where v.orgid in("+orgId+") and v.devicetype="+deviceType+" and v.alarmtype="+alarmType;
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and v.wellName='"+deviceName+"'";
		}
		sql+=" order by v.alarmtime desc";
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		int totals=this.getTotalCountRows(sql);
		List<?> list = this.findCallSql(finalSql);
		
		result_json.append("{ \"success\":true,\"columns\":"+columns+",");
		result_json.append("\"totalCount\":"+totals+",");
		result_json.append("\"totalRoot\":[");
		for(int i=0;i<list.size();i++){
			Object[] obj=(Object[]) list.get(i);
			result_json.append("{\"id\":"+obj[0]+",");
			result_json.append("\"wellName\":\""+obj[1]+"\",");
			result_json.append("\"deviceType\":\""+obj[2]+"\",");
			result_json.append("\"alarmType\":\""+obj[3]+"\",");
			result_json.append("\"alarmTime\":\""+obj[4]+"\"},");
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]}");
		return result_json.toString().replaceAll("\"null\"", "\"\"");
	}
	
	public String getAlarmOverviewExportData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,Page pager) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		String sql="select v.wellid,v.wellname,v.devicetype,v.alarmtype,v.alarmtime from "
				+ " (select t.orgid,t.wellid,t.wellname,t.devicetype,t.alarmtype,max(t.alarmtime) as alarmtime "
				+ " from VIW_ALARMINFO_LATEST t "
				+ " group by t.orgid,t.wellid,t.wellname,t.devicetype,t.alarmtype) v "
				+ " where v.orgid in("+orgId+") and v.devicetype="+deviceType+" and v.alarmtype="+alarmType;
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and v.wellName='"+deviceName+"'";
		}
		sql+=" order by v.alarmtime desc";
		List<?> list = this.findCallSql(sql);
		result_json.append("[");
		for(int i=0;i<list.size();i++){
			Object[] obj=(Object[]) list.get(i);
			result_json.append("{\"id\":"+obj[0]+",");
			result_json.append("\"wellName\":\""+obj[1]+"\",");
			result_json.append("\"deviceType\":\""+obj[2]+"\",");
			result_json.append("\"alarmType\":\""+obj[3]+"\",");
			result_json.append("\"alarmTime\":\""+obj[4]+"\"},");
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]");
		return result_json.toString().replaceAll("\"null\"", "\"\"");
	}
}
