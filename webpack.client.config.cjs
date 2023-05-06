const path = require('path')
//const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const sharedConfig = require('./webpack.shared.config.cjs')

const config = {
    entry: './src/client.js',
    output: {
        //filename: '[name].[contenthash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/client'),
        publicPath: '/client/',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
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
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            //filename: '[name].[contenthash].css'
            filename: '[name].css'
        }),
        //{
        //    // 因为在asset文件名里用了contenthash，所以需要提取出文件名
        //    // 通过temp.txt文件中转
        //    // 这里试过很多方法都不行，比如process.env，DefinePlugin都不行
        //    // 根本原因是：编译client和编译server是两个不同的webpack进程，两个进程之间不互通
        //    // 最后只能用文件做通信
        //    // 这里只是练习使用webpack，硬编码asset的文件名可以省去这些步骤
        //    apply(compiler) {
        //        compiler.hooks.done.tap('P', stats => {
        //            const assets = Object.keys(stats.compilation.assets)
        //                .filter(a => a.includes('main'))
        //                .reduce((obj, a) => {
        //                    if (a.includes('.js')) {
        //                        obj['main.js'] = '/client/' + a
        //                        return obj
        //                    }
        //                    else if (a.includes('.css')) {
        //                        obj['main.css'] = '/client/' + a
        //                        return obj
        //                    }
        //                }, {})

        //            fs.writeFileSync('temp.txt', JSON.stringify(assets))
        //        })
        //    }
        //},
    ]
}

module.exports = env => merge(sharedConfig(env), config)