import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

let TARGET = process.env.npm_lifecycle_event;
let ROOT_PATH = path.resolve(__dirname)

let common = {
  entry: path.resolve(ROOT_PATH, 'app', ),
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.css$/,
        loaders: ['style', 'css'],
        include: path.resolve(ROOT_PATH, 'app')
      },
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ]
  },
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': "'production'"
        }
      })
    ]
  })
}
