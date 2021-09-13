Ext.define('AP.view.acquisitionUnit.ModbusProtocolInstanceConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolInstanceConfigInfoView',
    layout: "fit",
    id:'modbusProtocolInstanceConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	var ModbusProtocolAcqInstanceConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolAcqInstanceConfigInfoView');
    	var ModbusProtocolAlarmInstanceConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolAlarmInstanceConfigInfoView');
    	Ext.apply(me, {
    		items: [{
    			xtype: 'tabpanel',
                id:"ModbusProtocolInstanceConfigTabPanel_Id",
                activeTab: 0,
                border: false,
                tabPosition: 'left',
                items: [{
                	title:'采控实例',
                	id:"ModbusProtocolAcqInstanceConfigTabPanel_Id",
                	items: [ModbusProtocolAcqInstanceConfigInfoView],
    				layout: "fit",
    				border: false
                },{
                	title:'报警实例',
                	id:'ModbusProtocolAlarmInstanceConfigTabPanel_Id',
                	items: [ModbusProtocolAlarmInstanceConfigInfoView],
    				layout: "fit",
    				border: false
                }],
                listeners: {
                    tabchange: function (tabPanel, newCard, oldCard, obj) {
                    	if(newCard.id=="ModbusProtocolAcqInstanceConfigTabPanel_Id"){
//                    		loadFSDiagramAnalysisSingleStatData();
                    	}else if(newCard.id=="ModbusProtocolAlarmInstanceConfigTabPanel_Id"){
                    		var treePanel=Ext.getCmp("ModbusProtocolAlarmInstanceConfigTreeGridPanel_Id");
                    		if(isNotVal(treePanel)){
                    			treePanel.getStore().load();
                    		}else{
                    			Ext.create('AP.store.acquisitionUnit.ModbusProtocolAlarmInstanceTreeInfoStore');
                    		}
                    	}
                    },afterrender: function (comp,eOpts) {
//                    	Ext.getCmp("ModbusProtocolConfigTabPanel_Id").getTabBar().insert(0, {
//            		      	xtype: 'tbfill'
//                  		});
                    }
                }
    		}]
    	});
        this.callParent(arguments);
    }
});
