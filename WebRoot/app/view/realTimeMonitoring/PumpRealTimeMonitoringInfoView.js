Ext.define("AP.view.realTimeMonitoring.PumpRealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpRealTimeMonitoringInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                    region: 'west',
                    id:'PumpRealTimeMonitoringInfoPanel_Id',
                    width: '20%',
                    split: true,
                    collapsible: true,
                    border: false,
                    layout: 'fit',
                    autoScroll: true
                }, {
                    region: 'center',
                    layout: 'fit',
                    border: false
                },{
                	region: 'east',
                	width: '20%',
                	split: true,
                	collapsible: true,
                	layout: 'fit'
                }]
            }]
        });
        me.callParent(arguments);
    }

});