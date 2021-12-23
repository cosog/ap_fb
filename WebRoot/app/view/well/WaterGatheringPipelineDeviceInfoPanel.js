//采水管
var waterGatheringPipelineDeviceInfoHandsontableHelper = null;
var waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
var waterGatheringPipelineAdditionalInfoHandsontableHelper = null;
Ext.define('AP.view.well.WaterGatheringPipelineDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.waterGatheringPipelineDeviceInfoPanel',
    id: 'WaterGatheringPipelineDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var waterGatheringPipelineCombStore = new Ext.data.JsonStore({
            pageSize: defaultWellComboxSize,
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
                    var wellName = Ext.getCmp('waterGatheringPipelineDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 202,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var waterGatheringPipelineDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "waterGatheringPipelineDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: waterGatheringPipelineCombStore,
                autoSelect: false,
                editable: true,
                triggerAction: 'all',
                displayField: "boxval",
                valueField: "boxkey",
                pageSize: comboxPagingStatus,
                minChars: 0,
                emptyText: cosog.string.all,
                blankText: cosog.string.all,
                listeners: {
                    expand: function (sm, selections) {
                        waterGatheringPipelineDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [waterGatheringPipelineDeviceCombo, '-',{
                id: 'WaterGatheringPipelineDeviceSelectRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            },{
                id: 'WaterGatheringPipelineDeviceSelectEndRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            }, {
                xtype: 'button',
                text: cosog.string.exportExcel,
//                pressed: true,
                iconCls: 'export',
                hidden: false,
                handler: function (v, o) {
                    var fields = "";
                    var heads = "";
                    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellInformationName = Ext.getCmp('waterGatheringPipelineDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < waterGatheringPipelineDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += waterGatheringPipelineDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += waterGatheringPipelineDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=202&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("采水管设备")) + "&title=" + URLencode(URLencode("采水管设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
//                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
                }
            },'-', {
                id: 'WaterGatheringPipelineDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },'->', {
    			xtype: 'button',
                text: '添加设备',
                iconCls: 'add',
                handler: function (v, o) {
                	var selectedOrgName="";
                	var selectedOrgId="";
                	var IframeViewStore = Ext.getCmp("IframeView_Id").getStore();
            		var count=IframeViewStore.getCount();
                	var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
                	if (IframeViewSelection.length > 0) {
                		selectedOrgName=foreachAndSearchOrgAbsolutePath(IframeViewStore.data.items,IframeViewSelection[0].data.orgId);
                		selectedOrgId=IframeViewSelection[0].data.orgId;
                		
                	} else {
                		if(count>0){
                			selectedOrgName=IframeViewStore.getAt(0).data.text;
                			selectedOrgId=IframeViewStore.getAt(0).data.orgId;
                		}
                	}
                	
                	var window = Ext.create("AP.view.well.PipelineDeviceInfoWindow", {
                        title: '添加设备'
                    });
                    window.show();
                    Ext.getCmp("pipelineDeviceWinOgLabel_Id").setHtml("设备将添加到【<font color=red>"+selectedOrgName+"</font>】下,请确认<br/>&nbsp;");
                    Ext.getCmp("pipelineDeviceType_Id").setValue(202);
                    Ext.getCmp("pipelineDeviceOrg_Id").setValue(selectedOrgId);
                    Ext.getCmp("addFormPipelineDevice_Id").show();
                    Ext.getCmp("updateFormPipelineDevice_Id").hide();
                    return false;
    			}
    		}, '-',{
    			xtype: 'button',
    			id: 'deleteWaterGatheringPipelineDeviceNameBtn_Id',
    			text: '删除设备',
    			iconCls: 'delete',
    			handler: function (v, o) {
    				var startRow= Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").getValue();
    				var endRow= Ext.getCmp("WaterGatheringPipelineDeviceSelectEndRow_Id").getValue();
    				var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    				if(startRow!=''&&endRow!=''){
    					startRow=parseInt(startRow);
    					endRow=parseInt(endRow);
    					var deleteInfo='是否删除第'+(startRow+1)+"行~第"+(endRow+1)+"行数据";
    					if(startRow==endRow){
    						deleteInfo='是否删除第'+(startRow+1)+"行数据";
    					}
    					
    					Ext.Msg.confirm(cosog.string.yesdel, deleteInfo, function (btn) {
    			            if (btn == "yes") {
    			            	for(var i=startRow;i<=endRow;i++){
    	    						var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
    	    						if (rowdata[0] != null && parseInt(rowdata[0])>0) {
    	    		                    waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist.push(rowdata[0]);
    	    		                }
    	    					}
    	    					var saveData={};
    	    	            	saveData.updatelist=[];
    	    	            	saveData.insertlist=[];
    	    	            	saveData.delidslist=waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist;
    	    	            	Ext.Ajax.request({
    	    	                    method: 'POST',
    	    	                    url: context + '/wellInformationManagerController/saveWellHandsontableData',
    	    	                    success: function (response) {
    	    	                        rdata = Ext.JSON.decode(response.responseText);
    	    	                        if (rdata.success) {
    	    	                        	Ext.MessageBox.alert("信息", "删除成功");
    	    	                            //保存以后重置全局容器
    	    	                            waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer();
    	    	                            Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue(0);
    	    	                        	Ext.getCmp("WaterGatheringPipelineDeviceSelectEndRow_Id").setValue(0);
    	    	                            CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
    	    	                        } else {
    	    	                            Ext.MessageBox.alert("信息", "数据保存失败");
    	    	                        }
    	    	                    },
    	    	                    failure: function () {
    	    	                        Ext.MessageBox.alert("信息", "请求失败");
    	    	                        waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer();
    	    	                    },
    	    	                    params: {
    	    	                        data: JSON.stringify(saveData),
    	    	                        orgId: leftOrg_Id,
    	    	                        deviceType: 202
    	    	                    }
    	    	                });
    			            }
    			        });
    				}else{
    					Ext.MessageBox.alert("信息","请先选中要删除的行");
    				}
    			}
    		},"-", {
                xtype: 'button',
                itemId: 'saveWaterGatheringPipelineDeviceDataBtnId',
                id: 'saveWaterGatheringPipelineDeviceDataBtn_Id',
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    waterGatheringPipelineDeviceInfoHandsontableHelper.saveData();
                }
            },"-", {
    			xtype: 'button',
    			text:'设备隶属迁移',
    			iconCls: 'move',
    			handler: function (v, o) {
    				var window = Ext.create("AP.view.well.DeviceOrgChangeWindow", {
                        title: '设备隶属迁移'
                    });
                    window.show();
                    Ext.getCmp('DeviceOrgChangeWinDeviceType_Id').setValue(202);
                    Ext.create("AP.store.well.DeviceOrgChangeDeviceListStore");
                    Ext.create("AP.store.well.DeviceOrgChangeOrgListStore");
    			}
    		}],
            layout: 'border',
            items: [{
            	region: 'center',
            	layout: 'border',
            	items: [{
            		region: 'center',
            		title:'采水管设备列表',
                	html: '<div class="WaterGatheringPipelineDeviceContainer" style="width:100%;height:100%;"><div class="con" id="WaterGatheringPipelineDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            if (waterGatheringPipelineDeviceInfoHandsontableHelper != null && waterGatheringPipelineDeviceInfoHandsontableHelper.hot != null && waterGatheringPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                            	waterGatheringPipelineDeviceInfoHandsontableHelper.hot.refreshDimensions();
                            }
                        }
                    }
            	},{
            		region: 'east',
            		width: '30%',
            		title:'设备附加信息',
                	id:'WaterGatheringPipelineAdditionalInfoPanel_Id',
                	split: true,
                	collapsible: true,
                	html: '<div class="WaterGatheringPipelineAdditionalInfoContainer" style="width:100%;height:100%;"><div class="con" id="WaterGatheringPipelineAdditionalInfoTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if (waterGatheringPipelineAdditionalInfoHandsontableHelper != null && waterGatheringPipelineAdditionalInfoHandsontableHelper.hot != null && waterGatheringPipelineAdditionalInfoHandsontableHelper.hot != undefined) {
                        		waterGatheringPipelineAdditionalInfoHandsontableHelper.hot.refreshDimensions();
                            }
                        }
                    }
            	}]
            },{
            	region: 'east',
                width: '18%',
                title:'辅件设备列表',
                id:'WaterGatheringPipelineAuxiliaryDevicePanel_Id',
                split: true,
                collapsible: true,
                html: '<div class="WaterGatheringPipelineAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="WaterGatheringPipelineAuxiliaryDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                    	if (waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper != null && waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != null && waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                    		waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.refreshDimensions();
                        }
                    }
                }
            }],
            listeners: {
                beforeclose: function (panel, eOpts) {
                    
                }
            }
        })
        this.callParent(arguments);
    }
});

function CreateAndLoadWaterGatheringPipelineDeviceInfoTable(isNew) {
	if(isNew&&waterGatheringPipelineDeviceInfoHandsontableHelper!=null){
		if (waterGatheringPipelineDeviceInfoHandsontableHelper.hot != undefined) {
			waterGatheringPipelineDeviceInfoHandsontableHelper.hot.destroy();
		}
		waterGatheringPipelineDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('waterGatheringPipelineDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (waterGatheringPipelineDeviceInfoHandsontableHelper == null || waterGatheringPipelineDeviceInfoHandsontableHelper.hot == null || waterGatheringPipelineDeviceInfoHandsontableHelper.hot == undefined) {
                waterGatheringPipelineDeviceInfoHandsontableHelper = WaterGatheringPipelineDeviceInfoHandsontableHelper.createNew("WaterGatheringPipelineDeviceTableDiv_id");
                waterGatheringPipelineDeviceInfoHandsontableHelper.dataLength=result.totalCount;
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,waterGatheringPipelineDeviceInfoHandsontableHelper);}}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "liftingTypeName".toUpperCase()) {
                        if (pcpHidden) {
                            columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机']}";
                        } else {
                            columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机', '螺杆泵']}";
                        }
                    } else if (result.columns[i].dataIndex.toUpperCase() === "instanceName".toUpperCase()) {
                        var source = "[";
                        for (var j = 0; j < result.instanceDropdownData.length; j++) {
                            source += "\'" + result.instanceDropdownData[j] + "\'";
                            if (j < result.instanceDropdownData.length - 1) {
                                source += ",";
                            }
                        }
                        source += "]";
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:" + source + "}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "alarmInstanceName".toUpperCase()) {
                        var source = "[";
                        for (var j = 0; j < result.alarmInstanceDropdownData.length; j++) {
                            source += "\'" + result.alarmInstanceDropdownData[j] + "\'";
                            if (j < result.alarmInstanceDropdownData.length - 1) {
                                source += ",";
                            }
                        }
                        source += "]";
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:" + source + "}";
                    }else if (result.columns[i].dataIndex.toUpperCase() === "applicationScenariosName".toUpperCase()) {
                        var source = "[";
                        for (var j = 0; j < result.applicationScenariosDropdownData.length; j++) {
                            source += "\'" + result.applicationScenariosDropdownData[j] + "\'";
                            if (j < result.applicationScenariosDropdownData.length - 1) {
                                source += ",";
                            }
                        }
                        source += "]";
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'dropdown',strict:true,allowInvalid:false,source:" + source + "}";
                    } else if (result.columns[i].dataIndex.toUpperCase() === "sortNum".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,waterGatheringPipelineDeviceInfoHandsontableHelper);}}";
                    } else {
                        columns += "{data:'" + result.columns[i].dataIndex + "'}";
                    }
                    if (i < result.columns.length - 1) {
                        colHeaders += ",";
                        columns += ",";
                    }
                }
                colHeaders += "]";
                columns += "]";
                waterGatheringPipelineDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                waterGatheringPipelineDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                waterGatheringPipelineDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
            	waterGatheringPipelineDeviceInfoHandsontableHelper.dataLength=result.totalCount;
            	waterGatheringPipelineDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue('');
            	Ext.getCmp("WaterGatheringPipelineDeviceSelectEndRow_Id").setValue('');
            	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(0,'');
            	CreateAndLoadWaterGatheringPipelineAdditionalInfoTable(0,'');
            }else{
            	var selectedRow=Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").getValue();
            	var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(selectedRow);
            	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(rowdata[0],rowdata[1]);
            	CreateAndLoadWaterGatheringPipelineAdditionalInfoTable(rowdata[0],rowdata[1]);
            }
            Ext.getCmp("WaterGatheringPipelineDeviceTotalCount_Id").update({
                count: result.totalCount
            });
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 202,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var WaterGatheringPipelineDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var waterGatheringPipelineDeviceInfoHandsontableHelper = {};
        waterGatheringPipelineDeviceInfoHandsontableHelper.hot = '';
        waterGatheringPipelineDeviceInfoHandsontableHelper.divid = divid;
        waterGatheringPipelineDeviceInfoHandsontableHelper.validresult = true; //数据校验
        waterGatheringPipelineDeviceInfoHandsontableHelper.colHeaders = [];
        waterGatheringPipelineDeviceInfoHandsontableHelper.columns = [];
        waterGatheringPipelineDeviceInfoHandsontableHelper.dataLength = 0;

        waterGatheringPipelineDeviceInfoHandsontableHelper.AllData = {};
        waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist = [];
        waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist = [];
        waterGatheringPipelineDeviceInfoHandsontableHelper.insertlist = [];
        waterGatheringPipelineDeviceInfoHandsontableHelper.editWellNameList = [];

        waterGatheringPipelineDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        waterGatheringPipelineDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + waterGatheringPipelineDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + waterGatheringPipelineDeviceInfoHandsontableHelper.divid);
            waterGatheringPipelineDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
            	licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
            	data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: false
                },
                columns: waterGatheringPipelineDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: waterGatheringPipelineDeviceInfoHandsontableHelper.colHeaders, //显示列头
                columnSorting: true, //允许排序
                allowInsertRow:false,
//                contextMenu: {
//                    items: {
//                        "row_above": {
//                            name: '向上插入一行',
//                        },
//                        "row_below": {
//                            name: '向下插入一行',
//                        },
//                        "col_left": {
//                            name: '向左插入一列',
//                        },
//                        "col_right": {
//                            name: '向右插入一列',
//                        },
//                        "remove_row": {
//                            name: '删除行',
//                        },
//                        "remove_col": {
//                            name: '删除列',
//                        },
//                        "merge_cell": {
//                            name: '合并单元格',
//                        },
//                        "copy": {
//                            name: '复制',
//                        },
//                        "cut": {
//                            name: '剪切',
//                        },
//                        "paste": {
//                            name: '粘贴',
//                            disabled: function () {
//                            },
//                            callback: function () {
//                            }
//                        }
//                    }
//                }, //右键菜单展示
                sortIndicator: true,
                manualColumnResize: true, //当值为true时，允许拖动，当为false时禁止拖动
                manualRowResize: true, //当值为true时，允许拖动，当为false时禁止拖动
                filters: true,
                renderAllRows: true,
                search: true,
                cells: function (row, col, prop) {
                    var cellProperties = {};
                    var visualRowIndex = this.instance.toVisualRow(row);
                    var visualColIndex = this.instance.toVisualColumn(col);
//                    if(visualRowIndex < waterGatheringPipelineDeviceInfoHandsontableHelper.dataLength){
//                    	cellProperties.readOnly = true;
//                    }
                    return cellProperties;
                },
                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
                	if(row<0 && row2<0){//只选中表头
                		Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue('');
                    	Ext.getCmp("WaterGatheringPipelineDeviceSelectEndRow_Id").setValue('');
                    	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(0,'');
                    	CreateAndLoadWaterGatheringPipelineAdditionalInfoTable(0,'');
                	}else{
                		if(row<0){
                    		row=0;
                    	}
                    	if(row2<0){
                    		row2=0;
                    	}
                    	var startRow=row;
                    	var endRow=row2;
                    	if(row>row2){
                    		startRow=row2;
                        	endRow=row;
                    	}
                    	
                    	Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue(startRow);
                    	Ext.getCmp("WaterGatheringPipelineDeviceSelectEndRow_Id").setValue(endRow);
                    	
                    	var row1=waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(startRow);
                    	var recordId=0;
                    	var deviceName='';
                    	if(isNotVal(row1[0])){
                    		recordId=row1[0];
                    	}
                    	if(isNotVal(row1[1])){
                    		deviceName=row1[1];
                    	}
                    	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(recordId,deviceName);
                    	CreateAndLoadWaterGatheringPipelineAdditionalInfoTable(recordId,deviceName);
                	}
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        waterGatheringPipelineDeviceInfoHandsontableHelper.delExpressCount(ids);
                        waterGatheringPipelineDeviceInfoHandsontableHelper.screening();
                    }
                },
                afterChange: function (changes, source) {
                    //params 参数 1.column num , 2,id, 3,oldvalue , 4.newvalue
                    if (changes != null) {
//                        var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
//                        if (IframeViewSelection.length > 0 && IframeViewSelection[0].isLeaf()) {} else {
//                            Ext.MessageBox.alert("信息", "编辑前，请先在左侧选择对应组织节点");
//                        }

                        for (var i = 0; i < changes.length; i++) {
                            var params = [];
                            var index = changes[i][0]; //行号码
                            var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                            params.push(rowdata[0]);
                            params.push(changes[i][1]);
                            params.push(changes[i][2]);
                            params.push(changes[i][3]);

                            if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                waterGatheringPipelineDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                            }

                            if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                            }

                            //仅当单元格发生改变的时候,id!=null,说明是更新
                            if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                var data = "{";
                                for (var j = 0; j < waterGatheringPipelineDeviceInfoHandsontableHelper.columns.length; j++) {
                                    data += waterGatheringPipelineDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                    if (j < waterGatheringPipelineDeviceInfoHandsontableHelper.columns.length - 1) {
                                        data += ","
                                    }
                                }
                                data += "}"
                                waterGatheringPipelineDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
                            }
                        }
                    
                    }
                }
            });
        }
        //插入的数据的获取
        waterGatheringPipelineDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < waterGatheringPipelineDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += waterGatheringPipelineDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < waterGatheringPipelineDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        waterGatheringPipelineDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (waterGatheringPipelineDeviceInfoHandsontableHelper.insertlist.length != 0) {
                waterGatheringPipelineDeviceInfoHandsontableHelper.AllData.insertlist = waterGatheringPipelineDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        waterGatheringPipelineDeviceInfoHandsontableHelper.saveData = function () {
        	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
        	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            //插入的数据的获取
            waterGatheringPipelineDeviceInfoHandsontableHelper.insertExpressCount();
            //获取辅件配置数据
            var deviceAuxiliaryData={};
            var WaterGatheringPipelineDeviceSelectRow= Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").getValue();
            if(isNotVal(WaterGatheringPipelineDeviceSelectRow)){
            	var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(WaterGatheringPipelineDeviceSelectRow);
            	var deviceId=rowdata[0];
            	if(isNotVal(deviceId) && parseInt(deviceId)>0 ){
                	deviceAuxiliaryData.deviceType=202;
                	deviceAuxiliaryData.deviceId=deviceId;
                	//辅件设备
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	if(waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper!=null && waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
                		var auxiliaryDeviceData=waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                            if (auxiliaryDeviceData[index][0]) {
                            	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                            	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                            }
                        });
                	}
                	//附加信息
                	deviceAuxiliaryData.additionalInfoList=[];
                	if(waterGatheringPipelineAdditionalInfoHandsontableHelper!=null && waterGatheringPipelineAdditionalInfoHandsontableHelper.hot!=undefined){
                		var additionalInfoData=waterGatheringPipelineAdditionalInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(additionalInfoData, function (name, index, countriesItSelf) {
                    		if (isNotVal(additionalInfoData[index][1])) {
                            	var additionalInfo={};
                            	additionalInfo.itemName=additionalInfoData[index][1];
                            	additionalInfo.itemValue=isNotVal(additionalInfoData[index][2])?additionalInfoData[index][2]:"";
                            	additionalInfo.itemUnit=isNotVal(additionalInfoData[index][3])?additionalInfoData[index][3]:"";
                            	deviceAuxiliaryData.additionalInfoList.push(additionalInfo);
                            }
                        });
                	}
            	}
            }
        	Ext.Ajax.request({
                method: 'POST',
                url: context + '/wellInformationManagerController/saveWellHandsontableData',
                success: function (response) {
                    rdata = Ext.JSON.decode(response.responseText);
                    if (rdata.success) {
                    	Ext.MessageBox.alert("信息", "保存成功");
                        //保存以后重置全局容器
                        waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer();
                        CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
                    } else {
                        Ext.MessageBox.alert("信息", "数据保存失败");

                    }
                },
                failure: function () {
                    Ext.MessageBox.alert("信息", "请求失败");
                    waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer();
                },
                params: {
                    data: JSON.stringify(waterGatheringPipelineDeviceInfoHandsontableHelper.AllData),
                    deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                    orgId: leftOrg_Id,
                    deviceType: 202
                }
            });
        }

        //修改井名
        waterGatheringPipelineDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取
            if (waterGatheringPipelineDeviceInfoHandsontableHelper.editWellNameList.length > 0 && waterGatheringPipelineDeviceInfoHandsontableHelper.validresult) {
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");
                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(waterGatheringPipelineDeviceInfoHandsontableHelper.editWellNameList),
                        deviceType:202
                    }
                });
            } else {
                if (!waterGatheringPipelineDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        waterGatheringPipelineDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            waterGatheringPipelineDeviceInfoHandsontableHelper.AllData.delidslist = waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        waterGatheringPipelineDeviceInfoHandsontableHelper.screening = function () {
            if (waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist.length != 0 && waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist[j].id == waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                waterGatheringPipelineDeviceInfoHandsontableHelper.AllData.updatelist = waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        waterGatheringPipelineDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                waterGatheringPipelineDeviceInfoHandsontableHelper.AllData.updatelist = waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist;
            }
        }

        waterGatheringPipelineDeviceInfoHandsontableHelper.clearContainer = function () {
            waterGatheringPipelineDeviceInfoHandsontableHelper.AllData = {};
            waterGatheringPipelineDeviceInfoHandsontableHelper.updatelist = [];
            waterGatheringPipelineDeviceInfoHandsontableHelper.delidslist = [];
            waterGatheringPipelineDeviceInfoHandsontableHelper.insertlist = [];
            waterGatheringPipelineDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return waterGatheringPipelineDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(deviceId,deviceName,isNew){
	if(isNew&&waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(deviceName)){
				deviceName='';
			}
			Ext.getCmp("WaterGatheringPipelineAuxiliaryDevicePanel_Id").setTitle(deviceName+"辅件设备列表");
			if(waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper==null || waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = WaterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.createNew("WaterGatheringPipelineAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceType:202
        }
	});
};

var WaterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = {};
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: false
	                },
	        		colWidths: [25,50,80,80],
	                columns:waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
		                }
	                    return cellProperties;
	                },
	                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
	                }
	        	});
	        }
	        //保存数据
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper;
	    }
};

function CreateAndLoadWaterGatheringPipelineAdditionalInfoTable(deviceId,deviceName,isNew){
	if(isNew&&waterGatheringPipelineAdditionalInfoHandsontableHelper!=null){
		if(waterGatheringPipelineAdditionalInfoHandsontableHelper.hot!=undefined){
			waterGatheringPipelineAdditionalInfoHandsontableHelper.hot.destroy();
		}
		waterGatheringPipelineAdditionalInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getDeviceAdditionalInfo',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(deviceName)){
				deviceName='';
			}
			Ext.getCmp("WaterGatheringPipelineAdditionalInfoPanel_Id").setTitle(deviceName+"附加信息");
			if(waterGatheringPipelineAdditionalInfoHandsontableHelper==null || waterGatheringPipelineAdditionalInfoHandsontableHelper.hot==undefined){
				waterGatheringPipelineAdditionalInfoHandsontableHelper = WaterGatheringPipelineAdditionalInfoHandsontableHelper.createNew("WaterGatheringPipelineAdditionalInfoTableDiv_id");
				var colHeaders="['序号','名称','值','单位']";
				var columns="[{data:'id'},{data:'itemName'},{data:'itemValue'},{data:'itemUnit'}]";
				
				waterGatheringPipelineAdditionalInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				waterGatheringPipelineAdditionalInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					waterGatheringPipelineAdditionalInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					waterGatheringPipelineAdditionalInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					waterGatheringPipelineAdditionalInfoHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					waterGatheringPipelineAdditionalInfoHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceId:deviceId,
			deviceType:202
        }
	});
};

var WaterGatheringPipelineAdditionalInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var waterGatheringPipelineAdditionalInfoHandsontableHelper = {};
	        waterGatheringPipelineAdditionalInfoHandsontableHelper.hot = '';
	        waterGatheringPipelineAdditionalInfoHandsontableHelper.divid = divid;
	        waterGatheringPipelineAdditionalInfoHandsontableHelper.colHeaders = [];
	        waterGatheringPipelineAdditionalInfoHandsontableHelper.columns = [];
	        waterGatheringPipelineAdditionalInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(242, 242, 242)';
	        }

	        waterGatheringPipelineAdditionalInfoHandsontableHelper.createTable = function (data) {
	            $('#' + waterGatheringPipelineAdditionalInfoHandsontableHelper.divid).empty();
	            var hotElement = document.querySelector('#' + waterGatheringPipelineAdditionalInfoHandsontableHelper.divid);
	            waterGatheringPipelineAdditionalInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	            	licenseKey: '96860-f3be6-b4941-2bd32-fd62b',
	            	data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: false
	                },
	                columns: waterGatheringPipelineAdditionalInfoHandsontableHelper.columns,
	                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true, //显示行头
	                colHeaders: waterGatheringPipelineAdditionalInfoHandsontableHelper.colHeaders, //显示列头
	                columnSorting: true, //允许排序
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
	                            disabled: function () {
	                            },
	                            callback: function () {
	                            }
	                        }
	                    }
	                }, 
	                sortIndicator: true,
	                manualColumnResize: true, //当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize: true, //当值为true时，允许拖动，当为false时禁止拖动
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                cells: function (row, col, prop) {
	                    var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
	                }
	            });
	        }
	        return waterGatheringPipelineAdditionalInfoHandsontableHelper;
	    }
	};