Ext.define('AP.view.alarmQuery.CommunicationAlarmInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CommunicationAlarmInfoView',
    layout: "fit",
    id: "CommunicationAlarmInfoView_Id",
    border: false,
    //forceFit : true,
    initComponent: function () {
//    	var CommunicationAlarmStore= Ext.create('AP.store.alarmQuery.CommunicationAlarmStore');
    	var deviceTypeCombStore = new Ext.data.JsonStore({
        	pageSize:defaultWellComboxSize,
            fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
            proxy: {
            	url: context + '/wellInformationManagerController/loadDataDictionaryComboxList',
                type: "ajax",
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (store, options) {
                    var new_params = {
                    	itemCode: 'deviceType'
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
    	
        var deviceTypeCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '设备类型',
                    id: "CommunicationAlarmDeviceTypeListComb_Id",
                    labelWidth: 60,
                    width: 170,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: deviceTypeCombStore,
                    autoSelect: false,
                    editable: false,
                    triggerAction: 'all',
                    displayField: "boxval",
                    valueField: "boxkey",
                    pageSize:comboxPagingStatus,
                    minChars:0,
                    emptyText: cosog.string.all,
                    blankText: cosog.string.all,
                    listeners: {
                        expand: function (sm, selections) {
                            deviceTypeCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("CommunicationAlarmDeviceListComb_Id").setValue('');
                        	Ext.getCmp("CommunicationAlarmGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
        var deviceCombStore = new Ext.data.JsonStore({
        	pageSize:defaultWellComboxSize,
            fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
            proxy: {
            	url: context + '/wellInformationManagerController/loadWellComboxList',
                type: "ajax",
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (store, options) {
                	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellName = Ext.getCmp('CommunicationAlarmDeviceListComb_Id').getValue();
                    var deviceType = Ext.getCmp('CommunicationAlarmDeviceTypeListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: deviceType,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var deviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '设备',
                    id: "CommunicationAlarmDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: deviceCombStore,
                    autoSelect: false,
                    editable: true,
                    triggerAction: 'all',
                    displayField: "boxval",
                    valueField: "boxkey",
                    pageSize:comboxPagingStatus,
                    minChars:0,
                    emptyText: cosog.string.all,
                    blankText: cosog.string.all,
                    listeners: {
                        expand: function (sm, selections) {
                            deviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("CommunicationAlarmGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
    	Ext.apply(this, {
            tbar: [deviceTypeCombo,'-',deviceCombo,'-','-',{
                xtype: 'datefield',
                anchor: '100%',
//                hidden: true,
                fieldLabel: '区间',
                labelWidth: 30,
                width: 130,
                format: 'Y-m-d ',
                value: '',
                id: 'CommunicationAlarmQueryStartDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("CommunicationAlarmGridPanel_Id").getStore().loadPage(1);
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
                id: 'CommunicationAlarmQueryEndDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("CommunicationAlarmGridPanel_Id").getStore().loadPage(1);
                    }
                }
            }]
        });
        this.callParent(arguments);
    }
});