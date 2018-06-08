const path = require('path');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const PATH = {
    css: './assets/css',
    js: './assets/js'
};

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    watch: false,
    devtool: 'source-map',
    entry: {
        common: './bootstrap.scss',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./assets/js/[name].js"
    },
    resolve: {
        //extensions: ['js', 'css']
    },
    module: {
      rules: [
          {
              test: /\.sass$|\.scss$/,
              use: [
                  MiniCssExtractPlugin.loader,
                  {
                      loader: 'css-loader',
                      options: {
                          url: false
                      },
                  },
                  {
                      loader: "sass-loader"
                  }
              ]
          }
      ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
};