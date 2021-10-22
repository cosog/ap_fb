Ext.define("AP.view.alarmQuery.PumpAlarmQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpAlarmQueryInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var CommunicationAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpCommunicationAlarmInfoView');
        var NumericValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpNumericValueAlarmInfoView');
        var EnumValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpEnumValueAlarmInfoView');
        var SwitchingValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PumpSwitchingValueAlarmInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PumpAlarmQueryTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'left',
        		items: [{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">通信状态报警</div>',
        				id:'PumpCommunicationAlarmInfoPanel_Id',
        				items: [CommunicationAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">数值量报警</div>',
        				id:'PumpNumericValueAlarmInfoPanel_Id',
        				items: [NumericValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">枚举量报警</div>',
        				id:'PumpEnumValueAlarmInfoPanel_Id',
        				items: [EnumValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">开关量报警</div>',
        				id:'PumpSwitchingValueAlarmInfoPanel_Id',
        				items: [SwitchingValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PumpCommunicationAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpCommunicationAlarmGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpCommunicationAlarmStore');
        						}
        					}else if(newCard.id=="PumpNumericValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpNumericValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpNumericValueAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PumpEnumValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpEnumValueAlarmGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpEnumValueAlarmStore');
        						}
        					}else if(newCard.id=="PumpSwitchingValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PumpSwitchingValueAlarmGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PumpSwitchingValueAlarmStore');
        						}
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});

function createAlarmOverviewQueryColumn(columnInfo) {
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
        else if (attr.dataIndex.toUpperCase()=='wellName'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        else if (attr.dataIndex.toUpperCase()=='commStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceCommStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase()=='runStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceRunStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase() == 'alarmtime'.toUpperCase() || attr.dataIndex.toUpperCase() == 'recoverytime'.toUpperCase()) {
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

function createAlarmQueryColumn(columnInfo) {
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
        else if (attr.dataIndex.toUpperCase()=='wellName'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        else if (attr.dataIndex.toUpperCase()=='commStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceCommStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase()=='runStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceRunStatusColor(value,o,p,e);}";
        }
        else if (attr.dataIndex.toUpperCase() == 'alarmtime'.toUpperCase() || attr.dataIndex.toUpperCase() == 'recoverytime'.toUpperCase()) {
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