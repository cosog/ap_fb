Ext.define('AP.view.alarmQuery.PipelineEnumValueAlarmInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PipelineEnumValueAlarmInfoView',
    layout: "fit",
    id: "PipelineEnumValueAlarmInfoView_Id",
    border: false,
    //forceFit : true,
    initComponent: function () {
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
                    var wellName = Ext.getCmp('PipelineEnumValueAlarmDeviceListComb_Id').getValue();
                    var deviceType = 1;
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
                    id: "PipelineEnumValueAlarmDeviceListComb_Id",
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
                        	Ext.getCmp("PipelineEnumValueAlarmOverviewGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
    	Ext.apply(this, {
    		layout: 'border',
    		tbar: [{
                id: 'PipelineEnumValueAlarmOverviewColumnStr_Id',
                xtype: 'textfield',
                value: '',
                hidden: true
            },{
                id: 'PipelineEnumValueAlarmDetailsColumnStr_Id',
                xtype: 'textfield',
                value: '',
                hidden: true
            },deviceCombo,'-',{
            	xtype : "combobox",
				fieldLabel : '报警级别',
				id : 'PipelineEnumValueAlarmLevelComb_Id',
				labelWidth: 60,
                width: 170,
                labelAlign: 'left',
				triggerAction : 'all',
				displayField: "boxval",
                valueField: "boxkey",
				selectOnFocus : true,
			    forceSelection : true,
			    value:'',
			    allowBlank: false,
				editable : false,
				emptyText: cosog.string.all,
                blankText: cosog.string.all,
				store : new Ext.data.SimpleStore({
							fields : ['boxkey', 'boxval'],
							data : [['', '选择全部'],[100, '一级报警'],[200, '二级报警'],[300, '三级报警']]
						}),
				queryMode : 'local',
				listeners : {
					select:function(v,o){
						Ext.getCmp("PipelineEnumValueAlarmOverviewGridPanel_Id").getStore().loadPage(1);
					}
				}
            },'-',{
            	xtype : "combobox",
				fieldLabel : '是否发送短信',
				id : 'PipelineEnumValueAlarmIsSendMessageComb_Id',
				labelWidth: 80,
                width: 190,
                labelAlign: 'left',
				triggerAction : 'all',
				displayField: "boxval",
                valueField: "boxkey",
				selectOnFocus : true,
			    forceSelection : true,
			    value:'',
			    allowBlank: false,
				editable : false,
				emptyText: cosog.string.all,
                blankText: cosog.string.all,
				store : new Ext.data.SimpleStore({
							fields : ['boxkey', 'boxval'],
							data : [['', '选择全部'],[1, '是'],[0, '否']]
						}),
				queryMode : 'local',
				listeners : {
					select:function(v,o){
						Ext.getCmp("PipelineEnumValueAlarmOverviewGridPanel_Id").getStore().loadPage(1);
					}
				}
            },'-',{
                xtype: 'datefield',
                anchor: '100%',
//                hidden: true,
                fieldLabel: '区间',
                labelWidth: 30,
                width: 130,
                format: 'Y-m-d ',
                value: '',
                id: 'PipelineEnumValueAlarmQueryStartDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("PipelineEnumValueAlarmGridPanel_Id").getStore().loadPage(1);
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
                id: 'PipelineEnumValueAlarmQueryEndDate_Id',
                listeners: {
                	select: function (combo, record, index) {
                		Ext.getCmp("PipelineEnumValueAlarmGridPanel_Id").getStore().loadPage(1);
                    }
                }
            },'-',{
                xtype: 'button',
                text: '导出设备概览',
                pressed: true,
                hidden:false,
                handler: function (v, o) {
                	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                	var deviceType=1;
                	var deviceName=Ext.getCmp('PipelineEnumValueAlarmDeviceListComb_Id').getValue();
                	var alarmLevel=Ext.getCmp('PipelineEnumValueAlarmLevelComb_Id').getValue();
                	var isSendMessage=Ext.getCmp('PipelineEnumValueAlarmIsSendMessageComb_Id').getValue();
               	 	var alarmType=2;
               	 	
               	 	var fileName='管设备枚举量报警概览数据';
               	 	var title='管设备枚举量报警概览数据';
               	 	var columnStr=Ext.getCmp("PipelineEnumValueAlarmOverviewColumnStr_Id").getValue();
               	 	exportAlarmOverviewDataExcel(orgId,deviceType,deviceName,alarmType,alarmLevel,isSendMessage,fileName,title,columnStr);
                }
            },'-', {
                xtype: 'button',
                text: '导出报警数据',
                pressed: true,
                hidden:false,
                handler: function (v, o) {
                	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                	var deviceType=1;
                	var deviceName  = Ext.getCmp("PipelineEnumValueAlarmOverviewGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
                	var alarmLevel=Ext.getCmp('PipelineEnumValueAlarmLevelComb_Id').getValue();
                	var isSendMessage=Ext.getCmp('PipelineEnumValueAlarmIsSendMessageComb_Id').getValue();
                	var startDate=Ext.getCmp('PipelineEnumValueAlarmQueryStartDate_Id').rawValue;
                    var endDate=Ext.getCmp('PipelineEnumValueAlarmQueryEndDate_Id').rawValue;
               	 	var alarmType=2;
               	 	
               	 	var fileName='管设备枚举量报警数据';
               	 	var title='管设备枚举量报警数据';
               	 	var columnStr=Ext.getCmp("PipelineEnumValueAlarmDetailsColumnStr_Id").getValue();
               	 	exportAlarmDataExcel(orgId,deviceType,deviceName,startDate,endDate,alarmType,alarmLevel,isSendMessage,fileName,title,columnStr);
                }
            }],
            items: [{
    			region: 'center',
    			title: '设备概览',
    			id: 'PipelineEnumValueAlarmOverviewPanel_Id',
    			autoScroll: true,
                scrollable: true,
    			layout: 'fit'
    		},{
    			region: 'east',
    			title: '报警数据',
    			id: 'PipelineEnumValueAlarmDetailsPanel_Id',
                width: '80%',
                autoScroll: true,
                split: true,
                collapsible: true,
                layout: 'fit'
    		}]
        });
        this.callParent(arguments);
    }
});