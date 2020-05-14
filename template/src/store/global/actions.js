/**
 * 全局actions文件
 */
export default {
  globalAction ({ commit }, val) {
    commit('globalMutation', val)
  }
}
