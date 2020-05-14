module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: ['advanced', {
        zindex: false,
        reduceIdents: false // 防止改写keyframes命名
      }]
    },
    'postcss-plugin-px2rem': {
      remUnit: 100,
      exclude: /(node_module)/,
      mediaQuery: true,
      minPixelValue: 2
    }
  }
}
