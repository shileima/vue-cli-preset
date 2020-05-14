import Vue from 'vue'
import App from './App.vue'
<% if (options.routerMode) { %>import router from './router'<% } %>
<% if (options.vuex) { %>import store from './store'<% } %>
import '@/mixins/index.js'
import '@babel/polyfill'

// 全量引入组件库
import JzUI from 'jz-ui-<%= options.terminal %>'
import 'jz-ui-<%= options.terminal %>/dist/style.css'
Vue.use(JzUI)

// 按需引入组件库
// import { Button} from 'jz-ui-<%= options.terminal %>'
// Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  <% if (options.routerMode) { %>router,<% } %>
  <% if (options.vuex) { %>store,<% } %>
  render: h => h(App)
}).$mount('#app')

// window.PAGE_CONFIG.dsn为sentry中生成的上传路径，注意使用jiazheng.daojia.com域名
window.homer && window.homer.install({
  dsn: process.env.VUE_APP_DSN,
  release: '<%= rootOptions.projectName %>-map',
  // 需要忽略掉某些报错，可在这里配置
  ignoreErrors: [
    'titleForRightButton',
    'cordova',
    'cordova already defined',
    'Unexpected token "<"',
    'Unexpected token "}"',
    'Unexpected token ")"',
    'Unexpected identifier "document"',
    'Network Error',
    'document',
    'payResult is not defined']
}, Vue)
