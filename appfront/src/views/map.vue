<template>
    <!--地图容器-->
    <!-- <div id="map_container" class="fli"></div> -->
    <div style="width: 100%;height: 100%;overflow: hidden;border:1px solid gray" id="map_container"></div>
</template>
<script>
export default {
    name: '',
    data () {
        return {
            results: [],
            lastMaker: ''
        }
    },
    mounted () {
        var map = new BMap.Map("map_container");      //创建Map实例, 设置卫星图为底图
        var point = new BMap.Point(106.53385, 29.573695);
        map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom();                  // 启用滚轮放大缩小。

        // ----- control -----
        map.addControl(new BMap.NavigationControl()); //地图平移缩放控件

        // map.enableKeyboard();   

        map.addEventListener("click", function (e) {

            // alert(e.point.lng+","+e.point.lat);// 单击地图获取坐标点；
            // map.panTo(new BMap.Point(e.point.lng,e.point.lat));

            // 清除指定overlay
            // var allOverlay = map.getOverlays()
            // map.removeOverlay(allOverlay[0])

            map.clearOverlays()
            var point = new BMap.Point(e.point.lng, e.point.lat)
            var marker = new BMap.Marker(point)  // 创建标记
            map.addOverlay(marker)
        })



    },
}
</script>
<style type="text/css" scoped>
body,
html,
#map_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
}

.anchorBL {
    display: none;
}
</style>