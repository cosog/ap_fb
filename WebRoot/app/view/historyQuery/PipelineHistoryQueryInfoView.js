var pipelineDeviceHistoryQueryDataHandsontableHelper=null;
Ext.define("AP.view.historyQuery.PipelineHistoryQueryInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineHistoryQueryInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        
        var pipelineCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 1,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pipelineDeviceCombo = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '设备列表',
                    id: "HistoryQueryPipelineDeviceListComb_Id",
                    labelWidth: 70,
                    width: 180,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: pipelineCombStore,
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
                            pipelineDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                        	if(combo.value==""){
                        		Ext.getCmp("PipelineHistoryQueryStartDate_Id").hide();
                        		Ext.getCmp("PipelineHistoryQueryEndDate_Id").hide();
                        	}else{
                        		Ext.getCmp("PipelineHistoryQueryStartDate_Id").show();
                        		Ext.getCmp("PipelineHistoryQueryEndDate_Id").show();
                        	}
                        	
                        	
                        	Ext.getCmp("PipelineHistoryQueryListGridPanel_Id").getStore().loadPage(1);
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
                    id:'PipelineHistoryQueryInfoDeviceListPanel_Id',
                    border: false,
                    layout: 'fit',
                    tbar:[{
                        id: 'PipelineHistoryQueryInfoDeviceListSelectRow_Id',
                        xtype: 'textfield',
                        value: 0,
                        hidden: true
                    },pipelineDeviceCombo,'-',{
                        xtype: 'datefield',
                        anchor: '100%',
                        hidden: true,
                        fieldLabel: '',
                        labelWidth: 0,
                        width: 90,
                        format: 'Y-m-d ',
                        value: '',
                        id: 'PipelineHistoryQueryStartDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PipelineHistoryQueryListGridPanel_Id").getStore().loadPage(1);
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
                        id: 'PipelineHistoryQueryEndDate_Id',
                        listeners: {
                        	select: function (combo, record, index) {
                        		Ext.getCmp("PipelineHistoryQueryListGridPanel_Id").getStore().loadPage(1);
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
                    	id: "PipelineHistoryQueryInfoDataPanel_Id",
                    	layout: 'fit',
                    	html:'<div class="PipelineHistoryQueryInfoDataTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="PipelineHistoryQueryInfoDataTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(pipelineDeviceHistoryQueryDataHandsontableHelper!=null && pipelineDeviceHistoryQueryDataHandsontableHelper.hot!=undefined){
                            		var selectRow= Ext.getCmp("PipelineHistoryQueryInfoDeviceListSelectRow_Id").getValue();
                            		var gridPanel=Ext.getCmp("PipelineHistoryQueryListGridPanel_Id");
                            		if(isNotVal(gridPanel)){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			CreatePipelineDeviceHistoryQueryDataTable(selectedItem.data.wellName,0)
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
                            id: 'PipelineHistoryQuerySelectedCurve_Id',//选择的统计项的值
                            xtype: 'textfield',
                            value: '',
                            hidden: true
                        }],
                        html: '<div id="pipelineHistoryQueryCurveDiv_Id" style="width:100%;height:100%;"></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                if ($("#pipelineHistoryQueryCurveDiv_Id").highcharts() != undefined) {
                                    $("#pipelineHistoryQueryCurveDiv_Id").highcharts().setSize($("#pipelineHistoryQueryCurveDiv_Id").offsetWidth, $("#pipelineHistoryQueryCurveDiv_Id").offsetHeight, true);
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

function CreatePipelineDeviceHistoryQueryDataTable(recordId,deviceName,deviceType,isHis){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/historyQueryController/getDeviceHistoryDetailsData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			
			if(pipelineDeviceHistoryQueryDataHandsontableHelper==null || pipelineDeviceHistoryQueryDataHandsontableHelper.hot==undefined){
				pipelineDeviceHistoryQueryDataHandsontableHelper = PipelineDeviceHistoryQueryDataHandsontableHelper.createNew("PipelineHistoryQueryInfoDataTableInfoDiv_id");
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
				pipelineDeviceHistoryQueryDataHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				pipelineDeviceHistoryQueryDataHandsontableHelper.columns=Ext.JSON.decode(columns);
				pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo=result.CellInfo;
				if(result.totalRoot.length==0){
					pipelineDeviceHistoryQueryDataHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					pipelineDeviceHistoryQueryDataHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo=result.CellInfo;
				pipelineDeviceHistoryQueryDataHandsontableHelper.hot.loadData(result.totalRoot);
			}
			//添加单元格属性
			for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
				var row=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row;
				var col=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col;
				var column=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].column;
				var columnDataType=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnDataType;
				pipelineDeviceHistoryQueryDataHandsontableHelper.hot.setCellMeta(row,col,'columnDataType',columnDataType);
			}
			
			//绘制第一个数据型变量曲线
			for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
				if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].resolutionMode==2){
					Ext.getCmp("PipelineHistoryQuerySelectedCurve_Id").setValue(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
                	pipelineHistoryQueryCurve(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
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

var PipelineDeviceHistoryQueryDataHandsontableHelper = {
		createNew: function (divid) {
	        var pipelineDeviceHistoryQueryDataHandsontableHelper = {};
	        pipelineDeviceHistoryQueryDataHandsontableHelper.divid = divid;
	        pipelineDeviceHistoryQueryDataHandsontableHelper.validresult=true;//数据校验
	        pipelineDeviceHistoryQueryDataHandsontableHelper.colHeaders=[];
	        pipelineDeviceHistoryQueryDataHandsontableHelper.columns=[];
	        pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo=[];
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addFirstAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	        	var BackgroundColor='#'+AlarmShowStyle.FirstLevel.BackgroundColor;
	        	var Color='#'+AlarmShowStyle.FirstLevel.Color;
	        	var Opacity=AlarmShowStyle.FirstLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addSecondAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	        	var BackgroundColor='#'+AlarmShowStyle.SecondLevel.BackgroundColor;
	        	var Color='#'+AlarmShowStyle.SecondLevel.Color;
	        	var Opacity=AlarmShowStyle.SecondLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addThirdAlarmLevelColBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	        	var BackgroundColor='#'+AlarmShowStyle.ThirdLevel.BackgroundColor;
	        	var Color='#'+AlarmShowStyle.ThirdLevel.Color;
	        	var Opacity=AlarmShowStyle.ThirdLevel.Opacity;
	     		
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = BackgroundColor;   
	             td.style.color=Color;
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = '#DC2828';   
	             td.style.color='#FFFFFF';
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addSizeBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	        	td.style.fontWeight = 'bold';
		        td.style.fontSize = '20px';
		        td.style.fontFamily = 'SimSun';
		        td.style.height = '40px';
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pipelineDeviceHistoryQueryDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pipelineDeviceHistoryQueryDataHandsontableHelper.divid);
	        	pipelineDeviceHistoryQueryDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [30,20,30,20,30,20,30,20],
	                columns:pipelineDeviceHistoryQueryDataHandsontableHelper.columns,
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
	                        cellProperties.renderer = pipelineDeviceHistoryQueryDataHandsontableHelper.addSizeBg;
	                    }
	                    else if ((visualColIndex ==0 || visualColIndex ==2 || visualColIndex ==4 || visualColIndex ==6)&&visualRowIndex>0) {
							cellProperties.renderer = pipelineDeviceHistoryQueryDataHandsontableHelper.addBoldBg;
		                }
	                    
	                    for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
	                    	if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel>0){
	                    		var row2=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row;
		        				var col2=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col*2+1;
		        				if(visualRowIndex==row2 && visualColIndex==col2 ){
		        					if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==100){
		        						cellProperties.renderer = pipelineDeviceHistoryQueryDataHandsontableHelper.addFirstAlarmLevelColBg;
		        					}else if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==200){
		        						cellProperties.renderer = pipelineDeviceHistoryQueryDataHandsontableHelper.addSecondAlarmLevelColBg;
		        					}else if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==300){
		        						cellProperties.renderer = pipelineDeviceHistoryQueryDataHandsontableHelper.addThirdAlarmLevelColBg;
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
		                	
		                	var item=pipelineDeviceHistoryQueryDataHandsontableHelper.hot.getDataAtCell(relRow,relColumn);
		                	var selectecCell=pipelineDeviceHistoryQueryDataHandsontableHelper.hot.getCell(relRow,relColumn);
		                	var columnDataType='';
		                	var resolutionMode=0;
		                	for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
		        				if(relRow==pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row && relColumn==pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col*2){
		        					columnDataType=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnDataType;
		        					resolutionMode=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].resolutionMode;
		        					break;
		        				}
		        			}
		                	
		                	if(isNotVal(item)&&resolutionMode==2){
		                		Ext.getCmp("PipelineHistoryQuerySelectedCurve_Id").setValue(item);
			                	pipelineHistoryQueryCurve(item);
		                	}
	                	}
	                }
	        	});
	        }
	        return pipelineDeviceHistoryQueryDataHandsontableHelper;
	    }
};
function pipelineHistoryQueryCurve(item){
	var gridPanel=Ext.getCmp("PipelineHistoryQueryListGridPanel_Id")
	var deviceName="";
	
	var deviceCombValue=Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
	var startDate=Ext.getCmp('PipelineHistoryQueryStartDate_Id').rawValue;
    var endDate=Ext.getCmp('PipelineHistoryQueryEndDate_Id').rawValue;
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
			    initTimeAndDataCurveChartFn(ser, tickInterval, "pipelineHistoryQueryCurveDiv_Id", title, '', xTitle, yTitle, color,false);
			},
			failure:function(){
				Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
			},
			params: {
				deviceName:deviceName,
				item:item,
				startDate:startDate,
                endDate:endDate,
				deviceType:1
	        }
		});
	}
}
