'use strict';
var fs = require('fs');

module.exports = function (files, exts = ".json", Directory = "./locales/", deb = false) {

    this.location = Directory;
    this.file = files;
    this.ext = exts;
    this.debug = deb;
    this.loc = this.location + this.file + this.ext;
    this.data = fs.readFileSync(this.loc);

    this.GetLine = function (Lines, replace = null) {

        if (replace != null) {
            if (this.debug == true) {
                console.log(JSON.parse(this.data)[Lines].replace('%s', replace));
            }
            return JSON.parse(this.data)[Lines].replace('%s', replace);
        }
        else {
            if (this.debug == true) {
                console.log(JSON.parse(this.data)[Lines]);
            }
            return JSON.parse(this.data)[Lines];
        }

    }

    this.GetBlock = function (Lines, Block, replace = null) {
        if (replace != null) {
            if (this.debug == true) {
                console.log(JSON.parse(this.data)[Block][Lines].replace('%s', replace));
            }
            return JSON.parse(this.data)[Block][Lines].replace('%s', replace);
        }
        else {
            if (this.debug == true) {
                console.log(JSON.parse(this.data)[Block][Lines]);
            }
            return JSON.parse(this.data)[Block][Lines];
        }
    }

    return this;

}