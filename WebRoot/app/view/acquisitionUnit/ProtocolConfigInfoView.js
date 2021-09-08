Ext.define('AP.view.acquisitionUnit.ProtocolConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.protocolConfigInfoView',
    layout: "fit",
    id:'protocolConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	var ModbusProtocolConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolConfigInfoView');
        var ModbusProtocolInstanceConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolInstanceConfigInfoView');
    	Ext.apply(me, {
    		items: [{
    			xtype: 'tabpanel',
                id:"ScadaDriverConfigTabPanel_Id",
                activeTab: 0,
                border: false,
                tabPosition: 'bottom',
                items: [{
                	title:'协议配置',
                	id:"ScadaDriverModbusProtocolConfigTabPanel_Id",
                	items: [ModbusProtocolConfigInfoView],
    				layout: "fit",
    				border: false
                },{
                	title:'实例配置',
                	id:'ScadaDriverModbusInstanceConfigTabPanel_Id',
                	items: [ModbusProtocolInstanceConfigInfoView],
    				layout: "fit",
    				border: false
                }],
                listeners: {
                    tabchange: function (tabPanel, newCard, oldCard, obj) {
                    	if(newCard.id=="ScadaDriverModbusProtocolConfigTabPanel_Id"){
//                    		loadFSDiagramAnalysisSingleStatData();
                    	}else if(newCard.id=="ScadaDriverModbusInstanceConfigTabPanel_Id"){
                    		var treePanel=Ext.getCmp("ModbusProtocolInstanceConfigTreeGridPanel_Id");
                    		if(isNotVal(treePanel)){
                    			treePanel.getStore().load();
                    		}else{
                    			ModbusProtocolTreeInfoStore = Ext.create('AP.store.acquisitionUnit.ModbusProtocolInstanceTreeInfoStore');
                    		}
                    	}
                    }
                }
    		}]
    	});
        this.callParent(arguments);
    }
});
