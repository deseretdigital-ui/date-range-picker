var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(
      __dirname,
      'example/example.jsx'
  ),
  output: {
    filename: 'example/example.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
