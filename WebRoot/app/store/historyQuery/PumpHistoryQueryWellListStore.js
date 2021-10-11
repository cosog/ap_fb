Ext.define('AP.store.historyQuery.PumpHistoryQueryWellListStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pumpHistoryQueryWellListStore',
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
            Ext.getCmp("AlarmShowStyle_Id").setValue(JSON.stringify(get_rawData.AlarmShowStyle));
            var gridPanel = Ext.getCmp("PumpHistoryQueryListGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var column = createHistoryQueryColumn(arrColumns);
                var newColumns = Ext.JSON.decode(column);
                
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '共 {2}条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PumpHistoryQueryListGridPanel_Id",
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
                    		var wellName=Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
                    		if(wellName==null||wellName==""){
                    			Ext.getCmp("PumpHistoryQueryHisBtn_Id").hide();
                            	Ext.getCmp("PumpHistoryQueryAllBtn_Id").show();
                    			
                    			Ext.getCmp("PumpHistoryQueryStartDate_Id").show();
                            	Ext.getCmp("PumpHistoryQueryEndDate_Id").show();
                            	
                            	Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').setValue(record.data.wellName);
                            	Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').setRawValue(record.data.wellName);
                            	
                            	Ext.getCmp('PumpHistoryQueryStartDate_Id').setValue('');
                            	Ext.getCmp('PumpHistoryQueryStartDate_Id').setRawValue('');
                            	
                            	Ext.getCmp('PumpHistoryQueryEndDate_Id').setValue('');
                            	Ext.getCmp('PumpHistoryQueryEndDate_Id').setRawValue('');
                            	
                            	
                            	Ext.getCmp("PumpHistoryQueryListGridPanel_Id").getStore().loadPage(1);
                    		}
                    	},
                    	select: function(grid, record, index, eOpts) {
                    		Ext.getCmp("PumpHistoryQueryInfoDeviceListSelectRow_Id").setValue(index);
                    		var deviceName=record.data.wellName;
                    		var recordId=record.data.id;
                    		var deviceType=0;
                    		var isHis=1;
                    		var deviceCombValue=Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
                    		if(!isNotVal(deviceCombValue)){
                    			isHis=0;
                    		}
                    		CreatePumpDeviceHistoryQueryDataTable(recordId,deviceName,deviceType,isHis);
                    	}
                    }
                });
                var PumpHistoryQueryInfoDeviceListPanel = Ext.getCmp("PumpHistoryQueryInfoDeviceListPanel_Id");
                PumpHistoryQueryInfoDeviceListPanel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date);
            }
            var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date);
            }
            
            if(get_rawData.totalCount>0){
            	gridPanel.getSelectionModel().select(0, true);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceName=Ext.getCmp('HistoryQueryPumpDeviceListComb_Id').getValue();
        	var startDate=Ext.getCmp('PumpHistoryQueryStartDate_Id').rawValue;
            var endDate=Ext.getCmp('PumpHistoryQueryEndDate_Id').rawValue;
            var new_params = {
                    orgId: orgId,
                    deviceType:0,
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