import Vue from 'vue'
import axios from 'axios'
import * as utils from './utils'
import Router from '@/router/index'

Vue.prototype.axios = axios
axios.defaults.baseURL = utils.default.getUrl()

//请求拦截器
axios.interceptors.request.use(function(req){
    //发送请求之前
    req.data = req.data == null ? {} : req.data
    req.data.token = Vue.prototype.getCookie('token')

    return req;

  },function(error){
      //请求错误时
      return Promise.reject(error);
  })


//响应拦截器
axios.interceptors.response.use(function(response){
    //响应数据
    debugger
    if(response.data.loginStatus!=null && response.data.loginStatus!=1 && transId!='get_username') {
        Router.push({name: '跳转登陆'})
        Vue.prototype.message(response.data.msg, "error")
        Vue.prototype.delCookie('token')
        Vue.prototype.delCookie('username')
        return
    }
    return response;
  },function(error){
    //请求错误时
    return Promise.reject(error);
  })
