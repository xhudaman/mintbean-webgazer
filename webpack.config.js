const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "src/index.js"
  },
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 3000
  }
};
