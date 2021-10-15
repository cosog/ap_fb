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
    				if(protocolAcqGroupConfigItemsHandsontableHelper!=null){
    					if(protocolAcqGroupConfigItemsHandsontableHelper.hot!=undefined){
    						protocolAcqGroupConfigItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAcqGroupConfigItemsHandsontableHelper=null;
    				}
    				if(protocolConfigAcqGroupPropertiesHandsontableHelper!=null){
    					if(protocolConfigAcqGroupPropertiesHandsontableHelper.hot!=undefined){
    						protocolConfigAcqGroupPropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolConfigAcqGroupPropertiesHandsontableHelper=null;
    				}
    				
    				//报警组HandsontableHelper资源
    				if(protocolConfigAlarmGroupPropertiesHandsontableHelper!=null){
    					if(protocolConfigAlarmGroupPropertiesHandsontableHelper.hot!=undefined){
    						protocolConfigAlarmGroupPropertiesHandsontableHelper.hot.destroy();
    					}
    					protocolConfigAlarmGroupPropertiesHandsontableHelper=null;
    				}
    				if(protocolAlarmGroupConfigNumItemsHandsontableHelper!=null){
    					if(protocolAlarmGroupConfigNumItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmGroupConfigNumItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmGroupConfigNumItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmGroupConfigSwitchItemsHandsontableHelper!=null){
    					if(protocolAlarmGroupConfigSwitchItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmGroupConfigSwitchItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmGroupConfigSwitchItemsHandsontableHelper=null;
    				}
    				if(protocolAlarmGroupConfigEnumItemsHandsontableHelper!=null){
    					if(protocolAlarmGroupConfigEnumItemsHandsontableHelper.hot!=undefined){
    						protocolAlarmGroupConfigEnumItemsHandsontableHelper.hot.destroy();
    					}
    					protocolAlarmGroupConfigEnumItemsHandsontableHelper=null;
    				}
    				
    				//采控实例HandsontableHelper资源
    				if(protocolInstanceConfigAcqItemsHandsontableHelper!=null){
    					if(protocolInstanceConfigAcqItemsHandsontableHelper.hot!=undefined){
    						protocolInstanceConfigAcqItemsHandsontableHelper.hot.destroy();
    					}
    					protocolInstanceConfigAcqItemsHandsontableHelper=null;
    				}
    				if(protocolInstanceConfigControlItemsHandsontableHelper!=null){
    					if(protocolInstanceConfigControlItemsHandsontableHelper.hot!=undefined){
    						protocolInstanceConfigControlItemsHandsontableHelper.hot.destroy();
    					}
    					protocolInstanceConfigControlItemsHandsontableHelper=null;
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
