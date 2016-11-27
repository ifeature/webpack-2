const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/frontend',
  entry: './app.js',
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
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /legacy\.js$/,
        loader: 'imports?user=>{name: "Artem"}!exports?sayHi'
      },
      {
        test: /\.styl$/,
        loader: 'style!css!autoprefixer?browsers=last 2 versions!stylus?resolve url'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=./assets/[path][name].[ext]'
      },
      {test: /\.html$/, loader: 'raw'}
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
