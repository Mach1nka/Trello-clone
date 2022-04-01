const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html')
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg']
    }
  }
};
