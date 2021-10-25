Ext.define("AP.view.alarmQuery.PipelineAlarmQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineAlarmQueryInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var CommunicationAlarmInfoView = Ext.create('AP.view.alarmQuery.PipelineCommunicationAlarmInfoView');
        var NumericValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PipelineNumericValueAlarmInfoView');
        var EnumValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PipelineEnumValueAlarmInfoView');
        var SwitchingValueAlarmInfoView = Ext.create('AP.view.alarmQuery.PipelineSwitchingValueAlarmInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"PipelineAlarmQueryTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'left',
        		items: [{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">通信状态报警</div>',
        				id:'PipelineCommunicationAlarmInfoPanel_Id',
        				items: [CommunicationAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">数值量报警</div>',
        				id:'PipelineNumericValueAlarmInfoPanel_Id',
        				items: [NumericValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">枚举量报警</div>',
        				id:'PipelineEnumValueAlarmInfoPanel_Id',
        				items: [EnumValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '<div style="color:#000000;font-size:11px;font-family:SimSun">开关量报警</div>',
        				id:'PipelineSwitchingValueAlarmInfoPanel_Id',
        				items: [SwitchingValueAlarmInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PipelineCommunicationAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PipelineCommunicationAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PipelineCommunicationAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PipelineNumericValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PipelineNumericValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PipelineNumericValueAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PipelineEnumValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PipelineEnumValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PipelineEnumValueAlarmOverviewStore');
        						}
        					}else if(newCard.id=="PipelineSwitchingValueAlarmInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PipelineSwitchingValueAlarmOverviewGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.alarmQuery.PipelineSwitchingValueAlarmOverviewStore');
        						}
        					}
        				}
        			}
            	}]
        });
        me.callParent(arguments);
    }
});

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