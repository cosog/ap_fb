var pumpDeviceHistoryQueryDataHandsontableHelper=null;
Ext.define("AP.view.historyQuery.HistoryQueryDataDetailsWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.historyQueryDataDetailsWindow',
    layout: 'fit',
    border: false,
    hidden: false,
    collapsible: true,
    constrainHeader:true,//True表示为将window header约束在视图中显示， false表示为允许header在视图之外的地方显示（默认为false）
//    constrain: true,
    closable: 'sides',
    closeAction: 'destroy',
    maximizable: true,
    minimizable: true,
    width: 1000,
    minWidth: 1000,
    height: 600,
    draggable: true, // 是否可拖曳
    modal: true, // 是否为模态窗口
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
        	tbar:[{
                id: 'HistoryQueryDataDetailsWindowRecord_Id',
                xtype: 'textfield',
                value: -1,
                hidden: true
            },{
                id: 'HistoryQueryDataDetailsWindowDeviceName_Id',
                xtype: 'textfield',
                value: '',
                hidden: true
            }],
        	html: '<div id="HistoryQueryDataDetailsDiv_Id" style="width:100%;height:100%;"></div>',
            listeners: {
                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                    var recordId=Ext.getCmp("HistoryQueryDataDetailsWindowRecord_Id").getValue();
                    var deviceName=Ext.getCmp("HistoryQueryDataDetailsWindowDeviceName_Id").getValue();
                    CreatePumpDeviceHistoryQueryDataTable(recordId,deviceName);
                },
                beforeclose: function ( panel, eOpts) {
                	if(pumpDeviceHistoryQueryDataHandsontableHelper!=null){
    					if(pumpDeviceHistoryQueryDataHandsontableHelper.hot!=undefined){
    						pumpDeviceHistoryQueryDataHandsontableHelper.hot.destroy();
    					}
    					pumpDeviceHistoryQueryDataHandsontableHelper=null;
    				}
                },
                minimize: function (win, opts) {
                    win.collapse();
                }
            }
        });
        me.callParent(arguments);
    }
});


function CreatePumpDeviceHistoryQueryDataTable(recordId,deviceName){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/historyQueryController/getDeviceHistoryDetailsData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			
			if(pumpDeviceHistoryQueryDataHandsontableHelper==null || pumpDeviceHistoryQueryDataHandsontableHelper.hot==undefined){
				pumpDeviceHistoryQueryDataHandsontableHelper = PumpDeviceHistoryQueryDataHandsontableHelper.createNew("HistoryQueryDataDetailsDiv_Id");
				var colHeaders="['名称','变量','名称','变量','名称','变量']";
				var columns="[" 
						+"{data:'name1'}," 
						+"{data:'value1'}," 
						+"{data:'name2'},"
						+"{data:'value2'}," 
						+"{data:'name3'}," 
						+"{data:'value3'}"
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
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			recordId: recordId,
			deviceType: 0,
			deviceName: deviceName
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
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.addCellStyle = function (instance, td, row, col, prop, value, cellProperties) {
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
	            for(var i=0;i<pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo.length;i++){
                	if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel>0){
                		var row2=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].row;
        				var col2=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].col*2+1;
        				if(row==row2 && col==col2 ){
        					td.style.fontWeight = 'bold';
   			             	td.style.fontFamily = 'SimHei';
        					if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==100){
        						if(AlarmShowStyle.Details.FirstLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Details.FirstLevel.BackgroundColor,AlarmShowStyle.Details.FirstLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Details.FirstLevel.Color;
        					}else if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==200){
        						if(AlarmShowStyle.Details.SecondLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Details.SecondLevel.BackgroundColor,AlarmShowStyle.Details.SecondLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Details.SecondLevel.Color;
        					}else if(pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].alarmLevel==300){
        						if(AlarmShowStyle.Details.ThirdLevel.Opacity!=0){
        							td.style.backgroundColor=color16ToRgba('#'+AlarmShowStyle.Details.ThirdLevel.BackgroundColor,AlarmShowStyle.Details.ThirdLevel.Opacity);
        						}
        						td.style.color='#'+AlarmShowStyle.Details.ThirdLevel.Color;
        					}
        				}
                	}
    			}
	        }
	        
	        pumpDeviceHistoryQueryDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pumpDeviceHistoryQueryDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pumpDeviceHistoryQueryDataHandsontableHelper.divid);
	        	pumpDeviceHistoryQueryDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
//	        		colWidths: [30,15,30,15,30,15,30,15],
	        		colWidths: [30,20,30,20,30,20],
	                columns:pumpDeviceHistoryQueryDataHandsontableHelper.columns,
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
	                    cellProperties.renderer = pumpDeviceHistoryQueryDataHandsontableHelper.addCellStyle;
	                    
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
		        					item=pumpDeviceHistoryQueryDataHandsontableHelper.CellInfo[i].columnName;
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