Ext.define("AP.view.role.RoleInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.roleInfoView',
    layout: 'border',
    iframe: true,
    border: false,
    initComponent: function () {
        var me = this;
        var RoleInfoGridPanel = Ext.create('AP.view.role.RoleInfoGridPanel');
        var RightModuleInfoGridPanel = Ext.create('AP.view.role.RightModuleInfoTreeGridView');
        Ext.apply(me, {
        	items: [{
        		region:'west',
        		width:'75%',
        		layout: "fit",
        		title:'角色列表',
        		header:false,
        		items:RoleInfoGridPanel
        	},{
        		region:'center',
        		title:'模块授权',
        		header:false,
        		layout: "fit",
        		items:RightModuleInfoGridPanel,
        		tbar: [{
                    xtype: 'label',
                    html: '模块授权',
                    style: 'margin-left: 4px'
                },'->', {
                    xtype: 'button',
                    itemId: 'addRightModuleLableClassBtnId',
                    id: 'addRightModuleLableClassBtn_Id',
                    text: '保存',
                    iconCls: 'save',
                    pressed: false,
                    handler: function () {
                    	grantRolePermission();
                    }
        		}]
//        		bbar: ['->', {
//                    xtype: 'button',
//                    itemId: 'addRightModuleLableClassBtnId',
//                    id: 'addRightModuleLableClassBtn_Id',
//                    text: '保存',
//                    iconCls: 'save',
//                    pressed: true,
//                    handler: function () {
//                    	grantRolePermission();
//                    }
//        		}, {
//                    xtype: 'tbspacer',
//                    flex: 1
//        		}]
        	}]
        });
        me.callParent(arguments);
    }

});