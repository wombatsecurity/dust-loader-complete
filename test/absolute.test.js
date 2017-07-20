var dust = require( 'dustjs' );
var template = require( 'absolute' );

describe( "absolutely-pathed partials", function () {
    it( 'renders the template properly (including partial)', function ( done ) {
        dust.render( template, {}, function ( err, output ) {
            expect( output.indexOf( "<!doctype html>" ) ).to.equal( 0 );
            expect( output.indexOf( 'Hello world!' ) ).to.not.equal( -1 );
            done( err );
        } );
    } );
} );
