Ext.define('AP.store.acquisitionUnit.ModbusProtocolAddrMappingEnumItemsStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.modbusProtocolAddrMappingEnumItemsStore',
    fields: ['id','title','code','itemAddr'],
    autoLoad: true,
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        url: context + '/acquisitionUnitManagerController/getProtocolEnumItemsConfigData',
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
            var gridPanel = Ext.getCmp("ModbusProtocolAddrMappingEnumItemsGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var column = createModbusProtocolAddrMappingEnumItemsColumn(arrColumns);
                var newColumns = Ext.JSON.decode(column);
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "ModbusProtocolAddrMappingEnumItemsGridPanel_Id",
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
                    		Ext.getCmp("ModbusProtocolAddrMappingEnumItemsSelectRow_Id").setValue(index);
//                    		CreateModbusProtocolAddrMappingEnumItemsConfigInfoTable(record.data.protocolCode,record.data.addr);
                    	}
                    }
                });
                var panel = Ext.getCmp("ModbusProtocolAddrMappingEnumItemsPanel_Id");
                panel.add(gridPanel);
            }
            if(get_rawData.totalRoot.length>0){
            	gridPanel.getSelectionModel().select(0, true);
            }
        },
        beforeload: function (store, options) {
        	var ScadaDriverModbusConfigSelectRow= Ext.getCmp("ModbusProtocolAddrMappingConfigSelectRow_Id").getValue();
        	
        	var protocolCode="";
        	if(ScadaDriverModbusConfigSelectRow!=''){
        		var selectedProtocol=Ext.getCmp("ModbusProtocolAddrMappingConfigTreeGridPanel_Id").getStore().getAt(ScadaDriverModbusConfigSelectRow);
        		if(selectedProtocol.data.classes==1){//选中的是协议
        			protocolCode=selectedProtocol.data.code;
        		}else if(selectedProtocol.data.classes==0 && isNotVal(selectedProtocol.data.children) && selectedProtocol.data.children.length>0){
        			protocolCode=selectedProtocol.data.children[0].code;
        		}
        	}
            var new_params = {
            		protocolCode: protocolCode
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});