Ext.define("AP.view.well.PipelineDeviceInfoPanel", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineDeviceInfoPanel', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var HeatingPipelineDeviceInfoPanel = Ext.create('AP.view.well.HeatingPipelineDeviceInfoPanel');
        var WaterGatheringPipelineDeviceInfoPanel = Ext.create('AP.view.well.WaterGatheringPipelineDeviceInfoPanel');
        var GatheringPipelineDeviceInfoPanel = Ext.create('AP.view.well.GatheringPipelineDeviceInfoPanel');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PipelineDeviceManagerTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '加热管',
        				layout: "fit",
        				id:'HeatingPipelineDeviceInfoTabPanel_Id',
        				border: false,
        				items: [HeatingPipelineDeviceInfoPanel]
        			},{
        				title: '采水管',
        				layout: "fit",
        				id:'WaterGatheringPipelineDeviceInfoTabPanel_Id',
        				border: false,
        				items: [WaterGatheringPipelineDeviceInfoPanel]
        			},{
        				title: '集输管',
        				layout: "fit",
        				id:'GatheringPipelineDeviceInfoTabPanel_Id',
        				border: false,
        				items: [GatheringPipelineDeviceInfoPanel]
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="HeatingPipelineDeviceInfoTabPanel_Id"){
        						CreateAndLoadHeatingPipelineDeviceInfoTable(true);
        					}else if(newCard.id=="WaterGatheringPipelineDeviceInfoTabPanel_Id"){
        						CreateAndLoadWaterGatheringPipelineDeviceInfoTable(true);
        					}else if(newCard.id=="GatheringPipelineDeviceInfoTabPanel_Id"){
        						CreateAndLoadGatheringPipelineDeviceInfoTable(true);
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});