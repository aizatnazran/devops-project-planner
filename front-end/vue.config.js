const fs = require('fs');
const webpack = require('webpack');

module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
  },
  configureWebpack: (config) => {
    const version = fs.existsSync('./VERSION.txt')
      ? fs.readFileSync('./VERSION.txt', 'utf8').trim()
      : 'development';

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_VERSION: JSON.stringify(version),
        },
      })
    );
  },
};
