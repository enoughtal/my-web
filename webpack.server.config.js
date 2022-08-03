const path = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    //mode: 'production',
    target: false,
    //target: 'node',
    externals: [nodeExternals()],
    experiments: {
        outputModule: true
    },
    resolve: {
        extensions: ['.jsx', '...']
    },
    entry: './src/server.jsx',
    output: {
        path: path.resolve(__dirname, './dist/server'),
        publicPath: '/',
        filename: 'server.js',
        clean: true,
        chunkFormat: 'module',
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            emit: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        //options: {
                        //    modules: {
                        //        exportOnlyLocals: true
                        //    }
                        //}
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',
                generator: {
                    emit: false
                }
            },
            {
                test: /\.woff$/,
                type: 'asset/resource',
                generator: {
                    emit: false
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}