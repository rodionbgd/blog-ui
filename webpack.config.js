const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExcludeAssetsPlugin = require('@ianwalter/exclude-assets-plugin');

module.exports = {
    entry: {
        "main": `${__dirname}/src/js/main_controller.js`,
        "form": `${__dirname}/src/js/form.js`,
    },
    output: {
        filename: '[name].js',
    },
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Contacts",
            template: "./src/contact.html",
            filename: "contact.html",
            excludeAssets: [/main.js/],
        }),
        new HtmlWebpackPlugin({
            template: "./src/add.html",
            filename: "add.html",
            excludeAssets: [/main.js/],
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            excludeAssets: [/form.js/],
        }),
        new HtmlWebpackPlugin({
            template: "./src/articles.html",
            filename: "articles.html",
            excludeAssets: [/\.js/, /form.css/],
        }),
        new ExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "src/img",
                to: path.resolve(__dirname, "dist/img")
            }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
        ],
    },
    resolve: {extensions: ['.tsx', '.ts', '.js'],},
    devServer: {
        static: {
            directory: path.join(__dirname, "src"),
        },
        compress: true,
        port: 9000,
    },
};