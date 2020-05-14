# vue-cli-preset

[vue项目开发预设模板](http://confluence.daojia-inc.com/pages/viewpage.action?pageId=82785024)

## 安装

首先请确保全局安装vue-cli 3.0, 并保证版本最新

```
> npm install -g @vue/cli
```

## 创建项目

```
线上创建
> vue create --preset git.daojia-inc.com:jz-fe-tech/vue-cli-preset --clone your-project-name

或本地创建
git clone http://git.daojia-inc.com/jz-fe-tech/vue-cli-preset.git
vue create --preset ./vue-cli-preset your-project-name

```

## 开发

```
开发
npm run dev
构建
npm run build:[env]
```

## feature

- [x] 模板
  - [x] 基于vue-cli3, [配置参考](https://cli.vuejs.org/zh/config/#vue-config-js), 如遇wepack配置问题可使用````npm run inspect```查看原生webpack配置
  - [x] 默认引入家政通用类库[jz-utils](http://git.daojia-inc.com/jz-fe-tech/jz-utils)
  - [x] 根据不同端引入C/B/员工端组件库[jz-ui-user/worker/agent](http://confluence.daojia-inc.com/pages/viewpage.action?pageId=90432345)
  - [x] 模板中自动引入组件库中的基础scss变量
  - [x] 使用postcss插件postcss-plugin-px2rem(rem单位1:100), 自动转换rem, 项目中可直接书写px

- [x] 特殊环境变量
  - [x] VUE_APP_MODE: 用于区分各测试/沙箱/线上环境(`test(a/b/c/d)`/sandbox/production)
  - [x] NODE_ENV: 用于webpack原生mode, [取值参考](https://www.webpackjs.com/concepts/mode/)
  - [x] VUE_APP_PAGE_DATA: 用于输出ejs语法的PAGE_DATA, 如果是中间层部署可能需要
  - [x] 环境变量在.env.xx文件中声明,.env.local只在本地有效,自定义的环境变量要以`VUE_APP_`开头才能在客户端       项目中访问，详见[文档](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E5%9C%A8%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BE%A7%E4%BB%A3%E7%A0%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

- [x] css 相关
  - [x] css modules 代替scope
  - [x] cssnano 优化 CSS 大小

- [x] 调试&代理
  - [x] 测试&开发环境自动引入vconsole
  - [x] 去掉本地mock, 代理到接口平台mock

- [x] 部署
  - [x] 使用`fe-cdnpath-transform`插件自动获取djoy配置路径, [域名规则参考](http://confluence.daojia-inc.com/pages/viewpage.action?pageId=92079942)
  - [x] 部署: 使用djoy进行自动部署

- [x] 与中间层打通
  - [x] 配置简化
  - [x] 直接输出ejs模板, [@webpack/plugin-custom-template](http://confluence.daojia-inc.com/pages/viewpage.action?pageId=86752827)
  - [x] 将ejs模板输出到指定的中间层项目的对应目录, [jz-sendMiddle](http://git.daojia-inc.com/jz-fe-tech/jz-sendmiddle)
  - [x] jz-sendmiddle插件采用js配置文件方式使用, 请配置`/sendmiddle.js`中相关参数

- [x] 规范
  - [x] eslint standard标准, pre-commit lint
  - [x] git commit 提交规范 pre-commit lint, [提交标准](https://github.com/conventional-changelog/commitlint#what-is-commitlint)


