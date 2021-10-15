Ext.define('AP.store.log.DeviceOperationLogStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.deviceOperationLogStore',
    fields: ['id','deviceType','deviceTypeName','wellName','createTime','user_id','loginIp','action','actionName','remark'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/logQueryController/getDeviceOperationLogData',
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
            var column = createDeviceOperationLogColumn(arrColumns);
            Ext.getCmp("DeviceOperationLogColumnStr_Id").setValue(column);
            var gridPanel = Ext.getCmp("DeviceOperationLogGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '当前 {0}~{1}条  共 {2} 条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "DeviceOperationLogGridPanel_Id",
                    border: false,
                    autoLoad: true,
                    bbar: bbar,
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
                    	select: function(grid, record, index, eOpts) {}
                    }
                });
                var panel = Ext.getCmp("DeviceOperationLogView_Id");
                panel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('DeviceOperationLogQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date);
            }
            var endDate=Ext.getCmp('DeviceOperationLogQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceType=Ext.getCmp('DeviceOperationLogDeviceTypeListComb_Id').getValue();
        	var deviceName=Ext.getCmp('DeviceOperationLogDeviceListComb_Id').getValue();
        	var operationType=Ext.getCmp('DeviceOperationLogOperationTypeListComb_Id').getValue();
        	var startDate=Ext.getCmp('DeviceOperationLogQueryStartDate_Id').rawValue;
            var endDate=Ext.getCmp('DeviceOperationLogQueryEndDate_Id').rawValue;
            var new_params = {
                    orgId: orgId,
                    deviceType:deviceType,
                    deviceName:deviceName,
                    operationType:operationType,
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