const webpack = require('webpack');

module.exports = {
    mode: "production",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        publicPath: 'wwwfiles',
        filename: '[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('prod')
        })
    ]
}