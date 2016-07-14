const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const config = {
  entry: [path.join(__dirname, '/src/app/app.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Transfer Files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'ad-asset-cache1',
        filename: 'ad-service-worker.js',
        maximumFileSizeToCacheInBytes: 4194304,
        runtimeCaching: [{
          handler: 'cacheFirst',
          urlPattern: /\.(gif|jpg|jpeg|png)$/i,
        }],
      }
    ),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      {
        test:   /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=100',
      }
    ],
  },
};

module.exports = config;
