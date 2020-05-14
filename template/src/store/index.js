import Vue from 'vue'
import Vuex from 'vuex'

// 全局模块vuex相关文件
import { actions, getters, mutations, state } from './global/index.js'
// 模块级别vuex相关文件
import test from './test/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    test
  }
})
