Ext.define('AP.store.alarmQuery.PumpCommunicationAlarmOverviewStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.pumpCommunicationAlarmOverviewStore',
    fields: ['id','deviceType','deviceTypeName','wellName','alarmTime','user_id','loginIp','action','actionName','remark'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/alarmQueryController/getAlarmOverviewData',
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
            var column = createAlarmOverviewQueryColumn(arrColumns);
            Ext.getCmp("PumpCommunicationAlarmOverviewColumnStr_Id").setValue(column);
            var gridPanel = Ext.getCmp("PumpCommunicationAlarmOverviewGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg:''
//                	displayMsg: '当前 {0}~{1}条  共 {2} 条'
    	        });
                
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "PumpCommunicationAlarmOverviewGridPanel_Id",
                    border: false,
//                    autoLoad: true,
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
            				if(selected.length>0){
            					var gridPanel = Ext.getCmp("PumpCommunicationAlarmGridPanel_Id");
                				if (isNotVal(gridPanel)) {
                					gridPanel.getStore().load();
                				}else{
                					Ext.create('AP.store.alarmQuery.PumpCommunicationAlarmStore');
                				}
            				}
                    	},
                    	select: function(grid, record, index, eOpts) {}
                    }
                });
                var panel = Ext.getCmp("PumpCommunicationAlarmOverviewPanel_Id");
                panel.add(gridPanel);
            }
            if(get_rawData.totalCount>0){
            	if(gridPanel.getSelectionModel().getSelection().length>0){
            		gridPanel.getSelectionModel().deselectAll(true);
            	}
            	gridPanel.getSelectionModel().select(0, true);
            }else{
            	var gridPanel = Ext.getCmp("PumpCommunicationAlarmGridPanel_Id");
                if (isNotVal(gridPanel)) {
                	Ext.getCmp("PumpCommunicationAlarmDetailsPanel_Id").remove(gridPanel);
                }
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var deviceType=0;
        	var deviceName=Ext.getCmp('PumpCommunicationAlarmDeviceListComb_Id').getValue();
        	var alarmLevel='';
        	var isSendMessage=Ext.getCmp('PumpCommunicationAlarmIsSendMessageComb_Id').getValue();
            var new_params = {
                    orgId: orgId,
                    deviceType:deviceType,
                    deviceName:deviceName,
                    alarmLevel:alarmLevel,
                    isSendMessage:isSendMessage,
                    alarmType:0
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});