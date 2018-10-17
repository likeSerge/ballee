const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
  },

  resolve: {
    extensions: [".js", ".ts"]
  },

  module: {
    rules: [
      {test: /\.ts$/, loader: "awesome-typescript-loader"},

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],

  mode: "development"
};