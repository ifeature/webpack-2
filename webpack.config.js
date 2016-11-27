const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'frontend'),
  entry: './app.js',
  //watch: true,
  // resolve: {
  //   modulesDirectories: ['node_modules']
  // },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '', //assets
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /legacy\.js$/,
        loaders: [
          'imports-loader?user=>{name: "Artem"}',
          'exports-loader?sayHi'
        ]
      },
      // {
      //   test: /\.styl$/,
      //   loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!stylus-loader?resolve url'
      // },
      {
        test: /\.styl$/,
        loader: ExtractTextWebpackPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions!stylus-loader?resolve url'})
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=./assets/[path][name].[ext]'
      },
      {
        test: /\.hbs/,
        exclude: /(node_modules|bower_components)/,
        loader: 'handlebars-loader'
      },
      {test: /\.html$/, loader: 'raw-loader'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      hash: true
    }),
    new ExtractTextWebpackPlugin('bundle.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: 8081,
    inline: true,
    hot: true,
    contentBase: __dirname + '/build'
  }
};
