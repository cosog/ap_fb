package com.cosog.model.gridmodel;

import java.util.List;

public class AuxiliaryDeviceConfig {
	private int orgId;
	private int deviceType;
	private String deviceName;
	private List<Integer> auxiliaryDevice;
	public int getOrgId() {
		return orgId;
	}
	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}
	public int getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(int deviceType) {
		this.deviceType = deviceType;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public List<Integer> getAuxiliaryDevice() {
		return auxiliaryDevice;
	}
	public void setAuxiliaryDevice(List<Integer> auxiliaryDevice) {
		this.auxiliaryDevice = auxiliaryDevice;
	}
}
