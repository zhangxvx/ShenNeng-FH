let path = require('path');
let extend = require('extend');
let webpack = require('webpack');

let commonSettings = {
  entry: {
    app: './src/main.js',
    t: './src/test.js',
  },
  output: {
    path: path.resolve(__dirname, './des'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: path.resolve(__dirname, './src')
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',
};

module.exports = commonSettings