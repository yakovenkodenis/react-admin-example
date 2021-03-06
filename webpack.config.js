/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';

var webpack = require('webpack');
var cssnext = require('cssnext');
var cssgrace = require('cssgrace');
var nested = require('postcss-nested');
var patch = require('path');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: 'source-map',
  entry: [
      'webpack/hot/only-dev-server',
      './src/scripts/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    root: patch.join(__dirname, 'src'),
    extensions: ['', '.js'],
    alias: {
      'actions': 'scripts/actions',
      'constants': 'scripts/constants',
      'components': 'scripts/components/',
      'mixins': 'scripts/mixins',
      'services': 'scripts/services',
      'stores': 'scripts/stores',
      'utils': 'scripts/utils',
      'Dispatcher': 'scripts/dispatcher/Dispatcher.js',
      'ie': 'component-ie',
      'config.json': 'config.dev.json'
    }
  },

  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(ttf|eot|svg)/, loader: 'file-loader' },
      { test: /\.woff(2)?/, loader: 'url-loader?limit=10000&minetype=application/font-woff' }
    ]
  },

  postcss: [
    nested,
    cssnext({
      browsers: ['last 1 version', '> 2%'],
      import: {
        root: 'scripts/styles'
      }
    }),
    cssgrace
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
