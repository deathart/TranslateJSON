'use strict';
var fs = require('fs');

module.exports = function (files, exts = ".json", Directory = "./locales/", deb = false) {

    this.location = Directory;
    this.file = files;
    this.ext = exts;
    this.debug = deb;
    this.loc = this.location + this.file + this.ext;

    this.GetLine = function (Lines, replace = null) {

        var data = fs.readFileSync(this.loc);

        if (replace != null) {
            if (this.debug == true) {
                console.log(JSON.parse(data)[Lines].replace('%s', replace));
            }
            return JSON.parse(data)[Lines].replace('%s', replace);
        }
        else {
            if (this.debug == true) {
                console.log(JSON.parse(data)[Lines]);
            }
            return JSON.parse(data)[Lines];
        }

    }

}