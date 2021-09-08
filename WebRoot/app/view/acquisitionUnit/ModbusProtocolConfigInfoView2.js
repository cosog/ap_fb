var protocolConfigItemsHandsontableHelper=null;
var protocolConfigPropertiesHandsontableHelper=null;
Ext.define('AP.view.acquisitionUnit.ModbusProtocolConfigInfoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.modbusProtocolConfigInfoView',
    layout: "fit",
    id:'modbusProtocolConfigInfoViewId',
    border: false,
    initComponent: function () {
    	var me = this;
    	var ModbusProtocolTreeInfoStore = Ext.create('AP.store.acquisitionUnit.ModbusProtocolTreeInfoStore');
    	Ext.apply(me, {
    		items: [{
            	tbar: [{
                    id: 'ScadaProtocolModbusConfigSelectRow_Id',
                    xtype: 'textfield',
                    value: 0,
                    hidden: true
                },'->',{
        			xtype: 'button',
                    text: '添加协议',
                    iconCls: 'add',
                    handler: function (v, o) {
        				addModbusProtocolConfigData();
        			}
        		}, "-",{
        			xtype: 'button',
                    text: '添加采集单元',
                    iconCls: 'add',
                    handler: function (v, o) {
                    	addAcquisitionUnitInfo();
        			}
        		}, "-",{
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
        				SaveModbusProtocolConfigTreeData();
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
                    	title:'协议配置',
//                    	autoScroll:true,
                        scrollable: true,
                    	id:"ModbusProtocolConfigPanel_Id"
                    },{
                    	region: 'south',
                    	height:'42%',
                    	title:'属性',
                    	collapsible: true,
                        split: true,
                    	layout: 'fit',
                        html:'<div class="ProtocolConfigPropertiesTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="ProtocolConfigPropertiesTableInfoDiv_id"></div></div>',
                        listeners: {
                            resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            	if(protocolConfigPropertiesHandsontableHelper!=null && protocolConfigPropertiesHandsontableHelper.hot!=undefined){
                            		var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ScadaProtocolModbusConfigSelectRow_Id").getValue();
                            		
                            		var ModbusProtocolConfigTreeGridPanel=Ext.getCmp("ModbusProtocolConfigTreeGridPanel_Id");
                            		if(isNotVal(ModbusProtocolConfigTreeGridPanel)){
                            			var selectedItem=ModbusProtocolConfigTreeGridPanel.getStore().getAt(ScadaDriverModbusConfigSelectRow);
                                	    CreateProtocolConfigPropertiesInfoTable(selectedItem.data);
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
                    id:"DriverItemsConfigTableInfoPanel_Id",
                    layout: 'fit',
                    html:'<div class="DriverItemsConfigTableInfoContainer" style="width:100%;height:100%;"><div class="con" id="DriverItemsConfigTableInfoDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if(protocolConfigItemsHandsontableHelper!=null && protocolConfigItemsHandsontableHelper.hot!=undefined){
                        		var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ScadaProtocolModbusConfigSelectRow_Id").getValue();
                        		var ModbusProtocolConfigTreeGridPanel=Ext.getCmp("ModbusProtocolConfigTreeGridPanel_Id");
                        		if(isNotVal(ModbusProtocolConfigTreeGridPanel)){
                        			var selectedItem=Ext.getCmp("ModbusProtocolConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
                            	    if(selectedItem.data.classes==1){
                                		CreateProtocolItemsConfigInfoTable(selectedItem.data.text,selectedItem.data.classes,selectedItem.data.code);
                                	}else if(selectedItem.data.classes==2||selectedItem.data.classes==3){
                                		CreateProtocolItemsConfigInfoTable(selectedItem.data.protocol,selectedItem.data.classes,selectedItem.data.code);
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

function CreateProtocolItemsConfigInfoTable(protocolName,classes,code){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/getProtocolItemsConfigData',
		success:function(response) {
			Ext.getCmp("DriverItemsConfigTableInfoPanel_Id").setTitle(protocolName+"采控项配置");
			var result =  Ext.JSON.decode(response.responseText);
			if(protocolConfigItemsHandsontableHelper==null || protocolConfigItemsHandsontableHelper.hot==undefined){
				protocolConfigItemsHandsontableHelper = ProtocolConfigItemsHandsontableHelper.createNew("DriverItemsConfigTableInfoDiv_id");
				var colHeaders="['','序号','名称','地址','数量','存储数据类型','接口数据类型','读写类型','单位','换算比例','采集模式']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'title'},"
					 	+"{data:'addr',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolConfigItemsHandsontableHelper);}},"
						+"{data:'quantity',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolConfigItemsHandsontableHelper);}}," 
						+"{data:'storeDataType',type:'dropdown',strict:true,allowInvalid:false,source:['byte','int16','uint16','float32','bcd']}," 
						+"{data:'IFDataType',type:'dropdown',strict:true,allowInvalid:false,source:['bool','int','float32','float64','string']}," 
						+"{data:'RWType',type:'dropdown',strict:true,allowInvalid:false,source:['只读', '读写']}," 
						+"{data:'unit'}," 
						+"{data:'ratio',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num(val, callback,this.row, this.col,protocolConfigItemsHandsontableHelper);}}," 
						+"{data:'acqMode',type:'dropdown',strict:true,allowInvalid:false,source:['主动上传', '被动响应']}" 
						+"]";
				protocolConfigItemsHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				protocolConfigItemsHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					protocolConfigItemsHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolConfigItemsHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					protocolConfigItemsHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					protocolConfigItemsHandsontableHelper.hot.loadData(result.totalRoot);
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

var ProtocolConfigItemsHandsontableHelper = {
		createNew: function (divid) {
	        var protocolConfigItemsHandsontableHelper = {};
	        protocolConfigItemsHandsontableHelper.hot1 = '';
	        protocolConfigItemsHandsontableHelper.divid = divid;
	        protocolConfigItemsHandsontableHelper.validresult=true;//数据校验
	        protocolConfigItemsHandsontableHelper.colHeaders=[];
	        protocolConfigItemsHandsontableHelper.columns=[];
	        protocolConfigItemsHandsontableHelper.AllData=[];
	        
	        protocolConfigItemsHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolConfigItemsHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolConfigItemsHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolConfigItemsHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolConfigItemsHandsontableHelper.divid);
	        	protocolConfigItemsHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [25,50,120,80,80,80,80,80,80,80,80],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolConfigItemsHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolConfigItemsHandsontableHelper.colHeaders,//显示列头
	                columnSorting: true,//允许排序
	                sortIndicator: true,
	                manualColumnResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                contextMenu: {
	                	items: {
	                	    "row_above": {
	                	      name: '向上插入一行',
	                	    },
	                	    "row_below": {
	                	      name: '向下插入一行',
	                	    },
	                	    "col_left": {
	                	      name: '向左插入一列',
	                	    },
	                	    "col_right": {
	                	      name: '向右插入一列',
	                	    },
	                	    "remove_row": {
	                	      name: '删除行',
	                	    },
	                	    "remove_col": {
	                	      name: '删除列',
	                	    },
	                	    "merge_cell": {
	                	      name: '合并单元格',
	                	    },
	                	    "copy": {
	                	      name: '复制',
	                	    },
	                	    "cut": {
	                	      name: '剪切',
	                	    },
	                	    "paste": {
	                	      name: '粘贴',
	                	      disabled: function() {
	                	      },
	                	      callback: function() {
	                	      }
	                	    }
	                	}
	                },//右键菜单展示
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
//	                    if (visualColIndex ==1 || visualColIndex ==2) {
//							cellProperties.readOnly = true;
//							cellProperties.renderer = protocolConfigItemsHandsontableHelper.addBoldBg;
//		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
//	                	var row1=protocolConfigItemsHandsontableHelper.hot.getDataAtRow(row);
//	                	if(row1[0]){
//	                		protocolConfigItemsHandsontableHelper.hot.setDataAtCell(row, 0, false);
//	                	}else{
//	                		protocolConfigItemsHandsontableHelper.hot.setDataAtCell(row, 0, true);
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
//	                    	 return protocolConfigItemsHandsontableHelper.colHeaders[col]; 
//	                    } 
//	                 }
	        	});
	        }
	        //保存数据
	        protocolConfigItemsHandsontableHelper.saveData = function () {}
	        protocolConfigItemsHandsontableHelper.clearContainer = function () {
	        	protocolConfigItemsHandsontableHelper.AllData = [];
	        }
	        return protocolConfigItemsHandsontableHelper;
	    }
};


function CreateProtocolConfigPropertiesInfoTable(data){
	var root=[];
	if(data.classes==1){
		var item1={};
		item1.id=1;
		item1.title='协议名称';
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
	}else if(data.classes==2){
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
		
		var item2={};
		item2.id=2;
		item2.title='采集周期(s)';
		item2.value=data.acq_cycle;
		root.push(item2);
		
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
	
	if(protocolConfigPropertiesHandsontableHelper==null || protocolConfigPropertiesHandsontableHelper.hot==undefined){
		protocolConfigPropertiesHandsontableHelper = ProtocolConfigPropertiesHandsontableHelper.createNew("ProtocolConfigPropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolConfigPropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolConfigPropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolConfigPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigPropertiesHandsontableHelper.createTable(root);
	}else{
		protocolConfigPropertiesHandsontableHelper.classes=data.classes;
		protocolConfigPropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolConfigPropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolConfigPropertiesHandsontableHelper = {};
	        protocolConfigPropertiesHandsontableHelper.hot = '';
	        protocolConfigPropertiesHandsontableHelper.classes =null;
	        protocolConfigPropertiesHandsontableHelper.divid = divid;
	        protocolConfigPropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolConfigPropertiesHandsontableHelper.colHeaders=[];
	        protocolConfigPropertiesHandsontableHelper.columns=[];
	        protocolConfigPropertiesHandsontableHelper.AllData=[];
	        
	        protocolConfigPropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolConfigPropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolConfigPropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolConfigPropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolConfigPropertiesHandsontableHelper.divid);
	        	protocolConfigPropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [2,5,5],
//	                hiddenColumns: {
//	                    columns: [0],
//	                    indicators: true
//	                },
	                columns:protocolConfigPropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolConfigPropertiesHandsontableHelper.colHeaders,//显示列头
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
							cellProperties.renderer = protocolConfigPropertiesHandsontableHelper.addBoldBg;
		                }
	                    if(protocolConfigPropertiesHandsontableHelper.classes===1){
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
	        protocolConfigPropertiesHandsontableHelper.saveData = function () {}
	        protocolConfigPropertiesHandsontableHelper.clearContainer = function () {
	        	protocolConfigPropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolConfigPropertiesHandsontableHelper;
	    }
};


function SaveModbusProtocolConfigTreeData(){
	var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ScadaProtocolModbusConfigSelectRow_Id").getValue();
	if(ScadaDriverModbusConfigSelectRow!=''){
		var selectedItem=Ext.getCmp("ModbusProtocolConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
		var protocolConfigData={};
		var protocolProperties={};
		var propertiesData=protocolConfigPropertiesHandsontableHelper.hot.getData();
		if(selectedItem.data.classes==1){//选中的是协议
			protocolProperties.classes=selectedItem.data.classes;
			protocolProperties.code=selectedItem.data.code;
			protocolProperties.text=propertiesData[0][2];
			protocolProperties.deviceType=(propertiesData[1][2]=="泵设备"?0:1);
			protocolProperties.sort=propertiesData[2][2];
		}else if(selectedItem.data.classes==2){//选中的是采集单元
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
			protocolProperties.acqCycle=propertiesData[1][2];
			protocolProperties.saveCycle=propertiesData[2][2];
			protocolProperties.remark=propertiesData[3][2];
		}
		if(selectedItem.data.classes==1){//选中的是协议
			protocolConfigData=selectedItem.data;
			protocolConfigData.text=propertiesData[0][2];
			protocolConfigData.deviceType=(propertiesData[1][2]=="泵设备"?0:1);
			protocolConfigData.sort=propertiesData[2][2];
			
		}else if(selectedItem.data.classes==2){//选中的是采集单元
			protocolConfigData=selectedItem.parentNode.data;
		}else if(selectedItem.data.classes==3){//选中的是采集单元组
			protocolConfigData=selectedItem.parentNode.parentNode.data;
		}
		
		var driverConfigItemsData=protocolConfigItemsHandsontableHelper.hot.getData();
		
		if(isNotVal(protocolConfigData.text)){
			var configInfo={};
			configInfo.ProtocolName=protocolConfigData.text;
			configInfo.ProtocolCode=protocolConfigData.code;
			configInfo.DeviceType=protocolConfigData.deviceType;
			configInfo.Sort=protocolConfigData.sort;
			configInfo.DataConfig=[];
			for(var i=0;i<driverConfigItemsData.length;i++){
				if(isNotVal(driverConfigItemsData[i][2])){
					var item={};
					item.Title=driverConfigItemsData[i][2];
					item.Addr=parseInt(driverConfigItemsData[i][3]);
					item.Quantity=parseInt(driverConfigItemsData[i][4]);
					item.StoreDataType=driverConfigItemsData[i][5];
					item.IFDataType=driverConfigItemsData[i][6];
					item.RWType=driverConfigItemsData[i][7];
					item.Unit=driverConfigItemsData[i][8];
					item.Ratio=parseFloat(driverConfigItemsData[i][9]);
					item.AcqMode=driverConfigItemsData[i][10];
					configInfo.DataConfig.push(item);
				}
			}
			
			saveModbusProtocolConfigData(configInfo);
			
			if(selectedItem.data.classes==2){//保存采集单元
				var acqUnitSaveData={};
				acqUnitSaveData.updatelist=[];
				acqUnitSaveData.updatelist.push(protocolProperties);
				saveAcquisitionUnitConfigData(acqUnitSaveData,protocolConfigData.text);
			}
			
			if(selectedItem.data.classes==3){//选中的是采集单元组
				var acqGroupSaveData={};
				acqGroupSaveData.updatelist=[];
				acqGroupSaveData.updatelist.push(protocolProperties);
				
				saveAcquisitionGroupConfigData(acqGroupSaveData,protocolConfigData.text,selectedItem.parentNode.data.id);
				//给采集组授予采集项
				grantAcquisitionItemsPermission();
			}
		}else{
			Ext.MessageBox.alert("提示","协议名称不能为空！");
		}
	}
};

function saveModbusProtocolConfigData(configInfo){
	Ext.Ajax.request({
		method:'POST',
		url:context + '/acquisitionUnitManagerController/saveModbusProtocolConfigData',
		success:function(response) {
			var data=Ext.JSON.decode(response.responseText);
			protocolConfigItemsHandsontableHelper.clearContainer();
			if (data.success) {
            	Ext.MessageBox.alert("信息","保存成功");
            	Ext.getCmp("ModbusProtocolConfigTreeGridPanel_Id").getStore().load();
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

function CreateProtocolInstanceConfigPropertiesInfoTable(data){
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
		item3.title='读协议类型';
		item3.value=data.acqProtocolType;
		root.push(item3);
		
		var item4={};
		item4.id=4;
		item4.title='写协议类型';
		item4.value=data.ctrlProtocolType;
		root.push(item4);
		
		var item5={};
		item5.id=5;
		item5.title='注册包前缀(HEX)';
		item5.value=data.signInPrefix;
		root.push(item5);
		
		var item6={};
		item6.id=6;
		item6.title='注册包后缀(HEX)';
		item6.value=data.signInSuffix;
		root.push(item6);
		
		var item7={};
		item7.id=7;
		item7.title='心跳包前缀(HEX)';
		item7.value=data.heartbeatPrefix;
		root.push(item7);
		
		var item8={};
		item8.id=8;
		item8.title='心跳包后缀(HEX)';
		item8.value=data.heartbeatSuffix;
		root.push(item8);
		
		var item9={};
		item9.id=9;
		item9.title='排序序号';
		item9.value=data.sort;
		root.push(item9);
	}
	
	if(protocolConfigInstancePropertiesHandsontableHelper==null || protocolConfigInstancePropertiesHandsontableHelper.hot==undefined){
		protocolConfigInstancePropertiesHandsontableHelper = ProtocolConfigInstancePropertiesHandsontableHelper.createNew("ProtocolConfigInstancePropertiesTableInfoDiv_id");
		var colHeaders="['序号','名称','变量']";
		var columns="[{data:'id'},{data:'title'},{data:'value'}]";
		protocolConfigInstancePropertiesHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
		protocolConfigInstancePropertiesHandsontableHelper.columns=Ext.JSON.decode(columns);
		protocolConfigInstancePropertiesHandsontableHelper.classes=data.classes;
		protocolConfigInstancePropertiesHandsontableHelper.createTable(root);
	}else{
		protocolConfigInstancePropertiesHandsontableHelper.classes=data.classes;
		protocolConfigInstancePropertiesHandsontableHelper.hot.loadData(root);
	}
};

var ProtocolConfigInstancePropertiesHandsontableHelper = {
		createNew: function (divid) {
	        var protocolConfigInstancePropertiesHandsontableHelper = {};
	        protocolConfigInstancePropertiesHandsontableHelper.hot = '';
	        protocolConfigInstancePropertiesHandsontableHelper.classes =null;
	        protocolConfigInstancePropertiesHandsontableHelper.divid = divid;
	        protocolConfigInstancePropertiesHandsontableHelper.validresult=true;//数据校验
	        protocolConfigInstancePropertiesHandsontableHelper.colHeaders=[];
	        protocolConfigInstancePropertiesHandsontableHelper.columns=[];
	        protocolConfigInstancePropertiesHandsontableHelper.AllData=[];
	        
	        protocolConfigInstancePropertiesHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        protocolConfigInstancePropertiesHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        protocolConfigInstancePropertiesHandsontableHelper.createTable = function (data) {
	        	$('#'+protocolConfigInstancePropertiesHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+protocolConfigInstancePropertiesHandsontableHelper.divid);
	        	protocolConfigInstancePropertiesHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		colWidths: [2,5,5],
	                columns:protocolConfigInstancePropertiesHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:protocolConfigInstancePropertiesHandsontableHelper.colHeaders,//显示列头
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
							cellProperties.renderer = protocolConfigInstancePropertiesHandsontableHelper.addBoldBg;
		                }
	                    if(protocolConfigInstancePropertiesHandsontableHelper.classes===1){
	                    	if (visualColIndex === 2 && visualRowIndex===1) {
		                    	this.type = 'dropdown';
		                    	this.source = ['泵设备','管设备'];
		                    	this.strict = true;
		                    	this.allowInvalid = false;
		                    }
	                    	if (visualColIndex === 2 && visualRowIndex===2) {
		                    	this.type = 'dropdown';
		                    	this.source = ['modbus-tcp','modbus-rtu','private-kd93','private-lq1000'];
		                    	this.strict = true;
		                    	this.allowInvalid = false;
		                    }
	                    	if (visualColIndex === 2 && visualRowIndex===3) {
		                    	this.type = 'dropdown';
		                    	this.source = ['modbus-tcp','modbus-rtu'];
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
	        protocolConfigInstancePropertiesHandsontableHelper.saveData = function () {}
	        protocolConfigInstancePropertiesHandsontableHelper.clearContainer = function () {
	        	protocolConfigInstancePropertiesHandsontableHelper.AllData = [];
	        }
	        return protocolConfigInstancePropertiesHandsontableHelper;
	    }
};

