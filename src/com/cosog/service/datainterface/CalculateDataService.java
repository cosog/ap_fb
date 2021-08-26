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
import com.cosog.service.base.BaseService;
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
	
}