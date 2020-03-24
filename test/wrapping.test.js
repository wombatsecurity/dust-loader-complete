var dust = require( 'dustjs' );
var expect = require('chai').expect;
var simple = require( '!!wrap-output!simple' );

describe( "wrappingFn option", function () {
    describe( 'when TRUE', function () {
        it( 'wraps the template in a method that calls dust for you', function ( done ) {
            simple( {}, function ( err, out ) {
                expect( err ).to.be.null;
                expect( out ).to.equal( 'Hello, world!' );
                done();
            } );
        } );
    } );
} );
