/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     2021-10-20                                    */
/*==============================================================*/

/*==============================================================*/
/* Table: TBL_ACQ_GROUP_CONF                                  */
/*==============================================================*/
create table TBL_ACQ_GROUP_CONF
(
  id         NUMBER(10) not null,
  group_code VARCHAR2(50) not null,
  group_name VARCHAR2(50),
  acq_cycle  NUMBER(10) default 1,
  save_cycle NUMBER(10) default 5,
  protocol   VARCHAR2(50),
  remark     VARCHAR2(2000),
  type       NUMBER(1) default 0
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_GROUP_CONF
  add constraint PK_ACQUISITIONGROUP primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ACQ_UNIT_CONF                                  */
/*==============================================================*/
create table TBL_ACQ_UNIT_CONF
(
  id        NUMBER(10) not null,
  unit_code VARCHAR2(50) not null,
  unit_name VARCHAR2(50),
  protocol  VARCHAR2(50),
  remark    VARCHAR2(2000)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_UNIT_CONF
  add constraint PK_T_ACQUISITIONUNIT primary key (ID)
/

/*==============================================================*/
/* Table: TBL_ACQ_ITEM2GROUP_CONF                                  */
/*==============================================================*/
create table TBL_ACQ_ITEM2GROUP_CONF
(
  id       NUMBER(10) not null,
  itemid   NUMBER(10),
  itemname VARCHAR2(100),
  itemcode VARCHAR2(100),
  matrix   VARCHAR2(8),
  groupid  NUMBER(10) not null
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_ITEM2GROUP_CONF
  add constraint PK_ACQ_GROUP_ITEM primary key (ID)
/
create index IDX_ACQ_GROUP_ITEM_GROUPID on TBL_ACQ_ITEM2GROUP_CONF (GROUPID)
/
create index IDX_ACQ_GROUP_ITEM_ITEMID on TBL_ACQ_ITEM2GROUP_CONF (ITEMID)
/

/*==============================================================*/
/* Table: TBL_ACQ_GROUP2UNIT_CONF                                    */
/*==============================================================*/
create table TBL_ACQ_GROUP2UNIT_CONF
(
  id      NUMBER(10) not null,
  groupid NUMBER(10) not null,
  matrix  VARCHAR2(8) not null,
  unitid  NUMBER(10) not null
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ACQ_GROUP2UNIT_CONF add constraint PK_ACQ_UNIT_GROUP primary key (ID)
/
create index IDX_ACQ_UNIT_GROUP_GROUPID on TBL_ACQ_GROUP2UNIT_CONF (GROUPID)
/
create index IDX_ACQ_UNIT_GROUP_UNITID on TBL_ACQ_GROUP2UNIT_CONF (UNITID)
/



/*==============================================================*/
/* Table: TBL_ALARMINFO                               */
/*==============================================================*/
create table TBL_ALARMINFO
(
  id           NUMBER(10) not null,
  wellid       NUMBER(10),
  alarmtime    DATE,
  itemname     VARCHAR2(100),
  alarmtype    NUMBER(1),
  alarmvalue   NUMBER(10,3),
  alarminfo    VARCHAR2(100),
  alarmlimit   NUMBER(10,3),
  hystersis    NUMBER(10,3),
  alarmlevel   NUMBER(3),
  recoverytime DATE
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ALARMINFO
  add constraint PK_ALARMINFO primary key (ID)
/
create index IDX_ALARMINFO_LEVEL on TBL_ALARMINFO (ALARMLEVEL)
/
create index IDX_ALARMINFO_TIME on TBL_ALARMINFO (ALARMTIME)
/
create index IDX_ALARMINFO_TYPE on TBL_ALARMINFO (ALARMTYPE)
/
create index IDX_ALARMINFO_WELLID on TBL_ALARMINFO (WELLID)
/

/*==============================================================*/
/* Table: TBL_ALARM_UNIT_CONF                                    */
/*==============================================================*/
create table TBL_ALARM_UNIT_CONF
(
  id        NUMBER(10) not null,
  unit_code VARCHAR2(50) not null,
  unit_name VARCHAR2(50),
  protocol  VARCHAR2(50),
  remark    VARCHAR2(2000)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ALARM_UNIT_CONF
  add constraint PK_TBL_ALARM_UNIT_CONF primary key (ID)
/
create index IDX_ALARM_UNIT_PROROCOL on TBL_ALARM_UNIT_CONF (PROTOCOL)
/

/*==============================================================*/
/* Table: TBL_ALARM_ITEM2UNIT_CONF                                    */
/*==============================================================*/
create table TBL_ALARM_ITEM2UNIT_CONF
(
  id         NUMBER(10) not null,
  unitid     NUMBER(10) not null,
  itemid     NUMBER(10),
  itemname   VARCHAR2(100),
  itemcode   VARCHAR2(100),
  itemaddr   NUMBER(10),
  upperlimit NUMBER(10,3),
  lowerlimit NUMBER(10,3),
  hystersis  NUMBER(10,3),
  delay      NUMBER(10),
  alarmlevel NUMBER(3),
  alarmsign  NUMBER(1),
  type       NUMBER(1),
  value      NUMBER(10,3),
  bitindex   NUMBER(3)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ALARM_ITEM2UNIT_CONF
  add constraint PK_ALARM_ITEM2UNIT_CONF primary key (ID)
/
create index IDX_ALARM_ITEM2UNIT_UNIT on TBL_ALARM_ITEM2UNIT_CONF (UNITID)
/

/*==============================================================*/
/* Table: TBL_CODE                                    */
/*==============================================================*/
create table TBL_CODE
(
  id        NUMBER(10) not null,
  itemcode  VARCHAR2(200),
  itemname  VARCHAR2(200),
  remark    VARCHAR2(200),
  state     NUMBER(10),
  itemvalue VARCHAR2(20),
  tablecode VARCHAR2(200)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_CODE
  add constraint PK_T_CODE primary key (ID)
/
create index IDX_000_01_DM on TBL_CODE (ITEMVALUE)
/
create index IDX_000_01_SJXDM on TBL_CODE (ITEMCODE)
/
create index IDX_000_01_ZT on TBL_CODE (STATE)
/

/*==============================================================*/
/* Table: TBL_DEVICEOPERATIONLOG                                    */
/*==============================================================*/
create table TBL_DEVICEOPERATIONLOG
(
  id         NUMBER(10) not null,
  wellname   VARCHAR2(20),
  createtime DATE,
  user_id    VARCHAR2(20),
  loginip    VARCHAR2(20),
  action     NUMBER(2),
  remark     VARCHAR2(200),
  devicetype NUMBER(2)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DEVICEOPERATIONLOG
  add constraint PK_TBL_DEVICEOPERATIONLOG primary key (ID)
/
create index IDX_DEVICEOPERATIONLOG_ACTION on TBL_DEVICEOPERATIONLOG (ACTION)
/
create index IDX_DEVICEOPERATIONLOG_TIME on TBL_DEVICEOPERATIONLOG (CREATETIME)
/
create index IDX_DEVICEOPERATIONLOG_USERID on TBL_DEVICEOPERATIONLOG (USER_ID)
/
create index IDX_DEVICEOPERATIONLOG_WELLID on TBL_DEVICEOPERATIONLOG (WELLNAME)
/

/*==============================================================*/
/* Table: TBL_DIST_NAME                                    */
/*==============================================================*/
create table TBL_DIST_NAME
(
  sysdataid  VARCHAR2(32) not null,
  tenantid   VARCHAR2(50),
  cname      VARCHAR2(50),
  ename      VARCHAR2(50),
  sorts      NUMBER,
  status     NUMBER,
  creator    VARCHAR2(50),
  updateuser VARCHAR2(50),
  updatetime DATE default sysdate not null,
  createdate DATE default sysdate
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DIST_NAME
  add constraint PK_SYSTEMDATAINFO primary key (SYSDATAID)
/

/*==============================================================*/
/* Table: TBL_DIST_ITEM                                    */
/*==============================================================*/
create table TBL_DIST_ITEM
(
  dataitemid VARCHAR2(32) not null,
  tenantid   VARCHAR2(50),
  sysdataid  VARCHAR2(50),
  cname      VARCHAR2(50),
  ename      VARCHAR2(200),
  datavalue  VARCHAR2(200),
  sorts      NUMBER,
  status     NUMBER,
  creator    VARCHAR2(50),
  updateuser VARCHAR2(50),
  updatetime DATE default sysdate,
  createdate DATE default sysdate
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_DIST_ITEM
  add constraint PK_DATAITEMSINFO primary key (DATAITEMID)
/
alter table TBL_DIST_ITEM
  add constraint FK_PK_DATAITEMSINFO_SYSID foreign key (SYSDATAID)
/

/*==============================================================*/
/* Table: TBL_MODULE                                    */
/*==============================================================*/
create table TBL_MODULE
(
  md_id       NUMBER(10) not null,
  md_parentid NUMBER(10) default 0 not null,
  md_name     VARCHAR2(100) not null,
  md_showname VARCHAR2(100),
  md_url      VARCHAR2(200),
  md_code     VARCHAR2(200),
  md_seq      NUMBER(20),
  md_level    NUMBER(10),
  md_flag     NUMBER(10),
  md_icon     VARCHAR2(100),
  md_type     NUMBER(1) default 0,
  md_control  VARCHAR2(100)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_MODULE
  add constraint P_MD primary key (MD_ID)
/
create index INDEXD_MODULE_MDCODE on TBL_MODULE (MD_CODE)
/
create index INDEX_MODULE_PARENTID on TBL_MODULE (MD_PARENTID)
/

/*==============================================================*/
/* Table: TBL_ROLE                                    */
/*==============================================================*/
create table TBL_ROLE
(
  role_id     NUMBER(10) not null,
  role_code   VARCHAR2(50) not null,
  role_name   VARCHAR2(40) not null,
  role_flag   NUMBER(10),
  remark      VARCHAR2(2000),
  receivesms  NUMBER(10) default 0,
  receivemail NUMBER(10) default 0
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ROLE
  add constraint PK_ROLE_ID primary key (ROLE_ID)
/
create index IDX_ROLE_CODE on TBL_ROLE (ROLE_CODE)
/

/*==============================================================*/
/* Table: TBL_MODULE2ROLE                                    */
/*==============================================================*/
create table TBL_MODULE2ROLE
(
  rm_moduleid NUMBER(10) not null,
  rm_matrix   VARCHAR2(8) not null,
  rm_id       NUMBER(10) not null,
  rm_roleid   NUMBER(10) not null
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_MODULE2ROLE
  add constraint PK_RM_ID primary key (RM_ID)
/
alter table TBL_MODULE2ROLE
  add constraint FK_ORG_MODULEID foreign key (RM_MODULEID)
  references TBL_MODULE (MD_ID) on delete cascade
/
alter table TBL_MODULE2ROLE
  add constraint FK_ORG_ROLEID foreign key (RM_ROLEID)
  references TBL_ROLE (ROLE_ID) on delete cascade
/
create index IDX_RM_MODULEID on TBL_MODULE2ROLE (RM_MODULEID)
/

/*==============================================================*/
/* Table: TBL_ORG                                    */
/*==============================================================*/
create table TBL_ORG
(
  org_id     NUMBER(10) not null,
  org_code   VARCHAR2(20),
  org_name   VARCHAR2(100) not null,
  org_memo   VARCHAR2(4000),
  org_parent NUMBER(10) default 0 not null,
  org_seq    NUMBER(10),
  org_flag   CHAR(1) default '1',
  org_realid NUMBER(10),
  org_level  NUMBER(1),
  org_type   NUMBER(1) default '1',
  org_coordx NUMBER(10,6) default 0.00,
  org_coordy NUMBER(10,6) default 0.00,
  show_level NUMBER(2) default 1
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_ORG
  add constraint PK_SC_ORG primary key (ORG_ID)
/
create unique index IDX_ORG_CODE on TBL_ORG (ORG_CODE)
/
create index IDX_ORG_CODE_PARENT on TBL_ORG (ORG_CODE, ORG_PARENT)
/
create index IDX_ORG_PARENT on TBL_ORG (ORG_PARENT)
/

/*==============================================================*/
/* Table: TBL_PIPELINEACQDATA_HIST                                    */
/*==============================================================*/
create table TBL_PIPELINEACQDATA_HIST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB,
  addr0              VARCHAR2(50),
  addr2              VARCHAR2(50),
  addr4              VARCHAR2(50),
  addr6              VARCHAR2(50),
  addr8              VARCHAR2(50),
  addr10             VARCHAR2(50),
  addr12             VARCHAR2(50),
  addr14             VARCHAR2(50),
  addr16             VARCHAR2(50),
  addr18             VARCHAR2(50),
  addr20             VARCHAR2(50),
  addr22             VARCHAR2(50),
  addr24             VARCHAR2(50),
  addr26             VARCHAR2(50),
  addr28             VARCHAR2(50),
  addr30             VARCHAR2(50),
  addr32             VARCHAR2(50),
  addr34             VARCHAR2(50),
  addr36             VARCHAR2(50),
  addr38             VARCHAR2(50),
  addr40             VARCHAR2(50),
  addr42             VARCHAR2(50),
  addr48             VARCHAR2(50),
  addr50             VARCHAR2(50),
  addr52             VARCHAR2(50),
  addr54             VARCHAR2(50),
  addr56             VARCHAR2(50),
  addr58             VARCHAR2(50),
  addr60             VARCHAR2(50),
  addr62             VARCHAR2(50),
  addr64             VARCHAR2(50),
  addr66             VARCHAR2(50),
  addr68             VARCHAR2(50),
  addr70             VARCHAR2(50),
  addr72             VARCHAR2(50),
  addr74             VARCHAR2(50),
  addr76             VARCHAR2(50),
  addr78             VARCHAR2(50),
  addr80             VARCHAR2(50),
  addr82             VARCHAR2(50),
  addr84             VARCHAR2(50),
  addr86             VARCHAR2(50),
  addr88             VARCHAR2(50),
  addr90             VARCHAR2(50),
  addr92             VARCHAR2(50),
  addr94             VARCHAR2(50),
  addr96             VARCHAR2(50),
  addr98             VARCHAR2(50),
  addr100            VARCHAR2(50),
  addr102            VARCHAR2(50),
  addr104            VARCHAR2(50),
  addr106            VARCHAR2(50),
  addr108            VARCHAR2(50),
  addr110            VARCHAR2(50),
  addr112            VARCHAR2(50),
  addr114            VARCHAR2(50),
  addr116            VARCHAR2(50),
  addr118            VARCHAR2(50),
  addr120            VARCHAR2(50),
  addr122            VARCHAR2(50),
  addr124            VARCHAR2(50),
  addr126            VARCHAR2(50),
  addr128            VARCHAR2(50),
  addr130            VARCHAR2(50),
  addr132            VARCHAR2(50),
  addr134            VARCHAR2(50),
  addr138            VARCHAR2(50),
  addr40201          VARCHAR2(50),
  addr40202          VARCHAR2(50),
  addr40203          VARCHAR2(50),
  addr40243          VARCHAR2(50),
  addr40251          VARCHAR2(50)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PIPELINEACQDATA_HIST
  add constraint PK_TBL_PIPELINEACQDATA_HIST primary key (ID)
/
create index IDX_PIPELINEACQDATA_H_TIME on TBL_PIPELINEACQDATA_HIST (ACQTIME)
/
create index IDX_PIPELINEACQDATA_H_WELLID on TBL_PIPELINEACQDATA_HIST (WELLID)
/

/*==============================================================*/
/* Table: TBL_PIPELINEACQDATA_LATEST                                    */
/*==============================================================*/
create table TBL_PIPELINEACQDATA_LATEST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB,
  addr0              VARCHAR2(50),
  addr2              VARCHAR2(50),
  addr4              VARCHAR2(50),
  addr6              VARCHAR2(50),
  addr8              VARCHAR2(50),
  addr10             VARCHAR2(50),
  addr12             VARCHAR2(50),
  addr14             VARCHAR2(50),
  addr16             VARCHAR2(50),
  addr18             VARCHAR2(50),
  addr20             VARCHAR2(50),
  addr22             VARCHAR2(50),
  addr24             VARCHAR2(50),
  addr26             VARCHAR2(50),
  addr28             VARCHAR2(50),
  addr30             VARCHAR2(50),
  addr32             VARCHAR2(50),
  addr34             VARCHAR2(50),
  addr36             VARCHAR2(50),
  addr38             VARCHAR2(50),
  addr40             VARCHAR2(50),
  addr42             VARCHAR2(50),
  addr48             VARCHAR2(50),
  addr50             VARCHAR2(50),
  addr52             VARCHAR2(50),
  addr54             VARCHAR2(50),
  addr56             VARCHAR2(50),
  addr58             VARCHAR2(50),
  addr60             VARCHAR2(50),
  addr62             VARCHAR2(50),
  addr64             VARCHAR2(50),
  addr66             VARCHAR2(50),
  addr68             VARCHAR2(50),
  addr70             VARCHAR2(50),
  addr72             VARCHAR2(50),
  addr74             VARCHAR2(50),
  addr76             VARCHAR2(50),
  addr78             VARCHAR2(50),
  addr80             VARCHAR2(50),
  addr82             VARCHAR2(50),
  addr84             VARCHAR2(50),
  addr86             VARCHAR2(50),
  addr88             VARCHAR2(50),
  addr90             VARCHAR2(50),
  addr92             VARCHAR2(50),
  addr94             VARCHAR2(50),
  addr96             VARCHAR2(50),
  addr98             VARCHAR2(50),
  addr100            VARCHAR2(50),
  addr102            VARCHAR2(50),
  addr104            VARCHAR2(50),
  addr106            VARCHAR2(50),
  addr108            VARCHAR2(50),
  addr110            VARCHAR2(50),
  addr112            VARCHAR2(50),
  addr114            VARCHAR2(50),
  addr116            VARCHAR2(50),
  addr118            VARCHAR2(50),
  addr120            VARCHAR2(50),
  addr122            VARCHAR2(50),
  addr124            VARCHAR2(50),
  addr126            VARCHAR2(50),
  addr128            VARCHAR2(50),
  addr130            VARCHAR2(50),
  addr132            VARCHAR2(50),
  addr134            VARCHAR2(50),
  addr138            VARCHAR2(50),
  addr40201          VARCHAR2(50),
  addr40202          VARCHAR2(50),
  addr40203          VARCHAR2(50),
  addr40243          VARCHAR2(50),
  addr40251          VARCHAR2(50)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PIPELINEACQDATA_LATEST
  add constraint PK_TBL_PIPELINEACQDATA_LATEST primary key (ID)
/
create index IDX_PIPELINEACQDATA_L_TIME on TBL_PIPELINEACQDATA_LATEST (ACQTIME)
/
create index IDX_PIPELINEACQDATA_L_WELLID on TBL_PIPELINEACQDATA_LATEST (WELLID)
/

/*==============================================================*/
/* Table: TBL_PROTOCOLALARMINSTANCE                                    */
/*==============================================================*/
create table TBL_PROTOCOLALARMINSTANCE
(
  id          NUMBER(10) not null,
  name        VARCHAR2(50),
  code        VARCHAR2(50),
  alarmunitid NUMBER(10),
  devicetype  NUMBER(1) default 0,
  sort        NUMBER(10)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PROTOCOLALARMINSTANCE
  add constraint PK_PROTOCOLALARMINSTANCE primary key (ID)
/
create index IDX_ALARMINSTANCE_UNITID on TBL_PROTOCOLALARMINSTANCE (ALARMUNITID)
/
create index IDX_ALARMINSTANCE_TYPE on TBL_PROTOCOLALARMINSTANCE (DEVICETYPE)
/

/*==============================================================*/
/* Table: TBL_PROTOCOLINSTANCE                                    */
/*==============================================================*/
create table TBL_PROTOCOLINSTANCE
(
  id               NUMBER(10) not null,
  name             VARCHAR2(50),
  code             VARCHAR2(50),
  acqprotocoltype  VARCHAR2(50),
  ctrlprotocoltype VARCHAR2(50),
  signinprefix     VARCHAR2(50),
  signinsuffix     VARCHAR2(50),
  heartbeatprefix  VARCHAR2(50),
  heartbeatsuffix  VARCHAR2(50),
  sort             NUMBER(10),
  unitid           NUMBER(10),
  devicetype       NUMBER(1) default 0
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PROTOCOLINSTANCE
  add constraint PK_PROTOCOLINSTANCE primary key (ID)
/
create index IDX_PROTOCOLINSTANCE_TYPE on TBL_PROTOCOLINSTANCE (DEVICETYPE)
/
create index IDX_PROTOCOLINSTANCE_UNIT on TBL_PROTOCOLINSTANCE (UNITID)
/

/*==============================================================*/
/* Table: TBL_PROTOCOLSMSINSTANCE                                    */
/*==============================================================*/
create table TBL_PROTOCOLSMSINSTANCE
(
  id               NUMBER(10) not null,
  name             VARCHAR2(50),
  code             VARCHAR2(50),
  acqprotocoltype  VARCHAR2(50),
  ctrlprotocoltype VARCHAR2(50),
  sort             NUMBER(10)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PROTOCOLSMSINSTANCE
  add constraint PK_PROTOCOLSMSINSTANCE primary key (ID)
/

/*==============================================================*/
/* Table: TBL_PUMPACQDATA_HIST                                    */
/*==============================================================*/
create table TBL_PUMPACQDATA_HIST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB,
  addr0              VARCHAR2(50),
  addr2              VARCHAR2(50),
  addr4              VARCHAR2(50),
  addr6              VARCHAR2(50),
  addr8              VARCHAR2(50),
  addr10             VARCHAR2(50),
  addr12             VARCHAR2(50),
  addr14             VARCHAR2(50),
  addr16             VARCHAR2(50),
  addr18             VARCHAR2(50),
  addr20             VARCHAR2(50),
  addr22             VARCHAR2(50),
  addr24             VARCHAR2(50),
  addr26             VARCHAR2(50),
  addr28             VARCHAR2(50),
  addr30             VARCHAR2(50),
  addr32             VARCHAR2(50),
  addr34             VARCHAR2(50),
  addr36             VARCHAR2(50),
  addr38             VARCHAR2(50),
  addr40             VARCHAR2(50),
  addr42             VARCHAR2(50),
  addr48             VARCHAR2(50),
  addr50             VARCHAR2(50),
  addr52             VARCHAR2(50),
  addr54             VARCHAR2(50),
  addr56             VARCHAR2(50),
  addr58             VARCHAR2(50),
  addr60             VARCHAR2(50),
  addr62             VARCHAR2(50),
  addr64             VARCHAR2(50),
  addr66             VARCHAR2(50),
  addr68             VARCHAR2(50),
  addr70             VARCHAR2(50),
  addr72             VARCHAR2(50),
  addr74             VARCHAR2(50),
  addr76             VARCHAR2(50),
  addr78             VARCHAR2(50),
  addr80             VARCHAR2(50),
  addr82             VARCHAR2(50),
  addr84             VARCHAR2(50),
  addr86             VARCHAR2(50),
  addr88             VARCHAR2(50),
  addr90             VARCHAR2(50),
  addr92             VARCHAR2(50),
  addr94             VARCHAR2(50),
  addr96             VARCHAR2(50),
  addr98             VARCHAR2(50),
  addr100            VARCHAR2(50),
  addr102            VARCHAR2(50),
  addr104            VARCHAR2(50),
  addr106            VARCHAR2(50),
  addr108            VARCHAR2(50),
  addr110            VARCHAR2(50),
  addr112            VARCHAR2(50),
  addr114            VARCHAR2(50),
  addr116            VARCHAR2(50),
  addr118            VARCHAR2(50),
  addr120            VARCHAR2(50),
  addr122            VARCHAR2(50),
  addr124            VARCHAR2(50),
  addr126            VARCHAR2(50),
  addr128            VARCHAR2(50),
  addr130            VARCHAR2(50),
  addr132            VARCHAR2(50),
  addr134            VARCHAR2(50),
  addr138            VARCHAR2(50),
  addr40201          VARCHAR2(50),
  addr40202          VARCHAR2(50),
  addr40203          VARCHAR2(50),
  addr40243          VARCHAR2(50),
  addr40251          VARCHAR2(50)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PUMPACQDATA_HIST
  add constraint PK_TBL_PUMPACQDATA_HIST primary key (ID)
/
create index IDX_PUMPACQDATA_HIST_TIME on TBL_PUMPACQDATA_HIST (ACQTIME)
/
create index IDX_PUMPACQDATA_HIST_WELLID on TBL_PUMPACQDATA_HIST (WELLID)
/

/*==============================================================*/
/* Table: TBL_PUMPACQDATA_LATEST                                    */
/*==============================================================*/
create table TBL_PUMPACQDATA_LATEST
(
  id                 NUMBER(10) not null,
  wellid             NUMBER(10),
  acqtime            DATE,
  commstatus         NUMBER(2) default 0,
  commtime           NUMBER(8,2) default 0,
  commtimeefficiency NUMBER(10,4) default 0,
  commrange          CLOB,
  runstatus          NUMBER(2) default 0,
  runtimeefficiency  NUMBER(10,4) default 0,
  runtime            NUMBER(8,2) default 0,
  runrange           CLOB,
  addr0              VARCHAR2(50),
  addr2              VARCHAR2(50),
  addr4              VARCHAR2(50),
  addr6              VARCHAR2(50),
  addr8              VARCHAR2(50),
  addr10             VARCHAR2(50),
  addr12             VARCHAR2(50),
  addr14             VARCHAR2(50),
  addr16             VARCHAR2(50),
  addr18             VARCHAR2(50),
  addr20             VARCHAR2(50),
  addr22             VARCHAR2(50),
  addr24             VARCHAR2(50),
  addr26             VARCHAR2(50),
  addr28             VARCHAR2(50),
  addr30             VARCHAR2(50),
  addr32             VARCHAR2(50),
  addr34             VARCHAR2(50),
  addr36             VARCHAR2(50),
  addr38             VARCHAR2(50),
  addr40             VARCHAR2(50),
  addr42             VARCHAR2(50),
  addr48             VARCHAR2(50),
  addr50             VARCHAR2(50),
  addr52             VARCHAR2(50),
  addr54             VARCHAR2(50),
  addr56             VARCHAR2(50),
  addr58             VARCHAR2(50),
  addr60             VARCHAR2(50),
  addr62             VARCHAR2(50),
  addr64             VARCHAR2(50),
  addr66             VARCHAR2(50),
  addr68             VARCHAR2(50),
  addr70             VARCHAR2(50),
  addr72             VARCHAR2(50),
  addr74             VARCHAR2(50),
  addr76             VARCHAR2(50),
  addr78             VARCHAR2(50),
  addr80             VARCHAR2(50),
  addr82             VARCHAR2(50),
  addr84             VARCHAR2(50),
  addr86             VARCHAR2(50),
  addr88             VARCHAR2(50),
  addr90             VARCHAR2(50),
  addr92             VARCHAR2(50),
  addr94             VARCHAR2(50),
  addr96             VARCHAR2(50),
  addr98             VARCHAR2(50),
  addr100            VARCHAR2(50),
  addr102            VARCHAR2(50),
  addr104            VARCHAR2(50),
  addr106            VARCHAR2(50),
  addr108            VARCHAR2(50),
  addr110            VARCHAR2(50),
  addr112            VARCHAR2(50),
  addr114            VARCHAR2(50),
  addr116            VARCHAR2(50),
  addr118            VARCHAR2(50),
  addr120            VARCHAR2(50),
  addr122            VARCHAR2(50),
  addr124            VARCHAR2(50),
  addr126            VARCHAR2(50),
  addr128            VARCHAR2(50),
  addr130            VARCHAR2(50),
  addr132            VARCHAR2(50),
  addr134            VARCHAR2(50),
  addr138            VARCHAR2(50),
  addr40201          VARCHAR2(50),
  addr40202          VARCHAR2(50),
  addr40203          VARCHAR2(50),
  addr40243          VARCHAR2(50),
  addr40251          VARCHAR2(50)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_PUMPACQDATA_LATEST
  add constraint PK_TBL_PUMPACQDATA_LATEST primary key (ID)
/
create index IDX_PUMPACQDATA_LATEST_TIME on TBL_PUMPACQDATA_LATEST (ACQTIME)
/
create index IDX_PUMPACQDATA_LATEST_WELLID on TBL_PUMPACQDATA_LATEST (WELLID)
/

/*==============================================================*/
/* Table: TBL_RESOURCEMONITORING                                    */
/*==============================================================*/
create table TBL_RESOURCEMONITORING
(
  ID             NUMBER(10) not null,
  ACQTIME        DATE,
  APPRUNSTATUS   NUMBER(2),
  APPVERSION     VARCHAR2(50),
  ADRUNSTATUS   NUMBER(2),
  ADVERSION     VARCHAR2(50),
  CPUUSEDPERCENT VARCHAR2(50),
  MEMUSEDPERCENT NUMBER(8,2),
  TABLESPACESIZE NUMBER(10,2)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RESOURCEMONITORING
  add constraint PK_TBL_RESOURCEMONITORING primary key (ID)
/
create index IDX_RESOURCEMONITORING_ACQTIME on TBL_RESOURCEMONITORING (ACQTIME)
/

/*==============================================================*/
/* Table: TBL_RESOURCEMONITORING                                    */
/*==============================================================*/
create table TBL_RESOURCEMONITORING
(
  id             NUMBER(10) not null,
  acqtime        DATE,
  apprunstatus   NUMBER(2),
  appversion     VARCHAR2(50),
  adrunstatus    NUMBER(2),
  adversion      VARCHAR2(50),
  cpuusedpercent VARCHAR2(50),
  memusedpercent NUMBER(8,2),
  tablespacesize NUMBER(10,2)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_RESOURCEMONITORING
  add constraint PK_TBL_RESOURCEMONITORING primary key (ID)
/
create index IDX_RESOURCEMONITORING_ACQTIME on TBL_RESOURCEMONITORING (ACQTIME)
/

/*==============================================================*/
/* Table: TBL_SYSTEMLOG                                    */
/*==============================================================*/
create table TBL_SYSTEMLOG
(
  id         NUMBER(10) not null,
  createtime DATE,
  user_id    VARCHAR2(20),
  loginip    VARCHAR2(20),
  action     NUMBER(2),
  remark     VARCHAR2(200)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_SYSTEMLOG
  add constraint PK_TBL_SYSTEMLOG primary key (ID)
/
create index IDX_SYSTEMLOG_ACTION on TBL_SYSTEMLOG (ACTION)
/
create index IDX_SYSTEMLOG_TOME on TBL_SYSTEMLOG (CREATETIME)
/
create index IDX_SYSTEMLOG_USER on TBL_SYSTEMLOG (USER_ID)
/

/*==============================================================*/
/* Table: TBL_USER                                    */
/*==============================================================*/
create table TBL_USER
(
  user_no         NUMBER(10) not null,
  user_id         VARCHAR2(20) not null,
  user_pwd        VARCHAR2(20),
  user_name       VARCHAR2(40) not null,
  user_in_email   VARCHAR2(40),
  user_out_email  VARCHAR2(100),
  user_phone      VARCHAR2(40),
  user_mobile     VARCHAR2(40),
  user_address    VARCHAR2(200),
  user_postcode   CHAR(6),
  user_title      VARCHAR2(100),
  user_type       NUMBER(10) default 1,
  user_orgid      NUMBER(10) default 0 not null,
  user_isleader   CHAR(1) default '0',
  user_regtime    DATE,
  user_style      VARCHAR2(20) default 'basic',
  user_quicklogin NUMBER(1) default 0
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_USER
  add constraint PK_USER_NO primary key (USER_NO)
/
create index IDX_REQUIREPASS on TBL_USER (USER_QUICKLOGIN)
/
create index IDX_USER_ID_PWD on TBL_USER (USER_PWD, USER_ID)
/
create index IDX_USER_ORGID on TBL_USER (USER_ORGID)
/
create index IDX_USER_PWD on TBL_USER (USER_PWD)
/
create unique index UNI_USER_ID on TBL_USER (USER_ID)
/

/*==============================================================*/
/* Table: TBL_WELLINFORMATION                                    */
/*==============================================================*/
create table TBL_WELLINFORMATION
(
 id                  NUMBER(10) not null,
  orgid               NUMBER(10),
  wellname            VARCHAR2(200) not null,
  signinid            VARCHAR2(200),
  slave               VARCHAR2(200),
  instancecode        VARCHAR2(50),
  videourl            VARCHAR2(400),
  sortnum             NUMBER(10) default 9999,
  devicetype          NUMBER(2) default 0,
  factorynumber       VARCHAR2(200),
  model               VARCHAR2(200),
  productiondate      VARCHAR2(200),
  deliverydate        VARCHAR2(200),
  commissioningdate   VARCHAR2(200),
  controlcabinetmodel VARCHAR2(200),
  pipelinelength      NUMBER(10,2),
  alarminstancecode   VARCHAR2(50)
)
tablespace AP_FB_DATA
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  )
/
alter table TBL_WELLINFORMATION
  add constraint PK_WELLINFORMATION primary key (ID)
/
create index IDX_WELLINFORMATION_NAME on TBL_WELLINFORMATION (WELLNAME)
/
create index IDX_WELLINFORMATION_ORG on TBL_WELLINFORMATION (ORGID)
/
create index IDX_WELLINFORMATION_SORT on TBL_WELLINFORMATION (SORTNUM)
/
create index IDX_WELLINFORMATION_TYPE on TBL_WELLINFORMATION (DEVICETYPE)
/

/*==============================================================*/
/* Database package: MYPACKAGE                                  */
/*==============================================================*/
create or replace package MYPACKAGE as
   type MY_CURSOR is REF CURSOR;
end MYPACKAGE;
/

create or replace package body MYPACKAGE as
   
end MYPACKAGE;
/