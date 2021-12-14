Ext.define('AP.store.log.SystemLogStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.systemLogStore',
    fields: ['id','createTime','user_id','loginIp','action','actionName','remark'],
    autoLoad: true,
    pageSize: 50,
    proxy: {
        type: 'ajax',
        url: context + '/logQueryController/getSystemLogData',
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
            var column = createSystemLogColumn(arrColumns);
            Ext.getCmp("SystemLogColumnStr_Id").setValue(column);
            var gridPanel = Ext.getCmp("SystemLogGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var newColumns = Ext.JSON.decode(column);
                var bbar = new Ext.PagingToolbar({
                	store: store,
                	displayInfo: true,
                	displayMsg: '当前 {0}~{1}条  共 {2} 条'
    	        });
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "SystemLogGridPanel_Id",
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
                var panel = Ext.getCmp("SystemLogView_Id");
                panel.add(gridPanel);
            }
            
            var startDate=Ext.getCmp('SystemLogQueryStartDate_Id');
            if(startDate.rawValue==''||null==startDate.rawValue){
            	startDate.setValue(get_rawData.start_date);
            }
            var endDate=Ext.getCmp('SystemLogQueryEndDate_Id');
            if(endDate.rawValue==''||null==endDate.rawValue){
            	endDate.setValue(get_rawData.end_date);
            }
        },
        beforeload: function (store, options) {
        	var orgId = Ext.getCmp('leftOrg_Id').getValue();
        	var orgSelection= Ext.getCmp("IframeView_Id").getSelectionModel().getSelection();
        	var iframeViewStore=Ext.getCmp("IframeView_Id").getStore();
        	if(orgSelection.length==0 && iframeViewStore.getCount()>0&&iframeViewStore.getAt(0).data.text=='组织根节点'){
        		orgId='';
        	}else if(orgSelection.length>0 && orgSelection[0].data.text=='组织根节点'){
        		orgId='';
        	}
        	var startDate=Ext.getCmp('SystemLogQueryStartDate_Id').rawValue;
            var endDate=Ext.getCmp('SystemLogQueryEndDate_Id').rawValue;
            var new_params = {
                    orgId: orgId,
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