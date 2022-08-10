const Dotenv = require("dotenv-webpack")

module.exports = env => ({
    mode: env.production
        ? 'production'
        : 'development',
    devtool: 'inline-source-map',
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
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: env.production
                ? `./.env-prod`
                : (env.localhostDev ? `./.env-localhostDev` : `./.env-dev`)
        })
    ]
})