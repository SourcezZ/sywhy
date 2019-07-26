import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import practice from '@/views/practice'
import test from '@/views/test'
import map from '@/views/map'
import jumpLogin from '@/views/jumpLogin'
import RainRose from '@/components/zy'
Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
  {
    path: '/test', //url地址
    name: '测试', //随便取一个name
    component: test //对应import的index，匹配大小写
  },
  {
    path: '/practice', //url地址
    name: '练习', //随便取一个name
    component: practice //对应import的index，匹配大小写
  },
  {
    path: '/', //url地址
    name: '首页', //随便取一个name
    component: index //对应import的index，匹配大小写
  },
  {
    path: '/map', //url地址
    name: '地图', //随便取一个name
    component: map //对应import的index，匹配大小写
  },
  {
    path: '/jumpLogin', //url地址
    name: '跳转登陆', //随便取一个name
    component: jumpLogin //对应import的index，匹配大小写
  },
  {
    path: '/syw', //url地址
    name: 'RainRose', //随便取一个name
    component: RainRose //对应import的index，匹配大小写
  },
  ],
})