module.exports = (api, options, rootOptions) => {
  let scriptsObj = {
    "dev": "vue-cli-service serve",
    "inspect": "vue-cli-service inspect",
    "build:testa": "vue-cli-service build --mode testa",
    "build:testb": "vue-cli-service build --mode testb",
    "build:testc": "vue-cli-service build --mode testc",
    "build:testd": "vue-cli-service build --mode testd",
    "build:sandbox": "vue-cli-service build --mode sandbox && node deleteMap.js",
    "build:prod": "vue-cli-service build --mode production && node deleteMap.js",
  }
  let devDependenciesObj = {
    "@babel/preset-env": "^7.5.5",
    "terser-webpack-plugin": "^1.1.0",
    "cssnano-preset-advanced": "^4.0.7",
    "postcss-plugin-px2rem": "^0.8.1",
    "@webpack/plugin-custom-template": "^1.0.0",
    "@sentry/webpack-plugin": "^1.8.1",
    "babel-plugin-component": "^1.1.1",
    "fe-cdnpath-transform": "^1.0.1",
    "@daojia/prohibit-soucemap": "^1.0.1"
  }
  let dependenciesObj = {
    "jz-utils": "^1.0.10",
    "@babel/polyfill": "^7.4.4"
  }
  if (options.vuex) {
    dependenciesObj['vuex'] = "^3.0.1"
  }
  if (options.routerMode) {
    dependenciesObj['vue-router'] = "^3.0.3"
  }
  // 部署命令
  if (options.sendmiddle) {
    scriptsObj = Object.assign({}, scriptsObj, {
      "build:testa": "vue-cli-service build --mode testa && node sendmiddle.js test",
      "build:testb": "vue-cli-service build --mode testb && node sendmiddle.js test",
      "build:testc": "vue-cli-service build --mode testc && node sendmiddle.js test",
      "build:testd": "vue-cli-service build --mode testd && node sendmiddle.js test",
      "build:sandbox": "vue-cli-service build --mode sandbox && node deleteMap.js && node sendmiddle.js sandbox",
      "build:prod": "vue-cli-service build --mode production && node deleteMap.js && node sendmiddle.js production",
      "sendmiddle": "jz-sendmiddle"
    })
    devDependenciesObj = Object.assign({}, devDependenciesObj, {
      "jz-sendmiddle": "^1.2.2"
    })
  }
  
  // 组件库依赖
  if (options.terminal === 'user') {
    dependenciesObj = Object.assign({}, dependenciesObj, {"jz-ui-user": "^1.1.10-beta"})
  } else if (options.terminal === 'worker') {
    dependenciesObj = Object.assign({}, dependenciesObj, {"jz-ui-worker": "^1.0.3-beta"})
  } else if (options.terminal === 'agent') {
    dependenciesObj = Object.assign({}, dependenciesObj, {"jz-ui-agent": "^1.1.8-beta"})
  }
  
  // 安装基础公共库
  api.extendPackage({
    scripts: scriptsObj,
    group: options['group'],
    dependencies: dependenciesObj,
    devDependencies: devDependenciesObj
  })

  // commitizen - 协助开发者提交标准的 git message
  api.extendPackage({
    devDependencies: {
      'commitizen': '^3.0.2',
      'cz-conventional-changelog': '^2.1.0'
    }
  })

  api.extendPackage({
    config: {
      'commitizen': {
        'path': './node_modules/cz-conventional-changelog'
      }
    }
  })

  // commitlint - 校验 git 提交信息格式
  api.extendPackage({
    devDependencies: {
      '@commitlint/cli': '^7.2.1',
      '@commitlint/config-conventional': '^7.1.2'
    }
  })

  api.extendPackage({
    gitHooks: {
      'commit-msg': 'commitlint -e'
    }
  })

  api.extendPackage({
    commitlint: {
      'extends': ['@commitlint/config-conventional']
    }
  })

  // 删除 vue-cli3 默认目录
  api.render((files, render) => {
    Object.keys(files)
      .filter(path => {
        return path.startsWith('src/') || path.startsWith('public/')
      })
      .forEach(path => delete files[path])
  })

  // 公共基础目录和文件
  api.render('./template')
  
  // 删除不必要的文件
  api.render(files => {
    Object.keys(files)
    .filter(path => {
      const middlewareFlag = !options.sendmiddle && (path.includes('sendmiddle.js') || path.includes('public/pageDataMock.js'))
      const vuexFlag = !options.vuex && path.includes('src/store')
      const vuerouterFlag = !options.routerMode && path.includes('src/router')
      return middlewareFlag || vuexFlag || vuerouterFlag
    })
    .forEach(path => delete files[path])
  })

  api.render({
    '.env.development': './template/.env.development',
    '.env.local': './template/_env.local',
    '.env.testa': './template/.env.testa',
    '.env.testb': './template/.env.testb',
    '.env.testc': './template/.env.testc',
    '.env.testd': './template/.env.testd',
    '.env.sandbox': './template/.env.sandbox',
    '.env.production': './template/.env.production',
    '.sentryclirc': './template/.sentryclirc',
    '.browserslistrc': './template/.browserslistrc'
  })
  
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
