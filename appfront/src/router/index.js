import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import practice from '@/views/practice'
Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
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
  ],
})