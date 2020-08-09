const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  configureWebpack: config => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        'element-ui': 'element-ui',
        'async-validator': 'async-validator',
        lodash: 'lodash'
      })
    } else {
      // 项目标题
      config.plugin('html').tap(args => {
        args[0].title = 'vue-element-table-templ'
        return args
      })
      config
        .entry('app')
        .clear()
        .add('./example/main.js')
    }

    config.resolve.alias
        .set('@', resolve('example'))
        .set('@plugin', resolve('src'))
  },
  // 不需要生产环境的 source map
  productionSourceMap: false,
  publicPath: !isProd ? '/' : '',
  css: {
    // 是否将css 提取到独立的文件,生产环境提取，开发环境不提取
    extract: !!isProd,
    // 开发模式开启css sourcemap
    sourceMap: !isProd
  },
  devServer: {
    port: 8088
  }
}
