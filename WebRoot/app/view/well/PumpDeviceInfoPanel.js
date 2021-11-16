Ext.define("AP.view.well.PumpDeviceInfoPanel", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpDeviceInfoPanel', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
//        var PumpDeviceInfoPanel = Ext.create('AP.view.well.PumpDeviceInfoPanel');
//        var PipelineDeviceInfoPanel = Ext.create('AP.view.well.PipelineDeviceInfoPanel');
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
//        				id:'PumpDeviceManagerPanel',
        				border: false,
//        				items: [PumpDeviceInfoPanel]
        			},{
        				title: '螺杆泵',
        				layout: "fit",
//        				id:'PumpDeviceManagerPanel',
        				border: false,
//        				items: [PumpDeviceInfoPanel]
        			},{
        				title: '直线电机泵',
        				layout: "fit",
//        				id:'PumpDeviceManagerPanel',
        				border: false,
//        				items: [PumpDeviceInfoPanel]
        			},{
        				title: '电潜泵',
        				layout: "fit",
//        				id:'PumpDeviceManagerPanel',
        				border: false,
//        				items: [PumpDeviceInfoPanel]
        			},{
        				title: '射流泵',
        				layout: "fit",
//        				id:'PumpDeviceManagerPanel',
        				border: false,
//        				items: [PumpDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
//        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
//        					if(newCard.id=="PumpDeviceManagerPanel"){
//        						CreateAndLoadPumpDeviceInfoTable();
//        					}else if(newCard.id=="PipelineDeviceManagerPanel"){
//        						CreateAndLoadPipelineDeviceInfoTable();
//        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});