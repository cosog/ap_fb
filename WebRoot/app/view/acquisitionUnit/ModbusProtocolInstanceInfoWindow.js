Ext.define("AP.view.acquisitionUnit.ModbusProtocolInstanceInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.modbusProtocolInstanceInfoWindow',
    layout: 'fit',
    iframe: true,
    id: 'modbusProtocolInstanceInfoWindow_Id',
    closeAction: 'destroy',
    width: 330,
    shadow: 'sides',
    resizable: false,
    collapsible: true,
    constrain: true,
    maximizable: false,
    plain: true,
    bodyStyle: 'padding:5px;background-color:#D9E5F3;',
    modal: true,
    border: false,
    initComponent: function () {
        var me = this;
        var postModbusProtocolEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            defaultType: 'textfield',
            items: [{
                xtype: "hidden",
                fieldLabel: '序号',
                id: 'formModbusProtocolInstance_Id',
                anchor: '100%',
                name: "modbusProtocolInstance.id"
            }, {
                id: 'formModbusProtocolInstanceName_Id',
                name: "modbusProtocolInstance.name",
                fieldLabel: '协议名称',
                allowBlank: false,
                anchor: '100%',
                value: ''
            },{
				xtype : "hidden",
				id : 'modbusInstanceReadProtocolType_Id',
				value:'modbus-tcp',
				name : "modbusProtocolInstance.readProtocolType"
			},{
            	xtype : "combobox",
				fieldLabel : '读协议类型',
				id : 'modbusInstanceReadProtocolTypeComb_Id',
				anchor : '100%',
				triggerAction : 'all',
				selectOnFocus : true,
			    forceSelection : true,
			    value:'modbus-tcp',
			    allowBlank: false,
				editable : false,
				store : new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [['modbus-tcp', 'modbus-tcp'],['modbus-rtu', 'modbus-rtu'],['private-kd93', 'private-kd93'],['private-lq1000', 'private-lq1000']]
						}),
				displayField : 'text',
				valueField : 'value',
				queryMode : 'local',
				emptyText : '请选择协议类型',
				blankText : '请选择协议类型',
				listeners : {
					select:function(v,o){
						Ext.getCmp("modbusInstanceReadProtocolType_Id").setValue(this.value);
					}
				}
            },{
				xtype : "hidden",
				id : 'modbusInstanceWriteProtocolType_Id',
				value:'modbus-tcp',
				name : "modbusProtocolInstance.writeProtocolType"
			},{
            	xtype : "combobox",
				fieldLabel : '写协议类型',
				id : 'modbusInstanceWriteProtocolTypeComb_Id',
				anchor : '100%',
				triggerAction : 'all',
				selectOnFocus : true,
			    forceSelection : true,
			    value:'modbus-tcp',
			    allowBlank: false,
				editable : false,
				store : new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [['modbus-tcp', 'modbus-tcp'],['modbus-rtu', 'modbus-rtu']]
						}),
				displayField : 'text',
				valueField : 'value',
				queryMode : 'local',
				emptyText : '请选择协议类型',
				blankText : '请选择协议类型',
				listeners : {
					select:function(v,o){
						Ext.getCmp("modbusInstanceWriteProtocolType_Id").setValue(this.value);
					}
				}
            }, {
                id: 'formModbusProtocolSignInPrefix_Id',
                name: "modbusProtocol.signInPrefix",
                fieldLabel: '注册包前缀',
                anchor: '100%',
                value: ''
            }, {
            	id: 'modbusProtocolSignInSuffix_Id',
            	name: "modbusProtocol.signInSuffix",
                fieldLabel: '注册包后缀',
                anchor: '100%',
                value: ''
            }, {
            	id: 'modbusProtocolHeartbeatPrefix_Id',
            	name: "modbusProtocol.heartbeatPrefix",
                fieldLabel: '心跳包前缀',
                anchor: '100%',
                value: ''
            }, {
            	id: 'modbusProtocolHeartbeatSuffix_Id',
            	name: "modbusProtocol.heartbeatSuffix",
                fieldLabel: '心跳包后缀',
                anchor: '100%',
                value: ''
            }, {
            	xtype: 'numberfield',
            	id: "modbusProtocolSort_Id",
                name: 'modbusProtocol.sort',
                fieldLabel: '排序',
                allowBlank: false,
                minValue: 1,
                anchor: '100%',
                msgTarget: 'side'
            }],
            buttons: [{
            	xtype: 'button',
            	id: 'addFormModbusProtocol_Id',
            	text: cosog.string.save,
                iconCls: 'save',
                handler: function () {
                	saveModbusProtocolSubmitBtnForm();
                }
         }, {
                xtype: 'button',
                id: 'updateFormaModbusProtocol_Id',
                text: cosog.string.update,
                hidden: true,
                iconCls: 'edit',
                handler: function () {
//                	UpdatemodbusProtocolDataInfoSubmitBtnForm();
                }
         }, {
        	 	xtype: 'button',   
        	 	text: cosog.string.cancel,
                iconCls: 'cancel',
                handler: function () {
                    Ext.getCmp("modbusProtocolInstanceInfoWindow_Id").close();
                }
         }]
        });
        Ext.apply(me, {
            items: postModbusProtocolEditForm
        });
        me.callParent(arguments);
    }

});