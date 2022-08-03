const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { defaultMinimizerOptions } = require('html-loader')

module.exports = {
    mode: 'production',
    //experiments: {
    //    outputModule: true
    //},
    resolve: {
        extensions: ['.jsx', '...']
    },
    entry: './src/client.jsx',
    output: {
        path: path.resolve(__dirname, './dist/client'),
        filename: 'client.js',
        clean: true,
        //chunkFormat: 'module'
        //library: {
        //    type: 'module'
        //}
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.woff$/,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: {
                        ...defaultMinimizerOptions,
                        removeComments: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: false
            }
        }),
        new MiniCssExtractPlugin()
    ]
}