const path = require('path');
const HWP = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    entry: path.join(__dirname, '/src/client/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules:
            [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                // CSS modules loader (.module.css)
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                            },
                        },
                    ],
                    include: /\.module\.css$/,
                },
                // Global CSS loader (.css)
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                    exclude: /\.module\.css$/i,
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.json5$/i,
                    loader: 'json5-loader',
                    type: 'javascript/auto',
                },
            ]
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/src/client/index.html') }
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/client/root',
                    globOptions: {
                        ignore: ['INFO.txt']
                    }
                },
                { from: './src/client/favicon.ico' },
                { from: './src/client/favicon-indefinite.ico' },
            ]
        })
    ]
}