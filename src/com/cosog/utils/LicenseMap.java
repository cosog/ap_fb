package com.cosog.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class LicenseMap {
	private static Map<Integer, License> map;
	private static Map<Integer, List<Integer>> moduleMap;
	public static int SN=0;
	public static int modulesSN=0;
	static {
		map = new HashMap<Integer, License>();
		map.put(0, new License("阿里云服务器 Windows Server2019", "00:16:3E:01:D8:63", 0,"IP:8.130.30.138"));
		
		moduleMap=new HashMap<Integer, List<Integer>>();//全集
		List<Integer> moduleList0=new ArrayList<Integer>();
		moduleList0.add(9999);//功能导航
		moduleList0.add(1998);//实时监控
		moduleList0.add(2018);//历史查询
		moduleList0.add(2038);//日志
		moduleList0.add(27);//权限管理
		moduleList0.add(24);//单位管理
		moduleList0.add(28);//用户管理
		moduleList0.add(29);//角色管理
		moduleList0.add(31);//数据配置
		moduleList0.add(1777);//数据源
		moduleList0.add(34);//井名信息
		moduleList0.add(23);//系统配置
		moduleList0.add(26);//模块配置
		moduleList0.add(894);//字典配置
		moduleList0.add(47);//报警配置
		moduleMap.put(0, moduleList0);
		
		List<Integer> moduleList1=new ArrayList<Integer>();//自动化采集
		moduleList0.add(9999);//功能导航
		moduleList0.add(1998);//实时监控
		moduleList0.add(27);//权限管理
		moduleList0.add(24);//单位管理
		moduleList0.add(28);//用户管理
		moduleList0.add(29);//角色管理
		moduleList0.add(31);//数据配置
		moduleList0.add(1777);//数据源
		moduleList0.add(34);//井名信息
		moduleList0.add(23);//系统配置
		moduleList0.add(26);//模块配置
		moduleList0.add(894);//字典配置
		moduleList0.add(47);//报警配置
		moduleMap.put(1, moduleList1);
	}

	public static Map<Integer, License> getMapObject() {
		return map;
	}
	
	public static Map<Integer, List<Integer>> getModuleMapObject() {
		return moduleMap;
	}
	
	public static class License{
		public String Customer;
		public String Mac;
		public int Number;
		public String Remark;
		public List<Integer> modules;
		public License(String customer, String mac, int number, String remark) {
			super();
			Customer = customer;
			Mac = mac;
			Number = number;
			Remark = remark;
			modules=new ArrayList<Integer>();
			switch(modulesSN){
			case 0 :
//				modules.add(e)
				break;
		    case 1 :
		    	break;
		    default : //可选
		    	//语句
			}
		}
		public String getCustomer() {
			return Customer;
		}
		public void setCustomer(String customer) {
			Customer = customer;
		}
		public String getMac() {
			return Mac;
		}
		public void setMac(String mac) {
			Mac = mac;
		}
		public int getNumber() {
			return Number;
		}
		public void setNumber(int number) {
			Number = number;
		}
		public String getRemark() {
			return Remark;
		}
		public void setRemark(String remark) {
			Remark = remark;
		}
		public List<Integer> getModules() {
			return modules;
		}
		public void setModules(List<Integer> modules) {
			this.modules = modules;
		}
	}

}
