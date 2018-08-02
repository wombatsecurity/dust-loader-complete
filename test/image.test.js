var path = require('path');
var dust = require('dustjs');
var template = require('image');

describe("an <img> tag", function () {
    it('has its "src" attributes converted to the proper relative path', function (done) {
        dust.render(template, {}, function (err, output) {
            // look for first tag
            expect(output.indexOf('<img id="first" width="250px" src="/assets/images/dolphin.jpg" style="display:block" />')).to.be.greaterThan(-1);
            done(err);
        });
    });

    it('supports multiple <img> tags per line', function (done) {
        dust.render(template, {}, function (err, output) {
            expect(output.indexOf('<img src = "/assets/images/dolphin.jpg"/>')).to.be.greaterThan(-1);
            expect(output.indexOf('<img src = "/assets/images/dolphin.jpg" id="dolphin2"/>')).to.be.greaterThan(-1);
            done(err);
        });
    });

    it('does not change a tag that matches the excludeImageRegex', function (done) {
        dust.render(template, {}, function (err, output) {
            expect(output.indexOf('<img src="/foo/{skip_this}"/>')).to.equal(-1);
            done(err);
        });
    });
});
