exports.install = function (Vue, options) {
    Vue.prototype.postData2Server = function(transId, req, callback){
      req._accessToken = sessionStorage.getItem('_accessToken')
      var url = window.location.href
      if(url.includes(':8080')){
          url=url.substring(0,url.lastIndexOf(":")) + ':8000/'
      }
      if (!url.includes(':8000')) {
        url=url.substring(0,url.length-1) + ':8000/'
      }
      this.$http.post(url + "api/" + transId, req).then(response => {
        var res = JSON.parse(response.bodyText);
        callback(res)
      })

  },
    Vue.prototype.text1 = function () {//全局函数1
        alert('执行成功1');
    };
    Vue.prototype.showData = function (a) {//全局函数2
        alert(a);
    };
    Vue.prototype.greet = function (event) {
        // `this` 在方法里指向当前 Vue 实例
        alert('Hello ')
        // `event` 是原生 DOM 事件
        // if (event) {
        //   alert(event.target.tagName)
        // }
    };
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };

      //filter里使用dataFormat
    Vue.filter('dataFormat', function (value, fmt) {
        let getDate = new Date(value);
        let o = {
          'M+': getDate.getMonth() + 1,
          'd+': getDate.getDate(),
          'h+': getDate.getHours(),
          'm+': getDate.getMinutes(),
          's+': getDate.getSeconds(),
          'q+': Math.floor((getDate.getMonth() + 3) / 3),
          'S': getDate.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt;
      });
};
