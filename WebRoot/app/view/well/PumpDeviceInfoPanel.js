var pumpDeviceInfoHandsontableHelper=null;
Ext.define('AP.view.well.PumpDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pumpDeviceInfoPanel',
    id: 'PumpDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
//        var wellStore = Ext.create('AP.store.well.WellInfoStore');
        var pumpCombStore = new Ext.data.JsonStore({
        	pageSize:defaultWellComboxSize,
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
                    var wellName = Ext.getCmp('pumpDeviceListComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 0,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pumpDeviceCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "pumpDeviceListComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: pumpCombStore,
                autoSelect: false,
                editable: true,
                triggerAction: 'all',
                displayField: "boxval",
                valueField: "boxkey",
                pageSize:comboxPagingStatus,
                minChars:0,
                emptyText: cosog.string.all,
                blankText: cosog.string.all,
                listeners: {
                    expand: function (sm, selections) {
                        pumpDeviceCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    select: function (combo, record, index) {
                        try {
                        	CreateAndLoadPumpDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        Ext.apply(this, {
            tbar: [pumpDeviceCombo,'-', {
                		id: 'PumoDeviceTotalCount_Id',
                		xtype: 'component',
                		hidden: false,
                		tpl: cosog.string.totalCount + ': {count}',
                		style: 'margin-right:15px'
    				}, '->', {
            			xtype: 'button',
            			text: cosog.string.exportExcel,
                        pressed: true,
            			hidden:false,
            			handler: function (v, o) {
            				var fields = "";
            			    var heads = "";
            			    var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
            				var wellInformationName = Ext.getCmp('pumpDeviceListComb_Id').getValue();
            				var url=context + '/wellInformationManagerController/exportWellInformationData';
            				for(var i=0;i<pumpDeviceInfoHandsontableHelper.colHeaders.length;i++){
            					fields+=pumpDeviceInfoHandsontableHelper.columns[i].data+",";
            					heads+=pumpDeviceInfoHandsontableHelper.colHeaders[i]+","
            				}
            				if (isNotVal(fields)) {
            			        fields = fields.substring(0, fields.length - 1);
            			        heads = heads.substring(0, heads.length - 1);
            			    }
            				
            			    var param = "&fields=" + fields +"&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id+ "&deviceType=0&wellInformationName=" + URLencode(URLencode(wellInformationName)) +"&recordCount=10000"+ "&fileName="+URLencode(URLencode("泵设备"))+ "&title="+URLencode(URLencode("泵设备"));
            			    openExcelWindow(url + '?flag=true' + param);
            			}
            		},'-',{
                        xtype: 'button',
                        iconCls: 'note-refresh',
                        text: cosog.string.refresh,
                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        	CreateAndLoadPumpDeviceInfoTable();
                        }
                    
            		},'-', {
            			xtype: 'button',
            			itemId: 'savePumpDeviceDataBtnId',
            			id: 'savePumpDeviceDataBtn_Id',
            			disabled: false,
            			hidden:false,
            			pressed: true,
            			text: cosog.string.save,
            			iconCls: 'save',
            			handler: function (v, o) {
            				pumpDeviceInfoHandsontableHelper.saveData();
            			}
            		},'-', {
            			xtype: 'button',
            			itemId: 'editPumpDeviceNameBtnId',
            			id: 'editPumpDeviceNameBtn_Id',
            			disabled: false,
            			hidden:false,
            			pressed: true,
            			text: '修改设备名称',
            			iconCls: 'edit',
            			handler: function (v, o) {
            				pumpDeviceInfoHandsontableHelper.editWellName();
            			}
            		}],
            		html:'<div class="PumpDeviceContainer" style="width:100%;height:100%;"><div class="con" id="PumpDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if(pumpDeviceInfoHandsontableHelper!=null&&pumpDeviceInfoHandsontableHelper.hot!=null&&pumpDeviceInfoHandsontableHelper.hot!=undefined){
                        		CreateAndLoadPumpDeviceInfoTable();
                        	}
                        }
                    }
        })
        this.callParent(arguments);
    }
});
function CreateAndLoadPumpDeviceInfoTable(isNew){
//	if(isNew&&pumpDeviceInfoHandsontableHelper!=null){
//        pumpDeviceInfoHandsontableHelper.clearContainer();
//        pumpDeviceInfoHandsontableHelper.hot.destroy();
//        pumpDeviceInfoHandsontableHelper=null;
//	}
	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
	var wellInformationName_Id = Ext.getCmp('pumpDeviceListComb_Id').getValue();
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/doWellInformationShow',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(pumpDeviceInfoHandsontableHelper==null||pumpDeviceInfoHandsontableHelper.hot==null||pumpDeviceInfoHandsontableHelper.hot==undefined){
				pumpDeviceInfoHandsontableHelper = PumpDeviceInfoHandsontableHelper.createNew("PumpDeviceTableDiv_id");
				var colHeaders="[";
		        var columns="[";
		       
	            for(var i=0;i<result.columns.length;i++){
	            	colHeaders+="'"+result.columns[i].header+"'";
	            	if(result.columns[i].dataIndex.toUpperCase()==="orgName".toUpperCase()){
	            		columns+="{data:'"+result.columns[i].dataIndex+"',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,pumpDeviceInfoHandsontableHelper);}}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="liftingTypeName".toUpperCase()){
	            		if(pcpHidden){
	            			columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机']}";
	            		}else{
	            			columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机', '螺杆泵']}";
	            		}
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="instanceName".toUpperCase()){
	            		var source="[";
	            		for(var j=0;j<result.instanceDropdownData.length;j++){
	            			source+="\'"+result.instanceDropdownData[j]+"\'";
	            			if(j<result.instanceDropdownData.length-1){
	            				source+=",";
	            			}
	            		}
	            		source+="]";
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:"+source+"}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="alarmInstanceName".toUpperCase()){
	            		var source="[";
	            		for(var j=0;j<result.alarmInstanceDropdownData.length;j++){
	            			source+="\'"+result.alarmInstanceDropdownData[j]+"\'";
	            			if(j<result.alarmInstanceDropdownData.length-1){
	            				source+=",";
	            			}
	            		}
	            		source+="]";
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:"+source+"}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="sortNum".toUpperCase()){
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,pumpDeviceInfoHandsontableHelper);}}";
	            	}else{
	            		columns+="{data:'"+result.columns[i].dataIndex+"'}";
	            	}
	            	if(i<result.columns.length-1){
	            		colHeaders+=",";
	                	columns+=",";
	            	}
	            }
	            colHeaders+="]";
	        	columns+="]";
	        	pumpDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
	        	pumpDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				pumpDeviceInfoHandsontableHelper.createTable(result.totalRoot);
			}else{
				pumpDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
			Ext.getCmp("PumoDeviceTotalCount_Id").update({count: result.totalCount});
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
            wellInformationName: wellInformationName_Id,
            deviceType: 0,
            recordCount:50,
            orgId:leftOrg_Id,
            page:1,
            limit:10000
        }
	});
};

var PumpDeviceInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var pumpDeviceInfoHandsontableHelper = {};
	        pumpDeviceInfoHandsontableHelper.hot = '';
	        pumpDeviceInfoHandsontableHelper.divid = divid;
	        pumpDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        pumpDeviceInfoHandsontableHelper.colHeaders=[];
	        pumpDeviceInfoHandsontableHelper.columns=[];
	        
	        pumpDeviceInfoHandsontableHelper.AllData={};
	        pumpDeviceInfoHandsontableHelper.updatelist=[];
	        pumpDeviceInfoHandsontableHelper.delidslist=[];
	        pumpDeviceInfoHandsontableHelper.insertlist=[];
	        pumpDeviceInfoHandsontableHelper.editWellNameList=[];
	        
	        pumpDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        pumpDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+pumpDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pumpDeviceInfoHandsontableHelper.divid);
	        	pumpDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: true
	                },
	                columns:pumpDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true,//显示行头
	                colHeaders:pumpDeviceInfoHandsontableHelper.colHeaders,//显示列头
	                columnSorting: true,//允许排序
//	                colWidths:[50,90,75, 80,100,70, 80,100,70, 140,120, 80,80,80,80,80, 80,80,80,80,80,  80,80,80,120, 80, 75],
//	                colWidths:50,
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
//	                	        return self.clipboardCache.length === 0;
	                	      },
	                	      callback: function() {
//	                	        var plugin = this.getPlugin('copyPaste');
//	                	        this.listen();
//	                	        plugin.paste(self.clipboardCache);
	                	      }
	                	    }
	                	}
	                },//右键菜单展示
	                sortIndicator: true,
	                manualColumnResize:true,//当值为true时，允许拖动，当为false时禁止拖动
	                manualRowResize:true,//当值为true时，允许拖动，当为false时禁止拖动
//	                dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
	                filters: true,
	                renderAllRows: true,
	                search: true,
	                cells: function (row, col, prop) {
	                	var cellProperties = {};
	                    var visualRowIndex = this.instance.toVisualRow(row);
	                    var visualColIndex = this.instance.toVisualColumn(col);
//	                    if (col === 12) {
//	                        this.type = 'dropdown';
//	                        this.source = ['人工录入','DI信号', '电参计算','转速计算' ];
//	                        this.strict = true;
//	                        this.allowInvalid = false;
//	                    }
//	                    if (col === 6) {
//	                        this.type = 'dropdown';
//	                        this.source = ['抽油机', '螺杆泵'];
//	                        this.strict = true;
//	                        this.allowInvalid = false;
//	                    }
	                },
	                afterDestroy: function() {
	                    // 移除事件
//	                    Handsontable.Dom.removeEvent(save, 'click', saveData);
//	                    loadDataTable();
	                },
	                beforeRemoveRow: function (index, amount) {
	                    var ids = [];
	                    //封装id成array传入后台
	                    if (amount != 0) {
	                        for (var i = index; i < amount + index; i++) {
	                            var rowdata = pumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
	                            ids.push(rowdata[0]);
	                        }
	                        pumpDeviceInfoHandsontableHelper.delExpressCount(ids);
	                        pumpDeviceInfoHandsontableHelper.screening();
	                    }
	                },
	                afterChange: function (changes, source) {
	                    //params 参数 1.column num , 2,id, 3,oldvalue , 4.newvalue
	    	        	if (changes != null) {
	    	        		var IframeViewSelection  = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
		    	        	if(IframeViewSelection.length>0&&IframeViewSelection[0].isLeaf()){
		    	        		for(var i=0;i<changes.length;i++){
		                    		var params = [];
		                    		var index = changes[i][0]; //行号码
			                        var rowdata = pumpDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
			                        params.push(rowdata[0]);
			                        params.push(changes[i][1]);
			                        params.push(changes[i][2]);
			                        params.push(changes[i][3]);
			                        
			                        if("edit"==source&&params[1]=="wellName"){//编辑井号单元格
			                        	var data="{\"oldWellName\":\""+params[2]+"\",\"newWellName\":\""+params[3]+"\"}";
			                        	pumpDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
			                        }
			                        
			                        if(params[1]=="protocolName" && params[3]=="Kafka协议"){
			                        	pumpDeviceInfoHandsontableHelper.hot.getCell(index, 6).source=['modbus-tcp','modbus-rtu'];
			                        }

			                        //仅当单元格发生改变的时候,id!=null,说明是更新
			                        if (params[2] != params[3] && params[0] != null && params[0] >0) {
			                        	var data="{";
			                        	for(var j=0;j<pumpDeviceInfoHandsontableHelper.columns.length;j++){
			                        		data+=pumpDeviceInfoHandsontableHelper.columns[j].data+":'"+rowdata[j]+"'";
			                        		if(j<pumpDeviceInfoHandsontableHelper.columns.length-1){
			                        			data+=","
			                        		}
			                        	}
			                        	data+="}"
			                            pumpDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
			                        }
		                    	}
		    	        	}else{
		    	        		Ext.MessageBox.alert("信息","编辑前，请先在左侧选择对应组织节点");
		    	        	}
	                    }
	                }
	        	});
	        }
	      //插入的数据的获取
	        pumpDeviceInfoHandsontableHelper.insertExpressCount=function() {
	            var idsdata = pumpDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
	            for (var i = 0; i < idsdata.length; i++) {
	                //id=null时,是插入数据,此时的i正好是行号
	                if (idsdata[i] == null||idsdata[i]<0) {
	                    //获得id=null时的所有数据封装进data
	                    var rowdata = pumpDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
	                    //var collength = hot.countCols();
	                    if (rowdata != null) {
	                    	var data="{";
                        	for(var j=0;j<pumpDeviceInfoHandsontableHelper.columns.length;j++){
                        		data+=pumpDeviceInfoHandsontableHelper.columns[j].data+":'"+rowdata[j]+"'";
                        		if(j<pumpDeviceInfoHandsontableHelper.columns.length-1){
                        			data+=","
                        		}
                        	}
                        	data+="}"
	                        pumpDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
	                    }
	                }
	            }
	            if (pumpDeviceInfoHandsontableHelper.insertlist.length != 0) {
	            	pumpDeviceInfoHandsontableHelper.AllData.insertlist = pumpDeviceInfoHandsontableHelper.insertlist;
	            }
	        }
	        //保存数据
	        pumpDeviceInfoHandsontableHelper.saveData = function () {
	        	var IframeViewSelection  = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
	        	if(IframeViewSelection.length>0&&IframeViewSelection[0].isLeaf()){
	        		//插入的数据的获取
		        	pumpDeviceInfoHandsontableHelper.insertExpressCount();
		        	var orgId=IframeViewSelection[0].data.orgId;
		            if (JSON.stringify(pumpDeviceInfoHandsontableHelper.AllData) != "{}" && pumpDeviceInfoHandsontableHelper.validresult) {
		            	Ext.Ajax.request({
		            		method:'POST',
		            		url:context + '/wellInformationManagerController/saveWellHandsontableData',
		            		success:function(response) {
		            			rdata=Ext.JSON.decode(response.responseText);
		            			if (rdata.success) {
		                        	Ext.MessageBox.alert("信息","保存成功");
		                            //保存以后重置全局容器
		                            pumpDeviceInfoHandsontableHelper.clearContainer();
		                            CreateAndLoadPumpDeviceInfoTable();
		                        } else {
		                        	Ext.MessageBox.alert("信息","数据保存失败");

		                        }
		            		},
		            		failure:function(){
		            			Ext.MessageBox.alert("信息","请求失败");
		                        pumpDeviceInfoHandsontableHelper.clearContainer();
		            		},
		            		params: {
		                    	data: JSON.stringify(pumpDeviceInfoHandsontableHelper.AllData),
		                    	orgId:orgId,
		                    	deviceType:0
		                    }
		            	}); 
		            } else {
		                if (!pumpDeviceInfoHandsontableHelper.validresult) {
		                	Ext.MessageBox.alert("信息","数据类型错误");
		                } else {
		                	Ext.MessageBox.alert("信息","无数据变化");
		                }
		            }
	        	}else{
	        		Ext.MessageBox.alert("信息","请先选择组织节点");
	        	}
	            
	        }
	        
	      //修改井名
	        pumpDeviceInfoHandsontableHelper.editWellName = function () {
	            //插入的数据的获取
	        	
	            if (pumpDeviceInfoHandsontableHelper.editWellNameList.length>0 && pumpDeviceInfoHandsontableHelper.validresult) {
//	            	alert(JSON.stringify(pumpDeviceInfoHandsontableHelper.editWellNameList));
	            	Ext.Ajax.request({
	            		method:'POST',
	            		url:context + '/wellInformationManagerController/editWellName',
	            		success:function(response) {
	            			rdata=Ext.JSON.decode(response.responseText);
	            			if (rdata.success) {
	                        	Ext.MessageBox.alert("信息","保存成功");
	                            pumpDeviceInfoHandsontableHelper.clearContainer();
	                            CreateAndLoadPumpDeviceInfoTable();
	                        } else {
	                        	Ext.MessageBox.alert("信息","数据保存失败");

	                        }
	            		},
	            		failure:function(){
	            			Ext.MessageBox.alert("信息","请求失败");
	                        pumpDeviceInfoHandsontableHelper.clearContainer();
	            		},
	            		params: {
	                    	data: JSON.stringify(pumpDeviceInfoHandsontableHelper.editWellNameList)
	                    }
	            	}); 
	            } else {
	                if (!pumpDeviceInfoHandsontableHelper.validresult) {
	                	Ext.MessageBox.alert("信息","数据类型错误");
	                } else {
	                	Ext.MessageBox.alert("信息","无数据变化");
	                }
	            }
	        }
	        
	        
	      //删除的优先级最高
	        pumpDeviceInfoHandsontableHelper.delExpressCount=function(ids) {
	            //传入的ids.length不可能为0
	            $.each(ids, function (index, id) {
	                if (id != null) {
	                	pumpDeviceInfoHandsontableHelper.delidslist.push(id);
	                }
	            });
	            pumpDeviceInfoHandsontableHelper.AllData.delidslist = pumpDeviceInfoHandsontableHelper.delidslist;
	        }

	        //updatelist数据更新
	        pumpDeviceInfoHandsontableHelper.screening=function() {
	            if (pumpDeviceInfoHandsontableHelper.updatelist.length != 0 && pumpDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
	                for (var i = 0; i < pumpDeviceInfoHandsontableHelper.delidslist.length; i++) {
	                    for (var j = 0; j < pumpDeviceInfoHandsontableHelper.updatelist.length; j++) {
	                        if (pumpDeviceInfoHandsontableHelper.updatelist[j].id == pumpDeviceInfoHandsontableHelper.delidslist[i]) {
	                            //更新updatelist
	                        	pumpDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
	                        }
	                    }
	                }
	                //把updatelist封装进AllData
	                pumpDeviceInfoHandsontableHelper.AllData.updatelist = pumpDeviceInfoHandsontableHelper.updatelist;
	            }
	        }
	        
	      //更新数据
	        pumpDeviceInfoHandsontableHelper.updateExpressCount=function(data) {
	            if (JSON.stringify(data) != "{}") {
	                var flag = true;
	                //判断记录是否存在,更新数据     
	                $.each(pumpDeviceInfoHandsontableHelper.updatelist, function (index, node) {
	                    if (node.id == data.id) {
	                        //此记录已经有了
	                        flag = false;
	                        //用新得到的记录替换原来的,不用新增
	                        pumpDeviceInfoHandsontableHelper.updatelist[index] = data;
	                    }
	                });
	                flag && pumpDeviceInfoHandsontableHelper.updatelist.push(data);
	                //封装
	                pumpDeviceInfoHandsontableHelper.AllData.updatelist = pumpDeviceInfoHandsontableHelper.updatelist;
	            }
	        }
	        
	        pumpDeviceInfoHandsontableHelper.clearContainer = function () {
	        	pumpDeviceInfoHandsontableHelper.AllData = {};
	        	pumpDeviceInfoHandsontableHelper.updatelist = [];
	        	pumpDeviceInfoHandsontableHelper.delidslist = [];
	        	pumpDeviceInfoHandsontableHelper.insertlist = [];
	        	pumpDeviceInfoHandsontableHelper.editWellNameList=[];
	        }
	        
	        return pumpDeviceInfoHandsontableHelper;
	    }
};

