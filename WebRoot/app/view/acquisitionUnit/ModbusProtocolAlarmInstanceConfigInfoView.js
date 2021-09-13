var protocolAlarmInstanceConfigItemsHandsontableHelper=null;
var protocolAlarmInstancePropertiesHandsontableHelper=null;
Ext.define('AP.view.acquisitionUnit.ModbusProtocolAlarmInstanceConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolAlarmInstanceConfigInfoView',
    layout: "fit",
    id:'modbusProtocolAlarmInstanceConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	Ext.apply(me, {
    		items: [{
            	tbar: [{
                    id: 'ModbusProtocolAlarmInstanceTreeSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },'->',{
        			xtype: 'button',
                    text: '添加实例',
                    iconCls: 'add',
                    handler: function (v, o) {
        				addModbusProtocolAlarmInstanceConfigData();
        			}
        		}, "-",{
                	xtype: 'button',
        			pressed: true,
        			text: cosog.string.save,
        			iconCls: 'save',
        			handler: function (v, o) {
        				SaveModbusProtocolAlarmInstanceConfigTreeData();
        			}
                }],
                layout: "border",
                items: [{
                	border: true,
                	region: 'west',
                	width:'25%',
                    layout: "border",
                    border: true,
                    header: false,
                    collapsible: true,
                    split: true,
                    collapseDirection: 'left',
                    hideMode:'offsets',
                    items: [{
                    	region: 'center',
                    	title:'实例列表',
//                    	autoScroll:true,
                        scrollable: true,
                    	id:"ModbusProtocolAlarmInstanceConfigPanel_Id"
                    },{
                    	region: 'south',
                    	height:'42%',
                    	title:'属性',
                    	collapsible: true,
                        split: true,
                    	layout: 'fit',
                        html:'<div class="ProtocolAlarmInstancePropertiesTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ProtocolAlarmInstancePropertiesTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
//                            	if(protocolAlarmInstancePropertiesHandsontableHelper!=null && protocolAlarmInstancePropertiesHandsontableHelper.hot!=undefined){
//                            		var selectRow= Ext.getCmp("ModbusProtocolAlarmInstanceTreeSelectRow_Id").getValue();
//                            		var gridPanel=Ext.getCmp("ModbusProtocolAlarmInstanceConfigTreeGridPanel_Id");
//                            		if(isNotVal(gridPanel)){
//                            			var selectedItem=gridPanel.getStore().getAt(gridPanel);
//                            			CreateProtocolAlarmInstancePropertiesInfoTable(selectedItem.data);
//                            		}
//                            	}
                            }
                        }
                    }]
                },{
                	border: true,
                	region: 'center',
                    title:'所含报警项',
                    id:"ModbusProtocolAlarmInstanceItemsTableInfoPanel_Id",
                    layout: 'fit',
                    html:'<div class="ModbusProtocolAlarmInstanceItemsTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAlarmInstanceItemsConfigTableInfoDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if(protocolAlarmInstancePropertiesHandsontableHelper!=null && protocolAlarmInstancePropertiesHandsontableHelper.hot!=undefined){
                        		var selectRow= Ext.getCmp("ModbusProtocolAlarmInstanceTreeSelectRow_Id").getValue();
                        		var gridPanel=Ext.getCmp("ModbusProtocolAlarmInstanceConfigTreeGridPanel_Id");
                        		if(isNotVal(gridPanel)){
                        			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            	    if(selectedItem.data.classes==0){
                            	    	if(isNotVal(selectedItem.data.children) && selectedItem.data.children.length>0){
                                			CreateProtocolAlarmInstanceItemsConfigInfoTable(selectedItem.data.children[0].text);
                                		}
                                	}else if(selectedItem.data.classes==1){
                                		CreateProtocolAlarmInstanceItemsConfigInfoTable(selectedItem.data.text);
                                	}
                        		}
                        	}
                        }
                    }
                }]
            }]
    	});
        this.callParent(arguments);
    }
});
function CreateProtocolAlarmInstancePropertiesInfoTable(data){
	var root=[];
	if(data.classes==1){
		var item1={};
		item1.id=1;
		item1.title='实例名称';
		item1.value=data.text;
		root.push(item1);
		
		var item2={};
		item2.id=2;
		item2.title='设备类型';
		item2.value=(data.deviceType==0?"泵设备":"管设备");
		root.push(item2);
		
		var item3={};
		item3.id=3;
		item3.title='排序序号';
		item3.value=data.sort;
		root.push(item3);
	}
	
	if(protocolAlarmInstancePropertiesHandsontableHelper==null || protocolAlarmInstancePropertiesHandsontableHelper.hot==undefined){
		protocolAlarmInstancePropertiesHandsontableHelper = ProtocolAlarmInstancePropertiesHandsontableHelper.createNew("ProtocolAlarmInstancePropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolAlarmInstancePropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolAlarmInstancePropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolAlarmInstancePropertiesHandsontableHelper.classes=data.classes;
		protocolAlarmInstancePropertiesHandsontableHelper.createTable(root);
	}else{
		protocolAlarmInstancePropertiesHandsontableHelper.classes=data.classes;
		protocolAlarmInstancePropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolAlarmInstancePropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAlarmInstancePropertiesHandsontableHelper = {};
	        protocolAlarmInstancePropertiesHandsontableHelper.hot = '';
	        protocolAlarmInstancePropertiesHandsontableHelper.classes =null;
	        protocolAlarmInstancePropertiesHandsontableHelper.divid = divid;
	        protocolAlarmInstancePropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolAlarmInstancePropertiesHandsontableHelper.colHeaders=[];
	        protocolAlarmInstancePropertiesHandsontableHelper.columns=[];
	        protocolAlarmInstancePropertiesHandsontableHelper.AllData=[];
	        
	        protocolAlarmInstancePropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAlarmInstancePropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAlarmInstancePropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAlarmInstancePropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAlarmInstancePropertiesHandsontableHelper.divid);
	        	protocolAlarmInstancePropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [2,5,5],
	                columns:protocolAlarmInstancePropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAlarmInstancePropertiesHandsontableHelper.colHeaders,//显示列头
	                columnSorting: true,//允许排序
	                sortIndicator: true,
	                manualColumnResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                    if (visualColIndex ==0 || visualColIndex ==1) {
							cellProperties.readOnly = true;
							cellProperties.renderer = protocolAlarmInstancePropertiesHandsontableHelper.addBoldBg;
		                }
	                    if(protocolAlarmInstancePropertiesHandsontableHelper.classes===1){
	                    	if (visualColIndex === 2 && visualRowIndex===1) {
		                    	this.type = 'dropdown';
		                    	this.source = ['泵设备','管设备'];
		                    	this.strict = true;
		                    	this.allowInvalid = false;
		                    }
	                    }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        protocolAlarmInstancePropertiesHandsontableHelper.saveData = function () {}
	        protocolAlarmInstancePropertiesHandsontableHelper.clearContainer = function () {
	        	protocolAlarmInstancePropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolAlarmInstancePropertiesHandsontableHelper;
	    }
};

function CreateProtocolAlarmInstanceItemsConfigInfoTable(instanceName){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getProtocolAlarmInstanceItemsConfigData',
		success:function(response) {
			Ext.getCmp("ModbusProtocolAlarmInstanceItemsTableInfoPanel_Id").setTitle(instanceName+"所含报警项");
			
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolAlarmInstanceConfigItemsHandsontableHelper==null || protocolAlarmInstanceConfigItemsHandsontableHelper.hot==undefined){
				protocolAlarmInstanceConfigItemsHandsontableHelper = ProtocolAlarmInstanceConfigItemsHandsontableHelper.createNew("ModbusProtocolAlarmInstanceItemsConfigTableInfoDiv_id");
				var colHeaders="['序号','名称','地址','上限','下限','回差','延时(s)','报警级别','报警使能']";
				var columns="[{data:'id'},{data:'title'},"
					 	+"{data:'addr'},"
						+"{data:'upperLimit'},"
						+"{data:'lowerLimit'}," 
						+"{data:'hystersis'}," 
						+"{data:'delay'}," 
						+"{data:'alarmLevel',type:'dropdown',strict:true,allowInvalid:false,source:['正常','一级报警','二级报警','三级报警']}," 
						+"{data:'alarmSign',type:'dropdown',strict:true,allowInvalid:false,source:['enable','disable']}" 
						+"]";
				protocolAlarmInstanceConfigItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolAlarmInstanceConfigItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolAlarmInstanceConfigItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmInstanceConfigItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolAlarmInstanceConfigItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmInstanceConfigItemsHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			instanceName:instanceName
        }
	});
};

var ProtocolAlarmInstanceConfigItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAlarmInstanceConfigItemsHandsontableHelper = {};
	        protocolAlarmInstanceConfigItemsHandsontableHelper.hot1 = '';
	        protocolAlarmInstanceConfigItemsHandsontableHelper.divid = divid;
	        protocolAlarmInstanceConfigItemsHandsontableHelper.validresult=true;//数据校验
	        protocolAlarmInstanceConfigItemsHandsontableHelper.colHeaders=[];
	        protocolAlarmInstanceConfigItemsHandsontableHelper.columns=[];
	        protocolAlarmInstanceConfigItemsHandsontableHelper.AllData=[];
	        
	        protocolAlarmInstanceConfigItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAlarmInstanceConfigItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAlarmInstanceConfigItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAlarmInstanceConfigItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAlarmInstanceConfigItemsHandsontableHelper.divid);
	        	protocolAlarmInstanceConfigItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [50,120,80,80,80,80,80,80,80],
	                columns:protocolAlarmInstanceConfigItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAlarmInstanceConfigItemsHandsontableHelper.colHeaders,//显示列头
	                columnSorting: true,//允许排序
	                sortIndicator: true,
	                manualColumnResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);

	                    cellProperties.readOnly = true;
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        return protocolAlarmInstanceConfigItemsHandsontableHelper;
	    }
};


function SaveModbusProtocolAlarmInstanceConfigTreeData(){
	var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ModbusProtocolAlarmInstanceTreeSelectRow_Id").getValue();
	if(ScadaDriverModbusConfigSelectRow!=''){
		var selectedItem=Ext.getCmp("ModbusProtocolAlarmInstanceConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
		var propertiesData=protocolAlarmInstancePropertiesHandsontableHelper.hot.getData();
		if(selectedItem.data.classes==1){//选中的是实例
			var saveData={};
			saveData.id=selectedItem.data.id;
			saveData.code=selectedItem.data.code;
			saveData.oldName=selectedItem.data.text;
			saveData.name=propertiesData[0][2];
			saveData.deviceType=(propertiesData[1][2]=="泵设备"?0:1);
			saveData.alarmGroupId=selectedItem.data.alarmGroupId;
			saveData.sort=propertiesData[2][2];
			SaveModbusProtocolAlarmInstanceData(saveData);
		}
	}
};

function SaveModbusProtocolAlarmInstanceData(saveData){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveProtocolAlarmInstanceData',
		success:function(response) {
			data=Ext.JSON.decode(response.responseText);
			if (data.success) {
				Ext.getCmp("ModbusProtocolAlarmInstanceConfigTreeGridPanel_Id").getStore().load();
            	Ext.MessageBox.alert("信息","保存成功");
            } else {
            	Ext.MessageBox.alert("信息","采集单元数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
		},
		params: {
			data: JSON.stringify(saveData),
        }
	});
}
