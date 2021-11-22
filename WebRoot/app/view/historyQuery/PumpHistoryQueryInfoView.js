Ext.define("AP.view.historyQuery.PumpHistoryQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpHistoryQueryInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var pumpCombStore = new Ext.data.JsonStore({
        	pageSize:defaultWellComboxSize,
            fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
            proxy: {
            	url: context + '/wellInformationManagerController/loadWellComboxList',
                type: "ajax",
                actionMethods: {
                    read: 'POST'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'totals'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (store, options) {
                	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellName = Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 0,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pumpDeviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '井名',
                    id: "HistoryQueryPumpDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: pumpCombStore,
                    autoSelect: false,
                    editable: true,
                    triggerAction: 'all',
                    displayField: "boxval",
                    valueField: "boxkey",
                    pageSize:comboxPagingStatus,
                    minChars:0,
                    emptyText: cosog.string.all,
                    blankText: cosog.string.all,
                    listeners: {
                        expand: function (sm, selections) {
                            pumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                    region: 'center',
                    title:'设备列表',
                    id:'PumpHistoryQueryInfoDeviceListPanel_Id',
                    border: false,
                    layout: 'fit',
                    tbar:[{
                        id: 'PumpHistoryQueryInfoDeviceListSelectRow_Id',
                        xtype: 'textfield',
                        value: -1,
                        hidden: true
                    },{
                        id: 'PumpHistoryQueryWellListColumnStr_Id',
                        xtype: 'textfield',
                        value: '',
                        hidden: true
                    },{
                        id: 'PumpHistoryQueryDataColumnStr_Id',
                        xtype: 'textfield',
                        value: '',
                        hidden: true
                    },pumpDeviceCombo,'-', {
                        xtype: 'button',
                        text: cosog.string.exportExcel,
                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        }
                    }]
                }, {
                	region: 'east',
                    width: '75%',
                    title: '历史数据',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    layout: 'border',
                    border: false,
                    tbar:[{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '区间',
                        labelWidth: 30,
                        width: 130,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PumpHistoryQueryStartDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PumpHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                        xtype: 'datefield',
                        anchor: '100%',
                        fieldLabel: '至',
                        labelWidth: 15,
                        width: 115,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PumpHistoryQueryEndDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PumpHistoryQueryDataGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },'-', {
                        xtype: 'button',
                        text: cosog.string.exportExcel,
                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        }
                    }],
                    items: [{
                    	region: 'center',
                    	title: '历史曲线',
                    	layout: 'fit',
                    	header: false,
                    	border: true,
                        html: '<div id="pumpHistoryQueryCurveDiv_Id" style="width:100%;height:100%;"></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                if ($("#pumpHistoryQueryCurveDiv_Id").highcharts() != undefined) {
                                    $("#pumpHistoryQueryCurveDiv_Id").highcharts().setSize($("#pumpHistoryQueryCurveDiv_Id").offsetWidth, $("#pumpHistoryQueryCurveDiv_Id").offsetHeight, true);
                                }
                            }
                        }
                    },{
                    	region: 'south',
                    	height: '50%',
                    	title: '历史数据',
                    	header: false,
                    	id: "PumpHistoryQueryDataInfoPanel_Id",
                    	layout: 'fit',
                    	border: true,
                    	split: true,
                        collapsible: true
                        
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});
function pumpHistoryQueryCurve(item){
	var orgId = Ext.getCmp('leftOrg_Id').getValue();
	var deviceName='';
	var selectRow= Ext.getCmp("PumpHistoryQueryInfoDeviceListSelectRow_Id").getValue();
	if(selectRow>=0){
		deviceName = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
	}
	var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id').rawValue;
    var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id').rawValue;
	Ext.Ajax.request({
		method:'POST',
		url:context + '/historyQueryController/getHistoryQueryCurveData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
		    var data = result.list;
		    var tickInterval = 1;
		    tickInterval = Math.floor(data.length / 10) + 1;
		    if(tickInterval<100){
		    	tickInterval=100;
		    }
//		    tickInterval = data.length;//Math.floor(data.length / 2) + 1;
//		    if(tickInterval<10){
//		    	tickInterval=10;
//		    }
//		    tickInterval=1000;
		    var title = result.deviceName  + result.item + "曲线";
		    var xTitle='采集时间';
		    var yTitle=result.item;
		    if(isNotVal(result.unit)){
		    	yTitle+='('+result.unit+')';
		    }
		    var legendName = [result.item];
		    var series = "[";
		    for (var i = 0; i < legendName.length; i++) {
		        series += "{\"name\":\"" + legendName[i] + "\",";
		        series += "\"data\":[";
		        for (var j = 0; j < data.length; j++) {
		            if (i == 0) {
		            	series += "[" + Date.parse(data[j].acqTime.replace(/-/g, '/')) + "," + data[j].value + "]";
		            }else if(i == 1){
		            	series += "[" + Date.parse(data[j].acqTime.replace(/-/g, '/')) + "," + data[j].value2 + "]";
		            }
		            if (j != data.length - 1) {
		                series += ",";
		            }
		        }
		        series += "]}";
		        if (i != legendName.length - 1) {
		            series += ",";
		        }
		    }
		    series += "]";
		    
		    var ser = Ext.JSON.decode(series);
		    var color = ['#800000', // 红
		       '#008C00', // 绿
		       '#000000', // 黑
		       '#0000FF', // 蓝
		       '#F4BD82', // 黄
		       '#FF00FF' // 紫
		     ];
		    initTimeAndDataCurveChartFn(ser, tickInterval, "pumpHistoryQueryCurveDiv_Id", title, '', xTitle, yTitle, color,false,'%Y-%m-%d');
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:deviceName,
			item:item,
			startDate:startDate,
            endDate:endDate,
			deviceType:0
        }
	});
}
