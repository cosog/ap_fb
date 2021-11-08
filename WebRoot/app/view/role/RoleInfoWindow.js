Ext.define("AP.view.role.RoleInfoWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.roleInfoWindow',
    layout: 'fit',
    iframe: true,
    id: 'role_addwin_Id',
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
        var RoleTypeStore = new Ext.data.SimpleStore({
        	autoLoad : false,
            fields: ['roleFlag', 'roleFlagName'],
            data: [['0', '否'], ['1', '是']]
        });

        // Simple ComboBox using the data store
        var RoleTypeCombox = new Ext.form.ComboBox({
            id: 'roleFlagComboxfield_Id',
            value: 0,
            fieldLabel: '控制权限',
            typeAhead : true,
            allowBlank: false,
            autoSelect:true,
            editable:false,
			
            anchor: '100%',
            emptyText: '--请选择--',
            triggerAction: 'all',
            store: RoleTypeStore,
            displayField: 'roleFlagName',
            valueField: 'roleFlag',
            queryMode : 'local',
            listeners: {
            	select: function (v,o) {
					Ext.getCmp("roleFlag_Id").setValue(this.value);
                }
            }
        });
        
        var receiveSMSStore = new Ext.data.SimpleStore({
        	autoLoad : false,
            fields: ['boxkey', 'boxval'],
            data: [['0', '否'], ['1', '是']]
        });
        
        var receiveSMSCombox = new Ext.form.ComboBox({
            id: 'receiveSMSComboxfield_Id',
            value: 0,
            fieldLabel: '接收报警短信',
            typeAhead : true,
            allowBlank: false,
            autoSelect:true,
            editable:false,
			
            anchor: '100%',
            emptyText: '--请选择--',
            triggerAction: 'all',
            store: receiveSMSStore,
            displayField: 'boxval',
            valueField: 'boxkey',
            queryMode : 'local',
            listeners: {
            	select: function (v,o) {
					Ext.getCmp("receiveSMS_Id").setValue(this.value);
                }
            }
        });
        
        var receiveMailStore = new Ext.data.SimpleStore({
        	autoLoad : false,
            fields: ['boxkey', 'boxval'],
            data: [['0', '否'], ['1', '是']]
        });
        
        var receiveMailCombox = new Ext.form.ComboBox({
            id: 'receiveMailComboxfield_Id',
            value: 0,
            fieldLabel: '接收报警邮件',
            typeAhead : true,
            allowBlank: false,
            autoSelect:true,
            editable:false,
            anchor: '100%',
            emptyText: '--请选择--',
            triggerAction: 'all',
            store: receiveMailStore,
            displayField: 'boxval',
            valueField: 'boxkey',
            queryMode : 'local',
            listeners: {
            	select: function (v,o) {
					Ext.getCmp("receiveMail_Id").setValue(this.value);
                }
            }
        });
        
        var postroleEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            defaultType: 'textfield',
            items: [{
                xtype: "hidden",
                fieldLabel: '角色序号',
                id: 'role_Id',
                anchor: '100%',
                name: "role.roleId"
            }, {
                xtype: "hidden",
                name: 'role.roleFlag',
                id: 'roleFlag_Id',
                value: 0
            }, {
                xtype: "hidden",
                name: 'role.receiveSMS',
                id: 'receiveSMS_Id',
                value: 0
            }, {
                xtype: "hidden",
                name: 'role.receiveMail',
                id: 'receiveMail_Id',
                value: 0
            }, {
                fieldLabel: cosog.string.roleName,
                anchor: '100%',
                id: 'role_Name_Id',
                name: "role.roleName"
            }, {
                id: 'roleCode_Id',
                fieldLabel: cosog.string.roleCode,
                anchor: '100%',
                value: '',
                name: "role.roleCode"
            },RoleTypeCombox,receiveSMSCombox,receiveMailCombox, {
            	xtype: 'numberfield',
            	id: "roleShowLevel_Id",
                name: 'role.showLevel',
                fieldLabel: '数据显示级别',
                allowBlank: false,
                minValue: 1,
                anchor: '100%',
                msgTarget: 'side'
            }, {
                fieldLabel: '角色描述',
                id: 'roleRemark_Id',
                anchor: '100',
                xtype: 'textareafield',
                value: '',
                name: "role.remark"
            }
            //, RoleTypeCombox
            ],
            buttons: [{
                id: 'addFormrole_Id',
                xtype: 'button',
                iconCls: 'save',
                text: cosog.string.save,
                handler: SaveroleDataInfoSubmitBtnForm
         }, {
                xtype: 'button',
                id: 'updateFormrole_Id',
                text: cosog.string.update,
                hidden: true,
                iconCls: 'edit',
                handler: UpdateroleDataInfoSubmitBtnForm
         }, {
                text: cosog.string.cancel,
                iconCls: 'cancel',
                handler: function () {
                    Ext.getCmp("role_addwin_Id").close();
                }
         }]
        });
        Ext.apply(me, {
            items: postroleEditForm
        });
        me.callParent(arguments);
    }

});