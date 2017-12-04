const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: resolve("./client/index.js"),
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
      }
    ]
  },
  resolve: {
    extensions: [".js"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: resolve('./index.html') })]
};
