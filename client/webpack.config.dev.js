const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");

const config = () => {
    const envKeys = {
      SERVER_URL: JSON.stringify(process.env.SERVER_URL || "http://localhost:3003")
    };
  
    return {
      mode: "development",
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components', '@babel/proposal-class-properties']
              }
            }
          },
        ]
      },
      output: {
        path: path.join(__dirname, "dist"),
        filename: `[name].bundle.js`,
        sourceMapFilename: `[file].map`,
        publicPath: "/",
      },
      devtool: "source-map",
      devServer: {
        client: {
          overlay: false,
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
            "process.env": envKeys
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