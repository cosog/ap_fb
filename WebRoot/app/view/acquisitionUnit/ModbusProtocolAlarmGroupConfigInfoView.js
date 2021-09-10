var protocolAlarmGroupConfigItemsHandsontableHelper=null;
var protocolConfigAlarmGroupPropertiesHandsontableHelper=null;
Ext.define('AP.view.acquisitionUnit.ModbusProtocolAlarmGroupConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolAlarmGroupConfigInfoView',
    layout: "fit",
    id:'modbusProtocolAlarmGroupConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	Ext.apply(me, {
    		items: [{
            	tbar: [{
                    id: 'ModbusProtocolAlarmGroupConfigSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },'->',{
        			xtype: 'button',
                    text: '添加报警组',
                    iconCls: 'add',
                    handler: function (v, o) {
                    	addAlarmGroupInfo();
        			}
        		},"-",{
                	xtype: 'button',
        			pressed: true,
        			text: cosog.string.save,
        			iconCls: 'save',
        			handler: function (v, o) {
        				SaveModbusProtocolAlarmGroupConfigTreeData();
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
                    	title:'报警组配置',
//                    	autoScroll:true,
                        scrollable: true,
                    	id:"ModbusProtocolAlarmGroupConfigPanel_Id"
                    },{
                    	region: 'south',
                    	height:'42%',
                    	title:'属性',
                    	collapsible: true,
                        split: true,
                    	layout: 'fit',
                        html:'<div class="ModbusProtocolAlarmGroupPropertiesTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAlarmGroupPropertiesTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	
                            }
                        }
                    }]
                },{
                	border: true,
//                    flex: 4,
                	region: 'center',
                    title:'报警项配置',
                    id:"ModbusProtocolAlarmGroupItemsConfigTableInfoPanel_Id",
                    layout: 'fit',
                    html:'<div class="ModbusProtocolAlarmGroupItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAlarmGroupItemsConfigTableInfoDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	
                        }
                    }
                }]
            }]
    	});
        this.callParent(arguments);
    }
});

function CreateProtocolAlarmGroupItemsConfigInfoTable(protocolName,classes,code){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getModbusProtocolAlarmItemsConfigData',
		success:function(response) {
//			Ext.getCmp("DriverItemsConfigTableInfoPanel_Id").setTitle(protocolName+"采控项配置");
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolAlarmGroupConfigItemsHandsontableHelper==null || protocolAlarmGroupConfigItemsHandsontableHelper.hot==undefined){
				protocolAlarmGroupConfigItemsHandsontableHelper = ProtocolAlarmGroupConfigItemsHandsontableHelper.createNew("ModbusProtocolAlarmGroupItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','名称','地址','上限','下限','回差','延时(s)','报警级别','报警使能']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'title'},"
					 	+"{data:'addr',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmGroupConfigItemsHandsontableHelper);}},"
						+"{data:'upperLimit',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmGroupConfigItemsHandsontableHelper);}},"
						+"{data:'lowerLimit',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmGroupConfigItemsHandsontableHelper);}}," 
						
						+"{data:'hystersis',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmGroupConfigItemsHandsontableHelper);}}," 
						+"{data:'delay',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmGroupConfigItemsHandsontableHelper);}}," 
						
						+"{data:'alarmLevel',type:'dropdown',strict:true,allowInvalid:false,source:['正常','一级报警','二级报警','三级报警']}," 
						+"{data:'alarmSign',type:'dropdown',strict:true,allowInvalid:false,source:['enable','disable']}" 
						+"]";
				protocolAlarmGroupConfigItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolAlarmGroupConfigItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolAlarmGroupConfigItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmGroupConfigItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolAlarmGroupConfigItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmGroupConfigItemsHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			protocolName:protocolName,
			classes:classes,
			code:code
        }
	});
};

var ProtocolAlarmGroupConfigItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAlarmGroupConfigItemsHandsontableHelper = {};
	        protocolAlarmGroupConfigItemsHandsontableHelper.hot1 = '';
	        protocolAlarmGroupConfigItemsHandsontableHelper.divid = divid;
	        protocolAlarmGroupConfigItemsHandsontableHelper.validresult=true;//数据校验
	        protocolAlarmGroupConfigItemsHandsontableHelper.colHeaders=[];
	        protocolAlarmGroupConfigItemsHandsontableHelper.columns=[];
	        protocolAlarmGroupConfigItemsHandsontableHelper.AllData=[];
	        
	        protocolAlarmGroupConfigItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAlarmGroupConfigItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAlarmGroupConfigItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAlarmGroupConfigItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAlarmGroupConfigItemsHandsontableHelper.divid);
	        	protocolAlarmGroupConfigItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [25,50,120,80,80,80,80,80,80,80],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolAlarmGroupConfigItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAlarmGroupConfigItemsHandsontableHelper.colHeaders,//显示列头
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
	                    if (visualColIndex >=1 && visualColIndex <=3) {
							cellProperties.readOnly = true;
//							cellProperties.renderer = protocolAlarmGroupConfigItemsHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	var row1=protocolAlarmGroupConfigItemsHandsontableHelper.hot.getDataAtRow(row);
//	                	if(row1[0]){
//	                		protocolAlarmGroupConfigItemsHandsontableHelper.hot.setDataAtCell(row, 0, false);
//	                	}else{
//	                		protocolAlarmGroupConfigItemsHandsontableHelper.hot.setDataAtCell(row, 0, true);
//	                	}
	                }
//	        		,colHeaders: function (col) { 
//	                    switch (col) { 
//	                     case 0: 
//	                      var txt = "<input type='checkbox' class='checker' "; 
//	                      txt += isChecked(data) ? 'checked="checked"' : ''; 
//	                      txt += "> 全选"; 
//	                      return txt; 
//	                     default:
//	                    	 return protocolAlarmGroupConfigItemsHandsontableHelper.colHeaders[col]; 
//	                    } 
//	                 }
	        	});
	        }
	        //保存数据
	        protocolAlarmGroupConfigItemsHandsontableHelper.saveData = function () {}
	        protocolAlarmGroupConfigItemsHandsontableHelper.clearContainer = function () {
	        	protocolAlarmGroupConfigItemsHandsontableHelper.AllData = [];
	        }
	        return protocolAlarmGroupConfigItemsHandsontableHelper;
	    }
};


function CreateProtocolAlarmGroupConfigPropertiesInfoTable(data){
	var root=[];
	if(data.classes==3){
		var item1={};
		item1.id=1;
		item1.title='组名称';
		item1.value=data.text;
		root.push(item1);
		
		var item2={};
		item2.id=4;
		item2.title='备注';
		item2.value=data.remark;
		root.push(item2);
	}
	
	if(protocolConfigAlarmGroupPropertiesHandsontableHelper==null || protocolConfigAlarmGroupPropertiesHandsontableHelper.hot==undefined){
		protocolConfigAlarmGroupPropertiesHandsontableHelper = ProtocolConfigAlarmGroupPropertiesHandsontableHelper.createNew("ModbusProtocolAlarmGroupPropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolConfigAlarmGroupPropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolConfigAlarmGroupPropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolConfigAlarmGroupPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigAlarmGroupPropertiesHandsontableHelper.createTable(root);
	}else{
		protocolConfigAlarmGroupPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigAlarmGroupPropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolConfigAlarmGroupPropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolConfigAlarmGroupPropertiesHandsontableHelper = {};
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.hot = '';
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.classes =null;
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.divid = divid;
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.colHeaders=[];
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.columns=[];
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.AllData=[];
	        
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolConfigAlarmGroupPropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolConfigAlarmGroupPropertiesHandsontableHelper.divid);
	        	protocolConfigAlarmGroupPropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [2,5,5],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolConfigAlarmGroupPropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolConfigAlarmGroupPropertiesHandsontableHelper.colHeaders,//显示列头
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
							cellProperties.renderer = protocolConfigAlarmGroupPropertiesHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.saveData = function () {}
	        protocolConfigAlarmGroupPropertiesHandsontableHelper.clearContainer = function () {
	        	protocolConfigAlarmGroupPropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolConfigAlarmGroupPropertiesHandsontableHelper;
	    }
};


function SaveModbusProtocolAlarmGroupConfigTreeData(){
	var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
	if(selectRow!=''){
		var selectedItem=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id").getStore().getAt(selectRow);
		var propertiesData=protocolConfigAlarmGroupPropertiesHandsontableHelper.hot.getData();
		var alarmItemsData = protocolAlarmGroupConfigItemsHandsontableHelper.hot.getData();
		if(selectedItem.data.classes==3){//选中的是报警组组
			var saveData={};
			saveData.id=selectedItem.data.id;
			saveData.groupCode=selectedItem.data.code;
			saveData.oldGroupName=selectedItem.data.text;
			saveData.protocol=selectedItem.data.protocol;
			saveData.groupName=propertiesData[0][2];
			saveData.remark=propertiesData[1][2];
			saveData.alarmItems=[];
			Ext.Array.each(alarmItemsData, function (name, index, countriesItSelf) {
				var checked=alarmItemsData[index][0];
				if(checked){
					var item={};
					item.itemName=alarmItemsData[index][2];
					item.itemAddr=parseInt(alarmItemsData[index][3]);
					item.upperLimit=alarmItemsData[index][4];
					item.lowerLimit=alarmItemsData[index][5];
					item.hystersis=alarmItemsData[index][6];
					item.delay=alarmItemsData[index][7];
					item.alarmLevel=alarmItemsData[index][8];
					item.alarmSign=alarmItemsData[index][9];
					saveData.alarmItems.push(item);
				}
			});
			SaveModbusProtocolAlarmGroupConfigData(saveData);
		}
	}
};

function SaveModbusProtocolAlarmGroupConfigData(saveData){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveModbusProtocolAlarmGroupData',
		success:function(response) {
			data=Ext.JSON.decode(response.responseText);
			if (data.success) {
				Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id").getStore().load();
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
