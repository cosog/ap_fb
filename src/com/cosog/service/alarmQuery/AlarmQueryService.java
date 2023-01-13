package com.cosog.service.alarmQuery;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosog.model.AlarmShowStyle;
import com.cosog.model.data.DataDictionary;
import com.cosog.service.base.BaseService;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.data.DataitemsInfoService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.Config;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.Page;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import net.sf.json.JSONObject;

@Service("alarmQueryService")
public class AlarmQueryService<T> extends BaseService<T>  {

	@Autowired
	private CommonDataService service;
	@Autowired
	private DataitemsInfoService dataitemsInfoService;
	
	public String getAlarmData(String orgId,String deviceType,String deviceId,String deviceName,String alarmType,String alarmLevel,String isSendMessage,Page pager) throws IOException, SQLException{
		String ddicName="commStatusAlarm";
		if(StringManagerUtils.stringToInteger(alarmType)==1){
			ddicName="numericValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==2){
			ddicName="enumValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==3){
			ddicName="switchingValueAlarm";
		}
		
		String tableName="viw_pumpalarminfo_hist";
		if(StringManagerUtils.stringToInteger(deviceType)==1){
			tableName="viw_pipelinealarminfo_hist";
		}
		
		DataDictionary ddic = null;
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from "+tableName+" t where t.orgid in ("+orgId+") "
				+ " and t.alarmtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
		if(StringManagerUtils.isNotNull(deviceId)){
			sql+=" and t.wellid="+deviceId;
		}
		if(StringManagerUtils.isNotNull(alarmType)){
			sql+=" and t.alarmType="+alarmType;
		}
		if(StringManagerUtils.isNotNull(alarmLevel)){
			sql+=" and t.alarmLevel="+alarmLevel;
		}
		if(StringManagerUtils.isNotNull(isSendMessage)){
			sql+=" and t.isSendMessage="+isSendMessage;
		}
		sql+=" order by t.alarmtime desc";
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		String getResult = this.findCustomPageBySqlEntity(sql,finalSql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public String getAlarmExportData(String orgId,String deviceType,String deviceId,String deviceName,String alarmType,String alarmLevel,String isSendMessage,Page pager) throws IOException, SQLException{
		String ddicName="commStatusAlarm";
		if(StringManagerUtils.stringToInteger(alarmType)==1){
			ddicName="numericValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==2){
			ddicName="enumValueAlarm";
		}else if(StringManagerUtils.stringToInteger(alarmType)==3){
			ddicName="switchingValueAlarm";
		}
		String tableName="viw_pumpalarminfo_hist";
		if(StringManagerUtils.stringToInteger(deviceType)==1){
			tableName="viw_pipelinealarminfo_hist";
		}
		DataDictionary ddic = null;
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from "+tableName+" t where t.orgid in ("+orgId+") "
				+ " and t.alarmtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
		if(StringManagerUtils.isNotNull(deviceId)){
			sql+=" and t.wellid="+deviceId;
		}
		if(StringManagerUtils.isNotNull(alarmType)){
			sql+=" and t.alarmType="+alarmType;
		}
		if(StringManagerUtils.isNotNull(alarmLevel)){
			sql+=" and t.alarmLevel="+alarmLevel;
		}
		if(StringManagerUtils.isNotNull(isSendMessage)){
			sql+=" and t.isSendMessage="+isSendMessage;
		}
		sql+=" order by t.alarmtime desc";
		
		String getResult = this.findExportDataBySqlEntity(sql,sql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public boolean exportAlarmData(HttpServletResponse response,String fileName,String title,String head,String field,String orgId,String deviceType,String deviceId,String deviceName,String alarmType,String alarmLevel,String isSendMessage,Page pager){
		int maxvalue=Config.getInstance().configFile.getOthers().getExportLimit();
		OutputStream os=null;
		WritableWorkbook wbook=null;
		Label excelTitle=null;
		StringBuffer result_json = new StringBuffer();
		try{
			os = response.getOutputStream();
			response.reset();
			response.setContentType("application/vnd.ms-excel");// 设置生成的文件类型
			fileName += "-" + StringManagerUtils.getCurrentTime("yyyy-MM-dd HH:mm:ss") + ".xls";
			response.setHeader("Content-disposition", "attachment; filename=" + new String(fileName.getBytes("gb2312"), "ISO8859-1"));//
			Vector<File> files = new Vector<File>();
			wbook = Workbook.createWorkbook(os);
			WritableSheet wsheet = wbook.createSheet(title, 0); //
			String heads[]=head.split(",");
			String columns[]=field.split(",");
			WritableFont wfont = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
			WritableCellFormat wcfFC = new WritableCellFormat(wfont);
			wcfFC.setBackground(Colour.WHITE);
			wsheet.addCell(new Label(heads.length / 2, 0, title, wcfFC));
			wfont = new jxl.write.WritableFont(WritableFont.ARIAL, 6, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
			wcfFC = new WritableCellFormat(wfont);
			WritableFont font1 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, jxl.format.UnderlineStyle.NO_UNDERLINE, jxl.format.Colour.BLACK);// 定义字体
			WritableCellFormat titleWritableFormat = new WritableCellFormat(font1);// 定义格式化对象
			titleWritableFormat.setAlignment(Alignment.CENTRE);// 水平居中显示

			// wsheet.setRowView(1,30);// 设置行高
			titleWritableFormat.setBorder(Border.ALL, BorderLineStyle.THIN); // 设置边框线
			for (int i = 0; i < heads.length; i++) {
				wsheet.setColumnView(i, 15);// 设置列宽
				excelTitle = new Label(i, 1, heads[i], titleWritableFormat);
				wsheet.addCell(excelTitle);
			}
			String tableName="viw_pumpalarminfo_hist";
			if(StringManagerUtils.stringToInteger(deviceType)==1){
				tableName="viw_pipelinealarminfo_hist";
			}
			
			String sql="select t.id,t.wellid,t.wellname,t.devicetype,t.deviceTypeName,to_char(t.alarmtime,'yyyy-mm-dd hh24:mi:ss') as alarmtime,"
					+ " t.itemname,t.alarmtype,t.alarmTypeName,t.alarmvalue,t.alarminfo,t.alarmlimit,t.hystersis,"
					+ " t.alarmlevel,t.alarmLevelName,"
					+ " t.issendmessage,t.issendmail,"
					+ " t.recoverytime,t.orgid "
					+ " from "+tableName+" t where t.orgid in ("+orgId+") "
					+ " and t.alarmtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
			if(StringManagerUtils.isNotNull(deviceId)){
				sql+=" and t.wellid="+deviceId;
			}
			if(StringManagerUtils.isNotNull(alarmType)){
				sql+=" and t.alarmType="+alarmType;
			}
			if(StringManagerUtils.isNotNull(alarmLevel)){
				sql+=" and t.alarmLevel="+alarmLevel;
			}
			if(StringManagerUtils.isNotNull(isSendMessage)){
				sql+=" and t.isSendMessage="+isSendMessage;
			}
			sql+=" order by t.alarmtime desc";
			String finalSql="select a.* from ("+sql+" ) a where  rownum <="+maxvalue;
			List<?> list = this.findCallSql(finalSql);
			JSONObject jsonObject=null;
			Object[] obj=null;
			for(int i=0;i<list.size()&&i<maxvalue;i++){
				obj=(Object[]) list.get(i);
				result_json = new StringBuffer();
				result_json.append("{\"id\":\""+obj[0]+"\",");
				result_json.append("\"wellId\":\""+obj[1]+"\",");
				result_json.append("\"wellName\":\""+obj[2]+"\",");
				result_json.append("\"deviceType\":\""+obj[3]+"\",");
				result_json.append("\"deviceTypeName\":\""+obj[4]+"\",");
				result_json.append("\"alarmTime\":\""+obj[5]+"\",");
				result_json.append("\"itemName\":\""+obj[6]+"\",");
				result_json.append("\"alarmType\":\""+obj[7]+"\",");
				result_json.append("\"alarmTypeName\":\""+obj[8]+"\",");
				result_json.append("\"alarmValue\":\""+obj[9]+"\",");
				result_json.append("\"alarmInfo\":\""+obj[10]+"\",");
				result_json.append("\"alarmLimit\":\""+obj[11]+"\",");
				result_json.append("\"hystersis\":\""+obj[12]+"\",");
				result_json.append("\"alarmLevel\":\""+obj[13]+"\",");
				result_json.append("\"alarmLevelName\":\""+obj[14]+"\",");
				result_json.append("\"isSendMessage\":\""+obj[15]+"\",");
				result_json.append("\"isSendMail\":\""+obj[16]+"\",");
				result_json.append("\"recoveryTime\":\""+obj[17]+"\",");
				result_json.append("\"orgId\":\""+obj[18]+"\"}");
				
				jsonObject = JSONObject.fromObject(result_json.toString().replaceAll("null", ""));
				for (int j = 0; j < columns.length; j++) {
					if (columns[j].equalsIgnoreCase("id") || columns[j].equalsIgnoreCase("jlbh")) {
						wsheet.setColumnView(j, 10);
						excelTitle = new Label(j, i+2, (i+1)+"", titleWritableFormat);
					}else {
						if(columns[j].toLowerCase().indexOf("time")>0 || columns[j].toLowerCase().indexOf("date")>0){
							wsheet.setColumnView(j, 30);
						}else{
							wsheet.setColumnView(j, 16);
						}
						if(jsonObject.has(columns[j])){
							excelTitle = new Label(j, i+2,jsonObject.getString(columns[j]),titleWritableFormat);
						}else{
							excelTitle = new Label(j, i+2,"",titleWritableFormat);
						}
					}
					wsheet.addCell(excelTitle);
				}
			}
			wbook.write();
			wbook.close();
			os.close();
			wbook=null;
			os=null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		} finally{
			try {
				if(os!=null){
					os.close();
				}
				if(wbook!=null){
					wbook.close();
				}
			} catch (IOException | WriteException e) {
				e.printStackTrace();
			}
		}
		return true;
	}
	
	public String getAlarmOverviewData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,String isSendMessage,Page pager) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		
		String tableName="viw_pumpalarminfo_latest";
		if(StringManagerUtils.stringToInteger(deviceType)==1){
			tableName="viw_pipelinealarminfo_latest";
		}
		
		String columns="["
				+ "{\"header\":\"序号\",\"dataIndex\":\"id\",width:50,children:[]},"
				+ "{\"header\":\"井名\",\"dataIndex\":\"wellName\",flex:8,children:[]},"
				+ "{\"header\":\"报警时间\",\"dataIndex\":\"alarmTime\",flex:10,children:[]},"
				+ "{ \"header\":\"设备类型\",\"dataIndex\":\"deviceTypeName\",flex:6,children:[] }"
				+ "]";
		String sql="select v.wellid,v.wellname,v.devicetypename,v.alarmtype,v.alarmtime from "
				+ " (select t.orgid,t.wellid,t.wellname,c1.itemname as devicetypename,t.alarmtype,max(t.alarmtime) as alarmtime "
				+ " from "+tableName+" t,tbl_code c1 "
				+ " where c1.itemcode='DEVICETYPE' and t.devicetype=c1.itemvalue";
		if(StringManagerUtils.isNotNull(alarmLevel)){
			sql+=" and t.alarmLevel="+alarmLevel+"";
		}
		if(StringManagerUtils.isNotNull(isSendMessage)){
			sql+=" and t.isSendMessage="+isSendMessage+"";
		}
		sql+= " group by t.orgid,t.wellid,t.wellname,c1.itemname,t.alarmtype) v "
				+ " where v.orgid in("+orgId+") and v.alarmtype="+alarmType;
		
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
			result_json.append("\"deviceTypeName\":\""+obj[2]+"\",");
			result_json.append("\"alarmType\":\""+obj[3]+"\",");
			result_json.append("\"alarmTime\":\""+obj[4]+"\"},");
		}
		if(result_json.toString().endsWith(",")){
			result_json.deleteCharAt(result_json.length() - 1);
		}
		result_json.append("]}");
		return result_json.toString().replaceAll("\"null\"", "\"\"");
	}
	
	public String getAlarmOverviewExportData(String orgId,String deviceType,String deviceName,String alarmType,String alarmLevel,String isSendMessage,Page pager) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		String tableName="viw_pumpalarminfo_latest";
		if(StringManagerUtils.stringToInteger(deviceType)==1){
			tableName="viw_pipelinealarminfo_latest";
		}
		String sql="select v.wellid,v.wellname,v.devicetypename,v.alarmtype,v.alarmtime from "
				+ " (select t.orgid,t.wellid,t.wellname,c1.itemname as devicetypename,t.alarmtype,max(t.alarmtime) as alarmtime "
				+ " from "+tableName+" t,tbl_code c1 "
				+ " where c1.itemcode='DEVICETYPE' and t.devicetype=c1.itemvalue";
		if(StringManagerUtils.isNotNull(alarmLevel)){
			sql+=" and t.alarmLevel="+alarmLevel+"";
		}
		if(StringManagerUtils.isNotNull(isSendMessage)){
			sql+=" and t.isSendMessage="+isSendMessage+"";
		}
		sql+= " group by t.orgid,t.wellid,t.wellname,c1.itemname,t.alarmtype) v "
				+ " where v.orgid in("+orgId+") and v.alarmtype="+alarmType;
		
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
			result_json.append("\"deviceTypeName\":\""+obj[2]+"\",");
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
