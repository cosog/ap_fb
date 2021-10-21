/*==============================================================*/
/* View: viw_alarminfo                                         */
/*==============================================================*/
create or replace view viw_alarminfo as
select t2.id,t2.wellid,t.wellname,
t.devicetype,t4.itemname as deviceTypeName,
t2.alarmtime,t2.itemname,t2.alarmtype,t5.itemname as alarmTypeName,
t2.alarmvalue,t2.alarminfo,t2.alarmlimit,t2.hystersis,
t2.alarmlevel,t3.itemname as alarmLevelName,
t2.recoverytime,t.orgid
 from tbl_wellinformation t,tbl_alarminfo t2 ,tbl_code t3,tbl_code t4,tbl_code t5
 where t2.wellid=t.id
 and t3.itemcode='BJJB' and t3.itemvalue=t2.alarmlevel
 and t4.itemcode='DEVICETYPE' and t4.itemvalue=t.devicetype
 and t5.itemcode='alarmType' and t5.itemvalue=t2.alarmtype;
/

/*==============================================================*/
/* View: viw_deviceoperationlog                             */
/*==============================================================*/
create or replace view viw_deviceoperationlog as
select t.id,t.devicetype,t3.itemname as deviceTypeName,
t.wellname,t.createtime,t.user_id,t.loginip,t.action,t4.itemname as actionname,t.remark ,t2.orgid as orgid
from tbl_deviceoperationlog t,tbl_code t3,tbl_code t4,tbl_wellinformation t2
where t.wellname=t2.wellname and t.devicetype=t2.devicetype
and t.devicetype=t3.itemvalue and upper(t3.itemcode)=upper('devicetype')
and t.action=t4.itemvalue and upper(t4.itemcode)=upper('action');
/

/*==============================================================*/
/* View: viw_systemlog                           */
/*==============================================================*/
create or replace view viw_systemlog as
select t.id,t.createtime,t.user_id,t.loginip,t.action,t3.itemname as actionname,t.remark ,t2.user_orgid as orgid
from tbl_systemlog t,tbl_user t2,tbl_code t3
where t.user_id=t2.user_id
and t.action=t3.itemvalue and upper(t3.itemcode)=upper('systemAction');
/

/*==============================================================*/
/* View: viw_wellinformation                                  */
/*==============================================================*/
create or replace view viw_wellinformation as
select t.id,org.org_name as orgName,org.org_id as orgid,
t.wellname,
t.devicetype,
t.signinid,t.slave,
t.videourl,
t.instancecode,
decode(t.devicetype,2,t4.name,t2.name) as instancename,
t.alarminstancecode,t3.name as alarminstancename,
t.factorynumber,t.model,t.productiondate,t.deliverydate,t.commissioningdate,t.controlcabinetmodel,
t.pipelinelength,
t.sortnum
from tbl_wellinformation t
left outer join  tbl_org org  on t.orgid=org.org_id
left outer join tbl_protocolinstance t2 on t.instancecode=t2.code
left outer join tbl_protocolalarminstance t3 on t.alarminstancecode=t3.code
left outer join tbl_protocolsmsinstance t4 on t.instancecode =t4.code;
/