var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry  : {},
    module : {
        loaders: [
            {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.styl$/, loader: 'style!css!stylus'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.json$/, loader: 'json'},
            // **IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-webpack has access to the jQuery object
            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader"},
            {test: /\.eot$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "file-loader"}
        ]
    },
    resolve: {
        alias: {
            // Bind version of jquery
            jquery: "jquery",
            io: "socket.io-client",
            lodash: "lodash"
        }
    },
    plugins: [
        // Injects bundles in your index.html instead of wiring all manually.
        // It also adds hash to all injected assets so we don't have problems
        // with cache purging during deployment.
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            inject  : 'body',
            hash    : true
        }),

        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery",
            io: "io",
            _ : "lodash"
        }),

        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'vendor',
            minChunks: function (module, count) {
                return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
            }
        })
    ]
};
