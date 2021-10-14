Ext.define('AP.view.log.SystemLogInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.deviceOperationLogInfoView',
    layout: "fit",
    id: "SystemLogView_Id",
    border: false,
    //forceFit : true,
    initComponent: function () {
    	Ext.apply(this, {
            tbar: [{
                xtype: 'datefield',
                anchor: '100%',
//                hidden: true,
                fieldLabel: '区间',
                labelWidth: 30,
                width: 130,
                format: 'Y-m-d ',
                value: '',
                id: 'SystemLogQueryStartDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("SystemLogGridPanel_Id").getStore().loadPage(1);
                    }
                }
            },{
                xtype: 'datefield',
                anchor: '100%',
//                hidden: true,
                fieldLabel: '至',
                labelWidth: 15,
                width: 115,
                format: 'Y-m-d ',
                value: '',
//                value: new Date(),
                id: 'SystemLogQueryEndDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("SystemLogGridPanel_Id").getStore().loadPage(1);
                    }
                }
            }]
        });
        this.callParent(arguments);
    }

});