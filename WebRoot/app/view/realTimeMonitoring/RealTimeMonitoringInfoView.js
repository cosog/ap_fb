Ext.define("AP.view.realTimeMonitoring.RealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.realTimeMonitoringInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var PumpRealTimeMonitoringInfoView = Ext.create('AP.view.realTimeMonitoring.PumpRealTimeMonitoringInfoView');
        var PipelineRealTimeMonitoringInfoView = Ext.create('AP.view.realTimeMonitoring.PipelineRealTimeMonitoringInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"RealTimeMonitoringTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '泵设备',
        				id:'PumpRealTimeMonitoringInfoPanel_Id',
        				items: [PumpRealTimeMonitoringInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '管设备',
        				id:'PipelineRealTimeMonitoringInfoPanel_Id',
        				items: [PipelineRealTimeMonitoringInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PumpRealTimeMonitoringInfoPanel_Id"){
        						var statGridPanel = Ext.getCmp("PumpRealTimeMonitoringStatGridPanel_Id");
        						if (isNotVal(statGridPanel)) {
        							statGridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.realTimeMonitoring.PumpRealTimeMonitoringStatStore');
        						}
        						
//        						var gridPanel = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
//        						if (isNotVal(gridPanel)) {
//        							gridPanel.getStore().load();
//        						}else{
//        							Ext.create('AP.store.realTimeMonitoring.PumpRealTimeMonitoringWellListStore');
//        						}
        					}else if(newCard.id=="PipelineRealTimeMonitoringInfoPanel_Id"){
        						var statGridPanel = Ext.getCmp("PipelineRealTimeMonitoringStatGridPanel_Id");
        						if (isNotVal(statGridPanel)) {
        							statGridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringStatStore');
        						}
        						
//        						var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
//        						if (isNotVal(gridPanel)) {
//        							gridPanel.getStore().load();
//        						}else{
//        							Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore');
//        						}
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }

});

function createRealTimeMonitoringStatColumn(columnInfo) {
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
            myColumns += ",xtype: 'rownumberer',sortable : false,locked:false";
        }
        else if (attr.dataIndex.toUpperCase()=='count'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceStatTableCommStatusColor(value,o,p,e);}";
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

function createRealTimeMonitoringColumn(columnInfo) {
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