const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./docs/docs.jsx",
  output: {
    path: "docs",
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".less"],
    alias: {
      src: "src",
      utils: "src/utils",
      less: "src/less",
    },
    root: [__dirname],
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
        loader: "style!css!postcss!less",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          plugins: [`${__dirname}/transform-code-string`],
        },
      },
    ],
  },
  postcss: [autoprefixer({browsers: "> 1% in US, last 3 versions, ie > 9"})],
};
