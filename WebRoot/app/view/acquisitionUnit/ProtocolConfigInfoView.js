Ext.define('AP.view.acquisitionUnit.ProtocolConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.protocolConfigInfoView',
    layout: "fit",
    id:'protocolConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	var ModbusProtocolConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolConfigInfoView');
    	var ModbusProtocolUnitConfigInfoView = Ext.create('AP.view.acquisitionUnit.ModbusProtocolUnitConfigInfoView');
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
                	title:'单元配置',
                	id:'ScadaDriverModbusUnitConfigTabPanel_Id',
                	items: [ModbusProtocolUnitConfigInfoView],
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
                    	}else if(newCard.id=="ScadaDriverModbusUnitConfigTabPanel_Id"){
                    		var treePanel=Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id");
                    		if(isNotVal(treePanel)){
                    			treePanel.getStore().load();
                    		}else{
                    			Ext.create('AP.store.acquisitionUnit.ModbusProtocolAcqUnitTreeInfoStore');
                    		}
                    	}else if(newCard.id=="ScadaDriverModbusInstanceConfigTabPanel_Id"){
                    		var treePanel=Ext.getCmp("ModbusProtocolInstanceConfigTreeGridPanel_Id");
                    		if(isNotVal(treePanel)){
                    			treePanel.getStore().load();
                    		}else{
                    			Ext.create('AP.store.acquisitionUnit.ModbusProtocolInstanceTreeInfoStore');
                    		}
                    	}
                    }
                }
    		}],
    		listeners: {
    			beforeclose: function ( panel, eOpts) {
    				//地址映射HandsontableHelper资源
    				if(protocolConfigAddrMappingItemsHandsontableHelper!=null){
    					if(protocolConfigAddrMappingItemsHandsontableHelper.hot!=undefined){
    						protocolConfigAddrMappingItemsHandsontableHelper.hot.destroy();
    					}
    					protocolConfigAddrMappingItemsHandsontableHelper=null;
    				}
    				if(protocolConfigAddrMaooingPropertiesHandsontableHelper!=null){
    					if(protocolConfigAddrMaooingPropertiesHandsontableHelper.hot!=undefined){
    						protocolConfigAddrMaooingPropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolConfigAddrMaooingPropertiesHandsontableHelper=null;
    				}
    				if(protocolAddrMappingItemsMeaningConfigHandsontableHelper!=null){
    					if(protocolAddrMappingItemsMeaningConfigHandsontableHelper.hot!=undefined){
    						protocolAddrMappingItemsMeaningConfigHandsontableHelper.hot.destroy();
    					}
    					protocolAddrMappingItemsMeaningConfigHandsontableHelper=null;
    				}
    				
    				//采控组HandsontableHelper资源
    				if(protocolAcqUnitConfigItemsHandsontableHelper!=null){
    					if(protocolAcqUnitConfigItemsHandsontableHelper.hot!=undefined){
    						protocolAcqUnitConfigItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAcqUnitConfigItemsHandsontableHelper=null;
    				}
    				if(protocolConfigAcqUnitPropertiesHandsontableHelper!=null){
    					if(protocolConfigAcqUnitPropertiesHandsontableHelper.hot!=undefined){
    						protocolConfigAcqUnitPropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolConfigAcqUnitPropertiesHandsontableHelper=null;
    				}
    				
    				//报警单元HandsontableHelper资源
    				if(protocolConfigAlarmUnitPropertiesHandsontableHelper!=null){
    					if(protocolConfigAlarmUnitPropertiesHandsontableHelper.hot!=undefined){
    						protocolConfigAlarmUnitPropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolConfigAlarmUnitPropertiesHandsontableHelper=null;
    				}
    				if(protocolAlarmUnitConfigNumItemsHandsontableHelper!=null){
    					if(protocolAlarmUnitConfigNumItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmUnitConfigNumItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmUnitConfigSwitchItemsHandsontableHelper!=null){
    					if(protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmUnitConfigSwitchItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmUnitConfigEnumItemsHandsontableHelper!=null){
    					if(protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmUnitConfigEnumItemsHandsontableHelper=null;
    				}
    				
    				//采控实例HandsontableHelper资源
    				if(protocolInstanceConfigItemsHandsontableHelper!=null){
    					if(protocolInstanceConfigItemsHandsontableHelper.hot!=undefined){
    						protocolInstanceConfigItemsHandsontableHelper.hot.destroy();
    					}
    					protocolInstanceConfigItemsHandsontableHelper=null;
    				}
    				if(protocolConfigInstancePropertiesHandsontableHelper!=null){
    					if(protocolConfigInstancePropertiesHandsontableHelper.hot!=undefined){
    						protocolConfigInstancePropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolConfigInstancePropertiesHandsontableHelper=null;
    				}
    				
    				//报警实例HandsontableHelper资源
    				if(protocolAlarmInstanceConfigNumItemsHandsontableHelper!=null){
    					if(protocolAlarmInstanceConfigNumItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmInstanceConfigNumItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmInstanceConfigNumItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmInstanceConfigSwitchItemsHandsontableHelper!=null){
    					if(protocolAlarmInstanceConfigSwitchItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmInstanceConfigSwitchItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmInstanceConfigSwitchItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmInstanceConfigEnumItemsHandsontableHelper!=null){
    					if(protocolAlarmInstanceConfigEnumItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmInstanceConfigEnumItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmInstanceConfigEnumItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmInstancePropertiesHandsontableHelper!=null){
    					if(protocolAlarmInstancePropertiesHandsontableHelper.hot!=undefined){
    						protocolAlarmInstancePropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmInstancePropertiesHandsontableHelper=null;
    				}
    			},
    			afterrender: function ( panel, eOpts) {}
    		}
    	});
        this.callParent(arguments);
    }
});
