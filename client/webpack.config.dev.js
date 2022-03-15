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
        client: {
          overlay: true,
        },
        static: {
          directory: path.join(__dirname, 'dist'),
        },
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
      // module: {
      //   rules: [
      //     {
      //       test: /\.(css|sass|scss)$/,
      //       use: [
      //         {
      //           loader: "style-loader", 
      //         },
      //         {
      //           loader: "css-loader", 
      //         },
      //         {
      //           loader: "postcss-loader",
      //           options: {
      //             postcssOptions: {
      //               plugins: [require("autoprefixer")],
      //             }
      //           },
      //         }
      //       ]
      //     }
      //   ],
      // },
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