
Ext.define('AP.view.acquisitionUnit.ModbusProtocolConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolConfigInfoView',
    layout: "fit",
    id:'modbusProtocolConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	var ModbusProtocolAddrMappingConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolAddrMappingConfigInfoView');
    	var ModbusProtocolAcqGroupConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolAcqGroupConfigInfoView');
    	var ModbusProtocolAlarmGroupConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolAlarmGroupConfigInfoView');
    	Ext.apply(me, {
    		items: [{
    			xtype: 'tabpanel',
                id:"ModbusProtocolConfigTabPanel_Id",
                activeTab: 0,
                border: false,
                tabPosition: 'left',
                items: [{
                	title:'地址映射',
                	id:"ModbusProtocolAddrMappingConfigTabPanel_Id",
                	items: [ModbusProtocolAddrMappingConfigInfoView],
    				layout: "fit",
    				border: false
                },{
                	title:'采集组配置',
                	id:'ModbusProtocolAcqGroupConfigTabPanel_Id',
                	items: [ModbusProtocolAcqGroupConfigInfoView],
    				layout: "fit",
    				border: false
                },{
                	title:'报警组配置',
                	id:'ModbusProtocolAlarmGroupConfigTabPanel_Id',
                	items: [ModbusProtocolAlarmGroupConfigInfoView],
    				layout: "fit",
    				border: false
                }],
                listeners: {
                    tabchange: function (tabPanel, newCard, oldCard, obj) {
//                    	if(newCard.id=="ScadaDriverModbusProtocolConfigTabPanel_Id"){
////                    		loadFSDiagramAnalysisSingleStatData();
//                    	}else if(newCard.id=="ScadaDriverModbusInstanceConfigTabPanel_Id"){
//                    		var treePanel=Ext.getCmp("ModbusProtocolInstanceConfigTreeGridPanel_Id");
//                    		if(isNotVal(treePanel)){
//                    			treePanel.getStore().load();
//                    		}else{
//                    			ModbusProtocolTreeInfoStore = Ext.create('AP.store.acquisitionUnit.ModbusProtocolInstanceTreeInfoStore');
//                    		}
//                    	}
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
