package com.cosog.controller.back;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cosog.controller.base.BaseController;
import com.cosog.model.AlarmShowStyle;
import com.cosog.model.User;
import com.cosog.model.WorkStatusAlarm;
import com.cosog.model.drive.ModbusDriverSaveData;
import com.cosog.service.back.AlarmSetManagerService;
import com.cosog.service.base.CommonDataService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.Constants;
import com.cosog.utils.DataModelMap;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.Page;
import com.cosog.utils.PagingConstants;
import com.cosog.utils.ParamUtils;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**<p>描述：后台管理-报警设置Action</p>
 * 
 * @author gao 2014-06-06
 * @version 1.0
 *
 */
@Controller
@RequestMapping("/alarmSetManagerController")
@Scope("prototype")
public class AlarmSetManagerController extends BaseController {
	private static Log log = LogFactory.getLog(AlarmSetManagerController.class);
	private static final long serialVersionUID = -281275682819237996L;
	private WorkStatusAlarm alarm;
//	private DistreteAlarmLimit limit;

	@Autowired
	private AlarmSetManagerService<WorkStatusAlarm> alarmSetManagerService;
	@Autowired
	private CommonDataService commonDataService;
    
	private String orgId;
	private String jh;


	//添加前缀绑定
//	@InitBinder("alarm")    
//    public void initBinder(WebDataBinder binder) {    
//            binder.setFieldDefaultPrefix("alarm.");    
//    }
	
	/**<p>描述：修改报警设置信息</p>
	 * 
	 * @return
	 */
	@RequestMapping("/doAlarmsSetEdit")
	public String doAlarmsSetEdit(@ModelAttribute WorkStatusAlarm alarm) {
		String result="";
		try {
			this.alarmSetManagerService.modifyAlarmSet(alarm);
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			response.setHeader("Cache-Control", "no-cache");
			PrintWriter pw = response.getWriter();
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			response.getWriter().print(result);
			pw.flush();
			pw.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result = "{success:true,msg:false}";
			e.printStackTrace();
		}
		return null;
	}

	/**<p>描述：显示报警设置信息列表</p>
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/doAlarmsSetShow")
	public String doAlarmsSetShow() throws Exception {
		String json = "";
		this.pager = new Page("pagerForm", request);
		json = commonDataService.findAlarmSetDataById(pager);
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset="
				+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
//		log.warn("doAlarmsSetShow json*********=" + json);
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	/**<p>描述：显示报警设置下拉菜单数据信息</p>
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/loadAlarmType")
	public String loadAlarmType() throws Exception {

		String type = ParamUtils.getParameter(request, "type");
		String json = this.alarmSetManagerService.loadAlarmSetType(type);
		//HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
//		log.warn("jh json is ==" + json);
		pw.flush();
		pw.close();
		return null;
	}
	
	/**
	 * 获取报警级别颜色方法
	 * 
	 * @return null
	 * @throws Exception
	 * @author zhao 2016-3-8
	 * 
	 */
	@RequestMapping("/getAlarmLevelColor")
	public String getAlarmLevelColor() throws Exception {
		String json=alarmSetManagerService.getAlarmLevelColor();
//		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	/**
	 * 设置报警级别对应颜色方法
	 * 
	 * @return null
	 * @throws Exception
	 * @author zhao 2016-3-8
	 * 
	 */
	@RequestMapping("/setAlarmLevelColor")
	public String setAlarmLevelColor() throws Exception {
		Gson gson = new Gson();
		Map<String, Object> dataModelMap = DataModelMap.getMapObject();
		AlarmShowStyle alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		if(alarmShowStyle==null){
			EquipmentDriverServerTask.initAlarmStyle();
			alarmShowStyle=(AlarmShowStyle) dataModelMap.get("AlarmShowStyle");
		}
		
		String data = ParamUtils.getParameter(request, "data");
		java.lang.reflect.Type type = new TypeToken<AlarmShowStyle>() {}.getType();
		AlarmShowStyle alarmShowStyleSaveData=gson.fromJson(data, type);
		String json="";
		try {
			if(alarmShowStyleSaveData!=null){
				
			}
			alarmSetManagerService.setAlarmLevelColor(alarmShowStyleSaveData);
			EquipmentDriverServerTask.initAlarmStyle();
			json="{success:true,msg:true}";
		} catch (Exception e) {
			json = "{success:true,msg:false}";
			e.printStackTrace();
		}
//		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	public WorkStatusAlarm getAlarm() {
		return alarm;
	}

	public void setAlarm(WorkStatusAlarm alarm) {
		this.alarm = alarm;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getJh() {
		return jh;
	}

	public void setJh(String jh) {
		this.jh = jh;
	}

//	public DistreteAlarmLimit getLimit() {
//		return limit;
//	}
//
//	public void setLimit(DistreteAlarmLimit limit) {
//		this.limit = limit;
//	}
}