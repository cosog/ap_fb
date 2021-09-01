var pipelineDeviceRealMonitorDataHandsontableHelper=null;
Ext.define("AP.view.realTimeMonitoring.PipelineRealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineRealTimeMonitoringInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                    region: 'center',
                    title:'设备概览',
                    id:'PipelineRealTimeMonitoringInfoDeviceListPanel_Id',
                    border: false,
                    layout: 'fit',
                    tbar:[{
                        id: 'PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id',
                        xtype: 'textfield',
                        value: 0,
                        hidden: true
                    }]
                    
                }, {
                	region: 'east',
                    width: '80%',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    layout: 'border',
                    header: false,
                    items:[{
                        region: 'center',
                        layout: 'border',
                        border: false,
                        items: [{
                        	region: 'center',
                        	title: '实时数据',
                        	id: "PipelineRealTimeMonitoringInfoDataPanel_Id",
                        	layout: 'fit',
                        	html:'<div class="PipelineRealTimeMonitoringInfoDataTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="PipelineRealTimeMonitoringInfoDataTableInfoDiv_id"></div></div>',
                            listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if(pipelineDeviceRealMonitorDataHandsontableHelper!=null && pipelineDeviceRealMonitorDataHandsontableHelper.hot!=undefined){
                                		var selectRow= Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").getValue();
                                		var gridPanel=Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
                                		if(isNotVal(gridPanel)){
                                			var selectedItem=gridPanel.getStore().getAt(selectRow);
                                			CreatePipelineDeviceRealMonitorDataTable(selectedItem.data.wellName,deviceType)
                                		}
                                	}
                                }
                            }
                        },{
                        	region: 'south',
                        	height: '40%',
                        	title: '趋势曲线',
                        	layout: 'fit',
                        	border: true,
                        	split: true,
                            collapsible: true,
                            tbar:[{
                                id: 'PipelineRealTimeMonitoringSelectedCurve_Id',//选择的统计项的值
                                xtype: 'textfield',
                                value: '',
                                hidden: true
                            }],
                            html: '<div id="pipelineRealTimeMonitoringCurveDiv_Id" style="width:100%;height:100%;"></div>',
                            listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                    if ($("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts() != undefined) {
                                        $("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts().setSize($("#pipelineRealTimeMonitoringCurveDiv_Id").offsetWidth, $("#pipelineRealTimeMonitoringCurveDiv_Id").offsetHeight, true);
                                    }
                                }
                            }
                        }]
                    },{
                    	region: 'east',
                    	width: '15%',
                    	xtype: 'tabpanel',
                    	id:"PipelineRealTimeMonitoringRightTabPanel",
                		activeTab: 0,
                		border: false,
                		tabPosition: 'top',
                		items: [{
                			title:'控制',
                			id: 'PipelineRealTimeMonitoringRightControlPanel',
                            border: false,
                            layout: 'fit',
                            autoScroll: true,
                            scrollable: true
                		},{
                			title:'设备信息',
                			id: 'PipelineRealTimeMonitoringRightDeviceInfoPanel',
                            border: false,
                            layout: 'fit',
                            autoScroll: true,
                            scrollable: true
                		}]
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});

function CreatePipelineDeviceRealMonitorDataTable(deviceName,deviceType){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/realTimeMonitoringController/getDeviceRealMonitorData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			
			if(pipelineDeviceRealMonitorDataHandsontableHelper==null || pipelineDeviceRealMonitorDataHandsontableHelper.hot==undefined){
				pipelineDeviceRealMonitorDataHandsontableHelper = PipelineDeviceRealMonitorDataHandsontableHelper.createNew("PipelineRealTimeMonitoringInfoDataTableInfoDiv_id");
				var colHeaders="['名称','变量','名称','变量','名称','变量','名称','变量']";
				var columns="[" 
						+"{data:'name1'}," 
						+"{data:'value1'}," 
						+"{data:'name2'},"
						+"{data:'value2'}," 
						+"{data:'name3'}," 
						+"{data:'value3'}," 
						+"{data:'name4'}," 
						+"{data:'value4'}" 
						+"]";
				pipelineDeviceRealMonitorDataHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				pipelineDeviceRealMonitorDataHandsontableHelper.columns=Ext.JSON.decode(columns);
				pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo=result.CellInfo;
				if(result.totalRoot.length==0){
					pipelineDeviceRealMonitorDataHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					pipelineDeviceRealMonitorDataHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo=result.CellInfo;
				pipelineDeviceRealMonitorDataHandsontableHelper.hot.loadData(result.totalRoot);
			}
			
			//绘制第一个float型变量曲线
			for(var i=0;i<pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo.length;i++){
				if(pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].columnDataType.includes('float')){
					Ext.getCmp("PipelineRealTimeMonitoringSelectedCurve_Id").setValue(pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].columnName);
                	pipelineRealTimeMonitoringCurve(pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].columnName);
                	break;
				}
			}
			//添加单元格属性
			for(var i=0;i<pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo.length;i++){
				var row=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].row;
				var col=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].col;
				var column=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].column;
				var columnDataType=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].columnDataType;
				pipelineDeviceRealMonitorDataHandsontableHelper.hot.setCellMeta(row,col,'columnDataType',columnDataType);
			}
			
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:deviceName,
			deviceType:deviceType
        }
	});
};

var PipelineDeviceRealMonitorDataHandsontableHelper = {
		createNew: function (divid) {
	        var pipelineDeviceRealMonitorDataHandsontableHelper = {};
	        pipelineDeviceRealMonitorDataHandsontableHelper.divid = divid;
	        pipelineDeviceRealMonitorDataHandsontableHelper.validresult=true;//数据校验
	        pipelineDeviceRealMonitorDataHandsontableHelper.colHeaders=[];
	        pipelineDeviceRealMonitorDataHandsontableHelper.columns=[];
	        pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo=[];
	        
	        pipelineDeviceRealMonitorDataHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = '#DC2828';   
	             td.style.color='#FFFFFF';
	        }
	        
	        pipelineDeviceRealMonitorDataHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        pipelineDeviceRealMonitorDataHandsontableHelper.addSizeBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	        	td.style.fontWeight = 'bold';
		        td.style.fontSize = '20px';
		        td.style.fontFamily = 'SimSun';
		        td.style.height = '40px';
	        }
	        
	        pipelineDeviceRealMonitorDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pipelineDeviceRealMonitorDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pipelineDeviceRealMonitorDataHandsontableHelper.divid);
	        	pipelineDeviceRealMonitorDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [30,20,30,20,30,20,30,20],
	                columns:pipelineDeviceRealMonitorDataHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                rowHeaders: false,//显示行头
	                colHeaders: false,
	                rowHeights: [40],
	                mergeCells: [{
                        "row": 0,
                        "col": 0,
                        "rowspan": 1,
                        "colspan": 8
                    }],
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                    if (visualRowIndex ==0) {
	                        cellProperties.renderer = pipelineDeviceRealMonitorDataHandsontableHelper.addSizeBg;
	                    }
	                    else if ((visualColIndex ==0 || visualColIndex ==2 || visualColIndex ==4 || visualColIndex ==6)&&visualRowIndex>0) {
							cellProperties.renderer = pipelineDeviceRealMonitorDataHandsontableHelper.addBoldBg;
		                }
	                    
	                    for(var i=0;i<pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo.length;i++){
	                    	if(pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].alarmLevel>0){
	                    		var row2=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].row;
		        				var col2=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].col*2+1;
		        				if(visualRowIndex==row2 && visualColIndex==col2 ){
		        					cellProperties.renderer = pipelineDeviceRealMonitorDataHandsontableHelper.addColBg;
		        				}
	                    	}
	        			}
	                    
	                    cellProperties.readOnly = true;
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                	if(row>0||column>0){
	                		var relRow=row;
	                		var relColumn=column;
	                		if(column%2==1){
	                			relColumn=column-1;
	                		}else if(column%2==0){
	                			
	                		}
		                	
		                	var item=pipelineDeviceRealMonitorDataHandsontableHelper.hot.getDataAtCell(relRow,relColumn);
		                	var selectecCell=pipelineDeviceRealMonitorDataHandsontableHelper.hot.getCell(relRow,relColumn);
		                	var columnDataType='';
		                	
		                	for(var i=0;i<pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo.length;i++){
		        				if(relRow==pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].row && relColumn==pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].col){
		        					columnDataType=pipelineDeviceRealMonitorDataHandsontableHelper.CellInfo[i].columnDataType;
		        					break;
		        				}
		        			}
		                	
		                	if(isNotVal(item)&&columnDataType.includes('float')){
		                		Ext.getCmp("PipelineRealTimeMonitoringSelectedCurve_Id").setValue(item);
			                	pipelineRealTimeMonitoringCurve(item);
		                	}
	                	}
	                }
	        	});
	        }
	        return pipelineDeviceRealMonitorDataHandsontableHelper;
	    }
};
function pipelineRealTimeMonitoringCurve(item){
	var gridPanel=Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id")
	var deviceName="";
	if(isNotVal(gridPanel)){
		deviceName=gridPanel.getSelectionModel().getSelection()[0].data.wellName;
		
		Ext.Ajax.request({
			method:'POST',
			url:context + '/realTimeMonitoringController/getRealTimeCurveData',
			success:function(response) {
				var result =  Ext.JSON.decode(response.responseText);
			    var data = result.list;
			    var tickInterval = 1;
			    tickInterval = data.length;//Math.floor(data.length / 2) + 1;
			    if(tickInterval<10){
			    	tickInterval=10;
			    }
			    tickInterval=1000;
//			    if(){
//			    	
//			    }
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
			    initTimeAndDataCurveChartFn(ser, tickInterval, "pipelineRealTimeMonitoringCurveDiv_Id", title, '', xTitle, yTitle, color,false);
			},
			failure:function(){
				Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
			},
			params: {
				deviceName:deviceName,
				item:item,
				deviceType:0
	        }
		});
	}
}
