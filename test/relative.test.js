var dust = require( 'dustjs' );
var template = require( 'relative' );

describe( "relatively-pathed partials", function () {
    it( 'should render properly as part of the compiled template', function ( done ) {
        dust.render( template, {}, function ( err, output ) {
            expect( output.indexOf( "<!doctype html>" ) ).to.equal( 0 );
            expect( output.indexOf( 'Hello world!' ) ).to.not.equal( -1 );
            done( err );
        } );
    } );
} );
