package com.cosog.controller.realTimeMonitoring;

import java.io.IOException;
import java.io.PrintWriter;
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
import com.cosog.model.calculate.PCPCalculateResponseData;
import com.cosog.model.gridmodel.WellGridPanelData;
import com.cosog.model.gridmodel.WellHandsontableChangedData;
import com.cosog.service.back.WellInformationManagerService;
import com.cosog.service.base.CommonDataService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.Constants;
import com.cosog.utils.Page;
import com.cosog.utils.PagingConstants;
import com.cosog.utils.ParamUtils;
import com.cosog.utils.StringManagerUtils;
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
	private WellInformationManagerService<WellInformation> wellInformationManagerService;
	@Autowired
	private CommonDataService service;
	private String limit;
	private String msg = "";
	private String wellName;
	private String deviceType;
	private String page;
	private String orgId;
	private int totals;
	
	


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

	public String getDevicetype() {
		return deviceType;
	}

	public void setDevicetype(String deviceType) {
		this.deviceType = deviceType;
	}
}
