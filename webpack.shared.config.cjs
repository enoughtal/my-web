const { DefinePlugin } = require('webpack')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = env => ({
    mode: env.production
        ? 'production'
        : 'development',
    //devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '...'],
        mainFiles: ['index']
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|cjs)$/,
                exclude: /node_modules/,
                resolve: {
                    fullySpecified: false
                },
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        [
                            '@babel/preset-react',
                            { runtime: 'automatic' }
                        ]
                    ]
                }
            },
            {
                test: /\.txt/,
                type: 'asset/inline',
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            _DATA_HOST: env.production ? '"hueyond.run"' : '"localhost"',
            _DATA_PORT: env.localhostDev ? '"444"' : '"443"',
        }),
        //new BundleAnalyzerPlugin()
    ]
})