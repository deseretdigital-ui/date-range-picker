/* eslint-env node */

var path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(
    __dirname,
    'example/example.jsx'
  ),
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'example.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  }
};
