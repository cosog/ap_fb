var websocketClient = null;
Ext.define('AP.view.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'frame_imivport_ids',
    layout: 'border',
    items: [{
        id: 'frame_north',
        region: 'north',
        height: 60,
        border: false,
        bodyStyle:{
        	'z-index':10
        },
        html: '<div id="imgTitle"><img id="logoImg" src="../images/logo/ytlogo.png" /><span id="bannertitle">' +viewInformation.title+ '</span>' +
        		"<div id='passAndExitButton'><a href='#' id='logon_a1' onclick='resetPwdFn()'><span id='logon_a1_text'>修改密码</span></a></div> " +
        		"<div id='passAndExitButton'><a href='#' id='logon_a2' onclick='userLoginOut()'><span id='logon_a2_text'>退出</span></a></div>" +
        		"<div id='passAndExitButton'><a href='#' id='logon_a5' onclick='showHelpDocumentWinFn()'><span id='logon_a5_text'>帮助</span></a></div>" +
        		"<div id='passAndExitButton2' ><a href='#' title='全屏显示' id='logon_a3' onclick='fullscreen()'></a></div> " +
        		"<div id='passAndExitButton3' style='display:none;'><a href='#' title='退出全屏' id='logon_a4'  onclick='exitFullscreen()'></a></div> " +
        		"</div>"
   }, {
        id: 'center_ids',
        region: 'center',
        border: false,
        split: true,
        bodyStyle:{
        	'z-index':1
        },
        layout: {
            type: 'border'
        },
        defaults: {
            split: true
        },
        items: [
        	{
            id: "frame_center_ids",
            region: 'center',
            xtype: 'tabpanel',
            layout: 'fit',
            closeAction: 'destroy',
            items: [],
            listeners: {
                tabchange: function (tabPanel, newCard, oldCard,obj) {
                    var tabPanel = Ext.getCmp("frame_center_ids");
                    var tabnums = tabPanel.items.getCount();
                    var curValues = Ext.getCmp("tabNums_Id").getValue();
                    var curId = newCard.id;
                    var modules = curId.split("_");
                    var cyrData = "";
                    if (modules.length > 2) {
                        if (curId.indexOf("diagnosis") > -1) {
                            var secondBottomTab_Id = Ext.getCmp("secondBottomTab_Id").getValue();
                            cyrData = changeTabId(curId, secondBottomTab_Id);
                        } else if (curId.indexOf("compute") > -1) {
                            var productBottomTab_Id = Ext.getCmp("productBottomTab_Id").getValue();
                            cyrData = changeTabId(curId, productBottomTab_Id);

                        } else if (curId.indexOf("image") > -1) {
                            var imageBottomTab_Id = Ext.getCmp("imageBottomTab_Id").getValue();
                            cyrData = changeTabId(curId, imageBottomTab_Id);
                        }
                        addPanelEps(curId, cyrData, curId);
                    } else {
                        addPanelEps(curId, curId, curId);
                    }
                    Ext.getCmp("tabNums_Id").setValue(tabnums);
                },
                delay: 300
            }
      }]
   },{
	   region: 'west',
       border: false,
       layout: 'border',
       collapsible: true,
       split: true,
       flex:0.11,
       items:[{
           region: 'south',
           height:'50%',
           layout: 'fit',
           border: false,
           id: 'frame_west',
           split: true,
           hidden: false,
           collapsible: true,
           autoDestroy: true,
           items: [{
               xtype: 'iframeView'
           }]
       },{
    	   id: 'MainModuleShow_Id',
           region: 'center',
           split: false,
           height:'50%',
           collapsible: false,
           layout: 'fit',
           border: false,
           autoDestroy: true
       }]
   },
   {
        id: 'frame_south',
        region: 'south',
        xtype: "panel",
        border: false,
        hidden:true,
        bodyStyle: 'background-color:#FBFBFB;',
        html: "<div id=\"footer\">" + viewInformation.copy+"&nbsp;<a href='"+viewInformation.linkaddress+"' target='_blank'>"+viewInformation.linkshow+"</a> "+"</div>",
        height: 30
   }],
   listeners: {
	   afterrender: function ( panel, eOpts) {
			var baseUrl=getBaseUrl().replace("https","ws").replace("http","ws");
			var moduleCode = "ApWebSocketClient";
			if ('WebSocket' in window) {
//				websocketClient = new ReconnectingWebSocket(baseUrl+"/websocket/socketServer?module_Code="+moduleCode);
				websocketClient = new ReconnectingWebSocket(baseUrl+"/websocketServer/"+moduleCode);
				websocketClient.debug = true;
				websocketClient.reconnectInterval = 1000;
				websocketClient.timeoutInterval = 2000;
				websocketClient.maxReconnectInterval = 30000;
				websocketClient.reconnectDecay=1.5;
				websocketClient.automaticOpen = true;
//				websocketClient.maxReconnectAttempts = 5;
			}
			else if ('MozWebSocket' in window) {
//				websocketClient = new MozWebSocket(baseUrl+"/websocket/socketServer?module_Code="+moduleCode);
				websocketClient = new MozWebSocket(baseUrl+"/websocketServer/"+moduleCode);
			}else {
//				websocketClient = new SockJS(getBaseUrl()+"/sockjs/socketServer?module_Code="+moduleCode);
				websocketClient = new SockJS(getBaseUrl()+"/websocketServer/"+moduleCode);
			}
			websocketClient.onopen = websocketOnOpen;
			websocketClient.onmessage = websocketOnMessage;
			websocketClient.onerror = websocketOnError;
			websocketClient.onclose = websocketOnClose;
		
	   },
	   beforeclose: function ( panel, eOpts) {
		   websocketClose(websocketClient);
	   }
   }
});

function websocketOnOpen(openEvt) {
//  alert(openEvt.Data);
}

function websocketOnMessage(evt) {
	var activeId = Ext.getCmp("frame_center_ids").getActiveTab().id;
	var data=Ext.JSON.decode(evt.data);
	if(data.functionCode.toUpperCase()=="pumpDeviceRealTimeMonitoringData".toUpperCase()){//接收到推送的泵设备实时监控数据
		
	}else if(data.functionCode.toUpperCase()=="pumpDeviceRealTimeMonitoringStatusData".toUpperCase()){//接收到推送的泵设备通信数据
		if(activeId.toUpperCase()=="DeviceRealTimeMonitoring".toUpperCase()){
			if(isNotVal(pumpDeviceRealMonitorDataHandsontableHelper) &&  isNotVal(pumpDeviceRealMonitorDataHandsontableHelper.hot)){
				var wellName  = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
				if(wellName==data.wellName){
					var value=data.wellName+":"+data.acqTime+","+(data.commStatus==1?"在线":"离线");
					pumpDeviceRealMonitorDataHandsontableHelper.hot.setDataAtCell(0, 0, value);
				}
			}
		}
	}
}
function websocketOnOpen() {
//	alert("WebSocket连接成功");
}
function websocketOnError() {
//	alert("WebSocket连接发生错误");
}
function websocketOnClose() {
//	alert("WebSocket连接关闭");
}

function websocketClose(websocket) {
	if(websocket!=null){
		websocket.close();
	}
}

function fullscreen(){
	document.getElementById('passAndExitButton2').style.display='none';
	document.getElementById('passAndExitButton3').style.display='';
	var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}
function exitFullscreen(){
	document.getElementById('passAndExitButton3').style.display='none';
	document.getElementById('passAndExitButton2').style.display='';
	
    var elem=document;
    if(elem.webkitCancelFullScreen){
        elem.webkitCancelFullScreen();    
    }else if(elem.mozCancelFullScreen){
        elem.mozCancelFullScreen();
    }else if(elem.cancelFullScreen){
        elem.cancelFullScreen();
    }else if(elem.exitFullscreen){
        elem.exitFullscreen();
    }else{
        //浏览器不支持全屏API或已被禁用
    }
}

//重置密码
function resetPwdFn() {
    var showResetPwdWin = Ext.create("AP.view.user.SysUserEditPwdWin");
    showResetPwdWin.show();
    return false;
}

//帮助文档窗口
function showHelpDocumentWinFn() {
	var tabPanel = Ext.getCmp("frame_center_ids");
	var getTabId = tabPanel.getComponent("HelpDocPanel");
	if(!getTabId){
		tabPanel.add(Ext.create("AP.view.help.HelpDocPanel", {
            id: 'HelpDocPanel',
            closable: true,
            iconCls: 'Help',
            closeAction: 'destroy',
            title: '帮助',
            listeners: {
                afterrender: function () {
                },
                delay: 150
            }
        })).show();
		
		Ext.Ajax.request({
    		method:'POST',
    		url:context + '/helpDocController/getHelpDocHtml',
    		success:function(response) {
    			var p =Ext.getCmp("HelpDocPanel_Id");
    			p.body.update(response.responseText);
    		},
    		failure:function(){
    			Ext.MessageBox.alert("信息","请求失败");
    		},
    		params: {
            }
    	});
	}
	tabPanel.setActiveTab("HelpDocPanel");
    return false;
}

function mOver(obj) {
    var obj_ = obj;
    obj_.style.color = 'blue';
}

function mOut(obj) {
    var obj_ = obj;
    obj_.style.color = '';
}

function changeTabId(val, id) {
    var data_ = val.split("_");
    var tabId_ = "";
    Ext.Array.each(data_,
        function (name, index, countriesItSelf) {
            var str_ = name;
            if (index == countriesItSelf.length - 1) {
                if (id != "") {
                    tabId_ += id;
                } else {
                    tabId_ += str_;
                }
            } else {
                tabId_ += str_ + "_";
            }

        });
    return tabId_;
}