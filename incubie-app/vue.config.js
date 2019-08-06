const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: true,
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    open: false,
    proxy: {
      '/api/v1': {
        target: 'http://0.0.0.0:3030',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // mutate config for production...
  //   } else {
  //     // mutate for development...
  //   }
  // }
}
