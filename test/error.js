const expect = require("chai").expect
const translatejson = require("../index")

const Translate = new translatejson("en", "./test/locales/")

describe("Error", () => {
    describe("Get", () => {
        describe("Normal", () => {
            it("notreplace", (done) => {
                expect(Translate.GetLine("noexists")).to.be.false
                done()
            })
            it("replace", (done) => {
                expect(Translate.GetLine("noexists", "error")).to.be.false
                done()
            })
        })
        describe("Block", () => {
            it("notreplace", (done) => {
                expect(Translate.GetBlock("c_block.block_test_500")).to.be.false
                done()
            })
            it("replace", (done) => {
                expect(Translate.GetBlock("d_block.block_test_a", "deathart")).to.be.false
                done()
            })
        })
    })
    describe("Update", () => {
        it("Update", (done) => {
            expect(Translate.Update("test2", "GoodBye")).to.be.false
            done()
        })
    })
    describe("Delete", () => {
        it("error", (done) => {
            expect(Translate.Del("test2")).to.be.false
            done()
        })
    })
});
