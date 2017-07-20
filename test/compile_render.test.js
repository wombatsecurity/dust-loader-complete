var dust = require( 'dustjs' );

var simple = require( 'simple' );
var variable = require( 'variable' );

describe( "dust-loader-complete", function () {
    it( 'registers the template by name on the dust global template cache', function ( done ) {
        dust.render( 'simple', {}, function ( err, out ) {
            expect( err ).to.be.null;
            expect( out ).to.equal( 'Hello, world!' );
            done();
        } );
    } );

    it( 'returns a template function that can be rendered by dust', function ( done ) {
        dust.render( simple, {}, function ( err, out ) {
            expect( err ).to.be.null;
            expect( out ).to.equal( 'Hello, world!' );
            done();
        } );
    } );

    it( 'ignores partial tags with Dust variables in their names', function ( done ) {
        dust.render( 'multi/require{num}', {}, function ( err, out ) {
            expect( err ).to.not.be.null;
            done();
        } );
    } );

    it( 'sets the registered name of the template on the returned function', function () {
        expect( simple.templateName ).to.equal( 'simple' );
    } );

} );
