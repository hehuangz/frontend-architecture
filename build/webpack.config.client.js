const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const baseConfig = require('./webpack.config.base')
// 开发环境的设置
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true,
  historyApiFallback: {
    index: '/public/index.html'
  }
}

/**
 * webpack的公共设置，使run dev的时候执行index.html的代码，否则是访问目录文件
 * 单独写，不放在base.js中是为了服务器渲染时需要改写
 */

const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
let config
if (isDev) {
  config= merge( baseConfig, {
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
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config= merge( baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugin.concat([
      new ExtractPlugin('styles.[md5:contenthash:hex:8].css')
      // new ExtractPlugin('styles.[content:20].css')
      // 由于extract-text-webpack-plugin不再支持webpack4，需要用mini-css-extract-plugin替换，
      // 我还未替换，先暂时这么写
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // })
    ])
  })
}

module.exports = config
