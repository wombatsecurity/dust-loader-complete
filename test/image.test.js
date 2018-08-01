var path = require('path');
var dust = require('dustjs');
var template = require('image');

describe("<img> tags", function () {
    it('have their "src" attributes converted to the proper relative path', function (done) {
        dust.render(template, {}, function (err, output) {
            const reg = /(<img\s.+?src=['"])([^'"]+)(['"][^/>]+(?:\s+)?\/?>)/g;
            const result = reg.exec(output);
            expect(result).not.to.be.null;
            expect(result[2]).to.equal('/assets/images/dolphin.jpg');
            done(err);
        });
    });
});
