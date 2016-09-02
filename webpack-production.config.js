const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');
const config = {
  entry: [path.join(__dirname, '/src/app/app.js')],
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      'local-t2-device-redux': 'src/lib/local-t2-device-redux/index.js',
      'local-t2-navigation-redux': 'src/lib/local-t2-navigation-redux/index.js'
    }
  },
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
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'ad-pwa-cache1',
        filename: 'ad-service-worker.js',
        maximumFileSizeToCacheInBytes: 104857600,
        staticFileGlobs: ['build/**/*.{js,html,css,png,jpg,gif,mp4}'],
        "stripPrefix": "build/"
      }
    ),
    new PathRewriterPlugin()
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
        /*
        TODO upping limit cause images to in-line but this causes probems
        with webpack-path-rewriter https://github.com/skozin/webpack-path-rewriter
         */
      },
      {
          test: /\.css/,
          loader: "file?name=[name]-[hash].[ext]"
      },
      {
        test: /[.]html$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].html'
        })
      }
    ],
  },
};

module.exports = config;
