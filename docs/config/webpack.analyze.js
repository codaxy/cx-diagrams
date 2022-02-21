const { merge } = require('webpack-merge'),
   prod = require('./webpack.prod'),
   BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(prod, {
   optimization: {
      concatenateModules: false,
   },
   plugins: [new BundleAnalyzerPlugin()],
});
