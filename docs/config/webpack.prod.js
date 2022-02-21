const webpack = require('webpack'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   { CleanWebpackPlugin } = require('clean-webpack-plugin'),
   CopyWebpackPlugin = require('copy-webpack-plugin'),
   { merge } = require('webpack-merge'),
   common = require('./webpack.config'),
   path = require('path'),
   p = (p) => path.join(__dirname, '../', p || ''),
   { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = merge(common({ rootCssLoader: MiniCssExtractPlugin.loader }), {
   mode: 'production',

   output: {
      path: p('dist'),
      publicPath: '/',
      filename: '[name].ltc.[contenthash].js',
      chunkFilename: '[name].ltc.[contenthash].js',
      hashDigestLength: 6,
   },

   optimization: {
      minimizer: [
         new ESBuildMinifyPlugin({
            target: 'es2015',
            css: true,
         }),
      ],
      concatenateModules: true,
      minimize: true,
   },

   plugins: [
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new MiniCssExtractPlugin({
         filename: '[name].ltc.[contenthash].css',
         chunkFilename: '[name].ltc.[contenthash].css',
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, '../public'),
               to: '.',
            },
            {
               from: path.resolve(__dirname, './netlify.redirects'),
               to: '_redirects',
               toType: 'file',
            },
            {
               from: path.resolve(__dirname, './netlify.headers'),
               to: '_headers',
               toType: 'file',
            },
         ],
      }),
      new CleanWebpackPlugin({
         dry: false,
         dangerouslyAllowCleanPatternsOutsideProject: true,
      }),
   ],
});
