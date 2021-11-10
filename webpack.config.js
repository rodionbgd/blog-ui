const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileIncludeWebpackPlugin = require("file-include-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: `${__dirname}/src/templates/main.js`,
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        environment: {
            arrowFunction: false,
        },
    },
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Contacts",
            template: "./src/templates/contact.html",
            filename: "contact.html",
        }),
        new HtmlWebpackPlugin({
            title: "Add",
            template: "./src/templates/add.html",
            filename: "add.html",
        }),
        new HtmlWebpackPlugin({
            title: "Blog",
            template: "./src/templates/index.html",
            filename: "index.html",
        }),
        new HtmlWebpackPlugin({
            title: "Articles",
            template: "./src/templates/articles.html",
            filename: "articles.html",
        }),
        new FileIncludeWebpackPlugin({
            source: "./src/templates",
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: "src/templates/img",
                to: path.resolve(__dirname, "dist/img")
            }]
        })
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
            directory: path.join(__dirname, "dev"),
        },
        compress: true,
        port: 9000,
    },
};
