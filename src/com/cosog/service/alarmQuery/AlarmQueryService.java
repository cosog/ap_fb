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
	
	public String getCommunicationAlarmData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,Page pager) throws IOException, SQLException{
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
}
