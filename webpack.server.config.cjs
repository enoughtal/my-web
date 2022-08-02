const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/server.jsx',
    output: {
        path: path.resolve(__dirname, './dist/server'),
        filename: 'server.cjs',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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
                test: /\.(sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
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
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}