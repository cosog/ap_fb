var protocolAcqGroupConfigItemsHandsontableHelper=null;
var protocolConfigAcqGroupPropertiesHandsontableHelper=null;
Ext.define('AP.view.acquisitionUnit.ModbusProtocolAcqGroupConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolAcqGroupConfigInfoView',
    layout: "fit",
    id:'modbusProtocolAcqGroupConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	Ext.apply(me, {
    		items: [{
            	tbar: [{
                    id: 'ModbusProtocolAcqGroupConfigSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },'->',{
        			xtype: 'button',
                    text: '添加采集单元',
                    iconCls: 'add',
                    handler: function (v, o) {
                    	addAcquisitionUnitInfo();
        			}
        		},"-",{
        			xtype: 'button',
                    text: '添加采集组',
                    iconCls: 'add',
                    handler: function (v, o) {
                    	addAcquisitionGroupInfo();
        			}
        		},"-",{
                	xtype: 'button',
        			pressed: true,
        			text: cosog.string.save,
        			iconCls: 'save',
        			handler: function (v, o) {
        				SaveModbusProtocolAcqGroupConfigTreeData();
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
                    	title:'采控组配置',
//                    	autoScroll:true,
                        scrollable: true,
                    	id:"ModbusProtocolAcqGroupConfigPanel_Id"
                    },{
                    	region: 'south',
                    	height:'42%',
                    	title:'属性',
                    	collapsible: true,
                        split: true,
                    	layout: 'fit',
                        html:'<div class="ModbusProtocolAcqGroupPropertiesTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAcqGroupPropertiesTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(protocolConfigAcqGroupPropertiesHandsontableHelper!=null && protocolConfigAcqGroupPropertiesHandsontableHelper.hot!=undefined){
                            		var selectRow= Ext.getCmp("ModbusProtocolAcqGroupConfigSelectRow_Id").getValue();
                            		var gridPanel=Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id");
                            		if(isNotVal(gridPanel)){
                            			var selectedItem=gridPanel.getStore().getAt(selectRow);
                            			CreateProtocolAcqGroupConfigPropertiesInfoTable(selectedItem.data);
                            		}
                            	}
                            }
                        }
                    }]
                },{
                	border: true,
//                    flex: 4,
                	region: 'center',
                    title:'采控项配置',
                    id:"ModbusProtocolAcqGroupItemsConfigTableInfoPanel_Id",
                    layout: 'fit',
                    html:'<div class="ModbusProtocolAcqGroupItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ModbusProtocolAcqGroupItemsConfigTableInfoDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if(protocolAcqGroupConfigItemsHandsontableHelper!=null && protocolAcqGroupConfigItemsHandsontableHelper.hot!=undefined){
                        		var selectRow= Ext.getCmp("ModbusProtocolAcqGroupConfigSelectRow_Id").getValue();
                        		var gridPanel=Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id");
                        		if(isNotVal(gridPanel)){
                        			var selectedItem=gridPanel.getStore().getAt(selectRow);
                        			if(selectedItem.data.classes==0){
                                		if(isNotVal(selectedItem.data.children) && selectedItem.data.children.length>0){
                                			CreateProtocolAcqGroupItemsConfigInfoTable(selectedItem.data.children[0].text,selectedItem.data.children[0].classes,selectedItem.data.children[0].code);
                                		}
                                	}else if(selectedItem.data.classes==1){
                                		CreateProtocolAcqGroupItemsConfigInfoTable(selectedItem.data.text,selectedItem.data.classes,selectedItem.data.code);
                                	}else if(selectedItem.data.classes==2||selectedItem.data.classes==3){
                                		CreateProtocolAcqGroupItemsConfigInfoTable(selectedItem.data.protocol,selectedItem.data.classes,selectedItem.data.code);
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

function CreateProtocolAcqGroupItemsConfigInfoTable(protocolName,classes,code){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getProtocolItemsConfigData',
		success:function(response) {
//			Ext.getCmp("DriverItemsConfigTableInfoPanel_Id").setTitle(protocolName+"采控项配置");
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolAcqGroupConfigItemsHandsontableHelper==null || protocolAcqGroupConfigItemsHandsontableHelper.hot==undefined){
				protocolAcqGroupConfigItemsHandsontableHelper = ProtocolAcqGroupConfigItemsHandsontableHelper.createNew("ModbusProtocolAcqGroupItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','名称','地址','数量','存储数据类型','接口数据类型','读写类型','单位','换算比例','采集模式']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'title'},"
					 	+"{data:'addr',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAcqGroupConfigItemsHandsontableHelper);}},"
						+"{data:'quantity',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAcqGroupConfigItemsHandsontableHelper);}}," 
						+"{data:'storeDataType',type:'dropdown',strict:true,allowInvalid:false,source:['byte','int16','uint16','float32','bcd']}," 
						+"{data:'IFDataType',type:'dropdown',strict:true,allowInvalid:false,source:['bool','int','float32','float64','string']}," 
						+"{data:'RWType',type:'dropdown',strict:true,allowInvalid:false,source:['只读', '读写']}," 
						+"{data:'unit'}," 
						+"{data:'ratio',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolAcqGroupConfigItemsHandsontableHelper);}}," 
						+"{data:'acqMode',type:'dropdown',strict:true,allowInvalid:false,source:['主动上传', '被动响应']}" 
						+"]";
				protocolAcqGroupConfigItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolAcqGroupConfigItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolAcqGroupConfigItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAcqGroupConfigItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolAcqGroupConfigItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolAcqGroupConfigItemsHandsontableHelper.hot.loadData(result.totalRoot);
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

var ProtocolAcqGroupConfigItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolAcqGroupConfigItemsHandsontableHelper = {};
	        protocolAcqGroupConfigItemsHandsontableHelper.hot1 = '';
	        protocolAcqGroupConfigItemsHandsontableHelper.divid = divid;
	        protocolAcqGroupConfigItemsHandsontableHelper.validresult=true;//数据校验
	        protocolAcqGroupConfigItemsHandsontableHelper.colHeaders=[];
	        protocolAcqGroupConfigItemsHandsontableHelper.columns=[];
	        protocolAcqGroupConfigItemsHandsontableHelper.AllData=[];
	        
	        protocolAcqGroupConfigItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolAcqGroupConfigItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolAcqGroupConfigItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolAcqGroupConfigItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolAcqGroupConfigItemsHandsontableHelper.divid);
	        	protocolAcqGroupConfigItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [25,50,120,80,80,80,80,80,80,80,80],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolAcqGroupConfigItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolAcqGroupConfigItemsHandsontableHelper.colHeaders,//显示列头
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
	                    if (visualColIndex >0) {
							cellProperties.readOnly = true;
//							cellProperties.renderer = protocolAcqGroupConfigItemsHandsontableHelper.addBoldBg;
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	var row1=protocolAcqGroupConfigItemsHandsontableHelper.hot.getDataAtRow(row);
//	                	if(row1[0]){
//	                		protocolAcqGroupConfigItemsHandsontableHelper.hot.setDataAtCell(row, 0, false);
//	                	}else{
//	                		protocolAcqGroupConfigItemsHandsontableHelper.hot.setDataAtCell(row, 0, true);
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
//	                    	 return protocolAcqGroupConfigItemsHandsontableHelper.colHeaders[col]; 
//	                    } 
//	                 }
	        	});
	        }
	        //保存数据
	        protocolAcqGroupConfigItemsHandsontableHelper.saveData = function () {}
	        protocolAcqGroupConfigItemsHandsontableHelper.clearContainer = function () {
	        	protocolAcqGroupConfigItemsHandsontableHelper.AllData = [];
	        }
	        return protocolAcqGroupConfigItemsHandsontableHelper;
	    }
};


function CreateProtocolAcqGroupConfigPropertiesInfoTable(data){
	var root=[];
	if(data.classes==2){
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
	}else if(data.classes==3){
		var item1={};
		item1.id=1;
		item1.title='组名称';
		item1.value=data.text;
		root.push(item1);
		
//		var item2={};
//		item2.id=2;
//		item2.title='采集周期(s)';
//		item2.value=data.acq_cycle;
//		root.push(item2);
		
		var item3={};
		item3.id=3;
		item3.title='保存周期(s)';
		item3.value=data.save_cycle;
		root.push(item3);
		
		var item4={};
		item4.id=4;
		item4.title='备注';
		item4.value=data.remark;
		root.push(item4);
	}
	
	if(protocolConfigAcqGroupPropertiesHandsontableHelper==null || protocolConfigAcqGroupPropertiesHandsontableHelper.hot==undefined){
		protocolConfigAcqGroupPropertiesHandsontableHelper = ProtocolConfigAcqGroupPropertiesHandsontableHelper.createNew("ModbusProtocolAcqGroupPropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolConfigAcqGroupPropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolConfigAcqGroupPropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolConfigAcqGroupPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigAcqGroupPropertiesHandsontableHelper.createTable(root);
	}else{
		protocolConfigAcqGroupPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigAcqGroupPropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolConfigAcqGroupPropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolConfigAcqGroupPropertiesHandsontableHelper = {};
	        protocolConfigAcqGroupPropertiesHandsontableHelper.hot = '';
	        protocolConfigAcqGroupPropertiesHandsontableHelper.classes =null;
	        protocolConfigAcqGroupPropertiesHandsontableHelper.divid = divid;
	        protocolConfigAcqGroupPropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolConfigAcqGroupPropertiesHandsontableHelper.colHeaders=[];
	        protocolConfigAcqGroupPropertiesHandsontableHelper.columns=[];
	        protocolConfigAcqGroupPropertiesHandsontableHelper.AllData=[];
	        
	        protocolConfigAcqGroupPropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolConfigAcqGroupPropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolConfigAcqGroupPropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolConfigAcqGroupPropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolConfigAcqGroupPropertiesHandsontableHelper.divid);
	        	protocolConfigAcqGroupPropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [2,5,5],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolConfigAcqGroupPropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolConfigAcqGroupPropertiesHandsontableHelper.colHeaders,//显示列头
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
							cellProperties.renderer = protocolConfigAcqGroupPropertiesHandsontableHelper.addBoldBg;
		                }
	                    if(protocolConfigAcqGroupPropertiesHandsontableHelper.classes===1){
	                    	if (visualColIndex === 2 && visualRowIndex===1) {
		                    	this.type = 'dropdown';
		                    	this.source = ['泵设备','管设备'];
		                    	this.strict = true;
		                    	this.allowInvalid = false;
		                    }
//	                    	if (visualColIndex === 2 && visualRowIndex===2) {
//		                    	this.type = 'dropdown';
//		                    	this.source = ['modbus-tcp','modbus-rtu'];
//		                    	this.strict = true;
//		                    	this.allowInvalid = false;
//		                    }
	                    }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        protocolConfigAcqGroupPropertiesHandsontableHelper.saveData = function () {}
	        protocolConfigAcqGroupPropertiesHandsontableHelper.clearContainer = function () {
	        	protocolConfigAcqGroupPropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolConfigAcqGroupPropertiesHandsontableHelper;
	    }
};


function SaveModbusProtocolAcqGroupConfigTreeData(){
	var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ModbusProtocolAcqGroupConfigSelectRow_Id").getValue();
	if(ScadaDriverModbusConfigSelectRow!=''){
		var selectedItem=Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
		var propertiesData=protocolConfigAcqGroupPropertiesHandsontableHelper.hot.getData();
		var protocolProperties={};
		if(selectedItem.data.classes==2){//选中的是采集单元
			protocolProperties.classes=selectedItem.data.classes;
			protocolProperties.id=selectedItem.data.id;
			protocolProperties.unitCode=selectedItem.data.code;
			protocolProperties.unitName=propertiesData[0][2];
			protocolProperties.remark=propertiesData[1][2];
		}else if(selectedItem.data.classes==3){//选中的是采集单元组
			protocolProperties.classes=selectedItem.data.classes;
			protocolProperties.id=selectedItem.data.id;
			protocolProperties.groupCode=selectedItem.data.code;
			protocolProperties.groupName=propertiesData[0][2];
			protocolProperties.acqCycle=300;
			protocolProperties.saveCycle=propertiesData[1][2];
			protocolProperties.remark=propertiesData[2][2];
		}
		if(selectedItem.data.classes==2){//保存采集单元
			var acqUnitSaveData={};
			acqUnitSaveData.updatelist=[];
			acqUnitSaveData.updatelist.push(protocolProperties);
			saveAcquisitionUnitConfigData(acqUnitSaveData,selectedItem.data.protocol);
		}
		
		if(selectedItem.data.classes==3){//选中的是采集单元组
			var acqGroupSaveData={};
			acqGroupSaveData.updatelist=[];
			acqGroupSaveData.updatelist.push(protocolProperties);
			
			saveAcquisitionGroupConfigData(acqGroupSaveData,selectedItem.data.protocol,selectedItem.parentNode.data.id);
			//给采集组授予采集项
			grantAcquisitionItemsPermission();
		}
		
	}
};

function saveModbusProtocolConfigData(configInfo){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveModbusProtocolConfigData',
		success:function(response) {
			var data=Ext.JSON.decode(response.responseText);
			protocolAcqGroupConfigItemsHandsontableHelper.clearContainer();
			if (data.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id").getStore().load();
            } else {
            	Ext.MessageBox.alert("信息","数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
		},
		params: {
			data:JSON.stringify(configInfo)
        }
	});
}

function saveAcquisitionUnitConfigData(acqUnitSaveData,protocol){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveAcquisitionUnitHandsontableData',
		success:function(response) {
			rdata=Ext.JSON.decode(response.responseText);
			if (rdata.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id").getStore().load();
            } else {
            	Ext.MessageBox.alert("信息","采集单元数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
            acquisitionUnitConfigHandsontableHelper.clearContainer();
		},
		params: {
        	data: JSON.stringify(acqUnitSaveData),
        	protocol: protocol
        }
	});
}

function saveAcquisitionGroupConfigData(acqGroupSaveData,protocol,unitId){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveAcquisitionGroupHandsontableData',
		success:function(response) {
			rdata=Ext.JSON.decode(response.responseText);
			if (rdata.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolAcqGroupConfigTreeGridPanel_Id").getStore().load();
            } else {
            	Ext.MessageBox.alert("信息","采集组数据保存失败");
            }
		},
		failure:function(){
			Ext.MessageBox.alert("信息","请求失败");
		},
		params: {
        	data: JSON.stringify(acqGroupSaveData),
        	protocol: protocol,
        	unitId: unitId
        }
	});
};
