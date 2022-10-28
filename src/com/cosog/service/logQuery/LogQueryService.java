package com.cosog.service.logQuery;

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
import com.cosog.model.User;
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

@Service("logQueryService")
public class LogQueryService<T> extends BaseService<T>  {

	@Autowired
	private CommonDataService service;
	@Autowired
	private DataitemsInfoService dataitemsInfoService;
	
	public String getDeviceOperationLogData(String orgId,String deviceType,String deviceName,String operationType,Page pager) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		String ddicName="deviceOperationLog";
		DataDictionary ddic = null;
		List<String> ddicColumnsList=new ArrayList<String>();
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from viw_deviceoperationlog t where 1=1"
				+ " and t.orgid in ("+orgId+")"
				+ " and t.createtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
		if(StringManagerUtils.isNotNull(deviceType)){
			sql+=" and t.devicetype="+deviceType;
		}
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and t.wellName='"+deviceName+"'";
		}
		if(StringManagerUtils.isNotNull(operationType)){
			sql+=" and t.action="+operationType;
		}
		sql+=" order by t.createtime desc";
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		String getResult = this.findCustomPageBySqlEntity(sql,finalSql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public String getDeviceOperationLogExportData(String orgId,String deviceType,String deviceName,String operationType,Page pager) throws IOException, SQLException{
		String ddicName="deviceOperationLog";
		DataDictionary ddic = null;
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from viw_deviceoperationlog t where 1=1"
				+ " and t.orgid in ("+orgId+")"
				+ " and t.createtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
		if(StringManagerUtils.isNotNull(deviceType)){
			sql+=" and t.devicetype="+deviceType;
		}
		if(StringManagerUtils.isNotNull(deviceName)){
			sql+=" and t.wellName='"+deviceName+"'";
		}
		if(StringManagerUtils.isNotNull(operationType)){
			sql+=" and t.action="+operationType;
		}
		sql+=" order by t.createtime desc";
		
		String getResult = this.findExportDataBySqlEntity(sql,sql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public boolean exportDeviceOperationLogData(HttpServletResponse response,String fileName,String title,String head,String field,String orgId,String deviceType,String deviceName,String operationType,Page pager) throws IOException, SQLException{
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
			String sql="select t.id,t.devicetype,t.deviceTypeName,"
					+ " t.wellname,to_char(t.createtime,'yyyy-mm-dd hh24:mi:ss') as createtime,"
					+ " t.user_id,t.loginip,"
					+ " t.action,t.actionname,"
					+ " t.remark,t.orgid "
					+ " from viw_deviceoperationlog t where 1=1"
					+ " and t.orgid in ("+orgId+")"
					+ " and t.createtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
			if(StringManagerUtils.isNotNull(deviceType)){
				sql+=" and t.devicetype="+deviceType;
			}
			if(StringManagerUtils.isNotNull(deviceName)){
				sql+=" and t.wellName='"+deviceName+"'";
			}
			if(StringManagerUtils.isNotNull(operationType)){
				sql+=" and t.action="+operationType;
			}
			sql+=" order by t.createtime desc";
			
			String finalSql="select a.* from ("+sql+" ) a where  rownum <="+maxvalue;
			List<?> list = this.findCallSql(finalSql);
			JSONObject jsonObject=null;
			Object[] obj=null;
			for(int i=0;i<list.size()&&i<maxvalue;i++){
				obj=(Object[]) list.get(i);
				result_json = new StringBuffer();
				result_json.append("{\"id\":\""+obj[0]+"\",");
				result_json.append("\"deviceType\":\""+obj[1]+"\",");
				result_json.append("\"deviceTypeName\":\""+obj[2]+"\",");
				result_json.append("\"wellName\":\""+obj[3]+"\",");
				result_json.append("\"createTime\":\""+obj[4]+"\",");
				result_json.append("\"user_id\":\""+obj[5]+"\",");
				result_json.append("\"loginIp\":\""+obj[6]+"\",");
				result_json.append("\"action\":\""+obj[7]+"\",");
				result_json.append("\"actionName\":\""+obj[8]+"\",");
				result_json.append("\"remark\":\""+obj[9]+"\",");
				result_json.append("\"orgId\":\""+obj[10]+"\"}");
				
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
	
	
	
	public String getSystemLogData(String orgId,String operationType,Page pager,User user) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		String ddicName="SystemLog";
		DataDictionary ddic = null;
		List<String> ddicColumnsList=new ArrayList<String>();
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from viw_systemlog t where "
				+ "t.orgid in ("+orgId+") "
				+ " and ("
				+ " t.role_level>(select t3.role_level from tbl_user t2,tbl_role t3 where t2.user_type=t3.role_id and t2.user_no="+user.getUserNo()+")"
				+ " or t.user_no=(select t2.user_no from tbl_user t2 where  t2.user_no="+user.getUserNo()+")"
				+ " )"
				+ " and t.createtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
		
		if(StringManagerUtils.isNotNull(operationType)){
//			sql+=" and t.action="+operationType;
		}
		sql+=" order by t.createtime desc";
		int maxvalue=pager.getLimit()+pager.getStart();
		String finalSql="select * from   ( select a.*,rownum as rn from ("+sql+" ) a where  rownum <="+maxvalue+") b where rn >"+pager.getStart();
		
		String getResult = this.findCustomPageBySqlEntity(sql,finalSql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public String getSystemLogExportData(String orgId,String operationType,Page pager,User user) throws IOException, SQLException{
		StringBuffer result_json = new StringBuffer();
		String ddicName="SystemLog";
		DataDictionary ddic = null;
		List<String> ddicColumnsList=new ArrayList<String>();
		ddic  = dataitemsInfoService.findTableSqlWhereByListFaceId(ddicName);
		String columns = ddic.getTableHeader();
		String sql=ddic.getSql()+" from viw_systemlog t where "
				+ " t.orgid in ("+orgId+") "
				+ " and ("
				+ " t.role_level>(select t3.role_level from tbl_user t2,tbl_role t3 where t2.user_type=t3.role_id and t2.user_no="+user.getUserNo()+")"
				+ " or t.user_no=(select t2.user_no from tbl_user t2 where  t2.user_no="+user.getUserNo()+")"
				+ " )"
				+ " and t.createtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
		
		if(StringManagerUtils.isNotNull(operationType)){
//			sql+=" and t.action="+operationType;
		}
		sql+=" order by t.createtime desc";
		
		String getResult = this.findExportDataBySqlEntity(sql,sql, columns, 20 + "", pager);
		return getResult.replaceAll("\"null\"", "\"\"");
	}
	
	public boolean exportSystemLogData(HttpServletResponse response,String fileName,String title,String head,String field,String orgId,String operationType,Page pager,User user){
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
			String sql="select t.id,to_char(t.createtime,'yyyy-mm-dd hh24:mi:ss') as createtime,"
					+ " t.user_no,t.user_id,t.role_id,t.role_level,"
					+ " t.loginip,t.action,t.actionname,"
					+ " t.remark,t.orgid "
					+ " from viw_systemlog t where "
					+ " t.orgid in ("+orgId+") "
					+ " and ("
					+ " t.role_level>(select t3.role_level from tbl_user t2,tbl_role t3 where t2.user_type=t3.role_id and t2.user_no="+user.getUserNo()+")"
					+ " or t.user_no=(select t2.user_no from tbl_user t2 where  t2.user_no="+user.getUserNo()+")"
					+ " )"
					+ " and t.createtime between to_date('"+pager.getStart_date()+"','yyyy-mm-dd hh24:mi:ss') and to_date('"+pager.getEnd_date()+"','yyyy-mm-dd hh24:mi:ss')";
			
			
			String finalSql="select a.* from ("+sql+" ) a where  rownum <="+maxvalue;
			List<?> list = this.findCallSql(finalSql);
			JSONObject jsonObject=null;
			Object[] obj=null;
			for(int i=0;i<list.size()&&i<maxvalue;i++){
				obj=(Object[]) list.get(i);
				result_json = new StringBuffer();
				result_json.append("{\"id\":\""+obj[0]+"\",");
				result_json.append("\"createTime\":\""+obj[1]+"\",");
				result_json.append("\"user_no\":\""+obj[2]+"\",");
				result_json.append("\"user_id\":\""+obj[3]+"\",");
				result_json.append("\"role_id\":\""+obj[4]+"\",");
				result_json.append("\"role_level\":\""+obj[5]+"\",");
				result_json.append("\"loginIp\":\""+obj[6]+"\",");
				result_json.append("\"action\":\""+obj[7]+"\",");
				result_json.append("\"actionName\":\""+obj[8]+"\",");
				result_json.append("\"remark\":\""+obj[9]+"\",");
				result_json.append("\"orgId\":\""+obj[10]+"\"}");
				
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
}
