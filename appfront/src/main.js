// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import func from './function/func' //引用全局函数
import VueResource from 'vue-resource' //引用vue-resource
//BMap
import "../static/BMap/js/bmap.js"; 

//axios
import * as axios_config from './function/axios_config'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(func)
Vue.use(VueResource)
Vue.use(axios_config)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>',
})
