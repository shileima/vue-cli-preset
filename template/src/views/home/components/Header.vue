<template>
  <div :class="$style.wrap">
    <div><img src="@/assets/images/logo.png" alt="" width="80" height="80"></div>
    <h1>
      {{msg}}
    </h1>
    <section>
      <p>
        <a v-for="(item, index) in list"
          :key="index"
          :href="item.link">{{item.text}}</a>
      </p>
    </section>
    <% if (options.routerMode) { %><dj-button type="primary" @click="more">异步组件</dj-button><% } %>
  </div>
</template>

<script>
import { fetchData } from '@/service/index.js'
export default {
  props: ['msg'],
  data () {
    return {
      list: [{
        text: '组件库文档',
        link: 'http://jz-common-cdn.daojia.com/jz-ui/b/index.html'
      },
      {
        text: '工具库文档',
        link: 'https://static.djtest.cn/jz/assets/fe-jz/jz-utils-develop/index.html'
      }, {
        text: '模板文档',
        link: 'http://git.daojia-inc.com/jz-fe-tech/vue-cli-preset'
      }]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const data = await fetchData({})
      console.log('接口示例', data)
    }<% if (options.routerMode) { %>,
    more () {
      this.$router.push({ path: '/about' })
    }<% } %>
  }
}
</script>

<style lang="scss" module>
  .wrap {
    text-align: center;
    padding: 150px 40px;
    h1 {
      font: $font-title-2;
      color: $color-red;
      margin-top: 60px;
      line-height: 60px;
    }
    section {
      margin: 40px 0 100px;
      a {
        color: $color-content;
        @include border-1px-r();
        padding-right: 10px;
        margin-right: 10px;
        &:hover {
          color: $color-red;
        }
      }
    }
  }
</style>
