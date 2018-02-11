const expect  = require('chai').expect;
const translatejson = require('../index');

let Translate = new translatejson("en", {
    Directory : "./test/locales/",
    exts : ".json",
    debug : false
});

describe ('GetError', function() {
    describe ('Normal', function() {
        it('notreplace', function(done) {
            expect(Translate.GetLine("noexists")).to.be.false;
            done();
        });
        it('replace', function(done) {
            expect(Translate.GetLine("noexists", "error")).to.be.false;
            done();
        });
    });
    describe ('Block', function() {
        it('notreplace', function(done) {
            expect(Translate.GetBlock("c_block", "block_test_500")).to.be.false;
            done();
        });
        it('replace', function(done) {
            expect(Translate.GetBlock("d_block", "block_test_a", "deathart")).to.be.false;
            done();
        });
    });
});

describe ('DeleteError', function() {
    it('error', function(done) {
        expect(Translate.Del("test2")).to.be.false;
        done();
    });
});