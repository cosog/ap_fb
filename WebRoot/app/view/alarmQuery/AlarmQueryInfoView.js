Ext.define("AP.view.alarmQuery.AlarmQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.alarmQueryInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var PumpAlarmQueryInfoView = Ext.create('AP.view.alarmQuery.PumpAlarmQueryInfoView');
        var PipelineAlarmQueryInfoView = Ext.create('AP.view.alarmQuery.PipelineAlarmQueryInfoView');
        Ext.apply(me, {
        	items: [{
        		xtype: 'tabpanel',
        		id:"AlarmQueryTabPanel",
        		activeTab: 0,
        		border: false,
        		tabPosition: 'bottom',
        		items: [{
        				title: '泵设备',
        				id:'PumpAlarmQueryPanel_Id',
        				items: [PumpAlarmQueryInfoView],
        				layout: "fit",
        				border: false
        			},{
        				title: '管设备',
        				id:'PipelineAlarmQueryPanel_Id',
        				items: [PipelineAlarmQueryInfoView],
        				layout: "fit",
        				border: false
        			}],
        			listeners: {
        				tabchange: function (tabPanel, newCard,oldCard, obj) {
        					Ext.getCmp("bottomTab_Id").setValue(newCard.id); 
        					if(newCard.id=="PumpAlarmQueryPanel_Id"){
        						var secondTabPanel = Ext.getCmp("PumpAlarmQueryTabPanel");
        						var secondActiveId = secondTabPanel.getActiveTab().id;
        						if(secondActiveId=="PumpCommunicationAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PumpCommunicationAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PumpCommunicationAlarmStore');
            						}
            					}else if(secondActiveId=="PumpNumericValueAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PumpNumericValueAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PumpNumericValueAlarmStore');
            						}
            					}else if(secondActiveId=="PumpEnumValueAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PumpEnumValueAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PumpEnumValueAlarmStore');
            						}
            					}else if(secondActiveId=="PumpSwitchingValueAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PumpSwitchingValueAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PumpSwitchingValueAlarmStore');
            						}
            					}
        					}else if(newCard.id=="PipelineAlarmQueryPanel_Id"){
        						var secondTabPanel = Ext.getCmp("PipelineAlarmQueryTabPanel");
        						var secondActiveId = secondTabPanel.getActiveTab().id;
        						if(secondActiveId=="PipelineCommunicationAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PipelineCommunicationAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PipelineCommunicationAlarmStore');
            						}
            					}else if(secondActiveId=="PipelineNumericValueAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PipelineNumericValueAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PipelineNumericValueAlarmStore');
            						}
            					}else if(secondActiveId=="PipelineEnumValueAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PipelineEnumValueAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PipelineEnumValueAlarmStore');
            						}
            					}else if(secondActiveId=="PipelineSwitchingValueAlarmInfoPanel_Id"){
            						var gridPanel = Ext.getCmp("PipelineSwitchingValueAlarmGridPanel_Id");
            						if (isNotVal(gridPanel)) {
            							gridPanel.getStore().load();
            						}else{
            							Ext.create('AP.store.alarmQuery.PipelineSwitchingValueAlarmStore');
            						}
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

function exportAlarmDataExcel(orgId,deviceType,deviceName,startDate,endDate,alarmType,alarmLevel,fileName,title,columnStr) {
    var url = context + '/alarmQueryController/exportAlarmData';
    var fields = "";
    var heads = "";
    var lockedheads = "";
    var unlockedheads = "";
    var lockedfields = "";
    var unlockedfields = "";
    var columns_ = Ext.JSON.decode(columnStr);
    
    fields = "id";
    heads = "序号";
    Ext.Array.each(columns_, function (name, index, countriesItSelf) {
        var column = columns_[index];
        if (index > 0 && !column.hidden) {
        	if(column.locked){
        		lockedfields += column.dataIndex + ",";
        		lockedheads += column.text + ",";
        	}else{
        		unlockedfields += column.dataIndex + ",";
        		unlockedheads += column.text + ",";
        	}
        }
    });
    if (isNotVal(lockedfields)) {
    	lockedfields = lockedfields.substring(0, lockedfields.length - 1);
    	lockedheads = lockedheads.substring(0, lockedheads.length - 1);
    	fields+=","+lockedfields;
    	heads+= "," + lockedheads;
    }
    if (isNotVal(unlockedfields)) {
    	unlockedfields = unlockedfields.substring(0, unlockedfields.length - 1);
    	unlockedheads = unlockedheads.substring(0, unlockedheads.length - 1);
    	fields+=","+unlockedfields;
    	heads+= "," + unlockedheads;
    }
    
    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) 
    + "&orgId=" + orgId 
    + "&deviceType=" + deviceType 
    + "&deviceName=" + URLencode(URLencode(deviceName))
    + "&startDate=" + startDate
    + "&endDate=" + endDate
    + "&alarmType=" + alarmType
    + "&alarmLevel=" + alarmLevel
    + "&fileName=" + URLencode(URLencode(fileName)) 
    + "&title=" + URLencode(URLencode(title));
    openExcelWindow(url + '?flag=true' + param);
};