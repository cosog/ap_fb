package com.cosog.model.drive;

public class AcquisitionItemInfo {

	public int addr;
	public String column;
	public String title;
	public String value;
	public String dataType;
	public String unit;
	public int alarmLevel;
	
	public float alarmLimit;
	public float hystersis;
	public String alarmInfo;
	public int alarmType;
	public AcquisitionItemInfo() {
		super();
	}

	public AcquisitionItemInfo(int addr, String column, String title, String value, String dataType, String unit,
			int alarmLevel, float alarmLimit, float hystersis, String alarmInfo, int alarmType) {
		super();
		this.addr = addr;
		this.column = column;
		this.title = title;
		this.value = value;
		this.dataType = dataType;
		this.unit = unit;
		this.alarmLevel = alarmLevel;
		this.alarmLimit = alarmLimit;
		this.hystersis = hystersis;
		this.alarmInfo = alarmInfo;
		this.alarmType = alarmType;
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

	public float getAlarmLimit() {
		return alarmLimit;
	}

	public void setAlarmLimit(float alarmLimit) {
		this.alarmLimit = alarmLimit;
	}

	public float getHystersis() {
		return hystersis;
	}

	public void setHystersis(float hystersis) {
		this.hystersis = hystersis;
	}

	public String getAlarmInfo() {
		return alarmInfo;
	}

	public void setAlarmInfo(String alarmInfo) {
		this.alarmInfo = alarmInfo;
	}

	public int getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(int alarmType) {
		this.alarmType = alarmType;
	}
	
}
