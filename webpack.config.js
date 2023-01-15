const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development",
    entry: {
        onboarding: path.join(__dirname, "src/onboarding/onboarding.tsx"),
        popup: path.join(__dirname, "src/popup/view.tsx"),
        app: path.join(__dirname, "src/injected/main.ts"),
        background: path.join(__dirname, "src/background/background.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        // I think it's [name].js since we compile multiple entry points using this config (popup AND injected)
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            /*{
              test: /\.html$/,
              use: ["html-loaded"],
              exclude: /\.module\.html$/,
            },*/
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.svg$/,
                use: "file-loader",
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            mimetype: "image/png",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
            // NOTE: you also have to change the path aliases in tsconfig.json
            // pages
            "@injected": path.resolve(__dirname, "src/injected"),
            "@onboarding": path.resolve(__dirname, "src/onboarding"),
            "@popup": path.resolve(__dirname, "src/popup"),

            // under pkg
            "@storage": path.resolve(__dirname, "src/pkg/storage"),
            "@utils": path.resolve(__dirname, "src/pkg/utils"),

            // other
            "@components": path.resolve(__dirname, "src/components"),
            "@background": path.resolve(__dirname, "src/background"),
        },
        modules: [path.resolve(__dirname, "./")],
    },
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "." }],
        }),
        // for blueprintjs: https://github.com/palantir/blueprint/issues/3739
        new webpack.DefinePlugin({
            "process.env": "{}",
        }),
    ],
};

module.exports = config;
