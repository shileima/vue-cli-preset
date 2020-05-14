const SentryPlugin = require('@sentry/webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PluginCustomTemplate = require('@webpack/plugin-custom-template')
const transformCDNPath = require('fe-cdnpath-transform')
const packageJson = require('./package.json')
const env = process.env.VUE_APP_MODE
// Djoy路径
const publicPath = transformCDNPath(env).djoyPublicPath
// 设置sentry-release全局变量
const sentryRelease = packageJson.name + '-map'

// 页面Pages配置
const PAGES = {
  index: {
    // page 的入口
    entry: 'src/main.js',
    // 模板来源
    template: 'public/index.html',
    // 在 dist/index.html 的输出
    filename: 'index.html',
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', 'index']
  }
}

// webpack配置项
let plugins = [
  new PluginCustomTemplate({
    pages: PAGES
  })
]
if (env === 'production' || env === 'sandbox') {
  plugins.push(new SentryPlugin({
    ignore: ['node_modules'], // 忽视
    include: './dist', // 上传.dist下的js
    configFile: 'sentry.properties', // 配置文件
    release: sentryRelease, // 版本号
    urlPrefix: 'https:' + publicPath + '/' // cdn js代码的‘绝对路径’前缀
  }))
}

module.exports = {
  publicPath: publicPath,
  pages: PAGES,
  filenameHashing: env === 'sandbox' || env === 'production',
  css: {
    requireModuleExtension: true,
    extract: env !== 'development',
    loaderOptions: {
      sass: {
        prependData: `@import "jz-ui-<%= options.terminal %>/src/style/base<%= options.terminal === 'user' ? 'C': (options.terminal === 'worker' ? 'B': 'A') %>.scss";` // 基础sass变量
      }
    }
  },
  transpileDependencies: [],
  chainWebpack: config => {
    // 去掉输出模板的压缩
    Object.keys(PAGES).forEach(page => {
      config.plugin(`html-${page}`).tap((args) => {
        args[0].minify = false
        return args
      })
    })
    // 测试环境js如需添加哈希值请开启
    // config.output.filename('[name].[hash].js').end()
  },
  // 修改webpack配置
  configureWebpack: {
    resolve: {
      alias: {}
    },
    optimization: {
      minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } }, sourceMap: true })]
    },
    plugins
  },
  // mock及代理
  devServer: {
    disableHostCheck: true,
    // eslint报错输出到浏览器
    overlay: {
      warnings: true,
      errors: true
    },
    // 配置代理
    // proxy: {
    //   '/api': {
    //     target: 'https://m.daojia.com'
    //   }
    // }
  },
  // eslint报错展示
  lintOnSave: 'error'
}
