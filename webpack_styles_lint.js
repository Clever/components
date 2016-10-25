var StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path:     "lintout",
    filename: "lint-results.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  module: {
    loaders: [
      {
        test: /\.(eot|woff|svg|ttf|png)$/,
        loader: "url",
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"],
      },
      {
        test: /\.less$/,
        loader: "style!css!less",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"],
        },
      },
    ],
  },
  plugins: [
    new StyleLintPlugin({
      configFile: ".stylelintrc",
      context: "inherits from webpack",
      syntax: "less",
      files: "src/*.less",
      failOnError: false,
    }),
  ],
};