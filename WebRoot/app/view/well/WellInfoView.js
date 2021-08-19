Ext.define("AP.view.well.WellInfoView", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wellInfoView', // 定义别名
    layout: 'fit',
    border: false,
    initComponent: function () {
        var me = this;
        var WellInfoPanel = Ext.create('AP.view.well.WellInfoPanel');
        Ext.apply(me, {
            items: [WellInfoPanel]
        });
        me.callParent(arguments);
    }

});