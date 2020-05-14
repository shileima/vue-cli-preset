module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ],
  plugins: [
    // 按需加载组件库
    // ['component', {
    //   libraryName: 'jz-ui-<%= options.terminal %>',
    //   libDir: 'dist',
    //   styleLibrary: {
    //     name: '/',
    //     path: '[module]/index.css'
    //   }
    // }]
  ]
}
