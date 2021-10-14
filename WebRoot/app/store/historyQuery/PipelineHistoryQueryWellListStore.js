Ext.define('AP.store.historyQuery.PipelineHistoryQueryWellListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineHistoryQueryWellListStore',
    fields: ['id','commStatus','commStatusName','wellName'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/historyQueryController/getDeviceHistoryData',
        actionMethods: {
            read: 'POST'
        },
    reader: {
            type: 'json',
            rootProperty: 'totalRoot',
            totalProperty: 'totalCount',
            keepRawData: true
        }
    },
    listeners: {
        load: function (store, record, f, op, o) {
            //获得列表数
            var get_rawData = store.proxy.reader.rawData;
            var arrColumns = get_rawData.columns;
            var column = createHistoryQueryColumn(arrColumns);
            Ext.getCmp("PipelineHistoryQueryColumnStr_Id").setValue(column);
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PipelineHistoryQueryListGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '共 {2}条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineHistoryQueryListGridPanel_Id",
                    border: false,
                    autoLoad: true,
                    bbar: bbar,
                    columnLines: true,
                    forceFit: false,
                    viewConfig: {
                    	emptyText: "<div class='con_div_' id='div_dataactiveid'><" + cosog.string.nodata + "></div>"
                    },
                    store: store,
                    columns: newColumns,
                    listeners: {
                    	selectionchange: function (view, selected, o) {
                    		
                    	},
                    	itemdblclick: function (view,record,item,index,e,eOpts) {
                    		var wellName=Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
                    		if(wellName==null||wellName==""){
                    			Ext.getCmp("PipelineHistoryQueryHisBtn_Id").hide();
                            	Ext.getCmp("PipelineHistoryQueryAllBtn_Id").show();
                    			
                    			Ext.getCmp("PipelineHistoryQueryStartDate_Id").show();
                            	Ext.getCmp("PipelineHistoryQueryEndDate_Id").show();
                            	
                            	Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setValue(record.data.wellName);
                            	Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').setRawValue(record.data.wellName);
                            	
                            	Ext.getCmp('PipelineHistoryQueryStartDate_Id').setValue('');
                            	Ext.getCmp('PipelineHistoryQueryStartDate_Id').setRawValue('');
                            	
                            	Ext.getCmp('PipelineHistoryQueryEndDate_Id').setValue('');
                            	Ext.getCmp('PipelineHistoryQueryEndDate_Id').setRawValue('');
                            	
                            	
                            	Ext.getCmp("PipelineHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                    		}
                    	},
                    	select: function(grid, record, index, eOpts) {
                    		Ext.getCmp("PipelineHistoryQueryInfoDeviceListSelectRow_Id").setValue(index);
                    		var deviceName=record.data.wellName;
                    		var recordId=record.data.id;
                    		var deviceType=1;
                    		var isHis=1;
                    		var deviceCombValue=Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
                    		if(!isNotVal(deviceCombValue)){
                    			isHis=0;
                    		}
                    		CreatePipelineDeviceHistoryQueryDataTable(recordId,deviceName,deviceType,isHis);
                    	}
                    }
                });
                var PipelineHistoryQueryInfoDeviceListPanel = Ext.getCmp("PipelineHistoryQueryInfoDeviceListPanel_Id");
                PipelineHistoryQueryInfoDeviceListPanel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('PipelineHistoryQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date);
            }
            var endDate=Ext.getCmp('PipelineHistoryQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date);
            }
            
            if(get_rawData.totalCount>0){
            	gridPanel.getSelectionModel().deselectAll(true);
            	gridPanel.getSelectionModel().select(0, true);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName=Ext.getCmp('HistoryQueryPipelineDeviceListComb_Id').getValue();
        	var startDate=Ext.getCmp('PipelineHistoryQueryStartDate_Id').rawValue;
            var endDate=Ext.getCmp('PipelineHistoryQueryEndDate_Id').rawValue;
            var new_params = {
                    orgId: orgId,
                    deviceType:1,
                    deviceName:deviceName,
                    startDate:startDate,
                    endDate:endDate
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});