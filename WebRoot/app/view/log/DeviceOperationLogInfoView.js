Ext.define('AP.view.log.DeviceOperationLogInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.deviceOperationLogInfoView',
    layout: "fit",
    id: "DeviceOperationLogView_Id",
    border: false,
    //forceFit : true,
    initComponent: function () {
//    	var DeviceOperationLogStore= Ext.create('AP.store.log.DeviceOperationLogStore');
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
                    id: "DeviceOperationLogDeviceTypeListComb_Id",
                    labelWidth: 60,
                    width: 170,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: deviceTypeCombStore,
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
                            deviceTypeCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("DeviceOperationLogDeviceListComb_Id").setValue('');
                        	Ext.getCmp("DeviceOperationLogGridPanel_Id").getStore().loadPage(1);
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
                    var wellName = Ext.getCmp('DeviceOperationLogDeviceListComb_Id').getValue();
                    var deviceType = Ext.getCmp('DeviceOperationLogDeviceTypeListComb_Id').getValue();
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
                    fieldLabel: '井名',
                    id: "DeviceOperationLogDeviceListComb_Id",
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
                        	Ext.getCmp("DeviceOperationLogGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
        var operationTypeCombStore = new Ext.data.JsonStore({
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
                    	itemCode: 'action'
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
    	
        var operationTypeCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '操作',
                    id: "DeviceOperationLogOperationTypeListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: operationTypeCombStore,
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
                        	operationTypeCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("DeviceOperationLogGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
    	Ext.apply(this, {
            tbar: [{
                id: 'DeviceOperationLogColumnStr_Id',
                xtype: 'textfield',
                value: '',
                hidden: true
            },deviceTypeCombo,'-',deviceCombo,'-',operationTypeCombo,'-',{
                xtype: 'datefield',
                anchor: '100%',
//                hidden: true,
                fieldLabel: '区间',
                labelWidth: 30,
                width: 130,
                format: 'Y-m-d ',
                value: '',
                id: 'DeviceOperationLogQueryStartDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("DeviceOperationLogGridPanel_Id").getStore().loadPage(1);
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
                id: 'DeviceOperationLogQueryEndDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("DeviceOperationLogGridPanel_Id").getStore().loadPage(1);
                    }
                }
            },'-', {
                xtype: 'button',
                text: cosog.string.exportExcel,
                pressed: true,
                hidden:false,
                handler: function (v, o) {
                	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                	var deviceType=Ext.getCmp('DeviceOperationLogDeviceTypeListComb_Id').getValue();
                	var deviceName=Ext.getCmp('DeviceOperationLogDeviceListComb_Id').getValue();
                	var operationType=Ext.getCmp('DeviceOperationLogOperationTypeListComb_Id').getValue();
                	var startDate=Ext.getCmp('DeviceOperationLogQueryStartDate_Id').rawValue;
                    var endDate=Ext.getCmp('DeviceOperationLogQueryEndDate_Id').rawValue;
               	 	
               	 	var fileName='设备操作日志';
               	 	var title='设备操作日志';
               	 	var columnStr=Ext.getCmp("DeviceOperationLogColumnStr_Id").getValue();
               	 	exportDeviceOperationLogExcel(orgId,deviceType,deviceName,operationType,startDate,endDate,fileName,title,columnStr);
                }
            }]
        });
        this.callParent(arguments);
    }
});