const webpack = require('webpack');
const path = require('path')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '..', './dist-test'),
        filename: 'test.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('test')
        })
    ]
}