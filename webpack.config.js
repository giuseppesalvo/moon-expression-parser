const webpack = require('webpack')
const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin');
const p = x => path.resolve(__dirname, x)

const ENV = process.env.NODE_ENV === "production"
          ? "production"
          : "development"

module.exports = {

    mode: ENV,
    
    entry: p("./src/index.ts"),

    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "awesome-typescript-loader"
            }
        ],
    },
    
    output: {
        filename: "index.js",
        path: p("./dist"),
        libraryTarget: "commonjs",
        library: "Moon"
    },

    plugins: [
        new TSLintPlugin({
            files: [
                './client/**/*.tsx',
                './client/**/*.ts'
            ]
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(ENV)
        }),
    ]

}
