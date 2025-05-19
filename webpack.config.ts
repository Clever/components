import * as autoprefixer from "autoprefixer";
import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server"; // Side-effect import just to get devServer types.

const config: webpack.Configuration = {
  entry: "./docs/docs.jsx",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
    alias: {
      src: path.resolve(__dirname, "src"),
      utils: path.resolve(__dirname, "src/utils"),
      less: path.resolve(__dirname, "src/less"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(eot|otf|woff|svg|ttf|png|jpg)$/,
        loader: "url-loader",
      },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.docs.json"),
          ignoreDiagnostics: [2307],
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  optimization: {
    nodeEnv: process.env.NODE_ENV || "development",
  },
  devServer: {
    host: "0.0.0.0",
    port: 5010,
    contentBase: "docs/",
    inline: true,
    watchContentBase: true,
    hot: true,
    // The following property is HIGHLY DISCOURAGED in general but can be useful
    // for viewing the frontend from another device (i.e a phone) by navigating
    // to <laptop-ip>:<port> from the device.
    // disableHostCheck: true
  },
};

export default config;
