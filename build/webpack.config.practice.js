const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 开发环境的设置
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true
}

/**
 * webpack的公共设置，使run dev的时候执行index.html的代码，否则是访问目录文件
 * 单独写，不放在base.js中是为了服务器渲染时需要改写
 */

const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname,'template.html') // 指定使用哪个html文件
  })
]
let config= merge( baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devtool : '#cheap-module-eval-source-map',
    devServer,
    resolve: {
      "alias": {
        'vue': path.join(__dirname,'../node_modules/vue/dist/vue.esm.js') // 指定使用哪个版本的vue
      }
    },
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })

module.exports = config
