var dust = require('dustjs');
var template = require('image');

describe("<img> tags", function () {
    it('have their "src" attributes converted to the proper relative path', function (done) {
        dust.render(template, {}, function (err, output) {
            const reg = /({>\s?")([^"{}]+)("[\s\S]*?\/})/g;
            const result = reg.exec(output);
            expect(result[2]).to.equal('images/dolphin.jpg');
            done(err);
        });
    });
});
