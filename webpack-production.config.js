const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
//  const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    filename: 'app.js' // Name of output file
  },
  plugins: [
    // http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      children: true, // Look for common dependencies in all children,
      minChunks: 2 // How many times a dependency must come up before being extracted
    }),

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200 // ~50kb
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: true
      }
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'ad-pwa-cache1',
        filename: 'ad-service-worker.js',
        maximumFileSizeToCacheInBytes: 104857600,
        staticFileGlobs: [
          'build/manifest.json',
          'build/**/*.{html,css,js}',
          'build/static/**/*.{png,jpg,jpeg,svg,gif,mp4,json}'
        ],
        runtimeCaching: [
          {
            handler: 'cacheFirst',
            urlPattern: /dynamic\/[\w_-]+\.(gif|jpg|jpeg|png|svg)$/i
          },
          {
            handler: 'networkFirst',
            urlPattern: /dynamic\/[\w_-]+\.(mp4|mp3)$/i
          }
        ],
        'stripPrefix': 'build/'
      }
    ),
    new PathRewriterPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url?limit=100&name=static/[name]-[hash].[ext]'
        /*
        TODO upping limit cause images to in-line but this causes probems
        with webpack-path-rewriter https://github.com/skozin/webpack-path-rewriter
         */
      },
      {
        test: /\.(mp3|mp4)$/i,
        loader: 'file?name=dynamic/[name]-[hash].[ext]'
      },
      {
        test: /\.css/,
        loader: 'file?name=[name]-[hash].[ext]'
      },
      {
        test: /[.]html$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].html'
        })
      },
      {
        test: /[.]ico$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].ico'
        })
      }
    ]
  }
};

module.exports = config;
