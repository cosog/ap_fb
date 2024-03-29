Ext.define('AP.store.historyQuery.PumpHistoryDataStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pumpHistoryDataStore',
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
            Ext.getCmp("PumpHistoryQueryDataColumnStr_Id").setValue(column);
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PumpHistoryQueryDataGridPanel_Id");
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
                    id: "PumpHistoryQueryDataGridPanel_Id",
                    border: false,
                    autoLoad: false,
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
                    		Ext.getCmp("HistoryQueryDataDetailsWindowDeviceId_Id").setValue(record.data.deviceId);
                    		Ext.getCmp("HistoryQueryDataDetailsWindowDeviceName_Id").setValue(record.data.wellName);
                    		HistoryQueryDataDetailsWindow.show();
//                    		CreatePumpDeviceHistoryQueryDataTable(record.data.id,record.data.wellName);
                    	},
                    	select: function(grid, record, index, eOpts) {}
                    }
                });
                var panel = Ext.getCmp("PumpHistoryQueryDataInfoPanel_Id");
                panel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date.split(' ')[0]);
            	Ext.getCmp('PumpHistoryQueryStartTime_Hour_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[0]);
            	Ext.getCmp('PumpHistoryQueryStartTime_Minute_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[1]);
            	Ext.getCmp('PumpHistoryQueryStartTime_Second_Id').setValue(get_rawData.start_date.split(' ')[1].split(':')[2]);
            }
            var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date.split(' ')[0]);
            	Ext.getCmp('PumpHistoryQueryEndTime_Hour_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[0]);
            	Ext.getCmp('PumpHistoryQueryEndTime_Minute_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[1]);
            	Ext.getCmp('PumpHistoryQueryEndTime_Second_Id').setValue(get_rawData.end_date.split(' ')[1].split(':')[2]);
            }
            
            deviceHistoryQueryCurve(0);
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName='';
        	var deviceId=0;
        	var selectRow= Ext.getCmp("PumpHistoryQueryInfoDeviceListSelectRow_Id").getValue();
        	if(selectRow>=0){
        		deviceName = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
        		deviceId = Ext.getCmp("PumpHistoryQueryDeviceListGridPanel_Id").getSelectionModel().getSelection()[0].data.id;
        	}
        	var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id').rawValue;
        	var startTime_Hour=Ext.getCmp('PumpHistoryQueryStartTime_Hour_Id').getValue();
        	var startTime_Minute=Ext.getCmp('PumpHistoryQueryStartTime_Minute_Id').getValue();
        	var startTime_Second=Ext.getCmp('PumpHistoryQueryStartTime_Second_Id').getValue();

            var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id').rawValue;
            var endTime_Hour=Ext.getCmp('PumpHistoryQueryEndTime_Hour_Id').getValue();
        	var endTime_Minute=Ext.getCmp('PumpHistoryQueryEndTime_Minute_Id').getValue();
        	var endTime_Second=Ext.getCmp('PumpHistoryQueryEndTime_Second_Id').getValue();
        	
            var new_params = {
            		orgId: orgId,
            		deviceType:0,
            		deviceId:deviceId,
                    deviceName:deviceName,
                    startDate:getDateAndTime(startDate,startTime_Hour,startTime_Minute,startTime_Second),
                    endDate:getDateAndTime(endDate,endTime_Hour,endTime_Minute,endTime_Second)
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});