// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import global_function from './function/global_function' //引用全局函数
import VueResource from 'vue-resource' //引用vue-resource

// 引入markdown插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

//axios
import * as axios_config from './function/axios_config'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(global_function)
Vue.use(VueResource)
Vue.use(axios_config)

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    components: { App },
    template: '<App/>',
})
