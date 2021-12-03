Ext.define("AP.view.acquisitionUnit.CurveColorSelectWindow", {
    extend: 'Ext.window.Window',
    alias: 'widget.CurveColorSelectWindow',
    layout: 'fit',
    iframe: true,
    id: 'CurveColorSelectWindow_Id',
    closeAction: 'destroy',
    width: 330,
    shadow: 'sides',
    resizable: false,
    collapsible: true,
    constrain: true,
    maximizable: false,
    plain: true,
    bodyStyle: 'padding:5px;background-color:#D9E5F3;',
    modal: true,
    border: false,
    initComponent: function () {
        var me = this;
        var postalarmUnitEditForm = Ext.create('Ext.form.Panel', {
            baseCls: 'x-plain',
            defaultType: 'colorfield',
            items: [{
				xtype : "hidden",
				id : 'curveColorSelectedRow_Id',
				value:-1
			},{
				xtype : "hidden",
				id : 'curveColorSelectedCol_Id',
				value:-1
			},{
                id: 'CurveColorSelectWindowColor_id',
                fieldLabel: '曲线颜色',
                labelWidth: 60,
                anchor:'100%',
                listeners : {
                	collapse: function (field,eOpts) {
                    	if(Ext.getCmp('CurveColorSelectWindowColor_id')!=undefined){
                    		field.inputEl.applyStyles({
          		              background: '#'+field.value,
          		              opacity:field.color.a
          		            });
                    	}
                    }
                }
        	}],
            buttons: [{
            	xtype: 'button',
            	text: cosog.string.save,
                iconCls: 'save',
                handler: function () {
                	var curveColor=Ext.getCmp('CurveColorSelectWindowColor_id').getValue();
                	var row=Ext.getCmp('curveColorSelectedRow_Id').getValue();
                	var col=Ext.getCmp('curveColorSelectedCol_Id').getValue();
                	if(parseInt(row)>=0 && parseInt(col)>=0){
                		protocolAcqUnitConfigItemsHandsontableHelper.hot.setDataAtCell(parseInt(row),parseInt(col),curveColor);
                	}
                	Ext.getCmp("CurveColorSelectWindow_Id").close();
                }
            }]
        });
        Ext.apply(me, {
            items: postalarmUnitEditForm
        });
        me.callParent(arguments);
    }

});