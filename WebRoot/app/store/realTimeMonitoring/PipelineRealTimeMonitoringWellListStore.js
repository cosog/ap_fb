Ext.define('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringWellListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pipelineRealTimeMonitoringWellListStore',
    fields: ['id','commStatus','commStatusName','wellName'],
    autoLoad: true,
    pageSize: 50,
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
            var column = createRealTimeMonitoringColumn(arrColumns);
            Ext.getCmp("PipelineRealTimeMonitoringColumnStr_Id").setValue(column);
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '共 {2}条'
    	        });
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PipelineRealTimeMonitoringListGridPanel_Id",
                    border: false,
                    autoLoad: true,
                    columnLines: true,
                    forceFit: false,
                    stripeRows: true,
                    bbar: bbar,
                    viewConfig: {
                    	emptyText: "<div class='con_div_' id='div_dataactiveid'><" + cosog.string.nodata + "></div>"
                    },
                    store: store,
                    columns: newColumns,
                    listeners: {
                    	selectionchange: function (view, selected, o) {
                    		
                    	},
                    	select: function(grid, record, index, eOpts) {
                    		Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListSelectRow_Id").setValue(index);
                    		var deviceName=record.data.wellName;
                    		var deviceType=1;
                    		CreatePipelineDeviceRealTimeMonitoringDataTable(deviceName,deviceType);
                    		Ext.create('AP.store.realTimeMonitoring.PipelineRealTimeMonitoringControlAndInfoStore');
                    	}
                    }
                });
                var PipelineRealTimeMonitoringInfoDeviceListPanel = Ext.getCmp("PipelineRealTimeMonitoringInfoDeviceListPanel_Id");
                PipelineRealTimeMonitoringInfoDeviceListPanel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
//            	gridPanel.getSelectionModel().deselectAll(true);
            	gridPanel.getSelectionModel().select(0, true);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName=Ext.getCmp('RealTimeMonitoringPipelineDeviceListComb_Id').getValue();
        	var commStatus  = Ext.getCmp("PipelineRealTimeMonitoringStatGridPanel_Id").getSelectionModel().getSelection()[0].data.itemCode;
            var new_params = {
                    orgId: orgId,
                    deviceType:1,
                    deviceName:deviceName,
                    commStatus:commStatus
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});