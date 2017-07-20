var dust = require( 'dustjs' );
var templateWhitespacePreserved = require( "!!preserve-whitespace!whitespace" );
var templateWhitespaceNotPreserved = require( "whitespace" );

describe( "option preserveWhitespace", function () {

  it( "should cause whitespace chars to have been removed in output of templateFn, in case option is disabled or not configured (default)", function ( done ) {
    var matcher = /\n\s/g;

    dust.render( templateWhitespaceNotPreserved, {}, function ( err, output ) {
      expect( output.match( matcher ) ).to.be.null;
      done( err );
    } );

  } );

  it( "should cause whitespace chars to have been preserved in in output of templateFn, in case option is enabled", function ( done ) {
    var matcher = /\n\s/g;

    dust.render( templateWhitespacePreserved, {}, function ( err, output ) {
      expect( output.match( matcher ) ).to.not.be.empty;
      done( err );
    } );
  } );
} );
