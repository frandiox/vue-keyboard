const webpack = require("webpack");
const version = require("./package.json").version;
const banner = "/**\n" + " * vue-keyboard v" + version + "\n" + " * https://github.com/MartyWallace/vue-keyboard\n" + " * Released under the MIT License.\n" + " */\n";

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: __dirname + '/dist',
    filename: 'vue-keyboard.js',
    library: 'vue-keyboard',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env" : {
        NODE_ENV : JSON.stringify("production"),
      },
    }),
    new webpack.BannerPlugin({
      banner: banner
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      }
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
      }),
    ],
  },
};
