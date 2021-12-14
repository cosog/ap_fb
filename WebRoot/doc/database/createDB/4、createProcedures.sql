create or replace function BlobToClob(blob_in IN BLOB)
RETURN CLOB AS
    v_clob    CLOB;
    v_varchar VARCHAR2(32767);
    v_start   PLS_INTEGER := 1;
    v_buffer  PLS_INTEGER := 32767;
BEGIN
    DBMS_LOB.CREATETEMPORARY(v_clob, TRUE);
    FOR i IN 1 .. CEIL(DBMS_LOB.GETLENGTH(blob_in) / v_buffer) LOOP
        v_varchar := UTL_RAW.CAST_TO_VARCHAR2(DBMS_LOB.SUBSTR(blob_in,
                                                              v_buffer,
                                                              v_start));
        DBMS_LOB.WRITEAPPEND(v_clob, LENGTH(v_varchar), v_varchar);
        DBMS_OUTPUT.PUT_LINE(v_varchar);
        v_start := v_start + v_buffer;
    END LOOP;
    RETURN v_clob;
END BlobToClob;
/


create or replace function GETELEMENTFROMARRAYBYINDEX(Liststr in varchar2,sPlitVal in varchar2,iPos integer)
return varchar2 is
  /*
  Liststr--传入将要被分割的字符串
  sPlitVal--用来分割的字符串
  iPos--获取分割后的数组中该位置的元素值

  */
  type tt_type is table of varchar2(100) INDEX BY BINARY_INTEGER;
  V1 tt_type;
  --FieldNames转化为数组
  TmpStr varchar2(100);
  Str    varchar2(4000);
  j      integer;
begin
  Str := Liststr;
  j   := 0;
  IF Instr(Liststr, sPlitVal, 1, 1) = 0 THEN
    V1(j) := Liststr;
    j := j + 1;
  else
    While Instr(str, sPlitVal, 1, 1) > 0 Loop
      TmpStr := Substr(str, 1, Instr(str, sPlitVal, 1, 1) - 1);

      V1(j) := TmpStr;
      str := SubStr(Str,
                    Instr(str, sPlitVal, 1, 1) + length(sPlitVal),
                    length(str));
      j := j + 1;
    end loop;
    if not str is null then
      --将最后一个保存
      V1(j) := str;
      j := j + 1;
    end if;
  end if;
  if iPos > j - 1 or iPos < 0 then
    --超出数组长度
    return '';
  end if;
  return V1(ipos);
end;
/

CREATE OR REPLACE PROCEDURE prd_reset_sequence (sequencename IN VARCHAR2) as
  curr_val INTEGER;
BEGIN
  EXECUTE IMMEDIATE 'alter sequence ' || sequencename || ' MINVALUE 0';
  EXECUTE IMMEDIATE 'alter sequence ' || sequencename || ' cache 20';
  EXECUTE IMMEDIATE 'SELECT ' || sequencename || '.nextval FROM dual'
    INTO curr_val;
  EXECUTE IMMEDIATE 'alter sequence ' || sequencename || ' increment by -' ||
                    curr_val;
  EXECUTE IMMEDIATE 'SELECT ' || sequencename || '.nextval FROM dual'
    INTO curr_val;
  EXECUTE IMMEDIATE 'alter sequence ' || sequencename || ' increment by 1';
END prd_reset_sequence;
/

CREATE OR REPLACE PROCEDURE prd_clear_data is
begin
--清空所有数据
EXECUTE IMMEDIATE 'truncate table tbl_pumpacqdata_latest';
EXECUTE IMMEDIATE 'truncate table tbl_pumpacqdata_hist';
EXECUTE IMMEDIATE 'truncate table tbl_pumpalarminfo_latest';
EXECUTE IMMEDIATE 'truncate table tbl_pumpalarminfo_hist';
EXECUTE IMMEDIATE 'truncate table tbl_pipelineacqdata_latest';
EXECUTE IMMEDIATE 'truncate table tbl_pipelineacqdata_hist';
EXECUTE IMMEDIATE 'truncate table tbl_pipelinealarminfo_latest';
EXECUTE IMMEDIATE 'truncate table tbl_pipelinepalarminfo_hist';
EXECUTE IMMEDIATE 'truncate table tbl_deviceoperationlog';
EXECUTE IMMEDIATE 'truncate table tbl_systemlog';
EXECUTE IMMEDIATE 'truncate table tbl_resourcemonitoring';
EXECUTE IMMEDIATE 'truncate table tbl_pumpdevice';
EXECUTE IMMEDIATE 'truncate table tbl_pipelinedevice';
EXECUTE IMMEDIATE 'truncate table tbl_sysdevice';

--重置所有序列
 prd_reset_sequence('seq_pumpacqdata_latest');
 prd_reset_sequence('seq_pumpacqdata_hist');
 prd_reset_sequence('seq_pumpalarminfo_latest');
 prd_reset_sequence('seq_pumpalarminfo_hist');
 prd_reset_sequence('seq_pipelineacqdata_latest');
 prd_reset_sequence('seq_pipelineacqdata_hist');
 prd_reset_sequence('seq_pipelinealarminfo_latest');
 prd_reset_sequence('seq_pipelinealarminfo_hist');
 prd_reset_sequence('seq_deviceoperationlog');
 prd_reset_sequence('seq_systemlog');
 prd_reset_sequence('seq_resourcemonitoring');
 prd_reset_sequence('seq_pumpdevice');
 prd_reset_sequence('seq_pipelinedevice');
 prd_reset_sequence('seq_sysdevice');
end prd_clear_data;
/

CREATE OR REPLACE PROCEDURE prd_save_pumpdevice (v_orgname   in varchar2,
                                                    v_wellName    in varchar2,
                                                    v_devicetype in NUMBER,
                                                    v_applicationScenariosName    in varchar2,
                                                    v_instance    in varchar2,
                                                    v_alarmInstance    in varchar2,
                                                    v_signInId    in varchar2,
                                                    v_slave   in varchar2,
                                                    v_videoUrl   in varchar2,
                                                    v_sortNum  in NUMBER,
                                                    v_orgId in varchar2,
                                                    v_license  in NUMBER) as
  wellcount number :=0;
  wellamount number :=0;
  pumpDeviceAmount number :=0;
  pipelineDeviceAmount number :=0;
  orgcount number :=0;
  otherCount number :=0;
  p_orgId number :=0;
  p_msg varchar2(3000) := 'error';
  p_sql varchar2(3000);
begin
  --验证权限
  p_sql:='select count(*)  from tbl_org t where t.org_name='''||v_orgname||''' and t.org_id in ('||v_orgId||')';
  EXECUTE IMMEDIATE p_sql into orgcount;
  p_sql:='select count(*)  from tbl_pumpdevice t where t.wellname='''||v_wellName||''' and  t.orgid not in ('||v_orgId||')';
  EXECUTE IMMEDIATE p_sql into otherCount;
  select count(1) into pumpDeviceAmount from tbl_pumpdevice t ;
  select count(1) into pipelineDeviceAmount from tbl_pipelinedevice t ;
  wellamount :=pumpDeviceAmount+pipelineDeviceAmount;
    if orgcount=1 and otherCount=0 then
        p_sql:='select t.org_id  from tbl_org t where t.org_name='''||v_orgname||''' and t.org_id in ('||v_orgId||')';
        EXECUTE IMMEDIATE p_sql into p_orgId;
        select count(*) into wellcount from tbl_pumpdevice t where t.wellName=v_wellName;
        if wellcount>0 then
           Update tbl_pumpdevice t
           Set t.orgid   = p_orgId,
               t.devicetype=v_devicetype,
               t.applicationscenarios=(select c.itemvalue from tbl_code c where c.itemcode='APPLICATIONSCENARIOS' and c.itemname=v_applicationScenariosName),
               t.instancecode=decode(v_devicetype,2,(select t2.code from tbl_protocolsmsinstance t2 where t2.name=v_instance and rownum=1),(select t2.code from tbl_protocolinstance t2 where t2.name=v_instance and rownum=1)),
               t.alarminstancecode=(select t2.code from tbl_protocolalarminstance t2 where t2.name=v_alarmInstance and rownum=1),
               t.signinid=v_signInId,t.slave=v_slave,
               t.videourl=v_videourl,
               t.sortnum=v_sortNum
           Where t.wellName=v_wellName;
           commit;
           p_msg := '修改成功';
        elsif wellcount=0 then
              if v_license=0 or wellamount<v_license then
                  insert into tbl_pumpdevice(orgId,wellName,devicetype,signinid,slave,
                  videourl,Sortnum)
                  values(p_orgId,v_wellName,v_devicetype,v_signInId,v_slave,
                  v_videourl,v_sortNum);
                  commit;
                  update tbl_pumpdevice t set
                     t.applicationscenarios=(select c.itemvalue from tbl_code c where c.itemcode='APPLICATIONSCENARIOS' and c.itemname=v_applicationScenariosName),
                     t.instancecode=(select t2.code from tbl_protocolinstance t2 where t2.name=v_instance and rownum=1),
                     t.alarminstancecode=(select t2.code from tbl_protocolalarminstance t2 where t2.name=v_alarmInstance and rownum=1)
                  Where t.wellName=v_wellName;
                  commit;
                  p_msg := '添加成功';
              else
                  p_msg := '超出井数限制';
              end if;
           end if;
    elsif orgcount=0 then
           p_msg := '无权限';
    end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_pumpdevice;
/

CREATE OR REPLACE PROCEDURE prd_save_pipelinedevice (v_orgname   in varchar2,
                                                    v_wellName    in varchar2,
                                                    v_devicetype in NUMBER,
                                                    v_applicationScenariosName    in varchar2,
                                                    v_instance    in varchar2,
                                                    v_alarmInstance    in varchar2,
                                                    v_signInId    in varchar2,
                                                    v_slave   in varchar2,
                                                    v_videoUrl   in varchar2,
                                                    v_sortNum  in NUMBER,
                                                    v_orgId in varchar2,
                                                    v_license  in NUMBER) as
  wellcount number :=0;
  wellamount number :=0;
  pumpDeviceAmount number :=0;
  pipelineDeviceAmount number :=0;
  orgcount number :=0;
  otherCount number :=0;
  p_orgId number :=0;
  p_msg varchar2(3000) := 'error';
  p_sql varchar2(3000);
begin
  --验证权限
  p_sql:='select count(*)  from tbl_org t where t.org_name='''||v_orgname||''' and t.org_id in ('||v_orgId||')';
  EXECUTE IMMEDIATE p_sql into orgcount;
  p_sql:='select count(*)  from tbl_pipelinedevice t where t.wellname='''||v_wellName||''' and  t.orgid not in ('||v_orgId||')';
  EXECUTE IMMEDIATE p_sql into otherCount;
  select count(1) into pumpDeviceAmount from tbl_pumpdevice t ;
  select count(1) into pipelineDeviceAmount from tbl_pipelinedevice t ;
  wellamount :=pumpDeviceAmount+pipelineDeviceAmount;
    if orgcount=1 and otherCount=0 then
        p_sql:='select t.org_id  from tbl_org t where t.org_name='''||v_orgname||''' and t.org_id in ('||v_orgId||')';
        EXECUTE IMMEDIATE p_sql into p_orgId;
        select count(*) into wellcount from tbl_pipelinedevice t where t.wellName=v_wellName and t.devicetype=v_devicetype;
        if wellcount>0 then
           Update tbl_pipelinedevice t
           Set t.orgid   = p_orgId,
               t.devicetype=v_devicetype,
               t.applicationscenarios=(select c.itemvalue from tbl_code c where c.itemcode='APPLICATIONSCENARIOS' and c.itemname=v_applicationScenariosName),
               t.instancecode=decode(v_devicetype,2,(select t2.code from tbl_protocolsmsinstance t2 where t2.name=v_instance and rownum=1),(select t2.code from tbl_protocolinstance t2 where t2.name=v_instance and rownum=1)),
               t.alarminstancecode=(select t2.code from tbl_protocolalarminstance t2 where t2.name=v_alarmInstance and rownum=1),
               t.signinid=v_signInId,t.slave=v_slave,
               t.videourl=v_videourl,
               t.sortnum=v_sortNum
           Where t.wellName=v_wellName;
           commit;
           p_msg := '修改成功';
        elsif wellcount=0 then
              if v_license=0 or wellamount<v_license then
                  insert into tbl_pipelinedevice(orgId,wellName,devicetype,signinid,slave,
                  videourl,Sortnum)
                  values(p_orgId,v_wellName,v_devicetype,v_signInId,v_slave,
                  v_videourl,v_sortNum);
                  commit;
                  update tbl_pipelinedevice t set
                     t.applicationscenarios=(select c.itemvalue from tbl_code c where c.itemcode='APPLICATIONSCENARIOS' and c.itemname=v_applicationScenariosName),
                     t.instancecode=(select t2.code from tbl_protocolinstance t2 where t2.name=v_instance and rownum=1),
                     t.alarminstancecode=(select t2.code from tbl_protocolalarminstance t2 where t2.name=v_alarmInstance and rownum=1)
                  Where t.wellName=v_wellName;
                  commit;
                  p_msg := '添加成功';
              else
                  p_msg := '超出井数限制';
              end if;
           end if;
    elsif orgcount=0 then
           p_msg := '无权限';
    end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_pipelinedevice;
/

CREATE OR REPLACE PROCEDURE prd_save_smsdevice (v_orgname   in varchar2,
                                                    v_wellName    in varchar2,
                                                    v_instance    in varchar2,
                                                    v_signInId    in varchar2,
                                                    v_sortNum  in NUMBER,
                                                    v_orgId in varchar2) as
  wellcount number :=0;
  smsOrgId number :=0;
  orgcount number :=0;
  otherCount number :=0;
  p_msg varchar2(3000) := 'error';
  p_sql varchar2(3000);
begin
  p_sql:='select count(*)  from tbl_org t where t.org_name='''||v_orgname||''' and t.org_id in ('||v_orgId||')';
  EXECUTE IMMEDIATE p_sql into orgcount;
  p_sql:='select count(*)  from tbl_smsdevice t where t.wellname='''||v_wellName||''' and  t.orgid not in ('||v_orgId||')';
  EXECUTE IMMEDIATE p_sql into otherCount;
  if orgcount=1 and otherCount=0 then
    p_sql:='select t.org_id  from tbl_org t where t.org_name='''||v_orgname||''' and t.org_id in ('||v_orgId||')';
    EXECUTE IMMEDIATE p_sql into smsOrgId;
    select count(*) into wellcount from tbl_smsdevice t where t.wellName=v_wellName;
    if wellcount>0 then
      Update tbl_smsdevice t set
               t.orgid=smsOrgId,
               t.instancecode=(select t2.code from tbl_protocolsmsinstance t2 where t2.name=v_instance and rownum=1),
               t.signinid=v_signInId,
               t.sortnum=v_sortNum
           Where t.wellName=v_wellName;
           commit;
           p_msg := '修改成功';
    elsif wellcount=0 then
      insert into tbl_smsdevice(orgId,wellName,signinid,Sortnum)
      values(smsOrgId,v_wellName,v_signInId,v_sortNum);
      commit;
      update tbl_smsdevice t set 
             t.instancecode=(select t2.code from tbl_protocolsmsinstance t2 where t2.name=v_instance and rownum=1)
      Where t.wellName=v_wellName;
      commit;
      p_msg := '添加成功';
    end if;
  else
    p_msg:='无权限';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_smsdevice;
/

CREATE OR REPLACE PROCEDURE prd_save_auxiliarydevice (
  v_name in varchar2,
  v_type in number,
  v_model in varchar2,
  v_remark in varchar2,
  v_sort in number
  ) is
  p_msg varchar2(3000) := 'error';
  counts number :=0;
  p_wellid number :=0;
begin
  select count(1) into counts from tbl_auxiliarydevice t where t.name=v_name and t.type=v_type and t.model=v_model;
  if counts=0 then
    insert into tbl_auxiliarydevice (name,type,model,remark,sort)
    values(v_name,v_type,v_model,v_remark,v_sort);
    commit;
    p_msg := '插入成功';
  elsif counts>0 then
    update tbl_auxiliarydevice t set t.remark=v_remark,t.sort=v_sort
    where t.name=v_name and t.type=v_type and t.model=v_model;
    commit;
    p_msg := '更新成功';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_auxiliarydevice;
/

CREATE OR REPLACE PROCEDURE prd_change_pumpdevicename (v_oldWellName    in varchar2,
                                                    v_newWellName    in varchar2,
                                                    v_orgId     in varchar2) as
  wellcount number :=0;
  newwellcount number :=0;
  oldwellcount number :=0;
  newWellId number :=0;
  oldWellId number :=0;
  p_msg varchar2(3000) := 'error';
  p_sql varchar2(3000);
begin
  --验证权限,查询新改设备是否已存在与其他组织
  p_sql:='select count(*)  from tbl_pumpdevice t where t.wellname='''||v_oldWellName||''' and t.orgid not in ('||v_orgId||')';
  dbms_output.put_line('p_sql:' || p_sql);
  EXECUTE IMMEDIATE p_sql into wellcount;
  dbms_output.put_line('wellcount:' || wellcount);
  if wellcount=0 then
     select count(*) into newwellcount from tbl_pumpdevice t where t.wellName=v_newWellName;
     if newwellcount>0 then
        select id into newWellId from tbl_pumpdevice t where t.wellname=v_newWellName;
        select count(*) into oldwellcount from tbl_pumpdevice t where t.wellname=v_oldWellName;
        if oldwellcount>0 then
           select id into oldWellId from tbl_pumpdevice t where t.wellname=v_oldWellName;
           update tbl_pumpacqdata_latest t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;
           update tbl_pumpacqdata_hist t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;

           update tbl_pumpalarminfo_latest t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;
           update tbl_pumpalarminfo_hist t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;

           delete tbl_pumpdevice t where t.wellname=v_oldWellName;
           commit;
           p_msg := '新设备名存在，修改成功';
        end if;
     elsif newwellcount=0 then
        update tbl_pumpdevice t set t.wellname=v_newWellName where t.wellname=v_oldWellName;
        commit;
         p_msg := '新设备名不存在，修改成功';
     end if;

  elsif wellcount>0 then
     p_msg := '该设备已存在于其他组织下';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);

Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_change_pumpdevicename;
/

CREATE OR REPLACE PROCEDURE prd_change_pipelinedevicename (v_oldWellName    in varchar2,
                                                    v_newWellName    in varchar2,
                                                    v_orgId     in varchar2) as
  wellcount number :=0;
  newwellcount number :=0;
  oldwellcount number :=0;
  newWellId number :=0;
  oldWellId number :=0;
  p_msg varchar2(3000) := 'error';
  p_sql varchar2(3000);
begin
  --验证权限,查询新改设备是否已存在与其他组织
  p_sql:='select count(*)  from tbl_pipelinedevice t where t.wellname='''||v_oldWellName||''' and t.orgid not in ('||v_orgId||')';
  dbms_output.put_line('p_sql:' || p_sql);
  EXECUTE IMMEDIATE p_sql into wellcount;
  dbms_output.put_line('wellcount:' || wellcount);
  if wellcount=0 then
     select count(*) into newwellcount from tbl_pipelinedevice t where t.wellName=v_newWellName;
     if newwellcount>0 then
        select id into newWellId from tbl_pipelinedevice t where t.wellname=v_newWellName;
        select count(*) into oldwellcount from tbl_pipelinedevice t where t.wellname=v_oldWellName;
        if oldwellcount>0 then
           select id into oldWellId from tbl_pipelinedevice t where t.wellname=v_oldWellName;
           update tbl_pipelineacqdata_latest t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;
           update tbl_pipelineacqdata_hist t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;

           update tbl_pipelinealarminfo_latest t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;
           update tbl_pipelinealarminfo_hist t set t.wellid=newWellId where t.wellid=oldWellId;
           commit;

           delete tbl_pipelinedevice t where t.wellname=v_oldWellName;
           commit;
           p_msg := '新设备名存在，修改成功';
        end if;
     elsif newwellcount=0 then
        update tbl_pipelinedevice t set t.wellname=v_newWellName where t.wellname=v_oldWellName;
        commit;
         p_msg := '新设备名不存在，修改成功';
     end if;

  elsif wellcount>0 then
     p_msg := '该设备已存在于其他组织下';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);

Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_change_pipelinedevicename;
/

CREATE OR REPLACE PROCEDURE prd_change_smsdevicename (v_oldWellName    in varchar2,
                                                    v_newWellName    in varchar2,
                                                    v_orgId     in varchar2) as
  wellcount number :=0;
  newwellcount number :=0;
  oldwellcount number :=0;
  p_msg varchar2(3000) := 'error';
  p_sql varchar2(3000);
begin
  --验证权限,查询新改设备是否已存在与其他组织
  p_sql:='select count(*)  from tbl_smsdevice t where t.wellname='''||v_oldWellName||''' and t.orgid not in ('||v_orgId||')';
  dbms_output.put_line('p_sql:' || p_sql);
  EXECUTE IMMEDIATE p_sql into wellcount;
  dbms_output.put_line('wellcount:' || wellcount);
  if wellcount=0 then
     select count(*) into newwellcount from tbl_smsdevice t where t.wellName=v_newWellName;
     if newwellcount>0 then
        select count(*) into oldwellcount from tbl_pipelinedevice t where t.wellname=v_oldWellName;
        if oldwellcount>0 then
           delete tbl_smsdevice t where t.wellname=v_oldWellName;
           commit;
           p_msg := '新设备名存在，修改成功';
        end if;
     elsif newwellcount=0 then
        update tbl_smsdevice t set t.wellname=v_newWellName where t.wellname=v_oldWellName;
        commit;
         p_msg := '新设备名不存在，修改成功';
     end if;

  elsif wellcount>0 then
     p_msg := '该设备已存在于其他组织下';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);

Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_change_smsdevicename;
/

CREATE OR REPLACE PROCEDURE prd_change_auxiliarydevicename (v_oldlName    in varchar2,
                                                    v_newName    in varchar2) as
  newDeviceCount number :=0;
  p_msg varchar2(3000) := 'error';
begin
  select count(*) into newDeviceCount from tbl_auxiliarydevice t where t.name=v_newName;
  if newDeviceCount>0 then
    p_msg := '新设备名称已存在，不能修改';
  elsif newDeviceCount=0 then
    update tbl_auxiliarydevice t set t.name=v_newName where t.name=v_oldlName;
    commit;
    p_msg := '设备名称修改成功';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);

Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_change_auxiliarydevicename;
/

CREATE OR REPLACE PROCEDURE prd_save_alarmcolor (    overviewBackgroundColor0   in varchar2,
                                                        overviewBackgroundColor1     in varchar2,
                                                        overviewBackgroundColor2    in varchar2,
                                                        overviewBackgroundColor3     in varchar2,
                                                        overviewColor0   in varchar2,
                                                        overviewColor1     in varchar2,
                                                        overviewColor2    in varchar2,
                                                        overviewColor3     in varchar2,
                                                        overviewOpacity0   in varchar2,
                                                        overviewOpacity1     in varchar2,
                                                        overviewOpacity2    in varchar2,
                                                        overviewOpacity3     in varchar2,
                                                        
                                                        detailsBackgroundColor0   in varchar2,
                                                        detailsBackgroundColor1     in varchar2,
                                                        detailsBackgroundColor2    in varchar2,
                                                        detailsBackgroundColor3     in varchar2,
                                                        detailsColor0   in varchar2,
                                                        detailsColor1     in varchar2,
                                                        detailsColor2    in varchar2,
                                                        detailsColor3     in varchar2,
                                                        detailsOpacity0   in varchar2,
                                                        detailsOpacity1     in varchar2,
                                                        detailsOpacity2    in varchar2,
                                                        detailsOpacity3     in varchar2,
                                                        
                                                        statBackgroundColor0   in varchar2,
                                                        statBackgroundColor1     in varchar2,
                                                        statBackgroundColor2    in varchar2,
                                                        statBackgroundColor3     in varchar2,
                                                        statColor0   in varchar2,
                                                        statColor1     in varchar2,
                                                        statColor2    in varchar2,
                                                        statColor3     in varchar2,
                                                        statOpacity0   in varchar2,
                                                        statOpacity1     in varchar2,
                                                        statOpacity2    in varchar2,
                                                        statOpacity3     in varchar2) is
  p_msg varchar2(30) := 'error';
begin
    --概览
    Update tbl_code t1 set t1.itemname=overviewBackgroundColor0 where t1.itemcode='BJYS' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=overviewBackgroundColor1 where t1.itemcode='BJYS' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=overviewBackgroundColor2 where t1.itemcode='BJYS' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=overviewBackgroundColor3 where t1.itemcode='BJYS' and t1.itemvalue=300;

    Update tbl_code t1 set t1.itemname=overviewColor0 where t1.itemcode='BJQJYS' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=overviewColor1 where t1.itemcode='BJQJYS' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=overviewColor2 where t1.itemcode='BJQJYS' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=overviewColor3 where t1.itemcode='BJQJYS' and t1.itemvalue=300;

    Update tbl_code t1 set t1.itemname=overviewOpacity0 where t1.itemcode='BJYSTMD' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=overviewOpacity1 where t1.itemcode='BJYSTMD' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=overviewOpacity2 where t1.itemcode='BJYSTMD' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=overviewOpacity3 where t1.itemcode='BJYSTMD' and t1.itemvalue=300;
    
    --实时/历史
    Update tbl_code t1 set t1.itemname=detailsBackgroundColor0 where t1.itemcode='BJYS2' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=detailsBackgroundColor1 where t1.itemcode='BJYS2' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=detailsBackgroundColor2 where t1.itemcode='BJYS2' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=detailsBackgroundColor3 where t1.itemcode='BJYS2' and t1.itemvalue=300;

    Update tbl_code t1 set t1.itemname=detailsColor0 where t1.itemcode='BJQJYS2' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=detailsColor1 where t1.itemcode='BJQJYS2' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=detailsColor2 where t1.itemcode='BJQJYS2' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=detailsColor3 where t1.itemcode='BJQJYS2' and t1.itemvalue=300;

    Update tbl_code t1 set t1.itemname=detailsOpacity0 where t1.itemcode='BJYSTMD2' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=detailsOpacity1 where t1.itemcode='BJYSTMD2' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=detailsOpacity2 where t1.itemcode='BJYSTMD2' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=detailsOpacity3 where t1.itemcode='BJYSTMD2' and t1.itemvalue=300;
    --统计
    Update tbl_code t1 set t1.itemname=statBackgroundColor0 where t1.itemcode='BJYS3' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=statBackgroundColor1 where t1.itemcode='BJYS3' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=statBackgroundColor2 where t1.itemcode='BJYS3' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=statBackgroundColor3 where t1.itemcode='BJYS3' and t1.itemvalue=300;

    Update tbl_code t1 set t1.itemname=statColor0 where t1.itemcode='BJQJYS3' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=statColor1 where t1.itemcode='BJQJYS3' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=statColor2 where t1.itemcode='BJQJYS3' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=statColor3 where t1.itemcode='BJQJYS3' and t1.itemvalue=300;

    Update tbl_code t1 set t1.itemname=statOpacity0 where t1.itemcode='BJYSTMD3' and t1.itemvalue=0;
    Update tbl_code t1 set t1.itemname=statOpacity1 where t1.itemcode='BJYSTMD3' and t1.itemvalue=100;
    Update tbl_code t1 set t1.itemname=statOpacity2 where t1.itemcode='BJYSTMD3' and t1.itemvalue=200;
    Update tbl_code t1 set t1.itemname=statOpacity3 where t1.itemcode='BJYSTMD3' and t1.itemvalue=300;
    commit;
    p_msg := '修改成功';

  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_alarmcolor;
/

CREATE OR REPLACE PROCEDURE prd_save_pumpalarminfo (
  v_wellName in varchar2,
  v_deviceType in number,
  v_alarmTime in varchar2,
  v_itemName in varchar2,
  v_alarmType in number,
  v_alarmValue in number,
  v_alarmInfo in varchar2,
  v_alarmLimit in number,
  v_hystersis in number,
  v_alarmLevel in number,
  v_isSendMessage in number,
  v_isSendMail in number
  ) is
  p_msg varchar2(3000) := 'error';
  counts number :=0;
  p_wellid number :=0;
begin
  select count(1) into counts from tbl_pumpalarminfo_hist t
  where t.wellid=( select t2.id from tbl_pumpdevice t2 where t2.wellname=v_wellName and t2.devicetype=v_deviceType )
  and t.alarmtime=to_date(v_alarmTime,'yyyy-mm-dd hh24:mi:ss')
  and t.itemname=v_itemName;
  select t.id into p_wellid from tbl_pumpdevice t where t.wellname=v_wellName and t.devicetype=v_deviceType ;
  if counts=0 and p_wellid>0 then
    insert into tbl_pumpalarminfo_hist (wellid,alarmtime,itemname,alarmtype,alarmvalue,alarminfo,alarmlimit,
    hystersis,alarmlevel,issendmessage,issendmail)
    values(
         p_wellid,
         to_date(v_alarmTime,'yyyy-mm-dd hh24:mi:ss'),
         v_itemName,
         v_alarmType,
         v_alarmValue,
         v_alarmInfo,
         v_alarmLimit,
         v_hystersis,
         v_alarmLevel,
         v_isSendMessage,
         v_isSendMail
      );
    commit;
    p_msg := '插入成功';
  elsif counts>0 then
    update tbl_pumpalarminfo_hist t set t.alarmtype=v_alarmType,alarmvalue=v_alarmValue,
    alarminfo=v_alarmInfo,alarmlimit=v_alarmLimit,hystersis=v_hystersis,alarmlevel=v_alarmLevel,
    issendmessage=v_isSendMessage,issendmail=v_isSendMail
    where t.wellid=p_wellid
    and t.alarmtime=to_date(v_alarmTime,'yyyy-mm-dd hh24:mi:ss')
    and t.itemname=v_itemName;
    commit;
    p_msg := '更新成功';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_pumpalarminfo;
/

CREATE OR REPLACE PROCEDURE prd_save_pipelinealarminfo (
  v_wellName in varchar2,
  v_deviceType in number,
  v_alarmTime in varchar2,
  v_itemName in varchar2,
  v_alarmType in number,
  v_alarmValue in number,
  v_alarmInfo in varchar2,
  v_alarmLimit in number,
  v_hystersis in number,
  v_alarmLevel in number,
  v_isSendMessage in number,
  v_isSendMail in number
  ) is
  p_msg varchar2(3000) := 'error';
  counts number :=0;
  p_wellid number :=0;
begin
  select count(1) into counts from tbl_pipelinealarminfo_hist t
  where t.wellid=( select t2.id from tbl_pipelinedevice t2 where t2.wellname=v_wellName and t2.devicetype=v_deviceType )
  and t.alarmtime=to_date(v_alarmTime,'yyyy-mm-dd hh24:mi:ss')
  and t.itemname=v_itemName;
  select t.id into p_wellid from tbl_pipelinedevice t where t.wellname=v_wellName and t.devicetype=v_deviceType ;
  if counts=0 and p_wellid>0 then
    insert into tbl_pipelinealarminfo_hist (wellid,alarmtime,itemname,alarmtype,alarmvalue,alarminfo,alarmlimit,
    hystersis,alarmlevel,issendmessage,issendmail)
    values(
         p_wellid,
         to_date(v_alarmTime,'yyyy-mm-dd hh24:mi:ss'),
         v_itemName,
         v_alarmType,
         v_alarmValue,
         v_alarmInfo,
         v_alarmLimit,
         v_hystersis,
         v_alarmLevel,
         v_isSendMessage,
         v_isSendMail
      );
    commit;
    p_msg := '插入成功';
  elsif counts>0 then
    update tbl_pipelinealarminfo_hist t set t.alarmtype=v_alarmType,alarmvalue=v_alarmValue,
    alarminfo=v_alarmInfo,alarmlimit=v_alarmLimit,hystersis=v_hystersis,alarmlevel=v_alarmLevel,
    issendmessage=v_isSendMessage,issendmail=v_isSendMail
    where t.wellid=p_wellid
    and t.alarmtime=to_date(v_alarmTime,'yyyy-mm-dd hh24:mi:ss')
    and t.itemname=v_itemName;
    commit;
    p_msg := '更新成功';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_pipelinealarminfo;
/

CREATE OR REPLACE PROCEDURE prd_save_resourcemonitoring (
  v_acqTime in varchar2,
  v_appRunStatus in number,
  v_appVersion in varchar2,
  v_adRunStatus in number,
  v_adVersion in varchar2,
  v_cpuUsedPercent in varchar2,
  v_memUsedPercent in number,
  v_tableSpaceSize in number
  ) is
  p_msg varchar2(3000) := 'error';
  counts number :=0;
begin
  select count(1) into counts from tbl_resourcemonitoring;
  if counts>1000 then
    delete from TBL_RESOURCEMONITORING where id not in (select id from (select id from TBL_RESOURCEMONITORING t order by t.acqtime desc) v where rownum <=1000);
    commit;
    update TBL_RESOURCEMONITORING t
    set t.acqtime=to_date(v_acqTime,'yyyy-mm-dd hh24:mi:ss'),
        t.apprunstatus=v_appRunStatus,t.appversion=v_appVersion,t.cpuusedpercent=v_cpuUsedPercent,
        t.adrunstatus=v_adRunStatus,t.adversion=v_adVersion,
        t.memusedpercent=v_memUsedPercent,t.tablespacesize=v_tableSpaceSize
    where t.id=(select id from (select id from TBL_RESOURCEMONITORING  order by acqtime ) where rownum=1);
    commit;
     p_msg := '删除多余记录并更新成功';
  elsif counts=1000 then
    update TBL_RESOURCEMONITORING t
    set t.acqtime=to_date(v_acqTime,'yyyy-mm-dd hh24:mi:ss'),
        t.apprunstatus=v_appRunStatus,t.appversion=v_appVersion,t.cpuusedpercent=v_cpuUsedPercent,
        t.adrunstatus=v_adRunStatus,t.adversion=v_adVersion,
        t.memusedpercent=v_memUsedPercent,t.tablespacesize=v_tableSpaceSize
    where t.id=(select id from (select id from TBL_RESOURCEMONITORING  order by acqtime ) where rownum=1);
    commit;
    p_msg := '更新成功';
   elsif counts<1000 then
     insert into tbl_resourcemonitoring (
         acqtime,apprunstatus,appversion,cpuusedpercent,adrunstatus,adversion,memusedpercent,tablespacesize
      )values(
         to_date(v_acqTime,'yyyy-mm-dd hh24:mi:ss'),
         v_appRunStatus,
         v_appVersion,
         v_cpuUsedPercent,
         v_adRunStatus,
         v_adVersion,
         v_memUsedPercent,
         v_tableSpaceSize
      );
      commit;
      p_msg := '插入成功';
  end if;
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_resourcemonitoring;
/

CREATE OR REPLACE PROCEDURE prd_save_deviceOperationLog (
  v_time in varchar2,
  v_wellName in varchar2,
  v_deviceType in number,
  v_action in number,
  v_userId in varchar2,
  v_loginIp in varchar2,
  v_remark in varchar2
  ) is
  p_msg varchar2(3000) := 'error';
  counts number :=0;
  p_action number :=0;
begin
  if v_action=0 or v_action=1 then
    if v_deviceType>=100 and v_deviceType<200 then
      select count(1) into counts from tbl_pumpdevice t where t.wellname=v_wellName and t.devicetype=v_deviceType;
    elsif v_deviceType>=200 and v_deviceType<300 then
      select count(1) into counts from tbl_pipelinedevice t where t.wellname=v_wellName and t.devicetype=v_deviceType;
    elsif v_deviceType>300 then
      select count(1) into counts from tbl_smsdevice t where t.wellname=v_wellName;
    end if;
     if counts>0 then
        p_action:=1;
     elsif counts=0 then
        p_action:=0;
     end if;
  else
      p_action:=v_action;
  end if;
  dbms_output.put_line('counts:' || counts);
  dbms_output.put_line('p_action:' || p_action);
  insert into tbl_deviceoperationlog (createtime,wellname,devicetype,action,user_id,loginip,remark)
  values(
         to_date(v_time,'yyyy-mm-dd hh24:mi:ss'),
         v_wellName,
         v_deviceType,
         p_action,
         v_userId,
         v_loginIp,
         v_remark
      );
      commit;
      p_msg := '插入成功';
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_deviceOperationLog;
/

CREATE OR REPLACE PROCEDURE prd_save_systemLog (
  v_time in varchar2,
  v_action in number,
  v_userId in varchar2,
  v_loginIp in varchar2,
  v_remark in varchar2
  ) is
  p_msg varchar2(3000) := 'error';
begin
  
  insert into tbl_systemlog (createtime,action,user_id,loginip,remark)
  values(
         to_date(v_time,'yyyy-mm-dd hh24:mi:ss'),
         v_action,
         v_userId,
         v_loginIp,
         v_remark
      );
      commit;
      p_msg := '插入成功';
  dbms_output.put_line('p_msg:' || p_msg);
Exception
  When Others Then
    p_msg := Sqlerrm || ',' || '操作失败';
    dbms_output.put_line('p_msg:' || p_msg);
end prd_save_systemLog;
/