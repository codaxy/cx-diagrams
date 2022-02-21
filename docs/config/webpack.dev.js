const webpack = require('webpack'),
   { merge } = require('webpack-merge'),
   common = require('./webpack.config'),
   path = require('path');

process.env.TAILWIND_MODE = 'watch';

module.exports = async () => {
   return merge(common({ tailwindOptions: {}, rootCssLoader: 'style-loader' }), {
      mode: 'development',

      //plugins: [new webpack.HotModuleReplacementPlugin()],

      devtool: 'eval',

      output: {
         publicPath: '/',
      },

      devServer: {
         hot: true,
         port: 5544,
         historyApiFallback: true,
         static: path.join(__dirname, '../public'),
      },
   });
};
