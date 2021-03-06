package com.cosog.utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.lang.reflect.Proxy;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.Socket;
import java.net.SocketException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.ResourceBundle;
import java.util.StringTokenizer;
import java.util.Vector;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.NoSuchProviderException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

import org.w3c.dom.events.Event;
import org.w3c.dom.events.EventListener;
import org.w3c.dom.events.EventTarget;
import org.w3c.dom.svg.SVGDocument;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.mail.util.MailSSLSocketFactory;

//import org.apache.commons.lang.xwork.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.engine.jdbc.SerializableClobProxy;

import net.sf.json.JSONObject;
import oracle.sql.CLOB;

/**
 * <p>
 * ?????????????????????????????????
 * </p>
 * 
 * @author gao 2014-06-10
 * @version 1.0
 */
@SuppressWarnings({
    "rawtypes",
    "unchecked",
    "unused"
})
public class StringManagerUtils {
    private final static String DATEPATTERN = "yyyy-MM-dd";
    private static Log log = LogFactory.getLog(StringManagerUtils.class);
    // ???????????????
    static long currentMill = 0;
    static List randlist = new ArrayList();

    // ?????????????????????js????????????????????????html???????????????js??????
    // ????????????\\?????????????????????????????????????????????????????????????????????????????????
    private final static String[] jsSpecialChars = { "\\", "\'", "\"" };

	// ???????????????
	public static final char[] ascchars = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '|', '\\', '[', ']', '{', '}', '\'', '\"', ';', ':', ',', '.','<', '>', '/', '?' };

	private final static int[] li_SecPosValue = { 1601, 1637, 1833, 2078, 2274,2302, 2433, 2594, 2787, 3106, 3212, 3472, 3635, 3722, 3730, 3858,4027, 4086, 4390, 4558, 4684, 4925, 5249, 5590 };
    private final static String[] lc_FirstLetter = { "a", "b", "c", "d", "e","f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s","t", "w", "x", "y", "z" };
	
    //????????????????????????????????????
    /**
     * ^ ????????????????????????????????????
     * \d ???????????????????????????????????? \ ????????????????????? \\d
     * $ ????????????????????????????????????
     */
    private static final Pattern HK_PATTERN = Pattern.compile("^(5|6|8|9)\\d{7}$");
    private static final Pattern CHINA_PATTERN = Pattern.compile("^((13[0-9])|(14[0,1,4-9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-3,5-9]))\\d{8}$");
    private static final Pattern NUM_PATTERN = Pattern.compile("[0-9]+");
    private static final Pattern COLOR_PATTERN = Pattern.compile("^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$");

    public static String protocolItemNameToCol(String str) {
        return "c_"+getAllFirstLetter(str);
    }
    
    /**
     * ????????????????????????????????????,???????????? 
     * @param str ??????????????? 
     * @return ?????????
     */
    public static String getAllFirstLetter(String str) {
        if (str == null || str.trim().length() == 0) {
            return "";
        }

        String _str = "";
        for (int i = 0; i < str.length(); i++) {
            _str = _str + getFirstLetter(str.substring(i, i + 1));
        }

        return _str;
    }

    /**
     * ??????????????????????????????,????????? 
     * @param chinese ??????????????? 
     * @return ?????????????????????
     */
    public static String getFirstLetter(String chinese) {
        if (chinese == null || chinese.trim().length() == 0) {
            return "";
        }
        chinese = conversionStr(chinese, "GB2312", "ISO8859-1");

        if (chinese.length() > 1) // ?????????????????????  
        {
            int li_SectorCode = (int) chinese.charAt(0); // ????????????  
            int li_PositionCode = (int) chinese.charAt(1); // ????????????  
            li_SectorCode = li_SectorCode - 160;
            li_PositionCode = li_PositionCode - 160;
            int li_SecPosCode = li_SectorCode * 100 + li_PositionCode; // ???????????????  
            if (li_SecPosCode > 1600 && li_SecPosCode < 5590) {
                for (int i = 0; i < 23; i++) {
                    if (li_SecPosCode >= li_SecPosValue[i]
                            && li_SecPosCode < li_SecPosValue[i + 1]) {
                        chinese = lc_FirstLetter[i];
                        break;
                    }
                }
            } else // ???????????????,??????????????????ASCII???  
            {
//                chinese = conversionStr(chinese, "ISO8859-1", "GB2312");
//                chinese = chinese.substring(0, 1);
            	//??????????????????????????????ASCII???  
            	chinese="";
            }
        }else{
        	int asciiValue=Integer.valueOf(chinese.charAt(0));
        	if(!((asciiValue>=48&&asciiValue<=57)||(asciiValue>=65&&asciiValue<=90)||(asciiValue>=97&&asciiValue<=122))){//?????????????????????
        		chinese="";
        	}
        }

        return chinese;
    }
    
    /**
     * ????????????????????? 
     * @param str ??????????????????????????? 
     * @param charsetName ??????????????? 
     * @param toCharsetName ?????????????????? 
     * @return ?????????????????????????????????
     */
    private static String conversionStr(String str, String charsetName,String toCharsetName) {
        try {
            str = new String(str.getBytes(charsetName), toCharsetName);
        } catch (UnsupportedEncodingException ex) {
            StringManagerUtils.printLog("??????????????????????????????" + ex.getMessage());
        }
        return str;
    }
    
    //    //?????????????????????
    private static final Pattern MAIL_PATTERN = Pattern.compile("^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$");
    /**
     * ?????????????????????????????????
     */
    public static boolean isPhoneLegal(String str) throws PatternSyntaxException {
        return isChinaPhoneLegal(str) || isHKPhoneLegal(str);
    }

    /**
     * ??????????????????11?????????????????????????????????????????????+???8????????????
     * ?????????????????????????????????
     * 13+?????????
     * 145,147,149
     * 15+???4????????????(?????????^4????????????????????????????????????????????????)
     * 166
     * 17+3,5,6,7,8
     * 18+?????????
     * 198,199
     */
    public static boolean isChinaPhoneLegal(String str) throws PatternSyntaxException {
        Matcher m = CHINA_PATTERN.matcher(str);
        return m.matches();
    }

    /**
     * ??????????????????8?????????5|6|8|9??????+7????????????
     */
    public static boolean isHKPhoneLegal(String str) throws PatternSyntaxException {

        Matcher m = HK_PATTERN.matcher(str);
        return m.matches();
    }
    /**
     * ??????
     */
    public static boolean isMailLegal(String str) throws PatternSyntaxException {
        Matcher m = MAIL_PATTERN.matcher(str);
        return m.matches();
    }
    
    public static void printLog(String x){
    	if(Config.getInstance().configFile.getOthers().getPrintLog()){
    		System.out.println(x);
    	}
    }
    
    public static void printLog(Object x){
    	if(Config.getInstance().configFile.getOthers().getPrintLog()){
    		System.out.println(x);
    	}
    }

    /**
     * 16????????????
     */
    public static boolean isColor16(String str) throws PatternSyntaxException {
        Matcher m = COLOR_PATTERN.matcher(str);
        return m.matches();
    }

    public static Date addDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() + 1000 * 60 * 60 * 24);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static Date addDate(Date date, int addDayCount) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        long mm = (long) 1000 * 60 * 60 * 24 * addDayCount;
        Date newDate2 = new Date(date.getTime() + mm);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static String addDay(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() + 1000 * 60 * 60 * 24);
        String strdate = format.format(newDate2);
        String result = strdate;
        return result;
    }

    public static String addDay(Date date, int addDayCount) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        long mm = (long) 1000 * 60 * 60 * 24 * addDayCount;
        Date newDate2 = new Date(date.getTime() + mm);
        String strdate = format.format(newDate2);
        return strdate;
    }

    /** 
     * ??????????????????????????????????????? 
     * @param smdate ???????????????
     * @param bdate  ???????????????
     * @return ????????????
     * @throws ParseException 
     */
    public static int daysBetween(Date smdate, Date bdate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        smdate = sdf.parse(sdf.format(smdate));
        bdate = sdf.parse(sdf.format(bdate));
        Calendar cal = Calendar.getInstance();
        cal.setTime(smdate);
        long time1 = cal.getTimeInMillis();
        cal.setTime(bdate);
        long time2 = cal.getTimeInMillis();
        long between_days = (time2 - time1) / (1000 * 3600 * 24);

        return Integer.parseInt(String.valueOf(between_days));
    }

    /**
     * ?????? ??????
     * 
     * @param toBeProcessed
     *            String
     * @param mode
     *            0 - ??????????????? - ??????
     * @return String
     */
    public static String encrypt(String toBeProcessed, int mode) {
        String ret = new String();
        // ????????????????????????
        if (toBeProcessed == null || toBeProcessed.length() <= 0) {
            return ret;
        }
        // ??????
        int len = toBeProcessed.length();
        int i, j, k, l;
        if (mode == 0) { // ??????
            j = (int)(16 * Math.random() - 16);
            for (i = 1; i <= len; i++) {
                k = j + i % 4;
                ret = String.valueOf((char)(toBeProcessed.charAt(i - 1) + k)) + ret;
            }
            ret += String.valueOf((char)(j + 70));
        } else { // ??????
            l = len - 1;
            j = toBeProcessed.charAt(len - 1) - 70;
            for (i = 1; i <= l; i++) {
                k = j + i % 4;
                ret += String.valueOf((char)(toBeProcessed.charAt(l - i) - k));
            }
        }
        return ret;
    }

    /**
     * ?????????????????????????????????
     * 
     * @param in
     * @return String
     */
    public static String escapeHTMLTags(String in ) {
        if ( in == null || in .length() <= 0) {
            return "";
        }
        // ??????????????????_temp1??????????????????????????????????????????_temp2??????????????????????????????????????????"|"??????
        // ??????ASCII?????????127????????????????????????_temp???????????????escape?????????????????????\u00FF??????ASCII??????255?????????
        String _temp1 = "\u0026\u00A9\u00AE\u2122\"\u003C\u003E";
        String _temp2 = "&amp;|&copy;|&reg;|&trade;|&quot;|&lt;|&gt;";

        // Init vars.
        StringBuffer ret = new StringBuffer();
        String _new = "";

        // ??????in????????????????????????????????????????????????????????????????????????????????????????????????????????????
        // ????????????????????????????????????_temp2??????????????????????????????????????????????????????
        // ?????????????????????" "???????????????"&nbsp;"???????????????????????????"&nbsp;"??????????????????" ".
        int i;
        StringTokenizer st1 = new StringTokenizer(_temp2, "|");
        ArrayList escapeArray = new ArrayList();
        while (st1.hasMoreTokens()) {
            String strToken = st1.nextToken();
            escapeArray.add(strToken);
        }
        /*
         * for (i = 0; st1.hasMoreTokens(); i++) { in = replace(in,
         * st1.nextToken(), _temp1.substring(i, i + 1)); }
         */
        // ??????????????????
        int _length = in .length();
        for (i = 0; i < _length; i++) {
            char t_char = in .charAt(i);
            int _index = _temp1.indexOf(t_char);
            if (_index < 0) {
                // ????????????????????????
                ret.append(t_char);
            } else {
                // ???????????????????????????_temp2????????????????????????????????????
                _new = (String) escapeArray.get(_index);
                ret.append(_new);
            }
        }
        return ret.toString();
    }

    /**
     * ????????????js???????????????????????????????????? ?????????\'?????????\\\'
     * 
     * @param in
     * @return
     */
    public static String escapeJSSpecialChar(String in ) {
        String ret = new String();
        if ( in == null || in .length() <= 0) {
            return ret;
        }

        // ???in??????js specail char????????????\
        ret = in ;
        for (int i = 0; i < jsSpecialChars.length; i++) {
            ret = replace(ret, jsSpecialChars[i], "\\" + jsSpecialChars[i]);
        }
        return ret;
    }

    public static boolean existOrNot(String data[], String key) {
        boolean flag = false;
        for (String d: data) {
            if (d.equalsIgnoreCase(key)) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    public static boolean existOrNot(String data[], String key, boolean caseSensitive) {
        boolean flag = false;
        for (int i = 0; i < data.length; i++) {
            boolean match = false;
            if (caseSensitive) {
                match = data[i].equals(key);
            } else {
                match = data[i].equalsIgnoreCase(key);
            }
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    public static boolean existOrNot(List < String > list, String key, boolean caseSensitive) {
        boolean flag = false;
        for (int i = 0; i < list.size(); i++) {
            boolean match = false;
            if (caseSensitive) {
                match = list.get(i).equals(key);
            } else {
                match = list.get(i).equalsIgnoreCase(key);
            }
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    public static boolean existOrNot(Map <String,String > map, String str, boolean caseSensitive) {
        boolean flag = false;
        for(String key : map.keySet()) {
            boolean match = false;
            if (caseSensitive) {
                match = key.equals(str);
            } else {
                match = key.equalsIgnoreCase(str);
            }
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    public static boolean existOrNot(Map <String,String > map, String keyStr,String valueStr, boolean caseSensitive) {
        boolean flag = false;
        for(String key : map.keySet()) {
            boolean match = false;
            if (caseSensitive) {
                match = key.equals(keyStr)&&map.get(key).equals(valueStr);
            } else {
                match = key.equalsIgnoreCase(keyStr)&&map.get(key).equalsIgnoreCase(valueStr);
            }
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    public static boolean existOrNotByValue(Map <String,String > map, String str, boolean caseSensitive) {
        boolean flag = false;
        for(String key : map.keySet()) {
            boolean match = false;
            if (caseSensitive) {
                match = map.get(key).equals(str);
            } else {
                match = map.get(key).equalsIgnoreCase(str);
            }
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    public static boolean existOrNot(Map <String,Object > map, String str) {
        boolean flag = false;
        for(String key : map.keySet()) {
            boolean match = false;
            match = key.equals(str);
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    public static boolean existOrNot(List < Integer > list, int key) {
        boolean flag = false;
        for (int i = 0; i < list.size(); i++) {
            boolean match = false;
            match = list.get(i) == key;
            if (match) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    public static String filterHtml(Object oIn) {
        // ???????????????????????????????????????
        if (oIn == null) {
            return "";
        }
        String strIn = oIn.toString();
        return escapeHTMLTags(strIn);
    }

    public static String filterNull(String str) {
        if (str == null) {
            return new String();
        } else {
            return str;
        }
    }

    /**
     * ?????????null??????, ?????????""?????????
     * 
     * @param obj
     *            Object
     * @return String
     */
    public static String filterNullObject(Object obj) {
        if (obj == null) {
            return new String();
        } else {
            return obj.toString();
        }
    }

    public static Date formateComputeDate(Date date) {
        return stringToDate(formatStringDate(date));
    }

    public static String formateStringData(String str) {
        if (str == null || str == "" || str == "-9999.0") {
            str = "&nbsp;";
        }
        return str;
    }

    public static String formatReportPrecisionValue(String value) {
        DecimalFormat df = new DecimalFormat("0.00");
        String result = null;
        if (value == null || value.equals("") || value.equals("null") || value == "null") {
            result = "0";
        } else if (isNum(value) || (value.indexOf("E") > 0 && stringToDouble(value) > 0)) {
            double d = Double.parseDouble(value);
            result = "" + df.format(d);
        } else {
            result = value;
        }
        return result;
    }

    public static Date formatSqlDate(String strDate) {
        DateFormat df = new SimpleDateFormat(DATEPATTERN);
        String str = df.format(stringToDate(strDate)); // ???java.util.Date?????????String
        // df.parse(""); //???String ?????????java.util.Date
        java.sql.Date date = java.sql.Date.valueOf(str);
        return date;
    }

    public static String formatStringDate(Date date) {
        String time = null;
        SimpleDateFormat sd = new SimpleDateFormat(DATEPATTERN);
        time = sd.format(date);
        return time;
    }

    /**
     * ?????????null?????????, ?????????""?????????
     * 
     * @param str
     *            String
     * @return String
     */
    public static String getClobContent(Clob content) {
        StringBuffer stringvalue = new StringBuffer(10000);
        try {
            BufferedReader reader = new BufferedReader(content.getCharacterStream());
            char[] temp = new char[50];
            String tmp = null;
            tmp = reader.readLine();
            while (tmp != null) {
                stringvalue.append(tmp);
                tmp = reader.readLine();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return stringvalue.toString();
    }

    public static String getCurrentDayMonth(String date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");
        return formatter.format(stringToDate(date));
    }

    public static String getCurrentDayYear(String date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy");
        return formatter.format(stringToDate(date));
    }

    public static String getCurrentMonth() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");
        return formatter.format(new Date());
    }

    public static String getCurrentTime() {
        String time = null;
        Date now = new Date();
        // Calendar cal = Calendar.getInstance();
        // DateFormat df = DateFormat.getDateTimeInstance();
        SimpleDateFormat f = new SimpleDateFormat(DATEPATTERN);
        // DateFormat df = DateFormat.getDateInstance();
        time = f.format(now);
        return time;
    }

    public static String getCurrentTime(String format) {
        String time = null;
        Date now = new Date();
        // Calendar cal = Calendar.getInstance();
        // DateFormat df = DateFormat.getDateTimeInstance();
        SimpleDateFormat f = new SimpleDateFormat(format);
        // DateFormat df = DateFormat.getDateInstance();
        time = f.format(now);
        return time;
    }

    public static String getDoublePrecisionValue(String value) {
        DecimalFormat df = new DecimalFormat("0.00");
        String result = null;
        if (value == null || value.equals("")) {
            result = "&nbsp;";
        } else {
            double d = Double.parseDouble(value);
            result = "" + df.format(d);
        }
        return result;
    }

    public static String getEachMonthFirstDay(String date) {
        String startTime = "";
        startTime = date.substring(0, 7) + "-01";
        return startTime;
    }

    /**
     * ?????????????????????????????????
     * 
     * @return java.lang.String
     * @param src
     *            java.lang.String
     */
    public static String getFileDir(String str) {
        int idx = str.lastIndexOf("/");
        if (idx == 0)
            return "";
        return str.substring(0, idx);
    }

    /**
     * ??????????????????????????????
     * 
     * @return java.lang.String
     * @param src
     *            java.lang.String
     */
    public static String getFileName(String str) {
        int idx = str.lastIndexOf("/") + 1;
        if (idx == 0)
            return "";
        return str.substring(idx);
    }

    public static String getIntPrecisionValue(String value) {
        DecimalFormat df = new DecimalFormat("0");
        String result = null;
        if (value == null || value.equals("")) {
            result = "&nbsp;";
        } else {
            double d = Double.parseDouble(value);
            result = "" + df.format(d);
        }
        return result;
    }

    public static String getLocal() {
        ResourceBundle res = ResourceBundle.getBundle("log4j");
        return res.getString("request_locale");
    }

    /**
     * ????????????????????????????????????????????????????????????????????????????????????
     * 
     * @param str
     *            ??????????????????????????????
     * @param length
     *            ????????????,???????????????
     * @param more
     *            ?????????????????????????????????
     * @return ?????????????????????
     */
    public static String getMoreString(String str, int length, String more) {
        if (str == null || str.equals(""))
            return "";
        else {
            int len = str.length();
            int curLength = 0;
            StringBuffer buf = new StringBuffer();
            boolean isSingleChar;
            boolean hasMore = false;
            for (int i = 0; i < len; i++) {
                isSingleChar = false;
                if (curLength < length) {
                    for (int j = 0; j < ascchars.length; j++) {
                        if (str.charAt(i) == ascchars[j]) {
                            buf.append(str.charAt(i));
                            curLength++;
                            isSingleChar = true;
                            break;
                        }
                    }
                    if (!isSingleChar) {
                        buf.append(str.charAt(i));
                        curLength += 2;
                    }
                } else
                    hasMore = true;
            }
            if (more == null) {
                more = "...";
            }
            if (hasMore)
                return buf.append(more).toString();
            else
                return buf.toString();
        }
    }

    public static String getNextLevel(String maxLevel, int level) {
        String ParentLevel = maxLevel.substring(0, maxLevel.length() - 3);
        String curr = maxLevel.substring(maxLevel.length() - 3, maxLevel.length());
        int iNext = Integer.parseInt(curr) + 1;
        return ParentLevel + leftPad(iNext, level, '0');
    }

    public static String getUniqueID() {
        long tempMill = System.currentTimeMillis();
        String randstr = String.valueOf((int)(10000 * Math.random()));
        synchronized(randlist) {
            if (tempMill > currentMill) {
                currentMill = tempMill;
                randlist.clear();
            } else {
                while (randlist.contains(randstr)) {
                    randstr = String.valueOf((int)(10000 * Math.random()));
                }
                randlist.add(randstr);
            }
        }
        String id = tempMill + "_" + randstr;
        return id;
    }

    public static String integerTransferString(Integer s) {
        return s.toString();
    }

    public static boolean isNotNull(String value) {
        boolean flag = false;
        //if (value != "" || value != null || StringUtils.isNotBlank(value)) {
        if (value != null && value.trim().length() > 0 && (!"".equals(value.trim())) && !"null".equalsIgnoreCase(value)) {
            flag = true;
        }
        return flag;
    }

    public static boolean isNum(String str) {
        return str != null && str.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$");
    }

    /**
     * ??????????????????????????????????????????????????????????????????????????????????????????????????? Input: 1, 5, '0' Output: "00001"
     * 
     * @return java.lang.String
     * @param value
     *            - ??????????????????
     * @param number
     *            - ??????????????????
     * @param c
     *            char - ???????????????
     */
    public static String leftPad(int value, int number, char c) {
        String s = "";
        String temp = (new Integer(value)).toString();
        if (temp.length() <= number) {
            for (int i = 0; i < number; i++) {
                s += c;
            }
            s = s.substring(0, number - temp.length()) + temp;
        } else {
            log.info("Error: " + number + "'s length is " + temp.length() + ", it's bigger than " + number + ".");
        }
        return s;
    }

    public static Integer longTransferInteger(Long l) {
        return new Long(l).intValue();
    }

    public static void main(String args[]) {
        String result = StringManagerUtils.replace("id,jh,gtcjsj,cl", "gtcjsj", "to_char(gtcjsj,'YYYY-MM-DD hh24:mi:ss') as gtcjsj");
        // StringManagerUtils.printLog(StringManagerUtils.getCurrentMonth());
        StringManagerUtils.printLog(minusMonthDate(StringManagerUtils.stringToDate("2014-01-08")));
        // StringManagerUtils.printLog(showLastMonth("2014-01-31"));
    }

    public static Date minusDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - 1000 * 60 * 60 * 24);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static String minusDay(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - 1000 * 60 * 60 * 24);
        String strdate = format.format(newDate2);
        String result = strdate;
        return result;
    }

    public static Date minusFiveDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - (1000 * 60 * 60 * 24) * 3);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static Date minusFivemDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - (1000 * 60 * 60 * 24) * 5);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static Date minusMonthDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - (1000 * 60 * 60 * 24) * 60);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static Date minusTenDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - (1000 * 60 * 60 * 24) * 10);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static Date minusTwoDate(Date date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate2 = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 2);
        String strdate = format.format(newDate2);
        Date result = StringManagerUtils.stringToDate(strdate);
        return result;
    }

    public static String[] parseString(String data) {
        return data.split(",");
    }

    /**
     * ?????????????????????????????? ???????????????????????????????????? Liang Yong, Feb 28, 2003
     * 
     * @return java.lang.String
     * @param oldValue
     *            java.lang.String
     */
    public static String processSingleQuote(String oldValue) {
        // Process single quotes
        String newValue = new String();
        if (oldValue != null) {
            char c;
            for (int i = 0; i < oldValue.length(); i++) {
                c = oldValue.charAt(i);
                if (c == '\'') {
                    newValue += c;
                }
                newValue += c;
            }
        }
        return newValue;
    }

    /**
     * ????????????????????????????????????????????????
     * 
     * @return java.lang.String
     * @param int num - ???????????????????????????
     */
    public static String random(int num) {
        String ret = "";
        for (int i = 0; i < num; i++) {
            int randomInt = (int)((java.lang.Math.random()) * 10);
            ret = ret.concat(Integer.toString(randomInt));
        }
        return ret;
    }

    /**
     * ????????????????????????????????????
     * 
     * @param i
     * @return String
     */
    public static String randomString(int i) {
        Random randGen = new Random();
        char numbersAndLetters[] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();

        if (i < 1)
            return null;
        char ac[] = new char[i];
        for (int j = 0; j < ac.length; j++)
            ac[j] = numbersAndLetters[randGen.nextInt(61)];

        return new String(ac);
    }

    /**
     * ????????????str????????????oldStr??????????????????newStr?????????
     * 
     * @param str
     *            ?????????????????????????????????
     * @param oldStr
     *            ????????????
     * @param newStr
     *            ???????????????
     * @return ????????????????????????
     */
    public static String replace(String str, String oldStr, String newStr) {
        String string = str;
        StringBuffer buf = new StringBuffer();
        int index = 0;
        int idx = string.indexOf(oldStr);
        if (idx == -1)
            buf.append(string);
        while (idx != -1) {
            buf.append(string.substring(index, idx)).append(newStr);
            index = idx + oldStr.length();
            idx = string.indexOf(oldStr, index);
            if (idx == -1)
                buf.append(string.substring(index, string.length()));
        }

        return buf.toString();
    }



    public static String replaceAll(String str) {
        String newStr = str.replaceAll("\"", "");
        // String s = "\"aasd\"a\"";
        String result = null;
        // Pattern p = Pattern.compile("(?m)^\"(.+)\"$");
        // Matcher m = p.matcher(newStr);
        // if (m.find()) {
        // result = m.group(1);
        // }
        result = newStr.trim();
        StringManagerUtils.printLog(result);
        return result;

    }

    public static String replaceStr(String strSource, String strFrom, String strTo) {
        if (strSource == null) {
            return null;
        }
        int i = 0;
        if ((i = strSource.indexOf(strFrom, i)) >= 0) {
            char[] cSrc = strSource.toCharArray();
            char[] cTo = strTo.toCharArray();
            int len = strFrom.length();
            StringBuffer buf = new StringBuffer(cSrc.length);
            buf.append(cSrc, 0, i).append(cTo);
            i += len;
            int j = i;
            while ((i = strSource.indexOf(strFrom, i)) > 0) {
                buf.append(cSrc, j, i - j).append(cTo);
                i += len;
                j = i;
            }
            buf.append(cSrc, j, cSrc.length - j);
            return buf.toString();
        }
        return strSource;
    }

    public static String showLastMonth(String date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        try {
            c.setTime(simpleDateFormat.parse(date));
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        // ????????????????????????2010-02-28
        c.add(Calendar.MONTH, -1);
        String month = formatStringDate(c.getTime());
        return month;
    }

    public static String spitData(String data) {
        // data = "1-2,1-2,1-3";
        StringBuilder sb = new StringBuilder("");
        String[] datas = data.split(",");
        for (int i = 0; i < datas.length; i++) {
            sb.append("'" + datas[i] + "',");
        }
        data = sb.toString();
        data = data.substring(0, data.length() - 1);
        return data;
    }

    /**
     * ?????????????????????????????????
     * 
     * @param src
     * @param delim
     * @return
     */
    public static String[] split(String src, String delim) {
        if (src == null || delim == null)
            return null;
        StringTokenizer st = new StringTokenizer(src, delim);
        Vector vct = new Vector();
        for (; st.hasMoreTokens(); vct.add(st.nextToken()))
        ;
        Object tks[] = vct.toArray();
        String rt[] = new String[vct.size()];
        System.arraycopy(((Object)(tks)), 0, rt, 0, vct.size());
        return rt;
    }

    public static String[] splitString(String s, String separator) {
        return s.split(separator);
    }

    public static boolean stringDataFiter(String value) {
        boolean flag = false;
        String arrays[] = {
            "id",
            "wellName",
            "jhh",
            "bj",
            "bjbz",
            "bjlx",
            "userType",
            "userTitle",
            "userOrgid",
            "userNo",
            "userPhone",
            "userPwd",
            "userName",
            "orgName",
            "resName",
            "jlxName",
            "jslxName",
            "ssjwName",
            "sszcdyName",
            "userInEmail",
            "userId",
            "zjs",
            "ygbh",
            "blx",
            "shzt",
            "roleCode",
            "dwbh",
            "yqcbh",
            "hfbz",
            "rfidkh",
            "bmbh",
            "roleFlag",
            "roleId",
            "jlx",
            "ssjw",
            "sszcdy",
            "jslx",
            "qtlx",
            "sfpfcl",
            "ccjzt",
            "bjb",
            "yjgjb",
            "ejgjb",
            "sjgjb",
            "mdzt",
            "jbh",
            "ygbh",
            "bjjb",
            "",
            "gklx",
            "jlbh",
            "bdbjlx",
            "bdbjjb",
            "ssgldw",
            "bz",
            "dmx",
            "dmy",
            "showLevel",
            "roleLevel",
            "pxbh",
            "signInId",
            "slave",
            "cycle",
            "userQuickLogin",
            "gtcjsj",
            "jsbz",
            "ExtendedDays",
            "acqCycle",
            "saveCycle",
            "user_id",
            "user_name",
            "userid",
            "username"
        };
        for (String str: arrays) {
            if (value.equalsIgnoreCase(str)) {
                flag = true;
            }
        }
        return flag;

    }

    public static boolean clobDataFiter(String value) {
        boolean flag = false;
        String arrays[] = {
            "COMMRANGE",
            "RUNRANGE",
            "RESULTSTRING",
            "RESULTSTRING_E"
        };
        for (String str: arrays) {
            if (value.equalsIgnoreCase(str)) {
                flag = true;
            }
        }
        return flag;

    }

    public static boolean stringIsNull(String s) {
        boolean flag = false;
        if (s == null || "".equals(s) || s.trim().length() == 0) {
            flag = true;
        }
        return flag;
    }

    public static Date stringToDate(String strDate) {
        Date s_date = null;
        SimpleDateFormat sdf = new SimpleDateFormat(DATEPATTERN);
        try {
            s_date = (Date) sdf.parse(strDate);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return s_date;
    }

    public static Timestamp stringToTimeStamp(String time) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        format.setLenient(false);
        Timestamp ts1 = null;
        // ?????????????????? str_test
        String str_test = time;
        try {
            long time1 = format.parse(str_test).getTime();
            Timestamp ts = new Timestamp(time1);
            ts1 = Timestamp.valueOf(str_test);
            // StringManagerUtils.printLog(ts.toString() + "%%%%%%%" + ts1.toString());
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return ts1;
    }

    public static Integer stringTransferInteger(String s) {
        if (s == null)
            s = "0";
        return new Integer(s).intValue();
    }

    public static String TimeToString(Timestamp ts) {
        // String time = null;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // ???????????????????????????
        // Date date = formatter.parse(ts);
        String dateString = formatter.format(ts);
        return dateString;
    }

    public static Boolean isNotBlank(String value) {
        Boolean flag = false;
        if (!"null".equalsIgnoreCase(value) && !"".equals(value) && null != value && value.length() > 0) {
            flag = true;
        }
        return flag;
    }

    //???????????????blob???????????????String??????
    public static String convertBlobToString(Blob blob) {
        String result = "";
        try {
            ByteArrayInputStream msgContent = (ByteArrayInputStream) blob.getBinaryStream();
            byte[] byte_data = new byte[msgContent.available()];
            msgContent.read(byte_data, 0, byte_data.length);
            result = new String(byte_data);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String convertBLOBtoString(Blob BlobContent) {
        byte[] msgContent = null;
        try {
            msgContent = BlobContent.getBytes(1, (int) BlobContent.length());
        } catch (SQLException e1) {
            e1.printStackTrace();
        } // BLOB?????????????????????
        String newStr = ""; // ???????????????
        long BlobLength; // BLOB????????????
        try {
            BlobLength = BlobContent.length(); // ??????BLOB??????
            if (msgContent == null || BlobLength == 0) // ???????????????????????????
            {
                return "";
            } else // ??????BLOB????????????
            {
                newStr = new String(BlobContent.getBytes(1, msgContent.length), "gb2312"); // ????????????????????????900??????
                return newStr;
            }
        } catch (Exception e) // oracle????????????
        {
            e.printStackTrace();
        }
        return newStr;
    }

    //???????????????????????????????????????????????????
    public static float stringToFloat(String value, int bit) {
        StringBuffer buf = new StringBuffer();
        buf.append("0.");
        for (int i = 1; i <= bit; i++) {
            buf.append("0");
        }
        String sbit = buf.toString();
        DecimalFormat sumd = new DecimalFormat(sbit);
        float sum = 0;
        if (StringManagerUtils.isNotNull(value)) {
            sum = Float.parseFloat(value);
        }
        String sumstr = "";
        sumstr = sumd.format(sum);
        sum = Float.parseFloat(sumstr);
        return sum;
    }

    public static String floatToString(float value, int bit) {
        StringBuffer buf = new StringBuffer();
        buf.append("0.");
        for (int i = 1; i <= bit; i++) {
            buf.append("0");
        }
        String sbit = buf.toString();
        DecimalFormat sumd = new DecimalFormat(sbit);
        float sum = 0;
        if (StringManagerUtils.isNotNull(value + "")) {
            sum = Float.parseFloat(value + "");
        }
        String sumstr = "";
        sumstr = sumd.format(sum);
        return sumstr;
    }

    public static float stringToFloat(String value) {
        float sum = 0;
        if (StringManagerUtils.isNotNull(value)) {
            try {
                sum = Float.parseFloat(value);
            } catch (Exception e) {
                return 0;
            }
        }
        return sum;
    }

    public static double stringToDouble(String value) {
        double sum = 0;
        if (StringManagerUtils.isNotNull(value)) {
            try {
                sum = Double.parseDouble(value);
            } catch (Exception e) {
                return 0;
            }
        }
        return sum;
    }

    public static boolean stringToBoolean(String value) {
        boolean result = false;
        try {
            if (StringManagerUtils.isNum(value) && StringManagerUtils.stringToInteger(value) > 0) {
                result = true;
            } else {
                result = Boolean.parseBoolean(value);
            }
        } catch (Exception e) {
            return false;
        }
        return result;
    }

    public static int stringToInteger(String value) {
        int sum = 0;
        if (StringManagerUtils.isNotNull(value)) {
            try {
                if (value.contains(".")) {
                    sum = (int) Math.floor(Double.parseDouble(value));
                } else {
                    sum = Integer.parseInt(value);
                }
            } catch (Exception e) {
                return 0;
            }
        }
        return sum;
    }

    //BLOB????????????	
    public static String BLOBtoString(oracle.sql.BLOB blob) throws SQLException, IOException {
        byte[] bytes;
        BufferedInputStream bis = null;
        bis = new BufferedInputStream(blob.getBinaryStream());
        bytes = new byte[(int) blob.length()];
        int len = bytes.length;
        int offest = 0;
        int read = 0;
        while (offest < len && (read = bis.read(bytes, offest, len - offest)) > 0) {
            offest += read;
        }
        return new String(bytes);

    }
    //CLOB????????????
    public static String CLOBtoString(oracle.sql.CLOB clob) throws SQLException, IOException {
        if (clob == null) {
            return "";
        }
        char[] buffer = null;
        buffer = new char[(int) clob.length()];
        clob.getCharacterStream().read(buffer);
        return String.valueOf(buffer).replaceAll("\r\n", "\n").replaceAll("\n", "");

    }

    //CLOB????????????
    public static String CLOBObjectToString(Object obj) throws SQLException, IOException {
        if (obj == null) {
            return "";
        }
        SerializableClobProxy proxy = (SerializableClobProxy) Proxy.getInvocationHandler(obj);
        CLOB clob = (CLOB) proxy.getWrappedClob();
        char[] buffer = null;
        buffer = new char[(int) clob.length()];
        clob.getCharacterStream().read(buffer);
        return String.valueOf(buffer);
    }

    //Clob????????????
    public static String CLOBtoString2(Clob clob) throws SQLException, IOException {
        BufferedReader reader = null;
        InputStreamReader is = new InputStreamReader(clob.getAsciiStream());
        reader = new BufferedReader(is);
        String result = "";
        String line = "";
        while ((line = reader.readLine()) != null) {
            result += line;
        }
        is.close();
        reader.close();
        return result;
    }

    /**
     * ??????????????????????????????
     */
    public static boolean isInteger(String value) {
        try {
            Integer.parseInt(value);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     * ?????????????????????????????????
     */
    public static boolean isDouble(String value) {
        try {
            Double.parseDouble(value);
            if (value.contains("."))
                return true;
            return false;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     * ??????????????????????????????
     */
    public static boolean isNumber(String value) {
        return isInteger(value) || isDouble(value);
    }

    /**
     * ?????????????????????
     * days ???????????????,??????????????????
     * */
    @SuppressWarnings("static-access")
    public static String getOneDayDateString(int days) {
        Date date = new Date(); //?????????
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.add(calendar.DATE, days); //???????????????????????????.???????????????,??????????????????
        date = calendar.getTime(); //???????????????????????????????????????????????? 
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = formatter.format(date);
        return dateString;
    }

    /**
     * ??????URLConnect???????????????post??????????????????????????????
     * 
     * @param url
     *            ????????????
     * @param params
     *            ?????????????????????name=??????&age=8????????????????????????Uri.encode??????
     * @param encoding
     *            ????????????
     * @return ?????????????????????
     */
    public static String sendPostMethod(String url, String param, String encoding) {
        PrintWriter out = null;
        BufferedReader in = null;
        HttpURLConnection conn = null;
        OutputStreamWriter os = null;
        InputStreamReader is = null;
        String result = "";
        if (!StringManagerUtils.isNotNull(encoding)) {
            encoding = "utf-8";
        }
        try {
            URL realUrl = new URL(url);
            // ?????????URL???????????????
            conn = (HttpURLConnection) realUrl.openConnection();
            // ???????????????????????????
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            //????????????
            //	            conn.setConnectTimeout(1000*5);//????????????????????????
            //	            conn.setReadTimeout(1000*60*60);//?????????????????????????????????

            // ??????POST??????????????????????????????
            conn.setDoOutput(true);
            conn.setDoInput(true);
            os = new OutputStreamWriter(conn.getOutputStream(), encoding);
            out = new PrintWriter(os);
            out.print(param);
            out.flush();
            //	            // ??????BufferedReader??????????????????URL?????????


            if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                is = new InputStreamReader(conn.getInputStream(), encoding); in = new BufferedReader(is);
                String line;
                while ((line = in .readLine()) != null) {
                    result += line;
                }
                return result;
            } else if (conn.getResponseCode() >= 400) {
                String errorInfo = "";
                is = new InputStreamReader(conn.getInputStream(), encoding); in = new BufferedReader(is);
                String line;
                while ((line = in .readLine()) != null) {
                    errorInfo += line;
                }
                StringManagerUtils.printLog("???????????????" + errorInfo);
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            StringManagerUtils.printLog("?????? POST ?????????????????????" + e);
            StringManagerUtils.printLog(param);
            e.printStackTrace();
        } finally {
            try {
                if (os != null) {
                    os.close();
                }
                if (is != null) {
                    is.close();
                }
                if (out != null) {
                    out.close();
                }
                if ( in != null) {
                    in .close();
                }
                if (conn != null) {
                    conn.disconnect();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return "";
    }

    public static Boolean checkHttpConnection(String url) {
        HttpURLConnection conn = null;
        Boolean result = false;
        try {
            URL realUrl = new URL(url);
            conn = (HttpURLConnection) realUrl.openConnection();
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

            conn.connect();
            if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                result = true;
            }

        } catch (Exception e) {
            StringManagerUtils.printLog("??????http?????????????????????" + e);
            e.printStackTrace();
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return result;
    }

    //???????????????????????????
    public static String readFile(String path) {
        File file = new File(path);
        BufferedReader reader = null;
        FileReader fr = null;
        String laststr = "";
        try {
            fr = new FileReader(file);
            reader = new BufferedReader(fr);
            String tempString = null;
            int line = 1;
            //?????????????????????????????????null???????????????
            while ((tempString = reader.readLine()) != null) {
                //????????????
                //StringManagerUtils.printLog("line " + line + ": " + tempString);
                laststr = laststr + tempString;
                line++;
            }
            fr.close();
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {}
            }
        }
        return laststr;
    }

    public static String readFile(String path, String encode) {
        String fileContent = "";
        try {
            File f = new File(path);
            if (f.isFile() && f.exists()) {
                FileInputStream fs = new FileInputStream(f);
                InputStreamReader read = new InputStreamReader(fs, encode);
                BufferedReader reader = new BufferedReader(read);
                String line;
                while ((line = reader.readLine()) != null) {
                    fileContent += line;
                }
                fs.close();
                read.close();
                reader.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileContent.replaceAll(" ", "");
    }

    /*
     * ??????JSONObject???Int?????????
     * 
     * */
    public static int getJSONObjectInt(JSONObject jsonObject, String key) {
        int result = 0;
        try {
            result = jsonObject.getInt(key);
        } catch (Exception e) {
            result = 0;
        }
        return result;
    }

    /*
     * ??????JSONObject???Double?????????
     * 
     * */
    public static double getJSONObjectDouble(JSONObject jsonObject, String key) {
        double result = 0;
        try {
            result = jsonObject.getDouble(key);
        } catch (Exception e) {
            result = 0;
        }
        return result;
    }

    /*
     * ??????JSONObject???String?????????
     * 
     * */
    public static String getJSONObjectString(JSONObject jsonObject, String key) {
        String result = "\"\"";
        try {
            result = jsonObject.getString(key);
        } catch (Exception e) {
            result = "\"\"";
        }
        return result;
    }

    public static String objectToString(Object obj) {

        return obj != null ? obj.toString() : "";
    }

    /** 
     *@Description: ???svg??????????????????png 
     *@Author: 
     *@param svgCode svg?????? 
     *@param pngFilePath  ??????????????? 
     *@throws IOException io?????? 
     *@throws TranscoderException svg???????????? 
     */
    public static void convertToPng(String svgCode, String pngFilePath) throws IOException, TranscoderException {

        File file = new File(pngFilePath);

        FileOutputStream outputStream = null;
        try {
            file.createNewFile();
            outputStream = new FileOutputStream(file);
            convertToPng(svgCode, outputStream);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /** 
     *@Description: ???svgCode?????????png?????????????????????????????? 
     *@param svgCode svg?????? 
     *@param outputStream ????????? 
     *@throws TranscoderException ?????? 
     *@throws IOException io?????? 
     */
    public static void convertToPng(String svgCode, OutputStream outputStream) throws TranscoderException, IOException {
        try {
            byte[] bytes = svgCode.getBytes("UTF-8");
            ByteArrayInputStream bi = new ByteArrayInputStream(bytes);
            PNGTranscoder t = new PNGTranscoder();
            TranscoderInput input = new TranscoderInput(bi);
            TranscoderOutput output = new TranscoderOutput(outputStream);
            t.transcode(input, output);
            outputStream.flush();
            bi.close();
        } finally {

            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /** 
     * ?????????????????? 
     * @param   sPath    ??????????????????????????? 
     * @return ??????????????????????????????true???????????????false 
     */
    public static boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // ??????????????????????????????????????????  
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }

    /** 
     * ??????????????????????????????????????????????????? 
     * @param   sPath ?????????????????????????????? 
     * @return  ????????????????????????true???????????????false 
     */
    public static boolean deleteDirectory(String sPath) {
        boolean flag = false;
        //??????sPath?????????????????????????????????????????????????????????  
        if (!sPath.endsWith(File.separator)) {
            sPath = sPath + File.separator;
        }
        File dirFile = new File(sPath);
        //??????dir??????????????????????????????????????????????????????????????? 
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            return false;
        }
        flag = true;
        //?????????????????????????????????(???????????????)
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            //???????????????  
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) break;
            } //???????????????  
            else {
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) break;
            }
        }
        if (!flag) return false;
        //??????????????????  
        if (dirFile.delete()) {
            return true;
        } else {
            return false;
        }
    }

    /** 
     *  ??????????????????????????????????????????????????????????????? 
     *@param sPath  ??????????????????????????? 
     *@return ?????????????????? true??????????????? false??? 
     */
    public static boolean deleteFolder(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // ?????????????????????????????????  
        if (!file.exists()) { // ??????????????? false  
            return flag;
        } else {
            // ?????????????????????  
            if (file.isFile()) { // ????????????????????????????????????  
                return deleteFile(sPath);
            } else { // ????????????????????????????????????  
                return deleteDirectory(sPath);
            }
        }
    }
    /**
     * ??????.json????????????
     */
    public static File createJsonFile(String jsonString, String filePath) {
        // ??????????????????????????????
        boolean flag = true;

        // ????????????????????????
        String fullPath = filePath;
        File file = null;
        // ??????json????????????
        try {
            // ???????????????????????????
            file = new File(fullPath);
            if (!file.getParentFile().exists()) { // ??????????????????????????????????????????
                file.getParentFile().mkdirs();
            }
            if (file.exists()) { // ???????????????,???????????????
                file.delete();
            }
            file.createNewFile();

            if (jsonString.indexOf("'") != -1) {
                //?????????????????????????????????JSON???????????????????????????????????????????????????  
                jsonString = jsonString.replaceAll("'", "\\'");
            }
            if (jsonString.indexOf("\"") != -1) {
                //?????????????????????????????????JSON???????????????????????????????????????????????????  
                jsonString = jsonString.replaceAll("\"", "\\\"");
            }

            if (jsonString.indexOf("\r\n") != -1) {
                //????????????????????????????????????JSON????????????????????????????????????????????????  
                jsonString = jsonString.replaceAll("\r\n", "\\u000d\\u000a");
            }
            if (jsonString.indexOf("\n") != -1) {
                //??????????????????????????????JSON??????????????????????????????????????????  
                jsonString = jsonString.replaceAll("\n", "\\u000a");
            }

            // ?????????json?????????
            jsonString = toPrettyFormat(jsonString);

            // ???????????????????????????????????????
            FileOutputStream fos = new FileOutputStream(file);
            Writer write = new OutputStreamWriter(fos, "UTF-8");
            write.write(jsonString);
            write.flush();
            fos.close();
            write.close();
        } catch (Exception e) {
            flag = false;
            e.printStackTrace();
        }

        // ???????????????????????????
        return file;
    }

    /**
     * ???????????????JSON?????????
     * @return ???????????????JSON?????????
     */
    public static String toPrettyFormat(String json) {
        if (json.indexOf("'") != -1) {
            //?????????????????????????????????JSON???????????????????????????????????????????????????  
            json = json.replaceAll("'", "\\'");
        }
        if (json.indexOf("\"") != -1) {
            //?????????????????????????????????JSON???????????????????????????????????????????????????  
            json = json.replaceAll("\"", "\\\"");
        }

        if (json.indexOf("\r\n") != -1) {
            //????????????????????????????????????JSON????????????????????????????????????????????????  
            json = json.replaceAll("\r\n", "\\u000d\\u000a");
        }
        if (json.indexOf("\n") != -1) {
            //??????????????????????????????JSON??????????????????????????????????????????  
            json = json.replaceAll("\n", "\\u000a");
        }
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(json).getAsJsonObject();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(jsonObject);
    }
    public static String jsonStringFormat(String json) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(json);
        String prettyJsonString = gson.toJson(je);
        return prettyJsonString;
    }


    /** 
     *  ????????????????????????
     *@param str  ????????????
     *@param length  ??????
     *@return ???????????????list 
     */
    public static List < String > SubStringToList(String str, int length) {
        StringBuffer strbuffer = new StringBuffer(str);
        List < String > strList = new ArrayList < String > ();
        int start = 0;
        int end = start + length;

        while (true) {
            if (start >= strbuffer.length())
                return strList;
            String temp = strbuffer.substring(start, end);
            strList.add(temp);
            start = end;
            end = end + length;
            if (end >= strbuffer.length()) {
                end = strbuffer.length();
            }
        }
    }

    /**
     * ????????????????????????
     * @param filepath ?????????????????????
     * @param newstr  ???????????????
     * @return
     * @throws IOException
     */
    public static boolean writeFileContent(String filepath, String newstr) throws IOException {
        Boolean bool = false;
        String filein = newstr + "\r\n"; //????????????????????????
        String temp = "";

        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null;
        FileOutputStream fos = null;
        PrintWriter pw = null;
        try {
            File file = new File(filepath); //????????????(??????????????????)
            //????????????????????????
            fis = new FileInputStream(file);
            isr = new InputStreamReader(fis);
            br = new BufferedReader(isr);
            StringBuffer buffer = new StringBuffer();

            //??????????????????
            for (int i = 0;
                (temp = br.readLine()) != null; i++) {
                buffer.append(temp);
                // ??????????????????????????? ?????????"\n"
                buffer = buffer.append(System.getProperty("line.separator"));
            }
            buffer.append(filein);

            fos = new FileOutputStream(file);
            pw = new PrintWriter(fos);
            pw.write(buffer.toString().toCharArray());
            pw.flush();
            bool = true;
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        } finally {
            //??????????????????
            if (pw != null) {
                pw.close();
            }
            if (fos != null) {
                fos.close();
            }
            if (br != null) {
                br.close();
            }
            if (isr != null) {
                isr.close();
            }
            if (fis != null) {
                fis.close();
            }
        }
        return bool;
    }

    // ???json??????????????????????????????
    public static boolean writeFile(String filePath, String sets) {
        FileOutputStream fileOutputStream = null;
        OutputStreamWriter writer = null;
        Boolean result = false;
        try {
            fileOutputStream = new FileOutputStream(filePath, false);
            writer = new OutputStreamWriter(fileOutputStream, "UTF-8");
            writer.write(sets);
            result = true;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            result = false;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            result = false;
        } catch (IOException e) {
            e.printStackTrace();
            result = false;
        } finally {
            try {
                writer.close();
                fileOutputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return result;
    }

    /**
     * ????????????
     * @param fileName ?????????????????????
     * @return
     */
    public static boolean delFile(String fileName) {
        Boolean bool = false;
        String filenameTemp = fileName;
        File file = new File(filenameTemp);
        try {
            if (file.exists()) {
                file.delete();
                bool = true;
            }
        } catch (Exception e) {
            // TODO: handle exception
        }
        return bool;
    }

    /**
     * ????????????IP
     * @return
     */
    public static String getLocalIPAddress() throws IOException {
        InetAddress ia = InetAddress.getLocalHost();
        return ia.getHostAddress();
    }

    /** 
     * ??????????????????????????????IP?????????????????????????????????. 
     */
    public static final String getIpAddr(final HttpServletRequest request) throws Exception {
        if (request == null) {
            throw (new Exception("getIpAddr method HttpServletRequest Object is null"));
        }
        String ipString = request.getHeader("x-forwarded-for");
        if ((!isNotNull(ipString)) || "unknown".equalsIgnoreCase(ipString)) {
            ipString = request.getHeader("Proxy-Client-IP");
        }
        if ((!isNotNull(ipString)) || "unknown".equalsIgnoreCase(ipString)) {
            ipString = request.getHeader("WL-Proxy-Client-IP");
        }
        if ((!isNotNull(ipString)) || "unknown".equalsIgnoreCase(ipString)) {
            ipString = request.getRemoteAddr();
        }

        // ?????????????????????????????????unknown???ip  
        final String[] arr = ipString.split(",");
        for (final String str: arr) {
            if (!"unknown".equalsIgnoreCase(str)) {
                ipString = str;
                break;
            }
        }

        return ipString;
    }

    /**
     * ????????????
     * @param fileName  ?????????????????????
     * @param filecontent   ????????????
     * @return  ????????????????????????????????????true
     */
    public static boolean createFile(String fileName, String filecontent) {
        Boolean bool = false;
        File file = new File(fileName);
        try {
            //?????????????????????????????????????????????
            if (file.exists()) {
                file.delete();
            }
            if (!file.exists()) {
                file.createNewFile();
            }

            StringManagerUtils.writeFileContent(fileName, filecontent);
            bool = true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return bool;
    }

    //??????json????????????
    public String getFilePath(String index4Str, String path0) {
        URL url = getClass().getProtectionDomain().getCodeSource().getLocation();
        String path = url.toString();
        int index = path.indexOf(index4Str);
        if (index == -1) {
            index = path.indexOf("WEB-INF");
        }

        if (index == -1) {
            index = path.indexOf("bin");
        }

        path = path.substring(0, index);
        if (path.startsWith("zip")) { // ???class?????????war?????????????????????zip:D:/...???????????????
            path = path.substring(4);
        } else if (path.startsWith("file")) { // ???class?????????class???????????????????????????file:/D:/...???????????????
            path = path.substring(6);
        } else if (path.startsWith("jar")) { // ???class?????????jar??????????????????????????????jar:file:/D:/...???????????????
            path = path.substring(10);
        }
        try {
            path = URLDecoder.decode(path, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        path = path + path0 + index4Str;
        return path;
    }

    public static byte[] subBytes(byte[] src, int begin, int count) {
        byte[] bs = new byte[count];
        System.arraycopy(src, begin, bs, 0, count);
        return bs;
    }

    //byte?????????16???????????????
    public static String bytesToHexString(byte[] src, int rc) {
        StringBuilder stringBuilder = new StringBuilder("");
        if (src == null || src.length <= 0) {
            return null;
        }
        for (int i = 0; i < rc; i++) {
            int v = src[i] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
            if (i < rc - 1) {
                stringBuilder.append(" ");
            }
        }
        return stringBuilder.toString();
    }

    /**
     * ???16????????????????????????byte[]
     * 
     * @param str
     * @return
     */
    public static byte[] hexStringToBytes(String str) {
        if (str == null || str.trim().equals("")) {
            return new byte[0];
        }

        byte[] bytes = new byte[str.length() / 2];
        for (int i = 0; i < str.length() / 2; i++) {
            String subStr = str.substring(i * 2, i * 2 + 2);
            bytes[i] = (byte) Integer.parseInt(subStr, 16);
        }

        return bytes;
    }


    // char?????????byte[2]??????  
    public static byte[] getByteArray(char c) {
        byte[] b = new byte[2];
        b[0] = (byte)((c & 0xff00) >> 8);
        b[1] = (byte)(c & 0x00ff);
        return b;
    }

    // ???byte?????????index????????????????????????????????????char  
    public static char getChar(byte[] arr, int index) {
        return (char)(0xff00 & arr[index] << 8 | (0xff & arr[index + 1]));
    }
    // short?????????byte[2]??????  
    public static byte[] getByteArray(short s) {
        byte[] b = new byte[2];
        b[0] = (byte)((s & 0xff00) >> 8);
        b[1] = (byte)(s & 0x00ff);
        return b;
    }
    // ???byte?????????index????????????????????????????????????short  
    public static short getShort(byte[] arr, int index) {
        return (short)(0xff00 & arr[index] << 8 | (0xff & arr[index + 1]));
    }
    // ???byte?????????index?????????????????????????????????????????????short  
    public static int getUnsignedShort(byte[] arr, int index) {
        return (int)((0xff00 & arr[index] << 8 | (0xff & arr[index + 1])) & 0x0000FFFF);
    }
    public static short getShort(byte data) {
        return (short)(0xff00 & 0x00 << 8 | (0xff & data));
    }
    // int?????????byte[4]??????  
    public static byte[] getByteArray(int i) {
        byte[] b = new byte[4];
        b[0] = (byte)((i & 0xff000000) >> 24);
        b[1] = (byte)((i & 0x00ff0000) >> 16);
        b[2] = (byte)((i & 0x0000ff00) >> 8);
        b[3] = (byte)(i & 0x000000ff);
        return b;
    }
    // ???byte?????????index????????????4?????????????????????int  
    public static int getInt(byte[] arr, int index) {
        return (0xff000000 & (arr[index + 0] << 24)) |
            (0x00ff0000 & (arr[index + 1] << 16)) |
            (0x0000ff00 & (arr[index + 2] << 8)) |
            (0x000000ff & arr[index + 3]);
    }
    // float?????????byte[4]??????  
    public static byte[] getByteArray(float f) {
        int intbits = Float.floatToIntBits(f); //???float??????????????????????????????int??????  
        return getByteArray(intbits);
    }
    // ???byte?????????index????????????4?????????????????????float  
    public static float getFloat(byte[] arr, int index) {
        return Float.intBitsToFloat(getInt(arr, index));
    }
    // ???byte?????????index????????????4?????????????????????float ??????????????? 
    public static float getFloatLittle(byte[] arr, int index) {
        byte[] bytes = new byte[4];
        for (int i = 3; i >= 0; i--) {
            bytes[3 - i] = arr[index + i];
        }
        //	    	ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
        //	    	DataInputStream dis=new DataInputStream(bais);
        //	        float flt=dis.readFloat();
        //	        return flt;  
        return Float.intBitsToFloat(getInt(bytes, 0));
    }
    // long?????????byte[8]??????  
    public static byte[] getByteArray(long l) {
        byte b[] = new byte[8];
        b[0] = (byte)(0xff & (l >> 56));
        b[1] = (byte)(0xff & (l >> 48));
        b[2] = (byte)(0xff & (l >> 40));
        b[3] = (byte)(0xff & (l >> 32));
        b[4] = (byte)(0xff & (l >> 24));
        b[5] = (byte)(0xff & (l >> 16));
        b[6] = (byte)(0xff & (l >> 8));
        b[7] = (byte)(0xff & l);
        return b;
    }
    // ???byte?????????index????????????8?????????????????????long  
    public static long getLong(byte[] arr, int index) {
        return (0xff00000000000000L & ((long) arr[index + 0] << 56)) |
            (0x00ff000000000000L & ((long) arr[index + 1] << 48)) |
            (0x0000ff0000000000L & ((long) arr[index + 2] << 40)) |
            (0x000000ff00000000L & ((long) arr[index + 3] << 32)) |
            (0x00000000ff000000L & ((long) arr[index + 4] << 24)) |
            (0x0000000000ff0000L & ((long) arr[index + 5] << 16)) |
            (0x000000000000ff00L & ((long) arr[index + 6] << 8)) |
            (0x00000000000000ffL & (long) arr[index + 7]);
    }
    // double?????????byte[8]??????  
    public static byte[] getByteArray(double d) {
        long longbits = Double.doubleToLongBits(d);
        return getByteArray(longbits);
    }
    // ???byte?????????index????????????8?????????????????????double  
    public static double getDouble(byte[] arr, int index) {
        return Double.longBitsToDouble(getLong(arr, index));
    }

    // ???byte?????????index????????????12????????????????????????????????????  
    public static String BCD2TimeString(byte[] arr, int index) {
        String hv = Integer.toHexString(arr[index] & 0xFF);
        return (Integer.toHexString(arr[index] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index] & 0xFF)) : Integer.toHexString(arr[index] & 0xFF)) +
            (Integer.toHexString(arr[index + 1] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index + 1] & 0xFF)) : Integer.toHexString(arr[index + 1] & 0xFF)) +
            "-" + (Integer.toHexString(arr[index + 3] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index + 3] & 0xFF)) : Integer.toHexString(arr[index + 3] & 0xFF)) +
            "-" + (Integer.toHexString(arr[index + 5] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index + 5] & 0xFF)) : Integer.toHexString(arr[index + 5] & 0xFF)) +
            " " + (Integer.toHexString(arr[index + 7] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index + 7] & 0xFF)) : Integer.toHexString(arr[index + 7] & 0xFF)) +
            ":" + (Integer.toHexString(arr[index + 9] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index + 9] & 0xFF)) : Integer.toHexString(arr[index + 9] & 0xFF)) +
            ":" + (Integer.toHexString(arr[index + 11] & 0xFF).length() < 2 ? ("0" + Integer.toHexString(arr[index + 11] & 0xFF)) : Integer.toHexString(arr[index + 11] & 0xFF));
    }

    public static byte[] getCRC16_2(byte[] data) {
        //	        ModBus ??????????????? CRC ( ????????????????????????2?????????, ??? 16 ??????????????????
        //	        CRC ????????????????????????, ???????????????????????????????????????
        //	                            ???????????????????????????????????????????????? (??? CRC ????????????????????? CRC,
        //	                            ????????????????????? CRC ??????????????????CRC??????, ?????????????????????, ????????????????????????
        //
        //	        1) ?????? 1 ??? 16 ??????????????????????????????FFFF(????????? 1) , ?????????????????? CRC????????????
        //	        2) ???????????? 8 ?????????????????? (?????????????????????????????????) ??? 16 ?????? CRC??????????????? 8 ????????????, ??????????????? CRC????????????
        //	        3) ??? CRC ??????????????????????????????( ?????????)??? 0 ???????????????, ?????????????????????????????????
        //	        4) ?????????????????? 0, ????????? 3 ??? ( ??????????????????); ?????????????????? 1, CRC ?????????????????????A001 ( 1010 0000 0000 0001) ???????????????
        //	        5) ???????????? 3 ????????? 4, ???????????? 8 ???,????????????8?????????????????????????????????
        //	        6) ???????????? 2 ????????? 5, ????????????????????????????????????????????????
        //	        7) ???????????????????????????????????????????????????????????????,?????????16???CRC??????????????????????????????????????????
        //	        8) ??????????????? CRC????????????????????? CRC??????

        byte[] crc16_h = {
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x01,
            (byte) 0xC0,
            (byte) 0x80,
            (byte) 0x41,
            (byte) 0x00,
            (byte) 0xC1,
            (byte) 0x81,
            (byte) 0x40
        };

        byte[] crc16_l = {
            (byte) 0x00,
            (byte) 0xC0,
            (byte) 0xC1,
            (byte) 0x01,
            (byte) 0xC3,
            (byte) 0x03,
            (byte) 0x02,
            (byte) 0xC2,
            (byte) 0xC6,
            (byte) 0x06,
            (byte) 0x07,
            (byte) 0xC7,
            (byte) 0x05,
            (byte) 0xC5,
            (byte) 0xC4,
            (byte) 0x04,
            (byte) 0xCC,
            (byte) 0x0C,
            (byte) 0x0D,
            (byte) 0xCD,
            (byte) 0x0F,
            (byte) 0xCF,
            (byte) 0xCE,
            (byte) 0x0E,
            (byte) 0x0A,
            (byte) 0xCA,
            (byte) 0xCB,
            (byte) 0x0B,
            (byte) 0xC9,
            (byte) 0x09,
            (byte) 0x08,
            (byte) 0xC8,
            (byte) 0xD8,
            (byte) 0x18,
            (byte) 0x19,
            (byte) 0xD9,
            (byte) 0x1B,
            (byte) 0xDB,
            (byte) 0xDA,
            (byte) 0x1A,
            (byte) 0x1E,
            (byte) 0xDE,
            (byte) 0xDF,
            (byte) 0x1F,
            (byte) 0xDD,
            (byte) 0x1D,
            (byte) 0x1C,
            (byte) 0xDC,
            (byte) 0x14,
            (byte) 0xD4,
            (byte) 0xD5,
            (byte) 0x15,
            (byte) 0xD7,
            (byte) 0x17,
            (byte) 0x16,
            (byte) 0xD6,
            (byte) 0xD2,
            (byte) 0x12,
            (byte) 0x13,
            (byte) 0xD3,
            (byte) 0x11,
            (byte) 0xD1,
            (byte) 0xD0,
            (byte) 0x10,
            (byte) 0xF0,
            (byte) 0x30,
            (byte) 0x31,
            (byte) 0xF1,
            (byte) 0x33,
            (byte) 0xF3,
            (byte) 0xF2,
            (byte) 0x32,
            (byte) 0x36,
            (byte) 0xF6,
            (byte) 0xF7,
            (byte) 0x37,
            (byte) 0xF5,
            (byte) 0x35,
            (byte) 0x34,
            (byte) 0xF4,
            (byte) 0x3C,
            (byte) 0xFC,
            (byte) 0xFD,
            (byte) 0x3D,
            (byte) 0xFF,
            (byte) 0x3F,
            (byte) 0x3E,
            (byte) 0xFE,
            (byte) 0xFA,
            (byte) 0x3A,
            (byte) 0x3B,
            (byte) 0xFB,
            (byte) 0x39,
            (byte) 0xF9,
            (byte) 0xF8,
            (byte) 0x38,
            (byte) 0x28,
            (byte) 0xE8,
            (byte) 0xE9,
            (byte) 0x29,
            (byte) 0xEB,
            (byte) 0x2B,
            (byte) 0x2A,
            (byte) 0xEA,
            (byte) 0xEE,
            (byte) 0x2E,
            (byte) 0x2F,
            (byte) 0xEF,
            (byte) 0x2D,
            (byte) 0xED,
            (byte) 0xEC,
            (byte) 0x2C,
            (byte) 0xE4,
            (byte) 0x24,
            (byte) 0x25,
            (byte) 0xE5,
            (byte) 0x27,
            (byte) 0xE7,
            (byte) 0xE6,
            (byte) 0x26,
            (byte) 0x22,
            (byte) 0xE2,
            (byte) 0xE3,
            (byte) 0x23,
            (byte) 0xE1,
            (byte) 0x21,
            (byte) 0x20,
            (byte) 0xE0,
            (byte) 0xA0,
            (byte) 0x60,
            (byte) 0x61,
            (byte) 0xA1,
            (byte) 0x63,
            (byte) 0xA3,
            (byte) 0xA2,
            (byte) 0x62,
            (byte) 0x66,
            (byte) 0xA6,
            (byte) 0xA7,
            (byte) 0x67,
            (byte) 0xA5,
            (byte) 0x65,
            (byte) 0x64,
            (byte) 0xA4,
            (byte) 0x6C,
            (byte) 0xAC,
            (byte) 0xAD,
            (byte) 0x6D,
            (byte) 0xAF,
            (byte) 0x6F,
            (byte) 0x6E,
            (byte) 0xAE,
            (byte) 0xAA,
            (byte) 0x6A,
            (byte) 0x6B,
            (byte) 0xAB,
            (byte) 0x69,
            (byte) 0xA9,
            (byte) 0xA8,
            (byte) 0x68,
            (byte) 0x78,
            (byte) 0xB8,
            (byte) 0xB9,
            (byte) 0x79,
            (byte) 0xBB,
            (byte) 0x7B,
            (byte) 0x7A,
            (byte) 0xBA,
            (byte) 0xBE,
            (byte) 0x7E,
            (byte) 0x7F,
            (byte) 0xBF,
            (byte) 0x7D,
            (byte) 0xBD,
            (byte) 0xBC,
            (byte) 0x7C,
            (byte) 0xB4,
            (byte) 0x74,
            (byte) 0x75,
            (byte) 0xB5,
            (byte) 0x77,
            (byte) 0xB7,
            (byte) 0xB6,
            (byte) 0x76,
            (byte) 0x72,
            (byte) 0xB2,
            (byte) 0xB3,
            (byte) 0x73,
            (byte) 0xB1,
            (byte) 0x71,
            (byte) 0x70,
            (byte) 0xB0,
            (byte) 0x50,
            (byte) 0x90,
            (byte) 0x91,
            (byte) 0x51,
            (byte) 0x93,
            (byte) 0x53,
            (byte) 0x52,
            (byte) 0x92,
            (byte) 0x96,
            (byte) 0x56,
            (byte) 0x57,
            (byte) 0x97,
            (byte) 0x55,
            (byte) 0x95,
            (byte) 0x94,
            (byte) 0x54,
            (byte) 0x9C,
            (byte) 0x5C,
            (byte) 0x5D,
            (byte) 0x9D,
            (byte) 0x5F,
            (byte) 0x9F,
            (byte) 0x9E,
            (byte) 0x5E,
            (byte) 0x5A,
            (byte) 0x9A,
            (byte) 0x9B,
            (byte) 0x5B,
            (byte) 0x99,
            (byte) 0x59,
            (byte) 0x58,
            (byte) 0x98,
            (byte) 0x88,
            (byte) 0x48,
            (byte) 0x49,
            (byte) 0x89,
            (byte) 0x4B,
            (byte) 0x8B,
            (byte) 0x8A,
            (byte) 0x4A,
            (byte) 0x4E,
            (byte) 0x8E,
            (byte) 0x8F,
            (byte) 0x4F,
            (byte) 0x8D,
            (byte) 0x4D,
            (byte) 0x4C,
            (byte) 0x8C,
            (byte) 0x44,
            (byte) 0x84,
            (byte) 0x85,
            (byte) 0x45,
            (byte) 0x87,
            (byte) 0x47,
            (byte) 0x46,
            (byte) 0x86,
            (byte) 0x82,
            (byte) 0x42,
            (byte) 0x43,
            (byte) 0x83,
            (byte) 0x41,
            (byte) 0x81,
            (byte) 0x80,
            (byte) 0x40
        };

        int crc = 0x0000ffff;
        int ucCRCHi = 0x00ff;
        int ucCRCLo = 0x00ff;
        int iIndex;
        for (int i = 0; i < data.length; ++i) {
            iIndex = (ucCRCLo ^ data[i]) & 0x00ff;
            ucCRCLo = ucCRCHi ^ crc16_h[iIndex];
            ucCRCHi = crc16_l[iIndex];
        }

        crc = ((ucCRCHi & 0x00ff) << 8) | (ucCRCLo & 0x00ff) & 0xffff;
        //?????????????????????????????????????????????Modbus CRC16?????????
        crc = ((crc & 0xFF00) >> 8) | ((crc & 0x00FF) << 8);


        byte[] CRCByteArr = StringManagerUtils.hexStringToBytes(Integer.toHexString(crc));


        return CRCByteArr;
    }


    public static byte[] getCRC16(byte[] bytes) {
        //CRC???????????????1
        int CRC = 0x0000ffff;
        //??????????????????
        int POLYNOMIAL = 0x0000a001;
        int i, j;
        for (i = 0; i < bytes.length; i++) {
            CRC ^= ((int) bytes[i] & 0x000000ff);
            for (j = 0; j < 8; j++) {
                if ((CRC & 0x00000001) != 0) {
                    CRC >>= 1;
                    CRC ^= POLYNOMIAL;
                } else {
                    CRC >>= 1;
                }
            }
        }
        //???????????????16??????
        String result = Integer.toHexString(CRC).toUpperCase();
        if (result.length() != 4) {
            StringBuffer sb = new StringBuffer("0000");
            result = sb.replace(4 - result.length(), 4, result).toString();
        }
        //???????????????
        byte[] CRCByteArr = StringManagerUtils.hexStringToBytes(result.substring(2, 4) + result.substring(0, 2));
        return CRCByteArr;
    }


    public static byte[] linlByteArray(byte[] array1, byte[] array2) {
        if (array1 == null) {
            return array2;
        }

        if (array2 == null) {
            return array1;
        }

        byte[] resultByte = java.util.Arrays.copyOf(array1, array1.length + array2.length);
        for (int i = 0; i < array2.length; i++) {
            resultByte[array1.length + i] = array2[i];
        }
        return resultByte;
    }

    public static String join(Object objarr[], String sign) {
        String result = "";
        for (int i = 0; objarr != null && i < objarr.length; i++) {
            result += objarr[i] + "";
            if (i < objarr.length - 1) {
                result += sign;
            }
        }
        return result;
    }

    public static String join(List < Object > objarr, String sign) {
        String result = "";
        for (int i = 0; objarr != null && i < objarr.size(); i++) {
            result += objarr.get(i) + "";
            if (i < objarr.size() - 1) {
                result += sign;
            }
        }
        return result;
    }

    public static String joinStringArr(String objarr[], String sign) {
        String result = "";
        for (int i = 0; objarr != null && i < objarr.length; i++) {
            result += "\"" + objarr[i] + "\"";
            if (i < objarr.length - 1) {
                result += sign;
            }
        }
        return result;
    }

    public static String joinStringArr(List < String > objarr, String sign) {
        String result = "";
        for (int i = 0; objarr != null && i < objarr.size(); i++) {
            result += "\"" + objarr.get(i) + "\"";
            if (i < objarr.size() - 1) {
                result += sign;
            }
        }
        return result;
    }

    public static String joinStringArr2(List < String > objarr, String sign) {
        String result = "";
        for (int i = 0; objarr != null && i < objarr.size(); i++) {
            result += "'" + objarr.get(i) + "'";
            if (i < objarr.size() - 1) {
                result += sign;
            }
        }
        return result;
    }

    public static String inChangeToExists(String values, String column) {
        String ids[] = values.split(",");
        String result = "select 1 from (";
        for (int i = 0; i < ids.length; i++) {
            if (i == 0) {
                result += " select " + ids[i] + " a from dual ";
            } else {
                result += "union all select " + ids[i] + " a from dual ";
            }
        }
        result += ") where t." + column + "=a";
        return result;
    }

    public static String getMacAddress() {
        try {
            Enumeration < NetworkInterface > allNetInterfaces = NetworkInterface.getNetworkInterfaces();
            byte[] mac = null;
            while (allNetInterfaces.hasMoreElements()) {
                NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
                if (netInterface.isLoopback() || netInterface.isVirtual() || netInterface.isPointToPoint() || !netInterface.isUp()) {
                    continue;
                } else {
                    mac = netInterface.getHardwareAddress();
                    if (mac != null) {
                        StringBuilder sb = new StringBuilder();
                        for (int i = 0; i < mac.length; i++) {
                            sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
                        }
                        if (sb.length() > 0) {
                            return sb.toString();
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
    //?????? Java ???????????????,?????????????????????
    public static String delOutsideSpace(String str) throws Exception {
        if (!isNotNull(str)) {
            return "";
        }
        String regStartSpace = "^[??? ]*";
        String regEndSpace = "[??? ]*$";
        // ???????????? replaceAll
        // ???????????????????????????????????? ?????????????????????????????????
        String strDelSpace = str.replaceAll(regStartSpace, "").replaceAll(regEndSpace, "");
        return strDelSpace;
    }

    public void arrayCopy(Object src, int srcPos, Object dest, int destPos, int length) {}

    public static String convertStreamToString(InputStream is, String encoding) {
        StringBuilder sb = new StringBuilder();
        try {
            InputStreamReader isr = new InputStreamReader(is, encoding);
            BufferedReader reader = new BufferedReader(isr);
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
            isr.close();
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return sb.toString();
    }

    public static String getWellRuningRangeJson(String rgzsjd) {
        String result = "";
        StringBuffer dynSbf = new StringBuffer();
        if (StringManagerUtils.isNotNull(rgzsjd)) {
            dynSbf.append("[");
            String[] wellRunRimeArr = rgzsjd.split(";");
            for (int i = 0; i < wellRunRimeArr.length; i++) {
                if ("00:00-24:00".equals(wellRunRimeArr[i]) || "00:00-00:00".equals(wellRunRimeArr[i])) {
                    dynSbf.append("{\"startTime\":\"00:00\",\"endTime\":\"00:00\"}");
                    break;
                } else {
                    String[] tempArr = wellRunRimeArr[i].split("-");
                    dynSbf.append("{\"startTime\":\"" + tempArr[0] + "\",\"endTime\":\"" + tempArr[1] + "\"}");
                }

                if (i < wellRunRimeArr.length - 1) {
                    dynSbf.append(",");
                }
            }
            dynSbf.append("]");
            result = dynSbf.toString();
        } else {
            result = "[{\"startTime\":\"\",\"endTime\":\"\"}]";
        }
        return result;
    }

    public static String objectToString(Object obj, String dataType) {
        String result = "";
        if ("int".equalsIgnoreCase(dataType) || "uint".equalsIgnoreCase(dataType) || dataType.contains("int")) {
            result = StringManagerUtils.stringToInteger(obj + "") + "";
        } else if ("float32".equalsIgnoreCase(dataType) || "float".equalsIgnoreCase(dataType)) {
            result = StringManagerUtils.stringToFloat(obj + "") + "";
        } else if ("float64".equalsIgnoreCase(dataType)) {
            result = StringManagerUtils.stringToDouble(obj + "") + "";
        } else if ("string".equalsIgnoreCase(dataType)) {
            result = obj + "";
        } else if ("bool".equalsIgnoreCase(dataType) || "boolean".equalsIgnoreCase(dataType)) {
            result = StringManagerUtils.stringToBoolean(obj + "") + "";
        } else if ("asc".equalsIgnoreCase(dataType)) {
            result = obj + "";
        } else if ("bcd".equalsIgnoreCase(dataType)) {
            result = obj + "";
        }
        return result;
    }

    public static String objectToString(Object obj, String dataType, float ratio) {
        String result = "";
        if ("int".equalsIgnoreCase(dataType) || "uint".equalsIgnoreCase(dataType) || dataType.contains("int")) {
            result = StringManagerUtils.stringToInteger(obj + "") + "";
            if (ratio != 0) {
                result = StringManagerUtils.stringToInteger(obj + "") / ratio + "";
            }
        } else if ("float32".equalsIgnoreCase(dataType) || "float".equalsIgnoreCase(dataType)) {
            result = StringManagerUtils.stringToFloat(obj + "") + "";
            if (ratio != 0) {
                result = StringManagerUtils.stringToFloat(obj + "") / ratio + "";
            }
        } else if ("float64".equalsIgnoreCase(dataType)) {
            result = StringManagerUtils.stringToDouble(obj + "") + "";
            if (ratio != 0) {
                result = StringManagerUtils.stringToDouble(obj + "") / ratio + "";
            }
        } else if ("string".equalsIgnoreCase(dataType)) {
            result = obj + "";
        } else if ("bool".equalsIgnoreCase(dataType) || "boolean".equalsIgnoreCase(dataType)) {
            result = StringManagerUtils.stringToBoolean(obj + "") + "";
        } else if ("asc".equalsIgnoreCase(dataType)) {
            result = obj + "";
        } else if ("bcd".equalsIgnoreCase(dataType)) {
            result = obj + "";
        }
        return result;
    }

    public static String objectListToString(List < Object > list, String dataType) {
        StringBuffer jsonBuffer = new StringBuffer();
        for (int i = 0; i < list.size(); i++) {
            if(list.get(i)==null){
            	jsonBuffer.append(",");
            }else if ("int".equalsIgnoreCase(dataType) || "uint".equalsIgnoreCase(dataType) || dataType.contains("int")) {
                jsonBuffer.append(StringManagerUtils.stringToInteger(list.get(i) + "") + ",");
            } else if ("float32".equalsIgnoreCase(dataType)) {
                jsonBuffer.append(StringManagerUtils.stringToFloat(list.get(i) + "") + ",");
            } else if ("float64".equalsIgnoreCase(dataType)) {
                jsonBuffer.append(StringManagerUtils.stringToDouble(list.get(i) + "") + ",");
            } else if ("string".equalsIgnoreCase(dataType)) {
                jsonBuffer.append(list.get(i) + ",");
            } else if ("bool".equalsIgnoreCase(dataType) || "boolean".equalsIgnoreCase(dataType)) {
                if (list.size() == 1) {
                    jsonBuffer.append(StringManagerUtils.stringToBoolean(list.get(i) + "") + ",");
                } else {
                    jsonBuffer.append((StringManagerUtils.stringToBoolean(list.get(i) + "") ? 1 : 0) + ",");
                }

            } else if ("asc".equalsIgnoreCase(dataType)) {
                jsonBuffer.append(list.get(i) + ",");
            } else if ("bcd".equalsIgnoreCase(dataType)) {
                jsonBuffer.append(list.get(i) + ",");
            }
        }
        if (jsonBuffer.toString().endsWith(",")) {
            jsonBuffer.deleteCharAt(jsonBuffer.length() - 1);
        }
        return jsonBuffer.toString();
    }

    public static String diagramDataSimplification(String diagramData, int bit) {
        String[] diagramDataArr = diagramData.split(",");
        StringBuffer dataSbf = new StringBuffer();
        for (int i = 0; i < diagramDataArr.length; i++) {
            dataSbf.append(StringManagerUtils.stringToFloat(diagramDataArr[i], bit) + ",");
        }
        if (dataSbf.toString().endsWith(",")) {
            dataSbf.deleteCharAt(dataSbf.length() - 1);
        }
        return dataSbf.toString();
    }

    public static long getTimeDifference(String fromDateStr, String toDateStr, String format) {
        long result = 0;
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
            long from = 0;
            if (StringManagerUtils.isNotNull(fromDateStr)) {
                Date fromDate = simpleDateFormat.parse(fromDateStr);
                from = fromDate.getTime();
            }
            Date toDate = simpleDateFormat.parse(toDateStr);
            long to = toDate.getTime();
            result = to - from;
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            result = 0;
        }
        return result;
    }

    public static boolean sendEMail(String topic, String content, List < String > receivingAccount) {
        boolean result = false;
        if (receivingAccount == null || receivingAccount.size() == 0) {
            return result;
        }
        String myEMailAccount = Config.getInstance().configFile.getEmail().getSnedAccount().getAccount();
        String myEMailPassword = Config.getInstance().configFile.getEmail().getSnedAccount().getPassword(); //YAOLBHNROJWHYCVX  NLEILMQVNBXGRNBT
        String myEMailSMTPHost = Config.getInstance().configFile.getEmail().getSnedAccount().getSmtpHost();
        String smtpPort = Config.getInstance().configFile.getEmail().getSnedAccount().getSmtpPort();
        try {
            Properties properties = System.getProperties();// new Properties();
            //?????????????????????
            properties.setProperty("mail.smtp.host", myEMailSMTPHost);
            properties.setProperty("mail.transport.protocol", "smtp");
            properties.setProperty("mail.smtp.auth", "true");
            
            properties.put("mail.smtp.ssl.enable", "true");
            //SSL??????
            properties.put("mail.smtp.socketFactory.port", smtpPort);
            properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            properties.setProperty("mail.smtp.socketFactory.fallback", "false");
            properties.setProperty("mail.smtp.socketFactory.port", smtpPort);
            //??????session??????
            Session session = Session.getDefaultInstance(properties, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(myEMailAccount, myEMailPassword);
                }
            });

            //??????debug??????
            session.setDebug(false);
            //??????????????????
            Transport transport = session.getTransport();
            //???????????????
            transport.connect(myEMailSMTPHost, myEMailAccount, myEMailPassword);
            //??????????????????
            MimeMessage mimeMessage = new MimeMessage(session);
            //???????????????
            String nick = javax.mail.internet.MimeUtility.encodeText("????????????????????????????????????????????????");
            mimeMessage.setFrom(new InternetAddress(nick + "<" + myEMailAccount + ">"));
            //???????????????
            for (int i = 0; i < receivingAccount.size(); i++) {
                if (i == 0) {
                    mimeMessage.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(receivingAccount.get(i)));
                } else {
                    mimeMessage.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(receivingAccount.get(i)));
                }
                StringManagerUtils.printLog("???????????????" + receivingAccount.get(i) + "," + topic + "," + content);
            }
            //????????????
            mimeMessage.setSubject(topic);
            //????????????
            mimeMessage.setContent(content, "text/html;charset=UTF-8");
            //????????????
            mimeMessage.setSentDate(new Date());
            //????????????
            mimeMessage.saveChanges();
            //????????????
            transport.sendMessage(mimeMessage, mimeMessage.getAllRecipients());
            //????????????
            transport.close();
        } catch (Exception e) {
            result = false;
            for (int i = 0; i < receivingAccount.size(); i++) {
                StringManagerUtils.printLog("?????????????????????" + receivingAccount.get(i) + "," + topic + "," + content);
            }
            e.printStackTrace();
        }
        return result;
    }

    public static String stringToMD5(String plainText) {
        byte[] secretBytes = null;
        try {
            secretBytes = MessageDigest.getInstance("md5").digest(plainText.getBytes());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("????????????md5?????????");
        }
        String md5code = new BigInteger(1, secretBytes).toString(16);
        for (int i = 0; i < 32 - md5code.length(); i++) {
            md5code = "0" + md5code;
        }
        return md5code;
    }

    public static String strGetBytesHex(String s, String charsetName) throws UnsupportedEncodingException {
        StringBuilder rt = new StringBuilder();
        if (null == s) return null;
        byte[] arr;
        if (null != charsetName && charsetName.length() > 0) {
            arr = s.getBytes(charsetName);
        } else {
            arr = s.getBytes();
        }
        if (null == arr) return null;
        for (int i = 0; i < arr.length; ++i) {
            String s2 = Integer.toHexString(arr[i] & 0x0FF).toUpperCase();
            if (s2.length() < 2) s2 = "0" + s2;
            rt.append(s2);
        }
        return rt.toString();
    }
}