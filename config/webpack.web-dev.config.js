const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        'App': './src/web/App.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/web'),
        library: {
            name: '[name]',
            type: 'global',
            export: 'default',
        },
    },
    resolve: {
        alias: {
            'components': path.resolve(__dirname, '../src/components'),
            'components-form': path.resolve(__dirname, '../src/components-form'),
            'components-layout': path.resolve(__dirname, '../src/components-layout'),
            'components-editor': path.resolve(__dirname, '../src/components-editor'),
            'sass': path.resolve(__dirname, '../src/sass'),
            'web': path.resolve(__dirname, '../src/web'),
        }
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}