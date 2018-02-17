const expect = require("chai").expect
const translatejson = require("../index")

describe("File", () => {
    it("Found", (done) => {
        expect(function() {
            new translatejson("fr", "./test/locales/")
        }).not.to.throw()
        done()
    })
    it("Not Found", (done) => {
        expect(function() {
            new translatejson("es", "./test/locales/")
        }).to.throw("[ERROR] : The translation of the 'es' file is not found !")
        done()
    })
});