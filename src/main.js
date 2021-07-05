// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import store from './store/store'
import NextPage from './components/next-page.vue'

Vue.use(Vuex)
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.component('next-page',NextPage)

/* eslint-disable no-new */
// 在这里注册组件或者插件可以全局使用 ( router，store )
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
