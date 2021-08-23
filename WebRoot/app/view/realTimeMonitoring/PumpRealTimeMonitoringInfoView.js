var pumpDeviceRealMonitorDataHandsontableHelper=null;
Ext.define("AP.view.realTimeMonitoring.PumpRealTimeMonitoringInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpRealTimeMonitoringInfoView',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        
        var pumpCurveTypeCombStore = new Ext.data.JsonStore({
        	pageSize:defaultWellComboxSize,
            fields: [{
                name: "boxkey",
                type: "string"
            }, {
                name: "boxval",
                type: "string"
            }],
            proxy: {
            	url: context + '/realTimeMonitoringController/loadCurveTypeComboxList',
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
                	var gridPanel=Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id")
                	var wellName="";
                	if(isNotVal(gridPanel)){
                		wellName=gridPanel.getSelectionModel().getSelection()[0].data.wellName;
                	}
                    var new_params = {
                    		wellName: wellName,
                    		deviceType: 0
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        var pumpCurveTypeComb = Ext.create(
                'Ext.form.field.ComboBox', {
                    fieldLabel: '曲线类型',
                    id: "pumpRealTimeMonitorCurveTypeComb_Id",
                    labelWidth: 70,
                    width: 200,
                    labelAlign: 'left',
                    queryMode: 'remote',
                    typeAhead: true,
                    store: pumpCurveTypeCombStore,
                    autoSelect: true,
                    editable: false,
                    triggerAction: 'all',
                    displayField: "boxval",
                    valueField: "boxkey",
                    pageSize:comboxPagingStatus,
                    minChars:0,
                    emptyText: cosog.string.all,
                    blankText: cosog.string.all,
                    listeners: {
                        expand: function (sm, selections) {
                            pumpCurveTypeComb.getStore().loadPage(1); // 加载井下拉框的store
                        },
                        select: function (combo, record, index) {
                            
                        }
                    }
                });
        
        
        Ext.applyIf(me, {
            items: [{
                border: false,
                layout: 'border',
                items: [{
                    region: 'west',
                    title:'设备列表',
                    id:'PumpRealTimeMonitoringInfoDeviceListPanel_Id',
                    width: '20%',
                    split: true,
                    collapsible: true,
                    border: false,
                    layout: 'fit',
                    autoScroll: true
                }, {
                    region: 'center',
                    layout: 'border',
                    border: false,
                    items: [{
                    	region: 'center',
                    	title: '实时数据',
                    	id: "PumpRealTimeMonitoringInfoDataPanel_Id",
                    	layout: 'fit',
                    	html:'<div class="PumpRealTimeMonitoringInfoDataTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="PumpRealTimeMonitoringInfoDataTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
//                            	if(protocolConfigPropertiesHandsontableHelper!=null && protocolConfigPropertiesHandsontableHelper.hot!=undefined){
//                            		var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ScadaProtocolModbusConfigSelectRow_Id").getValue();
//                            		
//                            		var ModbusProtocolConfigTreeGridPanel=Ext.getCmp("ModbusProtocolConfigTreeGridPanel_Id");
//                            		if(isNotVal(ModbusProtocolConfigTreeGridPanel)){
//                            			var selectedItem=ModbusProtocolConfigTreeGridPanel.getStore().getAt(ScadaDriverModbusConfigSelectRow);
//                                	    CreateProtocolConfigPropertiesInfoTable(selectedItem.data);
//                            		}
//                            	}
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
                        tbar:[pumpCurveTypeComb]
                    }]
                },{
                	region: 'east',
                	width: '15%',
                	xtype: 'tabpanel',
                	id:"PumpRealTimeMonitoringRightTabPanel",
            		activeTab: 0,
            		border: false,
            		tabPosition: 'top',
            		items: [{
            			title:'控制',
            			id: 'PumpRealTimeMonitoringRightControlPanel',
                        border: false,
                        layout: 'fit',
                        autoScroll: true,
                        scrollable: true
            		},{
            			title:'设备信息',
            			id: 'PumpRealTimeMonitoringRightDeviceInfoPanel',
                        border: false,
                        layout: 'fit',
                        autoScroll: true,
                        scrollable: true
            		}]
                }]
            }]
        });
        me.callParent(arguments);
    }
});

function CreatePumpDeviceRealMonitorDataTable(deviceName,deviceType){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/realTimeMonitoringController/getDeviceRealMonitorData',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(pumpDeviceRealMonitorDataHandsontableHelper==null || pumpDeviceRealMonitorDataHandsontableHelper.hot==undefined){
				pumpDeviceRealMonitorDataHandsontableHelper = PumpDeviceRealMonitorDataHandsontableHelper.createNew("PumpRealTimeMonitoringInfoDataTableInfoDiv_id");
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
				pumpDeviceRealMonitorDataHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				pumpDeviceRealMonitorDataHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					pumpDeviceRealMonitorDataHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					pumpDeviceRealMonitorDataHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				pumpDeviceRealMonitorDataHandsontableHelper.hot.loadData(result.totalRoot);
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

var PumpDeviceRealMonitorDataHandsontableHelper = {
		createNew: function (divid) {
	        var pumpDeviceRealMonitorDataHandsontableHelper = {};
	        pumpDeviceRealMonitorDataHandsontableHelper.divid = divid;
	        pumpDeviceRealMonitorDataHandsontableHelper.validresult=true;//数据校验
	        pumpDeviceRealMonitorDataHandsontableHelper.colHeaders=[];
	        pumpDeviceRealMonitorDataHandsontableHelper.columns=[];
	        
	        pumpDeviceRealMonitorDataHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        pumpDeviceRealMonitorDataHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        pumpDeviceRealMonitorDataHandsontableHelper.addSizeBg = function (instance, td, row, col, prop, value, cellProperties) {
	        	Handsontable.renderers.TextRenderer.apply(this, arguments);
	        	td.style.fontWeight = 'bold';
		        td.style.fontSize = '20px';
		        td.style.fontFamily = 'SimSun';
		        td.style.height = '40px';
	        }
	        
	        pumpDeviceRealMonitorDataHandsontableHelper.createTable = function (data) {
	        	$('#'+pumpDeviceRealMonitorDataHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pumpDeviceRealMonitorDataHandsontableHelper.divid);
	        	pumpDeviceRealMonitorDataHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [30,20,30,20,30,20,30,20],
	                columns:pumpDeviceRealMonitorDataHandsontableHelper.columns,
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
	                        cellProperties.renderer = pumpDeviceRealMonitorDataHandsontableHelper.addSizeBg;
	                    }else if ((visualColIndex ==0 || visualColIndex ==2 || visualColIndex ==4 || visualColIndex ==6)&&visualRowIndex>0) {
							cellProperties.renderer = pumpDeviceRealMonitorDataHandsontableHelper.addBoldBg;
		                }
	                    cellProperties.readOnly = true;
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	
	                }
	        	});
	        }
	        return pumpDeviceRealMonitorDataHandsontableHelper;
	    }
};