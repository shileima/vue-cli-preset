// http接口示例文件
import Vue from 'vue'
import jzUtils from 'jz-utils'
import API from './API.json'

// http接口监控上报配置
jzUtils.http.set({ gitGroup: `<%= options['group'] %>`, projectName: `<%= rootOptions['projectName'] %>` })

const handleError = message => {
  new Vue().$root.$toast(message)
}

export async function fetchData (params) {
  let { data, status, statusInfo } = await jzUtils.http({
    url: API.TEST,
    method: 'get',
    param: {}
  }).catch(_ => {
    handleError('网络出错啦~')
  })
  if (status !== 0) {
    statusInfo && statusInfo.message && handleError(statusInfo.message)
    return null
  }
  return data
}
