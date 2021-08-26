var pipelineDeviceInfoHandsontableHelper=null;
Ext.define('AP.view.well.PipelineDeviceInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pipelineDeviceInfoPanel',
    id: 'PipelineDeviceInfoPanel_Id',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var pipelineCombStore = new Ext.data.JsonStore({
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
                    var wellName = Ext.getCmp('tbuingDeviceComb_Id').getValue();
                    var new_params = {
                        orgId: leftOrg_Id,
                        deviceType: 1,
                        wellName: wellName
                    };
                    Ext.apply(store.proxy.extraParams,new_params);
                }
            }
        });
        
        var pipelineCombo = Ext.create(
            'Ext.form.field.ComboBox', {
                fieldLabel: cosog.string.wellName,
                id: "tbuingDeviceComb_Id",
                labelWidth: 35,
                width: 145,
                labelAlign: 'left',
                queryMode: 'remote',
                typeAhead: true,
                store: pipelineCombStore,
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
                        pipelineCombo.getStore().loadPage(1); // 加载井下拉框的store
                    },
                    afterRender: function (combo, o) {
                        if (pipelineCombStore.getTotalCount() > 0) {
                            var boxkey = pipelineCombStore.data.items[0].data.boxkey;
                            var boxval = pipelineCombStore.data.items[0].data.boxval;
                            combo.setValue(boxkey);
                            combo.setRawValue(boxval);
                        }
                    },
                    select: function (combo, record, index) {
                        try {
                        	CreateAndLoadPipelineDeviceInfoTable();
                        } catch (ex) {
                            Ext.Msg.alert(cosog.string.tips, cosog.string.fail);
                        }
                    }
                }
            });
        
        Ext.apply(this, {
            tbar: [pipelineCombo,'-', {
                		id: 'PipelineDeviceTotalCount_Id',
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
            				var wellInformationName = Ext.getCmp('tbuingDeviceComb_Id').getValue();
            				var url=context + '/wellInformationManagerController/exportWellInformationData';
            				for(var i=0;i<pipelineDeviceInfoHandsontableHelper.colHeaders.length;i++){
            					fields+=pipelineDeviceInfoHandsontableHelper.columns[i].data+",";
            					heads+=pipelineDeviceInfoHandsontableHelper.colHeaders[i]+","
            				}
            				if (isNotVal(fields)) {
            			        fields = fields.substring(0, fields.length - 1);
            			        heads = heads.substring(0, heads.length - 1);
            			    }
            				
            			    var param = "&fields=" + fields +"&heads=" + URLencode(URLencode(heads)) + "&orgId=" + leftOrg_Id+ "&deviceType=1&wellInformationName=" + URLencode(URLencode(wellInformationName)) +"&recordCount=10000"+ "&fileName="+URLencode(URLencode("管设备"))+ "&title="+URLencode(URLencode("管设备"));
            			    openExcelWindow(url + '?flag=true' + param);
            			}
            		},'-',{
                        xtype: 'button',
                        iconCls: 'note-refresh',
                        text: cosog.string.refresh,
                        pressed: true,
                        hidden:false,
                        handler: function (v, o) {
                        	CreateAndLoadPipelineDeviceInfoTable();
                        }
                    
            		},'-', {
            			xtype: 'button',
            			itemId: 'savePipelineDeviceDataBtnId',
            			id: 'savePipelineDeviceDataBtn_Id',
            			disabled: false,
            			hidden:false,
            			pressed: true,
            			text: cosog.string.save,
            			iconCls: 'save',
            			handler: function (v, o) {
            				pipelineDeviceInfoHandsontableHelper.saveData();
            			}
            		},'-', {
            			xtype: 'button',
            			itemId: 'editPipelineDeviceNameBtnId',
            			id: 'editPipelineDeviceNameBtn_Id',
            			disabled: false,
            			hidden:false,
            			pressed: true,
            			text: '修改设备名称',
            			iconCls: 'edit',
            			handler: function (v, o) {
            				pipelineDeviceInfoHandsontableHelper.editWellName();
            			}
            		}],
            		html:'<div class="PipelineDeviceContainer" style="width:100%;height:100%;"><div class="con" id="PipelineDeviceTableDiv_id"></div></div>',
                    listeners: {
                        resize: function (abstractcomponent, adjWidth, adjHeight, options) {
                        	if(pipelineDeviceInfoHandsontableHelper!=null&&pipelineDeviceInfoHandsontableHelper.hot!=null&&pipelineDeviceInfoHandsontableHelper.hot!=undefined){
                        		CreateAndLoadPipelineDeviceInfoTable();
                        	}
                        }
                    }
        })
        this.callParent(arguments);
    }
});
function CreateAndLoadPipelineDeviceInfoTable(isNew){
//	if(isNew&&pipelineDeviceInfoHandsontableHelper!=null){
//        pipelineDeviceInfoHandsontableHelper.clearContainer();
//        pipelineDeviceInfoHandsontableHelper.hot.destroy();
//        pipelineDeviceInfoHandsontableHelper=null;
//	}
	var leftOrg_Id = Ext.getCmp('leftOrg_Id').getValue();
	var wellInformationName_Id = Ext.getCmp('tbuingDeviceComb_Id').getValue();
	Ext.Ajax.request({
		method:'POST',
		url:context + '/wellInformationManagerController/doWellInformationShow',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			if(pipelineDeviceInfoHandsontableHelper==null||pipelineDeviceInfoHandsontableHelper.hot==null||pipelineDeviceInfoHandsontableHelper.hot==undefined){
				pipelineDeviceInfoHandsontableHelper = PipelineDeviceInfoHandsontableHelper.createNew("PipelineDeviceTableDiv_id");
				var colHeaders="[";
		        var columns="[";
		       
	            for(var i=0;i<result.columns.length;i++){
	            	colHeaders+="'"+result.columns[i].header+"'";
	            	if(result.columns[i].dataIndex.toUpperCase()==="orgName".toUpperCase()){
	            		columns+="{data:'"+result.columns[i].dataIndex+"',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Org(val, callback,this.row, this.col,pipelineDeviceInfoHandsontableHelper);}}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="liftingTypeName".toUpperCase()){
	            		if(pcpHidden){
	            			columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机']}";
	            		}else{
	            			columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:['抽油机', '螺杆泵']}";
	            		}
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="protocol".toUpperCase()){
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:['modbus-tcp', 'modbus-rtu']}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="protocolName".toUpperCase()){
	            		var source="[";
	            		for(var j=0;j<result.driverDropdownData.length;j++){
	            			source+="\'"+result.driverDropdownData[j]+"\'";
	            			if(j<result.driverDropdownData.length-1){
	            				source+=",";
	            			}
	            		}
	            		source+="]";
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:"+source+"}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="acquisitionUnit".toUpperCase()){
	            		var source="[";
	            		for(var j=0;j<result.unitDropdownData.length;j++){
	            			source+="\'"+result.unitDropdownData[j]+"\'";
	            			if(j<result.unitDropdownData.length-1){
	            				source+=",";
	            			}
	            		}
	            		source+="]";
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'dropdown',strict:true,allowInvalid:false,source:"+source+"}";
	            	}else if(result.columns[i].dataIndex.toUpperCase()==="sortNum".toUpperCase()){
	            		columns+="{data:'"+result.columns[i].dataIndex+"',type:'text',allowInvalid: true, validator: function(val, callback){return handsontableDataCheck_Num_Nullable(val, callback,this.row, this.col,pipelineDeviceInfoHandsontableHelper);}}";
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
	        	pipelineDeviceInfoHandsontableHelper.colHeaders=Ext.JSON.decode(colHeaders);
	        	pipelineDeviceInfoHandsontableHelper.columns=Ext.JSON.decode(columns);
				pipelineDeviceInfoHandsontableHelper.createTable(result.totalRoot);
			}else{
				pipelineDeviceInfoHandsontableHelper.hot.loadData(result.totalRoot);
			}
			Ext.getCmp("PipelineDeviceTotalCount_Id").update({count: result.totalCount});
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
            wellInformationName: wellInformationName_Id,
            deviceType:1,
            recordCount:50,
            orgId:leftOrg_Id,
            page:1,
            limit:10000
        }
	});
};

var PipelineDeviceInfoHandsontableHelper = {
	    createNew: function (divid) {
	        var pipelineDeviceInfoHandsontableHelper = {};
	        pipelineDeviceInfoHandsontableHelper.hot = '';
	        pipelineDeviceInfoHandsontableHelper.divid = divid;
	        pipelineDeviceInfoHandsontableHelper.validresult=true;//数据校验
	        pipelineDeviceInfoHandsontableHelper.colHeaders=[];
	        pipelineDeviceInfoHandsontableHelper.columns=[];
	        
	        pipelineDeviceInfoHandsontableHelper.AllData={};
	        pipelineDeviceInfoHandsontableHelper.updatelist=[];
	        pipelineDeviceInfoHandsontableHelper.delidslist=[];
	        pipelineDeviceInfoHandsontableHelper.insertlist=[];
	        pipelineDeviceInfoHandsontableHelper.editWellNameList=[];
	        
	        pipelineDeviceInfoHandsontableHelper.addColBg = function (instance, td, row, col, prop, value, cellProperties) {
	             Handsontable.renderers.TextRenderer.apply(this, arguments);
	             td.style.backgroundColor = 'rgb(242, 242, 242)';    
	        }
	        
	        pipelineDeviceInfoHandsontableHelper.createTable = function (data) {
	        	$('#'+pipelineDeviceInfoHandsontableHelper.divid).empty();
	        	var hotElement = document.querySelector('#'+pipelineDeviceInfoHandsontableHelper.divid);
	        	pipelineDeviceInfoHandsontableHelper.hot = new Handsontable(hotElement, {
	        		data: data,
	                hiddenColumns: {
	                    columns: [0],
	                    indicators: true
	                },
	                columns:pipelineDeviceInfoHandsontableHelper.columns,
	                stretchH: 'all',//延伸列的宽度, last:延伸最后一列,all:延伸所有列,none默认不延伸
	                autoWrapRow: true,
	                rowHeaders: true,//显示行头
	                colHeaders:pipelineDeviceInfoHandsontableHelper.colHeaders,//显示列头
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
	                            var rowdata = pipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
	                            ids.push(rowdata[0]);
	                        }
	                        pipelineDeviceInfoHandsontableHelper.delExpressCount(ids);
	                        pipelineDeviceInfoHandsontableHelper.screening();
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
			                        var rowdata = pipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(index);
			                        params.push(rowdata[0]);
			                        params.push(changes[i][1]);
			                        params.push(changes[i][2]);
			                        params.push(changes[i][3]);
			                        
			                        if("edit"==source&&params[1]=="wellName"){//编辑井号单元格
			                        	var data="{\"oldWellName\":\""+params[2]+"\",\"newWellName\":\""+params[3]+"\"}";
			                        	pipelineDeviceInfoHandsontableHelper.editWellNameList.push(Ext.JSON.decode(data));
			                        }
			                        
			                        if(params[1]=="protocolName" && params[3]=="Kafka协议"){
			                        	pipelineDeviceInfoHandsontableHelper.hot.getCell(index, 6).source=['modbus-tcp','modbus-rtu'];
			                        }

			                        //仅当单元格发生改变的时候,id!=null,说明是更新
			                        if (params[2] != params[3] && params[0] != null && params[0] >0) {
			                        	var data="{";
			                        	for(var j=0;j<pipelineDeviceInfoHandsontableHelper.columns.length;j++){
			                        		data+=pipelineDeviceInfoHandsontableHelper.columns[j].data+":'"+rowdata[j]+"'";
			                        		if(j<pipelineDeviceInfoHandsontableHelper.columns.length-1){
			                        			data+=","
			                        		}
			                        	}
			                        	data+="}"
			                            pipelineDeviceInfoHandsontableHelper.updateExpressCount(Ext.JSON.decode(data));
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
	        pipelineDeviceInfoHandsontableHelper.insertExpressCount=function() {
	            var idsdata = pipelineDeviceInfoHandsontableHelper.hot.getDataAtCol(0); //所有的id
	            for (var i = 0; i < idsdata.length; i++) {
	                //id=null时,是插入数据,此时的i正好是行号
	                if (idsdata[i] == null||idsdata[i]<0) {
	                    //获得id=null时的所有数据封装进data
	                    var rowdata = pipelineDeviceInfoHandsontableHelper.hot.getDataAtRow(i);
	                    //var collength = hot.countCols();
	                    if (rowdata != null) {
	                    	var data="{";
                        	for(var j=0;j<pipelineDeviceInfoHandsontableHelper.columns.length;j++){
                        		data+=pipelineDeviceInfoHandsontableHelper.columns[j].data+":'"+rowdata[j]+"'";
                        		if(j<pipelineDeviceInfoHandsontableHelper.columns.length-1){
                        			data+=","
                        		}
                        	}
                        	data+="}"
	                        pipelineDeviceInfoHandsontableHelper.insertlist.push(Ext.JSON.decode(data));
	                    }
	                }
	            }
	            if (pipelineDeviceInfoHandsontableHelper.insertlist.length != 0) {
	            	pipelineDeviceInfoHandsontableHelper.AllData.insertlist = pipelineDeviceInfoHandsontableHelper.insertlist;
	            }
	        }
	        //保存数据
	        pipelineDeviceInfoHandsontableHelper.saveData = function () {
	        	var IframeViewSelection  = Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
	        	if(IframeViewSelection.length>0&&IframeViewSelection[0].isLeaf()){
	        		//插入的数据的获取
		        	pipelineDeviceInfoHandsontableHelper.insertExpressCount();
		        	var orgId=IframeViewSelection[0].data.orgId;
		            if (JSON.stringify(pipelineDeviceInfoHandsontableHelper.AllData) != "{}" && pipelineDeviceInfoHandsontableHelper.validresult) {
		            	Ext.Ajax.request({
		            		method:'POST',
		            		url:context + '/wellInformationManagerController/saveWellHandsontableData',
		            		success:function(response) {
		            			rdata=Ext.JSON.decode(response.responseText);
		            			if (rdata.success) {
		                        	Ext.MessageBox.alert("信息","保存成功");
		                            //保存以后重置全局容器
		                            pipelineDeviceInfoHandsontableHelper.clearContainer();
		                            CreateAndLoadPipelineDeviceInfoTable();
		                        } else {
		                        	Ext.MessageBox.alert("信息","数据保存失败");

		                        }
		            		},
		            		failure:function(){
		            			Ext.MessageBox.alert("信息","请求失败");
		                        pipelineDeviceInfoHandsontableHelper.clearContainer();
		            		},
		            		params: {
		                    	data: JSON.stringify(pipelineDeviceInfoHandsontableHelper.AllData),
		                    	orgId:orgId,
		                    	deviceType:1
		                    }
		            	}); 
		            } else {
		                if (!pipelineDeviceInfoHandsontableHelper.validresult) {
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
	        pipelineDeviceInfoHandsontableHelper.editWellName = function () {
	            //插入的数据的获取
	        	
	            if (pipelineDeviceInfoHandsontableHelper.editWellNameList.length>0 && pipelineDeviceInfoHandsontableHelper.validresult) {
//	            	alert(JSON.stringify(pipelineDeviceInfoHandsontableHelper.editWellNameList));
	            	Ext.Ajax.request({
	            		method:'POST',
	            		url:context + '/wellInformationManagerController/editWellName',
	            		success:function(response) {
	            			rdata=Ext.JSON.decode(response.responseText);
	            			if (rdata.success) {
	                        	Ext.MessageBox.alert("信息","保存成功");
	                            pipelineDeviceInfoHandsontableHelper.clearContainer();
	                            CreateAndLoadPipelineDeviceInfoTable();
	                        } else {
	                        	Ext.MessageBox.alert("信息","数据保存失败");

	                        }
	            		},
	            		failure:function(){
	            			Ext.MessageBox.alert("信息","请求失败");
	                        pipelineDeviceInfoHandsontableHelper.clearContainer();
	            		},
	            		params: {
	                    	data: JSON.stringify(pipelineDeviceInfoHandsontableHelper.editWellNameList)
	                    }
	            	}); 
	            } else {
	                if (!pipelineDeviceInfoHandsontableHelper.validresult) {
	                	Ext.MessageBox.alert("信息","数据类型错误");
	                } else {
	                	Ext.MessageBox.alert("信息","无数据变化");
	                }
	            }
	        }
	        
	        
	      //删除的优先级最高
	        pipelineDeviceInfoHandsontableHelper.delExpressCount=function(ids) {
	            //传入的ids.length不可能为0
	            $.each(ids, function (index, id) {
	                if (id != null) {
	                	pipelineDeviceInfoHandsontableHelper.delidslist.push(id);
	                }
	            });
	            pipelineDeviceInfoHandsontableHelper.AllData.delidslist = pipelineDeviceInfoHandsontableHelper.delidslist;
	        }

	        //updatelist数据更新
	        pipelineDeviceInfoHandsontableHelper.screening=function() {
	            if (pipelineDeviceInfoHandsontableHelper.updatelist.length != 0 && pipelineDeviceInfoHandsontableHelper.delidslist.lentgh != 0) {
	                for (var i = 0; i < pipelineDeviceInfoHandsontableHelper.delidslist.length; i++) {
	                    for (var j = 0; j < pipelineDeviceInfoHandsontableHelper.updatelist.length; j++) {
	                        if (pipelineDeviceInfoHandsontableHelper.updatelist[j].id == pipelineDeviceInfoHandsontableHelper.delidslist[i]) {
	                            //更新updatelist
	                        	pipelineDeviceInfoHandsontableHelper.updatelist.splice(j, 1);
	                        }
	                    }
	                }
	                //把updatelist封装进AllData
	                pipelineDeviceInfoHandsontableHelper.AllData.updatelist = pipelineDeviceInfoHandsontableHelper.updatelist;
	            }
	        }
	        
	      //更新数据
	        pipelineDeviceInfoHandsontableHelper.updateExpressCount=function(data) {
	            if (JSON.stringify(data) != "{}") {
	                var flag = true;
	                //判断记录是否存在,更新数据     
	                $.each(pipelineDeviceInfoHandsontableHelper.updatelist, function (index, node) {
	                    if (node.id == data.id) {
	                        //此记录已经有了
	                        flag = false;
	                        //用新得到的记录替换原来的,不用新增
	                        pipelineDeviceInfoHandsontableHelper.updatelist[index] = data;
	                    }
	                });
	                flag && pipelineDeviceInfoHandsontableHelper.updatelist.push(data);
	                //封装
	                pipelineDeviceInfoHandsontableHelper.AllData.updatelist = pipelineDeviceInfoHandsontableHelper.updatelist;
	            }
	        }
	        
	        pipelineDeviceInfoHandsontableHelper.clearContainer = function () {
	        	pipelineDeviceInfoHandsontableHelper.AllData = {};
	        	pipelineDeviceInfoHandsontableHelper.updatelist = [];
	        	pipelineDeviceInfoHandsontableHelper.delidslist = [];
	        	pipelineDeviceInfoHandsontableHelper.insertlist = [];
	        	pipelineDeviceInfoHandsontableHelper.editWellNameList=[];
	        }
	        
	        return pipelineDeviceInfoHandsontableHelper;
	    }
};

