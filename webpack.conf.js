var path = require( 'path' );
var dustLoader = path.resolve( __dirname );

module.exports = {

    resolveLoader: {

      alias: {
        'preserve-whitespace': path.resolve( __dirname, 'index.js?preserveWhitespace')
      }

    },

    resolve: {
      modules: [
        path.join( __dirname, 'test/fixtures' ),
        'node_modules'
      ],
      extensions: ['.js', '.dust'],
      alias: {
        dustjs: 'dustjs-linkedin'
      }
    },

    module: {
      rules: [
        {
          test: /\.dust$/,
          loader: dustLoader,          
          options: { root: "test/fixtures", verbose: true },
          exclude: /node_modules/
        }
      ]
    }

};
