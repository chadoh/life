import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import Clean from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import pkg from './package.json'

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const common = {
  entry: APP_PATH,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=/[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
        include: APP_PATH
      },
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: APP_PATH
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: APP_PATH,
      port: 3000,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      loaders: [
        {
          test: /.css$/,
          loaders: ['style', 'css'],
          include: APP_PATH
        },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    entry: {
      app: APP_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    /* important! */
    output: {
      path: BUILD_PATH,
      filename: '[name].[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: APP_PATH
        },
      ]
    },
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      ),
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
