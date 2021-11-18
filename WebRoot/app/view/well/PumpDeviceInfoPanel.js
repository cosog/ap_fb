Ext.define("AP.view.well.PumpDeviceInfoPanel", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpDeviceInfoPanel', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var DiaphragmPumpDeviceInfoPanel = Ext.create('AP.view.well.DiaphragmPumpDeviceInfoPanel');
        var ScrewPumpDeviceInfoPanel = Ext.create('AP.view.well.ScrewPumpDeviceInfoPanel');
        var LinearMotorPumpDeviceInfoPanel = Ext.create('AP.view.well.LinearMotorPumpDeviceInfoPanel');
        var ElectricSubmersiblePumpDeviceInfoPanel = Ext.create('AP.view.well.ElectricSubmersiblePumpDeviceInfoPanel');
        var JetPumpDeviceInfoPanel = Ext.create('AP.view.well.JetPumpDeviceInfoPanel');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PumpDeviceManagerTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '隔膜泵',
        				layout: "fit",
        				id:'DiaphragmPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [DiaphragmPumpDeviceInfoPanel]
        			},{
        				title: '螺杆泵',
        				layout: "fit",
        				id:'ScrewPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [ScrewPumpDeviceInfoPanel]
        			},{
        				title: '直线电机泵',
        				layout: "fit",
        				id:'LinearMotorPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [LinearMotorPumpDeviceInfoPanel]
        			},{
        				title: '电潜泵',
        				layout: "fit",
        				id:'ElectricSubmersiblePumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [ElectricSubmersiblePumpDeviceInfoPanel]
        			},{
        				title: '射流泵',
        				layout: "fit",
        				id:'JetPumpDeviceInfoTabPanel_Id',
        				border: false,
        				items: [JetPumpDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="DiaphragmPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadDiaphragmPumpDeviceInfoTable(true);
        					}else if(newCard.id=="ScrewPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadScrewPumpDeviceInfoTable(true);
        					}else if(newCard.id=="LinearMotorPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadLinearMotorPumpDeviceInfoTable(true);
        					}else if(newCard.id=="ElectricSubmersiblePumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadElectricSubmersiblePumpDeviceInfoTable(true);
        					}else if(newCard.id=="JetPumpDeviceInfoTabPanel_Id"){
        						CreateAndLoadJetPumpDeviceInfoTable(true);
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});