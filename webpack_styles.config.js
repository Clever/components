/* webpack_styles.config.js
 *
 * This file handles building the main stylesheet
 * and embedding the fonts and images that it requires.
 * The result is a single CSS file of the format "style_VERSION.css"
 * that can be uploaded to a CDN.
 *
 * Usage: webpack --config webpack_styles.config.js
 */

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StyleLintPlugin = require("stylelint-webpack-plugin");

var version = require("./package.json").version;
var filename = `style_${version}.css`;

var entries = {};
entries[filename] = "./src/less/index.less";

module.exports = {
  entry: entries,
  output: {
    path:     "dist/css",
    filename: "[name]",
  },
  resolve: {
    extensions: ["", ".less"],
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(filename),
    new StyleLintPlugin({
      configFile: ".stylelintrc",
      context: "inherits from webpack",
      syntax: "less",
      files: "**/*.less",
      failOnError: false,
    }),
  ],
};
