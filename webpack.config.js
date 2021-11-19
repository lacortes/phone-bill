const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = env => {

    console.log(`MODE: ${env.mode}`);

    return {
        mode: env.mode,
        output: {
            path: path.join(__dirname, '/dist'), 
            filename: 'bundle.js',
            clean: true
        },
        devServer: {
            port: 3010
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    resolve: {
                        extensions: ['.js', '.jsx']
                    },
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MinCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new MinCssExtractPlugin(),
            new ESLintPlugin({
                overrideConfigFile: path.resolve(__dirname, '.eslintrc.json'),
                extensions: ['.jsx', '.js']
            })
        ]
    }

};