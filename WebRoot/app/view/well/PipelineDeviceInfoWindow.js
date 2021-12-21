Ext.define("AP.view.well.PipelineDeviceInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.pipelineDeviceInfoWindow',
    layout: 'fit',
    iframe: true,
    id: 'PipelineDeviceInfoWindow_Id',
    closeAction: 'destroy',
    width: 330,
    constrain: true,
    shadow: 'sides',
    resizable: false,
    collapsible: true,
    maximizable: false,
    layout: 'fit',
    plain: true,
    bodyStyle: 'padding:5px;background-color:#D9E5F3;',
    modal: true,
    border: false,
    initComponent: function () {
        var me = this;
        /**采控实例*/
        var acqInstanceStore = new Ext.data.SimpleStore({
        	fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
			proxy : {
				url : context+ '/wellInformationManagerController/getAcqInstanceCombList',
				type : "ajax",
				actionMethods: {
                    read: 'POST'
                },
                reader: {
                	type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
			},
			autoLoad : true,
			listeners : {
				beforeload : function(store, options) {
					var new_params = {
							deviceType: 201
					};
					Ext.apply(store.proxy.extraParams,new_params);
				}
			}
		});
        
        var pipelineDeviceAcqInstanceComb = Ext.create(
        		'Ext.form.field.ComboBox', {
					fieldLabel :  '采控实例',
					emptyText : '请选择采控实例',
					blankText : '请选择采控实例',
					id : 'pipelineDeviceAcqInstanceComb_Id',
					anchor : '95%',
					store: acqInstanceStore,
					queryMode : 'remote',
					typeAhead : true,
					autoSelect : false,
					allowBlank : true,
					triggerAction : 'all',
					editable : false,
					displayField : "boxval",
					valueField : "boxkey",
					listeners : {
						select: function (v,o) {
							Ext.getCmp("pipelineDeviceAcqInstanceCode_Id").setValue(this.value);
	                    }
					}
				});
        
        /**报警实例*/
        var alarmInstanceStore = new Ext.data.SimpleStore({
        	fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
			proxy : {
				url : context+ '/wellInformationManagerController/getAlarmInstanceCombList',
				type : "ajax",
				actionMethods: {
                    read: 'POST'
                },
                reader: {
                	type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
			},
			autoLoad : true,
			listeners : {
				beforeload : function(store, options) {
					var new_params = {
							deviceType: 201
					};
					Ext.apply(store.proxy.extraParams,new_params);
				}
			}
		});
        
        var pipelineDeviceAlarmInstanceComb = Ext.create(
        		'Ext.form.field.ComboBox', {
					fieldLabel :  '报警实例',
					emptyText : '请选择报警实例',
					blankText : '请选择报警实例',
					id : 'pipelineDeviceAlarmInstanceComb_Id',
					anchor : '95%',
					store: alarmInstanceStore,
					queryMode : 'remote',
					typeAhead : true,
					autoSelect : false,
					allowBlank : true,
					triggerAction : 'all',
					editable : false,
					displayField : "boxval",
					valueField : "boxkey",
					listeners : {
						select: function (v,o) {
							Ext.getCmp("pipelineDeviceAlarmInstanceCode_Id").setValue(this.value);
	                    }
					}
				});

        var pipelineDeviceEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            id: 'addPipelineDeviceForm_Id',
            defaultType: 'textfield',
            items: [{
                xtype: 'label',
                id: 'pipelineDeviceWinOgLabel_Id',
                html: ''
            },{
                xtype: "hidden",
                fieldLabel: '设备编号',
                id: 'pipelineDevice_Id',
                value: '',
                name: "pipelineDeviceInformation.id"
            },{
                xtype: "hidden",
                fieldLabel: '单位编号',
                id: 'pipelineDeviceOrg_Id',
                value: '',
                name: "pipelineDeviceInformation.orgId"
            },{
                xtype: "hidden",
                fieldLabel: '设备类型',
                id: 'pipelineDeviceType_Id',
                value: '',
                name: "pipelineDeviceInformation.deviceType"
            }, 
//            orgTreePicker, 
            {
                fieldLabel: '井名',
                id: 'pipelineDeviceName_Id',
                allowBlank: false,
                anchor: '95%',
                name: "pipelineDeviceInformation.wellName"
            }, {
            	xtype : "combobox",
				fieldLabel : '应用场景',
				id : 'pipelineDeviceApplicationScenariosComb_Id',
				anchor : '95%',
				triggerAction : 'all',
				selectOnFocus : true,
			    forceSelection : true,
			    value:'',
			    allowBlank: false,
				editable : false,
				store : new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [[0, '煤层气井'],[1, '油井']]
						}),
				displayField : 'text',
				valueField : 'value',
				queryMode : 'local',
				emptyText : '请选择应用场景',
				blankText : '请选择应用场景',
				listeners : {
					select:function(v,o){
						Ext.getCmp("pipelineDeviceApplicationScenarios_Id").setValue(this.value);
					}
				}
            },{
                xtype: "hidden",
                fieldLabel: '应用场景值',
                id: 'pipelineDeviceApplicationScenarios_Id',
                value: '',
                name: "pipelineDeviceInformation.applicationScenarios"
            },pipelineDeviceAcqInstanceComb,{
            	xtype: "hidden",
                fieldLabel: '采控实例编码',
                id: 'pipelineDeviceAcqInstanceCode_Id',
                value: '',
                name: "pipelineDeviceInformation.instanceCode"
            },pipelineDeviceAlarmInstanceComb,{
            	xtype: "hidden",
                fieldLabel: '报警实例编码',
                id: 'pipelineDeviceAlarmInstanceCode_Id',
                value: '',
                name: "pipelineDeviceInformation.alarmInstanceCode"
            },{
                xtype: "textfield",
                fieldLabel: '注册包ID',
                allowBlank: true,
                id: 'pipelineDeviceSignInId_Id',
                anchor: '95%',
                name: "pipelineDeviceInformation.signInId",
                value: ''
            }, {
         		xtype: "textfield",
         		fieldLabel: '设备从地址',
         		id: 'pipelineDeviceSlave_Id',
         		anchor: '95%',
         		name: "pipelineDeviceInformation.slave",
         		value:'01'
            },{
            	xtype: 'numberfield',
            	id: "pipelineDeviceSortNum_Id",
            	name: "pipelineDeviceInformation.sortNum",
                fieldLabel: '排序编号',
                allowBlank: false,
                minValue: 1,
                anchor: '95%',
                msgTarget: 'side'
            
            }],
            buttons: [{
                id: 'addFormPipelineDevice_Id',
                xtype: 'button',
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    var winForm = Ext.getCmp("PipelineDeviceInfoWindow_Id").down('form');
                    Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'" + context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
                    if (winForm.getForm().isValid()) {
                        winForm.getForm().submit({
                            url: context + '/wellInformationManagerController/doPipelineDeviceAdd',
                            clientValidation: true, // 进行客户端验证
                            method: "POST",
                            waitMsg: cosog.string.sendServer,
                            waitTitle: 'Please Wait...',
                            success: function (response, action) {
                                Ext.getCmp('PipelineDeviceInfoWindow_Id').close();
                        		var activeId = Ext.getCmp("PipelineDeviceManagerTabPanel").getActiveTab().id;
                        		if(activeId=="HeatingPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadHeatingPipelineDeviceInfoTable(true);
                        		}else if(activeId=="WaterGatheringPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadWaterGatheringPipelineDeviceInfoTable(true);
                        		}else if(activeId=="GatheringPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadGatheringPipelineDeviceInfoTable(true);
                        		}
                                
                                if (action.result.msg == true) {
                                    Ext.Msg.alert(cosog.string.ts, "<font color=blue>" + cosog.string.success + "</font>");
                                }
                                if (action.result.msg == false) {
                                    Ext.Msg.alert(cosog.string.ts, "<font color=red>" + cosog.string.failInfo + "</font>");

                                }
                            },
                            failure: function () {
                                Ext.Msg.alert(cosog.string.ts, "【<font color=red>" + cosog.string.execption + "</font> 】：" + cosog.string.contactadmin + "！");
                            }
                        });
                    } else {
                        Ext.Msg.alert(cosog.string.ts, "<font color=red>" + cosog.string.validdata + "</font>");
                    }
                    return false;
                }
            }, {
                xtype: 'button',
                id: 'updateFormPipelineDevice_Id',
                text: cosog.string.update,
                hidden: true,
                iconCls: 'edit',
                handler: function (v, o) {
                    var winForm = Ext.getCmp("PipelineDeviceInfoWindow_Id").down('form');
                    Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'" + context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
                    if (winForm.getForm().isValid()) {
                        winForm.getForm().submit({
                            url: context + '/wellInformationManagerController/doPipelineDeviceEdit',
                            clientValidation: true, // 进行客户端验证
                            method: "POST",
                            waitMsg: cosog.string.sendServer,
                            waitTitle: 'Please Wait...',
                            success: function (response, action) {
                                Ext.getCmp('PipelineDeviceInfoWindow_Id').close();
                        		var activeId = Ext.getCmp("PipelineDeviceManagerTabPanel").getActiveTab().id;
                        		if(activeId=="DiaphragmPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadDiaphragmPipelineDeviceInfoTable();
                        		}else if(activeId=="ScrewPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadScrewPipelineDeviceInfoTable();
                        		}else if(activeId=="LinearMotorPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadLinearMotorPipelineDeviceInfoTable();
                        		}else if(activeId=="ElectricSubmersiblePipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadElectricSubmersiblePipelineDeviceInfoTable();
                        		}else if(activeId=="JetPipelineDeviceInfoTabPanel_Id"){
                        			CreateAndLoadJetPipelineDeviceInfoTable();
                        		}
                                
                                if (action.result.msg == true) {
                                    Ext.Msg.alert(cosog.string.ts, "【<font color=blue>" + cosog.string.sucupate + "</font>】，" + cosog.string.dataInfo + "。");
                                }
                                if (action.result.msg == false) {
                                    Ext.Msg.alert(cosog.string.ts, "<font color=red>" + cosog.string.failInfo + "</font>");
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert(cosog.string.ts, "【<font color=red>" + cosog.string.execption + "</font> 】：" + cosog.string.contactadmin + "！");
                            }
                        });
                    } else {
                        Ext.Msg.alert(cosog.string.ts, "<font color=red>" + cosog.string.validdata + "</font>");
                    }
                    return false;
                }
            }, {
                text: cosog.string.cancel,
                iconCls: 'cancel',
                handler: function () {
                    Ext.getCmp("PipelineDeviceInfoWindow_Id").close();
                }
            }]
        });
        Ext.apply(me, {
            items: pipelineDeviceEditForm
        });
        me.callParent(arguments);
    }
});