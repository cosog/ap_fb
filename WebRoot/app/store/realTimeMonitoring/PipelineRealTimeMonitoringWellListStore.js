Ext.define('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineRealTimeMonitoringWellListStore',
    fields: ['id','commStatus','commStatusName','wellName'],
    autoLoad: true,
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        url: context + '/realTimeMonitoringController/getDeviceRealTimeOverview',
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
            var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var column = createRealTimeMonitoringColumn(arrColumns);
                var newColumns = Ext.JSON.decode(column);
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineRealTimeMonitoringListGridPanel_Id",
                    border: false,
                    autoLoad: true,
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
                    	select: function(grid, record, index, eOpts) {
//                    		Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").setValue(index);
//                    		var deviceName=record.data.wellName;
//                    		var deviceType=0;
//                    		CreatePipelineDeviceRealMonitorDataTable(deviceName,deviceType);
//                    		Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringControlAndInfoStore');
                    	}
                    }
                });
                var PipelineRealTimeMonitoringInfoDeviceListPanel = Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListPanel_Id");
                PipelineRealTimeMonitoringInfoDeviceListPanel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
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