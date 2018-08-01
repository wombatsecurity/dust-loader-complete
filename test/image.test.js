var path = require('path');
var dust = require('dustjs');
var template = require('image');

describe("<img> tags", function () {
    it('have their "src" attributes converted to the proper relative path', function (done) {
        dust.render(template, {}, function (err, output) {
            // look for first tag
            expect(output.indexOf('<img width="250px" src="/assets/images/dolphin.jpg" style="display:block" />')).to.be.greaterThan(-1);

            // look for second tag
            expect(output.indexOf('<img src = "/assets/images/dolphin.jpg"/>')).to.be.greaterThan(-1);

            done(err);
        });
    });
});
