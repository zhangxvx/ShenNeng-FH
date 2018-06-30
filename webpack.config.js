let path = require('path');
let extend = require('extend');
let webpack = require('webpack');

let commonSettings = {
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
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  devtool: 'inline-source-map',
  target: 'web',
  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env": {
  //       NODE_ENV: JSON.stringify("production")
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin()
  // ]
};



let normalSettings = {
  name: 'normal',
  entry: {
    app: './src/main.js',
    t: './src/test.js',
  },
};

module.exports = [
  extend({}, commonSettings, normalSettings)
];