const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

// 处理服务端渲染返回的html内容
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等会别着急'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManiFest = clientManifestResp.data

  const template = fs.readFileSync(
    path.json(__dirname, '../server.template.ejs')
  )

  const renderer = VueServerRender
    .createBundleRenderer(bundle, {
      infect: false
    })

  await serverRender(ctx, renderer, template)
}
const router = new Router()
router.get('*', handleSSR)
module.exports = router