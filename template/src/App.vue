<template>
  <div id="app">
  <% if (options.routerMode) { %> <router-view/><% } else { %><home></home><% } %>
  </div>
</template>

<script>
<% if (!options.routerMode) { %>
  import home from '@/views/home/Home.vue'
<% } %>
export default {
  data () {
    return {}
  },
  methods: {
  },
  components: {
  <% if (!options.routerMode) { %>home<% } %>
  }
}
</script>

<style lang="scss">
  @import "jz-ui-<%= options.terminal %>/src/style/reset.scss";
</style>
