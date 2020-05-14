import Vue from 'vue'
import Router from 'vue-router'
import config from './conf/index'
Vue.use(Router)

export default new Router({
  mode: `<%= options.routerMode %>`,
  base: `<%= rootOptions.configs.vue.baseUrl %>`,
  routes: config
})
