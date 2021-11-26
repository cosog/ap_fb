/*==============================================================*/
/* 初始化tbl_module数据                                          */
/*==============================================================*/
insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (9999, 0, '功能导航', '功能导航', '#', 'Root', 1, null, null, 'Function', 0, '#');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (1998, 9999, '实时监控', '实时监控', 'AP.view.realTimeMonitoring.RealTimeMonitoringInfoView', 'DeviceRealTimeMonitoring', 1010010, null, null, 'Realtime', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2018, 9999, '历史查询', '历史查询', 'AP.view.historyQuery.HistoryQueryInfoView', 'DeviceHistoryQuery', 1020010, null, null, 'Curve', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2058, 9999, '故障查询', '故障查询', 'AP.view.alarmQuery.AlarmQueryInfoView', 'AlarmQuery', 1030010, null, null, 'Alarm', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2038, 9999, '日志查询', '日志查询', 'AP.view.log.LogInfoView', 'LogQuery', 1040010, null, null, 'Log', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (27, 9999, '权限管理', '权限管理', '#', 'right_Ids', 2030000, null, null, 'Right', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (24, 27, '单位管理', '单位管理', 'AP.view.org.OrgInfoView', 'org_OrgInfoTreeGridView', 2030100, null, null, 'Org', 0, 'AP.controller.org.OrgInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (28, 27, '用户管理', '用户管理', 'AP.view.user.UserPanelInfoView', 'user_UserInfoGridPanel', 2030200, null, null, 'User', 0, 'AP.controller.user.UserPanelInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (29, 27, '角色管理', '角色管理', 'AP.view.role.RoleInfoView', 'role_Ids', 2030300, null, null, 'Role', 0, 'AP.controller.role.RoleInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (31, 9999, '设备管理', '设备管理', '#', 'DataConfig', 2040000, null, null, 'DataConfig', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (34, 31, '泵设备', '泵设备', 'AP.view.well.PumpDeviceInfoPanel', 'PumpDeviceManager', 2040100, null, null, 'WellInformation', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2098, 31, '管设备', '管设备管理', 'AP.view.well.PipelineDeviceInfoPanel', 'PipelineDeviceManager', 2040200, null, null, 'Device', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2118, 31, '辅件设备', '辅件设备', 'AP.view.well.AuxiliaryDeviceInfoPanel', 'AuxiliaryDeviceManager', 2040300, null, null, 'Device', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (2078, 31, '短信设备', '短信设备管理', 'AP.view.well.SMSDeviceInfoView', 'SMSDeviceManager', 2040400, null, null, 'Optimize', 0, 'AP.controller.well.WellInfoController');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (1777, 9999, '驱动配置', '驱动配置', 'AP.view.acquisitionUnit.ProtocolConfigInfoView', 'DataSource', 2040100, null, null, 'DataSource', 0, 'AP.controller.acquisitionUnit.AcquisitionUnitInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (23, 9999, '系统配置', '系统配置', '#', 'SystemManageent', 2090000, null, null, 'System', 0, 'AP.controller.frame.MainIframeControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (26, 23, '模块配置', '模块配置', 'AP.view.module.ModuleInfoView', 'ModuleConfig', 2090100, null, null, 'Module', 0, 'AP.controller.module.ModuleInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (894, 23, '字典配置', '字典配置', 'AP.view.data.SystemdataInfoView', 'DataDictionary', 2090200, null, null, 'Dictionary', 0, 'AP.controller.data.SystemdataInfoControl');

insert into tbl_module (MD_ID, MD_PARENTID, MD_NAME, MD_SHOWNAME, MD_URL, MD_CODE, MD_SEQ, MD_LEVEL, MD_FLAG, MD_ICON, MD_TYPE, MD_CONTROL)
values (47, 23, '报警颜色', '报警颜色配置', 'AP.view.alarmSet.AlarmSetInfoView', 'AlarmSet', 2090400, null, null, 'Alarm', 0, 'AP.controller.alarmSet.AlarmSetInfoController');

/*==============================================================*/
/* 初始化tbl_role数据                                          */
/*==============================================================*/
insert into TBL_ROLE (ROLE_ID, ROLE_CODE, ROLE_NAME, ROLE_FLAG, REMARK, RECEIVESMS, RECEIVEMAIL, SHOWLEVEL)
values (1, 'systemRole', '系统管理', 1, '全部权限', 0, 0, 1);

insert into TBL_ROLE (ROLE_ID, ROLE_CODE, ROLE_NAME, ROLE_FLAG, REMARK, RECEIVESMS, RECEIVEMAIL, SHOWLEVEL)
values (2, 'adminRole', '软件管理员', 1, '数据查询、编辑、权限管理', 0, 0, 1);

insert into TBL_ROLE (ROLE_ID, ROLE_CODE, ROLE_NAME, ROLE_FLAG, REMARK, RECEIVESMS, RECEIVEMAIL, SHOWLEVEL)
values (3, 'appRole', '应用分析员', 0, '数据查询', 0, 0, 1);

/*==============================================================*/
/* 初始化tbl_module2role数据                                          */
/*==============================================================*/
insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (9999, '0,0,0', 1, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1998, '0,0,0', 2, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2018, '0,0,0', 3, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2058, '0,0,0', 4, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2038, '0,0,0', 5, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (27, '0,0,0', 6, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (24, '0,0,0', 7, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (28, '0,0,0', 8, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (29, '0,0,0', 9, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (31, '0,0,0', 10, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (34, '0,0,0', 11, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2098, '0,0,0', 12, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2078, '0,0,0', 13, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2118, '0,0,0', 14, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1777, '0,0,0', 15, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (23, '0,0,0', 16, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (26, '0,0,0', 17, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (894, '0,0,0', 18, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (47, '0,0,0', 19, 1);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (9999, '0,0,0', 20, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1998, '0,0,0', 21, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2018, '0,0,0', 22, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2058, '0,0,0', 23, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2038, '0,0,0', 24, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (27, '0,0,0', 25, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (24, '0,0,0', 26, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (28, '0,0,0', 27, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (29, '0,0,0', 28, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (31, '0,0,0', 29, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (34, '0,0,0', 30, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2098, '0,0,0', 31, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2078, '0,0,0', 32, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2118, '0,0,0', 33, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1777, '0,0,0', 34, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (23, '0,0,0', 35, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (26, '0,0,0', 36, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (894, '0,0,0', 37, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (47, '0,0,0', 38, 2);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (1998, '0,0,0', 39, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2018, '0,0,0', 40, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2058, '0,0,0', 41, 3);

insert into TBL_MODULE2ROLE (RM_MODULEID, RM_MATRIX, RM_ID, RM_ROLEID)
values (2038, '0,0,0', 42, 3);

/*==============================================================*/
/* 初始化tbl_user数据                                          */
/*==============================================================*/
insert into TBL_USER (USER_NO, USER_ID, USER_PWD, USER_NAME, USER_IN_EMAIL, USER_OUT_EMAIL, USER_PHONE, USER_MOBILE, USER_ADDRESS, USER_POSTCODE, USER_TITLE, USER_TYPE, USER_ORGID, USER_ISLEADER, USER_REGTIME, USER_STYLE, USER_QUICKLOGIN)
values (1, 'system', '91742dcf6ee79059583f6af36e37d9ff', '系统管理员', null, null, null, null, null, null, '5', 1, 0, null, to_date('15-10-2013 17:21:16', 'dd-mm-yyyy hh24:mi:ss'), null, 0);

insert into TBL_USER (USER_NO, USER_ID, USER_PWD, USER_NAME, USER_IN_EMAIL, USER_OUT_EMAIL, USER_PHONE, USER_MOBILE, USER_ADDRESS, USER_POSTCODE, USER_TITLE, USER_TYPE, USER_ORGID, USER_ISLEADER, USER_REGTIME, USER_STYLE, USER_QUICKLOGIN)
values (2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', null, null, null, null, null, null, '0', 2, 0, null, to_date('30-11-2020 17:25:43', 'dd-mm-yyyy hh24:mi:ss'), null, 0);