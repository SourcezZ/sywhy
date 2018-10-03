import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import leader from '@/views/leader'
import home from '@/components/Library'
Vue.use(Router)


export default new Router({
  routes: [
  {
    path: '/practice', //url地址
    name: '练习', //随便取一个name
    component: index //对应import的index，匹配大小写
  },
  {
    path: '/', //url地址
    name: '导航条', //随便取一个name
    component: leader //对应import的index，匹配大小写
  },
  ],
})