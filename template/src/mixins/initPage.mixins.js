import jzUtils from 'jz-utils'

function initPage (options) {
  if (options.backGround) {
    setBackGround(options.backGround)
  } else {
    setBackGround('')
  }
}

// 设置页面背景色
function setBackGround (backGround) {
  document.body.style.background = backGround || ''
}

let initMixin = {
  beforeRouteEnter (to, from, next) {
    let pv = (to.meta && to.meta.pv) || to.name || ''
    // 初始化页面标题&页面背景色
    initPage({
      backGround: to.meta && to.meta.background
    })
    // 设置标题
    to.meta && to.meta.title && jzUtils.setTitle(to.meta.title)
    // 页面埋点
    to.meta && to.meta.pv && jzUtils.trackPageview(pv)
    next()
  }
}

export default initMixin
