const env = process.argv[2]
const jzSendmiddle = require('jz-sendmiddle')
const repoUrl = '' // 远程服务端git仓库
const files = [
  {
    from: `dist/<%= rootOptions['projectName'] %>/*`, // 客户端目录
    to: `src/app/<%= rootOptions['projectName'] %>/views` // 服务端目录
  }
]

let branch = ''
let destBranch = ''

switch (env) {
  case 'test':
    branch = ''
    destBranch = ''
    break
  case 'sandbox':
    branch = ''
    destBranch = ''
    break
  case 'production':
    branch = ''
    destBranch = ''
}

jzSendmiddle({
  files,
  repoUrl,
  branch,
  destBranch
})
