const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
  mode: 'development',
  entry: glob.sync('./src/*.html').reduce((entries, filePath) => {
    const entryName = path.basename(filePath, '.html');
    entries[entryName] = `./${filePath}`; // Add './' at the beginning
    return entries;
  }, {}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use : {
          loader: "babel-loader",
        },
      }
    ],
  },
  plugins: glob.sync('./src/*.html').map((filePath) => {
    const entryName = path.basename(filePath, '.html');
    return new HtmlWebpackPlugin({
      filename: `./${entryName}.html`, // Add './' at the beginning
      template: filePath,
      chunks: [entryName],
    });
  }),
};
