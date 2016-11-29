var templateWhitespacePreserved = require( "!!preserve-whitespace!whitespace" );
var templateWhitespaceNotPreserved = require( "whitespace" );

describe( "option preserveWhitespace", function( ) {

    it( "should cause whitespace chars to have been removed in compiled template, in case option is disabled or not configured (default)", function( done ) {

        var output;
        var matcher = /\n\s/g;

        templateWhitespaceNotPreserved( {}, function( err, out ) {

          if ( err )
            return done( err );

          output = out;

        });

        expect( output.match( matcher ) ).to.be.null;

        done();

    });

    it( "should cause whitespace chars to have been preserved in compiled template, when option is enabled", function( done ) {

        var output;
        var matcher = /\n\s/g;

        templateWhitespacePreserved( {}, function( err, out ) {

          if ( err )
            return done( err );

          output = out;

        });

        expect( output.match( matcher ) ).to.not.be.empty;

        done();

    });

});
