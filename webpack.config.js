module.exports = {
  entry: './docs/docs.jsx',
  output: {
    path:     'docs',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[
      {
        test: /\.(eot|woff|svg|ttf)$/,
        loader: 'url'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
