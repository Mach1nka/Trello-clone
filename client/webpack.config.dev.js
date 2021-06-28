const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");

const config = () => {
    const envKeys = {
      NODE_ENV: JSON.stringify("development"),
      BACK_ENV: JSON.stringify("development"),
    };
  
    return {
      mode: "development",
      output: {
        path: path.join(__dirname, "dist"),
        filename: `[name].bundle.js`,
        sourceMapFilename: `[file].map`,
        publicPath: "/",
      },
      devtool: "source-map",
      devServer: {
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        hot: true,
        historyApiFallback: true
      },
      plugins: [
        new webpack.DefinePlugin(
          {
            "process.env": envKeys,
            SERVER_URL: JSON.stringify(process.env.SERVER_URL || "http://localhost:3003")
          },
        ),
      ],
      module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                      'style-loader',
                      {
												loader: "css-loader", 
												options: {
													sourceMap: true,
												},
											},
											{
												loader: "postcss-loader",
												options: {
													plugins: [
														require("autoprefixer"),
													],
													sourceMap: true,
												},
											}
                ]
            }
        ],
      },
      optimization: {
        splitChunks: {
          chunks: "all",
        },
      },
    }
  };
  
  module.exports = (env, argv) => {
    return merge(baseConfig(), config(argv));
  };