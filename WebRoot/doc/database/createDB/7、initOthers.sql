/*==============================================================*/
/* ��ʼ��tbl_org����                                          */
/*==============================================================*/
insert into tbl_org (ORG_ID, ORG_CODE, ORG_NAME, ORG_MEMO, ORG_PARENT, ORG_SEQ, ORG_FLAG, ORG_REALID, ORG_LEVEL, ORG_TYPE, ORG_COORDX, ORG_COORDY, SHOW_LEVEL)
values (1, '0000', '��֯���ڵ�', '��֯���ڵ�', 0, null, null, null, 7, 7, 0.000000, 0.000000, 1);

/*==============================================================*/
/* ��ʼ��tbl_acq_group_conf����                                          */
/*==============================================================*/
insert into TBL_ACQ_GROUP_CONF (ID, GROUP_CODE, GROUP_NAME, ACQ_CYCLE, SAVE_CYCLE, PROTOCOL, REMARK, TYPE)
values (1, 'group1', '���۱ò�Ʒ�ɼ���', 60, 60, '���۱ò�ƷЭ��', '���۱ò�Ʒ�ɼ���', 0);

insert into TBL_ACQ_GROUP_CONF (ID, GROUP_CODE, GROUP_NAME, ACQ_CYCLE, SAVE_CYCLE, PROTOCOL, REMARK, TYPE)
values (2, 'group2', '���۹ܲ�Ʒ�ɼ���', 60, 60, '���۹ܲ�ƷЭ��', '���۹ܲ�Ʒ�ɼ���', 0);

insert into TBL_ACQ_GROUP_CONF (ID, GROUP_CODE, GROUP_NAME, ACQ_CYCLE, SAVE_CYCLE, PROTOCOL, REMARK, TYPE)
values (3, 'group3', '���۱ò�Ʒ������', 0, 0, '���۱ò�ƷЭ��', '���۱ò�Ʒ������', 1);

/*==============================================================*/
/* ��ʼ��tbl_acq_unit_conf����                                    */
/*==============================================================*/
insert into TBL_ACQ_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (1, 'unit1', '���۱ò�Ʒ�ɿص�Ԫ', '���۱ò�ƷЭ��', '���۱ò�Ʒ�ɼ���Ԫ');

insert into TBL_ACQ_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (2, 'unit2', '���۹ܲ�Ʒ�ɿص�Ԫ', '���۹ܲ�ƷЭ��', '���۹ܲ�Ʒ�ɼ���Ԫ');

/*==============================================================*/
/* ��ʼ��tbl_acq_item2group_conf����                                          */
/*==============================================================*/
insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (1, null, '�豸�ͺű�ʶλ', null, '0,0,0', 1, 5, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (2, null, '��Ƶ������״̬', null, '0,0,0', 1, 1, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (3, null, '��Ƶ�����ϴ���', null, '0,0,0', 1, 3, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (4, null, 'A���ѹ', null, '0,0,0', 1, 16, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (5, null, 'A�����', null, '0,0,0', 1, 19, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (6, null, 'B���ѹ', null, '0,0,0', 1, 17, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (7, null, 'B�����', null, '0,0,0', 1, 20, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (8, null, 'C���ѹ', null, '0,0,0', 1, 18, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (9, null, 'C�����', null, '0,0,0', 1, 21, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (10, null, 'ƽ����ѹ', null, '0,0,0', 1, 10, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (11, null, 'ƽ������', null, '0,0,0', 1, 11, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (12, null, '�ܹ���', null, '0,0,0', 1, 12, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (13, null, '�ϼƹ�������', null, '0,0,0', 1, 15, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (14, null, '��Ƶ��', null, '0,0,0', 1, 2, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (15, null, '�ܵ���', null, '0,0,0', 1, 13, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (16, null, '���ۼ�ʱ��', null, '0,0,0', 1, 14, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (17, null, '�����¶�', null, '0,0,0', 1, 22, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (18, null, '����ѹ��', null, '0,0,0', 1, 23, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (19, null, '�����¶�', null, '0,0,0', 1, 25, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (20, null, '����ѹ��', null, '0,0,0', 1, 26, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (21, null, '�׹�ѹ��', null, '0,0,0', 1, 27, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (22, null, '�����¶�', null, '0,0,0', 1, 24, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (23, null, '���ƾ����¶�', null, '0,0,0', 1, 28, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (24, null, '���ƾ���ѹ��', null, '0,0,0', 1, 29, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (25, null, '���ƹ�����', null, '0,0,0', 1, 30, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (26, null, '��������', null, '0,0,0', 1, 31, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (27, null, '��������', null, '0,0,0', 1, 34, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (28, null, '��������', null, '0,0,0', 1, 37, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (29, null, '��������', null, '0,0,0', 1, 40, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (30, null, '��������', null, '0,0,0', 1, 43, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (31, null, '��������', null, '0,0,0', 1, 46, 6);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (32, null, '��������', null, '0,0,0', 1, 49, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (33, null, '��������', null, '0,0,0', 1, 52, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (34, null, '��������', null, '0,0,0', 1, 55, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (35, null, '��������', null, '0,0,0', 1, 58, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (36, null, '��������', null, '0,0,0', 1, 61, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (37, null, '��������', null, '0,0,0', 1, 64, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (38, null, '��������', null, '0,0,0', 1, 67, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (39, null, '��������', null, '0,0,0', 1, 70, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (40, null, '����ִ��״̬', null, '0,0,0', 1, 73, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (41, null, '����ִ��״̬', null, '0,0,0', 1, 74, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (42, null, '����ִ��״̬', null, '0,0,0', 1, 75, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (43, null, '����ִ��״̬', null, '0,0,0', 1, 76, 3);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (44, null, '����ִ��״̬', null, '0,0,0', 1, 77, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (45, null, '����ִ��״̬', null, '0,0,0', 1, 78, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (46, null, '����ִ��״̬', null, '0,0,0', 1, 79, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (47, null, '����ִ��״̬', null, '0,0,0', 1, 80, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (48, null, '����ִ��״̬', null, '0,0,0', 1, 81, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (49, null, '����ִ��״̬', null, '0,0,0', 1, 82, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (50, null, '����ִ��״̬', null, '0,0,0', 1, 83, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (51, null, '����ִ��״̬', null, '0,0,0', 1, 84, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (52, null, '����ִ��״̬', null, '0,0,0', 1, 85, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (53, null, '����ִ��״̬', null, '0,0,0', 1, 86, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (54, null, 'Ƿѹ����ֵ', null, '0,0,0', 1, 50, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (55, null, 'Ƿѹ��ʱֵ', null, '0,0,0', 1, 51, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (56, null, '��ѹ����ֵ', null, '0,0,0', 1, 53, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (57, null, '��ѹ��ʱֵ', null, '0,0,0', 1, 54, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (58, null, 'Ƿ�ر���ֵ', null, '0,0,0', 1, 56, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (59, null, 'Ƿ����ʱֵ', null, '0,0,0', 1, 57, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (60, null, '���ر���ֵ', null, '0,0,0', 1, 59, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (61, null, '������ʱֵ', null, '0,0,0', 1, 60, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (62, null, '��ѹ��ƽ�Ᵽ��ֵ', null, '0,0,0', 1, 62, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (63, null, '��ѹ��ƽ����ʱֵ', null, '0,0,0', 1, 63, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (64, null, '������ƽ�Ᵽ��ֵ', null, '0,0,0', 1, 65, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (65, null, '������ƽ����ʱֵ', null, '0,0,0', 1, 66, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (66, null, '�����¶ȱ���ֵ', null, '0,0,0', 1, 68, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (67, null, '�����¶ȱ�����ʱֵ', null, '0,0,0', 1, 69, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (68, null, '����ѹ������ֵ', null, '0,0,0', 1, 71, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (69, null, '����ѹ��������ʱֵ', null, '0,0,0', 1, 72, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (70, null, '�����¶ȱ���ֵ', null, '0,0,0', 1, 32, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (71, null, '�����¶ȱ�����ʱֵ', null, '0,0,0', 1, 33, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (72, null, '���þ����¶ȱ���ֵ', null, '0,0,0', 1, 41, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (73, null, '���þ����¶ȱ�����ʱֵ', null, '0,0,0', 1, 42, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (74, null, '����ѹ������ֵ', null, '0,0,0', 1, 35, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (75, null, '����ѹ��������ʱֵ', null, '0,0,0', 1, 36, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (76, null, '���ƾ���ѹ������ֵ', null, '0,0,0', 1, 38, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (77, null, '���ƾ���ѹ��������ʱֵ', null, '0,0,0', 1, 39, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (78, null, 'Һ�汣��ֵ', null, '0,0,0', 1, 44, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (79, null, 'Һ�汣����ʱֵ', null, '0,0,0', 1, 45, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (80, null, '����Һ�汣��ֵ', null, '0,0,0', 1, 47, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (81, null, '����Һ�汣����ʱֵ', null, '0,0,0', 1, 48, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (82, null, '����ģʽ', null, '0,0,0', 1, 88, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (83, null, '��Ъ����ʱ��', null, '0,0,0', 1, 91, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (84, null, '��Ъͣ��ʱ��', null, '0,0,0', 1, 94, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (85, null, 'Ŀ�꾮��ѹ��', null, '0,0,0', 1, 92, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (86, null, '����Ŀ�꾮��ѹ��', null, '0,0,0', 1, 95, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (87, null, 'Ŀ��Һ�����', null, '0,0,0', 1, 93, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (88, null, '����Ŀ��Һ�����', null, '0,0,0', 1, 96, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (89, null, '����汾��', null, '0,0,0', 1, 6, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (90, null, '����ѹ��', null, '0,0,0', 1, 7, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (91, null, '����˲ʱ����', null, '0,0,0', 1, 8, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (92, null, '�����ۼ�����', null, '0,0,0', 1, 9, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (93, null, '˲ʱ����', null, '0,0,0', 1, 4, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (94, null, '�豸�ͺű�ʶλ', null, '0,0,0', 2, 5, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (95, null, '��Ƶ������״̬', null, '0,0,0', 2, 1, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (96, null, '��Ƶ�����ϴ���', null, '0,0,0', 2, 3, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (97, null, 'A���ѹ', null, '0,0,0', 2, 16, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (98, null, 'A�����', null, '0,0,0', 2, 19, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (99, null, 'B���ѹ', null, '0,0,0', 2, 17, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (100, null, 'B�����', null, '0,0,0', 2, 20, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (101, null, 'C���ѹ', null, '0,0,0', 2, 18, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (102, null, 'C�����', null, '0,0,0', 2, 21, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (103, null, 'ƽ����ѹ', null, '0,0,0', 2, 10, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (104, null, 'ƽ������', null, '0,0,0', 2, 11, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (105, null, '�ܹ���', null, '0,0,0', 2, 12, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (106, null, '�ϼƹ�������', null, '0,0,0', 2, 15, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (107, null, '��Ƶ��', null, '0,0,0', 2, 2, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (108, null, '�ܵ���', null, '0,0,0', 2, 13, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (109, null, '���ۼ�ʱ��', null, '0,0,0', 2, 14, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (110, null, '�����¶�', null, '0,0,0', 2, 22, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (111, null, '����ѹ��', null, '0,0,0', 2, 23, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (112, null, '�����¶�', null, '0,0,0', 2, 25, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (113, null, '����ѹ��', null, '0,0,0', 2, 26, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (114, null, '�׹�ѹ��', null, '0,0,0', 2, 27, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (115, null, '�����¶�', null, '0,0,0', 2, 24, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (116, null, '���ƾ����¶�', null, '0,0,0', 2, 28, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (117, null, '���ƾ���ѹ��', null, '0,0,0', 2, 29, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (118, null, '���ƹ�����', null, '0,0,0', 2, 30, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (119, null, '��������', null, '0,0,0', 2, 31, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (120, null, '��������', null, '0,0,0', 2, 34, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (121, null, '��������', null, '0,0,0', 2, 37, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (122, null, '��������', null, '0,0,0', 2, 40, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (123, null, '��������', null, '0,0,0', 2, 43, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (124, null, '��������', null, '0,0,0', 2, 46, 6);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (125, null, '��������', null, '0,0,0', 2, 49, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (126, null, '��������', null, '0,0,0', 2, 52, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (127, null, '��������', null, '0,0,0', 2, 55, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (128, null, '��������', null, '0,0,0', 2, 58, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (129, null, '��������', null, '0,0,0', 2, 61, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (130, null, '��������', null, '0,0,0', 2, 64, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (131, null, '��������', null, '0,0,0', 2, 67, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (132, null, '��������', null, '0,0,0', 2, 70, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (133, null, '����ִ��״̬', null, '0,0,0', 2, 73, 0);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (134, null, '����ִ��״̬', null, '0,0,0', 2, 74, 1);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (135, null, '����ִ��״̬', null, '0,0,0', 2, 75, 2);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (136, null, '����ִ��״̬', null, '0,0,0', 2, 76, 3);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (137, null, '����ִ��״̬', null, '0,0,0', 2, 77, 4);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (138, null, '����ִ��״̬', null, '0,0,0', 2, 78, 5);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (139, null, '����ִ��״̬', null, '0,0,0', 2, 79, 8);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (140, null, '����ִ��״̬', null, '0,0,0', 2, 80, 9);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (141, null, '����ִ��״̬', null, '0,0,0', 2, 81, 10);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (142, null, '����ִ��״̬', null, '0,0,0', 2, 82, 11);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (143, null, '����ִ��״̬', null, '0,0,0', 2, 83, 12);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (144, null, '����ִ��״̬', null, '0,0,0', 2, 84, 13);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (145, null, '����ִ��״̬', null, '0,0,0', 2, 85, 14);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (146, null, '����ִ��״̬', null, '0,0,0', 2, 86, 15);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (147, null, 'Ƿѹ����ֵ', null, '0,0,0', 2, 50, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (148, null, 'Ƿѹ��ʱֵ', null, '0,0,0', 2, 51, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (149, null, '��ѹ����ֵ', null, '0,0,0', 2, 53, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (150, null, '��ѹ��ʱֵ', null, '0,0,0', 2, 54, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (151, null, 'Ƿ�ر���ֵ', null, '0,0,0', 2, 56, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (152, null, 'Ƿ����ʱֵ', null, '0,0,0', 2, 57, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (153, null, '���ر���ֵ', null, '0,0,0', 2, 59, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (154, null, '������ʱֵ', null, '0,0,0', 2, 60, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (155, null, '��ѹ��ƽ�Ᵽ��ֵ', null, '0,0,0', 2, 62, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (156, null, '��ѹ��ƽ����ʱֵ', null, '0,0,0', 2, 63, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (157, null, '������ƽ�Ᵽ��ֵ', null, '0,0,0', 2, 65, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (158, null, '������ƽ����ʱֵ', null, '0,0,0', 2, 66, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (159, null, '�����¶ȱ���ֵ', null, '0,0,0', 2, 68, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (160, null, '�����¶ȱ�����ʱֵ', null, '0,0,0', 2, 69, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (161, null, '����ѹ������ֵ', null, '0,0,0', 2, 71, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (162, null, '����ѹ��������ʱֵ', null, '0,0,0', 2, 72, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (163, null, '�����¶ȱ���ֵ', null, '0,0,0', 2, 32, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (164, null, '�����¶ȱ�����ʱֵ', null, '0,0,0', 2, 33, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (165, null, '���þ����¶ȱ���ֵ', null, '0,0,0', 2, 41, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (166, null, '���þ����¶ȱ�����ʱֵ', null, '0,0,0', 2, 42, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (167, null, '����ѹ������ֵ', null, '0,0,0', 2, 35, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (168, null, '����ѹ��������ʱֵ', null, '0,0,0', 2, 36, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (169, null, '���ƾ���ѹ������ֵ', null, '0,0,0', 2, 38, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (170, null, '���ƾ���ѹ��������ʱֵ', null, '0,0,0', 2, 39, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (171, null, 'Һ�汣��ֵ', null, '0,0,0', 2, 44, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (172, null, 'Һ�汣����ʱֵ', null, '0,0,0', 2, 45, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (173, null, '����Һ�汣��ֵ', null, '0,0,0', 2, 47, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (174, null, '����Һ�汣����ʱֵ', null, '0,0,0', 2, 48, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (175, null, '����ģʽ', null, '0,0,0', 2, 88, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (176, null, '��Ъ����ʱ��', null, '0,0,0', 2, 91, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (177, null, '��Ъͣ��ʱ��', null, '0,0,0', 2, 94, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (178, null, 'Ŀ�꾮��ѹ��', null, '0,0,0', 2, 92, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (179, null, '����Ŀ�꾮��ѹ��', null, '0,0,0', 2, 95, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (180, null, 'Ŀ��Һ�����', null, '0,0,0', 2, 93, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (181, null, '����Ŀ��Һ�����', null, '0,0,0', 2, 96, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (182, null, '����汾��', null, '0,0,0', 2, 6, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (183, null, '����ѹ��', null, '0,0,0', 2, 7, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (184, null, '����˲ʱ����', null, '0,0,0', 2, 8, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (185, null, '�����ۼ�����', null, '0,0,0', 2, 9, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (186, null, '˲ʱ����', null, '0,0,0', 2, 4, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (187, null, 'Ƿѹ��������', null, '0,0,0', 3, 1, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (188, null, '�趨Ƿѹ����ֵ', null, '0,0,0', 3, 2, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (189, null, '�趨Ƿѹ������ʱֵ', null, '0,0,0', 3, 3, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (190, null, '�趨����ģʽ', null, '0,0,0', 3, 4, null);

insert into TBL_ACQ_ITEM2GROUP_CONF (ID, ITEMID, ITEMNAME, ITEMCODE, MATRIX, GROUPID, SORT, BITINDEX)
values (191, null, '�趨����Ƶ��', null, '0,0,0', 3, 5, null);

/*==============================================================*/
/* ��ʼ��tbl_acq_group2unit_conf����                              */
/*==============================================================*/
insert into TBL_ACQ_GROUP2UNIT_CONF (ID, GROUPID, MATRIX, UNITID)
values (1, 1, '0,0,0', 1);

insert into TBL_ACQ_GROUP2UNIT_CONF (ID, GROUPID, MATRIX, UNITID)
values (2, 2, '0,0,0', 2);

insert into TBL_ACQ_GROUP2UNIT_CONF (ID, GROUPID, MATRIX, UNITID)
values (3, 3, '0,0,0', 1);


/*==============================================================*/
/* ��ʼ��tbl_alarm_unit_conf����                              */
/*==============================================================*/
insert into TBL_ALARM_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (1, 'group1', '���۱ò�Ʒ������Ԫ', '���۱ò�ƷЭ��', null);

insert into TBL_ALARM_UNIT_CONF (ID, UNIT_CODE, UNIT_NAME, PROTOCOL, REMARK)
values (2, 'group2', '���۹ܲ�Ʒ������Ԫ', '���۹ܲ�ƷЭ��', null);

/*==============================================================*/
/* ��ʼ��tbl_alarm_item2unit_conf����                              */
/*==============================================================*/
insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (1, 1, null, '��������', null, 54, null, null, null, 60, 200, 1, 0, 1.000, 0, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (2, 1, null, '��������', null, 54, null, null, null, 60, 300, 1, 0, 1.000, 4, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (3, 1, null, 'A���ѹ', null, 6, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (4, 1, null, 'A�����', null, 8, 50.000, 5.000, 2.000, 600, 100, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (5, 1, null, 'B���ѹ', null, 10, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (6, 1, null, 'B�����', null, 12, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (7, 1, null, 'C���ѹ', null, 14, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (8, 1, null, 'C�����', null, 16, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (9, 1, null, 'ƽ����ѹ', null, 18, 380.000, 200.000, 20.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (10, 1, null, 'ƽ������', null, 20, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (11, 1, null, '�ܹ���', null, 22, 50.000, 5.000, 2.000, 600, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (12, 1, null, '��Ƶ������״̬', null, 2, null, null, null, 600, 100, 1, 1, 3.000, null, 1, 1);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (13, 1, null, '��Ƶ������״̬', null, 2, null, null, null, 600, 100, 1, 1, 4.000, null, 1, 1);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (14, 1, null, '��Ƶ������״̬', null, 2, null, null, null, 600, 100, 1, 1, 5.000, null, 1, 1);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (15, 1, null, '����', null, 0, null, null, null, 600, 200, 1, 3, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (16, 1, null, '����', null, 0, null, null, null, 600, 100, 1, 3, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (17, 2, null, 'A���ѹ', null, 6, 380.000, 200.000, 20.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (18, 2, null, 'A�����', null, 8, 50.000, 5.000, 2.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (19, 2, null, 'B���ѹ', null, 10, 380.000, 200.000, 20.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (20, 2, null, 'B�����', null, 12, 50.000, 5.000, 2.000, 60, 200, 1, 2, null, null, 0, 0);

insert into tbl_alarm_item2unit_conf (ID, UNITID, ITEMID, ITEMNAME, ITEMCODE, ITEMADDR, UPPERLIMIT, LOWERLIMIT, HYSTERSIS, DELAY, ALARMLEVEL, ALARMSIGN, TYPE, VALUE, BITINDEX, ISSENDMESSAGE, ISSENDMAIL)
values (21, 2, null, '����', null, 0, null, null, null, 600, 200, 1, 3, null, null, 0, 0);

/*==============================================================*/
/* ��ʼ��tbl_protocolinstance����                                          */
/*==============================================================*/
insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (1, '���۱ò�Ʒ�ɿ�ʵ��һ', 'instance1', 'private-kd93', 'modbus-rtu', null, null, null, null, 1, 1, 0);

insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (2, '���۱ò�Ʒ�ɿ�ʵ����', 'instance2', 'private-lq1000', 'modbus-rtu', null, null, null, null, 2, 1, 0);

insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (3, '���۱ò�Ʒ�ɿ�ʵ����', 'instance3', 'modbus-tcp', 'modbus-tcp', null, null, null, null, 3, 1, 0);

insert into tbl_protocolinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SIGNINPREFIX, SIGNINSUFFIX, HEARTBEATPREFIX, HEARTBEATSUFFIX, SORT, UNITID, DEVICETYPE)
values (4, '���۹ܲ�Ʒ�ɿ�ʵ��һ', 'instance4', 'private-kd93', 'modbus-tcp', null, null, null, null, 1, 2, 1);

/*==============================================================*/
/* ��ʼ��tbl_protocolalarminstance����                                          */
/*==============================================================*/
insert into tbl_protocolalarminstance (ID, NAME, CODE, ALARMUNITID, DEVICETYPE, SORT)
values (1, '���۱ò�Ʒ����ʵ��һ', 'alarminstance1', 1, 0, 1);

insert into tbl_protocolalarminstance (ID, NAME, CODE, ALARMUNITID, DEVICETYPE, SORT)
values (2, '���۹ܲ�Ʒ����ʵ��һ', 'alarminstance2', 2, 1, 1);


/*==============================================================*/
/* ��ʼ��tbl_protocolsmsinstance����                                          */
/*==============================================================*/
insert into tbl_protocolsmsinstance (ID, NAME, CODE, ACQPROTOCOLTYPE, CTRLPROTOCOLTYPE, SORT)
values (1, '����ʵ��LQ1000', 'smsinstance1', 'private-lq1000', 'private-lq1000', 1);


/*==============================================================*/
/* ��ʼ��tbl_code����                                          */
/*==============================================================*/
insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (862, 'ACTION', '����豸', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (863, 'ACTION', '�޸��豸', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (864, 'ACTION', 'ɾ���豸', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (865, 'ACTION', '�����豸', null, null, '3', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (475, 'BJJB', '����', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (259, 'BJJB', 'һ������', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (260, 'BJJB', '��������', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (261, 'BJJB', '��������', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (506, 'BJJB', '����', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (250, 'BJLX', 'ͨ�ű���', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (251, 'BJLX', '�ɼ�����', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (252, 'BJLX', '��Ƶ��RFID����', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (253, 'BJLX', '��Ƶ����', null, null, '301', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (254, 'BJLX', 'RFID����', null, null, '302', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (255, 'BJLX', '��Ƶ��RFID����', null, null, '303', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (256, 'BJLX', '��������', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (257, 'BJLX', 'ƽ�ⱨ��', null, null, '500', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (258, 'BJLX', '�豸����', null, null, '600', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (81, 'BJLX', '�غɴ���������', null, null, '601', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (82, 'BJLX', 'ѹ������������', null, null, '602', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (83, 'BJLX', '�¶ȴ���������', null, null, '603', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (61, 'BJLX', '��������', null, null, '700', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (735, 'BJLX', '��α���', null, null, '800', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (795, 'BJLX', '����״̬����', null, null, '900', null);

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
values (271, 'BJZT', '����', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (272, 'BJZT', '����', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (882, 'DEVICETYPE', '���豸', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (883, 'DEVICETYPE', '���豸', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (922, 'DEVICETYPE', '�����豸', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (838, 'JSBZ', '�������ݶ�ȡʧ��', null, null, '-44', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (837, 'JSBZ', '�������ݽ���ʧ��', null, null, '-55', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (836, 'JSBZ', '������ɳ���', null, null, '-66', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (835, 'JSBZ', '�����쳣', null, null, '-77', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (839, 'JSBZ', '��Ӧ���ݱ���ʧ��', null, null, '-88', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (265, 'JSBZ', '����У�����', null, null, '-99', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (263, 'JSBZ', 'δ����', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (264, 'JSBZ', '����ɹ�', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (179, 'LiftingType', '����', null, null, '100', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (180, 'LiftingType', '����', null, null, '101', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (181, 'LiftingType', '���ͻ�', null, null, '200', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (182, 'LiftingType', '������ͻ�', null, null, '201', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (183, 'LiftingType', '�����ͳ��ͻ�', null, null, '202', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (184, 'LiftingType', '˫¿ͷ���ͻ�', null, null, '203', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (185, 'LiftingType', '��ƫ������ͻ�', null, null, '204', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (186, 'LiftingType', '������س��ͻ�', null, null, '205', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (187, 'LiftingType', '��ʽƤ����', null, null, '206', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (188, 'LiftingType', '��ʽ������', null, null, '207', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (189, 'LiftingType', 'ֱ�������ͻ�', null, null, '208', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (190, 'LiftingType', '��Ǳ��', null, null, '300', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (191, 'LiftingType', '�ݸ˱�', null, null, '400', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (192, 'LiftingType', '�������ݸ˱�', null, null, '401', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (193, 'LiftingType', '�������ݸ˱�', null, null, '402', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (194, 'LiftingType', 'ˮ��������', null, null, '500', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (195, 'LiftingType', 'ˮ��������', null, null, '600', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (196, 'LiftingType', '����', null, null, '700', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (197, 'LiftingType', '��������', null, null, '701', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (311, 'LiftingType', '����', null, null, '800', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (391, 'MD_TYPE', '����ģ��', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (393, 'MD_TYPE', '����ģ��', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (371, 'ORG_TYPE', '����', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (372, 'ORG_TYPE', '�ּ�', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (373, 'ORG_TYPE', '����', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (374, 'ORG_TYPE', '��', null, null, '3', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (375, 'ORG_TYPE', '�Ӽ�', null, null, '4', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (376, 'ORG_TYPE', '����', null, null, '5', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (377, 'ORG_TYPE', '����վ', null, null, '6', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (378, 'ORG_TYPE', '����', null, null, '7', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (860, 'PROTOCOL', 'modbus-tcp', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (861, 'PROTOCOL', 'modbus-rtu', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (431, 'ROLE_FLAG', '����', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (432, 'ROLE_FLAG', '��������', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (884, 'SYSTEMACTION', '�û���¼', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (885, 'SYSTEMACTION', '�û��˳�', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1002, 'USER_TITLE', '�п���', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1003, 'USER_TITLE', '����Ѳ��һ��', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1004, 'USER_TITLE', '����Ѳ�����', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1005, 'USER_TITLE', '����Ѳ������', null, null, '3', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1006, 'USER_TITLE', '����Ѳ������', null, null, '4', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (1007, 'USER_TITLE', '����', null, null, '5', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (411, 'USER_TYPE', '���ݷ���Ա', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (412, 'USER_TYPE', 'ϵͳ����Ա', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (413, 'USER_TYPE', '���ݹ���Ա', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (902, 'alarmType', 'ͨ��״̬����', null, null, '0', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (903, 'alarmType', '��ֵ������', null, null, '1', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (942, 'alarmType', 'ö��������', null, null, '2', null);

insert into tbl_code (ID, ITEMCODE, ITEMNAME, REMARK, STATE, ITEMVALUE, TABLECODE)
values (943, 'alarmType', '����������', null, null, '3', null);
