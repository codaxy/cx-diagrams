const HtmlWebpackPlugin = require('html-webpack-plugin'),
   path = require('path'),
   babelCfg = require('./babel.cx.config'),
   p = (p) => path.join(__dirname, '../', p || ''),
   CxScssManifestPlugin = require('./CxScssMainfestPlugin'),
   tailwindConfig = require('../tailwind.config'),
   tailwindcss = require('tailwindcss'),
   manifest = require('cx/manifest');

module.exports = ({ rootCssLoader, tailwindOptions }) => {
   return {
      resolve: {
         alias: {
            //app: p('app'),
            //uncomment the line below to alias cx-react to cx-preact or some other React replacement library
            //'cx-react': 'cx-preact',
         },
      },

      //   externals: {
      //      react: 'React',
      //      'react-dom': 'ReactDOM',
      //      'react-dom/client': 'ReactDOM',
      //   },

      module: {
         rules: [
            {
               test: /\.(js|ts|tsx)$/,
               //add here any ES6 based library
               //    include: [
               //       p('common'),
               //       p('app'),
               //       //   /packages[\\\/]cx/,
               //       //   /node_modules[\\\/](cx|cx-react|cx-theme-\w*|cx-google-maps)[\\\/]/,
               //    ],
               use: [
                  {
                     loader: 'swc-loader',
                     options: {
                        jsc: {
                           loose: true,
                           target: 'es2021',
                           parser: {
                              syntax: 'typescript',
                              decorators: true,
                              tsx: true,
                           },
                           experimental: {
                              plugins: [
                                 [
                                    require.resolve('swc-plugin-transform-cx-jsx/swc_plugin_transform_cx_jsx_bg.wasm'),
                                    { trimWhitespace: true, autoImportHtmlElement: true },
                                 ],
                                 [
                                    require.resolve(
                                       'swc-plugin-transform-cx-imports/swc_plugin_transform_cx_imports_bg.wasm'
                                    ),
                                    { manifest, useSrc: true },
                                 ],
                              ],
                           },
                           transform: {
                              react: {
                                 pragma: 'VDOM.createElement',
                              },
                           },
                        },
                     },
                  },
               ],
            },
            {
               test: /\.scss$/,
               use: [rootCssLoader, 'css-loader', 'sass-loader'],
            },
            {
               test: /\.css$/,
               use: [
                  rootCssLoader,
                  'css-loader',
                  {
                     loader: 'postcss-loader',
                     options: {
                        postcssOptions: {
                           ident: 'postcss',
                           plugins: [tailwindcss({ ...tailwindConfig, ...tailwindOptions })],
                           cacheInclude: [/.*\.(css|scss)$/, /.tailwind\.config\.js$/],
                        },
                     },
                  },
               ],
            },
            {
               test: /\.(png|jpg|svg)$/,
               type: 'asset',
            },
         ],
      },
      entry: {
         app: [p('app/index.js'), p('app/index.scss'), p('app/tailwind.css')],
      },
      plugins: [
         new HtmlWebpackPlugin({
            template: p('app/index.html'),
         }),

         new CxScssManifestPlugin({
            outputPath: p('app/manifest.scss'),
         }),
      ],

      optimization: {
         usedExports: true,
      },

      cache: {
         type: 'filesystem',
         buildDependencies: {
            config: [
               __filename,
               p('config/webpack.dev.js'),
               p('config/webpack.prod.js'),
               p('config/webpack.analyze.js'),
               p('config/babel.config.js'),
               p('tailwind.config.js'),
            ],
         },
      },
   };
};
