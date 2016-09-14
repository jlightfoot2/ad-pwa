var nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

//  const HtmlWebpackPlugin = require('html-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');
const config = {

  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  resolve: {
    root: path.resolve(__dirname)
  },
  // Server Configuration options
  plugins: [

    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),

    new PathRewriterPlugin({includeHash: true})
  ],
  module: {
    loaders: [
      {
        // React-hot loader and
        test: /\.js$/, // All .js files
        loaders: ['react-hot', 'babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=100'
        /*
        TODO upping limit cause images to inline but this causes probem
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
