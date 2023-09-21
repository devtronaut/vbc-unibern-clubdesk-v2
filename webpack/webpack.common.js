const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
      // should use babel-loader for all ts js tsx and jsx files
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'babel-loader',
            },
        ],
      },
      {
          // should use style-loader and css-loader for all css files
          test: /\.css$/,
          include: path.resolve(__dirname, '..', './src'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        // filename: '[name].[chunkhash].js',
        // publicPath: 'wwwfiles',
        filename: 'main.js',
    },
  plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "..", "./src/index.html")
      })
    ],
}