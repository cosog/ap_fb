var jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper = null;
var jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper = null;
Ext.define('AP.view.well.JetPumpDeviceInfoPanelDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jetPumpDeviceInfoPanelDeviceInfoPanel',
    id: 'JetPumpDeviceInfoPanelDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var jetPumpDeviceInfoPanelCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('jetPumpDeviceInfoPanelDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 0,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var jetPumpDeviceInfoPanelDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "jetPumpDeviceInfoPanelDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: jetPumpDeviceInfoPanelCombStore,
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
                        jetPumpDeviceInfoPanelDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadJetPumpDeviceInfoPanelDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [jetPumpDeviceInfoPanelDeviceCombo, '-', {
                id: 'JetPumpDeviceInfoPanelDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },{
                id: 'JetPumpDeviceInfoPanelDeviceSelectRow_Id',
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
                    var wellInformationName = Ext.getCmp('jetPumpDeviceInfoPanelDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=0&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("泵设备")) + "&title=" + URLencode(URLencode("泵设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadJetPumpDeviceInfoPanelDeviceInfoTable();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'saveJetPumpDeviceInfoPanelDeviceDataBtnId',
                id: 'saveJetPumpDeviceInfoPanelDeviceDataBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.saveData();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'editJetPumpDeviceInfoPanelDeviceNameBtnId',
                id: 'editJetPumpDeviceInfoPanelDeviceNameBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: '修改设备名称',
                iconCls: 'edit',
                handler: function (v, o) {
                    jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellName();
                }
            }],
            layout: 'border',
            items: [{
            	region: 'center',
            	title:'泵设备列表',
            	html: '<div class="JetPumpDeviceInfoPanelDeviceContainer" style="width:100%;height:100%;"><div class="con" id="JetPumpDeviceInfoPanelDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper != null && jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot != null && jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot != undefined) {
                            CreateAndLoadJetPumpDeviceInfoPanelDeviceInfoTable();
                        }
                    }
                }
            },{
            	region: 'east',
                width: '20%',
                title:'辅件设备列表',
                id:'JetPumpDeviceInfoPanelAuxiliaryDevicePanel_Id',
                autoScroll: true,
                split: true,
                collapsible: true,
                html: '<div class="JetPumpDeviceInfoPanelAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="JetPumpDeviceInfoPanelAuxiliaryDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        if (jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper != null && jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot != null && jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
//                            CreateAndLoadJetPumpDeviceInfoPanelAuxiliaryDeviceInfoTable();
                        }
                    }
                }
            }],
            listeners: {
                beforeclose: function (panel, eOpts) {
                    if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper != null) {
                        if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot != undefined) {
                            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.destroy();
                        }
                        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper = null;
                    }
                    if (jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper != null) {
                        if (jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot != undefined) {
                        	jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
                        }
                        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper = null;
                    }
                }
            }
        })
        this.callParent(arguments);
    }
});

function CreateAndLoadJetPumpDeviceInfoPanelDeviceInfoTable(isNew) {
	if(isNew&&jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper!=null){
		if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot != undefined) {
			jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.destroy();
		}
		jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('jetPumpDeviceInfoPanelDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper == null || jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot == null || jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot == undefined) {
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper = JetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.createNew("JetPumpDeviceInfoPanelDeviceTableDiv_id");
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper);}}";
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
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper);}}";
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
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("JetPumpDeviceInfoPanelDeviceSelectRow_Id").setValue('');
            	CreateAndLoadJetPumpDeviceInfoPanelAuxiliaryDeviceInfoTable();
            }else{
            	Ext.getCmp("JetPumpDeviceInfoPanelDeviceSelectRow_Id").setValue(0);
            	var rowdata = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtRow(0);
            	CreateAndLoadJetPumpDeviceInfoPanelAuxiliaryDeviceInfoTable(rowdata[2]);
            }
            
            Ext.getCmp("JetPumpDeviceInfoPanelDeviceTotalCount_Id").update({
                count: result.totalCount
            });
            
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 0,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var JetPumpDeviceInfoPanelDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper = {};
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot = '';
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.divid = divid;
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.validresult = true; //数据校验
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.colHeaders = [];
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns = [];

        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData = {};
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist = [];
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist = [];
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertlist = [];
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellNameList = [];

        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.divid);
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
                data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: true
                },
                columns: jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.colHeaders, //显示列头
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
                	Ext.getCmp("JetPumpDeviceInfoPanelDeviceSelectRow_Id").setValue(row);
                	var row1=jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtRow(row);
                	CreateAndLoadJetPumpDeviceInfoPanelAuxiliaryDeviceInfoTable(row1[2]);
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delExpressCount(ids);
                        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.screening();
                    }
                },
                afterChange: function (changes, source) {
                    //params 参数 1.column num , 2,id, 3,oldvalue , 4.newvalue
                    if (changes != null) {
                        var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
                        if (IframeViewSelection.length > 0 && IframeViewSelection[0].isLeaf()) {
                            for (var i = 0; i < changes.length; i++) {
                                var params = [];
                                var index = changes[i][0]; //行号码
                                var rowdata = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                                params.push(rowdata[0]);
                                params.push(changes[i][1]);
                                params.push(changes[i][2]);
                                params.push(changes[i][3]);

                                if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                    var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                    jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                                }

                                if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                    jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                                }

                                //仅当单元格发生改变的时候,id!=null,说明是更新
                                if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                    var data = "{";
                                    for (var j = 0; j < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns.length; j++) {
                                        data += jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                        if (j < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns.length - 1) {
                                            data += ","
                                        }
                                    }
                                    data += "}"
                                    jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
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
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertlist.length != 0) {
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData.insertlist = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.saveData = function () {
            var IframeViewSelection = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
            if (IframeViewSelection.length > 0 && IframeViewSelection[0].isLeaf()) {
                //插入的数据的获取
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertExpressCount();
                var orgId = IframeViewSelection[0].data.orgId;
                
                //获取辅件配置数据
                var deviceAuxiliaryData={};
                var JetPumpDeviceInfoPanelDeviceSelectRow= Ext.getCmp("JetPumpDeviceInfoPanelDeviceSelectRow_Id").getValue();
                
                if(isNotVal(JetPumpDeviceInfoPanelDeviceSelectRow)){
                	var rowdata = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.hot.getDataAtRow(JetPumpDeviceInfoPanelDeviceSelectRow);
                	deviceAuxiliaryData.orgId=orgId;
                	deviceAuxiliaryData.deviceType=0;
                	deviceAuxiliaryData.deviceName=rowdata[2];
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	
                	var auxiliaryDeviceData=jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                	
                	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                        if (auxiliaryDeviceData[index][0]) {
                        	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                        	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                        }
                    });
                	
                }
                
                if (JSON.stringify(jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData) != "{}" && jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.validresult) {
                    Ext.Ajax.request({
                        method: 'POST',
                        url: context + '/wellInformationManagerController/saveWellHandsontableData',
                        success: function (response) {
                            rdata = Ext.JSON.decode(response.responseText);
                            if (rdata.success) {
                                Ext.MessageBox.alert("信息", "保存成功");
                                //保存以后重置全局容器
                                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.clearContainer();
                                CreateAndLoadJetPumpDeviceInfoPanelDeviceInfoTable();
                            } else {
                                Ext.MessageBox.alert("信息", "数据保存失败");

                            }
                        },
                        failure: function () {
                            Ext.MessageBox.alert("信息", "请求失败");
                            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.clearContainer();
                        },
                        params: {
                            data: JSON.stringify(jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData),
                            deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                            orgId: orgId,
                            deviceType: 0
                        }
                    });
                } else {
                    if (!jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.validresult) {
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
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取

            if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellNameList.length > 0 && jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.validresult) {
                //	            	alert(JSON.stringify(jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellNameList));
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadJetPumpDeviceInfoPanelDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellNameList)
                    }
                });
            } else {
                if (!jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData.delidslist = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.screening = function () {
            if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist.length != 0 && jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist[j].id == jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData.updatelist = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData.updatelist = jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist;
            }
        }

        jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.clearContainer = function () {
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.AllData = {};
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.updatelist = [];
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.delidslist = [];
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.insertlist = [];
            jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return jetPumpDeviceInfoPanelDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadJetPumpDeviceInfoPanelAuxiliaryDeviceInfoTable(jetPumpDeviceInfoPanelDeviceName,isNew){
	if(isNew&&jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			Ext.getCmp("JetPumpDeviceInfoPanelAuxiliaryDevicePanel_Id").setTitle(jetPumpDeviceInfoPanelDeviceName+"辅件设备列表");
			if(jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper==null || jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper = JetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.createNew("JetPumpDeviceInfoPanelAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:jetPumpDeviceInfoPanelDeviceName,
			deviceType:0
        }
	});
};

var JetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper = {};
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: true
	                },
	        		colWidths: [25,50,80,80],
	                columns:jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return jetPumpDeviceInfoPanelAuxiliaryDeviceInfoHandsontableHelper;
	    }
};