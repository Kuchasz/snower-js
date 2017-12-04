const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    resolve("./client/index.js"),
    "babel-polyfill"
  ],
  output: {
    filename: "bundle.js",
    path: resolve("./public")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "stylus-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: [".js", ".styl"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("./index.html")
    }),
    new ExtractTextPlugin('[name].css')
  ]
};
