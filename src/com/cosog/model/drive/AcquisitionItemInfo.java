package com.cosog.model.drive;

public class AcquisitionItemInfo {

	public int addr;
	public String column;
	public String title;
	public String value;
	public String dataType;
	public String unit;
	public int alarmLevel;
	public AcquisitionItemInfo() {
		super();
	}
	public AcquisitionItemInfo(int addr, String column, String title, String value, String dataType, String unit,
			int alarmLevel) {
		super();
		this.addr = addr;
		this.column = column;
		this.title = title;
		this.value = value;
		this.dataType = dataType;
		this.unit = unit;
		this.alarmLevel = alarmLevel;
	}
	public int getAddr() {
		return addr;
	}
	public void setAddr(int addr) {
		this.addr = addr;
	}
	public String getColumn() {
		return column;
	}
	public void setColumn(String column) {
		this.column = column;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public int getAlarmLevel() {
		return alarmLevel;
	}
	public void setAlarmLevel(int alarmLevel) {
		this.alarmLevel = alarmLevel;
	}
	
}
