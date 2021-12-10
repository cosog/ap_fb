Ext.define("AP.view.historyQuery.PipelineHistoryQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineHistoryQueryInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var pipelineCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 1,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pipelineDeviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '井名',
                    id: "HistoryQueryPipelineDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: pipelineCombStore,
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
                            pipelineDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("PipelineHistoryQueryDeviceListGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                	region: 'center',
                	layout: 'border',
                    items:[{
                    	region: 'center',
                        title:'设备列表',
                        id:'PipelineHistoryQueryInfoDeviceListPanel_Id',
                        border: false,
                        layout: 'fit',
                        tbar:[{
                            id: 'PipelineHistoryQueryInfoDeviceListSelectRow_Id',
                            xtype: 'textfield',
                            value: -1,
                            hidden: true
                        },{
                            id: 'PipelineHistoryQueryStatSelectCommStatus_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'PipelineHistoryQueryStatSelectDeviceType_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'PipelineHistoryQueryWellListColumnStr_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },{
                            id: 'PipelineHistoryQueryDataColumnStr_Id',
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        },pipelineDeviceCombo,'-', {
                            xtype: 'button',
                            text: cosog.string.exportExcel,
                            pressed: true,
                            hidden:false,
                            handler: function (v, o) {
                            	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                            	var deviceName=Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
                            	var commStatusStatValue=Ext.getCmp("PipelineHistoryQueryStatSelectCommStatus_Id").getValue();
                    			var deviceTypeStatValue=Ext.getCmp("PipelineHistoryQueryStatSelectDeviceType_Id").getValue();
                           	 	var deviceType=1;
                           	 	var fileName='管设备历史数据设备列表';
                           	 	var title='管设备历史数据设备列表';
                           	 	var columnStr=Ext.getCmp("PipelineHistoryQueryWellListColumnStr_Id").getValue();
                           	 	exportHistoryQueryDeviceListExcel(orgId,deviceType,deviceName,commStatusStatValue,deviceTypeStatValue,fileName,title,columnStr);
                            }
                        }]
                    },{
                    	region: 'south',
                    	split: true,
                        collapsible: true,
                    	height: '40%',
                    	xtype: 'tabpanel',
                    	id:'PipelineHistoryQueryStatTabPanel',
                    	activeTab: 0,
                        header: false,
                		tabPosition: 'top',
                		items: [{
                			title:'通信状态',
                			layout: 'fit',
                        	id:'PipelineHistoryQueryStatGraphPanel_Id',
                        	html: '<div id="PipelineHistoryQueryStatGraphPanelPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PipelineHistoryQueryStatGraphPanelPieDiv_Id").highcharts() != undefined) {
                                        $("#PipelineHistoryQueryStatGraphPanelPieDiv_Id").highcharts().setSize($("#PipelineHistoryQueryStatGraphPanelPieDiv_Id").offsetWidth, $("#PipelineHistoryQueryStatGraphPanelPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("PipelineHistoryQueryStatGraphPanelPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'PipelineHistoryQueryStatGraphPanelPieToolTip_Id',
                                        		target: 'PipelineHistoryQueryStatGraphPanelPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		},{
                			title:'设备类型',
                			layout: 'fit',
                        	id:'PipelineHistoryQueryDeviceTypeStatGraphPanel_Id',
                        	html: '<div id="PipelineHistoryQueryDeviceTypeStatPieDiv_Id" style="width:100%;height:100%;"></div>',
                        	listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if ($("#PipelineHistoryQueryDeviceTypeStatPieDiv_Id").highcharts() != undefined) {
                                        $("#PipelineHistoryQueryDeviceTypeStatPieDiv_Id").highcharts().setSize($("#PipelineHistoryQueryDeviceTypeStatPieDiv_Id").offsetWidth, $("#PipelineHistoryQueryDeviceTypeStatPieDiv_Id").offsetHeight,true);
                                    }else{
                                    	var toolTip=Ext.getCmp("PipelineHistoryQueryDeviceTypeStatPieToolTip_Id");
                                    	if(!isNotVal(toolTip)){
                                    		Ext.create('Ext.tip.ToolTip', {
                                                id:'PipelineHistoryQueryDeviceTypeStatPieToolTip_Id',
                                        		target: 'PipelineHistoryQueryDeviceTypeStatPieDiv_Id',
                                                html: '点击饼图不同区域或标签，查看相应统计数据'
                                            });
                                    	}
                                    }
                                }
                            }
                		}],
                		listeners: {
            				tabchange: function (tabPanel, newCard,oldCard, obj) {
            					if(newCard.id=="PipelineHistoryQueryStatGraphPanel_Id"){
            						loadAndInitHistoryQueryCommStatusStat(true);
            					}else if(newCard.id=="PipelineHistoryQueryDeviceTypeStatGraphPanel_Id"){
            						loadAndInitHistoryQueryDeviceTypeStat(true);
            					}
            					Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setValue('');
            					Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setRawValue('');
            					var gridPanel = Ext.getCmp("PipelineHistoryQueryDeviceListGridPanel_Id");
            					if (isNotVal(gridPanel)) {
            						gridPanel.getStore().load();
            					}else{
            						Ext.create('AP.store.historyQuery.PipelineHistoryQueryWellListStore');
            					}
            				}
            			}
                    }]
                }, {
                	region: 'east',
                    width: '68%',
                    title: '历史数据',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    layout: 'border',
                    border: false,
                    tbar:[{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '区间',
                        labelWidth: 30,
                        width: 130,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PipelineHistoryQueryStartDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PipelineHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '至',
                        labelWidth: 15,
                        width: 115,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PipelineHistoryQueryEndDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PipelineHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },'-', {
                        xtype: 'button',
                        text: cosog.string.exportExcel,
                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                        	var deviceName='';
                        	var selectRow= Ext.getCmp("PipelineHistoryQueryInfoDeviceListSelectRow_Id").getValue();
                        	if(selectRow>=0){
                        		deviceName = Ext.getCmp("PipelineHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
                        	}
                        	var startDate=Ext.getCmp('PipelineHistoryQueryStartDate_Id').rawValue;
                            var endDate=Ext.getCmp('PipelineHistoryQueryEndDate_Id').rawValue;
                       	 	var deviceType=1;
                       	 	var fileName='管设备'+deviceName+'历史数据';
                       	 	var title='管设备'+deviceName+'历史数据';
                       	 	var columnStr=Ext.getCmp("PipelineHistoryQueryDataColumnStr_Id").getValue();
                       	 	exportHistoryQueryDataExcel(orgId,deviceType,deviceName,startDate,endDate,fileName,title,columnStr);
                        }
                    }],
                    items: [{
                    	region: 'center',
                    	title: '历史曲线',
                    	layout: 'fit',
                    	header: false,
                    	border: true,
                        html: '<div id="pipelineHistoryQueryCurveDiv_Id" style="width:100%;height:100%;"></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                if ($("#pipelineHistoryQueryCurveDiv_Id").highcharts() != undefined) {
                                    $("#pipelineHistoryQueryCurveDiv_Id").highcharts().setSize($("#pipelineHistoryQueryCurveDiv_Id").offsetWidth, $("#pipelineHistoryQueryCurveDiv_Id").offsetHeight, true);
                                }
                            }
                        }
                    },{
                    	region: 'south',
                    	height: '50%',
                    	title: '历史数据',
                    	header: false,
                    	id: "PipelineHistoryQueryDataInfoPanel_Id",
                    	layout: 'fit',
                    	border: true,
                    	split: true,
                        collapsible: true
                        
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});
