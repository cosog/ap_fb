Ext.define('AP.store.acquisitionUnit.ModbusProtocolAlarmGroupEnumItemsStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.modbusProtocolAlarmGroupEnumItemsStore',
    fields: ['id','title','code','itemAddr'],
    autoLoad: true,
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        url: context + '/acquisitionUnitManagerController/getProtocolEnumOrSwitchItemsConfigData',
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
            var gridPanel = Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsGridPanel_Id");
            if (!isNotVal(gridPanel)) {
                var column = createModbusProtocolAddrMappingEnumOrSwitchItemsColumn(arrColumns);
                var newColumns = Ext.JSON.decode(column);
                gridPanel = Ext.create('Ext.grid.Panel', {
                    id: "ModbusProtocolAlarmGroupEnumItemsGridPanel_Id",
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
                    		Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsSelectRow_Id").setValue(index);
                    		
                    		var selectGroupRow= Ext.getCmp("ModbusProtocolAlarmGroupConfigSelectRow_Id").getValue();
                    		var selectedGroup=Ext.getCmp("ModbusProtocolAlarmGroupConfigTreeGridPanel_Id").getStore().getAt(selectGroupRow);
                    		
                    		if(selectedGroup.data.classes==0){
                    			if(isNotVal(selectedGroup.data.children) && selectedGroup.data.children.length>0){
                    				CreateProtocolAlarmGroupEnumItemsConfigInfoTable(selectedGroup.data.children[0].text,selectedGroup.data.children[0].classes,selectedGroup.data.children[0].code,record.data.addr);
                    			}
                    			
                    		}else if(selectedGroup.data.classes==1){
                    			CreateProtocolAlarmGroupEnumItemsConfigInfoTable(selectedGroup.data.text,selectedGroup.data.classes,selectedGroup.data.code,record.data.addr);
                        	}else if(selectedGroup.data.classes==2||selectedGroup.data.classes==3){
                        		CreateProtocolAlarmGroupEnumItemsConfigInfoTable(selectedGroup.data.protocol,selectedGroup.data.classes,selectedGroup.data.code,record.data.addr);
                        	}
                    	}
                    }
                });
                var panel = Ext.getCmp("ModbusProtocolAlarmGroupEnumItemsPanel_Id");
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
            		protocolCode: protocolCode,
            		resolutionMode: 1
                };
            Ext.apply(store.proxy.extraParams, new_params);
        },
        datachanged: function (v, o) {
            //onLabelSizeChange(v, o, "statictisTotalsId");
        }
    }
});