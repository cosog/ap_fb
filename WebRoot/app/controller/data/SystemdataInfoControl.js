Ext.define('AP.controller.data.SystemdataInfoControl', {
    extend: 'Ext.app.Controller',
    views: [],
    refs: [{
            ref: 'systemdataInfoGridPanel',
            selector: 'systemdataInfoGridPanel'
        },
        {
            ref: 'dataitemsInfoWin',
            selector: 'dataitemsInfoWin'
        },
        {
            ref: 'systemdataInfoWin',
            selector: 'systemdataInfoWin'
        }
                ],
    init: function () {
        this.control({
            'systemdataInfoGridPanel': {
                itemdblclick: editSystemdataInfo
            },
            'dataitemsInfoEditGridPanel ': {
                itemdblclick: editfindtattxtInfo
            },
            'systemdataInfoGridPanel > toolbar button[action=addSystemdataInfoAction]': {
                click: addSystemdataInfo
            },
            'dataitemsInfoWin  button[action=oktosysfordataAction]': {
                click: oktosysfordata
            },
            'systemdataInfoWin  button[action=SystemdataInfoSubmitForm]': {
                click: savesystemdataInfoSubmit
            },
            'systemdataInfoWin > panel toolbar button[action=addfindtattxtInfoAction]': {
                click: addfindtattxtInfo
            },
            'systemdataInfoWin > panel toolbar button[action=editfindtattxtInfoBtnAction]': {
                click: editfindtattxtInfo
            },
            'systemdataInfoWin > panel toolbar button[action=delfindtattxtInfoBtnAction]': {
                click: delfindtattxtInfo
            },
            'systemdataInfoGridPanel > toolbar button[action=delSystemdataInfoAction]': {
                click: delSystemdataInfo
            },
            'systemdataInfoGridPanel > toolbar button[action=editSystemdataInfoAction]': {
                click: editSystemdataInfo
            },
            'dataitemsInfoWin  button[action=savetosysfordatasAction]': {
                click: savetoSysDataItems
            },
            'dataitemsInfoWin  button[action=edittosysfordatasAction]': {
                click: edittoSysDatasItems
            },
            'systemdataInfoWin  button[action=SystemdataInfoUpdataForm]': {
                click: editsystemdataInfoUpdata
            },
            //??????Enter??????
            'systemdataInfoGridPanel textfield[action=findsysdatatextaction]': {
                afterrender: addGridKeyEnter
            }
        });
    }
});
//??????????????????????????????
function addSystemdataInfo() {
    //??????????????????????????????closeAction?????????'hide'????????????
	var win_Obj = Ext.getCmp("SystemdataInfoWinId")
    if (win_Obj != undefined) {
        win_Obj.destroy();
    }
    var SystemdataInfoWin = Ext.create("AP.view.data.SystemdataInfoWin", {
        title: cosog.string.addDataInfo
    });
    SystemdataInfoWin.show();
    SystemdataInfoWin.down('form').getForm().reset();
//    Ext.getCmp("DataitemsInfoEditGridPanelId").hide();
//    Ext.getCmp("DataitemsInfoAddGridPanelId").show();
    var sysadditems = Ext.create("AP.view.data.DataitemsInfoAddGridPanel");
    Ext.getCmp("DataItemsListPanel_Id").removeAll();
    Ext.getCmp("DataItemsListPanel_Id").add(sysadditems);
    Ext.getCmp("systaddtodataitemsBtnId").show();
    Ext.getCmp("sysSDSaveBtnId").show();
    Ext.getCmp("sysSDUpdBtnId").hide();
    return false;
};
//????????????????????????
function oktosysfordata() {
    var dataitemswin = Ext.getCmp("DataitemsInfoWinId");
    var adddataitemswinFormId = dataitemswin.down('form');
    if (adddataitemswinFormId.getForm().isValid()) {
        var dtebCname = Ext.getCmp("sysdatacname_Ids").getValue();
        var dtebEname = Ext.getCmp("sysdataename_Ids").getValue();
        var dtebSorts = Ext.getCmp("sysdatasorts_Ids").getValue();
        var dtebValue = Ext.getCmp("sysdatadatavalue_Ids").getValue();
        var status_ = Ext.getCmp("dataitemsInfo_status_id").getValue()['dataitemsInfo.status'];

        var dtebData = [[dtebCname, dtebEname, dtebValue, dtebSorts, status_]];
        var dgp = Ext.getCmp("DataitemsInfoAddGridPanelId").getStore();
        var count = dgp.data.length;
        dgp.insert(count, dtebData);
        dataitemswin.close();
    }
    return false;
};
//??????
function savesystemdataInfoSubmit() {
    var adddtbwin = Ext.getCmp("SystemdataInfoWinId");
    var adddtbFrom = adddtbwin.down('form');
    if (adddtbFrom.getForm().isValid()) {
        //????????????
        var addparamfindg = Ext.getCmp("DataitemsInfoAddGridPanelId").getStore();
        var count = addparamfindg.getCount();
        var addparamstr = "";
        if (count != null && count != "") {

            for (var i = 0; i < count; i++) {
                var stat = addparamfindg.getAt(i);
                var graw = stat.data;
                addparamstr += "" + graw.cname + "&" + graw.ename + "&" + graw.datavalue + "&" + graw.sorts + "&" + graw.status + "|";
            }
            addparamstr = addparamstr.substring(0, addparamstr.length - 1);
        }
        // alert(addparamstr);
        adddtbFrom.getForm().submit({
            url: context + '/systemdataInfoController/addSystemdataInfo',
            clientValidation: true, // ?????????????????????
            waitMsg: cosog.string.sendServer,
            waitTitle: 'Please Wait...',
            method: "POST",
            params: {
                paramsdtblstringId: addparamstr
            },
            success: function (response, action) {

                if (action.result.msg == true) {
                    adddtbwin.close();
                    reFreshg("SystemdataInfoGridPanelId");
                    Ext.Msg.alert(cosog.string.ts, "???<font color=blue>" + cosog.string.success + "</font>??????" + cosog.string.dataInfo + "???");
                } else {
                    Ext.Msg.msg('info', "<font color=red>" + action.result.error + "???</font> ");
                }

            },
            failure: function () {
                Ext.Msg.alert(cosog.string.ts, "???<font color=red>" + cosog.string.execption + " </font>??????" + cosog.string.adddatException + "???");
            }
        });


    }
    return false;
};
//??????????????????
function delSystemdataInfo() {
    //????????????????????????
    var sys_row = Ext.getCmp("SystemdataInfoGridPanelId").getSelectionModel().getSelection();
    if (sys_row.length>0) {
    	Ext.Msg.confirm(cosog.string.ts, cosog.string.yesdeldata,
                function (btn) {
                    if (btn == "yes") {
                        ExtDelspace_ObjectInfo("systemdataInfoController", "SystemdataInfoGridPanelId", sys_row, "sysdataid", "deleteSystemdataInfoById");
                    }
                });
    } else {
    	Ext.Msg.alert(cosog.string.deleteCommand, cosog.string.checkOne);
    }
};

function editSystemdataInfo() {
	var sys_row = Ext.getCmp("SystemdataInfoGridPanelId").getSelectionModel().getSelection();
    if (sys_row.length>0) {
    	var sys_row = Ext.getCmp("SystemdataInfoGridPanelId").getSelectionModel().getSelection();
        var sysdataid_id = sys_row[0].data.sysdataid;
        var sdcname = sys_row[0].data.cname;
        var sdename = sys_row[0].data.ename;
        var sdsorts = sys_row[0].data.sorts;
        var status = sys_row[0].data.status;
        Ext.getCmp("sys_txt_find_ids").setValue(sysdataid_id);
        var editSystemdataInfoWin = Ext.create("AP.view.data.SystemdataInfoWin", {
            title: cosog.string.editDataInfo
        });
        editSystemdataInfoWin.show();
//        Ext.getCmp("DataitemsInfoEditGridPanelId").show();
//        Ext.getCmp("DataitemsInfoAddGridPanelId").hide();
        var sysedititems = Ext.create("AP.view.data.DataitemsInfoEditGridPanel");
        Ext.getCmp("DataItemsListPanel_Id").removeAll();
        Ext.getCmp("DataItemsListPanel_Id").add(sysedititems);
        Ext.getCmp("systaddtodataitemsBtnId").hide();
        Ext.getCmp("sysSDSaveBtnId").hide();
        Ext.getCmp("sysSDUpdBtnId").show();

        Ext.getCmp('hidesysdata_Id').setValue(sysdataid_id);
        Ext.getCmp('hidesysstatus_Id').setValue(status);
        Ext.getCmp('sysename_Id').setValue(sdename);
        Ext.getCmp('syscname_Id').setValue(sdcname);
        Ext.getCmp('syssorts_Id').setValue(sdsorts);
    } else {
    	Ext.Msg.alert(cosog.string.deleteCommand, cosog.string.checkOne);
    }
    return false;
};

function addfindtattxtInfo() {
    var adddataitemwin = Ext.create("AP.view.data.DataitemsInfoWin", {
        title: cosog.string.addDataColumnInfo
    });
    adddataitemwin.show();
    adddataitemwin.down('form').getForm().reset();
    Ext.getCmp("savettosysfordataFormBtnId").show();
    Ext.getCmp("oktosysfordataFormBtnId").hide();
    Ext.getCmp("editttosysfordataFormBtnId").hide();

    return false;
};

function editfindtattxtInfo() {
	var obj_row = Ext.getCmp("DataitemsInfoEditGridPanelId").getSelectionModel().getSelection();
    if (obj_row.length > 0) {
    	var sdata_row = Ext.getCmp("DataitemsInfoEditGridPanelId").getSelectionModel().getSelection();
        var dataitemid = sdata_row[0].data.dataitemid;
        var sysdataid = sdata_row[0].data.sysdataid;
        var cname = sdata_row[0].data.cname;
        var ename = sdata_row[0].data.ename;
        var sorts = sdata_row[0].data.sorts;
        var datavalue = sdata_row[0].data.datavalue;

        var editdataitemwin = Ext.create("AP.view.data.DataitemsInfoWin", {
            title: cosog.string.editDataColumnInfo
        });
        editdataitemwin.show();
        editdataitemwin.down('form').getForm().reset();
        Ext.getCmp("savettosysfordataFormBtnId").hide();
        Ext.getCmp("oktosysfordataFormBtnId").hide();
        Ext.getCmp("editttosysfordataFormBtnId").show();
        Ext.getCmp("hide_addsys_Id").setValue(sysdataid);
        Ext.getCmp("hide_dataitemids").setValue(dataitemid);
        Ext.getCmp("sysdatacname_Ids").setValue(cname);
        Ext.getCmp("sysdataename_Ids").setValue(ename);
        Ext.getCmp("sysdatasorts_Ids").setValue(sorts);
        Ext.getCmp("sysdatadatavalue_Ids").setValue(datavalue);
    }else {
    	Ext.Msg.alert(cosog.string.deleteCommand, cosog.string.checkOne);
    }
    return false;
};
//save-to-action
function savetoSysDataItems() {
    var tosavedatawin = Ext.getCmp("DataitemsInfoWinId");
    var sysdataForm = tosavedatawin.down('form');
    if (sysdataForm.getForm().isValid()) {
        var getSysId = Ext.getCmp("sys_txt_find_ids").getValue();
        sysdataForm.getForm().submit({
            url: context + '/dataitemsInfoController/addDataitemsInfo',
            clientValidation: true,
            waitMsg: cosog.string.sendServer,
            waitTitle: 'Please Wait...',
            method: "POST",
            params: {
                sysId: getSysId
            },
            success: function (response, action) {
                if (action.result.msg == true) {
                    tosavedatawin.close();
                    reFreshg("DataitemsInfoEditGridPanelId");
                    Ext.Msg.alert(cosog.string.ts, "???<font color=blue>" + cosog.string.success + "</font>??????" + cosog.string.dataInfo + "???");
                }
                if (action.result.msg == false) {
                    Ext.Msg.alert('info', "<font color=red>SORRY???</font>" + cosog.string.failInfo + "???");
                }

            },
            failure: function () {
                Ext.Msg.alert(cosog.string.ts, "???<font color=red>" + cosog.string.execption + " </font>??????" + cosog.string.adddatException + "???");
            }
        });
    }
    return false;
};
//edit-to-action[????????????]
function edittoSysDatasItems() {
    var edittosavedatawin = Ext.getCmp("DataitemsInfoWinId");
    var editsysdataForm = edittosavedatawin.down('form');
    if (editsysdataForm.getForm().isValid()) {
        editsysdataForm.el.mask(cosog.string.updatewait).show();
        editsysdataForm.getForm().submit({
            url: context + '/dataitemsInfoController/editDataitemsInfo',
            clientValidation: true,
            method: "POST",
            success: function (response, action) {
                editsysdataForm.getEl().unmask();
                if (action.result.msg == true) {
                    edittosavedatawin.close();
                    reFreshg("DataitemsInfoEditGridPanelId");
                    Ext.Msg.alert(cosog.string.ts, "???<font color=blue>" + cosog.string.sucupate + "</font>??????" + cosog.string.dataInfo + "???");
                }
                if (action.result.msg == false) {
                    Ext.Msg.alert(cosog.string.ts, "<font color=red>SORRY???</font> " + cosog.string.updatefail + "???");
                }
            },
            failure: function () {
                editsysdataForm.getEl().unmask();
                Ext.Msg.alert(cosog.string.ts, "???<font color=red>" + cosog.string.execption + " </font>??????" + cosog.string.editdatException + "???");
            }
        });
    }
    return false;
};

//edit-to-action[????????????]
function editsystemdataInfoUpdata() {
	var edittosysobjwin = Ext.getCmp("SystemdataInfoWinId");
    var editsysobjForm = edittosysobjwin.down('form');
    if (editsysobjForm.getForm().isValid()) {
        editsysobjForm.el.mask(cosog.string.updatewait).show();
        editsysobjForm.getForm().submit({
            url: context + '/systemdataInfoController/editSystemdataInfo',
            clientValidation: true,
            method: "POST",
            success: function (response, action) {
                editsysobjForm.getEl().unmask();
                if (action.result.msg == true) {
                    edittosysobjwin.close();
                    reFreshg("SystemdataInfoGridPanelId");
                    Ext.Msg.alert(cosog.string.ts, "???<font color=blue>" + cosog.string.sucupate + "</font>??????" + cosog.string.dataInfo + "???");
                } else {
                    Ext.Msg.alert('info', "<font color=red>" + action.result.error + "???</font> ");
                }
            },
            failure: function () {
                editsysobjForm.getEl().unmask();
                Ext.Msg.alert(cosog.string.ts, "???<font color=red>" + cosog.string.execption + " </font>??????" + cosog.string.editdatException + "???");
            }
        });
    }
    return false;
};
//del-to-action[????????????]
function delfindtattxtInfo() {
    var obj_row = Ext.getCmp("DataitemsInfoEditGridPanelId").getSelectionModel().getSelection();
    if (obj_row.length > 0) {
    	Ext.Msg.confirm(cosog.string.ts, cosog.string.yesdeldata,
                function (btn) {
                    if (btn == "yes") {
                        //??????Grid???????????? 
                        ExtDelspace_ObjectInfo("dataitemsInfoController", "DataitemsInfoEditGridPanelId", obj_row, "dataitemid", "deleteDataitemsInfoById");
                    }
                });
    } else {
    	Ext.Msg.alert(cosog.string.deleteCommand, cosog.string.checkOne);
    }
    return false;
};


//Enter??????
function addGridKeyEnter(o) {
    new Ext.util.KeyMap(o.el, {
        key: 13,
        fn: function () {
            if (o.isValid()) {
                reFreshg("SystemdataInfoGridPanelId");
            }
        },
        scope: this
    });
};