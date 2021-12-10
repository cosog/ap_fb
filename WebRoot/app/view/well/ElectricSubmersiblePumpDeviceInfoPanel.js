//电潜泵
var electricSubmersiblePumpDeviceInfoHandsontableHelper = null;
var electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper = null;
var electricSubmersiblePumpAdditionalInfoHandsontableHelper = null;
Ext.define('AP.view.well.ElectricSubmersiblePumpDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.electricSubmersiblePumpDeviceInfoPanel',
    id: 'ElectricSubmersiblePumpDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var electricSubmersiblePumpCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('electricSubmersiblePumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 104,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var electricSubmersiblePumpDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "electricSubmersiblePumpDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: electricSubmersiblePumpCombStore,
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
                        electricSubmersiblePumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [electricSubmersiblePumpDeviceCombo, '-', {
                id: 'ElectricSubmersiblePumpDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },{
                id: 'ElectricSubmersiblePumpDeviceSelectRow_Id',
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
                    var wellInformationName = Ext.getCmp('electricSubmersiblePumpDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < electricSubmersiblePumpDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += electricSubmersiblePumpDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += electricSubmersiblePumpDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=104&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("电潜泵设备")) + "&title=" + URLencode(URLencode("电潜泵设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'saveElectricSubmersiblePumpDeviceDataBtnId',
                id: 'saveElectricSubmersiblePumpDeviceDataBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    electricSubmersiblePumpDeviceInfoHandsontableHelper.saveData();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'editElectricSubmersiblePumpDeviceNameBtnId',
                id: 'editElectricSubmersiblePumpDeviceNameBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: '修改设备名称',
                iconCls: 'edit',
                handler: function (v, o) {
                    electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellName();
                }
            }],
            layout: 'border',
            items: [{
            	region: 'center',
            	layout: 'border',
            	items: [{
            		region: 'center',
            		title:'电潜泵设备列表',
                	html: '<div class="ElectricSubmersiblePumpDeviceContainer" style="width:100%;height:100%;"><div class="con" id="ElectricSubmersiblePumpDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            if (electricSubmersiblePumpDeviceInfoHandsontableHelper != null && electricSubmersiblePumpDeviceInfoHandsontableHelper.hot != null && electricSubmersiblePumpDeviceInfoHandsontableHelper.hot != undefined) {
                            	CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                            }
                        }
                    }
            	},{
            		region: 'east',
            		width: '30%',
            		title:'设备附加信息',
                	id:'ElectricSubmersiblePumpAdditionalInfoPanel_Id',
                	split: true,
                	collapsible: true,
                	html: '<div class="ElectricSubmersiblePumpAdditionalInfoContainer" style="width:100%;height:100%;"><div class="con" id="ElectricSubmersiblePumpAdditionalInfoTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {}
                    }
            	}]
            },{
            	region: 'east',
                width: '18%',
                title:'辅件设备列表',
                id:'ElectricSubmersiblePumpAuxiliaryDevicePanel_Id',
                split: true,
                collapsible: true,
                html: '<div class="ElectricSubmersiblePumpAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="ElectricSubmersiblePumpAuxiliaryDeviceTableDiv_id"></div></div>',
                listeners: {
                    resize: function (abstractcomponent, adjWidth, adjHeight, options) {}
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

function CreateAndLoadElectricSubmersiblePumpDeviceInfoTable(isNew) {
	if(isNew&&electricSubmersiblePumpDeviceInfoHandsontableHelper!=null){
		if (electricSubmersiblePumpDeviceInfoHandsontableHelper.hot != undefined) {
			electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.destroy();
		}
		electricSubmersiblePumpDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('electricSubmersiblePumpDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (electricSubmersiblePumpDeviceInfoHandsontableHelper == null || electricSubmersiblePumpDeviceInfoHandsontableHelper.hot == null || electricSubmersiblePumpDeviceInfoHandsontableHelper.hot == undefined) {
                electricSubmersiblePumpDeviceInfoHandsontableHelper = ElectricSubmersiblePumpDeviceInfoHandsontableHelper.createNew("ElectricSubmersiblePumpDeviceTableDiv_id");
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,electricSubmersiblePumpDeviceInfoHandsontableHelper);}}";
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
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,electricSubmersiblePumpDeviceInfoHandsontableHelper);}}";
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
                electricSubmersiblePumpDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                electricSubmersiblePumpDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                electricSubmersiblePumpDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
                electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("ElectricSubmersiblePumpDeviceSelectRow_Id").setValue('');
            	CreateAndLoadElectricSubmersiblePumpAuxiliaryDeviceInfoTable();
            	CreateAndLoadElectricSubmersiblePumpAdditionalInfoTable();
            }else{
            	Ext.getCmp("ElectricSubmersiblePumpDeviceSelectRow_Id").setValue(0);
            	var rowdata = electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtRow(0);
            	CreateAndLoadElectricSubmersiblePumpAuxiliaryDeviceInfoTable(rowdata[2]);
            	CreateAndLoadElectricSubmersiblePumpAdditionalInfoTable(rowdata[2]);
            }
            Ext.getCmp("ElectricSubmersiblePumpDeviceTotalCount_Id").update({
                count: result.totalCount
            });
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 104,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var ElectricSubmersiblePumpDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var electricSubmersiblePumpDeviceInfoHandsontableHelper = {};
        electricSubmersiblePumpDeviceInfoHandsontableHelper.hot = '';
        electricSubmersiblePumpDeviceInfoHandsontableHelper.divid = divid;
        electricSubmersiblePumpDeviceInfoHandsontableHelper.validresult = true; //数据校验
        electricSubmersiblePumpDeviceInfoHandsontableHelper.colHeaders = [];
        electricSubmersiblePumpDeviceInfoHandsontableHelper.columns = [];

        electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData = {};
        electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist = [];
        electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist = [];
        electricSubmersiblePumpDeviceInfoHandsontableHelper.insertlist = [];
        electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellNameList = [];

        electricSubmersiblePumpDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        electricSubmersiblePumpDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + electricSubmersiblePumpDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + electricSubmersiblePumpDeviceInfoHandsontableHelper.divid);
            electricSubmersiblePumpDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
                data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: true
                },
                columns: electricSubmersiblePumpDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: electricSubmersiblePumpDeviceInfoHandsontableHelper.colHeaders, //显示列头
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
                	Ext.getCmp("ElectricSubmersiblePumpDeviceSelectRow_Id").setValue(row);
                	var row1=electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtRow(row);
                	CreateAndLoadElectricSubmersiblePumpAuxiliaryDeviceInfoTable(row1[2]);
                	CreateAndLoadElectricSubmersiblePumpAdditionalInfoTable(row1[2]);
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        electricSubmersiblePumpDeviceInfoHandsontableHelper.delExpressCount(ids);
                        electricSubmersiblePumpDeviceInfoHandsontableHelper.screening();
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
                            var rowdata = electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                            params.push(rowdata[0]);
                            params.push(changes[i][1]);
                            params.push(changes[i][2]);
                            params.push(changes[i][3]);

                            if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                            }

                            if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                            }

                            //仅当单元格发生改变的时候,id!=null,说明是更新
                            if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                var data = "{";
                                for (var j = 0; j < electricSubmersiblePumpDeviceInfoHandsontableHelper.columns.length; j++) {
                                    data += electricSubmersiblePumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                    if (j < electricSubmersiblePumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                        data += ","
                                    }
                                }
                                data += "}"
                                electricSubmersiblePumpDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
                            }
                        }
                    
                    }
                }
            });
        }
        //插入的数据的获取
        electricSubmersiblePumpDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < electricSubmersiblePumpDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += electricSubmersiblePumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < electricSubmersiblePumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        electricSubmersiblePumpDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (electricSubmersiblePumpDeviceInfoHandsontableHelper.insertlist.length != 0) {
                electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist = electricSubmersiblePumpDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        electricSubmersiblePumpDeviceInfoHandsontableHelper.saveData = function () {
        	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
        	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            //插入的数据的获取
            electricSubmersiblePumpDeviceInfoHandsontableHelper.insertExpressCount();
            //获取辅件配置数据
            var deviceAuxiliaryData={};
            var ElectricSubmersiblePumpDeviceSelectRow= Ext.getCmp("ElectricSubmersiblePumpDeviceSelectRow_Id").getValue();
            if(isNotVal(ElectricSubmersiblePumpDeviceSelectRow)){
            	var rowdata = electricSubmersiblePumpDeviceInfoHandsontableHelper.hot.getDataAtRow(ElectricSubmersiblePumpDeviceSelectRow);
            	deviceName=rowdata[2];
            	if(isNotVal(deviceName)){
                	deviceAuxiliaryData.deviceType=104;
                	deviceAuxiliaryData.deviceName=deviceName;
                	//辅件设备
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	if(electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper!=null && electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
                		var auxiliaryDeviceData=electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                            if (auxiliaryDeviceData[index][0]) {
                            	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                            	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                            }
                        });
                	}
                	//附加信息
                	deviceAuxiliaryData.additionalInfoList=[];
                	if(electricSubmersiblePumpAdditionalInfoHandsontableHelper!=null && electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot!=undefined){
                		var additionalInfoData=electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(additionalInfoData, function (name, index, countriesItSelf) {
                            if (isNotVal(additionalInfoData[index][1]) && isNotVal(additionalInfoData[index][2])) {
                            	var additionalInfo={};
                            	additionalInfo.itemName=additionalInfoData[index][1];
                            	additionalInfo.itemValue=additionalInfoData[index][2];
                            	additionalInfo.itemUnit=additionalInfoData[index][3]==null?"":additionalInfoData[index][3];
                            	deviceAuxiliaryData.additionalInfoList.push(additionalInfo);
                            }
                        });
                	}
            	}
            }
            
            if (JSON.stringify(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData) != "{}" && electricSubmersiblePumpDeviceInfoHandsontableHelper.validresult) {
            	var orgArr=leftOrg_Name.split(",");
            	var saveData={};
            	saveData.updatelist=[];
            	saveData.insertlist=[];
            	saveData.delidslist=electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist;
            	
            	var invalidData1=[];
            	var invalidData2=[];
            	var invalidDataInfo="";
            	if(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist!=undefined && electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist.length>0){
                	for(var i=0;i<electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist.length;i++){
                		var orgName=electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist[i].orgName;
                		var diveceName=electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist[i].wellName;
                		if(isNotVal(diveceName)){
                			var orgCount=isExist(orgArr,orgName);
                    		if(orgCount>1){//所选组织下具有多个同名组织
                    			invalidData1.push(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    			invalidDataInfo+="设备<font color=red>"+diveceName+"</font>所填写单位不唯一,保存失败,<font color=red>"+orgArr[0]+"</font>下有<font color=red>"+orgCount+"</font>个<font color=red>"+orgName+"</font>,请选择对应单位后再进行操作;<br/>";
                    		}else if(orgCount===1){//所选组织下无重复组织
                    			saveData.updatelist.push(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    		}else{//不具备所填写组织权限
                    			invalidData2.push(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    			invalidDataInfo+="无权限修改设备<font color=red>"+diveceName+"</font>所填写单位("+orgName+")下的数据，请核对单位信息;<br/>";
                    		}
                		}
                	}
                }
            	if(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist!=undefined && electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist.length>0){
                	for(var i=0;i<electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist.length;i++){
                		var orgName=electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist[i].orgName;
                		var diveceName=electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist[i].wellName;
                		if(isNotVal(diveceName)){
                			var orgCount=isExist(orgArr,orgName);
                    		if(orgCount>1){//所选组织下具有多个同名组织
                    			invalidData1.push(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    			invalidDataInfo+="设备<font color=red>"+diveceName+"</font>所填写单位不唯一,保存失败,<font color=red>"+orgArr[0]+"</font>下有<font color=red>"+orgCount+"</font>个<font color=red>"+orgName+"</font>,请选择对应单位后再进行操作;<br/>";
                    		}else if(orgCount===1){//所选组织下无重复组织
                    			saveData.insertlist.push(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    		}else{//不具备所填写组织权限
                    			invalidData2.push(electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    			invalidDataInfo+="无权限修改设备<font color=red>"+diveceName+"</font>所填写单位("+orgName+")下的数据，请核对单位信息;<br/>";
                    		}
                		}
                	}
                }
            	Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/saveWellHandsontableData',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            if(invalidData1.length>0 || invalidData2.length>0){
                        		Ext.MessageBox.alert("信息", invalidDataInfo+"其他数据保存成功！");
                        	}else{
                        		Ext.MessageBox.alert("信息", "保存成功");
                        	}
                            //保存以后重置全局容器
                            electricSubmersiblePumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        electricSubmersiblePumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(saveData),
                        deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                        orgId: leftOrg_Id,
                        deviceType: 104
                    }
                });
            } else {
                if (!electricSubmersiblePumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        
            
            

        }

        //修改井名
        electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取

            if (electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellNameList.length > 0 && electricSubmersiblePumpDeviceInfoHandsontableHelper.validresult) {
                //	            	alert(JSON.stringify(electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellNameList));
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            electricSubmersiblePumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadElectricSubmersiblePumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        electricSubmersiblePumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellNameList),
                        deviceType:104
                    }
                });
            } else {
                if (!electricSubmersiblePumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        electricSubmersiblePumpDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.delidslist = electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        electricSubmersiblePumpDeviceInfoHandsontableHelper.screening = function () {
            if (electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist.length != 0 && electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist[j].id == electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist = electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        electricSubmersiblePumpDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData.updatelist = electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        electricSubmersiblePumpDeviceInfoHandsontableHelper.clearContainer = function () {
            electricSubmersiblePumpDeviceInfoHandsontableHelper.AllData = {};
            electricSubmersiblePumpDeviceInfoHandsontableHelper.updatelist = [];
            electricSubmersiblePumpDeviceInfoHandsontableHelper.delidslist = [];
            electricSubmersiblePumpDeviceInfoHandsontableHelper.insertlist = [];
            electricSubmersiblePumpDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return electricSubmersiblePumpDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadElectricSubmersiblePumpAuxiliaryDeviceInfoTable(electricSubmersiblePumpDeviceName,isNew){
	if(isNew&&electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(electricSubmersiblePumpDeviceName)){
				electricSubmersiblePumpDeviceName='';
			}
			Ext.getCmp("ElectricSubmersiblePumpAuxiliaryDevicePanel_Id").setTitle(electricSubmersiblePumpDeviceName+"辅件设备列表");
			if(electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper==null || electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper = ElectricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.createNew("ElectricSubmersiblePumpAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:electricSubmersiblePumpDeviceName,
			deviceType:104
        }
	});
};

var ElectricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper = {};
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: true
	                },
	        		colWidths: [25,50,80,80],
	                columns:electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return electricSubmersiblePumpAuxiliaryDeviceInfoHandsontableHelper;
	    }
};

function CreateAndLoadElectricSubmersiblePumpAdditionalInfoTable(electricSubmersiblePumpDeviceName,isNew){
	if(isNew&&electricSubmersiblePumpAdditionalInfoHandsontableHelper!=null){
		if(electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot!=undefined){
			electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot.destroy();
		}
		electricSubmersiblePumpAdditionalInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getDeviceAdditionalInfo',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(electricSubmersiblePumpDeviceName)){
				electricSubmersiblePumpDeviceName='';
			}
			Ext.getCmp("ElectricSubmersiblePumpAdditionalInfoPanel_Id").setTitle(electricSubmersiblePumpDeviceName+"附加信息");
			if(electricSubmersiblePumpAdditionalInfoHandsontableHelper==null || electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot==undefined){
				electricSubmersiblePumpAdditionalInfoHandsontableHelper = ElectricSubmersiblePumpAdditionalInfoHandsontableHelper.createNew("ElectricSubmersiblePumpAdditionalInfoTableDiv_id");
				var colHeaders="['序号','名称','值','单位']";
				var columns="[{data:'id'},{data:'itemName'},{data:'itemValue'},{data:'itemUnit'}]";
				
				electricSubmersiblePumpAdditionalInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				electricSubmersiblePumpAdditionalInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					electricSubmersiblePumpAdditionalInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					electricSubmersiblePumpAdditionalInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:electricSubmersiblePumpDeviceName,
			deviceType:104
        }
	});
};

var ElectricSubmersiblePumpAdditionalInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var electricSubmersiblePumpAdditionalInfoHandsontableHelper = {};
	        electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot = '';
	        electricSubmersiblePumpAdditionalInfoHandsontableHelper.divid = divid;
	        electricSubmersiblePumpAdditionalInfoHandsontableHelper.colHeaders = [];
	        electricSubmersiblePumpAdditionalInfoHandsontableHelper.columns = [];
	        electricSubmersiblePumpAdditionalInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(242, 242, 242)';
	        }

	        electricSubmersiblePumpAdditionalInfoHandsontableHelper.createTable = function (data) {
	            $('#' + electricSubmersiblePumpAdditionalInfoHandsontableHelper.divid).empty();
	            var hotElement = document.querySelector('#' + electricSubmersiblePumpAdditionalInfoHandsontableHelper.divid);
	            electricSubmersiblePumpAdditionalInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	                data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: true
	                },
	                columns: electricSubmersiblePumpAdditionalInfoHandsontableHelper.columns,
	                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true, //显示行头
	                colHeaders: electricSubmersiblePumpAdditionalInfoHandsontableHelper.colHeaders, //显示列头
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
	        return electricSubmersiblePumpAdditionalInfoHandsontableHelper;
	    }
	};