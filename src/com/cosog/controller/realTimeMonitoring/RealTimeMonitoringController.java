package com.cosog.controller.realTimeMonitoring;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cosog.controller.base.BaseController;
import com.cosog.model.Org;
import com.cosog.model.User;
import com.cosog.model.WellInformation;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.model.gridmodel.WellGridPanelData;
import com.cosog.model.gridmodel.WellHandsontableChangedData;
import com.cosog.service.back.WellInformationManagerService;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.realTimeMonitoring.RealTimeMonitoringService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.Config;
import com.cosog.utils.Constants;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.Page;
import com.cosog.utils.PagingConstants;
import com.cosog.utils.ParamUtils;
import com.cosog.utils.StringManagerUtils;
import com.cosog.utils.UnixPwdCrypt;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/realTimeMonitoringController")
@Scope("prototype")
public class RealTimeMonitoringController extends BaseController {
	private static final long serialVersionUID = 1L;
	private static Log log = LogFactory.getLog(RealTimeMonitoringController.class);
	@Autowired
	private RealTimeMonitoringService<?> realTimeMonitoringService;
	@Autowired
	private CommonDataService service;
	private String limit;
	private String msg = "";
	private String wellName;
	private String deviceName;
	private String deviceType;
	private String page;
	private String orgId;
	private int totals;
	
	//
	@RequestMapping("/getDeviceRealTimeOverview")
	public String getDeviceRealTimeOverview() throws Exception {
		String json = "";
		orgId = ParamUtils.getParameter(request, "orgId");
		deviceName = ParamUtils.getParameter(request, "deviceName");
		deviceType = ParamUtils.getParameter(request, "deviceType");
		this.pager = new Page("pagerForm", request);
		User user=null;
		if (!StringManagerUtils.isNotNull(orgId)) {
			HttpSession session=request.getSession();
			user = (User) session.getAttribute("userLogin");
			if (user != null) {
				orgId = "" + user.getUserorgids();
			}
		}
		json = realTimeMonitoringService.getDeviceRealTimeOverview(orgId,deviceName,deviceType,pager);
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset="
				+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getDeviceRealTimeMonitoringData")
	public String getDeviceRealTimeMonitoringData() throws Exception {
		String json = "";
		orgId = ParamUtils.getParameter(request, "orgId");
		deviceName = ParamUtils.getParameter(request, "deviceName");
		deviceType = ParamUtils.getParameter(request, "deviceType");
		this.pager = new Page("pagerForm", request);
		json = realTimeMonitoringService.getDeviceRealTimeMonitoringData(deviceName,deviceType);
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset="
				+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getDeviceControlandInfoData")
	public String getDeviceControlandInfoData() throws Exception {
		String json = "";
		HttpSession session=request.getSession();
		User user = (User) session.getAttribute("userLogin");
		wellName = ParamUtils.getParameter(request, "wellName");
		deviceType = ParamUtils.getParameter(request, "deviceType");
		this.pager = new Page("pagerForm", request);
		json = realTimeMonitoringService.getDeviceControlandInfoData(wellName,deviceType,user.getUserNo());
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset="
				+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}


	@RequestMapping("/loadCurveTypeComboxList")
	public String loadCurveTypeComboxList() throws Exception {
		String json = "";
		HttpSession session=request.getSession();
		User user = (User) session.getAttribute("userLogin");
		wellName = ParamUtils.getParameter(request, "wellName");
		deviceType = ParamUtils.getParameter(request, "deviceType");
		this.pager = new Page("pagerForm", request);
		json = realTimeMonitoringService.loadCurveTypeComboxList(wellName,deviceType);
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset="
				+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getRealTimeCurveData")
	public String getRealTimeCurveData() throws Exception {
		String json = "";
		HttpSession session=request.getSession();
		User user = (User) session.getAttribute("userLogin");
		String deviceName = ParamUtils.getParameter(request, "deviceName");
		String item = ParamUtils.getParameter(request, "item");
		deviceType = ParamUtils.getParameter(request, "deviceType");
		this.pager = new Page("pagerForm", request);
		json = realTimeMonitoringService.getRealTimeCurveData(deviceName,item,deviceType);
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset="
				+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	public String DeviceControlOperation_Mdubus(String protocolCode,String wellName,String deviceType,String ID,String Slave,String itemCode,String controlValue){
		String json="";
		HttpSession session=request.getSession();
		User user = (User) session.getAttribute("userLogin");
		String url=Config.getInstance().configFile.getDriverConfig().getWriteAddr();
		String readUrl=Config.getInstance().configFile.getDriverConfig().getReadAddr();
		Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
		if(equipmentDriveMap.size()==0){
			EquipmentDriverServerTask.loadProtocolConfig();
			equipmentDriveMap = EquipmentDriveMap.getMapObject();
		}
		ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
		
		ModbusProtocolConfig.Protocol protocol=null;
		for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
			if(protocolCode.equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getCode())){
				protocol=modbusProtocolConfig.getProtocol().get(i);
				break;
			}
		}
		int addr=0;
		String dataType="";
		String title="";
		for(int i=0;i<protocol.getItems().size();i++){
			if(itemCode.equals(protocol.getItems().get(i).getName())){
				addr=protocol.getItems().get(i).getAddr();
				dataType=protocol.getItems().get(i).getIFDataType();
				title=protocol.getItems().get(i).getTitle();
				break;
			}
		}
		if(addr>0){
			String ctrlJson="{"
					+ "\"ID\":\""+ID+"\","
					+ "\"Slave\":"+Slave+","
					+ "\"Addr\":"+addr+","
					+ "\"Value\":["+StringManagerUtils.objectToString(controlValue, dataType)+"]"
					+ "}";
			String readJson="{"
					+ "\"ID\":\""+ID+"\","
					+ "\"Slave\":"+Slave+","
					+ "\"Addr\":"+addr+""
					+ "}";
			StringManagerUtils.sendPostMethod(url, ctrlJson,"utf-8");
			String readResult=StringManagerUtils.sendPostMethod(readUrl, readJson,"utf-8");
			
			try {
				realTimeMonitoringService.saveDeviceControlLog(wellName,deviceType,title,StringManagerUtils.objectToString(controlValue, dataType),user);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		json = "{success:true,flag:true,error:true,msg:'<font color=blue>命令发送成功。</font>'}";
		return json;
	}
	
	@RequestMapping("/deviceControlOperation")
	public String DeviceControlOperation() throws Exception {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		String wellName = request.getParameter("wellName");
		String deviceType = request.getParameter("deviceType");
		String password = request.getParameter("password");
		String controlType = request.getParameter("controlType");
		String controlValue = request.getParameter("controlValue");
		String jsonLogin = "";
		String clientIP=StringManagerUtils.getIpAddr(request);
		User userInfo = (User) request.getSession().getAttribute("userLogin");
		// 用户不存在
		if (null != userInfo) {
			String getUpwd = userInfo.getUserPwd();
			String getOld = UnixPwdCrypt.crypt("dogVSgod", password);
			if (getOld.equals(getUpwd)&&StringManagerUtils.isNumber(controlValue)) {
				String sql="select t3.protocol, t.signinid,to_number(t.slave) from tbl_wellinformation t,tbl_protocolinstance t2,tbl_acq_unit_conf t3 "
						+ " where t.instancecode=t2.code and t2.unitid=t3.id"
						+ " and t.wellname='"+wellName+"' and t.deviceType="+deviceType;
				List list = this.service.findCallSql(sql);
				if(list.size()>0){
					Object[] obj=(Object[]) list.get(0);
					String protocol=obj[0]+"";
					String signinid=obj[1]+"";
					String slave=obj[2]+"";
					if(StringManagerUtils.isNotNull(protocol) && StringManagerUtils.isNotNull(signinid)){
						if(StringManagerUtils.isNotNull(slave)){
							jsonLogin=DeviceControlOperation_Mdubus(protocol,wellName,deviceType,signinid,slave,controlType,controlValue);
						}
					}else{
						jsonLogin = "{success:true,flag:true,error:false,msg:'<font color=red>协议配置有误，请核查！</font>'}";
					}
				}else{
					jsonLogin = "{success:true,flag:true,error:false,msg:'<font color=red>该井不存在，请核查！</font>'}";
				}
			}else if(getOld.equals(getUpwd) && !StringManagerUtils.isNumber(controlValue)){
				jsonLogin = "{success:true,flag:true,error:false,msg:'<font color=red>数据有误，请检查输入数据！</font>'}";
			} else {
				jsonLogin = "{success:true,flag:true,error:false,msg:'<font color=red>您输入的密码有误！</font>'}";
			}

		} else {
			jsonLogin = "{success:true,flag:false}";
		}
		// 处理乱码。
		response.setCharacterEncoding("utf-8");
		// 输出json数据。
		out.print(jsonLogin);
		return null;
	}
	
	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}


	public String getWellName() {
		return wellName;
	}

	public void setWellName(String wellName) {
		this.wellName = wellName;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public int getTotals() {
		return totals;
	}

	public void setTotals(int totals) {
		this.totals = totals;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
}
