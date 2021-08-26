Ext.define("AP.view.acquisitionUnit.ScadaConfigInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.scadaConfigInfoView', //别名
    layout: 'fit',
    iframe: true,
    border: false,
    referenceHolder: true,
    initComponent: function () {
        var ProtocolConfigInfoView = Ext.create('AP.view.acquisitionUnit.ProtocolConfigInfoView');
        Ext.apply(this, {
            items: [{
                xtype: 'tabpanel',
                id:"ScaDataSourceConfigInfoViewdaConfigTabPanel_Id",
                activeTab: 0,
                border: false,
                tabPosition: 'bottom',
                items: [{
                    title: '采控直读',
                    id:'DriverConfigInfoPanel_Id',
                    layout: "fit",
                    border: false,
                    items:ProtocolConfigInfoView
                }],
                listeners: {
                    tabchange: function (tabPanel, newCard, oldCard, obj) {
                    	
                    }
                }
             }],
             listeners: {
                 beforeclose: function ( panel, eOpts) {
                	 if(protocolConfigItemsHandsontableHelper!=null){
                		 if(protocolConfigItemsHandsontableHelper.hot!=undefined){
                			 protocolConfigItemsHandsontableHelper.hot.destroy();
                		 }
                		 protocolConfigItemsHandsontableHelper=null;
                	}
                	 
                	if(protocolConfigPropertiesHandsontableHelper!=null){
                		 if(protocolConfigPropertiesHandsontableHelper.hot!=undefined){
                			 protocolConfigPropertiesHandsontableHelper.hot.destroy();
                		}
                		 protocolConfigPropertiesHandsontableHelper=null;
                	}
     			}
             }
        });
        this.callParent(arguments);
    }
});