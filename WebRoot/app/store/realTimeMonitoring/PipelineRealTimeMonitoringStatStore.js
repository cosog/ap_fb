Ext.define('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringStatStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineRealTimeMonitoringStatStore',
    fields: ['id','item','count','itemCode'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/realTimeMonitoringController/getDeviceRealTimeStat',
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
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringStatGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var column = createRealTimeMonitoringStatColumn(arrColumns);
                var newColumns = Ext.JSON.decode(column);
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineRealTimeMonitoringStatGridPanel_Id",
                    border: false,
                    autoLoad: true,
                    columnLines: true,
                    forceFit: true,
                    viewConfig: {
                    	emptyText: "<div class='con_div_' id='div_dataactiveid'><" + cosog.string.nodata + "></div>"
                    },
                    store: store,
                    columns: newColumns,
                    listeners: {
                    	selectionchange: function (view, selected, o) {
                    		
                    	},
                    	select: function(grid, record, index, eOpts) {
                    		var PipelineRealTimeMonitoringListGridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
                			if (isNotVal(PipelineRealTimeMonitoringListGridPanel)) {
                				PipelineRealTimeMonitoringListGridPanel.getSelectionModel().deselectAll(true);
                				PipelineRealTimeMonitoringListGridPanel.getStore().load();
                			}else{
                				Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore');
                			}
                    	}
                    }
                });
                var PipelineRealTimeMonitoringStatInfoPanel = Ext.getCmp("PipelineRealTimeMonitoringStatInfoPanel_Id");
                PipelineRealTimeMonitoringStatInfoPanel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
            	gridPanel.getSelectionModel().deselectAll(true);
            	gridPanel.getSelectionModel().select(0, true);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:1
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});