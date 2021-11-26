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
        						var gridPanel = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id");
        						if (isNotVal(gridPanel)) {
        							gridPanel.getStore().load();
        						}else{
        							Ext.create('AP.store.historyQuery.PumpHistoryQueryWellListStore');
        						}
        					}else if(newCard.id=="PipelineHistoryQueryInfoPanel_Id"){
        						var gridPanel = Ext.getCmp("PipelineHistoryQueryDeviceListGridPanel_Id");
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
        			beforeclose: function ( panel, eOpts) {},
        			afterrender: function ( panel, eOpts) {}
        		}
        });
        me.callParent(arguments);
    }

});

function createHistoryQueryDeviceListColumn(columnInfo) {
    var myArr = columnInfo;

    var myColumns = "[";
    for (var i = 0; i < myArr.length; i++) {
        var attr = myArr[i];
        var width_ = "";
        var lock_ = "";
        var hidden_ = "";
        var flex_ = "";
        if (attr.hidden == true) {
            hidden_ = ",hidden:true";
        }
        if (isNotVal(attr.lock)) {
            //lock_ = ",locked:" + attr.lock;
        }
        if (isNotVal(attr.width)) {
            width_ = ",width:" + attr.width;
        }
        if (isNotVal(attr.flex)) {
        	flex_ = ",flex:" + attr.flex;
        }
        myColumns += "{text:'" + attr.header + "',lockable:true,align:'center' "+width_+flex_;
        if (attr.dataIndex.toUpperCase() == 'id'.toUpperCase()) {
            myColumns += ",xtype: 'rownumberer',sortable : false,locked:false";
        }
        else if (attr.dataIndex.toUpperCase()=='wellName'.toUpperCase()) {
            myColumns += ",sortable : false,locked:false,dataIndex:'" + attr.dataIndex + "',renderer:function(value){return \"<span data-qtip=\"+(value==undefined?\"\":value)+\">\"+(value==undefined?\"\":value)+\"</span>\";}";
        }
        else if (attr.dataIndex.toUpperCase()=='commStatusName'.toUpperCase()) {
            myColumns += ",sortable : false,dataIndex:'" + attr.dataIndex + "',renderer:function(value,o,p,e){return adviceCommStatusColor(value,o,p,e);}";
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

function exportHistoryQueryDeviceListExcel(orgId,deviceType,deviceName,fileName,title,columnStr) {
    var url = context + '/historyQueryController/exportHistoryQueryDeviceListExcel';
    var fields = "";
    var heads = "";
    var lockedheads = "";
    var unlockedheads = "";
    var lockedfields = "";
    var unlockedfields = "";
    var columns_ = Ext.JSON.decode(columnStr);
    
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
    }
    if (isNotVal(unlockedfields)) {
    	unlockedfields = unlockedfields.substring(0, unlockedfields.length - 1);
    	unlockedheads = unlockedheads.substring(0, unlockedheads.length - 1);
    }
    fields="id"+(isNotVal(lockedfields)?(","+lockedfields):"")+(isNotVal(unlockedfields)?(","+unlockedfields):"");
    heads="序号"+(isNotVal(lockedheads)?(","+lockedheads):"")+(isNotVal(unlockedheads)?(","+unlockedheads):"");
    
    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) 
    + "&orgId=" + orgId 
    + "&deviceType=" + deviceType 
    + "&deviceName=" + URLencode(URLencode(deviceName))
    + "&fileName=" + URLencode(URLencode(fileName)) 
    + "&title=" + URLencode(URLencode(title));
    openExcelWindow(url + '?flag=true' + param);
};

function exportHistoryQueryDataExcel(orgId,deviceType,deviceName,startDate,endDate,fileName,title,columnStr) {
    var url = context + '/historyQueryController/exportHistoryQueryDataExcel';
    var fields = "";
    var heads = "";
    var lockedheads = "";
    var unlockedheads = "";
    var lockedfields = "";
    var unlockedfields = "";
    var columns_ = Ext.JSON.decode(columnStr);
    
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
    }
    if (isNotVal(unlockedfields)) {
    	unlockedfields = unlockedfields.substring(0, unlockedfields.length - 1);
    	unlockedheads = unlockedheads.substring(0, unlockedheads.length - 1);
    }
    fields="id"+(isNotVal(lockedfields)?(","+lockedfields):"")+(isNotVal(unlockedfields)?(","+unlockedfields):"");
    heads="序号"+(isNotVal(lockedheads)?(","+lockedheads):"")+(isNotVal(unlockedheads)?(","+unlockedheads):"");
    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) 
    + "&orgId=" + orgId 
    + "&deviceType=" + deviceType 
    + "&deviceName=" + URLencode(URLencode(deviceName))
    + "&startDate=" + startDate
    + "&endDate=" + endDate
    + "&fileName=" + URLencode(URLencode(fileName)) 
    + "&title=" + URLencode(URLencode(title));
    openExcelWindow(url + '?flag=true' + param);
};


function deviceHistoryQueryCurve(deviceType){
	var selectRowId="PumpHistoryQueryInfoDeviceListSelectRow_Id";
	var gridPanelId="PumpHistoryQueryDeviceListGridPanel_Id";
	var startDateId="PumpHistoryQueryStartDate_Id";
	var endDateId="PumpHistoryQueryEndDate_Id";
	var divId="pumpHistoryQueryCurveDiv_Id";
	
	if(deviceType==1){
		selectRowId="PipelineHistoryQueryInfoDeviceListSelectRow_Id";
		gridPanelId="PipelineHistoryQueryDeviceListGridPanel_Id";
		startDateId="PipelineHistoryQueryStartDate_Id";
		endDateId="PipelineHistoryQueryEndDate_Id";
		divId="pipelineHistoryQueryCurveDiv_Id";
	}
	
	
	var orgId = Ext.getCmp('leftOrg_Id').getValue();
	var deviceName='';
	var selectRow= Ext.getCmp(selectRowId).getValue();
	if(selectRow>=0){
		deviceName = Ext.getCmp(gridPanelId).getSelectionModel().getSelection()[0].data.wellName;
	}
	var startDate=Ext.getCmp(startDateId).rawValue;
    var endDate=Ext.getCmp(endDateId).rawValue;
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
		    var title = result.deviceName + "历史曲线";
		    var xTitle='采集时间';
		    var legendName =result.curveItems;
		    
		    
		    
		    var yTitle=legendName[0];
		    
		    var series = "[";
		    var yAxis= [];
		    for (var i = 0; i < legendName.length; i++) {
		        series += "{\"name\":\"" + legendName[i] + "\"," 
		        +"\"yAxis\":"+i+",";
		        series += "\"data\":[";
		        for (var j = 0; j < data.length; j++) {
		        	series += "[" + Date.parse(data[j].acqTime.replace(/-/g, '/')) + "," + data[j].data[i] + "]";
		            if (j != data.length - 1) {
		                series += ",";
		            }
		        }
		        series += "]}";
		        if (i != legendName.length - 1) {
		            series += ",";
		        }
		        var opposite=false;
		        if(i>0){
		        	opposite=true;
		        }
		        var singleAxis={
		                lineWidth: 1,
		                title: {
		                    text: legendName[i],
		                    style: {
//		                        color: '#000000',
//		                        fontWeight: 'bold'
		                    }
		                },
		                labels: {
		                    formatter: function () {
		                        return Highcharts.numberFormat(this.value, 0);
		                    }
		                },
			            allowDecimals: false,    // 刻度值是否为小数
//			            minorTickInterval: '',   // 不显示次刻度线
		                opposite:opposite
		          };
		        yAxis.push(singleAxis);
		        
		    }
		    series += "]";
		    
		    var ser = Ext.JSON.decode(series);
		    var color = ['#800000', // 红
		       '#008C00', // 绿
		       '#000000', // 黑
		       '#0000FF', // 蓝
		       '#F09614', // 黄
		       '#FF00FF' // 紫
		     ];
		    var timeFormat='%m-%d';
//		    timeFormat='%H:%M';
		    initDeviceHistoryCurveChartFn(ser, tickInterval, divId, title, '', '', yAxis, color,true,timeFormat);
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:deviceName,
			startDate:startDate,
            endDate:endDate,
			deviceType:deviceType
        }
	});
};

function initDeviceHistoryCurveChartFn(series, tickInterval, divId, title, subtitle, xtitle, yAxis, color,legend,timeFormat) {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var mychart = new Highcharts.Chart({
        chart: {
            renderTo: divId,
            type: 'spline',
            shadow: true,
            borderWidth: 0,
            zoomType: 'xy'
        },
        credits: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        colors: color,
        xAxis: {
            type: 'datetime',
            title: {
                text: xtitle
            },
//            tickInterval: tickInterval,
            tickPixelInterval:tickInterval,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat(timeFormat, this.value);
                },
                autoRotation:true,//自动旋转
                rotation: -45 //倾斜度，防止数量过多显示不全  
//                step: 2
            }
        },
        yAxis: yAxis,
        tooltip: {
            crosshairs: true, //十字准线
            shared: true,
            style: {
                color: '#333333',
                fontSize: '12px',
                padding: '8px'
            },
            dateTimeLabelFormats: {
                millisecond: '%Y-%m-%d %H:%M:%S.%L',
                second: '%Y-%m-%d %H:%M:%S',
                minute: '%Y-%m-%d %H:%M',
                hour: '%Y-%m-%d %H',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        exporting: {
            enabled: true,
            filename: 'class-booking-chart',
            url: context + '/exportHighcharsPicController/export'
        },
        plotOptions: {
            spline: {
                lineWidth: 1,
                fillOpacity: 0.3,
                marker: {
                    enabled: true,
                    radius: 3, //曲线点半径，默认是4
                    //                            symbol: 'triangle' ,//曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
                    states: {
                        hover: {
                            enabled: true,
                            radius: 6
                        }
                    }
                },
                shadow: true
            }
        },
        legend: {
            layout: 'horizontal',//horizontal水平 vertical 垂直
            align: 'center',  //left，center 和 right
            verticalAlign: 'bottom',//top，middle 和 bottom
            enabled: legend,
            borderWidth: 0
        },
        series: series
    });
};