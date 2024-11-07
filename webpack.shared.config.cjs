const { DefinePlugin } = require('webpack');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  //devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '...'],
    mainFiles: ['index'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|cjs)$/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
      {
        test: /\.(txt|md)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env._DATA_HOST': env.production
        ? '"cdztt.cn"'
        // ? '"124.223.92.23"'
        : '"localhost"',
      'process.env._DATA_PORT': env.localhostDev ? '"444"' : '"443"',
    }),
    //new BundleAnalyzerPlugin()
  ],
});
