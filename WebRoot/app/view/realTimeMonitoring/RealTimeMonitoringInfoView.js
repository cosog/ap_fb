Ext.define("AP.view.realTimeMonitoring.RealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.realTimeMonitoringInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var PumpRealTimeMonitoringInfoView = Ext.create('AP.view.realTimeMonitoring.PumpRealTimeMonitoringInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"RealTimeMonitoringTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '泵设备',
        				id:'PumpRealTimeMonitoringInfoPanel_Id',
        				items: [PumpRealTimeMonitoringInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '管设备',
        				id:'TubingRealTimeMonitoringInfoPanel_Id',
//        				items: [TubingDeviceInfoPanel],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); //
        					if(newCard.id=="PumpRealTimeMonitoringInfoPanel_Id"){
        						
        					}else if(newCard.id=="TubingRealTimeMonitoringInfoPanel_Id"){
        						
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }

});