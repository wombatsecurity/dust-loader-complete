var dust = require( 'dustjs' );
var expect = require('chai').expect;
var syntax = require( 'syntax' );

describe("dust-loader-complete's syntax matcher ", function( ) {
    var rendered;
    
    beforeEach( function( done ){
        dust.render( syntax, {}, function( err, out ) {
            if (err) return done( err );
            rendered = out;
            done();
        } );
	} );
    
    
    it( 'should allow optional spaces at the beginning and end of the partial', function( ) {
        var matches = rendered.match( /paragraph x/g );
        expect( matches.length ).to.equal( 2 );
    } );
    
    it( 'should allow variables to be passed to the partial', function( ){
        expect( rendered.indexOf( 'paragraph 1' ) ).not.to.equal( -1 );
        expect( rendered.indexOf( 'paragraph 2' ) ).not.to.equal( -1 );
    } );    
    
    it( 'should allow partials to span lines', function( ){
        expect( rendered.indexOf( 'paragraph 3' ) ).not.to.equal( -1 );
    } );
    
});
