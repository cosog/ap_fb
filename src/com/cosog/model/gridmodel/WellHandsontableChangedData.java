package com.cosog.model.gridmodel;

import java.util.List;

public class WellHandsontableChangedData {

	private List<String> delidslist;

    private List<Updatelist> updatelist;

    private List<Updatelist> insertlist;

    public void setDelidslist(List<String> delidslist){
        this.delidslist = delidslist;
    }
    public List<String> getDelidslist(){
        return this.delidslist;
    }
    public void setUpdatelist(List<Updatelist> updatelist){
        this.updatelist = updatelist;
    }
    public List<Updatelist> getUpdatelist(){
        return this.updatelist;
    }
    public void setInsertlist(List<Updatelist> insertlist){
        this.insertlist = insertlist;
    }
    public List<Updatelist> getInsertlist(){
        return this.insertlist;
    }
	
	public static class Updatelist
	{
	    private String id;

	    private String orgName="";

	    private String wellName="";

	    private String protocolName="";

	    private String acquisitionUnit="";

	    private String signInId="";

	    private String slave="";
	    
	    private String factoryNumber="";
	    
	    private String model="";
	    
	    private String productionDate="";
	    
	    private String deliveryDate="";
	    
	    private String commissioningDate="";
	    
	    private String controlcabinetDodel="";
	    
	    private String pipelineLength="";
	    
	    private String videoUrl="";
	    
	    private String sortNum="";

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getOrgName() {
			return orgName;
		}

		public void setOrgName(String orgName) {
			this.orgName = orgName;
		}

		public String getWellName() {
			return wellName;
		}

		public void setWellName(String wellName) {
			this.wellName = wellName;
		}

		public String getAcquisitionUnit() {
			return acquisitionUnit;
		}

		public void setAcquisitionUnit(String acquisitionUnit) {
			this.acquisitionUnit = acquisitionUnit;
		}

		public String getVideoUrl() {
			return videoUrl;
		}

		public void setVideoUrl(String videoUrl) {
			this.videoUrl = videoUrl;
		}

		public String getSortNum() {
			return sortNum;
		}

		public void setSortNum(String sortNum) {
			this.sortNum = sortNum;
		}

		public String getProtocolName() {
			return protocolName;
		}

		public void setProtocolName(String protocolName) {
			this.protocolName = protocolName;
		}

		public String getSignInId() {
			return signInId;
		}

		public void setSignInId(String signInId) {
			this.signInId = signInId;
		}

		public String getSlave() {
			return slave;
		}

		public void setSlave(String slave) {
			this.slave = slave;
		}

		public String getFactoryNumber() {
			return factoryNumber;
		}

		public void setFactoryNumber(String factoryNumber) {
			this.factoryNumber = factoryNumber;
		}

		public String getModel() {
			return model;
		}

		public void setModel(String model) {
			this.model = model;
		}

		public String getProductionDate() {
			return productionDate;
		}

		public void setProductionDate(String productionDate) {
			this.productionDate = productionDate;
		}

		public String getDeliveryDate() {
			return deliveryDate;
		}

		public void setDeliveryDate(String deliveryDate) {
			this.deliveryDate = deliveryDate;
		}

		public String getCommissioningDate() {
			return commissioningDate;
		}

		public void setCommissioningDate(String commissioningDate) {
			this.commissioningDate = commissioningDate;
		}

		public String getControlcabinetDodel() {
			return controlcabinetDodel;
		}

		public void setControlcabinetDodel(String controlcabinetDodel) {
			this.controlcabinetDodel = controlcabinetDodel;
		}

		public String getPipelineLength() {
			return pipelineLength;
		}

		public void setPipelineLength(String pipelineLength) {
			this.pipelineLength = pipelineLength;
		}
	    
	}
}
