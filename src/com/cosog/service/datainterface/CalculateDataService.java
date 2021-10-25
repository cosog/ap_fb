package com.cosog.service.datainterface;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.hibernate.engine.jdbc.SerializableBlobProxy;
import org.hibernate.engine.jdbc.SerializableClobProxy;
import org.springframework.stereotype.Service;

import com.cosog.model.calculate.CommResponseData;
import com.cosog.model.calculate.TimeEffResponseData;
import com.cosog.model.drive.AcquisitionGroupResolutionData;
import com.cosog.model.drive.AcquisitionItemInfo;
import com.cosog.service.base.BaseService;
import com.cosog.utils.AlarmInfoMap;
import com.cosog.utils.Config;
import com.cosog.utils.Config2;
import com.cosog.utils.OracleJdbcUtis;
import com.cosog.utils.StringManagerUtils;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import oracle.sql.BLOB;
import oracle.sql.CLOB;

@SuppressWarnings("deprecation")
@Service("calculateDataService")
public class CalculateDataService<T> extends BaseService<T> {
	public String getDefaultWellname(String orgId){
		String sql="select v.* from "
				+ " (select t007.jh from tbl_wellinformation t007,tbl_org org where t007.dwbh=org.org_code and org.org_id in ("+orgId+") order by t007.jh) v "
				+ " where rownum<=1";
		List<?> list = this.findCallSql(sql);
		
		return list.get(0).toString();
	}
	
	public void saveAlarmInfo(String wellName,String deviceType,String acqTime,List<AcquisitionItemInfo> acquisitionItemInfoList) throws SQLException{
		getBaseDao().saveAlarmInfo(wellName,deviceType,acqTime,acquisitionItemInfoList);
	}
	
	public void saveAndSendAlarmInfo(String wellName,String deviceType,String acqTime,List<AcquisitionItemInfo> acquisitionItemInfoList) throws SQLException{
		boolean isSendSMS=false;
		boolean isSendMail=false;
		StringBuffer SMSContent = new StringBuffer();
		StringBuffer EMailContent = new StringBuffer();
		SMSContent.append(("0".equalsIgnoreCase(deviceType)?"泵":"管")+"设备"+wellName+"于"+acqTime+"发生报警:");
		Map<String, String> alarmInfoMap=AlarmInfoMap.getMapObject();
		List<AcquisitionItemInfo> saveAcquisitionItemInfoList=new ArrayList<AcquisitionItemInfo>();
		for(int i=0;i<acquisitionItemInfoList.size();i++){
			if(acquisitionItemInfoList.get(i).getAlarmLevel()>0){
				String key=wellName+","+deviceType+","+acquisitionItemInfoList.get(i).getTitle()+","+acquisitionItemInfoList.get(i).getAlarmInfo();
				String lastAlarmTime=alarmInfoMap.get(key);
				
				long timeDiff=StringManagerUtils.getTimeDifference(lastAlarmTime, acqTime, "yyyy-MM-dd HH:mm:ss");
				if(timeDiff>acquisitionItemInfoList.get(i).getAlarmDelay()*1000){
					alarmInfoMap.put(key, acqTime);
					saveAcquisitionItemInfoList.add(acquisitionItemInfoList.get(i));
					if(acquisitionItemInfoList.get(i).getIsSendMessage()==1){//如果该报警项发送短信
						isSendSMS=true;
						if(acquisitionItemInfoList.get(i).getAlarmType()==0){//开关量报警
							SMSContent.append(acquisitionItemInfoList.get(i).getTitle()+acquisitionItemInfoList.get(i).getAlarmInfo());
						}else if(acquisitionItemInfoList.get(i).getAlarmType()==1){//枚举量报警
							SMSContent.append(acquisitionItemInfoList.get(i).getTitle()+acquisitionItemInfoList.get(i).getAlarmInfo());
						}else if(acquisitionItemInfoList.get(i).getAlarmType()==2){//数值量报警
							SMSContent.append(acquisitionItemInfoList.get(i).getTitle()+acquisitionItemInfoList.get(i).getAlarmInfo()
									+",报警值"+acquisitionItemInfoList.get(i).getValue()+",限值"+acquisitionItemInfoList.get(i).getAlarmLimit()
									+",回差"+acquisitionItemInfoList.get(i).getHystersis()+";");
						}
					}
					if(acquisitionItemInfoList.get(i).getIsSendMail()==1){//如果该报警项发送邮件
						isSendMail=true;
						if(acquisitionItemInfoList.get(i).getAlarmType()==0){//开关量报警
							EMailContent.append(acquisitionItemInfoList.get(i).getTitle()+acquisitionItemInfoList.get(i).getAlarmInfo());
						}else if(acquisitionItemInfoList.get(i).getAlarmType()==1){//枚举量报警
							EMailContent.append(acquisitionItemInfoList.get(i).getTitle()+acquisitionItemInfoList.get(i).getAlarmInfo());
						}else if(acquisitionItemInfoList.get(i).getAlarmType()==2){//数值量报警
							EMailContent.append(acquisitionItemInfoList.get(i).getTitle()+acquisitionItemInfoList.get(i).getAlarmInfo()
									+",报警值"+acquisitionItemInfoList.get(i).getValue()+",限值"+acquisitionItemInfoList.get(i).getAlarmLimit()
									+",回差"+acquisitionItemInfoList.get(i).getHystersis()+";");
						}
					}
					
				}
				
			}else{
				String keyIndex=wellName+","+deviceType+","+acquisitionItemInfoList.get(i).getTitle();
//				String keyIndex=wellName+","+deviceType+","+acquisitionItemInfoList.get(i).getTitle()+","+acquisitionItemInfoList.get(i).getAlarmInfo();
				boolean reset=false;
				 for (String key : alarmInfoMap.keySet()) {
					 if(key.indexOf(keyIndex)>=0){
						 reset=true;
						 alarmInfoMap.remove(key);
						 break;
					 }
				 }
				 if(reset){
					 
				 }
			}
		}
		if(saveAcquisitionItemInfoList.size()>0){
			getBaseDao().saveAlarmInfo(wellName,deviceType,acqTime,saveAcquisitionItemInfoList);
		}
		if(isSendSMS || isSendMail){
			sendAlarmSMS(wellName,deviceType,isSendSMS,isSendMail,SMSContent.toString(),EMailContent.toString());
		}
	}
	
	public void sendAlarmSMS(String wellName,String deviceType,boolean isSendSMS,boolean isSendMail,String SMSContent,String EMailContent) throws SQLException{
		String SMSUrl=Config.getInstance().configFile.getDriverConfig().getWriteSMS();
		String userSql="select u.user_id,u.user_phone,r.receivesms,u.user_in_email,r.receivemail "
				+ " from tbl_user u,tbl_role r "
				+ " where u.user_type=r.role_id and (u.user_orgid in (select org_id from tbl_org t start with org_id=( select t2.orgid from tbl_wellinformation t2 where t2.wellname='"+wellName+"' and t2.devicetype="+deviceType+" ) connect by prior  org_parent=org_id) or u.user_orgid=0)";
		List<?> list = this.findCallSql(userSql);
		List<String> receivingEMailAccount=new ArrayList<String>();
		for(int i=0;i<list.size();i++){
			Object[] obj=(Object[]) list.get(i);
			if(isSendSMS&&"1".equalsIgnoreCase(obj[2]+"") && StringManagerUtils.isNotNull(obj[1]+"") && StringManagerUtils.isPhoneLegal(obj[1]+"")){
				StringBuffer sendContent = new StringBuffer();
				sendContent.append("{\"Mobile\":\""+obj[1]+"\",\"Value\":\""+SMSContent+"\"}");
				StringManagerUtils.sendPostMethod(SMSUrl, sendContent.toString(), "utf-8");
			}
			if("1".equalsIgnoreCase(obj[4]+"") && StringManagerUtils.isNotNull(obj[3]+"") && StringManagerUtils.isMailLegal(obj[3]+"")){
				receivingEMailAccount.add(obj[3]+"");
			}
		}
		if(isSendMail&&receivingEMailAccount.size()>0){
			StringManagerUtils.sendEMail(("0".equalsIgnoreCase(deviceType)?"泵":"管")+"设备"+wellName+"报警", EMailContent, receivingEMailAccount);
		}
	}
}