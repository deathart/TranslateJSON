const expect = require("chai").expect;
const translatejson = require("../index");

const Translate = new translatejson("fr", "./test/locales/");

describe("Success", () => {
    describe("Get", () => {
        describe("Normal", () => {
            it("NotReplace", (done) => {
                expect(Translate.GetLine("hello")).to.equal("Bonjour");
                done()
            });
            it("Replace", (done) => {
                expect(Translate.GetLine("hello users", "deathart")).to.equal("Bonjour deathart");
                done()
            })
        });

        describe("Block", () => {
            it("NotReplace", (done) => {
                expect(Translate.GetBlock("block.first_block")).to.equal("[FR] block");
                done()
            });
            it("Replace", (done) => {
                expect(Translate.GetBlock("block.sec_block", "deathart")).to.equal("[FR] block deathart remplacé");
                done()
            })
        })
    });

    describe("Update", () => {
        it("Update", (done) => {
            expect(Translate.Update("hello", "Hello")).to.be.true;
            done()
        })
    });

    describe("Remove", () => {
        it("Remove", (done) => {
            expect(Translate.Del("hello")).to.be.true;
            done()
        })
    });

    describe("Set", () => {
        before(() => {
            Translate.Del("hello");
        });

        it("Set", (done) => {
            expect(Translate.SetLine("hello", "Bonjour")).to.be.true;
            done()
        })
    });

    describe("Resolve", () => {
        it("Normal", (done) => {
            expect(Translate.resolve("hello")).to.equal("Bonjour");
            done()
        });
        it("Block", (done) => {
            expect(Translate.resolve("block.sec_block")).to.equal("[FR] block %s remplacé");
            done()
        })
    })
});
