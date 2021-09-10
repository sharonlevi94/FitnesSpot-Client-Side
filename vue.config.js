module.exports = {
  pluginOptions: {
    quasar: {}
  },
  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar[\\/]/
  ],
  configureWebpack: {
    devtool: 'source-map',
  },
}
