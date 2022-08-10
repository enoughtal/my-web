const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const sharedConfig = require('./webpack.shared.config.cjs')

const config = {
    target: 'node',
    externals: [nodeExternals()],
    entry: './index.js',
    output: {
        filename: 'server.cjs',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            emit: false
                        }
                    },
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
                    emit: false,
                }
            },
            {
                test: /\.woff$/,
                type: 'asset/resource',
                generator: {
                    outputPath: './assets',
                    publicPath: '/client/assets/',
                    emit: false,
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}

module.exports = env => merge(sharedConfig(env), config)