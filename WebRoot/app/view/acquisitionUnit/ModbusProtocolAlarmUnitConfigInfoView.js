var protocolConfigAlarmUnitPropertiesHandsontableHelper=null;
var protocolAlarmUnitConfigNumItemsHandsontableHelper=null;
var protocolAlarmUnitConfigSwitchItemsHandsontableHelper=null;
var protocolAlarmUnitConfigEnumItemsHandsontableHelper=null;
Ext.define('AP.view.acquisitionUnit.ModbusProtocolAlarmUnitConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolAlarmUnitConfigInfoView',
    layout: "fit",
    id:'modbusProtocolAlarmUnitConfigInfoViewId',
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
                },{
                    id: 'ModbusProtocolAlarmGroupEnumItemsSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },{
                    id: 'ModbusProtocolAlarmGroupSwitchItemsSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },'->',{
        			xtype: 'button',
                    text: '添加报警单元',
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
        				SaveModbusProtocolAlarmUnitConfigTreeData();
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
                    	title:'报警单元配置',
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
                            	if(protocolConfigAlarmUnitPropertiesHandsontableHelper!=null && protocolConfigAlarmUnitPropertiesHandsontableHelper.hot!=undefined){
                            		var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
                            		var gridPanel=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id");
                            		if(isNotVal(gridPanel)){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			CreateProtocolAlarmUnitConfigPropertiesInfoTable(selectedItem.data);
                            		}
                            	}
                            }
                        }
                    }]
                },{
                	border: true,
//                    flex: 4,
                	region: 'center',
                    title:'报警项配置',
                    xtype: 'tabpanel',
                    id:"ModbusProtocolAlarmGroupItemsConfigTabPanel_Id",
                    activeTab: 0,
                    border: false,
                    tabPosition: 'top',
                    items: [{
                    	title:'数据量',
                    	id:"ModbusProtocolAlarmGroupNumItemsConfigTableInfoPanel_Id",
                        layout: 'fit',
                        html:'<div class="ModbusProtocolAlarmGroupItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAlarmGroupItemsConfigTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(protocolAlarmUnitConfigNumItemsHandsontableHelper!=null && protocolAlarmUnitConfigNumItemsHandsontableHelper.hot!=undefined){
                            		var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
                            		var gridPanel=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id");
                            		if(isNotVal(gridPanel)){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			if(selectedItem.data.classes==0){
                                    		if(isNotVal(selectedItem.data.children) && selectedItem.data.children.length>0){
                                    			CreateProtocolAlarmUnitNumItemsConfigInfoTable(selectedItem.data.children[0].text,selectedItem.data.children[0].classes,selectedItem.data.children[0].code);
                                    		}
                                    	}else if(selectedItem.data.classes==1){
                                    		CreateProtocolAlarmUnitNumItemsConfigInfoTable(selectedItem.data.text,selectedItem.data.classes,selectedItem.data.code);
                                    	}else if(selectedItem.data.classes==2||selectedItem.data.classes==3){
                                    		CreateProtocolAlarmUnitNumItemsConfigInfoTable(selectedItem.data.protocol,selectedItem.data.classes,selectedItem.data.code);
                                    	}
                            		}
                            	}
                            }
                        }
                    },{
                    	title:'开关量',
                    	id:"ModbusProtocolAlarmGroupSwitchItemsConfigTableInfoPanel_Id",
                    	layout: "border",
                        border: true,
                        items:[{
                        	region: 'west',
                        	width:'25%',
                        	collapsible: true,
                            split: true,
                            id: 'ModbusProtocolAlarmGroupSwitchItemsPanel_Id',
                        	title:'开关量列表'
                        },{
                        	region: 'center',
                            title:'开关量报警项配置',
                            layout: 'fit',
                            html:'<div class="ModbusProtocolAlarmGroupSwitchItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAlarmGroupSwitchItemsConfigTableInfoDiv_id"></div></div>',
                            listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if(protocolAlarmUnitConfigSwitchItemsHandsontableHelper!=null && protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot!=undefined){
                                		var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
                                		var gridPanel=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id");
                                		var selectItemRow= Ext.getCmp("ModbusProtocolAlarmGroupSwitchItemsSelectRow_Id").getValue();
                                		var itemGridPanel=Ext.getCmp("ModbusProtocolAlarmGroupSwitchItemsGridPanel_Id");
                                		if(isNotVal(gridPanel)&&isNotVal(itemGridPanel)){
                                			var selectedGroup=gridPanel.getStore().getAt(selectRow);
                                			var selectedItem=itemGridPanel.getStore().getAt(selectItemRow);
                                			if(selectedGroup.data.classes==0){
                                    			if(isNotVal(selectedGroup.data.children) && selectedGroup.data.children.length>0){
                                    				CreateProtocolAlarmUnitSwitchItemsConfigInfoTable(selectedGroup.data.children[0].text,selectedGroup.data.children[0].classes,selectedGroup.data.children[0].code,selectedItem.data.addr);
                                    			}
                                    			
                                    		}else if(selectedGroup.data.classes==1){
                                    			CreateProtocolAlarmUnitSwitchItemsConfigInfoTable(selectedGroup.data.text,selectedGroup.data.classes,selectedGroup.data.code,selectedItem.data.addr);
                                        	}else if(selectedGroup.data.classes==2||selectedGroup.data.classes==3){
                                        		CreateProtocolAlarmUnitSwitchItemsConfigInfoTable(selectedGroup.data.protocol,selectedGroup.data.classes,selectedGroup.data.code,selectedItem.data.addr);
                                        	}
                                		}
                                	}
                                }
                            }
                        }]
                    },{
                    	title:'枚举量',
                    	id:"ModbusProtocolAlarmGroupEnumItemsConfigTableInfoPanel_Id",
                    	layout: "border",
                        border: true,
                        items:[{
                        	region: 'west',
                        	width:'25%',
                        	collapsible: true,
                            split: true,
                            id: 'ModbusProtocolAlarmGroupEnumItemsPanel_Id',
                        	title:'枚举量列表'
                        },{
                        	region: 'center',
                            title:'枚举量报警项配置',
                            layout: 'fit',
                            html:'<div class="ModbusProtocolAlarmGroupEnumItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAlarmGroupEnumItemsConfigTableInfoDiv_id"></div></div>',
                            listeners: {
                                resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                                	if(protocolAlarmUnitConfigEnumItemsHandsontableHelper!=null && protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot!=undefined){
                                		var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
                                		var gridPanel=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id");
                                		var selectItemRow= Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsSelectRow_Id").getValue();
                                		var itemGridPanel=Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsGridPanel_Id");
                                		if(isNotVal(gridPanel)&&isNotVal(itemGridPanel)){
                                			var selectedGroup=gridPanel.getStore().getAt(selectRow);
                                			var selectedItem=itemGridPanel.getStore().getAt(selectItemRow);
                                			if(selectedGroup.data.classes==0){
                                    			if(isNotVal(selectedGroup.data.children) && selectedGroup.data.children.length>0){
                                    				CreateProtocolAlarmUnitEnumItemsConfigInfoTable(selectedGroup.data.children[0].text,selectedGroup.data.children[0].classes,selectedGroup.data.children[0].code,selectedItem.data.addr);
                                    			}
                                    		}else if(selectedGroup.data.classes==1){
                                    			CreateProtocolAlarmUnitEnumItemsConfigInfoTable(selectedGroup.data.text,selectedGroup.data.classes,selectedGroup.data.code,selectedItem.data.addr);
                                        	}else if(selectedGroup.data.classes==2||selectedGroup.data.classes==3){
                                        		CreateProtocolAlarmUnitEnumItemsConfigInfoTable(selectedGroup.data.protocol,selectedGroup.data.classes,selectedGroup.data.code,selectedItem.data.addr);
                                        	}
                                		}
                                	}
                                }
                            }
                        }]
                    }],
                    listeners: {
                    	tabchange: function (tabPanel, newCard, oldCard, obj) {
                    		if(newCard.id=="ModbusProtocolAlarmGroupNumItemsConfigTableInfoPanel_Id"){
                    			var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
                    			var selectedItem=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id").getStore().getAt(selectRow);
                    			if(selectedItem.data.classes==0){
                            		if(isNotVal(selectedItem.data.children) && selectedItem.data.children.length>0){
                            			CreateProtocolAlarmUnitNumItemsConfigInfoTable(selectedItem.data.children[0].text,selectedItem.data.children[0].classes,selectedItem.data.children[0].code);
                            		}
                            	}else if(selectedItem.data.classes==1){
                            		CreateProtocolAlarmUnitNumItemsConfigInfoTable(selectedItem.data.text,selectedItem.data.classes,selectedItem.data.code);
                            	}else if(selectedItem.data.classes==2||selectedItem.data.classes==3){
                            		CreateProtocolAlarmUnitNumItemsConfigInfoTable(selectedItem.data.protocol,selectedItem.data.classes,selectedItem.data.code);
                            	}
                        	}else if(newCard.id=="ModbusProtocolAlarmGroupSwitchItemsConfigTableInfoPanel_Id"){
                        		var treePanel=Ext.getCmp("ModbusProtocolAlarmGroupSwitchItemsGridPanel_Id");
                        		if(isNotVal(treePanel)){
                        			treePanel.getStore().load();
                        		}else{
                        			Ext.create('AP.store.acquisitionUnit.ModbusProtocolAlarmUnitSwitchItemsStore');
                        		}
                        	}else if(newCard.id=="ModbusProtocolAlarmGroupEnumItemsConfigTableInfoPanel_Id"){
                        		var gridPanel=Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsGridPanel_Id");
                        		if(isNotVal(gridPanel)){
                        			gridPanel.getStore().load();
                        		}else{
                        			Ext.create('AP.store.acquisitionUnit.ModbusProtocolAlarmUnitEnumItemsStore');
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

function CreateProtocolAlarmUnitNumItemsConfigInfoTable(protocolName,classes,code){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getModbusProtocolNumAlarmItemsConfigData',
		success:function(response) {
//			Ext.getCmp("DriverItemsConfigTableInfoPanel_Id").setTitle(protocolName+"采控项配置");
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolAlarmUnitConfigNumItemsHandsontableHelper==null || protocolAlarmUnitConfigNumItemsHandsontableHelper.hot==undefined){
				protocolAlarmUnitConfigNumItemsHandsontableHelper = ProtocolAlarmUnitConfigNumItemsHandsontableHelper.createNew("ModbusProtocolAlarmGroupItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','名称','地址','上限','下限','回差','延时(s)','报警级别','报警使能']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'title'},"
					 	+"{data:'addr',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigNumItemsHandsontableHelper);}},"
						+"{data:'upperLimit',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigNumItemsHandsontableHelper);}},"
						+"{data:'lowerLimit',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigNumItemsHandsontableHelper);}}," 
						
						+"{data:'hystersis',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigNumItemsHandsontableHelper);}}," 
						+"{data:'delay',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigNumItemsHandsontableHelper);}}," 
						
						+"{data:'alarmLevel',type:'dropdown',strict:true,allowInvalid:false,source:['正常','一级报警','二级报警','三级报警']}," 
						+"{data:'alarmSign',type:'dropdown',strict:true,allowInvalid:false,source:['使能','失效']}" 
						+"]";
				protocolAlarmUnitConfigNumItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolAlarmUnitConfigNumItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolAlarmUnitConfigNumItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmUnitConfigNumItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.loadData(result.totalRoot);
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

var ProtocolAlarmUnitConfigNumItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAlarmUnitConfigNumItemsHandsontableHelper = {};
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.hot1 = '';
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.divid = divid;
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.validresult=true;//数据校验
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.colHeaders=[];
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.columns=[];
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.AllData=[];
	        
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAlarmUnitConfigNumItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAlarmUnitConfigNumItemsHandsontableHelper.divid);
	        	protocolAlarmUnitConfigNumItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [25,50,120,80,80,80,80,80,80,80],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolAlarmUnitConfigNumItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAlarmUnitConfigNumItemsHandsontableHelper.colHeaders,//显示列头
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
//							cellProperties.renderer = protocolAlarmUnitConfigNumItemsHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	var row1=protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.getDataAtRow(row);
//	                	if(row1[0]){
//	                		protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.setDataAtCell(row, 0, false);
//	                	}else{
//	                		protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.setDataAtCell(row, 0, true);
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
//	                    	 return protocolAlarmUnitConfigNumItemsHandsontableHelper.colHeaders[col]; 
//	                    } 
//	                 }
	        	});
	        }
	        //保存数据
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.saveData = function () {}
	        protocolAlarmUnitConfigNumItemsHandsontableHelper.clearContainer = function () {
	        	protocolAlarmUnitConfigNumItemsHandsontableHelper.AllData = [];
	        }
	        return protocolAlarmUnitConfigNumItemsHandsontableHelper;
	    }
};


function CreateProtocolAlarmUnitConfigPropertiesInfoTable(data){
	var root=[];
	if(data.classes==3){
		var item1={};
		item1.id=1;
		item1.title='单元名称';
		item1.value=data.text;
		root.push(item1);
		
		var item2={};
		item2.id=2;
		item2.title='备注';
		item2.value=data.remark;
		root.push(item2);
	}
	
	if(protocolConfigAlarmUnitPropertiesHandsontableHelper==null || protocolConfigAlarmUnitPropertiesHandsontableHelper.hot==undefined){
		protocolConfigAlarmUnitPropertiesHandsontableHelper = ProtocolConfigAlarmUnitPropertiesHandsontableHelper.createNew("ModbusProtocolAlarmGroupPropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolConfigAlarmUnitPropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolConfigAlarmUnitPropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolConfigAlarmUnitPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigAlarmUnitPropertiesHandsontableHelper.createTable(root);
	}else{
		protocolConfigAlarmUnitPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigAlarmUnitPropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolConfigAlarmUnitPropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolConfigAlarmUnitPropertiesHandsontableHelper = {};
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.hot = '';
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.classes =null;
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.divid = divid;
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.colHeaders=[];
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.columns=[];
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.AllData=[];
	        
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolConfigAlarmUnitPropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolConfigAlarmUnitPropertiesHandsontableHelper.divid);
	        	protocolConfigAlarmUnitPropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [2,5,5],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolConfigAlarmUnitPropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolConfigAlarmUnitPropertiesHandsontableHelper.colHeaders,//显示列头
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
							cellProperties.renderer = protocolConfigAlarmUnitPropertiesHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.saveData = function () {}
	        protocolConfigAlarmUnitPropertiesHandsontableHelper.clearContainer = function () {
	        	protocolConfigAlarmUnitPropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolConfigAlarmUnitPropertiesHandsontableHelper;
	    }
};

function CreateProtocolAlarmUnitEnumItemsConfigInfoTable(protocolName,classes,groupCode,itemAddr){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getModbusProtocolEnumAlarmItemsConfigData',
		success:function(response) {
//			Ext.getCmp("DriverItemsConfigTableInfoPanel_Id").setTitle(protocolName+"采控项配置");
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolAlarmUnitConfigEnumItemsHandsontableHelper==null || protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot==undefined){
				protocolAlarmUnitConfigEnumItemsHandsontableHelper = ProtocolAlarmUnitConfigEnumItemsHandsontableHelper.createNew("ModbusProtocolAlarmGroupEnumItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','值','含义','延时(s)','报警级别','报警使能']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'}," 
					+"{data:'value',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigEnumItemsHandsontableHelper);}}," 
					+"{data:'meaning'},"
					+"{data:'delay',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigEnumItemsHandsontableHelper);}}," 
					+"{data:'alarmLevel',type:'dropdown',strict:true,allowInvalid:false,source:['正常','一级报警','二级报警','三级报警']}," 
					+"{data:'alarmSign',type:'dropdown',strict:true,allowInvalid:false,source:['使能','失效']}" 
					+"]";
				protocolAlarmUnitConfigEnumItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolAlarmUnitConfigEnumItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolAlarmUnitConfigEnumItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmUnitConfigEnumItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			protocolName:protocolName,
			classes:classes,
			groupCode:groupCode,
			itemAddr:itemAddr,
			itemResolutionMode:1
        }
	});
};

var ProtocolAlarmUnitConfigEnumItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAlarmUnitConfigEnumItemsHandsontableHelper = {};
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot1 = '';
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.divid = divid;
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.validresult=true;//数据校验
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.colHeaders=[];
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.columns=[];
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.AllData=[];
	        
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAlarmUnitConfigEnumItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAlarmUnitConfigEnumItemsHandsontableHelper.divid);
	        	protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [25,50,50,120,80,80,80],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolAlarmUnitConfigEnumItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAlarmUnitConfigEnumItemsHandsontableHelper.colHeaders,//显示列头
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
//							cellProperties.renderer = protocolAlarmUnitConfigEnumItemsHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	var row1=protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.getDataAtRow(row);
//	                	if(row1[0]){
//	                		protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.setDataAtCell(row, 0, false);
//	                	}else{
//	                		protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.setDataAtCell(row, 0, true);
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
//	                    	 return protocolAlarmUnitConfigEnumItemsHandsontableHelper.colHeaders[col]; 
//	                    } 
//	                 }
	        	});
	        }
	        //保存数据
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.saveData = function () {}
	        protocolAlarmUnitConfigEnumItemsHandsontableHelper.clearContainer = function () {
	        	protocolAlarmUnitConfigEnumItemsHandsontableHelper.AllData = [];
	        }
	        return protocolAlarmUnitConfigEnumItemsHandsontableHelper;
	    }
};

function CreateProtocolAlarmUnitSwitchItemsConfigInfoTable(protocolName,classes,groupCode,itemAddr){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getModbusProtocolEnumAlarmItemsConfigData',
		success:function(response) {
//			Ext.getCmp("DriverItemsConfigTableInfoPanel_Id").setTitle(protocolName+"采控项配置");
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolAlarmUnitConfigSwitchItemsHandsontableHelper==null || protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot==undefined){
				protocolAlarmUnitConfigSwitchItemsHandsontableHelper = ProtocolAlarmUnitConfigSwitchItemsHandsontableHelper.createNew("ModbusProtocolAlarmGroupSwitchItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','位','含义','触发状态','延时(s)','报警级别','报警使能']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'}," 
					+"{data:'bitIndex',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigSwitchItemsHandsontableHelper);}}," 
					+"{data:'meaning'},"
					+"{data:'value',type:'dropdown',strict:true,allowInvalid:false,source:['开','关']},"
					+"{data:'delay',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAlarmUnitConfigSwitchItemsHandsontableHelper);}}," 
					+"{data:'alarmLevel',type:'dropdown',strict:true,allowInvalid:false,source:['正常','一级报警','二级报警','三级报警']}," 
					+"{data:'alarmSign',type:'dropdown',strict:true,allowInvalid:false,source:['使能','失效']}" 
					+"]";
				protocolAlarmUnitConfigSwitchItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolAlarmUnitConfigSwitchItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolAlarmUnitConfigSwitchItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmUnitConfigSwitchItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			protocolName:protocolName,
			classes:classes,
			groupCode:groupCode,
			itemAddr:itemAddr,
			itemResolutionMode:0
        }
	});
};

var ProtocolAlarmUnitConfigSwitchItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAlarmUnitConfigSwitchItemsHandsontableHelper = {};
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot1 = '';
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.divid = divid;
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.validresult=true;//数据校验
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.colHeaders=[];
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.columns=[];
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.AllData=[];
	        
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAlarmUnitConfigSwitchItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAlarmUnitConfigSwitchItemsHandsontableHelper.divid);
	        	protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [25,50,50,120,80,80,80],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolAlarmUnitConfigSwitchItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAlarmUnitConfigSwitchItemsHandsontableHelper.colHeaders,//显示列头
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
//							cellProperties.renderer = protocolAlarmUnitConfigSwitchItemsHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	var row1=protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.getDataAtRow(row);
//	                	if(row1[0]){
//	                		protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.setDataAtCell(row, 0, false);
//	                	}else{
//	                		protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.setDataAtCell(row, 0, true);
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
//	                    	 return protocolAlarmUnitConfigSwitchItemsHandsontableHelper.colHeaders[col]; 
//	                    } 
//	                 }
	        	});
	        }
	        //保存数据
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.saveData = function () {}
	        protocolAlarmUnitConfigSwitchItemsHandsontableHelper.clearContainer = function () {
	        	protocolAlarmUnitConfigSwitchItemsHandsontableHelper.AllData = [];
	        }
	        return protocolAlarmUnitConfigSwitchItemsHandsontableHelper;
	    }
};


function SaveModbusProtocolAlarmUnitConfigTreeData(){
	var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
	if(selectRow!=''){
		var selectedItem=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id").getStore().getAt(selectRow);
		var propertiesData=protocolConfigAlarmUnitPropertiesHandsontableHelper.hot.getData();
		var alarmItemsData = protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.getData();
		if(selectedItem.data.classes==3){//选中的是报警单元
			var saveData={};
			saveData.id=selectedItem.data.id;
			saveData.groupCode=selectedItem.data.code;
			saveData.oldGroupName=selectedItem.data.text;
			saveData.protocol=selectedItem.data.protocol;
			saveData.groupName=propertiesData[0][2];
			saveData.remark=propertiesData[1][2];
			var activeId = Ext.getCmp("ModbusProtocolAlarmGroupItemsConfigTabPanel_Id").getActiveTab().id;
			if(activeId=="ModbusProtocolAlarmGroupNumItemsConfigTableInfoPanel_Id"){
				saveData.resolutionMode=2;
				alarmItemsData = protocolAlarmUnitConfigNumItemsHandsontableHelper.hot.getData();
        	}else if(activeId=="ModbusProtocolAlarmGroupSwitchItemsConfigTableInfoPanel_Id"){
        		saveData.resolutionMode=0;
        		alarmItemsData = protocolAlarmUnitConfigSwitchItemsHandsontableHelper.hot.getData();
        	}else if(activeId=="ModbusProtocolAlarmGroupEnumItemsConfigTableInfoPanel_Id"){
        		saveData.resolutionMode=1;
        		alarmItemsData = protocolAlarmUnitConfigEnumItemsHandsontableHelper.hot.getData();
        	}
			saveData.alarmItems=[];
			Ext.Array.each(alarmItemsData, function (name, index, countriesItSelf) {
				var checked=alarmItemsData[index][0];
				if(checked){
					var item={};
					if(saveData.resolutionMode==2){//数据量
						item.itemName=alarmItemsData[index][2];
						item.itemAddr=parseInt(alarmItemsData[index][3]);
						item.upperLimit=alarmItemsData[index][4];
						item.lowerLimit=alarmItemsData[index][5];
						item.hystersis=alarmItemsData[index][6];
						item.delay=alarmItemsData[index][7];
						item.alarmLevel=alarmItemsData[index][8];
						item.alarmSign=alarmItemsData[index][9];
					}else if(saveData.resolutionMode==0){//开关量
						var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupSwitchItemsSelectRow_Id").getValue();
						var selectedItem=Ext.getCmp("ModbusProtocolAlarmGroupSwitchItemsGridPanel_Id").getStore().getAt(selectRow);
						item.bitIndex=alarmItemsData[index][2];
						item.itemName=selectedItem.data.title;
						item.itemAddr=selectedItem.data.addr;
						if(alarmItemsData[index][4]=='开'){
							item.value=1;
						}if(alarmItemsData[index][4]=='关'){
							item.value=0;
						}
						item.delay=alarmItemsData[index][5];
						item.alarmLevel=alarmItemsData[index][6];
						item.alarmSign=alarmItemsData[index][7];
					}else if(saveData.resolutionMode==1){//枚举量
						
						var selectRow= Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsSelectRow_Id").getValue();
						var selectedItem=Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsGridPanel_Id").getStore().getAt(selectRow);
						item.itemName=selectedItem.data.title;
						item.itemAddr=selectedItem.data.addr;
						item.value=alarmItemsData[index][2];
						item.delay=alarmItemsData[index][4];
						item.alarmLevel=alarmItemsData[index][5];
						item.alarmSign=alarmItemsData[index][6];
					}
					saveData.alarmItems.push(item);
				}
			});
			SaveModbusProtocolAlarmUnitConfigData(saveData);
		}
	}
};

function SaveModbusProtocolAlarmUnitConfigData(saveData){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveModbusProtocolAlarmGroupData',
		success:function(response) {
			data=Ext.JSON.decode(response.responseText);
			if (data.success) {
				Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id").getStore().load();
            	Ext.MessageBox.alert("信息","保存成功");
            } else {
            	Ext.MessageBox.alert("信息","采控单元数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
		},
		params: {
			data: JSON.stringify(saveData),
        }
	});
};

function createModbusProtocolAddrMappingEnumOrSwitchItemsColumn(columnInfo) {
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
            myColumns += ",xtype: 'rownumberer',sortable : false,locked:false";
        }else {
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
