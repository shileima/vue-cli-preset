module.exports = [
  {
    name: "group",
    type: "list",
    message: `选择git group分组`,
    choices: [
      { name: '用户业务(jz-fe-user)', value: 'jz-fe-user' },
      { name: '保洁业务(jz-fe-clean)', value: 'jz-fe-clean' },
      { name: '长沙商业侧业务(jz-fe-business)', value: 'jz-fe-business' },
      { name: '数据&中台(jz-fe-common)', value: 'jz-fe-common' },
      { name: '职培业务( jz-fe-edu)', value: 'jz-fe-edu' },
      { name: '平台业务(fe)', value: 'fe' },
      { name: '技术类(jz-fe-tech)', value: 'jz-fe-tech' }
    ]
  },
  {
    name: "terminal",
    type: "list",
    message: `请选择依赖的组件类库`,
    choices: [
      { name: 'C端', value: 'user' },
      { name: 'B端', value: 'worker'},
      { name: '员工端', value: 'agent'}
    ]
  },
  {
    name: "routerMode",
    type: "list",
    message: `选择Vue Router模式`,
    choices: [
      { name: 'History', value: 'history' },
      { name: 'Hash', value: 'hash' },
      { name: '不用router', value: null }
    ],
    default: 'history'
  },
  {
    name: "vuex",
    type: "confirm",
    message: `是否使用vuex`,
    default: true
  },
  {
    name: "sendmiddle",
    type: "confirm",
    message: `是否部署到中间层`,
    default: true
  },
  {
    name: "inputSentryProject",
    type: "input",
    message: `sentry的项目名:（默认与本项目名相同)`,
    default: 'yes'
  },
  {
    name: "sentryDSN",
    type: "input",
    default: '',
    message: `sentry项目的dsn:`,
  }
]