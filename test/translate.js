const expect = require("chai").expect
const translatejson = require("../index")

const Translate = new translatejson("en", {
	Directory: "./test/locales/",
})


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
			expect(Translate.GetBlock("first_block", "block_test")).to.equal("[EN]block")
			done()
		})
		it("Replace", (done) => {
			expect(Translate.GetBlock("deux_block", "block_test", "deathart")).to.equal("[EN]block deathart test")
			done()
		})
	})
})

describe("Remove", () => {
	it("Remove", (done) => {
		expect(Translate.Del("test")).to.be.undefined
		done()
	})
})

describe("Set", () => {
	it("Set", (done) => {
		expect(Translate.SetLine("test", "Hello")).to.be.true
		done()
	})
})
