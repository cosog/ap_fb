package com.cosog.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 *  <p>描述：泵设备信息 实体类  tbl_pumpdevice</p>
 *  
 * @author zhao  2021-12-17
 *
 */
@Entity
@Table(name = "tbl_pumpdevice")
public class PumpDeviceInformation implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer orgId;
	private String wellName;
	private Integer deviceType;
	private Integer applicationScenarios;
	private String instanceCode;
	private String alarmInstanceCode;
	private String signInId;
	private String slave;
	private String videoUrl;
	private Integer status;
	private Integer sortNum;
	

	// Constructors
	/** default constructor */
	public PumpDeviceInformation() {
	}

	/** full constructor */
	public PumpDeviceInformation(Integer id, Integer orgId, String wellName, Integer deviceType,
			Integer applicationScenarios, String instanceCode, String alarmInstanceCode, String signInId, String slave,
			String videoUrl, Integer sortNum) {
		super();
		this.id = id;
		this.orgId = orgId;
		this.wellName = wellName;
		this.deviceType = deviceType;
		this.applicationScenarios = applicationScenarios;
		this.instanceCode = instanceCode;
		this.alarmInstanceCode = alarmInstanceCode;
		this.signInId = signInId;
		this.slave = slave;
		this.videoUrl = videoUrl;
		this.sortNum = sortNum;
	}

	@Id
	@GeneratedValue
	@Column(name = "id", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "orgId", precision = 22, scale = 0)
	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	@Column(name = "wellName", nullable = false, length = 50)
	public String getWellName() {
		return wellName;
	}

	public void setWellName(String wellName) {
		this.wellName = wellName;
	}

	@Column(name = "deviceType", precision = 22, scale = 0)
	public Integer getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(Integer deviceType) {
		this.deviceType = deviceType;
	}

	@Column(name = "applicationScenarios", precision = 22, scale = 0)
	public Integer getApplicationScenarios() {
		return applicationScenarios;
	}

	public void setApplicationScenarios(Integer applicationScenarios) {
		this.applicationScenarios = applicationScenarios;
	}

	@Column(name = "instanceCode", nullable = true, length = 50)
	public String getInstanceCode() {
		return instanceCode;
	}

	public void setInstanceCode(String instanceCode) {
		this.instanceCode = instanceCode;
	}

	@Column(name = "alarmInstanceCode", nullable = true, length = 50)
	public String getAlarmInstanceCode() {
		return alarmInstanceCode;
	}

	public void setAlarmInstanceCode(String alarmInstanceCode) {
		this.alarmInstanceCode = alarmInstanceCode;
	}

	@Column(name = "signInId", nullable = true, length = 50)
	public String getSignInId() {
		return signInId;
	}

	public void setSignInId(String signInId) {
		this.signInId = signInId;
	}

	@Column(name = "slave", nullable = true, length = 50)
	public String getSlave() {
		return slave;
	}

	public void setSlave(String slave) {
		this.slave = slave;
	}

	@Column(name = "videoUrl", nullable = true, length = 400)
	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	@Column(name = "sortNum", precision = 22, scale = 0)
	public Integer getSortNum() {
		return sortNum;
	}

	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}

	@Column(name = "status", precision = 22, scale = 0)
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}