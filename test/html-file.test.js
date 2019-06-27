
var rendered = require( "!!html-file!simple" );

describe( "htmlFile option", function () {
    describe( 'when TRUE', function () {
        it('should cause output to be pre-rendered to a string that can be used by html-webpack-plugin', function(done) {
            expect( rendered ).to.be.string;
            expect( rendered ).to.equal( 'Hello, world!' );
            done();
        } );
    } );
} );
