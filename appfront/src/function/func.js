exports.install = function (Vue, options) {

    Vue.prototype.sleep = function (delay) {
        var start = (new Date()).getTime();
        while ((new Date()).getTime() - start < delay) {
            continue;
        }
    }

    Vue.prototype.message = function (message, type, duration = 0, showClose = true) {
        this.$message({
            message: message,
            type: type,
            duration: duration,
            showClose: showClose
        })
    }


	/**
	 * 设置cookie
	 * name cookie的名称
	 * value cookie的值
	 * day cookie的过期时间
	*/
    Vue.prototype.setCookie = function (name, value, hour) {
        try {
            if (hour != 0 && hour != null) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
                var currentDate = new Date()
                var offset = currentDate.getTimezoneOffset(8) // UTCTime - LOCALTime = offset
                // currentDate.setTime(currentDate.getTime() + day * 24 * 60 * 60 * 1000 - offset * 60 * 1000)
                currentDate.setTime(currentDate.getTime() + hour * 60 * 60 * 1000 - offset * 60 * 1000)
                var expires = currentDate.toUTCString()
                document.cookie = name + "=" + escape(value) + ";expires=" + expires
            } else {
                document.cookie = name + "=" + escape(value)
            }
        } catch (error) {
            this.message(error, "error")
        }
    }

    Vue.prototype.getCookie = function (name) {
        try {
            var arr
            var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2])
            } else {
                return null
            }
        } catch (error) {
            this.message(error, "error")
        }
    }

    Vue.prototype.delCookie = function (name) {
        try {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        } catch (error) {
            this.message(error, "error")
        }
    }
    Vue.prototype.postData2Server = function (transId, req, callback) {
        req.token = this.getCookie('token')
        var url = window.location.href
        if (url.includes(':8080')) {
            url = url.substring(0, url.lastIndexOf(":")) + ':8000/'
        }
        if (!url.includes(':8000')) {
            url = url.substring(0, url.length - 1) + ':8000/'
        }
        this.$http.post("https://67.209.179.205:8000/api/" + transId, req).then(response => {
            if (response.data.loginStatus != null && response.data.loginStatus != 1 && transId != 'get_username') {
                this.$router.push({ name: '跳转登陆', params: { index: '5' } })
                this.message(response.data.msg, "error")
                this.delCookie('token')
                this.delCookie('username')
                return
            }
            var res = JSON.parse(response.bodyText);
            callback(res)
        })
    }

    Vue.prototype.getUploadUrl = function (transId) {
        var url = window.location.href
        if (url.includes(':8080') || url.includes(':8000')) {
            url = url.substring(0, url.lastIndexOf(":")) + ':8000/api/' + transId
        }
        if (!url.includes(':8000')) {
            url = url.substring(0, url.length - 1) + ':8000/api/' + transId
        }
        return url
    }

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
    }

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
    })
}
