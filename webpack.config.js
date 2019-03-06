const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'ForSynergy/static/src/index.js')],
  output: {
    path: path.join(__dirname, 'ForSynergy/static/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  watch: true,
  resolve: {
    alias: {
      src: path.join(__dirname, 'ForSynergy/static/src')
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.join(__dirname, 'ForSynergy/static/'),
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader', 'file-loader', 'img-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './ForSynergy/static/public',
    watchContentBase: true,
    compress: true,
    hot: true
  }
};
