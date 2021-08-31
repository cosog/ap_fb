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
        var ProtocolAndAcqUnitTreeStore=Ext.create('Ext.data.TreeStore', {
            fields: ['orgId', 'text', 'leaf'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: context + '/acquisitionUnitManagerController/modbusProtocolAndAcqUnitTreeData',
                reader: 'json'
            },
            root: {
                expanded: true,
                text: 'orgName'
            },
            listeners: {
            	beforeload: function (store, options) {
            		var deviceTypeObj=Ext.getCmp('modbusProtocolInstanceDeviceTypeComb_Id');
            		var deviceType=0;
            		if(isNotVal(deviceTypeObj)){
            			deviceType=deviceTypeObj.getValue();
            		}
            		var new_params = {
            				deviceType:deviceType
    					};
    					Ext.apply(store.proxy.extraParams,new_params);
            	}
            }
        });
        
        var protocolAndAcqUnitTree=Ext.create('AP.view.well.TreePicker',{
        	id:'modbusInstanceProtocolAndAcqUnit_Id',
        	anchor: '100%',
        	fieldLabel: '采集单元',
            emptyText: '请选择采集单元...',
            blankText: '请选择采集单元...',
            displayField: 'text',
            autoScroll:true,
            forceSelection : true,// 只能选择下拉框里面的内容
            rootVisible: false,
            allowBlank: false,
            store:ProtocolAndAcqUnitTreeStore,
            listeners: {
            	expand: function (sm, selections) {
            		protocolAndAcqUnitTree.getStore().load();
                },
            	select: function (picker,record,eOpts) {
                	if(record.data.classes==1){
                		Ext.Msg.alert('info', "<font color=red>当前选中为协议，请选择采集单元！</font>");
                	}else{
                		Ext.getCmp("modbusInstanceAcqUnit_Id").setValue(record.data.id);
                	}
                	
                }
            }
        });
        
        
        
        var postModbusProtocolEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            defaultType: 'textfield',
            items: [{
                xtype: "hidden",
                fieldLabel: '序号',
                id: 'formModbusProtocolInstance_Id',
                anchor: '100%',
                name: "protocolInstance.id"
            }, {
                id: 'formModbusProtocolInstanceName_Id',
                name: "protocolInstance.name",
                fieldLabel: '实例名称',
                allowBlank: false,
                anchor: '100%',
                value: ''
            },{
				xtype : "hidden",
				id : 'modbusProtocolInstanceDeviceType_Id',
				value: 0,
				name : "protocolInstance.deviceType"
			},{
            	xtype : "combobox",
				fieldLabel : '设备类型',
				id : 'modbusProtocolInstanceDeviceTypeComb_Id',
				anchor : '100%',
				triggerAction : 'all',
				selectOnFocus : true,
			    forceSelection : true,
			    value:0,
			    allowBlank: false,
				editable : false,
				store : new Ext.data.SimpleStore({
							fields : ['value', 'text'],
							data : [[0, '泵设备'],[1, '管设备']]
						}),
				displayField : 'text',
				valueField : 'value',
				queryMode : 'local',
				emptyText : '请选择设备类型',
				blankText : '请选择设备类型',
				listeners : {
					select:function(v,o){
						Ext.getCmp("modbusProtocolInstanceDeviceType_Id").setValue(this.value);
					}
				}
            },{
				xtype : "hidden",
				id : 'modbusInstanceAcqUnit_Id',
				value: 0,
				name : "protocolInstance.unitId"
			},protocolAndAcqUnitTree,{
				xtype : "hidden",
				id : 'modbusInstanceAcqProtocolType_Id',
				value:'modbus-tcp',
				name : "protocolInstance.acqProtocolType"
			},{
            	xtype : "combobox",
				fieldLabel : '读协议类型',
				id : 'modbusInstanceAcqProtocolTypeComb_Id',
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
						Ext.getCmp("modbusInstanceAcqProtocolType_Id").setValue(this.value);
					}
				}
            },{
				xtype : "hidden",
				id : 'modbusInstanceCtrlProtocolType_Id',
				value:'modbus-tcp',
				name : "protocolInstance.ctrlProtocolType"
			},{
            	xtype : "combobox",
				fieldLabel : '写协议类型',
				id : 'modbusInstanceCtrlProtocolTypeComb_Id',
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
						Ext.getCmp("modbusInstanceCtrlProtocolType_Id").setValue(this.value);
					}
				}
            }, {
                id: 'formModbusProtocolInstanceSignInPrefix_Id',
                name: "protocolInstance.signInPrefix",
                fieldLabel: '注册包前缀',
                anchor: '100%',
                value: ''
            }, {
            	id: 'modbusProtocolInstanceSignInSuffix_Id',
            	name: "protocolInstance.signInSuffix",
                fieldLabel: '注册包后缀',
                anchor: '100%',
                value: ''
            }, {
            	id: 'modbusProtocolInstanceHeartbeatPrefix_Id',
            	name: "protocolInstance.heartbeatPrefix",
                fieldLabel: '心跳包前缀',
                anchor: '100%',
                value: ''
            }, {
            	id: 'modbusProtocolInstanceHeartbeatSuffix_Id',
            	name: "protocolInstance.heartbeatSuffix",
                fieldLabel: '心跳包后缀',
                anchor: '100%',
                value: ''
            }, {
            	xtype: 'numberfield',
            	id: "modbusProtocolInstanceSort_Id",
                name: 'protocolInstance.sort',
                fieldLabel: '排序',
                allowBlank: false,
                minValue: 1,
                anchor: '100%',
                msgTarget: 'side'
            }],
            buttons: [{
            	xtype: 'button',
            	id: 'addFormModbusProtocolInstance_Id',
            	text: cosog.string.save,
                iconCls: 'save',
                handler: function () {
                	saveModbusProtocolInstanceSubmitBtnForm();
                }
         }, {
                xtype: 'button',
                id: 'updateFormaModbusProtocolInstance_Id',
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