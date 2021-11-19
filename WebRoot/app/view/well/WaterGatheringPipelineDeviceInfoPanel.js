//采水管
var waterGatheringPipelineDeviceInfoHandsontableHelper = null;
var waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
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
                    var wellName = Ext.getCmp('waterGatheringPipelineDeviceComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 202,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var waterGatheringPipelineCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "waterGatheringPipelineDeviceComb_Id",
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
                        waterGatheringPipelineCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    afterRender: function (combo, o) {
                        if (waterGatheringPipelineCombStore.getTotalCount() > 0) {
                            var boxkey = waterGatheringPipelineCombStore.data.items[0].data.boxkey;
                            var boxval = waterGatheringPipelineCombStore.data.items[0].data.boxval;
                            combo.setValue(boxkey);
                            combo.setRawValue(boxval);
                        }
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
            tbar: [waterGatheringPipelineCombo, '-', {
                id: 'WaterGatheringPipelineDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },{
                id: 'WaterGatheringPipelineDeviceSelectRow_Id',
                xtype: 'textfield',
                value: 0,
                hidden: true
            }, '->', {
                xtype: 'button',
                text: cosog.string.exportExcel,
                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    var fields = "";
                    var heads = "";
                    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
                    var wellInformationName = Ext.getCmp('waterGatheringPipelineDeviceComb_Id').getValue();
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
                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
                }

            }, '-', {
                xtype: 'button',
                itemId: 'saveWaterGatheringPipelineDeviceDataBtnId',
                id: 'saveWaterGatheringPipelineDeviceDataBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    waterGatheringPipelineDeviceInfoHandsontableHelper.saveData();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'editWaterGatheringPipelineDeviceNameBtnId',
                id: 'editWaterGatheringPipelineDeviceNameBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: '修改设备名称',
                iconCls: 'edit',
                handler: function (v, o) {
                    waterGatheringPipelineDeviceInfoHandsontableHelper.editWellName();
                }
            }],
            layout: 'border',
            items: [{
            	region: 'center',
            	title:'设备列表',
            	html: '<div class="WaterGatheringPipelineDeviceContainer" style="width:100%;height:100%;"><div class="con" id="WaterGatheringPipelineDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                    	if (waterGatheringPipelineDeviceInfoHandsontableHelper != null && waterGatheringPipelineDeviceInfoHandsontableHelper.hot != null && waterGatheringPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                            CreateAndLoadWaterGatheringPipelineDeviceInfoTable();
                        }
                    }
                }
            },{
            	region: 'east',
                width: '20%',
                title:'辅件设备列表',
                id:'WaterGatheringPipelineAuxiliaryDevicePanel_Id',
                autoScroll: true,
                split: true,
                collapsible: true,
                html: '<div class="WaterGatheringPipelineAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="WaterGatheringPipelineAuxiliaryDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        if (waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper != null && waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != null && waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
//                            CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable();
                        }
                    }
                }
            }],
            listeners: {
                beforeclose: function (panel, eOpts) {
                    if (waterGatheringPipelineDeviceInfoHandsontableHelper != null) {
                        if (waterGatheringPipelineDeviceInfoHandsontableHelper.hot != undefined) {
                            waterGatheringPipelineDeviceInfoHandsontableHelper.hot.destroy();
                        }
                        waterGatheringPipelineDeviceInfoHandsontableHelper = null;
                    }
                    if (waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper != null) {
                        if (waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                        	waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                        }
                        waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper = null;
                    }
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
    var wellInformationName_Id = Ext.getCmp('waterGatheringPipelineDeviceComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (waterGatheringPipelineDeviceInfoHandsontableHelper == null || waterGatheringPipelineDeviceInfoHandsontableHelper.hot == null || waterGatheringPipelineDeviceInfoHandsontableHelper.hot == undefined) {
                waterGatheringPipelineDeviceInfoHandsontableHelper = WaterGatheringPipelineDeviceInfoHandsontableHelper.createNew("WaterGatheringPipelineDeviceTableDiv_id");
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
                    } else if (result.columns[i].dataIndex.toUpperCase() === "applicationScenariosName".toUpperCase()) {
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
                waterGatheringPipelineDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            Ext.getCmp("WaterGatheringPipelineDeviceTotalCount_Id").update({
                count: result.totalCount
            });
            
            if(result.totalRoot.length==0){
            	Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue('');
            	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable();
            }else{
            	Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue(0);
            	var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(0);
            	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(rowdata[2]);
            }
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
                data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: true
                },
                columns: waterGatheringPipelineDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: waterGatheringPipelineDeviceInfoHandsontableHelper.colHeaders, //显示列头
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
                }, //右键菜单展示
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
                },
                afterSelectionEnd : function (row,column,row2,column2, preventScrolling,selectionLayerLevel) {
                	Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").setValue(row);
                	var row1=waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(row);
                	CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(row1[2]);
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
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
                    if (changes != null) {
                        var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
                        if (IframeViewSelection.length > 0 && IframeViewSelection[0].isLeaf()) {
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
                        } else {
                            Ext.MessageBox.alert("信息", "编辑前，请先在左侧选择对应组织节点");
                        }
                    }
                }
            });
        }
        //插入的数据的获取
        waterGatheringPipelineDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                if (idsdata[i] == null || idsdata[i] < 0) {
                    var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
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
            var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
            if (IframeViewSelection.length > 0 && IframeViewSelection[0].isLeaf()) {
                //插入的数据的获取
                waterGatheringPipelineDeviceInfoHandsontableHelper.insertExpressCount();
                var orgId = IframeViewSelection[0].data.orgId;
                
                //获取辅件配置数据
                var deviceAuxiliaryData={};
                var WaterGatheringPipelineDeviceSelectRow= Ext.getCmp("WaterGatheringPipelineDeviceSelectRow_Id").getValue();
                
                if(isNotVal(WaterGatheringPipelineDeviceSelectRow)){
                	var rowdata = waterGatheringPipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(WaterGatheringPipelineDeviceSelectRow);
                	deviceAuxiliaryData.orgId=orgId;
                	deviceAuxiliaryData.deviceType=202;
                	deviceAuxiliaryData.deviceName=rowdata[2];
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	
                	var auxiliaryDeviceData=waterGatheringPipelineAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                	
                	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                        if (auxiliaryDeviceData[index][0]) {
                        	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                        	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                        }
                    });
                }
                
                
                if (JSON.stringify(waterGatheringPipelineDeviceInfoHandsontableHelper.AllData) != "{}" && waterGatheringPipelineDeviceInfoHandsontableHelper.validresult) {
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
                            orgId: orgId,
                            deviceType: 202
                        }
                    });
                } else {
                    if (!waterGatheringPipelineDeviceInfoHandsontableHelper.validresult) {
                        Ext.MessageBox.alert("信息", "数据类型错误");
                    } else {
                        Ext.MessageBox.alert("信息", "无数据变化");
                    }
                }
            } else {
                Ext.MessageBox.alert("信息", "请先选择组织节点");
            }

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

function CreateAndLoadWaterGatheringPipelineAuxiliaryDeviceInfoTable(waterGatheringPipelineDeviceName,isNew){
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
			Ext.getCmp("WaterGatheringPipelineAuxiliaryDevicePanel_Id").setTitle(waterGatheringPipelineDeviceName+"辅件设备列表");
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
			deviceName:waterGatheringPipelineDeviceName,
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
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: true
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