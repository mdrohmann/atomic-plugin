var AtomicPlugin = require('../lib/atomicPlugin.js');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new AtomicPlugin('atomic.css'),
    ]

};
