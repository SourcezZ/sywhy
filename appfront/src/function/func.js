exports.install = function (Vue, options) {
	/**
	 * 设置cookie
	 * name cookie的名称
	 * value cookie的值
	 * day cookie的过期时间
	*/
	Vue.prototype.setCookie = function (name, value, day) {
		if (day != 0 && day != null) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
			var currentDate = new Date()
			var offset = currentDate.getTimezoneOffset(8) // UTCTime - LOCALTime = offset
			currentDate.setTime(currentDate.getTime() + day * 24 * 60 * 60 * 1000 - offset * 60 * 1000)
			var expires = currentDate.toUTCString()
			document.cookie = name + "=" + escape(value) + ";expires=" + expires
		} else {
			document.cookie = name + "=" + escape(value)
		}
	}

	Vue.prototype.getCookie = function (name) {
		var arr
		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
		if (arr = document.cookie.match(reg)){
			return unescape(arr[2])
		}else{
			return null
		}
	}

	Vue.prototype.delCookie = function(name)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null){
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
	}

    Vue.prototype.postData2Server = function(transId, req, callback){
		req.token = this.getCookie('token')
		var url = window.location.href
		if(url.includes(':8080')){
			url=url.substring(0,url.lastIndexOf(":")) + ':8000/'
		}
		if (!url.includes(':8000')) {
			url=url.substring(0,url.length-1) + ':8000/'
		}
		this.$http.post(url + "api/" + transId, req).then(response => {
			var res = JSON.parse(response.bodyText);
			console.log({'transId':transId, 'list':res.list, 'msg':res.msg})
			callback(res)
		})
	}

	Vue.prototype.getUploadUrl = function(transId){
		var url = window.location.href
		if(url.includes(':8080') || url.includes(':8000')){
			url = url.substring(0,url.lastIndexOf(":")) + ':8000/api/' + transId
		}
		if (!url.includes(':8000')) {
			url = url.substring(0,url.length-1) + ':8000/api/' + transId
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
