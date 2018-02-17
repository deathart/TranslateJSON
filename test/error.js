const expect = require("chai").expect
const translatejson = require("../index")

const Translate = new translatejson("en", "./test/locales/")

describe("Error", () => {
    describe("Get", () => {
        describe("Normal", () => {
            it("notreplace", (done) => {
                expect(function() {
                    Translate.GetLine("noexists")
                }).to.throw("[ERROR] : This key doesn't exist")
                done()
            })
            it("replace", (done) => {
                expect(function() {
                    Translate.GetLine("noexists", "error")
                }).to.throw("[ERROR] : This key doesn't exist")
                done()
            })
        })
        describe("Block", () => {
            it("notreplace", (done) => {
                expect(function() {
                    Translate.GetBlock("c_block.block_test_500")
                }).to.throw("[ERROR] : This block doesn't exist")
                done()
            })
            it("replace", (done) => {
                expect(function() {
                    Translate.GetBlock("d_block.block_test_a", "deathart")
                }).to.throw("[ERROR] : This block doesn't exist")
                done()
            })
        })
    })
    it("Update", (done) => {
        expect(function() {
            Translate.Update("test2", "GoodBye")
        }).to.throw("[ERROR] : This key does not exist")
        done()
    })
    it("Delete", (done) => {
        expect(function() {
            Translate.Del("test2")
        }).to.throw("[ERROR] : This key does not exist")
        done()
    })
    it("Set", (done) => {
        expect(function() {
            Translate.SetLine("hellonot")
        }).to.throw("[ERROR] : This key already exists")
        done()
    })
    describe("Resolve", () => {
        it("Normal", (done) => {
            expect(Translate.resolve("test2")).to.be.false
            done()
        })
        it("Block", (done) => {
            expect(Translate.resolve("block.not_block")).to.be.undefined
            done()
        })
    })
});
