//螺杆泵
var screwPumpDeviceInfoHandsontableHelper = null;
var screwPumpAuxiliaryDeviceInfoHandsontableHelper = null;
var screwPumpAdditionalInfoHandsontableHelper = null;
Ext.define('AP.view.well.ScrewPumpDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.screwPumpDeviceInfoPanel',
    id: 'ScrewPumpDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var screwPumpCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('screwPumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 102,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams, new_params);
                }
            }
        });

        var screwPumpDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "screwPumpDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: screwPumpCombStore,
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
                        screwPumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                            CreateAndLoadScrewPumpDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [screwPumpDeviceCombo, '-', {
                id: 'ScrewPumpDeviceTotalCount_Id',
                xtype: 'component',
                hidden: false,
                tpl: cosog.string.totalCount + ': {count}',
                style: 'margin-right:15px'
            },{
                id: 'ScrewPumpDeviceSelectRow_Id',
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
                    var wellInformationName = Ext.getCmp('screwPumpDeviceListComb_Id').getValue();
                    var url = context + '/wellInformationManagerController/exportWellInformationData';
                    for (var i = 0; i < screwPumpDeviceInfoHandsontableHelper.colHeaders.length; i++) {
                        fields += screwPumpDeviceInfoHandsontableHelper.columns[i].data + ",";
                        heads += screwPumpDeviceInfoHandsontableHelper.colHeaders[i] + ","
                    }
                    if (isNotVal(fields)) {
                        fields = fields.substring(0, fields.length - 1);
                        heads = heads.substring(0, heads.length - 1);
                    }

                    var param = "&fields=" + fields + "&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id + "&deviceType=102&wellInformationName=" + URLencode(URLencode(wellInformationName)) + "&recordCount=10000" + "&fileName=" + URLencode(URLencode("螺杆泵设备")) + "&title=" + URLencode(URLencode("螺杆泵设备"));
                    openExcelWindow(url + '?flag=true' + param);
                }
            }, '-', {
                xtype: 'button',
                iconCls: 'note-refresh',
                text: cosog.string.refresh,
                pressed: true,
                hidden: false,
                handler: function (v, o) {
                    CreateAndLoadScrewPumpDeviceInfoTable();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'saveScrewPumpDeviceDataBtnId',
                id: 'saveScrewPumpDeviceDataBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: cosog.string.save,
                iconCls: 'save',
                handler: function (v, o) {
                    screwPumpDeviceInfoHandsontableHelper.saveData();
                }
            }, '-', {
                xtype: 'button',
                itemId: 'editScrewPumpDeviceNameBtnId',
                id: 'editScrewPumpDeviceNameBtn_Id',
                disabled: false,
                hidden: false,
                pressed: true,
                text: '修改设备名称',
                iconCls: 'edit',
                handler: function (v, o) {
                    screwPumpDeviceInfoHandsontableHelper.editWellName();
                }
            }],
            layout: 'border',
            items: [{
            	region: 'center',
            	layout: 'border',
            	items: [{
            		region: 'center',
            		title:'螺杆泵设备列表',
                	html: '<div class="ScrewPumpDeviceContainer" style="width:100%;height:100%;"><div class="con" id="ScrewPumpDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                            if (screwPumpDeviceInfoHandsontableHelper != null && screwPumpDeviceInfoHandsontableHelper.hot != null && screwPumpDeviceInfoHandsontableHelper.hot != undefined) {
                            	CreateAndLoadScrewPumpDeviceInfoTable();
                            }
                        }
                    }
            	},{
            		region: 'east',
            		width: '30%',
            		title:'设备附加信息',
                	id:'ScrewPumpAdditionalInfoPanel_Id',
                	split: true,
                	collapsible: true,
                	html: '<div class="ScrewPumpAdditionalInfoContainer" style="width:100%;height:100%;"><div class="con" id="ScrewPumpAdditionalInfoTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {}
                    }
            	}]
            },{
            	region: 'east',
                width: '18%',
                title:'辅件设备列表',
                id:'ScrewPumpAuxiliaryDevicePanel_Id',
                split: true,
                collapsible: true,
                html: '<div class="ScrewPumpAuxiliaryDeviceContainer" style="width:100%;height:100%;"><div class="con" id="ScrewPumpAuxiliaryDeviceTableDiv_id"></div></div>',
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

function CreateAndLoadScrewPumpDeviceInfoTable(isNew) {
	if(isNew&&screwPumpDeviceInfoHandsontableHelper!=null){
		if (screwPumpDeviceInfoHandsontableHelper.hot != undefined) {
			screwPumpDeviceInfoHandsontableHelper.hot.destroy();
		}
		screwPumpDeviceInfoHandsontableHelper = null;
	}
    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
    var wellInformationName_Id = Ext.getCmp('screwPumpDeviceListComb_Id').getValue();
    Ext.Ajax.request({
        method: 'POST',
        url: context + '/wellInformationManagerController/doWellInformationShow',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (screwPumpDeviceInfoHandsontableHelper == null || screwPumpDeviceInfoHandsontableHelper.hot == null || screwPumpDeviceInfoHandsontableHelper.hot == undefined) {
                screwPumpDeviceInfoHandsontableHelper = ScrewPumpDeviceInfoHandsontableHelper.createNew("ScrewPumpDeviceTableDiv_id");
                var colHeaders = "[";
                var columns = "[";

                for (var i = 0; i < result.columns.length; i++) {
                    colHeaders += "'" + result.columns[i].header + "'";
                    if (result.columns[i].dataIndex.toUpperCase() === "orgName".toUpperCase()) {
                        columns += "{data:'" + result.columns[i].dataIndex + "',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,screwPumpDeviceInfoHandsontableHelper);}}";
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
                        columns += "{data:'" + result.columns[i].dataIndex + "',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,screwPumpDeviceInfoHandsontableHelper);}}";
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
                screwPumpDeviceInfoHandsontableHelper.colHeaders = Ext.JSON.decode(colHeaders);
                screwPumpDeviceInfoHandsontableHelper.columns = Ext.JSON.decode(columns);
                screwPumpDeviceInfoHandsontableHelper.createTable(result.totalRoot);
            } else {
                screwPumpDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
            }
            if(result.totalRoot.length==0){
            	Ext.getCmp("ScrewPumpDeviceSelectRow_Id").setValue('');
            	CreateAndLoadScrewPumpAuxiliaryDeviceInfoTable();
            	CreateAndLoadScrewPumpAdditionalInfoTable();
            }else{
            	Ext.getCmp("ScrewPumpDeviceSelectRow_Id").setValue(0);
            	var rowdata = screwPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(0);
            	CreateAndLoadScrewPumpAuxiliaryDeviceInfoTable(rowdata[2]);
            	CreateAndLoadScrewPumpAdditionalInfoTable(rowdata[2]);
            }
            Ext.getCmp("ScrewPumpDeviceTotalCount_Id").update({
                count: result.totalCount
            });
        },
        failure: function () {
            Ext.MessageBox.alert("错误", "与后台联系的时候出了问题");
        },
        params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 102,
            recordCount: 50,
            orgId: leftOrg_Id,
            page: 1,
            limit: 10000
        }
    });
};

var ScrewPumpDeviceInfoHandsontableHelper = {
    createNew: function (divid) {
        var screwPumpDeviceInfoHandsontableHelper = {};
        screwPumpDeviceInfoHandsontableHelper.hot = '';
        screwPumpDeviceInfoHandsontableHelper.divid = divid;
        screwPumpDeviceInfoHandsontableHelper.validresult = true; //数据校验
        screwPumpDeviceInfoHandsontableHelper.colHeaders = [];
        screwPumpDeviceInfoHandsontableHelper.columns = [];

        screwPumpDeviceInfoHandsontableHelper.AllData = {};
        screwPumpDeviceInfoHandsontableHelper.updatelist = [];
        screwPumpDeviceInfoHandsontableHelper.delidslist = [];
        screwPumpDeviceInfoHandsontableHelper.insertlist = [];
        screwPumpDeviceInfoHandsontableHelper.editWellNameList = [];

        screwPumpDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'rgb(242, 242, 242)';
        }

        screwPumpDeviceInfoHandsontableHelper.createTable = function (data) {
            $('#' + screwPumpDeviceInfoHandsontableHelper.divid).empty();
            var hotElement = document.querySelector('#' + screwPumpDeviceInfoHandsontableHelper.divid);
            screwPumpDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
                data: data,
                hiddenColumns: {
                    columns: [0],
                    indicators: true
                },
                columns: screwPumpDeviceInfoHandsontableHelper.columns,
                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
                autoWrapRow: true,
                rowHeaders: true, //显示行头
                colHeaders: screwPumpDeviceInfoHandsontableHelper.colHeaders, //显示列头
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
                	Ext.getCmp("ScrewPumpDeviceSelectRow_Id").setValue(row);
                	var row1=screwPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(row);
                	CreateAndLoadScrewPumpAuxiliaryDeviceInfoTable(row1[2]);
                	CreateAndLoadScrewPumpAdditionalInfoTable(row1[2]);
                },
                afterDestroy: function () {
                },
                beforeRemoveRow: function (index, amount) {
                    var ids = [];
                    //封装id成array传入后台
                    if (amount != 0) {
                        for (var i = index; i < amount + index; i++) {
                            var rowdata = screwPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                            ids.push(rowdata[0]);
                        }
                        screwPumpDeviceInfoHandsontableHelper.delExpressCount(ids);
                        screwPumpDeviceInfoHandsontableHelper.screening();
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
                            var rowdata = screwPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
                            params.push(rowdata[0]);
                            params.push(changes[i][1]);
                            params.push(changes[i][2]);
                            params.push(changes[i][3]);

                            if ("edit" == source && params[1] == "wellName") { //编辑井名单元格
                                var data = "{\"oldWellName\":\"" + params[2] + "\",\"newWellName\":\"" + params[3] + "\"}";
                                screwPumpDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
                            }

                            if (params[1] == "protocolName" && params[3] == "Kafka协议") {
                                screwPumpDeviceInfoHandsontableHelper.hot.getCell(index, 6).source = ['modbus-tcp', 'modbus-rtu'];
                            }

                            //仅当单元格发生改变的时候,id!=null,说明是更新
                            if (params[2] != params[3] && params[0] != null && params[0] > 0) {
                                var data = "{";
                                for (var j = 0; j < screwPumpDeviceInfoHandsontableHelper.columns.length; j++) {
                                    data += screwPumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                                    if (j < screwPumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                        data += ","
                                    }
                                }
                                data += "}"
                                screwPumpDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
                            }
                        }
                    
                    }
                }
            });
        }
        //插入的数据的获取
        screwPumpDeviceInfoHandsontableHelper.insertExpressCount = function () {
            var idsdata = screwPumpDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
            for (var i = 0; i < idsdata.length; i++) {
                //id=null时,是插入数据,此时的i正好是行号
                if (idsdata[i] == null || idsdata[i] < 0) {
                    //获得id=null时的所有数据封装进data
                    var rowdata = screwPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
                    //var collength = hot.countCols();
                    if (rowdata != null) {
                        var data = "{";
                        for (var j = 0; j < screwPumpDeviceInfoHandsontableHelper.columns.length; j++) {
                            data += screwPumpDeviceInfoHandsontableHelper.columns[j].data + ":'" + rowdata[j] + "'";
                            if (j < screwPumpDeviceInfoHandsontableHelper.columns.length - 1) {
                                data += ","
                            }
                        }
                        data += "}"
                        screwPumpDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
                    }
                }
            }
            if (screwPumpDeviceInfoHandsontableHelper.insertlist.length != 0) {
                screwPumpDeviceInfoHandsontableHelper.AllData.insertlist = screwPumpDeviceInfoHandsontableHelper.insertlist;
            }
        }
        //保存数据
        screwPumpDeviceInfoHandsontableHelper.saveData = function () {
        	var leftOrg_Name=Ext.getCmp("leftOrg_Name").getValue();
        	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            //插入的数据的获取
            screwPumpDeviceInfoHandsontableHelper.insertExpressCount();
            //获取辅件配置数据
            var deviceAuxiliaryData={};
            var ScrewPumpDeviceSelectRow= Ext.getCmp("ScrewPumpDeviceSelectRow_Id").getValue();
            if(isNotVal(ScrewPumpDeviceSelectRow)){
            	var rowdata = screwPumpDeviceInfoHandsontableHelper.hot.getDataAtRow(ScrewPumpDeviceSelectRow);
            	deviceName=rowdata[2];
            	if(isNotVal(deviceName)){
                	deviceAuxiliaryData.deviceType=102;
                	deviceAuxiliaryData.deviceName=deviceName;
                	//辅件设备
                	deviceAuxiliaryData.auxiliaryDevice=[];
                	if(screwPumpAuxiliaryDeviceInfoHandsontableHelper!=null && screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
                		var auxiliaryDeviceData=screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot.getData();
                    	Ext.Array.each(auxiliaryDeviceData, function (name, index, countriesItSelf) {
                            if (auxiliaryDeviceData[index][0]) {
                            	var auxiliaryDeviceId = auxiliaryDeviceData[index][4];
                            	deviceAuxiliaryData.auxiliaryDevice.push(auxiliaryDeviceId);
                            }
                        });
                	}
                	//附加信息
                	deviceAuxiliaryData.additionalInfoList=[];
                	if(screwPumpAdditionalInfoHandsontableHelper!=null && screwPumpAdditionalInfoHandsontableHelper.hot!=undefined){
                		var additionalInfoData=screwPumpAdditionalInfoHandsontableHelper.hot.getData();
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
            
            if (JSON.stringify(screwPumpDeviceInfoHandsontableHelper.AllData) != "{}" && screwPumpDeviceInfoHandsontableHelper.validresult) {
            	var orgArr=leftOrg_Name.split(",");
            	var saveData={};
            	saveData.updatelist=[];
            	saveData.insertlist=[];
            	saveData.delidslist=screwPumpDeviceInfoHandsontableHelper.delidslist;
            	
            	var invalidData1=[];
            	var invalidData2=[];
            	var invalidDataInfo="";
            	if(screwPumpDeviceInfoHandsontableHelper.AllData.updatelist!=undefined && screwPumpDeviceInfoHandsontableHelper.AllData.updatelist.length>0){
                	for(var i=0;i<screwPumpDeviceInfoHandsontableHelper.AllData.updatelist.length;i++){
                		var orgName=screwPumpDeviceInfoHandsontableHelper.AllData.updatelist[i].orgName;
                		var diveceName=screwPumpDeviceInfoHandsontableHelper.AllData.updatelist[i].wellName;
                		if(isNotVal(diveceName)){
                			var orgCount=isExist(orgArr,orgName);
                    		if(orgCount>1){//所选组织下具有多个同名组织
                    			invalidData1.push(screwPumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    			invalidDataInfo+="设备<font color=red>"+diveceName+"</font>所填写单位不唯一,保存失败,<font color=red>"+orgArr[0]+"</font>下有<font color=red>"+orgCount+"</font>个<font color=red>"+orgName+"</font>,请选择对应单位后再进行操作;<br/>";
                    		}else if(orgCount===1){//所选组织下无重复组织
                    			saveData.updatelist.push(screwPumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    		}else{//不具备所填写组织权限
                    			invalidData2.push(screwPumpDeviceInfoHandsontableHelper.AllData.updatelist[i]);
                    			invalidDataInfo+="无权限修改设备<font color=red>"+diveceName+"</font>所填写单位("+orgName+")下的数据，请核对单位信息;<br/>";
                    		}
                		}
                	}
                }
            	if(screwPumpDeviceInfoHandsontableHelper.AllData.insertlist!=undefined && screwPumpDeviceInfoHandsontableHelper.AllData.insertlist.length>0){
                	for(var i=0;i<screwPumpDeviceInfoHandsontableHelper.AllData.insertlist.length;i++){
                		var orgName=screwPumpDeviceInfoHandsontableHelper.AllData.insertlist[i].orgName;
                		var diveceName=screwPumpDeviceInfoHandsontableHelper.AllData.insertlist[i].wellName;
                		if(isNotVal(diveceName)){
                			var orgCount=isExist(orgArr,orgName);
                    		if(orgCount>1){//所选组织下具有多个同名组织
                    			invalidData1.push(screwPumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    			invalidDataInfo+="设备<font color=red>"+diveceName+"</font>所填写单位不唯一,保存失败,<font color=red>"+orgArr[0]+"</font>下有<font color=red>"+orgCount+"</font>个<font color=red>"+orgName+"</font>,请选择对应单位后再进行操作;<br/>";
                    		}else if(orgCount===1){//所选组织下无重复组织
                    			saveData.insertlist.push(screwPumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
                    		}else{//不具备所填写组织权限
                    			invalidData2.push(screwPumpDeviceInfoHandsontableHelper.AllData.insertlist[i]);
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
                            screwPumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadScrewPumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        screwPumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(saveData),
                        deviceAuxiliaryData: JSON.stringify(deviceAuxiliaryData),
                        orgId: leftOrg_Id,
                        deviceType: 102
                    }
                });
            } else {
                if (!screwPumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        
            
            

        }

        //修改井名
        screwPumpDeviceInfoHandsontableHelper.editWellName = function () {
            //插入的数据的获取

            if (screwPumpDeviceInfoHandsontableHelper.editWellNameList.length > 0 && screwPumpDeviceInfoHandsontableHelper.validresult) {
                //	            	alert(JSON.stringify(screwPumpDeviceInfoHandsontableHelper.editWellNameList));
                Ext.Ajax.request({
                    method: 'POST',
                    url: context + '/wellInformationManagerController/editWellName',
                    success: function (response) {
                        rdata = Ext.JSON.decode(response.responseText);
                        if (rdata.success) {
                            Ext.MessageBox.alert("信息", "保存成功");
                            screwPumpDeviceInfoHandsontableHelper.clearContainer();
                            CreateAndLoadScrewPumpDeviceInfoTable();
                        } else {
                            Ext.MessageBox.alert("信息", "数据保存失败");

                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert("信息", "请求失败");
                        screwPumpDeviceInfoHandsontableHelper.clearContainer();
                    },
                    params: {
                        data: JSON.stringify(screwPumpDeviceInfoHandsontableHelper.editWellNameList),
                        deviceType:102
                    }
                });
            } else {
                if (!screwPumpDeviceInfoHandsontableHelper.validresult) {
                    Ext.MessageBox.alert("信息", "数据类型错误");
                } else {
                    Ext.MessageBox.alert("信息", "无数据变化");
                }
            }
        }


        //删除的优先级最高
        screwPumpDeviceInfoHandsontableHelper.delExpressCount = function (ids) {
            //传入的ids.length不可能为0
            $.each(ids, function (index, id) {
                if (id != null) {
                    screwPumpDeviceInfoHandsontableHelper.delidslist.push(id);
                }
            });
            screwPumpDeviceInfoHandsontableHelper.AllData.delidslist = screwPumpDeviceInfoHandsontableHelper.delidslist;
        }

        //updatelist数据更新
        screwPumpDeviceInfoHandsontableHelper.screening = function () {
            if (screwPumpDeviceInfoHandsontableHelper.updatelist.length != 0 && screwPumpDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
                for (var i = 0; i < screwPumpDeviceInfoHandsontableHelper.delidslist.length; i++) {
                    for (var j = 0; j < screwPumpDeviceInfoHandsontableHelper.updatelist.length; j++) {
                        if (screwPumpDeviceInfoHandsontableHelper.updatelist[j].id == screwPumpDeviceInfoHandsontableHelper.delidslist[i]) {
                            //更新updatelist
                            screwPumpDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
                        }
                    }
                }
                //把updatelist封装进AllData
                screwPumpDeviceInfoHandsontableHelper.AllData.updatelist = screwPumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        //更新数据
        screwPumpDeviceInfoHandsontableHelper.updateExpressCount = function (data) {
            if (JSON.stringify(data) != "{}") {
                var flag = true;
                //判断记录是否存在,更新数据     
                $.each(screwPumpDeviceInfoHandsontableHelper.updatelist, function (index, node) {
                    if (node.id == data.id) {
                        //此记录已经有了
                        flag = false;
                        //用新得到的记录替换原来的,不用新增
                        screwPumpDeviceInfoHandsontableHelper.updatelist[index] = data;
                    }
                });
                flag && screwPumpDeviceInfoHandsontableHelper.updatelist.push(data);
                //封装
                screwPumpDeviceInfoHandsontableHelper.AllData.updatelist = screwPumpDeviceInfoHandsontableHelper.updatelist;
            }
        }

        screwPumpDeviceInfoHandsontableHelper.clearContainer = function () {
            screwPumpDeviceInfoHandsontableHelper.AllData = {};
            screwPumpDeviceInfoHandsontableHelper.updatelist = [];
            screwPumpDeviceInfoHandsontableHelper.delidslist = [];
            screwPumpDeviceInfoHandsontableHelper.insertlist = [];
            screwPumpDeviceInfoHandsontableHelper.editWellNameList = [];
        }

        return screwPumpDeviceInfoHandsontableHelper;
    }
};

function CreateAndLoadScrewPumpAuxiliaryDeviceInfoTable(screwPumpDeviceName,isNew){
	if(isNew&&screwPumpAuxiliaryDeviceInfoHandsontableHelper!=null){
		if(screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot!=undefined){
			screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot.destroy();
		}
		screwPumpAuxiliaryDeviceInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getAuxiliaryDevice',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(screwPumpDeviceName)){
				screwPumpDeviceName='';
			}
			Ext.getCmp("ScrewPumpAuxiliaryDevicePanel_Id").setTitle(screwPumpDeviceName+"辅件设备列表");
			if(screwPumpAuxiliaryDeviceInfoHandsontableHelper==null || screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot==undefined){
				screwPumpAuxiliaryDeviceInfoHandsontableHelper = ScrewPumpAuxiliaryDeviceInfoHandsontableHelper.createNew("ScrewPumpAuxiliaryDeviceTableDiv_id");
				var colHeaders="['','序号','名称','规格型号','']";
				var columns="[{data:'checked',type:'checkbox'},{data:'id'},{data:'name'},{data:'model'},{data:'realId'}]";
				
				screwPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				screwPumpAuxiliaryDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					screwPumpAuxiliaryDeviceInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					screwPumpAuxiliaryDeviceInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:screwPumpDeviceName,
			deviceType:102
        }
	});
};

var ScrewPumpAuxiliaryDeviceInfoHandsontableHelper = {
		createNew: function (divid) {
	        var screwPumpAuxiliaryDeviceInfoHandsontableHelper = {};
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot1 = '';
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.divid = divid;
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders=[];
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.columns=[];
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.AllData=[];
	        
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.addBoldBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(184, 184, 184)';
	        }
	        
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+screwPumpAuxiliaryDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+screwPumpAuxiliaryDeviceInfoHandsontableHelper.divid);
	        	screwPumpAuxiliaryDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	        		hiddenColumns: {
	                    columns: [4],
	                    indicators: true
	                },
	        		colWidths: [25,50,80,80],
	                columns:screwPumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                columns:screwPumpAuxiliaryDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: false,//显示行头
	                colHeaders:screwPumpAuxiliaryDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.saveData = function () {}
	        screwPumpAuxiliaryDeviceInfoHandsontableHelper.clearContainer = function () {
	        	screwPumpAuxiliaryDeviceInfoHandsontableHelper.AllData = [];
	        }
	        return screwPumpAuxiliaryDeviceInfoHandsontableHelper;
	    }
};

function CreateAndLoadScrewPumpAdditionalInfoTable(screwPumpDeviceName,isNew){
	if(isNew&&screwPumpAdditionalInfoHandsontableHelper!=null){
		if(screwPumpAdditionalInfoHandsontableHelper.hot!=undefined){
			screwPumpAdditionalInfoHandsontableHelper.hot.destroy();
		}
		screwPumpAdditionalInfoHandsontableHelper=null;
	}
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/getDeviceAdditionalInfo',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(!isNotVal(screwPumpDeviceName)){
				screwPumpDeviceName='';
			}
			Ext.getCmp("ScrewPumpAdditionalInfoPanel_Id").setTitle(screwPumpDeviceName+"附加信息");
			if(screwPumpAdditionalInfoHandsontableHelper==null || screwPumpAdditionalInfoHandsontableHelper.hot==undefined){
				screwPumpAdditionalInfoHandsontableHelper = ScrewPumpAdditionalInfoHandsontableHelper.createNew("ScrewPumpAdditionalInfoTableDiv_id");
				var colHeaders="['序号','名称','值','单位']";
				var columns="[{data:'id'},{data:'itemName'},{data:'itemValue'},{data:'itemUnit'}]";
				
				screwPumpAdditionalInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
				screwPumpAdditionalInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				if(result.totalRoot.length==0){
					screwPumpAdditionalInfoHandsontableHelper.createTable([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					screwPumpAdditionalInfoHandsontableHelper.createTable(result.totalRoot);
				}
			}else{
				if(result.totalRoot.length==0){
					screwPumpAdditionalInfoHandsontableHelper.hot.loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
				}else{
					screwPumpAdditionalInfoHandsontableHelper.hot.loadData(result.totalRoot);
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			deviceName:screwPumpDeviceName,
			deviceType:102
        }
	});
};

var ScrewPumpAdditionalInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var screwPumpAdditionalInfoHandsontableHelper = {};
	        screwPumpAdditionalInfoHandsontableHelper.hot = '';
	        screwPumpAdditionalInfoHandsontableHelper.divid = divid;
	        screwPumpAdditionalInfoHandsontableHelper.colHeaders = [];
	        screwPumpAdditionalInfoHandsontableHelper.columns = [];
	        screwPumpAdditionalInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	            Handsontable.renderers.TextRenderer.apply(this, arguments);
	            td.style.backgroundColor = 'rgb(242, 242, 242)';
	        }

	        screwPumpAdditionalInfoHandsontableHelper.createTable = function (data) {
	            $('#' + screwPumpAdditionalInfoHandsontableHelper.divid).empty();
	            var hotElement = document.querySelector('#' + screwPumpAdditionalInfoHandsontableHelper.divid);
	            screwPumpAdditionalInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	                data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: true
	                },
	                columns: screwPumpAdditionalInfoHandsontableHelper.columns,
	                stretchH: 'all', //延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true, //显示行头
	                colHeaders: screwPumpAdditionalInfoHandsontableHelper.colHeaders, //显示列头
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
	        return screwPumpAdditionalInfoHandsontableHelper;
	    }
	};