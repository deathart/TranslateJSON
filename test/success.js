const expect = require("chai").expect
const translatejson = require("../index")

const Translate = new translatejson("en", "./test/locales/")

describe("Success", () => {
    describe("Get", () => {
        describe("Normal", () => {
            it("NotReplace", (done) => {
                expect(Translate.GetLine("test")).to.equal("Hello")
                done()
            })
            it("Replace", (done) => {
                expect(Translate.GetLine("test_replace", "deathart")).to.equal("Hello deathart")
                done()
            })
        })

        describe("Block", () => {
            it("NotReplace", (done) => {
                expect(Translate.GetBlock("block_test.first_block")).to.equal("[EN]block")
                done()
            })
            it("Replace", (done) => {
                expect(Translate.GetBlock("block_test.deux_block", "deathart")).to.equal("[EN]block deathart test")
                done()
            })
        })
    })

    describe("Update", () => {
        it("Update", (done) => {
            expect(Translate.Update("test", "Hello")).to.be.true
            done()
        })
    })

    describe("Remove", () => {
        it("Remove", (done) => {
            expect(Translate.Del("test")).to.be.true
            done()
        })
    })

    describe("Set", () => {
        before(() => {
            Translate.Del("test");
        })

        it("Set", (done) => {
            expect(Translate.SetLine("test", "Hello")).to.be.true
            done()
        })
    })
});
