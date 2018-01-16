module.exports = {
  entry: ['./index.js'],
  output: {
    filename: './bundle.js',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env'],
        },
      }
    ],
  }
};

