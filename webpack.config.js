const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src/js/index.js"),
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        client: {
            logging: 'info',
            overlay: true,
        },
        compress: true,
        port: 9000,
    },
}