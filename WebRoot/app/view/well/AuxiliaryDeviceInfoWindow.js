Ext.define("AP.view.well.AuxiliaryDeviceInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.auxiliaryDeviceInfoWindow',
    layout: 'fit',
    iframe: true,
    id: 'AuxiliaryDeviceInfoWindow_Id',
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
        var auxiliaryDeviceEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            id: 'addAuxiliaryDeviceForm_Id',
            defaultType: 'textfield',
            items: [{
                fieldLabel: '设备名称',
                id: 'auxiliaryDeviceName_Id',
                allowBlank: false,
                anchor: '95%',
                name: "auxiliaryDeviceInformation.name"
            }, {
            	xtype : "combobox",
				fieldLabel : '类型',
				id : 'auxiliaryDeviceTypeComb_Id',
				anchor : '95%',
				triggerAction : 'all',
				selectOnFocus : true,
			    forceSelection : true,
			    value:'',
			    allowBlank: false,
				editable : false,
				store : new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [[0, '泵辅件'],[1, '管辅件']]
						}),
				displayField : 'text',
				valueField : 'value',
				queryMode : 'local',
				emptyText : '请选择辅件类型',
				blankText : '请选择辅件类型',
				listeners : {
					select:function(v,o){
						Ext.getCmp("auxiliaryDeviceType_Id").setValue(this.value);
					}
				}
            },{
                xtype: "hidden",
                fieldLabel: '类型值',
                id: 'auxiliaryDeviceType_Id',
                value: '',
                name: "auxiliaryDeviceInformation.type"
            },{
                xtype: "textfield",
                fieldLabel: '规格型号',
                allowBlank: true,
                id: 'auxiliaryDeviceModel_Id',
                anchor: '95%',
                name: "auxiliaryDeviceInformation.model",
                value: ''
            }, {
         		xtype: "textareafield",
         		fieldLabel: '备注',
         		id: 'auxiliaryRemark_Id',
         		anchor: '95%',
         		name: "auxiliaryDeviceInformation.remark",
         		value:''
            },{
            	xtype: 'numberfield',
            	id: "auxiliaryDeviceSort_Id",
            	name: "auxiliaryDeviceInformation.sort",
                fieldLabel: '排序编号',
                allowBlank: false,
                minValue: 1,
                anchor: '95%',
                msgTarget: 'side'
            }],
            buttons: [{
                id: 'addFormAuxiliaryDevice_Id',
                xtype: 'button',
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    var winForm = Ext.getCmp("AuxiliaryDeviceInfoWindow_Id").down('form');
                    Ext.MessageBox.msgButtons['ok'].text = "<img   style=\"border:0;position:absolute;right:50px;top:1px;\"  src=\'" + context + "/images/zh_CN/accept.png'/>&nbsp;&nbsp;&nbsp;确定";
                    if (winForm.getForm().isValid()) {
                        winForm.getForm().submit({
                            url: context + '/wellInformationManagerController/doAuxiliaryDeviceAdd',
                            clientValidation: true, // 进行客户端验证
                            method: "POST",
                            waitMsg: cosog.string.sendServer,
                            waitTitle: 'Please Wait...',
                            success: function (response, action) {
                                Ext.getCmp('AuxiliaryDeviceInfoWindow_Id').close();
                                CreateAndLoadAuxiliaryDeviceInfoTable();
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
                id: 'updateFormAuxiliaryDevice_Id',
                text: cosog.string.update,
                hidden: true,
                iconCls: 'edit',
                handler: function (v, o) {
                	
                }
            }, {
                text: cosog.string.cancel,
                iconCls: 'cancel',
                handler: function () {
                    Ext.getCmp("AuxiliaryDeviceInfoWindow_Id").close();
                }
            }]
        });
        Ext.apply(me, {
            items: auxiliaryDeviceEditForm
        });
        me.callParent(arguments);
    }
});