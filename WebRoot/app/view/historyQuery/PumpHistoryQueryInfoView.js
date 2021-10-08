var pumpDeviceHistoryQueryDataHandsontableHelper=null;
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
                    fieldLabel: '设备列表',
                    id: "HistoryQueryPumpDeviceListComb_Id",
                    labelWidth: 70,
                    width: 180,
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
                        	if(combo.value==""){
                        		Ext.getCmp("PumpHistoryQueryStartDate_Id").hide();
                        		Ext.getCmp("PumpHistoryQueryEndDate_Id").hide();
                        	}else{
                        		Ext.getCmp("PumpHistoryQueryStartDate_Id").show();
                        		Ext.getCmp("PumpHistoryQueryEndDate_Id").show();
                        	}
                        	
                        	
                        	Ext.getCmp("PumpHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                        }
                    }
                });
        
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                    region: 'center',
                    title:'设备概览',
                    id:'PumpHistoryQueryInfoDeviceListPanel_Id',
                    border: false,
                    layout: 'fit',
                    tbar:[{
                        id: 'PumpHistoryQueryInfoDeviceListSelectRow_Id',
                        xtype: 'textfield',
                        value: 0,
                        hidden: true
                    },pumpDeviceCombo,'-',{
                        xtype: 'datefield',
                        anchor: '100%',
                        hidden: true,
                        fieldLabel: '',
                        labelWidth: 0,
                        width: 90,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PumpHistoryQueryStartDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PumpHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    },{
                        xtype: 'datefield',
                        anchor: '100%',
                        hidden: true,
                        fieldLabel: '至',
                        labelWidth: 15,
                        width: 105,
                        format: 'Y-m-d ',
                        value: '',
//                        value: new Date(),
                        id: 'PumpHistoryQueryEndDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PumpHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                            }
                        }
                    }]
                }, {
                	region: 'east',
                    width: '70%',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    header: false,
                    layout: 'border',
                    border: false,
                    items: [{
                    	region: 'center',
                    	title: '数据详情',
                    	id: "PumpHistoryQueryInfoDataPanel_Id",
                    	layout: 'fit',
                    	html:'<div class="PumpHistoryQueryInfoDataTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="PumpHistoryQueryInfoDataTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(pumpDeviceHistoryQueryDataHandsontableHelper!=null && pumpDeviceHistoryQueryDataHandsontableHelper.hot!=undefined){
                            		var selectRow= Ext.getCmp("PumpHistoryQueryInfoDeviceListSelectRow_Id").getValue();
                            		var gridPanel=Ext.getCmp("PumpHistoryQueryListGridPanel_Id");
                            		if(isNotVal(gridPanel)){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			var deviceName=selectedItem.data.wellName;
                                		var recordId=selectedItem.data.id;
                                		var deviceType=0;
                                		var isHis=1;
                                		var deviceCombValue=Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
                                		if(!isNotVal(deviceCombValue)){
                                			isHis=0;
                                		}
                                		CreatePumpDeviceHistoryQueryDataTable(recordId,deviceName,deviceType,isHis);
                            		}
                            	}
                            }
                        }
                    },{
                    	region: 'south',
                    	height: '40%',
                    	title: '历史曲线',
                    	layout: 'fit',
                    	border: true,
                    	split: true,
                        collapsible: true,
                        tbar:[{
                            id: 'PumpHistoryQuerySelectedCurve_Id',//选择的统计项的值
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        }],
                        html: '<div id="pumpHistoryQueryCurveDiv_Id" style="width:100%;height:100%;"></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                if ($("#pumpHistoryQueryCurveDiv_Id").highcharts() != undefined) {
                                    $("#pumpHistoryQueryCurveDiv_Id").highcharts().setSize($("#pumpHistoryQueryCurveDiv_Id").offsetWidth, $("#pumpHistoryQueryCurveDiv_Id").offsetHeight, true);
                                }
                            }
                        }
                    }]
                }]
            }]
        });
        me.callParent(arguments);
    }
});

function CreatePumpDeviceHistoryQueryDataTable(recordId,deviceName,deviceType,isHis){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/historyQueryController/getDeviceHistoryDetailsData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			
			if(pumpDeviceHistoryQueryDataHandsontableHelper==null || pumpDeviceHistoryQueryDataHandsontableHelper.hot==undefined){
				pumpDeviceHistoryQueryDataHandsontableHelper = PumpDeviceHistoryQueryDataHandsontableHelper.createNew("PumpHistoryQueryInfoDataTableInfoDiv_id");
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
				pumpDeviceHistoryQueryDataHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				pumpDeviceHistoryQueryDataHandsontableHelper.columns=Ext.JSON.decode(columns);
				pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo=result.CellInfo;
				if(result.totalRoot.length==0){
					pumpDeviceHistoryQueryDataHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					pumpDeviceHistoryQueryDataHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo=result.CellInfo;
				pumpDeviceHistoryQueryDataHandsontableHelper.hot.loadData(result.totalRoot);
			}
			//添加单元格属性
			for(var i=0;i<pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
				var row=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row;
				var col=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col;
				var column=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].column;
				var columnDataType=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnDataType;
				pumpDeviceHistoryQueryDataHandsontableHelper.hot.setCellMeta(row,col,'columnDataType',columnDataType);
			}
			
			//绘制第一个数据型变量曲线
			for(var i=0;i<pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
				if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].resolutionMode==2){
					Ext.getCmp("PumpHistoryQuerySelectedCurve_Id").setValue(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
                	pumpHistoryQueryCurve(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
                	break;
				}
			}
			
			
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			recordId:recordId,
			deviceName:deviceName,
			deviceType:deviceType,
			isHis:isHis
        }
	});
};

var PumpDeviceHistoryQueryDataHandsontableHelper = {
		createNew: function (divid) {
	        var pumpDeviceHistoryQueryDataHandsontableHelper = {};
	        pumpDeviceHistoryQueryDataHandsontableHelper.divid = divid;
	        pumpDeviceHistoryQueryDataHandsontableHelper.validresult=true;//数据校验
	        pumpDeviceHistoryQueryDataHandsontableHelper.colHeaders=[];
	        pumpDeviceHistoryQueryDataHandsontableHelper.columns=[];
	        pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo=[];
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addFirstAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	        	var BackgroundColor='#'+AlarmShowStyle.FirstLevel.BackgroundColor;
	        	var Color='#'+AlarmShowStyle.FirstLevel.Color;
	        	var Opacity=AlarmShowStyle.FirstLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addSecondAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	        	var BackgroundColor='#'+AlarmShowStyle.SecondLevel.BackgroundColor;
	        	var Color='#'+AlarmShowStyle.SecondLevel.Color;
	        	var Opacity=AlarmShowStyle.SecondLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addThirdAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	        	var BackgroundColor='#'+AlarmShowStyle.ThirdLevel.BackgroundColor;
	        	var Color='#'+AlarmShowStyle.ThirdLevel.Color;
	        	var Opacity=AlarmShowStyle.ThirdLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = '#DC2828';   
	             td.style.color='#FFFFFF';
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addSizeBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	        	td.style.fontWeight = 'bold';
		        td.style.fontSize = '20px';
		        td.style.fontFamily = 'SimSun';
		        td.style.height = '40px';
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pumpDeviceHistoryQueryDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pumpDeviceHistoryQueryDataHandsontableHelper.divid);
	        	pumpDeviceHistoryQueryDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [30,20,30,20,30,20,30,20],
	                columns:pumpDeviceHistoryQueryDataHandsontableHelper.columns,
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
	                        cellProperties.renderer = pumpDeviceHistoryQueryDataHandsontableHelper.addSizeBg;
	                    }
	                    else if ((visualColIndex ==0 || visualColIndex ==2 || visualColIndex ==4 || visualColIndex ==6)&&visualRowIndex>0) {
							cellProperties.renderer = pumpDeviceHistoryQueryDataHandsontableHelper.addBoldBg;
		                }
	                    
	                    for(var i=0;i<pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
	                    	if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel>0){
	                    		var row2=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row;
		        				var col2=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col*2+1;
		        				if(visualRowIndex==row2 && visualColIndex==col2 ){
		        					if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==100){
		        						cellProperties.renderer = pumpDeviceHistoryQueryDataHandsontableHelper.addFirstAlarmLevelColBg;
		        					}else if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==200){
		        						cellProperties.renderer = pumpDeviceHistoryQueryDataHandsontableHelper.addSecondAlarmLevelColBg;
		        					}else if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==300){
		        						cellProperties.renderer = pumpDeviceHistoryQueryDataHandsontableHelper.addThirdAlarmLevelColBg;
		        					}
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
		                	
		                	var item=pumpDeviceHistoryQueryDataHandsontableHelper.hot.getDataAtCell(relRow,relColumn);
		                	var selectecCell=pumpDeviceHistoryQueryDataHandsontableHelper.hot.getCell(relRow,relColumn);
		                	var columnDataType='';
		                	var resolutionMode=0;
		                	for(var i=0;i<pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
		        				if(relRow==pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row && relColumn==pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col*2){
		        					columnDataType=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnDataType;
		        					resolutionMode=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].resolutionMode;
		        					break;
		        				}
		        			}
		                	
		                	if(isNotVal(item)&&resolutionMode==2){
		                		Ext.getCmp("PumpHistoryQuerySelectedCurve_Id").setValue(item);
			                	pumpHistoryQueryCurve(item);
		                	}
	                	}
	                }
	        	});
	        }
	        return pumpDeviceHistoryQueryDataHandsontableHelper;
	    }
};
function pumpHistoryQueryCurve(item){
	var gridPanel=Ext.getCmp("PumpHistoryQueryListGridPanel_Id")
	var deviceName="";
	
	var deviceCombValue=Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
	var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id').rawValue;
    var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id').rawValue;
    if(!isNotVal(deviceCombValue)){
    	startDate='';
    	endDate='';
    }
	
	if(isNotVal(gridPanel)){
		deviceName=gridPanel.getSelectionModel().getSelection()[0].data.wellName;
		
		Ext.Ajax.request({
			method:'POST',
			url:context + '/historyQueryController/getHistoryQueryCurveData',
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
			    initTimeAndDataCurveChartFn(ser, tickInterval, "pumpHistoryQueryCurveDiv_Id", title, '', xTitle, yTitle, color,false);
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
}
