module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'dist/index.js',
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

