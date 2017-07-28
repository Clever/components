/* webpack_styles.config.js
 *
 * This file handles building the main stylesheet
 * and embedding the fonts and images that it requires.
 * The result is a single CSS file of the format "style_VERSION.css"
 * that can be uploaded to a CDN.
 *
 * Usage: webpack --config webpack_styles.config.js
 */

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const version = require("./package.json").version;
const filename = `style_${version}.css`;

const entries = {};
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
        loaders: ["style", "css", "postcss"],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader"),
      },
    ],
  },
  postcss: [autoprefixer({browsers: "> 1% in US, last 3 versions, ie > 9"})],
  plugins: [new ExtractTextPlugin(filename)],
};
