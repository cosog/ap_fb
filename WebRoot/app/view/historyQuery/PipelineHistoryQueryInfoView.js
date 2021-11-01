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
                    fieldLabel: '井名',
                    id: "HistoryQueryPipelineDeviceListComb_Id",
                    labelWidth: 35,
                    width: 145,
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
                        		Ext.getCmp("PipelineHistoryQueryHisBtn_Id").show();
                            	Ext.getCmp("PipelineHistoryQueryAllBtn_Id").hide();
                        		
                        		Ext.getCmp("PipelineHistoryQueryStartDate_Id").hide();
                        		Ext.getCmp("PipelineHistoryQueryEndDate_Id").hide();
                        	}else{
                        		Ext.getCmp("PipelineHistoryQueryHisBtn_Id").hide();
                            	Ext.getCmp("PipelineHistoryQueryAllBtn_Id").show();
                        		
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
                    },{
                        id: 'PipelineHistoryQueryColumnStr_Id',
                        xtype: 'textfield',
                        value: '',
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
                    },'-', {
                        xtype: 'button',
                        text: cosog.string.exportExcel,
                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
                        	var deviceName=Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
                        	var startDate=Ext.getCmp('PipelineHistoryQueryStartDate_Id').rawValue;
                            var endDate=Ext.getCmp('PipelineHistoryQueryEndDate_Id').rawValue;
                       	 	var deviceType=1;
                       	 	var fileName='管设备历史数据';
                       	 	var title='管设备历史数据';
                       	 	var columnStr=Ext.getCmp("PipelineHistoryQueryColumnStr_Id").getValue();
                       	 	exportHistoryQueryDataExcel(orgId,deviceType,deviceName,startDate,endDate,fileName,title,columnStr);
                        }
                    }, '->', {
                    	xtype: 'button',
                        text:'查看历史',
                        tooltip:'点击按钮或者双击表格，查看历史数据',
                        id:'PipelineHistoryQueryHisBtn_Id',
                        pressed: true,
                        hidden: false,
                        handler: function (v, o) {
                        	var selectRow= Ext.getCmp("PipelineHistoryQueryInfoDeviceListSelectRow_Id").getValue();
                    		var gridPanel=Ext.getCmp("PipelineHistoryQueryListGridPanel_Id");
                    		if(isNotVal(gridPanel)){
                    			var selectedItem=gridPanel.getStore().getAt(selectRow);
                    			var deviceName=selectedItem.data.wellName;
                    			Ext.getCmp("PipelineHistoryQueryHisBtn_Id").hide();
                    			Ext.getCmp("PipelineHistoryQueryAllBtn_Id").show();
                    			
                    			Ext.getCmp("PipelineHistoryQueryStartDate_Id").show();
                            	Ext.getCmp("PipelineHistoryQueryEndDate_Id").show();
                            	
                            	Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setValue(deviceName);
                            	Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setRawValue(deviceName);
                            	
                            	Ext.getCmp('PipelineHistoryQueryStartDate_Id').setValue('');
                            	Ext.getCmp('PipelineHistoryQueryStartDate_Id').setRawValue('');
                            	
                            	Ext.getCmp('PipelineHistoryQueryEndDate_Id').setValue('');
                            	Ext.getCmp('PipelineHistoryQueryEndDate_Id').setRawValue('');
                            	
                            	
                            	Ext.getCmp("PipelineHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                    		}
                        }
                    },{
                    	xtype: 'button',
                        text:'返回概览',
                        id:'PipelineHistoryQueryAllBtn_Id',
                        pressed: true,
                        hidden: true,
                        handler: function (v, o) {
                        	Ext.getCmp("PipelineHistoryQueryHisBtn_Id").show();
                        	Ext.getCmp("PipelineHistoryQueryAllBtn_Id").hide();
                        	
                			Ext.getCmp("PipelineHistoryQueryStartDate_Id").hide();
                        	Ext.getCmp("PipelineHistoryQueryEndDate_Id").hide();
                        	
                        	Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setValue('');
                        	Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setRawValue('');
                        	
                        	Ext.getCmp('PipelineHistoryQueryStartDate_Id').setValue('');
                        	Ext.getCmp('PipelineHistoryQueryStartDate_Id').setRawValue('');
                        	
                        	Ext.getCmp('PipelineHistoryQueryEndDate_Id').setValue('');
                        	Ext.getCmp('PipelineHistoryQueryEndDate_Id').setRawValue('');
                        	
                        	
                        	Ext.getCmp("PipelineHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                        }
                    }]
                }, {
                	region: 'east',
                    width: '65%',
                    autoScroll: true,
                    split: true,
                    collapsible: true,
                    header: false,
                    layout: 'border',
                    border: false,
                    items: [{
                    	region: 'center',
                    	title: '历史数据',
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
				var colHeaders="['名称','变量','名称','变量','名称','变量']";
				var columns="[" 
						+"{data:'name1'}," 
						+"{data:'value1'}," 
						+"{data:'name2'},"
						+"{data:'value2'}," 
						+"{data:'name3'}," 
						+"{data:'value3'}"
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
//			for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
//				if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnDataType.indexOf('float')>=0){
//					Ext.getCmp("PipelineHistoryQuerySelectedCurve_Id").setValue(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
//                	pipelineHistoryQueryCurve(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
//                	break;
//				}
//			}
			
			//绘制第一个float型变量曲线columnDataType resolutionMode
			var item=Ext.getCmp("PipelineHistoryQuerySelectedCurve_Id").getValue();
			if(!isNotVal(item)){
				for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
					if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnDataType.indexOf('float')>=0){
						Ext.getCmp("PipelineHistoryQuerySelectedCurve_Id").setValue(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName);
	                	item=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName;
	                	break;
					}
				}
			}
			if(isNotVal(item)){
				pipelineHistoryQueryCurve(item);
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
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.addCellStyle = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            var AlarmShowStyle=Ext.JSON.decode(Ext.getCmp("AlarmShowStyle_Id").getValue()); 
	            if (row ==0) {
	            	Handsontable.renderers.TextRenderer.apply(this, arguments);
		        	td.style.fontWeight = 'bold';
			        td.style.fontSize = '20px';
			        td.style.fontFamily = 'SimSun';
			        td.style.height = '40px';
	            }
	            if (row%2==1&&row>0) {
	            	td.style.backgroundColor = '#f5f5f5';
                }
	            if (col%2==0) {
	            	td.style.fontWeight = 'bold';
                }else{
                	td.style.fontFamily = 'SimHei';
                }
	            for(var i=0;i<pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
                	if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel>0){
                		var row2=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row;
        				var col2=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col*2+1;
        				if(row==row2 && col==col2 ){
        					td.style.fontWeight = 'bold';
   			             	td.style.fontFamily = 'SimHei';
        					if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==100){
        						if(AlarmShowStyle.Details.FirstLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Details.FirstLevel.BackgroundColor,AlarmShowStyle.Details.FirstLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Details.FirstLevel.Color;
        					}else if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==200){
        						if(AlarmShowStyle.Details.SecondLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Details.SecondLevel.BackgroundColor,AlarmShowStyle.Details.SecondLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Details.SecondLevel.Color;
        					}else if(pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==300){
        						if(AlarmShowStyle.Details.ThirdLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Details.ThirdLevel.BackgroundColor,AlarmShowStyle.Details.ThirdLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Details.ThirdLevel.Color;
        					}
        				}
                	}
    			}
	        }
	        
	        pipelineDeviceHistoryQueryDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pipelineDeviceHistoryQueryDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pipelineDeviceHistoryQueryDataHandsontableHelper.divid);
	        	pipelineDeviceHistoryQueryDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
//	        		colWidths: [30,15,30,15,30,15,30,15],
	        		colWidths: [30,20,30,20,30,20],
	                columns:pipelineDeviceHistoryQueryDataHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                rowHeaders: false,//显示行头
	                colHeaders: false,
	                rowHeights: [40],
	                mergeCells: [{
                        "row": 0,
                        "col": 0,
                        "rowspan": 1,
                        "colspan": 6
                    }],
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                    cellProperties.renderer = pipelineDeviceHistoryQueryDataHandsontableHelper.addCellStyle;
	                    
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
		        					item=pipelineDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName;
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
			    tickInterval = Math.floor(data.length / 10) + 1;
			    if(tickInterval<100){
			    	tickInterval=100;
			    }
//			    tickInterval = data.length;//Math.floor(data.length / 2) + 1;
//			    if(tickInterval<10){
//			    	tickInterval=10;
//			    }
//			    tickInterval=1000;
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
			    initTimeAndDataCurveChartFn(ser, tickInterval, "pipelineHistoryQueryCurveDiv_Id", title, '', xTitle, yTitle, color,false,'%Y-%m-%d');
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
