/* eslint-disable */
const path = require('path')

const webpackConfigs = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.json$/i,
                type: 'json'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    context: path.resolve(__dirname, './'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        chunkFilename: '[name].js',
        library: {
            type: "umd",
            name: "lightjs"
        }
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './public')
        },
        compress: true,
        port: 9000
    }
}

module.exports = webpackConfigs;
