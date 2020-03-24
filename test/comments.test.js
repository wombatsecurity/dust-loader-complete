var dust = require( 'dustjs' );
var expect = require('chai').expect;
var template = require( 'comments' );

describe( "require comments", function () {

    it( 'should result in available partials', function ( done ) {
        var expectCount = 0;

        function checkIfDone( err ) {
            if ( err ) done( err );

            expectCount++;
            if ( expectCount === 2 ) {
                done();
            }
        }

        dust.render( 'comments', { num: 0 }, function ( err, out ) {
            expect( out.indexOf( "<p>require0</p>" ) ).to.not.equal( -1 );
            checkIfDone( err );
        } );

        dust.render( 'comments', { num: 1 }, function ( err, out ) {
            expect( out.indexOf( "<p>require1</p>" ) ).to.not.equal( -1 );
            checkIfDone( err );
        } );
    } );

} );
