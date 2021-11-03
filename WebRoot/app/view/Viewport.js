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
		if(activeId.toUpperCase()=="DeviceRealTimeMonitoring".toUpperCase()){
			var tabPanel = Ext.getCmp("RealTimeMonitoringTabPanel");
			var activeId = tabPanel.getActiveTab().id;
			if(activeId=="PumpRealTimeMonitoringInfoPanel_Id"){
				//更新通信状态统计
				getDeviceCommStatusTotal();
				//更新设备概览列表
				var PumpRealTimeMonitoringListGrid = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
				if(isNotVal(PumpRealTimeMonitoringListGrid)){
					var store = PumpRealTimeMonitoringListGrid.getStore();
					for(var i=0;i<store.getCount();i++){
						var record=store.getAt(i);
						if(record.data.wellName==data.wellName){
							record.set("commStatusName","在线");
							record.set("commStatus",1);
							record.set("commAlarmLevel",0);
							record.set("acqTime",data.acqTime);
							for(var j=0;j<data.CellInfo.length;j++){
								var cellValue=record.get(data.CellInfo[j].column.toUpperCase());
								var cellValue2=record.get(data.CellInfo[j].column.toLowerCase());
								if(cellValue!=undefined){
									record.set(data.CellInfo[j].column.toUpperCase(),data.CellInfo[j].value);
								}
								if(cellValue2!=undefined){
									record.set(data.CellInfo[j].column.toLowerCase(),data.CellInfo[j].value);
								}
							}
							record.commit();
							break;
						}
					}
				}
				//更新实时表和实时曲线
				if(isNotVal(pumpDeviceRealTimeMonitoringDataHandsontableHelper) &&  isNotVal(pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot)){
					var wellName  = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
					if(wellName==data.wellName && data.CellInfo.length>0){
						pumpDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=data.CellInfo;
						pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot.loadData(data.totalRoot);
						
						//更新实时曲线
						var selectedItem= Ext.getCmp("PumpRealTimeMonitoringSelectedCurve_Id").getValue();
						var acqTime=data.acqTime;
						var value='';
						if(isNotVal(selectedItem)){
							for(var i=0;i<data.CellInfo.length;i++){
								if(selectedItem==data.CellInfo[i].columnName){
									value=data.CellInfo[i].rawValue;
									break;
								}
							}
						}
						if(isNotVal(value)){
							var chart = $("#pumpRealTimeMonitoringCurveDiv_Id").highcharts(); 
							if(isNotVal(chart)){
								var series=chart.series[0];
								series.addPoint([Date.parse(acqTime.replace(/-/g, '/')), parseFloat(value)], true, false);
							}
						}
					}
				}
			}
		}
	}else if(data.functionCode.toUpperCase()=="pumpDeviceRealTimeMonitoringStatusData".toUpperCase()){//接收到推送的泵设备通信数据
		if(activeId.toUpperCase()=="DeviceRealTimeMonitoring".toUpperCase()){
			var tabPanel = Ext.getCmp("RealTimeMonitoringTabPanel");
			var activeId = tabPanel.getActiveTab().id;
			if(activeId=="PumpRealTimeMonitoringInfoPanel_Id"){
				//更新通信状态统计
				getDeviceCommStatusTotal();
				var PumpRealTimeMonitoringListGrid = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id");
				if(isNotVal(PumpRealTimeMonitoringListGrid)){
					var store = PumpRealTimeMonitoringListGrid.getStore();
					//更新概览表
					for(var i=0;i<store.getCount();i++){
						var record=store.getAt(i);
						if(record.data.wellName==data.wellName){
							record.set("commStatusName",(data.commStatus==1?"上线":"离线"));
							record.set("commStatus",data.commStatus);
//							record.set("commAlarmLevel",(data.commStatus==1?0:100));
							record.set("commAlarmLevel",data.commAlarmLevel);
							record.set("acqTime",data.acqTime);
							record.commit();
							break;
						}
//						var newValue = store.getAt(i).get("name");
//						  store.getAt(i).set("name",newValue);
//						  store.commitChanges();
					}
					//更新实时表
					if(isNotVal(pumpDeviceRealTimeMonitoringDataHandsontableHelper) &&  isNotVal(pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot)){
						var wellName  = Ext.getCmp("PumpRealTimeMonitoringListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
						if(wellName==data.wellName){
							var value=data.wellName+":"+data.acqTime+" "+(data.commStatus==1?"在线":"离线");
							pumpDeviceRealTimeMonitoringDataHandsontableHelper.hot.setDataAtCell(0, 0, value);
						}
					}
				}
			}
		}
	}if(data.functionCode.toUpperCase()=="pipelineDeviceRealTimeMonitoringData".toUpperCase()){//接收到推送的管设备实时监控数据
		if(activeId.toUpperCase()=="DeviceRealTimeMonitoring".toUpperCase()){
			var tabPanel = Ext.getCmp("RealTimeMonitoringTabPanel");
			var activeId = tabPanel.getActiveTab().id;
			if(activeId=="PipelineRealTimeMonitoringInfoPanel_Id"){
				//更新通信状态统计
				getDeviceCommStatusTotal();
				//更新设备概览列表
				var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
				if(isNotVal(gridPanel)){
					var store = gridPanel.getStore();
					for(var i=0;i<store.getCount();i++){
						var record=store.getAt(i);
						if(record.data.wellName==data.wellName){
							record.set("commStatusName","在线");
							record.set("commStatus",1);
							record.set("commAlarmLevel",0);
							record.set("acqTime",data.acqTime);
							for(var j=0;j<data.CellInfo.length;j++){
								var cellValue=record.get(data.CellInfo[j].column.toUpperCase());
								var cellValue2=record.get(data.CellInfo[j].column.toLowerCase());
								if(cellValue!=undefined){
									record.set(data.CellInfo[j].column.toUpperCase(),data.CellInfo[j].value);
								}
								if(cellValue2!=undefined){
									record.set(data.CellInfo[j].column.toLowerCase(),data.CellInfo[j].value);
								}
							}
							record.commit();
							break;
						}
					}
				}
				//更新实时表和实时曲线
				if(isNotVal(pipelineDeviceRealTimeMonitoringDataHandsontableHelper) &&  isNotVal(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot)){
					var wellName  = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
					if(wellName==data.wellName && data.CellInfo.length>0){
						pipelineDeviceRealTimeMonitoringDataHandsontableHelper.CellInfo=data.CellInfo;
						pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.loadData(data.totalRoot);
						//更新实时曲线
						var selectedItem= Ext.getCmp("PipelineRealTimeMonitoringSelectedCurve_Id").getValue();
						var acqTime=data.acqTime;
						var value='';
						if(isNotVal(selectedItem)){
							for(var i=0;i<data.CellInfo.length;i++){
								if(selectedItem==data.CellInfo[i].columnName){
									value=data.CellInfo[i].rawValue;
									break;
								}
							}
						}
						if(isNotVal(value)){
							var chart = $("#pipelineRealTimeMonitoringCurveDiv_Id").highcharts(); 
							if(isNotVal(chart)){
								var series=chart.series[0];
								series.addPoint([Date.parse(acqTime.replace(/-/g, '/')), parseFloat(value)], true, false);
							}
						}
					}
				}
			}
		}
	}else if(data.functionCode.toUpperCase()=="pipelineDeviceRealTimeMonitoringStatusData".toUpperCase()){//接收到推送的管设备通信数据
		if(activeId.toUpperCase()=="DeviceRealTimeMonitoring".toUpperCase()){
			var tabPanel = Ext.getCmp("RealTimeMonitoringTabPanel");
			var activeId = tabPanel.getActiveTab().id;
			if(activeId=="PipelineRealTimeMonitoringInfoPanel_Id"){
				//更新通信状态统计
				getDeviceCommStatusTotal();
				var gridPanel = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id");
				if(isNotVal(gridPanel)){
					var store = gridPanel.getStore();
					//更新概览表
					for(var i=0;i<store.getCount();i++){
						var record=store.getAt(i);
						if(record.data.wellName==data.wellName){
							record.set("commStatusName",(data.commStatus==1?"上线":"离线"));
							record.set("commStatus",data.commStatus);
//							record.set("commAlarmLevel",(data.commStatus==1?0:100));
							record.set("commAlarmLevel",data.commAlarmLevel);
							record.set("acqTime",data.acqTime);
							record.commit();
							break;
						}
					}
					//更新实时表
					if(isNotVal(pipelineDeviceRealTimeMonitoringDataHandsontableHelper) &&  isNotVal(pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot)){
						var wellName  = Ext.getCmp("PipelineRealTimeMonitoringListGridPanel_Id").getSelectionModel().getSelection()[0].data.wellName;
						if(wellName==data.wellName){
							var value=data.wellName+":"+data.acqTime+" "+(data.commStatus==1?"在线":"离线");
							pipelineDeviceRealTimeMonitoringDataHandsontableHelper.hot.setDataAtCell(0, 0, value);
						}
					}
				}
			}
		}
	}else if(data.functionCode.toUpperCase()=="ResourceMonitoringData".toUpperCase()){//接收到资源监测数据
		if(activeId.toUpperCase()=="DeviceRealTimeMonitoring".toUpperCase()){
			if(data.cpuUsedPercentAlarmLevel==1){
				Ext.getCmp("CPUUsedPercentLabel_id").setText("<font color=#F09614 >CPU:"+data.cpuUsedPercent+"</font>");
			}else if(data.cpuUsedPercentAlarmLevel==2){
				Ext.getCmp("CPUUsedPercentLabel_id").setText("<font color=#DC2828 >CPU:"+data.cpuUsedPercent+"</font>");
			}else{
				Ext.getCmp("CPUUsedPercentLabel_id").setText("CPU:"+data.cpuUsedPercent);
			}
			
			if(data.memUsedPercentAlarmLevel==1){
				Ext.getCmp("memUsedPercentLabel_id").setText("<font color=#F09614 >内存:"+data.memUsedPercent+"</font>");
			}else if(data.memUsedPercentAlarmLevel==2){
				Ext.getCmp("memUsedPercentLabel_id").setText("<font color=#DC2828 >内存:"+data.memUsedPercent+"</font>");
			}else{
				Ext.getCmp("memUsedPercentLabel_id").setText("内存:"+data.memUsedPercent);
			}
			
			if(data.tableSpaceUsedPercentAlarmLevel==1){
				Ext.getCmp("tableSpaceSizeProbeLabel_id").setText("<font color=#F09614 >表空间:"+data.tableSpaceUsedPercent+"</font>");
			}else if(data.tableSpaceUsedPercentAlarmLevel==2){
				Ext.getCmp("tableSpaceSizeProbeLabel_id").setText("<font color=#DC2828 >表空间:"+data.tableSpaceUsedPercent+"</font>");
			}else{
				Ext.getCmp("tableSpaceSizeProbeLabel_id").setText("表空间:"+data.tableSpaceUsedPercent);
			}
			
			if(data.adRunStatus=="运行"){
				Ext.getCmp("adRunStatusProbeLabel_id").setIconCls("dtgreen");
			}else{
				Ext.getCmp("adRunStatusProbeLabel_id").setIconCls("dtyellow");
			}
			Ext.getCmp("adRunStatusProbeLabel_id").setText("驱动 v"+data.adVersion);
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

function getDeviceCommStatusTotal(){
	var orgId = Ext.getCmp('leftOrg_Id').getValue();
	var deviceType=0;
	var gridPanelId="PumpRealTimeMonitoringStatGridPanel_Id";
	var tabPanel = Ext.getCmp("RealTimeMonitoringTabPanel");
	var activeId = tabPanel.getActiveTab().id;
	if(activeId=="PumpRealTimeMonitoringInfoPanel_Id"){
		gridPanelId="PumpRealTimeMonitoringStatGridPanel_Id";
	}else{
		deviceType=1;
		gridPanelId="PipelineRealTimeMonitoringStatGridPanel_Id";
	}
	
	Ext.Ajax.request({
		method:'POST',
		url:context + '/realTimeMonitoringController/getDeviceRealTimeCommStatusStat',
		success:function(response) {
			var result =  Ext.JSON.decode(response.responseText);
			var all=result.all;
			var online=result.online;
			var offline=result.offline;

			var  gridPanel= Ext.getCmp(gridPanelId);
			if(isNotVal(gridPanel)){
				var store = gridPanel.getStore();
				for(var i=0;i<store.getCount();i++){
					var record=store.getAt(i);
					if(record.data.itemCode.toUpperCase()=="all".toUpperCase()){
						record.set("count",all);
						record.commit();
					}else if(record.data.itemCode.toUpperCase()=="online".toUpperCase()){
						record.set("count",online);
						record.commit();
					}else if(record.data.itemCode.toUpperCase()=="offline".toUpperCase()){
						record.set("count",offline);
						record.commit();
					}
				}
			}
		},
		failure:function(){
			Ext.MessageBox.alert("错误","与后台联系的时候出了问题");
		},
		params: {
			orgId:orgId,
			deviceType:deviceType
        }
	});
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