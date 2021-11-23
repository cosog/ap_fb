Ext.define('AP.store.historyQuery.PipelineHistoryDataStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineHistoryDataStore',
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
            Ext.getCmp("PipelineHistoryQueryDataColumnStr_Id").setValue(column);
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PipelineHistoryQueryDataGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var clickColumn={
                		text: '详细', 
                		dataIndex: 'details',
                		locked:true,
                		align:'center',
                		width:50,
                		renderer :function(value,e,o){
                			return iconHistoryQueryDetailsData(value,e,o)
                		} 
                };
                
                
                newColumns.splice(1, 0, clickColumn);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '当前 {0}~{1}条  共 {2} 条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineHistoryQueryDataGridPanel_Id",
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
                    	selectionchange: function (view, selected, o) {},
                    	itemdblclick: function (view,record,item,index,e,eOpts) {
                    		var HistoryQueryDataDetailsWindow = Ext.create("AP.view.historyQuery.HistoryQueryDataDetailsWindow");
                    		Ext.getCmp("HistoryQueryDataDetailsWindowRecord_Id").setValue(record.data.id);
                    		Ext.getCmp("HistoryQueryDataDetailsWindowDeviceName_Id").setValue(record.data.wellName);
                    		HistoryQueryDataDetailsWindow.show();
//                    		CreatePipelineDeviceHistoryQueryDataTable(record.data.id,record.data.wellName);
                    	},
                    	select: function(grid, record, index, eOpts) {}
                    }
                });
                var panel = Ext.getCmp("PipelineHistoryQueryDataInfoPanel_Id");
                panel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('PipelineHistoryQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date);
            }
            var endDate=Ext.getCmp('PipelineHistoryQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date);
            }
            
            deviceHistoryQueryCurve(1);
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName='';
        	var selectRow= Ext.getCmp("PipelineHistoryQueryInfoDeviceListSelectRow_Id").getValue();
        	if(selectRow>=0){
        		deviceName = Ext.getCmp("PipelineHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
        	}
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