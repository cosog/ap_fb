package com.cosog.utils;

public class ProtocolItemResolutionData {
	public String columnName="";
	public String value="";
	public String rawValue="";
	public String addr="";
	public String column="";
	public String columnDataType="";
	public String resolutionMode="";
	public String bitIndex="";
	public String unit="";
	public int sort;
	public ProtocolItemResolutionData(String columnName, String value,String rawValue, String addr, String column,
			String columnDataType, String resolutionMode,String bitIndex,String unit,int sort) {
		super();
		this.columnName = columnName;
		this.value = value;
		this.rawValue = rawValue;
		this.addr = addr;
		this.column = column;
		this.columnDataType = columnDataType;
		this.resolutionMode = resolutionMode;
		this.bitIndex = bitIndex;
		this.unit=unit;
		this.sort=sort;
	}
	public ProtocolItemResolutionData(String columnName, String value,String rawValue, String addr, String column,
			String columnDataType, String resolutionMode,String bitIndex,String unit) {
		super();
		this.columnName = columnName;
		this.value = value;
		this.rawValue = rawValue;
		this.addr = addr;
		this.column = column;
		this.columnDataType = columnDataType;
		this.resolutionMode = resolutionMode;
		this.bitIndex = bitIndex;
		this.unit=unit;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getColumn() {
		return column;
	}
	public void setColumn(String column) {
		this.column = column;
	}
	public String getColumnDataType() {
		return columnDataType;
	}
	public void setColumnDataType(String columnDataType) {
		this.columnDataType = columnDataType;
	}
	public String getResolutionMode() {
		return resolutionMode;
	}
	public void setResolutionMode(String resolutionMode) {
		this.resolutionMode = resolutionMode;
	}
	public String getRawValue() {
		return rawValue;
	}
	public void setRawValue(String rawValue) {
		this.rawValue = rawValue;
	}
	public String getBitIndex() {
		return bitIndex;
	}
	public void setBitIndex(String bitIndex) {
		this.bitIndex = bitIndex;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
}
