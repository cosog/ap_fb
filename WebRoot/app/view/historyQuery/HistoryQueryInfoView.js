Ext.define("AP.view.historyQuery.HistoryQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.historyMonitoringInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var PumpHistoryQueryInfoView = Ext.create('AP.view.historyQuery.PumpHistoryQueryInfoView');
        var PipelineHistoryQueryInfoView = Ext.create('AP.view.historyQuery.PipelineHistoryQueryInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"HistoryQueryTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '泵设备',
        				id:'PumpHistoryQueryInfoPanel_Id',
        				items: [PumpHistoryQueryInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '管设备',
        				id:'PipelineHistoryQueryInfoPanel_Id',
        				items: [PipelineHistoryQueryInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PumpHistoryQueryInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpHistoryQueryListGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.historyQuery.PumpHistoryQueryWellListStore');
        						}
        					}else if(newCard.id=="PipelineHistoryQueryInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PipelineHistoryQueryListGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.historyQuery.PipelineHistoryQueryWellListStore');
        						}
        					}
        				}
        			}
            	}],
        		listeners: {
        			beforeclose: function ( panel, eOpts) {
        				if(pumpDeviceHistoryQueryDataHandsontableHelper!=null){
        					if(pumpDeviceHistoryQueryDataHandsontableHelper.hot!=undefined){
        						pumpDeviceHistoryQueryDataHandsontableHelper.hot.destroy();
        					}
        					pumpDeviceHistoryQueryDataHandsontableHelper=null;
        				}
        				if(pipelineDeviceHistoryQueryDataHandsontableHelper!=null){
        					if(pipelineDeviceHistoryQueryDataHandsontableHelper.hot!=undefined){
        						pipelineDeviceHistoryQueryDataHandsontableHelper.hot.destroy();
        					}
        					pipelineDeviceHistoryQueryDataHandsontableHelper=null;
        				}
        			},
        			afterrender: function ( panel, eOpts) {}
        		}
        });
        me.callParent(arguments);
    }

});

function createHistoryQueryColumn(columnInfo) {
    var myArr = columnInfo;

    var myColumns = "[";
    for (var i = 0; i < myArr.length; i++) {
        var attr = myArr[i];
        var width_ = "";
        var lock_ = "";
        var hidden_ = "";
        if (attr.hidden == true) {
            hidden_ = ",hidden:true";
        }
        if (isNotVal(attr.lock)) {
            //lock_ = ",locked:" + attr.lock;
        }
        if (isNotVal(attr.width)) {
            width_ = ",width:" + attr.width;
        }
        myColumns += "{text:'" + attr.header + "',lockable:true,align:'center' "+width_;
        if (attr.dataIndex.toUpperCase() == 'id'.toUpperCase()) {
            myColumns += ",xtype: 'rownumberer',sortable : false,locked:true";
        }
        else if (attr.dataIndex.toUpperCase()=='wellName'.toUpperCase()) {
            myColumns += ",sortable : false,locked:true,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        else if (attr.dataIndex.toUpperCase()=='commStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceCommStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase()=='runStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceRunStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase() == 'acqTime'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceTimeFormat(value,o,p,e);}";
        } 
        else {
            myColumns += hidden_ + lock_ + ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
            //        	myColumns += hidden_ + lock_ + width_ + ",sortable : false,dataIndex:'" + attr.dataIndex + "'";
        }
        myColumns += "}";
        if (i < myArr.length - 1) {
            myColumns += ",";
        }
    }
    myColumns += "]";
    return myColumns;
};