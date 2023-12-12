/* eslint-disable */
const path = require('path')

const webpackConfigs = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle/index.js',
        chunkFilename: '[name].js'
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

if (process.env.MODE === 'development') {
    webpackConfigs.devtool = 'eval-source-map'
}else {
    webpackConfigs.devtool = 'source-map'
}

if (process.env.MODE === 'production') {
    webpackConfigs.mode = 'production'
} else {
    webpackConfigs.mode = 'development'
}

if (process.env.PUBLIC_PATH) {
    webpackConfigs.output.publicPath = process.env.PUBLIC_PATH
} else {
    webpackConfigs.output.publicPath = '/'
}

if (process.env.LIBRARY_NAME) {
    webpackConfigs.output.globalObject = 'this'
    webpackConfigs.output.library = process.env.LIBRARY_NAME
    webpackConfigs.output.libraryTarget = 'umd'
    webpackConfigs.output.umdNamedDefine = true
}

if (process.env.ENTRY) {
    webpackConfigs.entry = process.env.ENTRY
}

module.exports = webpackConfigs;
