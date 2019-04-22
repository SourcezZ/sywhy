var mapHandler = {
	//地图默认配置参数
    global: {
        map: '',
		mapId :'',
        zoom: 18,
        zoomRank: {
            minZoom: 12,
            maxZoom: 18
        },
		touchPointers:{},
        centerPoint: {
			//121.3084,31.196105 国家会展中心(上海)
			//121.4815,31.184533 国展388
            lng: 121.3084,
            lat: 31.196105
        },
        localSearchIsInit: false,
        localSearchOptions: {
            renderOptions: {
                map: '',
                panel: "resultlist-area",
            },
            pageCapacity: 5,
            autoViewport: true,
            //onMarkersSet: markersSetFunc, //param:pagePoints
            //onResultsHtmlSet: resultsHtmlSetFunc, //param:resultPanelElemDom
            //onInfoHtmlSet: infoHtmlSetFunc //params:point, itemElemDom
        },
        localSearch: '',
    },
	//地图初始化
    initMap: function(mapId, centerPoint) {
        mapHandler._createMap(mapId, centerPoint); //创建地图
        mapHandler._setMapEvent(); //设置地图事件
        mapHandler._addMapControl(); //向地图添加控件
        mapHandler._initLocalSearch();//在线地图功能，本地搜索初始化
		return true;
        //mapHandler.addMarker([centerPoint]); //向地图添加标注点
    },
	//定位地图中心点为默认中心点
    _activeCenter: function() {
        var vp = map.getViewport();
        var zoom = vp.zoom;
        var activePoint = mapHandler.global.centerPoint;
        var point = new BMap.Point(activePoint.lng, activePoint.lat);
        map.centerAndZoom(point, zoom);
    },
	//在线地图本地搜索初始化方法
    _initLocalSearch: function(opts, flag) {
        var isInit = flag == undefined ? mapHandler.global.localSearchIsInit : flag;
        var map = mapHandler.global.map;
        var localSearchOptions = mapHandler.global.localSearchOptions;
        if (isInit) {
            if (!mapHandler.global.localSearch || mapHandler.global.localSearch == undefined || mapHandler.global.localSearch == '') {
                if (opts == {} || opts == '' || opts == undefined || !opts) {
                    mapHandler.global.localSearchOptions.onInfoHtmlSet = function(point, itemElemDom) {

                        mapHandler.global.centerPoint = point.point;
                        mapHandler._activeCenter();

                        $('.imgInfo').hide();
                        mapHandler._showImg(point.marker);

                        point.marker.infoWindow.addEventListener("onclickclose",
                            //显示信息的方法
                            function(e) {
                                $('.imgInfo').hide();
                            }
                        );

                    }
                    localSearchOptions = mapHandler.global.localSearchOptions;
                    mapHandler.global.localSearch = new BMap.LocalSearch(map, localSearchOptions);
                } else {
                    mapHandler.global.localSearch = new BMap.LocalSearch(map, opts);
                    localSearchOptions = opts;
                }
                mapHandler.global.localSearchOptions = localSearchOptions;
            }
        }
        return mapHandler.global.localSearch;
    },
	//将地图对象设置为全局map
	_setMap:function(objMap){
		mapHandler.global.map = objMap;
		window.map = mapHandler.global.map;
	},
	//根据container-Id和中心点创建地图
    _createMap: function(mapId, centerPoint) {
        var zoom = mapHandler.global.zoom;
        // var map = new BMap.Map(mapId,mapHandler.global.zoomRank);//创建地图的时候设置地图最大最小级别
        var map = new BMap.Map(mapId);//在百度地图容器中创建一个地图
		mapHandler.global.mapId = mapId;
        //map.setMapStyleV2({styleJson:styleJson});//设置地图样式
        if (!centerPoint || centerPoint == undefined || centerPoint == {}) {
            centerPoint = mapHandler.global.centerPoint;
        }
        mapHandler.global.centerPoint = centerPoint;//将中心点存放在global变量中
        var point = new BMap.Point(centerPoint.lng, centerPoint.lat); //定义一个中心点坐标
        map.centerAndZoom(point, zoom); //设定地图的中心点和坐标并将地图显示在地图容器中
        mapHandler.global.map = map;
        //mapHandler.global.localSearchOptions.renderOptions.map = map;//如果又在线的本地搜索，则将map对象给到本地搜索配置中
        window.map = mapHandler.global.map; //将map变量存储在全局
    },
	//设定地图的中心点和坐标并将地图显示在地图容器中
    _setPointCenter: function(point, zoom) {
        var map = mapHandler.global.map;
        map.centerAndZoom(point, zoom); 
    },
	//设置地图响应事件
    _setMapEvent: function() {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
		map.enablePinchToZoom();//启用双指操作缩放，默认启用
		var mapDom = document.getElementById(mapHandler.global.mapId);//获取地图的dom对象
		//给地图dom对象添加触摸开始事件
// 		mapDom.addEventListener("touchstart",function(e){
// 			mapHandler.global.touchPointers.start = e.changedTouches[0];//获取第一个触点滑动开始时的坐标
// 			mapHandler.global.touchPointers.startTime = e.timeStamp;//获取触点开始的时间戳
// 		});
// 		mapDom.addEventListener("touchmove",function(e){
// 		});
// 		//给地图dom对象添加触摸结束事件
// 		mapDom.addEventListener("touchend",function(e){
// 			mapHandler.global.touchPointers.end = e.changedTouches[0];//获取第一个触点滑动结束时的坐标
// 			var nowTime = e.timeStamp;//获取触点结束时的时间戳
// 			var detaTime = mapHandler.global.touchPointers.startTime - nowTime;//操作时间
// 			if(e.changedTouches.length==1 && detaTime < -100){
// 				var touch = e.changedTouches[0];
// 				mapHandler.global.touchPointers.now = touch;
// 				var mapDom = document.getElementById(mapHandler.global.mapId);
// 				adiv = mapDom.childNodes[0];
// 				bdiv = mapDom.childNodes[0].childNodes[0];
// 				var x = touch.clientX;
// 				var y = touch.clientY;
// 				var start = mapHandler.global.touchPointers.start;
// 				var sx = start.clientX;
// 				var sy = start.clientY;
// 				var detaX = sx - x;
// 				var detaY = sy - y;
// 				map.panBy(-1*detaX, -1*detaY);
// 			}
// 			setTimeout(function(){
// 				var p = map.getBounds().getCenter();
// 				map.setCenter(p);
// 			},100)
// 		});
    },
    _addMapControl: function() { //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(ctrl_nav);
		// map.addControl(new BMap.NavigationControl());
        //向地图中添加缩略图控件
//         var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
//         map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
//         var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
//         map.addControl(ctrl_sca);
    },
    addMarker: function(points, templateId) {
        //循环建立标注点
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
            var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
            var marker = new BMap.Marker(point); //将点转化成标注点
            map.addOverlay(marker); //将标注点添加到地图上
            //添加监听事件
            (function() {
                var thePoint = points[i];
                marker.addEventListener("click",
                    //显示信息的方法
                    function(e) {
                        // e.domEvent.stopPropagation();
                        mapHandler._showInfo(this, thePoint, templateId);
                        mapHandler._showImg(marker); //将标注点对应的图片添加到地图上
                    });
            })();
        }
    },
    _addShowImg: function() {
        var overlays = map.getOverlays();
        $.each(overlays, function(index, item) {
            item.addEventListener("click",
                //显示信息的方法
                function(e) {
                    e.domEvent.stopPropagation();
                    mapHandler._showImg(this); //将标注点对应的图片添加到地图上
                });
        });
    },
    _showImg: function(thisMarker) {
        // var dom = thisMarker.iconDom;
        var dom = thisMarker.V;
        var cssMarkerStyle = window.getComputedStyle(dom, null);
        var img = $('#imgInfo').tmpl([1]).html();
        img = mapHandler._parseDom(img);
        var imgcss = {};
        imgcss.position = cssMarkerStyle.position;
        imgcss.cursor = cssMarkerStyle.cursor;
        imgcss.width = '10px';
        imgcss.height = '10px';
        imgcss.left = cssMarkerStyle.left;
        imgcss.top = cssMarkerStyle.top;
        imgcss.transform = "scale(8)";
        $(img).css(imgcss);
        if ($(dom).parent().find('.imgInfo').length == 0) {
            $(dom).parent().append(img);
        } else {
            $(dom).parent().find('.imgInfo').show();
        }
    },
    _showInfo: function(thisMarker, point, templateId, css) {
        //渲染点的信息
        var pointsArr = [];
        pointsArr.push(point);
        var sContent = $(templateId).tmpl(pointsArr);
        var infoWindow = new BMap.InfoWindow(sContent.html()); //创建信息窗口对象

        infoWindow.addEventListener("onclickclose",
            //显示信息的方法
            function(e) {
                $('.imgInfo').hide();
            }
        );

        thisMarker.openInfoWindow(infoWindow, css); //图片加载完后重绘infoWindow
        if (window.infoArr) {
            window.infoArr.push(infoWindow);
        } else {
            window.infoArr = [];
            window.infoArr.push(infoWindow);
        }
    },
    getLocalSearch: function() {
        if (!mapHandler.global.localSearch) {
            mapHandler._initLocalSearch(undefined, true);
        }
        return mapHandler.global.localSearch;
    },
    theLocation: function(keyword, callback) {
        // var localSearch = new BMap.LocalSearch(map, opts);
        var localSearch = mapHandler.getLocalSearch();
        localSearch.enableAutoViewport(); //允许自动调节窗体大小
        //查询城市坐标的方法
        localSearch.setSearchCompleteCallback(callback);
        localSearch.disableFirstResultSelection();
        localSearch.search(keyword);
        // localSearch.searchInBounds(keyword, map.getBounds());
    },
    _showResultList: function(points, templateId, showArea) {
        //"#showResultList","#show-area"
        $(templateId).tmpl(points).appendTo(showArea);
    },
    _parseDom: function(arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes;
    },
    selectResultItem: function(index) {

        var BaseSearch = {};
        BaseSearch.CBK_SEARCH_COMPLETE = 1;
        BaseSearch.CBK_MARKERS_SET = 2;
        BaseSearch.CBK_INFO_HTML_SET = 3;
        BaseSearch.CBK_POLYLINES_SET = 4;
        BaseSearch.CBK_RESULTS_HTML_SET = 5;

        var localSearch = mapHandler.getLocalSearch();
        var preIndex = localSearch._curIndex,
            map = localSearch._opts.renderOptions.map,
            panel = localSearch._opts.renderOptions.panel;
        if (map && index > -1 && localSearch._overlays[index]) {
            var mkr = localSearch._overlays[index];
            map.closeInfoWindow();
            var cur = localSearch._results.getPoi(index);
            var iw = mapHandler._createSearchInfoWnd({
                title: cur.title,
                addr: cur.address,
                tel: cur.phoneNumber,
                url: cur.url,
                poiType: cur.type
            });
            var me = localSearch;
            iw.addEventListener("close", function() {
                if (panel) {
                    if (typeof me._curIndex == "number" && me._curIndex != -1 && panel.getElementsByTagName("li")[me._curIndex]) {
                        panel.getElementsByTagName("li")[me._curIndex].style.backgroundColor = ""
                    }
                }
                me._curIndex = -1
            });
            iw.addEventListener("open", function() {
                me._triggerCbk(BaseSearch.CBK_INFO_HTML_SET, cur, mapHandler._getInfoWindowDom(map))
            });
            mkr.openInfoWindow(iw)
        }
        if (panel) {
            if (typeof preIndex == "number" && preIndex != -1 && panel.getElementsByTagName("li")[preIndex]) {
                panel.getElementsByTagName("li")[preIndex].style.backgroundColor = ""
            }
            if (typeof index == "number" && index != -1 && panel.getElementsByTagName("li")[index]) {
                panel.getElementsByTagName("li")[index].style.backgroundColor = "#f0f0f0"
            }
        }
        localSearch._curIndex = index
    },
    _getInfoWindowDom: function(map) {
        if (map && map.infoWindowDoms && map.infoWindowDoms.contentDiv) {
            return map.infoWindowDoms.contentDiv.childNodes[0]
        }
        return null
    },
    _createSearchInfoWnd: function(contents, opts) {
        var title = contents.title;
        var addr = contents.addr;
        var tel = contents.tel;
        var uid = contents.uid || "";
        var url = contents.url;
        var poiType = contents.poiType || BMAP_POI_TYPE_NORMAL;
        opts = opts || {};
        if (!title) {
            return null
        }
        var ntitle = title;
        if (poiType == BMAP_POI_TYPE_BUSSTOP) {
            ntitle = ntitle + "-\u516c\u4ea4\u8f66\u7ad9"
        } else {
            if (poiType == BMAP_POI_TYPE_SUBSTOP) {
                ntitle = ntitle + "-\u5730\u94c1\u7ad9"
            }
        }
        if (ntitle.replace(/[\u0100-\uffff]/g, "##").length > 27) {
            ntitle = ntitle.substring(0, 13) + "&#8230"
        }
        var thtml = "<p style='width:210px;font-family:arial,simsun,sans-serif;line-height:16px;margin:0;font-size:14px;color:#cc5522;font-weight:bold;white-space:nowrap;overflow:hidden' title='" + title + "'>" + ntitle + "</p>";
        var htmls = [];
        htmls.push("<div style='font:12px arial,sans-serif;margin-top:10px'>");
        if (addr) {
            var addrTitle = "\u5730\u5740\uff1a";
            if (poiType == BMAP_POI_TYPE_BUSSTOP || poiType == BMAP_POI_TYPE_SUBSTOP) {
                addrTitle = "\u8f66\u6b21\uff1a"
            }
            htmls.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif" >');
            htmls.push('<tr><td style="vertical-align:top;width:38px;white-space:nowrap;word-break:keep-all">' + addrTitle + '&nbsp;</td><td style="line-height:16px">');
            htmls.push(addr + "&nbsp;</td></tr>");
            if (tel) {
                htmls.push("<tr><td>\u7535\u8bdd\uff1a</td><td>" + tel + "</td></tr>")
            }
            htmls.push("</table>")
        } else {
            if (tel) {
                htmls.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif">');
                htmls.push('<tr><td style="vertical-align:top;width:36px;white-space:nowrap;word-break:keep-all">\u7535\u8bdd\uff1a</td><td>' + tel + "</td></tr></table>")
            }
        }
        htmls.push("</div>");
        var iw = new BMap.InfoWindow(htmls.join(""), {
            title: thtml,
            height: 0,
            width: 230,
            margin: [10, 10, 20, 10]
        });
        return iw
    }
}

var mockData = [
    //建立坐标点：
    // lng：经度 lat：纬度
    { "lng": 114.548294, "lat": 30.495267, "url": "http://www.baidu.com", "title": "company", "address": "company" },
]

/*
extent.minX = "121.078638";
extent.maxX = "122.103138";
extent.minY = "30.738818";
extent.maxY = "31.431557";
*/


//121.078638,30.738818
//122.103138,31.431557
var borderData = [
    { "lng": 121.078638, "lat": 31.431557 }, //
    { "lng": 121.078638, "lat": 30.738818 }, //
    { "lng": 122.103138, "lat": 31.431557 }, //
    { "lng": 122.103138, "lat": 30.738818 } //
]

window.mapHandler = mapHandler; //将mapHandler变量存储在全局，作为工具检索及标记地图

var styleJson = [{
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#091220ff"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#113549ff"
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#0e1b30ff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffb3"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dadadab3"
    }
}, {
    "featureType": "subwaystation",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#b15454B2"
    }
}, {
    "featureType": "education",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#e4f1f1ff"
    }
}, {
    "featureType": "medical",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#f0dedeff"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "color": "#e2efe5ff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": 4
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#f7c54dff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#fed669ff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8f5a33ff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": 2
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#d8d8d8ff"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffeebbff"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#525355ff"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "local",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "local",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#d8d8d8ff"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "local",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#979c9aff"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "railway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#123c52ff"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on",
        "weight": 1
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#d8d8d8ff"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "subway",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "subway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#979c9aff"
    }
}, {
    "featureType": "subway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#333333ff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "city",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#454d50ff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "town",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#454d50ff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "district",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#2dc4bbff"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "entertainment",
    "elementType": "geometry",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "shopping",
    "elementType": "geometry",
    "stylers": {
        "color": "#12223dff"
    }
}];