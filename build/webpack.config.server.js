const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config = merge( baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    devtool : 'source-map',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server-entry.js',
      path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),
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
    resolve: {
      "alias": {
        'vue': path.join(__dirname,'../node_modules/vue/dist/vue.esm.js') // 指定使用哪个版本的vue
      }
    },
    plugins: [
      new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server'
      }),
      new VueServerPlugin
      // new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ]
  })

module.exports = config
