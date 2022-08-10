const path = require('path')
//const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const sharedConfig = require('./webpack.shared.config.cjs')

//const defaultMinifyOptions = {
//    collapseWhitespace: true,
//    keepClosingSlash: true,
//    removeComments: true,
//    removeRedundantAttributes: true,
//    removeScriptTypeAttributes: true,
//    removeStyleLinkTypeAttributes: true,
//    useShortDoctype: true
//}

const config = {
    entry: './src/client.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist/client'),
        publicPath: '/client/',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',
                generator: {
                    outputPath: './assets',
                    publicPath: '/client/assets/',
                }
            },
            {
                test: /\.woff$/,
                type: 'asset/resource',
                generator: {
                    outputPath: './assets',
                    publicPath: '/client/assets/',
                }
            }
        ]
    },
    plugins: [
        //new htmlWebpackPlugin({
        //    title: '',
        //    template: './index.html',
        //    minify: {
        //        ...defaultMinifyOptions,
        //        removeComments: false
        //    }
        //}),
        new MiniCssExtractPlugin()
    ]
}

module.exports = env => merge(sharedConfig(env), config)