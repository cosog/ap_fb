/*==============================================================*/
/* 初始化tbl_org数据                                          */
/*==============================================================*/
insert into tbl_org (ORG_ID, ORG_CODE, ORG_NAME, ORG_MEMO, ORG_PARENT, ORG_SEQ, ORG_FLAG, ORG_REALID, ORG_LEVEL, ORG_TYPE, ORG_COORDX, ORG_COORDY, SHOW_LEVEL)
values (1, '0000', '组织根节点', '组织根节点', 0, null, null, null, 7, 7, 0.000000, 0.000000, 1);

/*==============================================================*/
/* 初始化tbl_acq_group_conf数据                                          */
/*==============================================================*/
insert into TBL_ACQ_GROUP_CONF (ID, GROUP_CODE, GROUP_NAME, ACQ_CYCLE, SAVE_CYCLE, PROTOCOL, REMARK, TYPE)
values (1, 'group1', '飞舟泵产品采集组', 60, 60, '飞舟泵产品协议', '飞舟泵产品采集组', 0);

insert into TBL_ACQ_GROUP_CONF (ID, GROUP_CODE, GROUP_NAME, ACQ_CYCLE, SAVE_CYCLE, PROTOCOL, REMARK, TYPE)
values (2, 'group2', '飞舟管产品采集组', 60, 60, '飞舟管产品协议', '飞舟管产品采集组', 0);

insert into TBL_ACQ_GROUP_CONF (ID, GROUP_CODE, GROUP_NAME, ACQ_CYCLE, SAVE_CYCLE, PROTOCOL, REMARK, TYPE)
values (3, 'group3', '飞舟泵产品控制组', 0, 0, '飞舟泵产品协议', '飞舟泵产品控制组', 1);

/*==============================================================*/
/* 初始化tbl_acq_unit_conf数据                                    */
/*==============================================================*/
insert into TBL_ACQ_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (1, 'unit1', '飞舟泵产品采控单元', '飞舟泵产品协议', '飞舟泵产品采集单元');

insert into TBL_ACQ_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (2, 'unit2', '飞舟管产品采控单元', '飞舟管产品协议', '飞舟管产品采集单元');

/*==============================================================*/
/* 初始化tbl_acq_item2group_conf数据                                          */
/*==============================================================*/
insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (1, null, '设备型号标识位', null, '0,0,0', 1, 5, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (2, null, '变频器运行状态', null, '0,0,0', 1, 1, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (3, null, '变频器故障代码', null, '0,0,0', 1, 3, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (4, null, 'A相电压', null, '0,0,0', 1, 16, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (5, null, 'A相电流', null, '0,0,0', 1, 19, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (6, null, 'B相电压', null, '0,0,0', 1, 17, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (7, null, 'B相电流', null, '0,0,0', 1, 20, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (8, null, 'C相电压', null, '0,0,0', 1, 18, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (9, null, 'C相电流', null, '0,0,0', 1, 21, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (10, null, '平均电压', null, '0,0,0', 1, 10, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (11, null, '平均电流', null, '0,0,0', 1, 11, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (12, null, '总功率', null, '0,0,0', 1, 12, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (13, null, '合计功率因数', null, '0,0,0', 1, 15, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (14, null, '总频率', null, '0,0,0', 1, 2, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (15, null, '总电能', null, '0,0,0', 1, 13, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (16, null, '总累计时间', null, '0,0,0', 1, 14, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (17, null, '井口温度', null, '0,0,0', 1, 22, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (18, null, '井口压力', null, '0,0,0', 1, 23, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (19, null, '井下温度', null, '0,0,0', 1, 25, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (20, null, '井下压力', null, '0,0,0', 1, 26, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (21, null, '套管压力', null, '0,0,0', 1, 27, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (22, null, '柜内温度', null, '0,0,0', 1, 24, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (23, null, '自制井下温度', null, '0,0,0', 1, 28, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (24, null, '自制井下压力', null, '0,0,0', 1, 29, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (25, null, '自制故障码', null, '0,0,0', 1, 30, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (26, null, '保护开关', null, '0,0,0', 1, 31, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (27, null, '保护开关', null, '0,0,0', 1, 34, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (28, null, '保护开关', null, '0,0,0', 1, 37, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (29, null, '保护开关', null, '0,0,0', 1, 40, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (30, null, '保护开关', null, '0,0,0', 1, 43, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (31, null, '保护开关', null, '0,0,0', 1, 46, 6);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (32, null, '保护开关', null, '0,0,0', 1, 49, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (33, null, '保护开关', null, '0,0,0', 1, 52, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (34, null, '保护开关', null, '0,0,0', 1, 55, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (35, null, '保护开关', null, '0,0,0', 1, 58, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (36, null, '保护开关', null, '0,0,0', 1, 61, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (37, null, '保护开关', null, '0,0,0', 1, 64, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (38, null, '保护开关', null, '0,0,0', 1, 67, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (39, null, '保护开关', null, '0,0,0', 1, 70, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (40, null, '保护执行状态', null, '0,0,0', 1, 73, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (41, null, '保护执行状态', null, '0,0,0', 1, 74, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (42, null, '保护执行状态', null, '0,0,0', 1, 75, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (43, null, '保护执行状态', null, '0,0,0', 1, 76, 3);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (44, null, '保护执行状态', null, '0,0,0', 1, 77, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (45, null, '保护执行状态', null, '0,0,0', 1, 78, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (46, null, '保护执行状态', null, '0,0,0', 1, 79, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (47, null, '保护执行状态', null, '0,0,0', 1, 80, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (48, null, '保护执行状态', null, '0,0,0', 1, 81, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (49, null, '保护执行状态', null, '0,0,0', 1, 82, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (50, null, '保护执行状态', null, '0,0,0', 1, 83, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (51, null, '保护执行状态', null, '0,0,0', 1, 84, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (52, null, '保护执行状态', null, '0,0,0', 1, 85, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (53, null, '保护执行状态', null, '0,0,0', 1, 86, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (54, null, '欠压保护值', null, '0,0,0', 1, 50, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (55, null, '欠压延时值', null, '0,0,0', 1, 51, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (56, null, '过压保护值', null, '0,0,0', 1, 53, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (57, null, '过压延时值', null, '0,0,0', 1, 54, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (58, null, '欠载保护值', null, '0,0,0', 1, 56, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (59, null, '欠载延时值', null, '0,0,0', 1, 57, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (60, null, '过载保护值', null, '0,0,0', 1, 59, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (61, null, '过载延时值', null, '0,0,0', 1, 60, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (62, null, '电压不平衡保护值', null, '0,0,0', 1, 62, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (63, null, '电压不平衡延时值', null, '0,0,0', 1, 63, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (64, null, '电流不平衡保护值', null, '0,0,0', 1, 65, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (65, null, '电流不平衡延时值', null, '0,0,0', 1, 66, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (66, null, '井口温度保护值', null, '0,0,0', 1, 68, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (67, null, '井口温度保护延时值', null, '0,0,0', 1, 69, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (68, null, '井口压力保护值', null, '0,0,0', 1, 71, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (69, null, '井口压力保护延时值', null, '0,0,0', 1, 72, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (70, null, '井下温度保护值', null, '0,0,0', 1, 32, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (71, null, '井下温度保护延时值', null, '0,0,0', 1, 33, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (72, null, '内置井下温度保护值', null, '0,0,0', 1, 41, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (73, null, '内置井下温度保护延时值', null, '0,0,0', 1, 42, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (74, null, '井下压力保护值', null, '0,0,0', 1, 35, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (75, null, '井下压力保护延时值', null, '0,0,0', 1, 36, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (76, null, '自制井下压力保护值', null, '0,0,0', 1, 38, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (77, null, '自制井下压力保护延时值', null, '0,0,0', 1, 39, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (78, null, '液面保护值', null, '0,0,0', 1, 44, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (79, null, '液面保护延时值', null, '0,0,0', 1, 45, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (80, null, '自制液面保护值', null, '0,0,0', 1, 47, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (81, null, '自制液面保护延时值', null, '0,0,0', 1, 48, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (82, null, '运行模式', null, '0,0,0', 1, 88, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (83, null, '间歇运行时间', null, '0,0,0', 1, 91, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (84, null, '间歇停机时间', null, '0,0,0', 1, 94, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (85, null, '目标井下压力', null, '0,0,0', 1, 92, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (86, null, '自制目标井下压力', null, '0,0,0', 1, 95, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (87, null, '目标液面深度', null, '0,0,0', 1, 93, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (88, null, '自制目标液面深度', null, '0,0,0', 1, 96, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (89, null, '程序版本号', null, '0,0,0', 1, 6, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (90, null, '气体压力', null, '0,0,0', 1, 7, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (91, null, '气体瞬时流量', null, '0,0,0', 1, 8, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (92, null, '气体累计流量', null, '0,0,0', 1, 9, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (93, null, '瞬时排量', null, '0,0,0', 1, 4, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (94, null, '设备型号标识位', null, '0,0,0', 2, 5, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (95, null, '变频器运行状态', null, '0,0,0', 2, 1, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (96, null, '变频器故障代码', null, '0,0,0', 2, 3, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (97, null, 'A相电压', null, '0,0,0', 2, 16, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (98, null, 'A相电流', null, '0,0,0', 2, 19, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (99, null, 'B相电压', null, '0,0,0', 2, 17, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (100, null, 'B相电流', null, '0,0,0', 2, 20, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (101, null, 'C相电压', null, '0,0,0', 2, 18, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (102, null, 'C相电流', null, '0,0,0', 2, 21, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (103, null, '平均电压', null, '0,0,0', 2, 10, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (104, null, '平均电流', null, '0,0,0', 2, 11, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (105, null, '总功率', null, '0,0,0', 2, 12, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (106, null, '合计功率因数', null, '0,0,0', 2, 15, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (107, null, '总频率', null, '0,0,0', 2, 2, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (108, null, '总电能', null, '0,0,0', 2, 13, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (109, null, '总累计时间', null, '0,0,0', 2, 14, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (110, null, '井口温度', null, '0,0,0', 2, 22, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (111, null, '井口压力', null, '0,0,0', 2, 23, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (112, null, '井下温度', null, '0,0,0', 2, 25, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (113, null, '井下压力', null, '0,0,0', 2, 26, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (114, null, '套管压力', null, '0,0,0', 2, 27, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (115, null, '柜内温度', null, '0,0,0', 2, 24, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (116, null, '自制井下温度', null, '0,0,0', 2, 28, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (117, null, '自制井下压力', null, '0,0,0', 2, 29, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (118, null, '自制故障码', null, '0,0,0', 2, 30, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (119, null, '保护开关', null, '0,0,0', 2, 31, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (120, null, '保护开关', null, '0,0,0', 2, 34, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (121, null, '保护开关', null, '0,0,0', 2, 37, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (122, null, '保护开关', null, '0,0,0', 2, 40, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (123, null, '保护开关', null, '0,0,0', 2, 43, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (124, null, '保护开关', null, '0,0,0', 2, 46, 6);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (125, null, '保护开关', null, '0,0,0', 2, 49, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (126, null, '保护开关', null, '0,0,0', 2, 52, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (127, null, '保护开关', null, '0,0,0', 2, 55, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (128, null, '保护开关', null, '0,0,0', 2, 58, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (129, null, '保护开关', null, '0,0,0', 2, 61, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (130, null, '保护开关', null, '0,0,0', 2, 64, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (131, null, '保护开关', null, '0,0,0', 2, 67, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (132, null, '保护开关', null, '0,0,0', 2, 70, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (133, null, '保护执行状态', null, '0,0,0', 2, 73, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (134, null, '保护执行状态', null, '0,0,0', 2, 74, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (135, null, '保护执行状态', null, '0,0,0', 2, 75, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (136, null, '保护执行状态', null, '0,0,0', 2, 76, 3);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (137, null, '保护执行状态', null, '0,0,0', 2, 77, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (138, null, '保护执行状态', null, '0,0,0', 2, 78, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (139, null, '保护执行状态', null, '0,0,0', 2, 79, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (140, null, '保护执行状态', null, '0,0,0', 2, 80, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (141, null, '保护执行状态', null, '0,0,0', 2, 81, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (142, null, '保护执行状态', null, '0,0,0', 2, 82, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (143, null, '保护执行状态', null, '0,0,0', 2, 83, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (144, null, '保护执行状态', null, '0,0,0', 2, 84, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (145, null, '保护执行状态', null, '0,0,0', 2, 85, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (146, null, '保护执行状态', null, '0,0,0', 2, 86, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (147, null, '欠压保护值', null, '0,0,0', 2, 50, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (148, null, '欠压延时值', null, '0,0,0', 2, 51, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (149, null, '过压保护值', null, '0,0,0', 2, 53, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (150, null, '过压延时值', null, '0,0,0', 2, 54, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (151, null, '欠载保护值', null, '0,0,0', 2, 56, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (152, null, '欠载延时值', null, '0,0,0', 2, 57, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (153, null, '过载保护值', null, '0,0,0', 2, 59, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (154, null, '过载延时值', null, '0,0,0', 2, 60, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (155, null, '电压不平衡保护值', null, '0,0,0', 2, 62, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (156, null, '电压不平衡延时值', null, '0,0,0', 2, 63, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (157, null, '电流不平衡保护值', null, '0,0,0', 2, 65, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (158, null, '电流不平衡延时值', null, '0,0,0', 2, 66, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (159, null, '井口温度保护值', null, '0,0,0', 2, 68, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (160, null, '井口温度保护延时值', null, '0,0,0', 2, 69, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (161, null, '井口压力保护值', null, '0,0,0', 2, 71, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (162, null, '井口压力保护延时值', null, '0,0,0', 2, 72, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (163, null, '井下温度保护值', null, '0,0,0', 2, 32, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (164, null, '井下温度保护延时值', null, '0,0,0', 2, 33, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (165, null, '内置井下温度保护值', null, '0,0,0', 2, 41, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (166, null, '内置井下温度保护延时值', null, '0,0,0', 2, 42, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (167, null, '井下压力保护值', null, '0,0,0', 2, 35, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (168, null, '井下压力保护延时值', null, '0,0,0', 2, 36, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (169, null, '自制井下压力保护值', null, '0,0,0', 2, 38, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (170, null, '自制井下压力保护延时值', null, '0,0,0', 2, 39, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (171, null, '液面保护值', null, '0,0,0', 2, 44, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (172, null, '液面保护延时值', null, '0,0,0', 2, 45, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (173, null, '自制液面保护值', null, '0,0,0', 2, 47, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (174, null, '自制液面保护延时值', null, '0,0,0', 2, 48, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (175, null, '运行模式', null, '0,0,0', 2, 88, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (176, null, '间歇运行时间', null, '0,0,0', 2, 91, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (177, null, '间歇停机时间', null, '0,0,0', 2, 94, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (178, null, '目标井下压力', null, '0,0,0', 2, 92, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (179, null, '自制目标井下压力', null, '0,0,0', 2, 95, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (180, null, '目标液面深度', null, '0,0,0', 2, 93, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (181, null, '自制目标液面深度', null, '0,0,0', 2, 96, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (182, null, '程序版本号', null, '0,0,0', 2, 6, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (183, null, '气体压力', null, '0,0,0', 2, 7, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (184, null, '气体瞬时流量', null, '0,0,0', 2, 8, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (185, null, '气体累计流量', null, '0,0,0', 2, 9, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (186, null, '瞬时排量', null, '0,0,0', 2, 4, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (187, null, '欠压保护开关', null, '0,0,0', 3, 1, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (188, null, '设定欠压保护值', null, '0,0,0', 3, 2, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (189, null, '设定欠压保护延时值', null, '0,0,0', 3, 3, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (190, null, '设定工作模式', null, '0,0,0', 3, 4, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (191, null, '设定运行频率', null, '0,0,0', 3, 5, null);

/*==============================================================*/
/* 初始化tbl_acq_group2unit_conf数据                              */
/*==============================================================*/
insert into TBL_ACQ_GROUP2UNIT_CONF (ID, GROUPID, MATRIX, UNITID)
values (1, 1, '0,0,0', 1);

insert into TBL_ACQ_GROUP2UNIT_CONF (ID, GROUPID, MATRIX, UNITID)
values (2, 2, '0,0,0', 2);

insert into TBL_ACQ_GROUP2UNIT_CONF (ID, GROUPID, MATRIX, UNITID)
values (3, 3, '0,0,0', 1);


/*==============================================================*/
/* 初始化tbl_alarm_unit_conf数据                              */
/*==============================================================*/
insert into TBL_ALARM_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (1, 'group1', '飞舟泵产品报警单元', '飞舟泵产品协议', null);

insert into TBL_ALARM_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (2, 'group2', '飞舟管产品报警单元', '飞舟管产品协议', null);

/*==============================================================*/
/* 初始化tbl_alarm_item2unit_conf数据                              */
/*==============================================================*/
insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (1, 1, null, '保护开关', null, 54, null, null, null, 60, 200, 1, 0, 1.000, 0, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (2, 1, null, '保护开关', null, 54, null, null, null, 60, 300, 1, 0, 1.000, 4, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (3, 1, null, 'A相电压', null, 6, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (4, 1, null, 'A相电流', null, 8, 50.000, 5.000, 2.000, 600, 100, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (5, 1, null, 'B相电压', null, 10, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (6, 1, null, 'B相电流', null, 12, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (7, 1, null, 'C相电压', null, 14, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (8, 1, null, 'C相电流', null, 16, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (9, 1, null, '平均电压', null, 18, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (10, 1, null, '平均电流', null, 20, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (11, 1, null, '总功率', null, 22, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (12, 1, null, '变频器运行状态', null, 2, null, null, null, 600, 100, 1, 1, 3.000, null, 1, 1);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (13, 1, null, '变频器运行状态', null, 2, null, null, null, 600, 100, 1, 1, 4.000, null, 1, 1);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (14, 1, null, '变频器运行状态', null, 2, null, null, null, 600, 100, 1, 1, 5.000, null, 1, 1);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (15, 1, null, '上线', null, 0, null, null, null, 600, 200, 1, 3, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (16, 1, null, '离线', null, 0, null, null, null, 600, 100, 1, 3, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (17, 2, null, 'A相电压', null, 6, 380.000, 200.000, 20.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (18, 2, null, 'A相电流', null, 8, 50.000, 5.000, 2.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (19, 2, null, 'B相电压', null, 10, 380.000, 200.000, 20.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (20, 2, null, 'B相电流', null, 12, 50.000, 5.000, 2.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (21, 2, null, '离线', null, 0, null, null, null, 600, 200, 1, 3, null, null, 0, 0);

/*==============================================================*/
/* 初始化tbl_protocolinstance数据                                          */
/*==============================================================*/
insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (1, '飞舟泵产品采控实例一', 'instance1', 'private-kd93', 'modbus-rtu', null, null, null, null, 1, 1, 0);

insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (2, '飞舟泵产品采控实例二', 'instance2', 'private-lq1000', 'modbus-rtu', null, null, null, null, 2, 1, 0);

insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (3, '飞舟泵产品采控实例三', 'instance3', 'modbus-tcp', 'modbus-tcp', null, null, null, null, 3, 1, 0);

insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (4, '飞舟管产品采控实例一', 'instance4', 'private-kd93', 'modbus-tcp', null, null, null, null, 1, 2, 1);

/*==============================================================*/
/* 初始化tbl_protocolalarminstance数据                                          */
/*==============================================================*/
insert into tbl_protocolalarminstance (ID, NAME, CODE, ALARMUNITID, DEVICETYPE, SORT)
values (1, '飞舟泵产品报警实例一', 'alarminstance1', 1, 0, 1);

insert into tbl_protocolalarminstance (ID, NAME, CODE, ALARMUNITID, DEVICETYPE, SORT)
values (2, '飞舟管产品报警实例一', 'alarminstance2', 2, 1, 1);


/*==============================================================*/
/* 初始化tbl_protocolsmsinstance数据                                          */
/*==============================================================*/
insert into tbl_protocolsmsinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SORT)
values (1, '短信实例LQ1000', 'smsinstance1', 'private-lq1000', 'private-lq1000', 1);


/*==============================================================*/
/* 初始化tbl_code数据                                          */
/*==============================================================*/
insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (862, 'ACTION', '添加设备', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (863, 'ACTION', '修改设备', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (864, 'ACTION', '删除设备', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (865, 'ACTION', '控制设备', null, null, '3', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (475, 'BJJB', '正常', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (259, 'BJJB', '一级报警', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (260, 'BJJB', '二级报警', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (261, 'BJJB', '三级报警', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (506, 'BJJB', '离线', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (250, 'BJLX', '通信报警', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (251, 'BJLX', '采集报警', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (252, 'BJLX', '视频和RFID报警', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (253, 'BJLX', '视频报警', null, null, '301', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (254, 'BJLX', 'RFID报警', null, null, '302', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (255, 'BJLX', '视频和RFID报警', null, null, '303', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (256, 'BJLX', '工况报警', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (257, 'BJLX', '平衡报警', null, null, '500', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (258, 'BJLX', '设备报警', null, null, '600', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (81, 'BJLX', '载荷传感器报警', null, null, '601', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (82, 'BJLX', '压力传感器报警', null, null, '602', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (83, 'BJLX', '温度传感器报警', null, null, '603', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (61, 'BJLX', '波动报警', null, null, '700', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (735, 'BJLX', '电参报警', null, null, '800', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (795, 'BJLX', '运行状态报警', null, null, '900', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (796, 'BJQJYS', '000000', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (797, 'BJQJYS', 'ffffff', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (798, 'BJQJYS', 'ffffff', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (799, 'BJQJYS', '000000', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (962, 'BJQJYS2', '000000', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (963, 'BJQJYS2', 'dc2828', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (964, 'BJQJYS2', 'f09614', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (965, 'BJQJYS2', 'fae600', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (975, 'BJQJYS3', '000000', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (976, 'BJQJYS3', 'dc2828', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (977, 'BJQJYS3', 'f09614', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (978, 'BJQJYS3', 'fae600', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (476, 'BJYS', '00ff00', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (477, 'BJYS', 'dc2828', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (478, 'BJYS', 'f09614', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (479, 'BJYS', 'fae600', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (507, 'BJYS', '#808080', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (966, 'BJYS2', '00ff00', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (967, 'BJYS2', 'dc2828', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (968, 'BJYS2', 'f09614', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (969, 'BJYS2', 'fae600', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (970, 'BJYS2', '#808080', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (979, 'BJYS3', '00ff00', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (980, 'BJYS3', 'dc2828', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (981, 'BJYS3', 'f09614', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (982, 'BJYS3', 'fae600', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (983, 'BJYS3', '#808080', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (804, 'BJYSTMD', '0', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (805, 'BJYSTMD', '1', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (806, 'BJYSTMD', '1', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (807, 'BJYSTMD', '1', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (971, 'BJYSTMD2', '0', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (972, 'BJYSTMD2', '0', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (973, 'BJYSTMD2', '0', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (974, 'BJYSTMD2', '0', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (984, 'BJYSTMD3', '0', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (985, 'BJYSTMD3', '0', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (986, 'BJYSTMD3', '0', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (987, 'BJYSTMD3', '0', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (271, 'BJZT', '正常', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (272, 'BJZT', '报警', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (882, 'DEVICETYPE', '泵设备', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (883, 'DEVICETYPE', '管设备', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (922, 'DEVICETYPE', '短信设备', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (838, 'JSBZ', '请求数据读取失败', null, null, '-44', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (837, 'JSBZ', '请求数据解码失败', null, null, '-55', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (836, 'JSBZ', '井数许可超限', null, null, '-66', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (835, 'JSBZ', '计算异常', null, null, '-77', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (839, 'JSBZ', '相应数据编码失败', null, null, '-88', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (265, 'JSBZ', '数据校验错误', null, null, '-99', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (263, 'JSBZ', '未计算', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (264, 'JSBZ', '计算成功', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (179, 'LiftingType', '自喷', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (180, 'LiftingType', '泡排', null, null, '101', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (181, 'LiftingType', '抽油机', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (182, 'LiftingType', '常规抽油机', null, null, '201', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (183, 'LiftingType', '异相型抽油机', null, null, '202', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (184, 'LiftingType', '双驴头抽油机', null, null, '203', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (185, 'LiftingType', '下偏杠铃抽油机', null, null, '204', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (186, 'LiftingType', '调径变矩抽油机', null, null, '205', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (187, 'LiftingType', '立式皮带机', null, null, '206', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (188, 'LiftingType', '立式链条机', null, null, '207', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (189, 'LiftingType', '直线驱抽油机', null, null, '208', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (190, 'LiftingType', '电潜泵', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (191, 'LiftingType', '螺杆泵', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (192, 'LiftingType', '地面驱螺杆泵', null, null, '401', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (193, 'LiftingType', '井下驱螺杆泵', null, null, '402', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (194, 'LiftingType', '水力活塞泵', null, null, '500', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (195, 'LiftingType', '水力射流泵', null, null, '600', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (196, 'LiftingType', '气举', null, null, '700', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (197, 'LiftingType', '柱塞气举', null, null, '701', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (311, 'LiftingType', '其他', null, null, '800', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (391, 'MD_TYPE', '启用模块', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (393, 'MD_TYPE', '备用模块', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (371, 'ORG_TYPE', '集团', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (372, 'ORG_TYPE', '局级', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (373, 'ORG_TYPE', '厂级', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (374, 'ORG_TYPE', '矿级', null, null, '3', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (375, 'ORG_TYPE', '队级', null, null, '4', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (376, 'ORG_TYPE', '工区', null, null, '5', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (377, 'ORG_TYPE', '集气站', null, null, '6', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (378, 'ORG_TYPE', '其他', null, null, '7', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (860, 'PROTOCOL', 'modbus-tcp', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (861, 'PROTOCOL', 'modbus-rtu', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (431, 'ROLE_FLAG', '集团', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (432, 'ROLE_FLAG', '下属部门', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (884, 'SYSTEMACTION', '用户登录', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (885, 'SYSTEMACTION', '用户退出', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1002, 'USER_TITLE', '中控室', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1003, 'USER_TITLE', '工况巡检一组', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1004, 'USER_TITLE', '工况巡检二组', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1005, 'USER_TITLE', '工况巡检三组', null, null, '3', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1006, 'USER_TITLE', '工况巡检四组', null, null, '4', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1007, 'USER_TITLE', '其他', null, null, '5', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (411, 'USER_TYPE', '数据分析员', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (412, 'USER_TYPE', '系统管理员', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (413, 'USER_TYPE', '数据管理员', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (902, 'alarmType', '通信状态报警', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (903, 'alarmType', '数值量报警', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (942, 'alarmType', '枚举量报警', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (943, 'alarmType', '开关量报警', null, null, '3', null);
