const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    //mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    //experiments: {
    //    outputModule: true
    //},
    resolve: {
        extensions: ['.jsx', '...']
    },
    entry: './src/server.jsx',
    output: {
        path: path.resolve(__dirname, './dist/server'),
        filename: 'server.js',
        clean: true,
        //chunkFormat: 'commonjs',
        //module: true
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
                test: /\.(sass|css)$/,
                //loader: 'css-loader',
                //options: {
                //    modules: {
                //        exportOnlyLocals: true
                //    }
                //}
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