package com.cosog.controller.acquisitionUnit;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
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
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cosog.controller.base.BaseController;
import com.cosog.model.AcquisitionGroup;
import com.cosog.model.AcquisitionGroupItem;
import com.cosog.model.AcquisitionUnit;
import com.cosog.model.AcquisitionUnitGroup;
import com.cosog.model.AlarmGroup;
import com.cosog.model.AlarmGroupItem;
import com.cosog.model.Module;
import com.cosog.model.ProtocolInstance;
import com.cosog.model.Role;
import com.cosog.model.RoleModule;
import com.cosog.model.User;
import com.cosog.model.drive.KafkaConfig;
import com.cosog.model.drive.ModbusDriverSaveData;
import com.cosog.model.drive.ModbusProtocolAlarmGroupSaveData;
import com.cosog.model.drive.ModbusProtocolConfig;
import com.cosog.model.drive.ModbusProtocolInstanceSaveData;
import com.cosog.model.gridmodel.AcquisitionGroupHandsontableChangeData;
import com.cosog.model.gridmodel.AcquisitionUnitHandsontableChangeData;
import com.cosog.service.acquisitionUnit.AcquisitionUnitManagerService;
import com.cosog.service.base.CommonDataService;
import com.cosog.service.right.RoleManagerService;
import com.cosog.task.EquipmentDriverServerTask;
import com.cosog.utils.BackModuleRecursion;
import com.cosog.utils.Constants;
import com.cosog.utils.DataSourceConfig;
import com.cosog.utils.DataSourceConfigSaveData;
import com.cosog.utils.EquipmentDriveMap;
import com.cosog.utils.Page;
import com.cosog.utils.PagingConstants;
import com.cosog.utils.ParamUtils;
import com.cosog.utils.StringManagerUtils;
import com.cosog.utils.TcpServerConfigMap;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/** <p>描述：角色维护管理Action</p>
 * 
 * @author gao 2014-06-04
 *
 */
@Controller
@RequestMapping("/acquisitionUnitManagerController")
@Scope("prototype")
public class AcquisitionUnitManagerController extends BaseController {

	private static Log log = LogFactory.getLog(AcquisitionUnitManagerController.class);
	private static final long serialVersionUID = -281275682819237996L;
	@Autowired
	private AcquisitionUnitManagerService<AcquisitionUnit> acquisitionUnitManagerService;
	@Autowired
	private AcquisitionUnitManagerService<AcquisitionGroup> acquisitionGroupManagerService;
	@Autowired
	private AcquisitionUnitManagerService<AcquisitionGroupItem> acquisitionUnitItemManagerService;
	
	@Autowired
	private AcquisitionUnitManagerService<AlarmGroup> alarmGroupManagerService;
	
	@Autowired
	private AcquisitionUnitManagerService<AlarmGroupItem> alarmGroupItemManagerService;
	
	@Autowired
	private AcquisitionUnitManagerService<ProtocolInstance> protocolInstanceManagerService;
	@Autowired
	private CommonDataService service;
	private AcquisitionUnit acquisitionUnit;
	private AcquisitionGroup acquisitionGroup;
	private AlarmGroup alarmGroup;
	
	private ProtocolInstance protocolInstance;
	private String limit;
	private String msg = "";
	private String unitName;
	private String groupName;
	private String page;
	
	//添加绑定前缀 
	@InitBinder("acquisitionUnit")
	public void initBinder(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("acquisitionUnit.");
	}
	//添加绑定前缀 
	@InitBinder("acquisitionGroup")
	public void initBinder2(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("acquisitionGroup.");
	}
	
	//添加绑定前缀 
	@InitBinder("protocolInstance")
	public void initBinder3(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("protocolInstance.");
	}
	
	//添加绑定前缀 
	@InitBinder("alarmGroup")
	public void initBinder4(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("alarmGroup.");
	}

	/**<p>描述：采集类型数据显示方法</p>
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/doAcquisitionUnitShow")
	public String doAcquisitionUnitShow() throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();
		String protocolName = ParamUtils.getParameter(request, "protocolName");
		unitName = ParamUtils.getParameter(request, "unitName");
		int intPage = Integer.parseInt((page == null || page == "0") ? "1": page);
		int pageSize = Integer.parseInt((limit == null || limit == "0") ? "10": limit);
		int offset = (intPage - 1) * pageSize;
		map.put(PagingConstants.PAGE_NO, intPage);
		map.put(PagingConstants.PAGE_SIZE, pageSize);
		map.put(PagingConstants.OFFSET, offset);
		map.put("protocolName", protocolName);
		map.put("unitName", unitName);
		log.debug("intPage==" + intPage + " pageSize===" + pageSize);
		this.pager = new Page("pagerForm", request);
		String json = this.acquisitionUnitManagerService.getAcquisitionUnitList(map,pager);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/doModbusProtocolAdd")
	public String doModbusProtocolAdd() throws IOException {
		String result = "";
		StringManagerUtils stringManagerUtils=new StringManagerUtils();
		Gson gson = new Gson();
		String fileName="ModbusProtocolConfig.json";
		String path=stringManagerUtils.getFilePath(fileName,"protocolConfig/");
		PrintWriter out = response.getWriter();
		try {
			String name = ParamUtils.getParameter(request, "modbusProtocol.name");
			String deviceType = ParamUtils.getParameter(request, "modbusProtocol.deviceType");
			String sort = ParamUtils.getParameter(request, "modbusProtocol.sort");
			
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			boolean isAdd=true;
			if(modbusProtocolConfig!=null){
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(name.equals(modbusProtocolConfig.getProtocol().get(i).getName())){
						modbusProtocolConfig.getProtocol().get(i).setSort(StringManagerUtils.stringToInteger(sort));
						modbusProtocolConfig.getProtocol().get(i).setDeviceType(StringManagerUtils.stringToInteger(deviceType));
						isAdd=false;
						break;
					}
				}
			}
			if(isAdd){
				ModbusProtocolConfig.Protocol protocol=new ModbusProtocolConfig.Protocol();
				String protocolCode=name;
				protocol.setName(name);
				protocol.setCode(protocolCode);
				protocol.setDeviceType(StringManagerUtils.stringToInteger(deviceType));
				protocol.setSort(StringManagerUtils.stringToInteger(sort));
				protocol.setItems(new ArrayList<ModbusProtocolConfig.Items>());
				modbusProtocolConfig.getProtocol().add(protocol);
			}
			StringManagerUtils.writeFile(path,StringManagerUtils.jsonStringFormat(gson.toJson(modbusProtocolConfig)));
//			equipmentDriveMap.put("modbusProtocolConfig", modbusProtocolConfig);
//			EquipmentDriverServerTask.initProtocolConfig(name,"update");
//			this.acquisitionGroupManagerService.doAcquisitionGroupAdd(acquisitionGroup);
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
			out.print(result);
		}
		return null;
	}
	
	@RequestMapping("/doAcquisitionGroupAdd")
	public String doAcquisitionGroupAdd(@ModelAttribute AcquisitionGroup acquisitionGroup) throws IOException {
		String result = "";
		String acqUnit = ParamUtils.getParameter(request, "acquisitionGroup.acqUnit");
		PrintWriter out = response.getWriter();
		try {
			this.acquisitionGroupManagerService.doAcquisitionGroupAdd(acquisitionGroup);
			String sql="select t.id from TBL_ACQ_GROUP_CONF t where t.group_name='"+acquisitionGroup.getGroupName()+"' and t.protocol='"+acquisitionGroup.getProtocol()+"'";
			String groupId="";
			List list = this.service.findCallSql(sql);
			if(list.size()>0){
				groupId=list.get(0).toString();
				AcquisitionUnitGroup acquisitionUnitGroup = new AcquisitionUnitGroup();
				acquisitionUnitGroup.setUnitId(Integer.parseInt(acqUnit));
				acquisitionUnitGroup.setGroupId(StringManagerUtils.stringTransferInteger(groupId));
				acquisitionUnitGroup.setMatrix("0,0,0");
				this.acquisitionUnitItemManagerService.grantAcquisitionGroupsPermission(acquisitionUnitGroup);
			}
			if(StringManagerUtils.isNotNull(groupId)){
				EquipmentDriverServerTask.initInstanceConfigByAcqGroupId(groupId, "update");
			}
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
			out.print(result);
		}
		return null;
	}
	
	@RequestMapping("/doAcquisitionGroupEdit")
	public String doAcquisitionGroupEdit(@ModelAttribute AcquisitionGroup acquisitionGroup) {
		String result ="{success:true,msg:false}";
		try {
			this.acquisitionUnitManagerService.doAcquisitionGroupEdit(acquisitionGroup);
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			response.setHeader("Cache-Control", "no-cache");
			PrintWriter pw = response.getWriter();
			result= "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			response.getWriter().print(result);
			pw.flush();
			pw.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("/doAcquisitionGroupBulkDelete")
	public String doAcquisitionGroupBulkDelete() {
		try {
			String ids = ParamUtils.getParameter(request, "paramsId");
			this.acquisitionUnitManagerService.doAcquisitionGroupBulkDelete(ids);
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			String result = "{success:true,flag:true}";
			response.getWriter().print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("/doAcquisitionUnitAdd")
	public String doAcquisitionUnitAdd(@ModelAttribute AcquisitionUnit acquisitionUnit) throws IOException {
		String result = "";
		PrintWriter out = response.getWriter();
		try {
			this.acquisitionUnitManagerService.doAcquisitionUnitAdd(acquisitionUnit);
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
			out.print(result);
		}
		return null;
	}
	
	@RequestMapping("/doAcquisitionUnitEdit")
	public String doAcquisitionUnitEdit(@ModelAttribute AcquisitionUnit acquisitionUnit) {
		String result ="{success:true,msg:false}";
		try {
			this.acquisitionUnitManagerService.doAcquisitionUnitEdit(acquisitionUnit);
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			response.setHeader("Cache-Control", "no-cache");
			PrintWriter pw = response.getWriter();
			result= "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			response.getWriter().print(result);
			pw.flush();
			pw.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("/doAcquisitionUnitBulkDelete")
	public String doAcquisitionUnitBulkDelete() {
		try {
			String ids = ParamUtils.getParameter(request, "paramsId");
			this.acquisitionUnitManagerService.doAcquisitionUnitBulkDelete(ids);
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			String result = "{success:true,flag:true}";
			response.getWriter().print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**<p>描述：采集组数据显示方法</p>
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/doAcquisitionGroupShow")
	public String doAcquisitionGroupShow() throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();
		groupName = ParamUtils.getParameter(request, "groupName");
		String protocolName=ParamUtils.getParameter(request, "protocolName");
		int intPage = Integer.parseInt((page == null || page == "0") ? "1": page);
		int pageSize = Integer.parseInt((limit == null || limit == "0") ? "10": limit);
		int offset = (intPage - 1) * pageSize;
		map.put(PagingConstants.PAGE_NO, intPage);
		map.put(PagingConstants.PAGE_SIZE, pageSize);
		map.put(PagingConstants.OFFSET, offset);
		map.put("groupName", groupName);
		map.put("protocolName", protocolName);
		log.debug("intPage==" + intPage + " pageSize===" + pageSize);
		this.pager = new Page("pagerForm", request);
		String json = this.acquisitionUnitManagerService.doAcquisitionGroupShow(map,pager);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	/**
	 * @return Null
	 * @throws IOException
	 * @author 显示当前采集组拥有的采集项信息
	 * 
	 */
	@RequestMapping("/showAcquisitionGroupOwnItems")
	public String showAcquisitionGroupOwnItems() throws IOException {
		String groupCode = ParamUtils.getParameter(request, "groupCode");
		Gson g = new Gson();
		List<AcquisitionGroupItem> list = acquisitionUnitItemManagerService.showAcquisitionGroupOwnItems(AcquisitionGroupItem.class, groupCode);
		String json = "";
		json = g.toJson(list);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		log.debug("doShowRightCurrentUsersOwnRoles ***json==****" + json);
		pw.flush();
		pw.close();
		return null;
	}
	
	/**
	 * @return Null
	 * @throws IOException
	 * @author 显示当前采集单元拥有的采集组信息
	 * 
	 */
	@RequestMapping("/showAcquisitionUnitOwnGroups")
	public String showAcquisitionUnitOwnGroups() throws IOException {
		String unitId = ParamUtils.getParameter(request, "unitId");
		Gson g = new Gson();
		List<AcquisitionGroupItem> list = acquisitionUnitItemManagerService.showAcquisitionUnitOwnGroups(AcquisitionUnitGroup.class, unitId);
		String json = "";
		json = g.toJson(list);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		log.debug("doShowRightCurrentUsersOwnRoles ***json==****" + json);
		pw.flush();
		pw.close();
		return null;
	}
	
	/**
	 * @return NUll
	 * @throws IOException
	 *             为当前采集组安排采集项
	 */
	@RequestMapping("/grantAcquisitionItemsPermission")
	public String grantAcquisitionItemsPermission() throws IOException {
		String result = "";
		PrintWriter out = response.getWriter();
		AcquisitionGroupItem acquisitionGroupItem = null;
		try {
			String params = ParamUtils.getParameter(request, "params");
			String matrixCodes = ParamUtils.getParameter(request, "matrixCodes");
			String groupCode = ParamUtils.getParameter(request, "groupCode");
			log.debug("grantAcquisitionItemsPermission params==" + params);
			String paramsArr[] = StringManagerUtils.split(params, ",");
			String groupId="";
			String groupIdSql="select t.id from tbl_acq_group_conf t where t.group_code='"+groupCode+"' ";
			List list = this.service.findCallSql(groupIdSql);
			if(list.size()>0){
				groupId=list.get(0).toString();
			}
			if (paramsArr.length > 0 && StringManagerUtils.isNotNull(groupId)) {
				this.acquisitionUnitItemManagerService.deleteCurrentAcquisitionGroupOwnItems(groupId);
				if (matrixCodes != "" || matrixCodes != null) {
					String module_matrix[] = matrixCodes.split("\\|");
					for (int i = 0; i < module_matrix.length; i++) {
						String module_[] = module_matrix[i].split("\\:");
						acquisitionGroupItem = new AcquisitionGroupItem();
						acquisitionGroupItem.setGroupId(Integer.parseInt(groupId));
						log.debug("groupCode==" + groupCode);
						acquisitionGroupItem.setItemName(module_[0]);
						acquisitionGroupItem.setMatrix(module_[1]);
						this.acquisitionUnitItemManagerService.grantAcquisitionItemsPermission(acquisitionGroupItem);
					}
				}
				EquipmentDriverServerTask.initInstanceConfigByAcqGroupId(groupId+"","update");
			}
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
			out.print(result);
		}
		return null;
	}
	
	/**
	 * @return NUll
	 * @throws IOException
	 *             为当前采集单元安排采集组
	 */
	@RequestMapping("/grantAcquisitionGroupsPermission")
	public String grantAcquisitionGroupsPermission() throws IOException {
		String result = "";
		PrintWriter out = response.getWriter();
		AcquisitionUnitGroup acquisitionUnitGroup = null;
		try {
			String paramsIds = ParamUtils.getParameter(request, "paramsId");
			String matrixCodes = ParamUtils.getParameter(request, "matrixCodes");
			String unitId = ParamUtils.getParameter(request, "unitId");
			log.debug("grantAcquisitionGroupsPermission paramsIds==" + paramsIds);
			String groupIds[] = StringManagerUtils.split(paramsIds, ",");
			if (groupIds.length > 0 && unitId != null) {
				this.acquisitionUnitItemManagerService.deleteCurrentAcquisitionUnitOwnGroups(unitId);
				if (matrixCodes != "" || matrixCodes != null) {
					String module_matrix[] = matrixCodes.split("\\|");
					for (int i = 0; i < module_matrix.length; i++) {
						String module_[] = module_matrix[i].split("\\:");
						acquisitionUnitGroup = new AcquisitionUnitGroup();
						acquisitionUnitGroup.setUnitId(Integer.parseInt(unitId));
						log.debug("unitId==" + unitId);
						acquisitionUnitGroup.setGroupId(StringManagerUtils.stringTransferInteger(module_[0]));
						acquisitionUnitGroup.setMatrix(module_[1]);
						this.acquisitionUnitItemManagerService.grantAcquisitionGroupsPermission(acquisitionUnitGroup);
					}
				}
				EquipmentDriverServerTask.initInstanceConfigByAcqUnitId(unitId,"update");
			}
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
			out.print(result);
		}
		return null;
	}
	
	@RequestMapping("/getProtocolItemsConfigData")
	public String getProtocolItemsConfigData() throws Exception {
		String protocolName = ParamUtils.getParameter(request, "protocolName");
		String classes = ParamUtils.getParameter(request, "classes");
		String code = ParamUtils.getParameter(request, "code");
		String json = "";
		json = acquisitionUnitItemManagerService.getProtocolItemsConfigData(protocolName,classes,code);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getModbusProtocolAlarmItemsConfigData")
	public String getModbusProtocolAlarmItemsConfigData() throws Exception {
		String protocolName = ParamUtils.getParameter(request, "protocolName");
		String classes = ParamUtils.getParameter(request, "classes");
		String code = ParamUtils.getParameter(request, "code");
		String json = "";
		json = acquisitionUnitItemManagerService.getModbusProtocolAlarmItemsConfigData(protocolName,classes,code);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getProtocolInstanceItemsConfigData")
	public String getProtocolInstanceItemsConfigData() throws Exception {
		String instanceName = ParamUtils.getParameter(request, "instanceName");
		String classes = ParamUtils.getParameter(request, "classes");
		String code = ParamUtils.getParameter(request, "code");
		String json = "";
		json = acquisitionUnitItemManagerService.getProtocolInstanceItemsConfigData(instanceName);
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/modbusConfigTreeData")
	public String modbusConfigTreeData() throws IOException {
		String json = acquisitionUnitItemManagerService.getModbusProtocolConfigTreeData();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/modbusProtocolAddrMappingTreeData")
	public String modbusProtocolAddrMappingTreeData() throws IOException {
		String json = acquisitionUnitItemManagerService.modbusProtocolAddrMappingTreeData();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/modbusProtocolAndAcqUnitTreeData")
	public String modbusProtocolAndAcqUnitTreeData() throws IOException {
		String deviceType=ParamUtils.getParameter(request, "deviceType");
		String json = acquisitionUnitItemManagerService.modbusProtocolAndAcqUnitTreeData(deviceType);
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/modbusProtocolAlarmGroupTreeData")
	public String modbusProtocolAlarmGroupTreeData() throws IOException {
		String json = acquisitionUnitItemManagerService.modbusProtocolAlarmGroupTreeData();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	
	
	
	@RequestMapping("/modbusInstanceConfigTreeData")
	public String modbusInstanceConfigTreeData() throws IOException {
		String json = acquisitionUnitItemManagerService.getModbusProtocolInstanceConfigTreeData();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getModbusProtoclCombList")
	public String getModbusProtoclCombList() throws IOException {
		String json=acquisitionUnitItemManagerService.getModbusProtoclCombList();
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/getAcquisitionUnitCombList")
	public String getAcquisitionUnitCombList() throws IOException {
		String protocol = ParamUtils.getParameter(request, "protocol");
		String json=acquisitionUnitItemManagerService.getAcquisitionUnitCombList(protocol);
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/saveModbusProtocolAddrMappingConfigData")
	public String SaveModbusProtocolAddrMappingConfigData() throws Exception {
		String json = "";
		Gson gson = new Gson();
		StringManagerUtils stringManagerUtils=new StringManagerUtils();
		String fileName="ModbusProtocolConfig.json";
		String data = ParamUtils.getParameter(request, "data");
		java.lang.reflect.Type type = new TypeToken<ModbusDriverSaveData>() {}.getType();
		ModbusDriverSaveData modbusDriverSaveData=gson.fromJson(data, type);
		if(modbusDriverSaveData!=null){
			modbusDriverSaveData.dataFiltering();
			String path=stringManagerUtils.getFilePath(fileName,"protocolConfig/");
			
			Map<String, Object> equipmentDriveMap = EquipmentDriveMap.getMapObject();
			if(equipmentDriveMap.size()==0){
				EquipmentDriverServerTask.loadProtocolConfig();
				equipmentDriveMap = EquipmentDriveMap.getMapObject();
			}
			ModbusProtocolConfig modbusProtocolConfig=(ModbusProtocolConfig) equipmentDriveMap.get("modbusProtocolConfig");
			boolean isAdd=true;
			
			for(int i=0;modbusDriverSaveData.getDelidslist()!=null&&i<modbusDriverSaveData.getDelidslist().size();i++){
				for(int j=0;j<modbusProtocolConfig.getProtocol().size();j++){
					if(modbusDriverSaveData.getDelidslist().get(i).equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(j).getName())){
						EquipmentDriverServerTask.initProtocolConfig(modbusProtocolConfig.getProtocol().get(j).getName(),"delete");
						modbusProtocolConfig.getProtocol().remove(j);
						break;
					}
				}
			}
			
			if(StringManagerUtils.isNotNull(modbusDriverSaveData.getProtocolName())){
				for(int i=0;i<modbusProtocolConfig.getProtocol().size();i++){
					if(modbusDriverSaveData.getProtocolCode().equalsIgnoreCase(modbusProtocolConfig.getProtocol().get(i).getCode())){
						isAdd=false;
						String oldName=modbusProtocolConfig.getProtocol().get(i).getName();
						String oldCode=modbusProtocolConfig.getProtocol().get(i).getCode();
//						modbusDriverSaveData.setProtocolCode(modbusProtocolConfig.getProtocol().get(i).getCode());
						
						modbusProtocolConfig.getProtocol().get(i).setName(modbusDriverSaveData.getProtocolName());
						modbusProtocolConfig.getProtocol().get(i).setCode(modbusDriverSaveData.getProtocolCode());
						modbusProtocolConfig.getProtocol().get(i).setDeviceType(modbusDriverSaveData.getDeviceType());
						modbusProtocolConfig.getProtocol().get(i).setSort(modbusDriverSaveData.getSort());
						for(int j=0;j<modbusDriverSaveData.getDataConfig().size();j++){
							boolean isAddItem=true;
							String acqMode="passive";
							if("主动上传".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(j).getAcqMode())){
								acqMode="active";
							}else if("被动响应".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(j).getAcqMode())){
								acqMode="passive";
							}
							String RWType="r";
							if("读写".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(j).getRWType())){
								RWType="rw";
							}else if("只读".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(j).getRWType())){
								RWType="r";
							}
							for(int k=0;k<modbusProtocolConfig.getProtocol().get(i).getItems().size();k++){
								if(modbusProtocolConfig.getProtocol().get(i).getItems().get(k).getTitle().equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(j).getTitle())){
									isAddItem=false;
//									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setTitle(modbusDriverSaveData.getDataConfig().get(j).getTitle());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setAddr(modbusDriverSaveData.getDataConfig().get(j).getAddr());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setQuantity(modbusDriverSaveData.getDataConfig().get(j).getQuantity());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setUnit(modbusDriverSaveData.getDataConfig().get(j).getUnit());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setRatio(modbusDriverSaveData.getDataConfig().get(j).getRatio());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setStoreDataType(modbusDriverSaveData.getDataConfig().get(j).getStoreDataType());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setIFDataType(modbusDriverSaveData.getDataConfig().get(j).getIFDataType());
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setRWType(RWType);
									modbusProtocolConfig.getProtocol().get(i).getItems().get(k).setAcqMode(acqMode);
									break;
								}
							}
							if(isAddItem){
								ModbusProtocolConfig.Items item=new ModbusProtocolConfig.Items();
//								item.setName(modbusDriverSaveData.getDataConfig().get(j).getName());
								item.setTitle(modbusDriverSaveData.getDataConfig().get(j).getTitle());
								item.setAddr(modbusDriverSaveData.getDataConfig().get(j).getAddr());
								item.setQuantity(modbusDriverSaveData.getDataConfig().get(j).getQuantity());
								item.setUnit(modbusDriverSaveData.getDataConfig().get(j).getUnit());
								item.setRatio(modbusDriverSaveData.getDataConfig().get(j).getRatio());
								item.setStoreDataType(modbusDriverSaveData.getDataConfig().get(j).getStoreDataType());
								item.setIFDataType(modbusDriverSaveData.getDataConfig().get(j).getIFDataType());
								item.setRWType(RWType);
								item.setAcqMode(acqMode);
								modbusProtocolConfig.getProtocol().get(i).getItems().add(item);
							}
						}
						
						//处理删除项
						for(int j=0;j<modbusProtocolConfig.getProtocol().get(i).getItems().size();j++){
							boolean isDel=true;
							for(int k=0;k<modbusDriverSaveData.getDataConfig().size();k++){
								if(modbusProtocolConfig.getProtocol().get(i).getItems().get(j).getTitle().equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(k).getTitle())){
									isDel=false;
									break;
								}
							}
							if(isDel){
								modbusProtocolConfig.getProtocol().get(i).getItems().remove(j);
							}
						}
						//如果协议名称改变，更新数据库
						if(!oldName.equals(modbusDriverSaveData.getProtocolName())){
							EquipmentDriverServerTask.initProtocolConfig(oldName,"delete");
							String sql="update tbl_acq_unit_conf t set t.protocol='"+modbusDriverSaveData.getProtocolName()+"' where t.protocol='"+oldName+"'";
							String groupSql="update tbl_acq_group_conf t set t.protocol='"+modbusDriverSaveData.getProtocolName()+"' where t.protocol='"+oldName+"'";
							service.updateSql(sql);
							service.updateSql(groupSql);
						}
						break;
					}
				}
				if(isAdd){
					ModbusProtocolConfig.Protocol protocol=new ModbusProtocolConfig.Protocol();
					String protocolCode=modbusDriverSaveData.getProtocolName();
					protocol.setName(modbusDriverSaveData.getProtocolName());
					protocol.setCode(protocolCode);
					modbusDriverSaveData.setProtocolCode(protocolCode);
					protocol.setSort(modbusDriverSaveData.getSort());
					protocol.setDeviceType(modbusDriverSaveData.getDeviceType());
					protocol.setItems(new ArrayList<ModbusProtocolConfig.Items>());
					for(int i=0;i<modbusDriverSaveData.getDataConfig().size();i++){
						String acqMode="passive";
						if("主动上传".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(i).getAcqMode())){
							acqMode="active";
						}else if("被动响应".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(i).getAcqMode())){
							acqMode="passive";
						}
						
						String RWType="r";
						if("读写".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(i).getRWType())){
							RWType="rw";
						}else if("只读".equalsIgnoreCase(modbusDriverSaveData.getDataConfig().get(i).getRWType())){
							RWType="r";
						}
						
						ModbusProtocolConfig.Items item=new ModbusProtocolConfig.Items();
						item.setTitle(modbusDriverSaveData.getDataConfig().get(i).getTitle());
						item.setAddr(modbusDriverSaveData.getDataConfig().get(i).getAddr());
						item.setQuantity(modbusDriverSaveData.getDataConfig().get(i).getQuantity());
						item.setUnit(modbusDriverSaveData.getDataConfig().get(i).getUnit());
						item.setRatio(modbusDriverSaveData.getDataConfig().get(i).getRatio());
						item.setStoreDataType(modbusDriverSaveData.getDataConfig().get(i).getStoreDataType());
						item.setIFDataType(modbusDriverSaveData.getDataConfig().get(i).getIFDataType());
						item.setRWType(RWType);
						item.setAcqMode(acqMode);
						protocol.getItems().add(item);
					}
					modbusProtocolConfig.getProtocol().add(protocol);
				}
			}
			StringManagerUtils.writeFile(path,StringManagerUtils.jsonStringFormat(gson.toJson(modbusProtocolConfig)));
			equipmentDriveMap.put("modbusProtocolConfig", modbusProtocolConfig);
			if(StringManagerUtils.isNotNull(modbusDriverSaveData.getProtocolName())){
				EquipmentDriverServerTask.initProtocolConfig(modbusDriverSaveData.getProtocolName(),"update");
			}
		}
		json ="{success:true}";
		response.setContentType("application/json;charset="+Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/saveAcquisitionUnitHandsontableData")
	public String saveAcquisitionUnitHandsontableData() throws Exception {
		String data = ParamUtils.getParameter(request, "data").replaceAll("&nbsp;", "").replaceAll(" ", "").replaceAll("null", "");
		String protocol = ParamUtils.getParameter(request, "protocol");
		Gson gson = new Gson();
		java.lang.reflect.Type type = new TypeToken<AcquisitionUnitHandsontableChangeData>() {}.getType();
		AcquisitionUnitHandsontableChangeData acquisitionUnitHandsontableChangeData=gson.fromJson(data, type);
		if(acquisitionUnitHandsontableChangeData!=null){
			if(acquisitionUnitHandsontableChangeData.getDelidslist()!=null){
				for(int i=0;i<acquisitionUnitHandsontableChangeData.getDelidslist().size();i++){
					this.acquisitionUnitManagerService.doAcquisitionUnitBulkDelete(acquisitionUnitHandsontableChangeData.getDelidslist().get(i));
					EquipmentDriverServerTask.initInstanceConfigByAcqUnitId(acquisitionUnitHandsontableChangeData.getDelidslist().get(i), "delete");
				}
			}
			if(acquisitionUnitHandsontableChangeData.getUpdatelist()!=null){
				for(int i=0;i<acquisitionUnitHandsontableChangeData.getUpdatelist().size();i++){
					AcquisitionUnit acquisitionUnit=new AcquisitionUnit();
					acquisitionUnit.setId(StringManagerUtils.stringToInteger(acquisitionUnitHandsontableChangeData.getUpdatelist().get(i).getId()));
					acquisitionUnit.setUnitCode(acquisitionUnitHandsontableChangeData.getUpdatelist().get(i).getUnitCode());
					acquisitionUnit.setUnitName(acquisitionUnitHandsontableChangeData.getUpdatelist().get(i).getUnitName());
					acquisitionUnit.setRemark(acquisitionUnitHandsontableChangeData.getUpdatelist().get(i).getRemark());
					acquisitionUnit.setProtocol(protocol);
					this.acquisitionUnitManagerService.doAcquisitionUnitEdit(acquisitionUnit);
				}
			}
			
			if(acquisitionUnitHandsontableChangeData.getInsertlist()!=null){
				for(int i=0;i<acquisitionUnitHandsontableChangeData.getInsertlist().size();i++){
					AcquisitionUnit acquisitionUnit=new AcquisitionUnit();
					acquisitionUnit.setId(StringManagerUtils.stringToInteger(acquisitionUnitHandsontableChangeData.getInsertlist().get(i).getId()));
					acquisitionUnit.setUnitCode(acquisitionUnitHandsontableChangeData.getInsertlist().get(i).getUnitCode());
					acquisitionUnit.setUnitName(acquisitionUnitHandsontableChangeData.getInsertlist().get(i).getUnitName());
					acquisitionUnit.setRemark(acquisitionUnitHandsontableChangeData.getInsertlist().get(i).getRemark());
					acquisitionUnit.setProtocol(protocol);
					this.acquisitionUnitManagerService.doAcquisitionUnitAdd(acquisitionUnit);
				}
			}
			
		}
		String json ="{success:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		log.warn("jh json is ==" + json);
		pw.flush();
		pw.close();
//		EquipmentDriverServerTask beeTechDriverServerTast=EquipmentDriverServerTask.getInstance();
//		beeTechDriverServerTast.updateWellConfif(wellHandsontableChangedData);
		return null;
	}
	
	@SuppressWarnings("static-access")
	@RequestMapping("/saveAcquisitionGroupHandsontableData")
	public String saveAcquisitionGroupHandsontableData() throws Exception {
		HttpSession session=request.getSession();
		String data = ParamUtils.getParameter(request, "data").replaceAll("&nbsp;", "").replaceAll(" ", "").replaceAll("null", "");
		String protocol = ParamUtils.getParameter(request, "protocol");
		String unitId = ParamUtils.getParameter(request, "unitId");
		Gson gson = new Gson();
		java.lang.reflect.Type type = new TypeToken<AcquisitionGroupHandsontableChangeData>() {}.getType();
		AcquisitionGroupHandsontableChangeData acquisitionGroupHandsontableChangeData=gson.fromJson(data, type);
		if(acquisitionGroupHandsontableChangeData!=null){
			if(acquisitionGroupHandsontableChangeData.getDelidslist()!=null){
				for(int i=0;i<acquisitionGroupHandsontableChangeData.getDelidslist().size();i++){
					this.acquisitionUnitManagerService.doAcquisitionGroupBulkDelete(acquisitionGroupHandsontableChangeData.getDelidslist().get(i));
					EquipmentDriverServerTask.initInstanceConfigByAcqGroupId(acquisitionGroupHandsontableChangeData.getDelidslist().get(i), "update");
				}
			}
			if(acquisitionGroupHandsontableChangeData.getUpdatelist()!=null){
				for(int i=0;i<acquisitionGroupHandsontableChangeData.getUpdatelist().size();i++){
					AcquisitionGroup acquisitionGroup=new AcquisitionGroup();
					acquisitionGroup.setId(StringManagerUtils.stringToInteger(acquisitionGroupHandsontableChangeData.getUpdatelist().get(i).getId()));
					acquisitionGroup.setGroupCode(acquisitionGroupHandsontableChangeData.getUpdatelist().get(i).getGroupCode());
					acquisitionGroup.setGroupName(acquisitionGroupHandsontableChangeData.getUpdatelist().get(i).getGroupName());
					acquisitionGroup.setAcqCycle(StringManagerUtils.stringToInteger(acquisitionGroupHandsontableChangeData.getUpdatelist().get(i).getAcqCycle()));
					acquisitionGroup.setSaveCycle(StringManagerUtils.stringToInteger(acquisitionGroupHandsontableChangeData.getUpdatelist().get(i).getSaveCycle()));
					acquisitionGroup.setRemark(acquisitionGroupHandsontableChangeData.getUpdatelist().get(i).getRemark());
					acquisitionGroup.setProtocol(protocol);
					this.acquisitionUnitManagerService.doAcquisitionGroupEdit(acquisitionGroup);
					EquipmentDriverServerTask.initInstanceConfigByAcqGroupId(acquisitionGroup.getId()+"", "update");
				}
			}
			
			if(acquisitionGroupHandsontableChangeData.getInsertlist()!=null){
				for(int i=0;i<acquisitionGroupHandsontableChangeData.getInsertlist().size();i++){
					AcquisitionGroup acquisitionGroup=new AcquisitionGroup();
					acquisitionGroup.setId(StringManagerUtils.stringToInteger(acquisitionGroupHandsontableChangeData.getInsertlist().get(i).getId()));
					acquisitionGroup.setGroupCode(acquisitionGroupHandsontableChangeData.getInsertlist().get(i).getGroupCode());
					acquisitionGroup.setGroupName(acquisitionGroupHandsontableChangeData.getInsertlist().get(i).getGroupName());
					acquisitionGroup.setAcqCycle(StringManagerUtils.stringToInteger(acquisitionGroupHandsontableChangeData.getInsertlist().get(i).getAcqCycle()));
					acquisitionGroup.setSaveCycle(StringManagerUtils.stringToInteger(acquisitionGroupHandsontableChangeData.getInsertlist().get(i).getSaveCycle()));
					acquisitionGroup.setRemark(acquisitionGroupHandsontableChangeData.getInsertlist().get(i).getRemark());
					acquisitionGroup.setProtocol(protocol);
					this.acquisitionUnitManagerService.doAcquisitionGroupAdd(acquisitionGroup);
				}
			}
			
		}
		String json ="{success:true}";
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		log.warn("jh json is ==" + json);
		pw.flush();
		pw.close();
//		EquipmentDriverServerTask beeTechDriverServerTast=EquipmentDriverServerTask.getInstance();
//		beeTechDriverServerTast.updateWellConfif(wellHandsontableChangedData);
		return null;
	}
	
	@RequestMapping("/doModbusProtocolInstanceAdd")
	public String doModbusProtocolInstanceAdd(@ModelAttribute ProtocolInstance protocolInstance) throws IOException {
		String result = "";
		try {
			this.protocolInstanceManagerService.doModbusProtocolInstanceAdd(protocolInstance);
			List<String> instanceList=new ArrayList<String>();
			instanceList.add(protocolInstance.getName());
			EquipmentDriverServerTask.initInstanceConfig(instanceList, "update");
			result = "{success:true,msg:true}";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
		}
		response.setContentType("application/json;charset="+ Constants.ENCODING_UTF8);
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(result);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/doAlarmGroupAdd")
	public String doAlarmGroupAdd(@ModelAttribute AlarmGroup alarmGroup) throws IOException {
		String result = "";
		PrintWriter out = response.getWriter();
		try {
			this.alarmGroupManagerService.doAlarmGroupAdd(alarmGroup);
			result = "{success:true,msg:true}";
			response.setCharacterEncoding(Constants.ENCODING_UTF8);
			out.print(result);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = "{success:false,msg:false}";
			out.print(result);
		}
		return null;
	}
	
	@RequestMapping("/saveModbusProtocolAlarmGroupData")
	public String saveModbusProtocolAlarmGroupData() throws Exception {
		Gson gson=new Gson();
		String json ="{success:true}";
		String data = ParamUtils.getParameter(request, "data");
		java.lang.reflect.Type type = new TypeToken<ModbusProtocolAlarmGroupSaveData>() {}.getType();
		ModbusProtocolAlarmGroupSaveData modbusProtocolAlarmGroupSaveData=gson.fromJson(data, type);
		
		if(modbusProtocolAlarmGroupSaveData!=null){
			if(modbusProtocolAlarmGroupSaveData.getDelidslist()!=null){
				for(int i=0;i<modbusProtocolAlarmGroupSaveData.getDelidslist().size();i++){
					this.acquisitionUnitManagerService.doModbusProtocolAlarmGroupDelete(modbusProtocolAlarmGroupSaveData.getDelidslist().get(i));
				}
			}
			
			if(StringManagerUtils.isNotNull(modbusProtocolAlarmGroupSaveData.getGroupName())){
				AlarmGroup alarmGroup=new AlarmGroup();
				alarmGroup.setId(modbusProtocolAlarmGroupSaveData.getId());
				alarmGroup.setGroupCode(modbusProtocolAlarmGroupSaveData.getGroupCode());
				alarmGroup.setGroupName(modbusProtocolAlarmGroupSaveData.getGroupName());
				alarmGroup.setProtocol(modbusProtocolAlarmGroupSaveData.getProtocol());
				alarmGroup.setRemark(modbusProtocolAlarmGroupSaveData.getRemark());
				try {
					this.alarmGroupManagerService.doAlarmGroupEdit(alarmGroup);
					
					this.alarmGroupManagerService.deleteCurrentAlarmGroupOwnItems(modbusProtocolAlarmGroupSaveData.getId()+"");
					if(modbusProtocolAlarmGroupSaveData.getAlarmItems()!=null){
						for(int i=0;i<modbusProtocolAlarmGroupSaveData.getAlarmItems().size();i++){
							AlarmGroupItem alarmGroupItem=new AlarmGroupItem();
							alarmGroupItem.setItemName(modbusProtocolAlarmGroupSaveData.getAlarmItems().get(i).getItemName());
							alarmGroupItem.setItemAddr(modbusProtocolAlarmGroupSaveData.getAlarmItems().get(i).getItemAddr());
							alarmGroupItem.setUpperLimit(StringManagerUtils.stringToFloat(modbusProtocolAlarmGroupSaveData.getAlarmItems().get(i).getUpperLimit()));
							alarmGroupItem.setLowerLimit(StringManagerUtils.stringToFloat(modbusProtocolAlarmGroupSaveData.getAlarmItems().get(i).getLowerLimit()));
							alarmGroupItem.setHystersis(StringManagerUtils.stringToFloat(modbusProtocolAlarmGroupSaveData.getAlarmItems().get(i).getHystersis()));
							alarmGroupItem.setDelay(StringManagerUtils.stringToInteger(modbusProtocolAlarmGroupSaveData.getAlarmItems().get(i).getDelay()));
							alarmGroupItem.setAlarmLevel(alarmLevel);
							alarmGroupItem.setAlarmSign(alarmSign);
							this.alarmGroupItemManagerService.grantAlarmItemsPermission(alarmGroupItem);
						}
					}
					
					json = "{success:true,msg:true}";
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					json = "{success:false,msg:false}";
				}
			}
		}
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		log.warn("jh json is ==" + json);
		pw.flush();
		pw.close();
		return null;
	}
	
	@RequestMapping("/saveProtocolInstanceData")
	public String saveProtocolInstanceData() throws Exception {
		Gson gson=new Gson();
		String json ="{success:true}";
		String data = ParamUtils.getParameter(request, "data");
		java.lang.reflect.Type type = new TypeToken<ModbusProtocolInstanceSaveData>() {}.getType();
		ModbusProtocolInstanceSaveData modbusProtocolInstanceSaveData=gson.fromJson(data, type);
		
		if(modbusProtocolInstanceSaveData!=null){
			if(modbusProtocolInstanceSaveData.getDelidslist()!=null){
				for(int i=0;i<modbusProtocolInstanceSaveData.getDelidslist().size();i++){
					this.acquisitionUnitManagerService.doModbusProtocolInstanceBulkDelete(modbusProtocolInstanceSaveData.getDelidslist().get(i));
					EquipmentDriverServerTask.initDriverAcquisitionInfoConfigByProtocolInstanceId(modbusProtocolInstanceSaveData.getDelidslist().get(i), "delete");
				}
			}
			
			if(StringManagerUtils.isNotNull(modbusProtocolInstanceSaveData.getName())){
				ProtocolInstance protocolInstance=new ProtocolInstance();
				protocolInstance.setId(modbusProtocolInstanceSaveData.getId());
				protocolInstance.setCode(modbusProtocolInstanceSaveData.getCode());
				protocolInstance.setName(modbusProtocolInstanceSaveData.getName());
				protocolInstance.setDeviceType(modbusProtocolInstanceSaveData.getDeviceType());
				protocolInstance.setUnitId(modbusProtocolInstanceSaveData.getUnitId());
				protocolInstance.setAcqProtocolType(modbusProtocolInstanceSaveData.getAcqProtocolType());
				protocolInstance.setCtrlProtocolType(modbusProtocolInstanceSaveData.getCtrlProtocolType());
				protocolInstance.setSignInPrefix(modbusProtocolInstanceSaveData.getSignInPrefix());
				protocolInstance.setSignInSuffix(modbusProtocolInstanceSaveData.getSignInSuffix());
				protocolInstance.setHeartbeatPrefix(modbusProtocolInstanceSaveData.getHeartbeatPrefix());
				protocolInstance.setHeartbeatSuffix(modbusProtocolInstanceSaveData.getHeartbeatSuffix());
				protocolInstance.setSort(modbusProtocolInstanceSaveData.getSort());
				
				try {
					this.protocolInstanceManagerService.doModbusProtocolInstanceEdit(protocolInstance);
					//实例名称是否改变
					if(modbusProtocolInstanceSaveData.getName().equals(modbusProtocolInstanceSaveData.getOldName())){
						List<String> instanceList=new ArrayList<String>();
						instanceList.add(protocolInstance.getName());
						EquipmentDriverServerTask.initInstanceConfig(instanceList, "update");
					}else{
						List<String> instanceList=new ArrayList<String>();
						instanceList.add(modbusProtocolInstanceSaveData.getOldName());
						EquipmentDriverServerTask.initInstanceConfig(instanceList, "delete");
						
						instanceList=new ArrayList<String>();
						instanceList.add(modbusProtocolInstanceSaveData.getName());
						EquipmentDriverServerTask.initInstanceConfig(instanceList, "update");
						
						EquipmentDriverServerTask.initDriverAcquisitionInfoConfigByProtocolInstanceId(modbusProtocolInstanceSaveData.getId()+"", "update");
					}
					
					
					json = "{success:true,msg:true}";
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					json = "{success:false,msg:false}";
				}
			}
		}
		response.setContentType("application/json;charset=utf-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter pw = response.getWriter();
		pw.print(json);
		log.warn("jh json is ==" + json);
		pw.flush();
		pw.close();
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

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public AcquisitionUnit getAcquisitionUnit() {
		return acquisitionUnit;
	}

	public void setAcquisitionUnit(AcquisitionUnit acquisitionUnit) {
		this.acquisitionUnit = acquisitionUnit;
	}


	public String getUnitName() {
		return unitName;
	}


	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public AcquisitionGroup getAcquisitionGroup() {
		return acquisitionGroup;
	}

	public void setAcquisitionGroup(AcquisitionGroup acquisitionGroup) {
		this.acquisitionGroup = acquisitionGroup;
	}
	
	public ProtocolInstance getProtocolInstance() {
		return protocolInstance;
	}
	
	public void setProtocolInstance(ProtocolInstance protocolInstance) {
		this.protocolInstance = protocolInstance;
	}
	public AlarmGroup getAlarmGroup() {
		return alarmGroup;
	}
	public void setAlarmGroup(AlarmGroup alarmGroup) {
		this.alarmGroup = alarmGroup;
	}
}
