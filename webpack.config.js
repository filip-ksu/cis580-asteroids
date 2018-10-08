const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
