const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'App': './src/web/App.js',
    },
    output: {
        filename: '[name].[contenthash].js',  
        path: path.resolve(__dirname, '../dist/web'),
        library: {
            name: '[name]',
            type: 'global',
            export: 'default',
        },
        clean: true,
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
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        })],
    },
};