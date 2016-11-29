var path = require( 'path' );
var dustLoader = path.resolve( __dirname );

module.exports = {

    resolveLoader: {

      alias: {
        'preserve-whitespace': path.resolve( __dirname, 'index.js?preserveWhitespace')
      }

    },

    resolve: {
      root: path.join( __dirname, 'test/fixtures' ),
      extensions: ['', '.webpack.js', '.web.js', '.js', '.dust'],
      alias: {
        dustjs: 'dustjs-linkedin'
      }
    },

    module: {
      loaders: [
        {
          test: /\.dust$/,
          loader: dustLoader,
          exclude: /node_modules/,
          query: { root: "test/fixtures", verbose: true }
        }
      ]
    }

};
