Ext.define("AP.view.well.PumpDeviceInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.pumpDeviceInfoWindow',
    layout: 'fit',
    iframe: true,
    id: 'PumpDeviceInfoWindow_Id',
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
//        /**下拉机构树*/
//        var OrgTreeStore=Ext.create('Ext.data.TreeStore', {
//            fields: ['orgId', 'text', 'leaf'],
//            autoLoad: false,
//            proxy: {
//                type: 'ajax',
//                url: context + '/orgManagerController/constructOrgRightTree',
//                reader: 'json'
//            },
//            root: {
//                expanded: true,
//                text: 'orgName'
//            },
//            listeners: {
//            	beforeload: function (store, options) {
//                	var orgId = Ext.getCmp('leftOrg_Id').getValue();
//                    var org_name_Id = Ext.getCmp('org_name_Id');
//                    if (!Ext.isEmpty(org_name_Id)) {
//                        org_name_Id = org_name_Id.getValue();
//                    }
//                    var new_params = {
//                    	orgId:orgId,
//                        orgName: org_name_Id
//                    };
//                    Ext.apply(store.proxy.extraParams, new_params);
//                }
//            }
//        });
//        var orgTreePicker=Ext.create('AP.view.well.TreePicker',{//Ext.ux.TreePicker AP.view.well.TreePicker
//        	id:'pumpDeviceOrgTreePicker_Id',
//        	anchor: '95%',
//        	fieldLabel: '单位名称',
//            emptyText: cosog.string.chooseOrg,
//            blankText: cosog.string.chooseOrg,
//            displayField: 'text',
//            autoScroll:true,
//            allowBlank: false,
//            forceSelection : true,// 只能选择下拉框里面的内容
//            rootVisible: false,
//            store:OrgTreeStore,
//            listeners: {
//                select: function (picker,record,eOpts) {
//                	Ext.getCmp("pumpDeviceOrg_Id").setValue(record.data.orgId);
//                }
//            }
//        });
        
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
							deviceType: 101
					};
					Ext.apply(store.proxy.extraParams,new_params);
				}
			}
		});
        
        var pumpDeviceAcqInstanceComb = Ext.create(
        		'Ext.form.field.ComboBox', {
					fieldLabel :  '采控实例',
					emptyText : '请选择采控实例',
					blankText : '请选择采控实例',
					id : 'pumpDeviceAcqInstanceComb_Id',
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
							Ext.getCmp("pumpDeviceAcqInstanceCode_Id").setValue(this.value);
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
							deviceType: 101
					};
					Ext.apply(store.proxy.extraParams,new_params);
				}
			}
		});
        
        var pumpDeviceAlarmInstanceComb = Ext.create(
        		'Ext.form.field.ComboBox', {
					fieldLabel :  '报警实例',
					emptyText : '请选择报警实例',
					blankText : '请选择报警实例',
					id : 'pumpDeviceAlarmInstanceComb_Id',
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
							Ext.getCmp("pumpDeviceAlarmInstanceCode_Id").setValue(this.value);
	                    }
					}
				});

        var pumpDeviceEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            id: 'addPumpDeviceForm_Id',
            defaultType: 'textfield',
            items: [
            	{
                xtype: 'label',
                id: 'pumpDeviceWinOgLabel_Id',
                html: ''
            },
//            {
//                xtype: 'displayfield',
//                id: 'pumpDeviceWinOgLabel_Id',
//                fieldLabel: '信息',
//                value: '10'
//            },
            {
                xtype: "hidden",
                fieldLabel: '设备编号',
                id: 'pumpDevice_Id',
                value: '',
                name: "pumpDeviceInformation.id"
            },{
                xtype: "hidden",
                fieldLabel: '单位编号',
                id: 'pumpDeviceOrg_Id',
                value: '',
                name: "pumpDeviceInformation.orgId"
            },{
                xtype: "hidden",
                fieldLabel: '设备类型',
                id: 'pumpDeviceType_Id',
                value: '',
                name: "pumpDeviceInformation.deviceType"
            }, 
//            orgTreePicker, 
            {
                fieldLabel: '井名',
                id: 'pumpDeviceName_Id',
                allowBlank: false,
                anchor: '95%',
                name: "pumpDeviceInformation.wellName"
            }, {
            	xtype : "combobox",
				fieldLabel : '应用场景',
				id : 'pumpDeviceApplicationScenariosComb_Id',
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
						Ext.getCmp("pumpDeviceApplicationScenarios_Id").setValue(this.value);
					}
				}
            },{
                xtype: "hidden",
                fieldLabel: '应用场景值',
                id: 'pumpDeviceApplicationScenarios_Id',
                value: '',
                name: "pumpDeviceInformation.applicationScenarios"
            },pumpDeviceAcqInstanceComb,{
            	xtype: "hidden",
                fieldLabel: '采控实例编码',
                id: 'pumpDeviceAcqInstanceCode_Id',
                value: '',
                name: "pumpDeviceInformation.instanceCode"
            },pumpDeviceAlarmInstanceComb,{
            	xtype: "hidden",
                fieldLabel: '报警实例编码',
                id: 'pumpDeviceAlarmInstanceCode_Id',
                value: '',
                name: "pumpDeviceInformation.alarmInstanceCode"
            },{
                xtype: "textfield",
                fieldLabel: '注册包ID',
                allowBlank: true,
                id: 'pumpDeviceSignInId_Id',
                anchor: '95%',
                name: "pumpDeviceInformation.signInId",
                value: ''
            }, {
         		xtype: "textfield",
         		fieldLabel: '设备从地址',
         		id: 'pumpDeviceSlave_Id',
         		anchor: '95%',
         		name: "pumpDeviceInformation.slave",
         		value:'01'
            },{
            	xtype: 'numberfield',
            	id: "pumpDeviceSortNum_Id",
            	name: "pumpDeviceInformation.sortNum",
                fieldLabel: '排序编号',
                allowBlank: false,
                minValue: 1,
                anchor: '95%',
                msgTarget: 'side'
            
            }],
            buttons: [{
                id: 'addFormPumpDevice_Id',
                xtype: 'button',
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    var winForm = Ext.getCmp("PumpDeviceInfoWindow_Id").down('form');
                    Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'" + context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
                    if (winForm.getForm().isValid()) {
                        winForm.getForm().submit({
                            url: context + '/wellInformationManagerController/doPumpDeviceAdd',
                            clientValidation: true, // 进行客户端验证
                            method: "POST",
                            waitMsg: cosog.string.sendServer,
                            waitTitle: 'Please Wait...',
                            success: function (response, action) {
                                Ext.getCmp('PumpDeviceInfoWindow_Id').close();
                        		var activeId = Ext.getCmp("PumpDeviceManagerTabPanel").getActiveTab().id;
                        		if(activeId=="DiaphragmPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadDiaphragmPumpDeviceInfoTable();
                        		}else if(activeId=="ScrewPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadScrewPumpDeviceInfoTable();
                        		}else if(activeId=="LinearMotorPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadLinearMotorPumpDeviceInfoTable();
                        		}else if(activeId=="ElectricSubmersiblePumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                        		}else if(activeId=="JetPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadJetPumpDeviceInfoTable();
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
                id: 'updateFormPumpDevice_Id',
                text: cosog.string.update,
                hidden: true,
                iconCls: 'edit',
                handler: function (v, o) {
                    var winForm = Ext.getCmp("PumpDeviceInfoWindow_Id").down('form');
                    Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'" + context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
                    if (winForm.getForm().isValid()) {
                        winForm.getForm().submit({
                            url: context + '/wellInformationManagerController/doPumpDeviceEdit',
                            clientValidation: true, // 进行客户端验证
                            method: "POST",
                            waitMsg: cosog.string.sendServer,
                            waitTitle: 'Please Wait...',
                            success: function (response, action) {
                                Ext.getCmp('PumpDeviceInfoWindow_Id').close();
                        		var activeId = Ext.getCmp("PumpDeviceManagerTabPanel").getActiveTab().id;
                        		if(activeId=="DiaphragmPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadDiaphragmPumpDeviceInfoTable();
                        		}else if(activeId=="ScrewPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadScrewPumpDeviceInfoTable();
                        		}else if(activeId=="LinearMotorPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadLinearMotorPumpDeviceInfoTable();
                        		}else if(activeId=="ElectricSubmersiblePumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                        		}else if(activeId=="JetPumpDeviceInfoTabPanel_Id"){
                        			CreateAndLoadJetPumpDeviceInfoTable();
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
                    Ext.getCmp("PumpDeviceInfoWindow_Id").close();
                }
            }]
        });
        Ext.apply(me, {
            items: pumpDeviceEditForm
        });
        me.callParent(arguments);
    }
});