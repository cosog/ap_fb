//直线电机泵
var linearMotorPumpDeviceInfoHandsontableHelper = null;
var linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper = null;
var linearMotorPumpAdditionalInfoHandsontableHelper = null;
Ext.define('AP.view.well.LinearMotorPumpDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.linearMotorPumpDeviceInfoPanel',
    id: 'LinearMotorPumpDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var linearMotorPumpCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('linearMotorPumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 103,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var linearMotorPumpDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "linearMotorPumpDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: linearMotorPumpCombStore,
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
                        linearMotorPumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadLinearMotorPumpDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [linearMotorPumpDeviceCombo, '-', {
                id: 'LinearMotorPumpDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },{
                id: 'LinearMotorPumpDeviceSelectRow_Id',
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
                    var wellInformationName = Ext.getCmp('linearMotorPumpDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < linearMotorPumpDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += linearMotorPumpDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += linearMotorPumpDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=103&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("直线电机泵设备")) + "&title=" + URLencode(URLencode("直线电机泵设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadLinearMotorPumpDeviceInfoTable();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'saveLinearMotorPumpDeviceDataBtnId',
                id: 'saveLinearMotorPumpDeviceDataBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    linearMotorPumpDeviceInfoHandsontableHelper.saveData();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'editLinearMotorPumpDeviceNameBtnId',
                id: 'editLinearMotorPumpDeviceNameBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: '修改设备名称',
                iconCls: 'edit',
                handler: function (v, o) {
                    linearMotorPumpDeviceInfoHandsontableHelper.editWellName();
                }
            }],
            layout: 'border',
            items: [{
            	region: 'center',
            	layout: 'border',
            	items: [{
            		region: 'center',
            		title:'直线电机泵设备列表',
                	html: '<div class="LinearMotorPumpDeviceContainer" style="width:100%;height:100%;"><div class="con" id="LinearMotorPumpDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            if (linearMotorPumpDeviceInfoHandsontableHelper != null && linearMotorPumpDeviceInfoHandsontableHelper.hot != null && linearMotorPumpDeviceInfoHandsontableHelper.hot != undefined) {
                            	CreateAndLoadLinearMotorPumpDeviceInfoTable();
                            }
                        }
                    }
            	},{
            		region: 'east',
            		width: '30%',
            		title:'设备附加信息',
                	id:'LinearMotorPumpAdditionalInfoPanel_Id',
                	split: true,
                	collapsible: true,
                	html: '<div class="LinearMotorPumpAdditionalInfoContainer" style="width:100%;height:100%;"><div class="con" id="LinearMotorPumpAdditionalInfoTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {}
                    }
            	}]
            },{
            	region: 'east',
                width: '18%',
                title:'辅件设备列表',
                id:'LinearMotorPumpAuxiliaryDevicePanel_Id',
                split: true,
                collapsible: true,
                html: '<div class="LinearMotorPumpAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="LinearMotorPumpAuxiliaryDeviceTableDiv_id"></div></div>',
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

function CreateAndLoadLinearMotorPumpDeviceInfoTable(isNew) {
	if(isNew&&linearMotorPumpDeviceInfoHandsontableHelper!=null){
		if (linearMotorPumpDeviceInfoHandsontableHelper.hot != undefined) {
			linearMotorPumpDeviceInfoHandsontableHelper.hot.destroy();
		}
		linearMotorPumpDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('linearMotorPumpDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (linearMotorPumpDeviceInfoHandsontableHelper == null || linearMotorPumpDeviceInfoHandsontableHelper.hot == null || linearMotorPumpDeviceInfoHandsontableHelper.hot == undefined) {
                linearMotorPumpDeviceInfoHandsontableHelper = LinearMotorPumpDeviceInfoHandsontableHelper.createNew("LinearMotorPumpDeviceTableDiv_id");
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,linearMotorPumpDeviceInfoHandsontableHelper);}}";
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
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,linearMotorPumpDeviceInfoHandsontableHelper);}}";
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
                linearMotorPumpDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                linearMotorPumpDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                linearMotorPumpDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
                linearMotorPumpDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("LinearMotorPumpDeviceSelectRow_Id").setValue('');
            	CreateAndLoadLinearMotorPumpAuxiliaryDeviceInfoTable();
            	CreateAndLoadLinearMotorPumpAdditionalInfoTable();
            }else{
            	Ext.getCmp("LinearMotorPumpDeviceSelectRow_Id").setValue(0);
            	var rowdata = linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(0);
            	CreateAndLoadLinearMotorPumpAuxiliaryDeviceInfoTable(rowdata[2]);
            	CreateAndLoadLinearMotorPumpAdditionalInfoTable(rowdata[2]);
            }
            Ext.getCmp("LinearMotorPumpDeviceTotalCount_Id").update({
                count: result.totalCount
            });
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 103,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var LinearMotorPumpDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var linearMotorPumpDeviceInfoHandsontableHelper = {};
        linearMotorPumpDeviceInfoHandsontableHelper.hot = '';
        linearMotorPumpDeviceInfoHandsontableHelper.divid = divid;
        linearMotorPumpDeviceInfoHandsontableHelper.validresult = true; //数据校验
        linearMotorPumpDeviceInfoHandsontableHelper.colHeaders = [];
        linearMotorPumpDeviceInfoHandsontableHelper.columns = [];

        linearMotorPumpDeviceInfoHandsontableHelper.AllData = {};
        linearMotorPumpDeviceInfoHandsontableHelper.updatelist = [];
        linearMotorPumpDeviceInfoHandsontableHelper.delidslist = [];
        linearMotorPumpDeviceInfoHandsontableHelper.insertlist = [];
        linearMotorPumpDeviceInfoHandsontableHelper.editWellNameList = [];

        linearMotorPumpDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        linearMotorPumpDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + linearMotorPumpDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + linearMotorPumpDeviceInfoHandsontableHelper.divid);
            linearMotorPumpDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
                data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: true
                },
                columns: linearMotorPumpDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: linearMotorPumpDeviceInfoHandsontableHelper.colHeaders, //显示列头
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
                	Ext.getCmp("LinearMotorPumpDeviceSelectRow_Id").setValue(row);
                	var row1=linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(row);
                	CreateAndLoadLinearMotorPumpAuxiliaryDeviceInfoTable(row1[2]);
                	CreateAndLoadLinearMotorPumpAdditionalInfoTable(row1[2]);
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        linearMotorPumpDeviceInfoHandsontableHelper.delExpressCount(ids);
                        linearMotorPumpDeviceInfoHandsontableHelper.screening();
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
                            var rowdata = linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                            params.push(rowdata[0]);
                            params.push(changes[i][1]);
                            params.push(changes[i][2]);
                            params.push(changes[i][3]);

                            if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                linearMotorPumpDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                            }

                            if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                linearMotorPumpDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                            }

                            //仅当单元格发生改变的时候,id!=null,说明是更新
                            if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                var data = "{";
                                for (var j = 0; j < linearMotorPumpDeviceInfoHandsontableHelper.columns.length; j++) {
                                    data += linearMotorPumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                    if (j < linearMotorPumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                        data += ","
                                    }
                                }
                                data += "}"
                                linearMotorPumpDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
                            }
                        }
                    
                    }
                }
            });
        }
        //插入的数据的获取
        linearMotorPumpDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < linearMotorPumpDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += linearMotorPumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < linearMotorPumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        linearMotorPumpDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (linearMotorPumpDeviceInfoHandsontableHelper.insertlist.length != 0) {
                linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist = linearMotorPumpDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        linearMotorPumpDeviceInfoHandsontableHelper.saveData = function () {
        	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
        	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            //插入的数据的获取
            linearMotorPumpDeviceInfoHandsontableHelper.insertExpressCount();
            //获取辅件配置数据
            var deviceAuxiliaryData={};
            var LinearMotorPumpDeviceSelectRow= Ext.getCmp("LinearMotorPumpDeviceSelectRow_Id").getValue();
            if(isNotVal(LinearMotorPumpDeviceSelectRow)){
            	var rowdata = linearMotorPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(LinearMotorPumpDeviceSelectRow);
            	deviceName=rowdata[2];
            	if(isNotVal(deviceName)){
                	deviceAuxiliaryData.deviceType=103;
                	deviceAuxiliaryData.deviceName=deviceName;
                	//辅件设备
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	if(linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper!=null && linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
                		var auxiliaryDeviceData=linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                            if (auxiliaryDeviceData[index][0]) {
                            	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                            	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                            }
                        });
                	}
                	//附加信息
                	deviceAuxiliaryData.additionalInfoList=[];
                	if(linearMotorPumpAdditionalInfoHandsontableHelper!=null && linearMotorPumpAdditionalInfoHandsontableHelper.hot!=undefined){
                		var additionalInfoData=linearMotorPumpAdditionalInfoHandsontableHelper.hot.getData();
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
            
            if (JSON.stringify(linearMotorPumpDeviceInfoHandsontableHelper.AllData) != "{}" && linearMotorPumpDeviceInfoHandsontableHelper.validresult) {
            	var orgArr=leftOrg_Name.split(",");
            	var saveData={};
            	saveData.updatelist=[];
            	saveData.insertlist=[];
            	saveData.delidslist=linearMotorPumpDeviceInfoHandsontableHelper.delidslist;
            	
            	var invalidData1=[];
            	var invalidData2=[];
            	var invalidDataInfo="";
            	if(linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist!=undefined && linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist.length>0){
                	for(var i=0;i<linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist.length;i++){
                		var orgName=linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist[i].orgName;
                		var diveceName=linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist[i].wellName;
                		if(isNotVal(diveceName)){
                			var orgCount=isExist(orgArr,orgName);
                    		if(orgCount>1){//所选组织下具有多个同名组织
                    			invalidData1.push(linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    			invalidDataInfo+="设备<font color=red>"+diveceName+"</font>所填写单位不唯一,保存失败,<font color=red>"+orgArr[0]+"</font>下有<font color=red>"+orgCount+"</font>个<font color=red>"+orgName+"</font>,请选择对应单位后再进行操作;<br/>";
                    		}else if(orgCount===1){//所选组织下无重复组织
                    			saveData.updatelist.push(linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    		}else{//不具备所填写组织权限
                    			invalidData2.push(linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    			invalidDataInfo+="无权限修改设备<font color=red>"+diveceName+"</font>所填写单位("+orgName+")下的数据，请核对单位信息;<br/>";
                    		}
                		}
                	}
                }
            	if(linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist!=undefined && linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist.length>0){
                	for(var i=0;i<linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist.length;i++){
                		var orgName=linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist[i].orgName;
                		var diveceName=linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist[i].wellName;
                		if(isNotVal(diveceName)){
                			var orgCount=isExist(orgArr,orgName);
                    		if(orgCount>1){//所选组织下具有多个同名组织
                    			invalidData1.push(linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    			invalidDataInfo+="设备<font color=red>"+diveceName+"</font>所填写单位不唯一,保存失败,<font color=red>"+orgArr[0]+"</font>下有<font color=red>"+orgCount+"</font>个<font color=red>"+orgName+"</font>,请选择对应单位后再进行操作;<br/>";
                    		}else if(orgCount===1){//所选组织下无重复组织
                    			saveData.insertlist.push(linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    		}else{//不具备所填写组织权限
                    			invalidData2.push(linearMotorPumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
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
                            linearMotorPumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadLinearMotorPumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        linearMotorPumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(saveData),
                        deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                        orgId: leftOrg_Id,
                        deviceType: 103
                    }
                });
            } else {
                if (!linearMotorPumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        
            
            

        }

        //修改井名
        linearMotorPumpDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取

            if (linearMotorPumpDeviceInfoHandsontableHelper.editWellNameList.length > 0 && linearMotorPumpDeviceInfoHandsontableHelper.validresult) {
                //	            	alert(JSON.stringify(linearMotorPumpDeviceInfoHandsontableHelper.editWellNameList));
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            linearMotorPumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadLinearMotorPumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        linearMotorPumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(linearMotorPumpDeviceInfoHandsontableHelper.editWellNameList),
                        deviceType:103
                    }
                });
            } else {
                if (!linearMotorPumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        linearMotorPumpDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    linearMotorPumpDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            linearMotorPumpDeviceInfoHandsontableHelper.AllData.delidslist = linearMotorPumpDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        linearMotorPumpDeviceInfoHandsontableHelper.screening = function () {
            if (linearMotorPumpDeviceInfoHandsontableHelper.updatelist.length != 0 && linearMotorPumpDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < linearMotorPumpDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < linearMotorPumpDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (linearMotorPumpDeviceInfoHandsontableHelper.updatelist[j].id == linearMotorPumpDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            linearMotorPumpDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist = linearMotorPumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        linearMotorPumpDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(linearMotorPumpDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        linearMotorPumpDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && linearMotorPumpDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                linearMotorPumpDeviceInfoHandsontableHelper.AllData.updatelist = linearMotorPumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        linearMotorPumpDeviceInfoHandsontableHelper.clearContainer = function () {
            linearMotorPumpDeviceInfoHandsontableHelper.AllData = {};
            linearMotorPumpDeviceInfoHandsontableHelper.updatelist = [];
            linearMotorPumpDeviceInfoHandsontableHelper.delidslist = [];
            linearMotorPumpDeviceInfoHandsontableHelper.insertlist = [];
            linearMotorPumpDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return linearMotorPumpDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadLinearMotorPumpAuxiliaryDeviceInfoTable(linearMotorPumpDeviceName,isNew){
	if(isNew&&linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(linearMotorPumpDeviceName)){
				linearMotorPumpDeviceName='';
			}
			Ext.getCmp("LinearMotorPumpAuxiliaryDevicePanel_Id").setTitle(linearMotorPumpDeviceName+"辅件设备列表");
			if(linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper==null || linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper = LinearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.createNew("LinearMotorPumpAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:linearMotorPumpDeviceName,
			deviceType:103
        }
	});
};

var LinearMotorPumpAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper = {};
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: true
	                },
	        		colWidths: [25,50,80,80],
	                columns:linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return linearMotorPumpAuxiliaryDeviceInfoHandsontableHelper;
	    }
};

function CreateAndLoadLinearMotorPumpAdditionalInfoTable(linearMotorPumpDeviceName,isNew){
	if(isNew&&linearMotorPumpAdditionalInfoHandsontableHelper!=null){
		if(linearMotorPumpAdditionalInfoHandsontableHelper.hot!=undefined){
			linearMotorPumpAdditionalInfoHandsontableHelper.hot.destroy();
		}
		linearMotorPumpAdditionalInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getDeviceAdditionalInfo',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(linearMotorPumpDeviceName)){
				linearMotorPumpDeviceName='';
			}
			Ext.getCmp("LinearMotorPumpAdditionalInfoPanel_Id").setTitle(linearMotorPumpDeviceName+"附加信息");
			if(linearMotorPumpAdditionalInfoHandsontableHelper==null || linearMotorPumpAdditionalInfoHandsontableHelper.hot==undefined){
				linearMotorPumpAdditionalInfoHandsontableHelper = LinearMotorPumpAdditionalInfoHandsontableHelper.createNew("LinearMotorPumpAdditionalInfoTableDiv_id");
				var colHeaders="['序号','名称','值','单位']";
				var columns="[{data:'id'},{data:'itemName'},{data:'itemValue'},{data:'itemUnit'}]";
				
				linearMotorPumpAdditionalInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				linearMotorPumpAdditionalInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					linearMotorPumpAdditionalInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					linearMotorPumpAdditionalInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					linearMotorPumpAdditionalInfoHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					linearMotorPumpAdditionalInfoHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:linearMotorPumpDeviceName,
			deviceType:103
        }
	});
};

var LinearMotorPumpAdditionalInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var linearMotorPumpAdditionalInfoHandsontableHelper = {};
	        linearMotorPumpAdditionalInfoHandsontableHelper.hot = '';
	        linearMotorPumpAdditionalInfoHandsontableHelper.divid = divid;
	        linearMotorPumpAdditionalInfoHandsontableHelper.colHeaders = [];
	        linearMotorPumpAdditionalInfoHandsontableHelper.columns = [];
	        linearMotorPumpAdditionalInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(242, 242, 242)';
	        }

	        linearMotorPumpAdditionalInfoHandsontableHelper.createTable = function (data) {
	            $('#' + linearMotorPumpAdditionalInfoHandsontableHelper.divid).empty();
	            var hotElement = document.querySelector('#' + linearMotorPumpAdditionalInfoHandsontableHelper.divid);
	            linearMotorPumpAdditionalInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	                data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: true
	                },
	                columns: linearMotorPumpAdditionalInfoHandsontableHelper.columns,
	                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true, //显示行头
	                colHeaders: linearMotorPumpAdditionalInfoHandsontableHelper.colHeaders, //显示列头
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
	        return linearMotorPumpAdditionalInfoHandsontableHelper;
	    }
	};