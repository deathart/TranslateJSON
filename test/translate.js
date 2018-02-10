const expect  = require('chai').expect;
const translatejson = require('../index');

let Translate = new translatejson("en", {
    Directory : "./test/locales/",
    exts : ".json",
    debug : false
});


describe ('Get', function() {
    describe ('Normal', function() {
        it('NotReplace', function(done) {
            expect(Translate.GetLine("test")).to.equal('Hello');
            done();
        });
        it('Replace', function(done) {
            expect(Translate.GetLine("test_replace", "deathart")).to.equal('Hello deathart');
            done();
        });
        it('errornotreplace', function(done) {
            expect(Translate.GetLine("noexists")).to.be.false;
            done();
        });
        it('errorreplace', function(done) {
            expect(Translate.GetLine("noexists", "error")).to.be.false;
            done();
        });
    });

    describe ('Block', function() {
        it('NotReplace', function(done) {
            expect(Translate.GetBlock("first_block", "block_test")).to.equal('[EN]block');
            done();
        });
        it('Replace', function(done) {
            expect(Translate.GetBlock("deux_block", "block_test", "deathart")).to.equal('[EN]block deathart test');
            done();
        });
        it('error', function(done) {
            expect(Translate.GetBlock("c_block", "block_test_500")).to.be.false;
            done();
        });
    });
});

describe ('Remove', function() {
    it('Remove', function(done) {
        expect(Translate.Del("test")).to.be.undefined;
        done();
    });
    it('RemoveError', function(done) {
        expect(Translate.Del("test2")).to.be.false;
        done();
    });
});
    
describe ('Set', function() {
    it('Set', function(done) {
        expect(Translate.SelLine({"test" : "Hello"})).to.be.undefined;
        done();
    });
});