const path = require('path');
const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: './create-bundle/sortable-tree.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'sortable_tree_bundle.js',
        library: 'ST',
        libraryTarget: 'window'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-typescript']
                  }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "css-loader"
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    plugins: [
        new Uglify()
    ],
    devServer: {
        contentBase: path.join(__dirname, "demo"),
        port: 3000,
        https: true
    }
}
