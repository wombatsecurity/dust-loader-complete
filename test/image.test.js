var path = require('path');
var dust = require('dustjs');
var expect = require('chai').expect;
var template = require('image');

const context = {
    reference: 'bar'
};

describe("an <img> tag", function () {
    it('has its "src" attributes converted to the proper relative path', function (done) {
        dust.render(template, context, function (err, output) {
            // look for first tag
            expect(output.indexOf('<img id="first" width="250px" src="/assets/images/dolphin.jpg" style="display:block" />')).to.be.greaterThan(-1);
            done(err);
        });
    });

    it('supports multiple <img> tags per line', function (done) {
        dust.render(template, context, function (err, output) {
            expect(output.indexOf('<img src = "/assets/images/dolphin.jpg"/>')).to.be.greaterThan(-1);
            expect(output.indexOf('<img src = "/assets/images/dolphin.jpg" id="dolphin2"/>')).to.be.greaterThan(-1);
            done(err);
        });
    });

    it('does not change a tag that includes a DustJS reference', function (done) {
        dust.render(template, context, function (err, output) {
            expect(output.indexOf('<img src="/foo/bar"/>')).to.be.greaterThan(-1);
            done(err);
        });
    });

    it('does not change a tag that matches the excludeImageRegex', function (done) {
        dust.render(template, context, function (err, output) {
            expect(output.indexOf('<img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"/>')).to.be.greaterThan(-1);
            done(err);
        });
    });
});
