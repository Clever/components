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
};
