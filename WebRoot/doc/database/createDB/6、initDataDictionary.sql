/*==============================================================*/
/* 初始化tbl_dist_name数据                                          */
/*==============================================================*/
insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('7f13446d19b4497986980fa16a750f95', null, '泵设备实时概览', 'pumpRealTimeOverview', 11101, 0, '系统管理员', '系统管理员', to_date('01-09-2021 11:46:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:46:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('e0f5f3ff8a1f46678c284fba9cc113e8', null, '管设备实时概览', 'pipelineRealTimeOverview', 11102, 0, '系统管理员', '系统管理员', to_date('02-09-2021 15:46:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 15:46:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('cd7b24562b924d19b556de31256e22a1', 'system', '泵设备历史查询', 'pumpHistoryQuery', 12101, 0, '系统管理员', '系统管理员', to_date('03-09-2021 14:14:49', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 14:14:49', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('fb7d070a349c403b8a26d71c12af7a05', 'system', '管设备历史查询', 'pipelineHistoryQuery', 12102, 0, '系统管理员', '系统管理员', to_date('03-09-2021 14:15:28', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 14:15:28', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('ad646d19fcaa4fbd9077dbf7a826b107', 'system', '设备操作日志', 'deviceOperationLog', 13101, 0, '系统管理员', '系统管理员', to_date('07-09-2021 17:05:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:05:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('167aeb3aca384afda8655d63aedee484', 'system', '系统日志', 'SystemLog', 13102, 0, '系统管理员', '系统管理员', to_date('07-09-2021 19:04:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 19:04:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('cdd198534d5849b7a27054e0f2593ff3', null, '通信状态报警', 'commStatusAlarm', 14101, 0, '系统管理员', '系统管理员', to_date('02-11-2021 15:20:57', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-11-2021 15:20:57', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('e2924366ab174d4b9a096be969934985', 'system', '数值量报警', 'numericValueAlarm', 14102, 0, '系统管理员', '系统管理员', to_date('16-09-2021 13:50:40', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:50:40', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b09082f4272e4768994db398e14bc3f2', 'system', '枚举量报警', 'enumValueAlarm', 14103, 0, '系统管理员', '系统管理员', to_date('07-10-2021 19:07:18', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-10-2021 19:07:18', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b71c1a2c9d574fe482080a56c7c780a9', null, '开关量报警', 'switchingValueAlarm', 14104, 0, '系统管理员', '系统管理员', to_date('07-10-2021 19:06:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-10-2021 19:06:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('8ab792e089494533be910699d426c7d5', null, '单位管理', 'orgManage', 21101, 0, '系统管理员', '系统管理员', to_date('16-11-2018 13:57:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-11-2018 13:57:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('5ba761c1383f498f9ac97c9a8ab6d847', null, '用户管理', 'userMange', 21102, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:45:52', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:45:52', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('220c349e246e47a39a818023f1c97a63', null, '角色管理', 'roleManage', 21103, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:46:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:46:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('87808f225d7240f68c2ab879347d818a', null, '泵设备管理', 'pumpDeviceManager', 22102, 0, '系统管理员', '系统管理员', to_date('19-08-2021 13:47:46', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 13:47:46', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b14377621d74442eb1127de094dfc903', 'system', '管设备管理', 'pipelineDeviceManager', 22103, 0, '系统管理员', '系统管理员', to_date('19-08-2021 13:46:14', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 13:46:14', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('2b4cd8cb8c6844769c66b038246c27bf', 'system', '短信设备管理', 'SMSDeviceManager', 22104, 0, '系统管理员', '系统管理员', to_date('17-09-2021 18:25:50', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-09-2021 18:25:50', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b6ef8f3a49094768b3231d5678fc9cbc', null, '模块配置', 'moduleManage', 23101, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:47:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:47:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('b8a408839dd8498d9a19fc65f7406ed4', null, '字典配置', 'dataDictionary', 23102, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:47:49', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:47:49', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('2afd86cc6dae4b87abe4aa5c49cb3a88', null, '统计配置', 'statSet', 23103, 0, '系统管理员', '系统管理员', to_date('03-09-2018 13:47:58', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2018 13:47:58', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_NAME (SYSDATAID, TENANTID, CNAME, ENAME, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('9439b5be24c04491aa8c353e7c65a0ea', null, '报警配置', 'alarmSet', 23104, 0, '系统管理员', '系统管理员', to_date('29-09-2019 09:37:53', 'dd-mm-yyyy hh24:mi:ss'), to_date('29-09-2019 09:37:53', 'dd-mm-yyyy hh24:mi:ss'));

/*==============================================================*/
/* 初始化tbl_dist_item数据                                          */
/*==============================================================*/
insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119379', null, '167aeb3aca384afda8655d63aedee484', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119380', null, '167aeb3aca384afda8655d63aedee484', '操作用户', 'user_id', null, 2, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119381', null, '167aeb3aca384afda8655d63aedee484', '登录IP', 'loginIp', null, 3, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119382', null, '167aeb3aca384afda8655d63aedee484', '操作', 'actionName', null, 4, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119383', null, '167aeb3aca384afda8655d63aedee484', '备注', 'remark', 'width:150', 5, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119384', null, '167aeb3aca384afda8655d63aedee484', '操作时间', 'to_char(createTime@''yyyy-mm-dd hh24:mi:ss'') as createTime', 'width:130', 6, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114886', null, '220c349e246e47a39a818023f1c97a63', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114854', 'sys', '220c349e246e47a39a818023f1c97a63', '角色名称', 'roleName', null, 2, 1, 'sys', '系统管理员', to_date('18-06-2014 09:59:26', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 09:59:26', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114855', 'sys', '220c349e246e47a39a818023f1c97a63', '角色编码', 'roleCode', null, 3, 1, 'sys', '系统管理员', to_date('18-06-2014 09:59:26', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 09:59:26', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116763', null, '220c349e246e47a39a818023f1c97a63', '控制权限', 'roleFlagName', null, 4, 1, null, '系统管理员', to_date('12-12-2018 14:14:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('12-12-2018 14:14:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119895', null, '220c349e246e47a39a818023f1c97a63', '接收报警短信', 'receiveSMSName', null, 5, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119975', null, '220c349e246e47a39a818023f1c97a63', '接收报警邮件', 'receiveMailName', null, 6, 1, null, null, to_date('23-09-2021 09:44:04', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-09-2021 09:44:04', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114856', null, '220c349e246e47a39a818023f1c97a63', '角色描述', 'remark', 'width:200', 7, 1, null, '系统管理员', to_date('17-09-2021 14:17:05', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-09-2021 14:17:05', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116088', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '序号', 'id', 'width:50', 1, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116089', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '统计级别', 'statitem', null, 2, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116091', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '下限', 'downlimit', null, 3, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116090', null, '2afd86cc6dae4b87abe4aa5c49cb3a88', '上限', 'uplimit', null, 4, 1, null, null, to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'), to_date('28-08-2018 15:42:51', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119915', null, '2b4cd8cb8c6844769c66b038246c27bf', '序号', 'id', 'width:50', 1, 1, null, null, to_date('17-09-2021 18:29:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('17-09-2021 18:29:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120375', 'sys', '2b4cd8cb8c6844769c66b038246c27bf', '单位名称', 'orgName', null, 2, 1, null, '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119916', null, '2b4cd8cb8c6844769c66b038246c27bf', '设备名称', 'wellName', null, 3, 1, null, '系统管理员', to_date('13-10-2021 20:47:50', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-10-2021 20:47:50', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119917', null, '2b4cd8cb8c6844769c66b038246c27bf', '短信设备实例', 'instanceName', 'width:120', 4, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119918', null, '2b4cd8cb8c6844769c66b038246c27bf', '注册包ID', 'signInId', null, 5, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119919', null, '2b4cd8cb8c6844769c66b038246c27bf', '排序编号', 'sortNum', null, 6, 1, null, null, to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114885', null, '5ba761c1383f498f9ac97c9a8ab6d847', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114845', null, '5ba761c1383f498f9ac97c9a8ab6d847', '用户名称', 'userName', null, 2, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114846', null, '5ba761c1383f498f9ac97c9a8ab6d847', '单位名称', 'orgName', null, 3, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114847', null, '5ba761c1383f498f9ac97c9a8ab6d847', '用户账号', 'userId', null, 4, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114848', null, '5ba761c1383f498f9ac97c9a8ab6d847', '用户密码', 'userPwd', null, 5, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114849', null, '5ba761c1383f498f9ac97c9a8ab6d847', '角色', 'userTypeName', null, 6, 1, null, '系统管理员', to_date('23-06-2014 13:29:50', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-06-2014 13:29:50', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114850', null, '5ba761c1383f498f9ac97c9a8ab6d847', '用户电话', 'userPhone', null, 7, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114851', null, '5ba761c1383f498f9ac97c9a8ab6d847', '内部邮箱', 'userInEmail', null, 8, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114852', null, '5ba761c1383f498f9ac97c9a8ab6d847', '职务', 'userTitleName', null, 9, 0, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116092', null, '5ba761c1383f498f9ac97c9a8ab6d847', '快捷登录', 'userQuickLoginName', null, 10, 1, null, null, to_date('12-10-2018 09:12:22', 'dd-mm-yyyy hh24:mi:ss'), to_date('12-10-2018 09:12:22', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114853', null, '5ba761c1383f498f9ac97c9a8ab6d847', '注册时间', 'userRegtime', null, 11, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118836', null, '7f13446d19b4497986980fa16a750f95', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118837', null, '7f13446d19b4497986980fa16a750f95', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118931', null, '7f13446d19b4497986980fa16a750f95', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 3, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118838', null, '7f13446d19b4497986980fa16a750f95', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118839', null, '7f13446d19b4497986980fa16a750f95', '设备型号标识位', 'addr0', null, 5, 0, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118840', null, '7f13446d19b4497986980fa16a750f95', '变频器运行状态', 'addr2', null, 6, 0, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118841', null, '7f13446d19b4497986980fa16a750f95', '变频器故障代码', 'addr4', null, 7, 0, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118842', null, '7f13446d19b4497986980fa16a750f95', 'A相电压(V)', 'addr6', null, 8, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118843', null, '7f13446d19b4497986980fa16a750f95', 'A相电流(A)', 'addr8', null, 9, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118844', null, '7f13446d19b4497986980fa16a750f95', 'B相电压(V)', 'addr10', null, 10, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118845', null, '7f13446d19b4497986980fa16a750f95', 'B相电流(A)', 'addr12', null, 11, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118846', null, '7f13446d19b4497986980fa16a750f95', 'C相电压(V)', 'addr14', null, 12, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118847', null, '7f13446d19b4497986980fa16a750f95', 'C相电流(A)', 'addr16', null, 13, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118848', null, '7f13446d19b4497986980fa16a750f95', '平均电压(V)', 'addr18', null, 14, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118849', null, '7f13446d19b4497986980fa16a750f95', '平均电流(A)', 'addr20', null, 15, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118875', null, '7f13446d19b4497986980fa16a750f95', '总功率(kW)', 'ADDR22', null, 16, 1, null, null, to_date('01-09-2021 11:21:05', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:05', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118876', null, '7f13446d19b4497986980fa16a750f95', '合计功率因数(%)', 'ADDR24', null, 17, 1, null, null, to_date('01-09-2021 11:21:09', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:09', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118877', null, '7f13446d19b4497986980fa16a750f95', '总频率(Hz)', 'ADDR26', null, 18, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118878', null, '7f13446d19b4497986980fa16a750f95', '总电能(kWh)', 'ADDR28', null, 19, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118879', null, '7f13446d19b4497986980fa16a750f95', '总累计时间(d)', 'ADDR30', null, 20, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118880', null, '7f13446d19b4497986980fa16a750f95', '井口温度(℃)', 'ADDR32', null, 21, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118881', null, '7f13446d19b4497986980fa16a750f95', '井口压力(MPa)', 'ADDR34', null, 22, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118882', null, '7f13446d19b4497986980fa16a750f95', '井下温度(℃)', 'ADDR36', null, 23, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118883', null, '7f13446d19b4497986980fa16a750f95', '井下压力(MPa)', 'ADDR38', null, 24, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118884', null, '7f13446d19b4497986980fa16a750f95', '套管压力(MPa)', 'ADDR40', null, 25, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118885', null, '7f13446d19b4497986980fa16a750f95', '柜内温度(℃)', 'ADDR42', null, 26, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118886', null, '7f13446d19b4497986980fa16a750f95', '自制井下温度(℃)', 'ADDR48', null, 27, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118887', null, '7f13446d19b4497986980fa16a750f95', '自制井下压力(MPa)', 'ADDR50', null, 28, 1, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118888', null, '7f13446d19b4497986980fa16a750f95', '自制故障码', 'ADDR52', null, 29, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118889', null, '7f13446d19b4497986980fa16a750f95', '保护开关', 'ADDR54', null, 30, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118890', null, '7f13446d19b4497986980fa16a750f95', '保护执行状态', 'ADDR56', null, 31, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118891', null, '7f13446d19b4497986980fa16a750f95', '欠压保护值(V)', 'ADDR58', null, 32, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118892', null, '7f13446d19b4497986980fa16a750f95', '欠压延时值(s)', 'ADDR60', null, 33, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118893', null, '7f13446d19b4497986980fa16a750f95', '过压保护值(V)', 'ADDR62', null, 34, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118894', null, '7f13446d19b4497986980fa16a750f95', '过压延时值(s)', 'ADDR64', null, 35, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118895', null, '7f13446d19b4497986980fa16a750f95', '欠载保护值(A)', 'ADDR66', null, 36, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118896', null, '7f13446d19b4497986980fa16a750f95', '欠载延时值(s)', 'ADDR68', null, 37, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118897', null, '7f13446d19b4497986980fa16a750f95', '过载保护值(A)', 'ADDR70', null, 38, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118898', null, '7f13446d19b4497986980fa16a750f95', '过载延时值(s)', 'ADDR72', null, 39, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118899', null, '7f13446d19b4497986980fa16a750f95', '电压不平衡保护值(%)', 'ADDR74', null, 40, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118900', null, '7f13446d19b4497986980fa16a750f95', '电压不平衡延时值(s)', 'ADDR76', null, 41, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118901', null, '7f13446d19b4497986980fa16a750f95', '电流不平衡保护值(%)', 'ADDR78', null, 42, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118902', null, '7f13446d19b4497986980fa16a750f95', '电流不平衡延时值(s)', 'ADDR80', null, 43, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118903', null, '7f13446d19b4497986980fa16a750f95', '井口温度保护值(℃)', 'ADDR82', null, 44, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118904', null, '7f13446d19b4497986980fa16a750f95', '井口温度保护延时值(s)', 'ADDR84', null, 45, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118905', null, '7f13446d19b4497986980fa16a750f95', '井口压力保护值(MPa)', 'ADDR86', null, 46, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118906', null, '7f13446d19b4497986980fa16a750f95', '井口压力保护延时值(s)', 'ADDR88', null, 47, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118907', null, '7f13446d19b4497986980fa16a750f95', '井下温度保护值(℃)', 'ADDR90', null, 48, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118908', null, '7f13446d19b4497986980fa16a750f95', '井下温度保护延时值(s)', 'ADDR92', null, 49, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118909', null, '7f13446d19b4497986980fa16a750f95', '内置井下温度保护值(℃)', 'ADDR94', null, 50, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118910', null, '7f13446d19b4497986980fa16a750f95', '内置井下温度保护延时值(s)', 'ADDR96', null, 51, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118911', null, '7f13446d19b4497986980fa16a750f95', '井下压力保护值(MPa)', 'ADDR98', null, 52, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118912', null, '7f13446d19b4497986980fa16a750f95', '井下压力保护延时值(s)', 'ADDR100', null, 53, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118913', null, '7f13446d19b4497986980fa16a750f95', '自制井下压力保护值(MPa)', 'ADDR102', null, 54, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118914', null, '7f13446d19b4497986980fa16a750f95', '自制井下压力保护延时值(s)', 'ADDR104', null, 55, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118915', null, '7f13446d19b4497986980fa16a750f95', '液面保护值(m)', 'ADDR106', null, 56, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118916', null, '7f13446d19b4497986980fa16a750f95', '液面保护延时值(s)', 'ADDR108', null, 57, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118917', null, '7f13446d19b4497986980fa16a750f95', '自制液面保护值(m)', 'ADDR110', null, 58, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118918', null, '7f13446d19b4497986980fa16a750f95', '自制液面保护延时值(s)', 'ADDR112', null, 59, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118919', null, '7f13446d19b4497986980fa16a750f95', '运行模式', 'ADDR114', null, 60, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118920', null, '7f13446d19b4497986980fa16a750f95', '间歇运行时间(min)', 'ADDR116', null, 61, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118921', null, '7f13446d19b4497986980fa16a750f95', '间歇停机时间(min)', 'ADDR118', null, 62, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118922', null, '7f13446d19b4497986980fa16a750f95', '目标井下压力(MPa)', 'ADDR120', null, 63, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118923', null, '7f13446d19b4497986980fa16a750f95', '自制目标井下压力(MPa)', 'ADDR122', null, 64, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118924', null, '7f13446d19b4497986980fa16a750f95', '目标液面深度(m)', 'ADDR124', null, 65, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118925', null, '7f13446d19b4497986980fa16a750f95', '自制目标液面深度(m)', 'ADDR126', null, 66, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118926', null, '7f13446d19b4497986980fa16a750f95', '程序版本号', 'ADDR128', null, 67, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118927', null, '7f13446d19b4497986980fa16a750f95', '气体压力(Kpa)', 'ADDR130', null, 68, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118928', null, '7f13446d19b4497986980fa16a750f95', '气体瞬时流量(m3/h)', 'ADDR132', null, 69, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118929', null, '7f13446d19b4497986980fa16a750f95', '气体累计流量(m3)', 'ADDR134', null, 70, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118930', null, '7f13446d19b4497986980fa16a750f95', '瞬时排量(m3/d)', 'ADDR138', null, 71, 0, null, null, to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 11:21:19', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114888', null, '87808f225d7240f68c2ab879347d818a', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114865', 'sys', '87808f225d7240f68c2ab879347d818a', '单位名称', 'orgName', null, 2, 1, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114867', 'sys', '87808f225d7240f68c2ab879347d818a', '井名', 'wellName', null, 3, 1, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116688', null, '87808f225d7240f68c2ab879347d818a', '采控实例', 'instanceName', 'width:120', 4, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119811', null, '87808f225d7240f68c2ab879347d818a', '报警实例', 'alarmInstanceName', 'width:120', 5, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114915', null, '87808f225d7240f68c2ab879347d818a', '注册包ID', 'signInId', null, 6, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114916', null, '87808f225d7240f68c2ab879347d818a', '设备从地址', 'slave', null, 7, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118795', null, '87808f225d7240f68c2ab879347d818a', '出厂编号', 'factoryNumber', null, 8, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118796', null, '87808f225d7240f68c2ab879347d818a', '规格型号', 'model', null, 9, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118797', null, '87808f225d7240f68c2ab879347d818a', '生产日期', 'productionDate', null, 10, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118798', null, '87808f225d7240f68c2ab879347d818a', '发货日期', 'deliveryDate', null, 11, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118799', null, '87808f225d7240f68c2ab879347d818a', '投产日期', 'commissioningDate', null, 12, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118800', null, '87808f225d7240f68c2ab879347d818a', '控制柜型号', 'controlcabinetDodel', null, 13, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('116923', null, '87808f225d7240f68c2ab879347d818a', '排序编号', 'sortNum', null, 15, 1, null, null, to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114832', 'sys', '8ab792e089494533be910699d426c7d5', '单位名称', 'text', null, 1, 1, 'sys', '系统管理员', to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114833', null, '8ab792e089494533be910699d426c7d5', '单位类别', 'orgTypeName', null, 2, 1, null, '系统管理员', to_date('23-06-2014 09:43:55', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-06-2014 09:43:55', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114834', 'sys', '8ab792e089494533be910699d426c7d5', '单位编码', 'orgCode', null, 3, 1, 'sys', '系统管理员', to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114835', 'sys', '8ab792e089494533be910699d426c7d5', '单位级别', 'orgLevel', null, 4, 1, 'sys', '系统管理员', to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114836', 'sys', '8ab792e089494533be910699d426c7d5', '单位说明', 'orgMemo', null, 5, 1, 'sys', '系统管理员', to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 14:26:30', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114892', null, '8ab792e089494533be910699d426c7d5', '中心坐标经度', 'orgCoordX', null, 6, 0, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114893', null, '8ab792e089494533be910699d426c7d5', '中心坐标纬度', 'orgCoordY', null, 7, 0, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114894', null, '8ab792e089494533be910699d426c7d5', '显示级别', 'showLevel', null, 8, 0, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114889', null, '9439b5be24c04491aa8c353e7c65a0ea', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114880', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警类型', 'alarmtypename', null, 2, 1, null, '系统管理员', to_date('13-11-2018 17:26:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-11-2018 17:26:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114879', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警项', 'resultname', null, 3, 1, null, '系统管理员', to_date('13-11-2018 17:26:28', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-11-2018 17:26:28', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114881', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警级别', 'alarmlevelname', null, 4, 1, null, '系统管理员', to_date('24-06-2014 15:52:52', 'dd-mm-yyyy hh24:mi:ss'), to_date('24-06-2014 15:52:52', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114882', null, '9439b5be24c04491aa8c353e7c65a0ea', '报警开关', 'alarmsign', null, 5, 1, null, '系统管理员', to_date('15-11-2018 10:06:54', 'dd-mm-yyyy hh24:mi:ss'), to_date('15-11-2018 10:06:54', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114883', 'sys', '9439b5be24c04491aa8c353e7c65a0ea', '备注', 'remark', null, 7, 0, 'sys', '系统管理员', to_date('20-06-2014 10:27:38', 'dd-mm-yyyy hh24:mi:ss'), to_date('20-06-2014 10:27:38', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119371', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119372', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119373', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '设备类型', 'deviceTypeName', null, 3, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119374', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '操作用户', 'user_id', null, 4, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119375', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '登录IP', 'loginIp', null, 5, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119376', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '操作', 'actionName', null, 6, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119377', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '备注', 'remark', 'width:150', 7, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119378', null, 'ad646d19fcaa4fbd9077dbf7a826b107', '操作时间', 'to_char(createTime@''yyyy-mm-dd hh24:mi:ss'') as createTime', 'width:130', 8, 1, null, null, to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-09-2021 17:11:16', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120115', null, 'b09082f4272e4768994db398e14bc3f2', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120116', null, 'b09082f4272e4768994db398e14bc3f2', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120118', null, 'b09082f4272e4768994db398e14bc3f2', '报警时间', 'alarmTime', 'width:150', 3, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('121868', null, 'b09082f4272e4768994db398e14bc3f2', '报警项', 'itemName', null, 4, 1, null, null, to_date('02-11-2021 17:19:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-11-2021 17:19:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120119', null, 'b09082f4272e4768994db398e14bc3f2', '报警信息', 'alarmInfo', null, 5, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120120', null, 'b09082f4272e4768994db398e14bc3f2', '报警级别', 'alarmLevelName', null, 6, 1, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('120121', null, 'b09082f4272e4768994db398e14bc3f2', '恢复时间', 'recoveryTime', 'width:150', 7, 0, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118801', null, 'b14377621d74442eb1127de094dfc903', '序号', 'id', 'width:50', 1, 1, null, null, to_date('19-08-2021 14:25:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 14:25:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118802', 'sys', 'b14377621d74442eb1127de094dfc903', '单位名称', 'orgName', null, 2, 1, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118803', 'sys', 'b14377621d74442eb1127de094dfc903', '井名', 'wellName', null, 3, 1, 'sys', '系统管理员', to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'), to_date('18-06-2014 13:34:03', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118804', null, 'b14377621d74442eb1127de094dfc903', '采控实例', 'instanceName', 'width:120', 4, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119812', null, 'b14377621d74442eb1127de094dfc903', '报警实例', 'alarmInstanceName', 'width:120', 5, 1, null, '系统管理员', to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-06-2020 11:32:24', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118806', null, 'b14377621d74442eb1127de094dfc903', '注册包ID', 'signInId', null, 6, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118807', null, 'b14377621d74442eb1127de094dfc903', '设备从地址', 'slave', null, 7, 1, null, null, to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-06-2018 14:07:37', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118808', null, 'b14377621d74442eb1127de094dfc903', '出厂编号', 'factoryNumber', null, 8, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118809', null, 'b14377621d74442eb1127de094dfc903', '规格型号', 'model', null, 9, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118810', null, 'b14377621d74442eb1127de094dfc903', '生产日期', 'productionDate', null, 10, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118811', null, 'b14377621d74442eb1127de094dfc903', '发货日期', 'deliveryDate', null, 11, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118812', null, 'b14377621d74442eb1127de094dfc903', '投产日期', 'commissioningDate', null, 12, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118813', null, 'b14377621d74442eb1127de094dfc903', '控制柜型号', 'controlcabinetDodel', null, 13, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118814', null, 'b14377621d74442eb1127de094dfc903', '管体长度', 'pipelineLength', null, 14, 1, null, null, to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'), to_date('19-08-2021 09:35:08', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118816', null, 'b14377621d74442eb1127de094dfc903', '排序编号', 'sortNum', null, 16, 1, null, null, to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'), to_date('31-12-2019 13:05:41', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114837', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块名称', 'text', null, 1, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114838', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块简介', 'mdShowname', null, 2, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114839', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块编码', 'mdCode', null, 3, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114840', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块视图', 'mdUrl', null, 4, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114841', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块控制器', 'mdControl', null, 5, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114842', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块图标', 'mdIcon', null, 6, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114843', null, 'b6ef8f3a49094768b3231d5678fc9cbc', '模块类别', 'mdTypeName', null, 7, 1, null, '系统管理员', to_date('23-06-2014 11:12:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('23-06-2014 11:12:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114844', 'sys', 'b6ef8f3a49094768b3231d5678fc9cbc', '模块排序', 'mdSeq', null, 8, 1, 'sys', '系统管理员', to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 16:27:02', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119870', null, 'b71c1a2c9d574fe482080a56c7c780a9', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119871', null, 'b71c1a2c9d574fe482080a56c7c780a9', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119873', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警时间', 'alarmTime', 'width:150', 3, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('121869', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警项', 'itemName', null, 4, 1, null, null, to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119874', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警信息', 'alarmInfo', null, 5, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119875', null, 'b71c1a2c9d574fe482080a56c7c780a9', '报警级别', 'alarmLevelName', null, 6, 1, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119876', null, 'b71c1a2c9d574fe482080a56c7c780a9', '恢复时间', 'recoveryTime', 'width:150', 7, 0, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114884', null, 'b8a408839dd8498d9a19fc65f7406ed4', '序号', 'id', 'width:50', 1, 1, null, null, null, null);

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114827', null, 'b8a408839dd8498d9a19fc65f7406ed4', '字典模块名称', 'cname', null, 2, 1, null, '系统管理员', to_date('13-09-2014 16:10:31', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-09-2014 16:10:31', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114828', null, 'b8a408839dd8498d9a19fc65f7406ed4', '字典模块代码', 'ename', null, 3, 1, null, '系统管理员', to_date('13-09-2014 16:10:40', 'dd-mm-yyyy hh24:mi:ss'), to_date('13-09-2014 16:10:40', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114829', 'sys', 'b8a408839dd8498d9a19fc65f7406ed4', '字典顺序', 'sorts', null, 4, 1, 'sys', '系统管理员', to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114830', 'sys', 'b8a408839dd8498d9a19fc65f7406ed4', '创建人', 'creator', null, 5, 1, 'sys', '系统管理员', to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('114831', 'sys', 'b8a408839dd8498d9a19fc65f7406ed4', '创建时间', 'updatetime', null, 6, 1, 'sys', '系统管理员', to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-06-2014 10:54:21', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119190', null, 'cd7b24562b924d19b556de31256e22a1', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119191', null, 'cd7b24562b924d19b556de31256e22a1', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119192', null, 'cd7b24562b924d19b556de31256e22a1', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119193', null, 'cd7b24562b924d19b556de31256e22a1', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 4, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119198', null, 'cd7b24562b924d19b556de31256e22a1', '设备型号标识位', 'addr0', null, 5, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119199', null, 'cd7b24562b924d19b556de31256e22a1', '变频器运行状态', 'addr2', null, 6, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119200', null, 'cd7b24562b924d19b556de31256e22a1', '变频器故障代码', 'addr4', null, 7, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119201', null, 'cd7b24562b924d19b556de31256e22a1', 'A相电压(V)', 'addr6', null, 8, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119202', null, 'cd7b24562b924d19b556de31256e22a1', 'A相电流(A)', 'addr8', null, 9, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119203', null, 'cd7b24562b924d19b556de31256e22a1', 'B相电压(V)', 'addr10', null, 10, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119204', null, 'cd7b24562b924d19b556de31256e22a1', 'B相电流(A)', 'addr12', null, 11, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119205', null, 'cd7b24562b924d19b556de31256e22a1', 'C相电压(V)', 'addr14', null, 12, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119206', null, 'cd7b24562b924d19b556de31256e22a1', 'C相电流(A)', 'addr16', null, 13, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119207', null, 'cd7b24562b924d19b556de31256e22a1', '平均电压(V)', 'addr18', null, 14, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119208', null, 'cd7b24562b924d19b556de31256e22a1', '平均电流(A)', 'addr20', null, 15, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119209', null, 'cd7b24562b924d19b556de31256e22a1', '总功率(kW)', 'addr22', null, 16, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119210', null, 'cd7b24562b924d19b556de31256e22a1', '合计功率因数(%)', 'addr24', null, 17, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119211', null, 'cd7b24562b924d19b556de31256e22a1', '总频率(Hz)', 'addr26', null, 18, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119212', null, 'cd7b24562b924d19b556de31256e22a1', '总电能(kWh)', 'addr28', null, 19, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119213', null, 'cd7b24562b924d19b556de31256e22a1', '总累计时间(d)', 'addr30', null, 20, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119214', null, 'cd7b24562b924d19b556de31256e22a1', '井口温度(℃)', 'addr32', null, 21, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119215', null, 'cd7b24562b924d19b556de31256e22a1', '井口压力(MPa)', 'addr34', null, 22, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119216', null, 'cd7b24562b924d19b556de31256e22a1', '井下温度(℃)', 'addr36', null, 23, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119217', null, 'cd7b24562b924d19b556de31256e22a1', '井下压力(MPa)', 'addr38', null, 24, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119218', null, 'cd7b24562b924d19b556de31256e22a1', '套管压力(MPa)', 'addr40', null, 25, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119219', null, 'cd7b24562b924d19b556de31256e22a1', '柜内温度(℃)', 'addr42', null, 26, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119220', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下温度(℃)', 'addr48', null, 27, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119221', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下压力(MPa)', 'addr50', null, 28, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119222', null, 'cd7b24562b924d19b556de31256e22a1', '自制故障码', 'addr52', null, 29, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119223', null, 'cd7b24562b924d19b556de31256e22a1', '保护开关', 'addr54', null, 30, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119224', null, 'cd7b24562b924d19b556de31256e22a1', '保护执行状态', 'addr56', null, 31, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119225', null, 'cd7b24562b924d19b556de31256e22a1', '欠压保护值(V)', 'addr58', null, 32, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119226', null, 'cd7b24562b924d19b556de31256e22a1', '欠压延时值(s)', 'addr60', null, 33, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119227', null, 'cd7b24562b924d19b556de31256e22a1', '过压保护值(V)', 'addr62', null, 34, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119228', null, 'cd7b24562b924d19b556de31256e22a1', '过压延时值(s)', 'addr64', null, 35, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119229', null, 'cd7b24562b924d19b556de31256e22a1', '欠载保护值(A)', 'addr66', null, 36, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119230', null, 'cd7b24562b924d19b556de31256e22a1', '欠载延时值(s)', 'addr68', null, 37, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119231', null, 'cd7b24562b924d19b556de31256e22a1', '过载保护值(A)', 'addr70', null, 38, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119232', null, 'cd7b24562b924d19b556de31256e22a1', '过载延时值(s)', 'addr72', null, 39, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119233', null, 'cd7b24562b924d19b556de31256e22a1', '电压不平衡保护值(%)', 'addr74', null, 40, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119234', null, 'cd7b24562b924d19b556de31256e22a1', '电压不平衡延时值(s)', 'addr76', null, 41, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119235', null, 'cd7b24562b924d19b556de31256e22a1', '电流不平衡保护值(%)', 'addr78', null, 42, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119236', null, 'cd7b24562b924d19b556de31256e22a1', '电流不平衡延时值(s)', 'addr80', null, 43, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119237', null, 'cd7b24562b924d19b556de31256e22a1', '井口温度保护值(℃)', 'addr82', null, 44, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119238', null, 'cd7b24562b924d19b556de31256e22a1', '井口温度保护延时值(s)', 'addr84', null, 45, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119239', null, 'cd7b24562b924d19b556de31256e22a1', '井口压力保护值(MPa)', 'addr86', null, 46, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119240', null, 'cd7b24562b924d19b556de31256e22a1', '井口压力保护延时值(s)', 'addr88', null, 47, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119241', null, 'cd7b24562b924d19b556de31256e22a1', '井下温度保护值(℃)', 'addr90', null, 48, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119242', null, 'cd7b24562b924d19b556de31256e22a1', '井下温度保护延时值(s)', 'addr92', null, 49, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119243', null, 'cd7b24562b924d19b556de31256e22a1', '内置井下温度保护值(℃)', 'addr94', null, 50, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119244', null, 'cd7b24562b924d19b556de31256e22a1', '内置井下温度保护延时值(s)', 'addr96', null, 51, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119245', null, 'cd7b24562b924d19b556de31256e22a1', '井下压力保护值(MPa)', 'addr98', null, 52, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119246', null, 'cd7b24562b924d19b556de31256e22a1', '井下压力保护延时值(s)', 'addr100', null, 53, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119247', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下压力保护值(MPa)', 'addr102', null, 54, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119248', null, 'cd7b24562b924d19b556de31256e22a1', '自制井下压力保护延时值(s)', 'addr104', null, 55, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119249', null, 'cd7b24562b924d19b556de31256e22a1', '液面保护值(m)', 'addr106', null, 56, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119250', null, 'cd7b24562b924d19b556de31256e22a1', '液面保护延时值(s)', 'addr108', null, 57, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119251', null, 'cd7b24562b924d19b556de31256e22a1', '自制液面保护值(m)', 'addr110', null, 58, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119252', null, 'cd7b24562b924d19b556de31256e22a1', '自制液面保护延时值(s)', 'addr112', null, 59, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119253', null, 'cd7b24562b924d19b556de31256e22a1', '运行模式', 'addr114', null, 60, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119254', null, 'cd7b24562b924d19b556de31256e22a1', '间歇运行时间(min)', 'addr116', null, 61, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119255', null, 'cd7b24562b924d19b556de31256e22a1', '间歇停机时间(min)', 'addr118', null, 62, 0, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119256', null, 'cd7b24562b924d19b556de31256e22a1', '目标井下压力(MPa)', 'addr120', null, 63, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119257', null, 'cd7b24562b924d19b556de31256e22a1', '自制目标井下压力(MPa)', 'addr122', null, 64, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119258', null, 'cd7b24562b924d19b556de31256e22a1', '目标液面深度(m)', 'addr124', null, 65, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119259', null, 'cd7b24562b924d19b556de31256e22a1', '自制目标液面深度(m)', 'addr126', null, 66, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119260', null, 'cd7b24562b924d19b556de31256e22a1', '程序版本号', 'addr128', null, 67, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119261', null, 'cd7b24562b924d19b556de31256e22a1', '气体压力(Kpa)', 'addr130', null, 68, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119262', null, 'cd7b24562b924d19b556de31256e22a1', '气体瞬时流量(m3/h)', 'addr132', null, 69, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119263', null, 'cd7b24562b924d19b556de31256e22a1', '气体累计流量(m3)', 'addr134', null, 70, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119264', null, 'cd7b24562b924d19b556de31256e22a1', '瞬时排量(m3/d)', 'addr138', null, 71, 1, null, null, to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'), to_date('03-09-2021 16:37:17', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119852', null, 'cdd198534d5849b7a27054e0f2593ff3', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119853', null, 'cdd198534d5849b7a27054e0f2593ff3', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119855', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警时间', 'alarmTime', 'width:150', 3, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('121867', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警项', 'itemName', null, 4, 1, null, null, to_date('02-11-2021 17:15:59', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-11-2021 17:15:59', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119856', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警信息', 'alarmInfo', null, 5, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119857', null, 'cdd198534d5849b7a27054e0f2593ff3', '报警级别', 'alarmLevelName', null, 6, 1, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119858', null, 'cdd198534d5849b7a27054e0f2593ff3', '恢复时间', 'recoveryTime', 'width:150', 7, 0, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118932', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118933', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118934', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('118935', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 3, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119040', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '设备型号标识位', 'addr0', null, 4, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119043', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '变频器运行状态', 'addr2', null, 5, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119045', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '变频器故障代码', 'addr4', null, 6, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119046', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'A相电压(V)', 'addr6', null, 7, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119048', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'A相电流(A)', 'addr8', null, 8, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119050', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'B相电压(V)', 'addr10', null, 9, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119051', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'B相电流(A)', 'addr12', null, 10, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119052', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'C相电压(V)', 'addr14', null, 11, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119053', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', 'C相电流(A)', 'addr16', null, 12, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119054', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '平均电压(V)', 'addr18', null, 13, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119055', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '平均电流(A)', 'addr20', null, 14, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119056', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总功率(kW)', 'addr22', null, 15, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119057', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '合计功率因数(%)', 'addr24', null, 16, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119059', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总频率(Hz)', 'addr26', null, 17, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119060', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总电能(kWh)', 'addr28', null, 18, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119062', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '总累计时间(d)', 'addr30', null, 19, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119063', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口温度(℃)', 'addr32', null, 20, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119065', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口压力(MPa)', 'addr34', null, 21, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119067', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下温度(℃)', 'addr36', null, 22, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119068', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下压力(MPa)', 'addr38', null, 23, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119070', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '套管压力(MPa)', 'addr40', null, 24, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119071', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '柜内温度(℃)', 'addr42', null, 25, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119072', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下温度(℃)', 'addr48', null, 26, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119074', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下压力(MPa)', 'addr50', null, 27, 1, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119075', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制故障码', 'addr52', null, 28, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119077', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '保护开关', 'addr54', null, 29, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119079', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '保护执行状态', 'addr56', null, 30, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119080', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠压保护值(V)', 'addr58', null, 31, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119082', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠压延时值(s)', 'addr60', null, 32, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119083', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过压保护值(V)', 'addr62', null, 33, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119085', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过压延时值(s)', 'addr64', null, 34, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119086', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠载保护值(A)', 'addr66', null, 35, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119088', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '欠载延时值(s)', 'addr68', null, 36, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119089', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过载保护值(A)', 'addr70', null, 37, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119091', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '过载延时值(s)', 'addr72', null, 38, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119092', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电压不平衡保护值(%)', 'addr74', null, 39, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119094', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电压不平衡延时值(s)', 'addr76', null, 40, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119095', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电流不平衡保护值(%)', 'addr78', null, 41, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119097', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '电流不平衡延时值(s)', 'addr80', null, 42, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119098', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口温度保护值(℃)', 'addr82', null, 43, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119100', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口温度保护延时值(s)', 'addr84', null, 44, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119101', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口压力保护值(MPa)', 'addr86', null, 45, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119103', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井口压力保护延时值(s)', 'addr88', null, 46, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119104', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下温度保护值(℃)', 'addr90', null, 47, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119106', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下温度保护延时值(s)', 'addr92', null, 48, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119107', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '内置井下温度保护值(℃)', 'addr94', null, 49, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119109', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '内置井下温度保护延时值(s)', 'addr96', null, 50, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119110', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下压力保护值(MPa)', 'addr98', null, 51, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119112', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '井下压力保护延时值(s)', 'addr100', null, 52, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119114', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下压力保护值(MPa)', 'addr102', null, 53, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119115', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制井下压力保护延时值(s)', 'addr104', null, 54, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119116', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '液面保护值(m)', 'addr106', null, 55, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119118', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '液面保护延时值(s)', 'addr108', null, 56, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119120', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制液面保护值(m)', 'addr110', null, 57, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119121', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制液面保护延时值(s)', 'addr112', null, 58, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119123', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '运行模式', 'addr114', null, 59, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119124', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '间歇运行时间(min)', 'addr116', null, 60, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119126', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '间歇停机时间(min)', 'addr118', null, 61, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119127', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '目标井下压力(MPa)', 'addr120', null, 62, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119129', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制目标井下压力(MPa)', 'addr122', null, 63, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119130', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '目标液面深度(m)', 'addr124', null, 64, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119132', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '自制目标液面深度(m)', 'addr126', null, 65, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119134', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '程序版本号', 'addr128', null, 66, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119135', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '气体压力(Kpa)', 'addr130', null, 67, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119137', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '气体瞬时流量(m3/h)', 'addr132', null, 68, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119139', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '气体累计流量(m3)', 'addr134', null, 69, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119140', null, 'e0f5f3ff8a1f46678c284fba9cc113e8', '瞬时排量(m3/d)', 'addr138', null, 70, 0, null, null, to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'), to_date('02-09-2021 14:08:11', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119859', null, 'e2924366ab174d4b9a096be969934985', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119860', null, 'e2924366ab174d4b9a096be969934985', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119862', null, 'e2924366ab174d4b9a096be969934985', '报警时间', 'alarmTime', 'width:150', 3, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119866', null, 'e2924366ab174d4b9a096be969934985', '报警项', 'itemName', null, 4, 1, null, null, to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119863', null, 'e2924366ab174d4b9a096be969934985', '报警信息', 'alarmInfo', null, 5, 1, null, null, to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 13:56:06', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119867', null, 'e2924366ab174d4b9a096be969934985', '报警值', 'alarmValue', null, 6, 1, null, null, to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119868', null, 'e2924366ab174d4b9a096be969934985', '报警限值', 'alarmLimit', null, 7, 1, null, null, to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119869', null, 'e2924366ab174d4b9a096be969934985', '回差', 'hystersis', null, 8, 1, null, null, to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 15:51:36', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119864', null, 'e2924366ab174d4b9a096be969934985', '报警级别', 'alarmLevelName', null, 9, 1, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119865', null, 'e2924366ab174d4b9a096be969934985', '恢复时间', 'recoveryTime', 'width:150', 10, 0, null, null, to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'), to_date('16-09-2021 14:55:39', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119194', null, 'fb7d070a349c403b8a26d71c12af7a05', '序号', 'id', 'width:50', 1, 1, null, null, to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:20:01', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119195', null, 'fb7d070a349c403b8a26d71c12af7a05', '井名', 'wellName', null, 2, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119196', null, 'fb7d070a349c403b8a26d71c12af7a05', '通信状态', 'commStatusName', null, 3, 1, null, null, to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'), to_date('25-08-2021 18:29:42', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119197', null, 'fb7d070a349c403b8a26d71c12af7a05', '采集时间', 'to_char(acqTime@''yyyy-mm-dd hh24:mi:ss'') as acqTime', 'width:130', 3, 1, null, null, to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('01-09-2021 14:47:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119275', null, 'fb7d070a349c403b8a26d71c12af7a05', '设备型号标识位', 'addr0', null, 4, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119276', null, 'fb7d070a349c403b8a26d71c12af7a05', '变频器运行状态', 'addr2', null, 5, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119277', null, 'fb7d070a349c403b8a26d71c12af7a05', '变频器故障代码', 'addr4', null, 6, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119278', null, 'fb7d070a349c403b8a26d71c12af7a05', 'A相电压(V)', 'addr6', null, 7, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119279', null, 'fb7d070a349c403b8a26d71c12af7a05', 'A相电流(A)', 'addr8', null, 8, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119280', null, 'fb7d070a349c403b8a26d71c12af7a05', 'B相电压(V)', 'addr10', null, 9, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119281', null, 'fb7d070a349c403b8a26d71c12af7a05', 'B相电流(A)', 'addr12', null, 10, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119282', null, 'fb7d070a349c403b8a26d71c12af7a05', 'C相电压(V)', 'addr14', null, 11, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119283', null, 'fb7d070a349c403b8a26d71c12af7a05', 'C相电流(A)', 'addr16', null, 12, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119284', null, 'fb7d070a349c403b8a26d71c12af7a05', '平均电压(V)', 'addr18', null, 13, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119285', null, 'fb7d070a349c403b8a26d71c12af7a05', '平均电流(A)', 'addr20', null, 14, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119286', null, 'fb7d070a349c403b8a26d71c12af7a05', '总功率(kW)', 'addr22', null, 15, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119287', null, 'fb7d070a349c403b8a26d71c12af7a05', '合计功率因数(%)', 'addr24', null, 16, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119288', null, 'fb7d070a349c403b8a26d71c12af7a05', '总频率(Hz)', 'addr26', null, 17, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119289', null, 'fb7d070a349c403b8a26d71c12af7a05', '总电能(kWh)', 'addr28', null, 18, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119290', null, 'fb7d070a349c403b8a26d71c12af7a05', '总累计时间(d)', 'addr30', null, 19, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119291', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口温度(℃)', 'addr32', null, 20, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119292', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口压力(MPa)', 'addr34', null, 21, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119293', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下温度(℃)', 'addr36', null, 22, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119294', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下压力(MPa)', 'addr38', null, 23, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119295', null, 'fb7d070a349c403b8a26d71c12af7a05', '套管压力(MPa)', 'addr40', null, 24, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119296', null, 'fb7d070a349c403b8a26d71c12af7a05', '柜内温度(℃)', 'addr42', null, 25, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119297', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下温度(℃)', 'addr48', null, 26, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119298', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下压力(MPa)', 'addr50', null, 27, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119299', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制故障码', 'addr52', null, 28, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119300', null, 'fb7d070a349c403b8a26d71c12af7a05', '保护开关', 'addr54', null, 29, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119301', null, 'fb7d070a349c403b8a26d71c12af7a05', '保护执行状态', 'addr56', null, 30, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119302', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠压保护值(V)', 'addr58', null, 31, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119303', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠压延时值(s)', 'addr60', null, 32, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119304', null, 'fb7d070a349c403b8a26d71c12af7a05', '过压保护值(V)', 'addr62', null, 33, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119305', null, 'fb7d070a349c403b8a26d71c12af7a05', '过压延时值(s)', 'addr64', null, 34, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119306', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠载保护值(A)', 'addr66', null, 35, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119307', null, 'fb7d070a349c403b8a26d71c12af7a05', '欠载延时值(s)', 'addr68', null, 36, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119308', null, 'fb7d070a349c403b8a26d71c12af7a05', '过载保护值(A)', 'addr70', null, 37, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119309', null, 'fb7d070a349c403b8a26d71c12af7a05', '过载延时值(s)', 'addr72', null, 38, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119310', null, 'fb7d070a349c403b8a26d71c12af7a05', '电压不平衡保护值(%)', 'addr74', null, 39, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119311', null, 'fb7d070a349c403b8a26d71c12af7a05', '电压不平衡延时值(s)', 'addr76', null, 40, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119312', null, 'fb7d070a349c403b8a26d71c12af7a05', '电流不平衡保护值(%)', 'addr78', null, 41, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119313', null, 'fb7d070a349c403b8a26d71c12af7a05', '电流不平衡延时值(s)', 'addr80', null, 42, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119314', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口温度保护值(℃)', 'addr82', null, 43, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119315', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口温度保护延时值(s)', 'addr84', null, 44, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119316', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口压力保护值(MPa)', 'addr86', null, 45, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119317', null, 'fb7d070a349c403b8a26d71c12af7a05', '井口压力保护延时值(s)', 'addr88', null, 46, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119318', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下温度保护值(℃)', 'addr90', null, 47, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119319', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下温度保护延时值(s)', 'addr92', null, 48, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119320', null, 'fb7d070a349c403b8a26d71c12af7a05', '内置井下温度保护值(℃)', 'addr94', null, 49, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119321', null, 'fb7d070a349c403b8a26d71c12af7a05', '内置井下温度保护延时值(s)', 'addr96', null, 50, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119322', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下压力保护值(MPa)', 'addr98', null, 51, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119323', null, 'fb7d070a349c403b8a26d71c12af7a05', '井下压力保护延时值(s)', 'addr100', null, 52, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119324', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下压力保护值(MPa)', 'addr102', null, 53, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119325', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制井下压力保护延时值(s)', 'addr104', null, 54, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119326', null, 'fb7d070a349c403b8a26d71c12af7a05', '液面保护值(m)', 'addr106', null, 55, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119327', null, 'fb7d070a349c403b8a26d71c12af7a05', '液面保护延时值(s)', 'addr108', null, 56, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119328', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制液面保护值(m)', 'addr110', null, 57, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119329', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制液面保护延时值(s)', 'addr112', null, 58, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119330', null, 'fb7d070a349c403b8a26d71c12af7a05', '运行模式', 'addr114', null, 59, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119331', null, 'fb7d070a349c403b8a26d71c12af7a05', '间歇运行时间(min)', 'addr116', null, 60, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119332', null, 'fb7d070a349c403b8a26d71c12af7a05', '间歇停机时间(min)', 'addr118', null, 61, 0, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119333', null, 'fb7d070a349c403b8a26d71c12af7a05', '目标井下压力(MPa)', 'addr120', null, 62, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119334', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制目标井下压力(MPa)', 'addr122', null, 63, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119335', null, 'fb7d070a349c403b8a26d71c12af7a05', '目标液面深度(m)', 'addr124', null, 64, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119336', null, 'fb7d070a349c403b8a26d71c12af7a05', '自制目标液面深度(m)', 'addr126', null, 65, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119337', null, 'fb7d070a349c403b8a26d71c12af7a05', '程序版本号', 'addr128', null, 66, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119338', null, 'fb7d070a349c403b8a26d71c12af7a05', '气体压力(Kpa)', 'addr130', null, 67, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119339', null, 'fb7d070a349c403b8a26d71c12af7a05', '气体瞬时流量(m3/h)', 'addr132', null, 68, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119340', null, 'fb7d070a349c403b8a26d71c12af7a05', '气体累计流量(m3)', 'addr134', null, 69, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));

insert into TBL_DIST_ITEM (DATAITEMID, TENANTID, SYSDATAID, CNAME, ENAME, DATAVALUE, SORTS, STATUS, CREATOR, UPDATEUSER, UPDATETIME, CREATEDATE)
values ('119341', null, 'fb7d070a349c403b8a26d71c12af7a05', '瞬时排量(m3/d)', 'addr138', null, 70, 1, null, null, to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'), to_date('04-09-2021 19:42:29', 'dd-mm-yyyy hh24:mi:ss'));