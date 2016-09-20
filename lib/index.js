'use strict';
var fs = require('fs');

module.exports = function (files, params) {

    this.location = params.Directory || "./locales/";
    this.file = files;
    this.ext = params.exts || ".json";
    this.debug = params.debug || false;
    this.loc = this.location + this.file + this.ext;
    this.error = false;

    try {
        this.data = fs.readFileSync(this.loc);
        if (this.debug == true) {
            console.info('\x1B[31m', "[DEBUG] : " + this.loc + " load success !\r\n content : " + this.data ,'\x1B[0m\r\n');
        }
    } catch (err) {
        this.error = true;
        if (err.code === 'ENOENT') {
            console.log('Translation file not found ! (' + this.loc + ')');
        } else {
            console.log('ERROR : (' + err + ')');
        }
    }

    this.GetLine = function (Lines, replace = null) {

        if (this.error == false) {
            if (replace != null) {
                if (this.debug == true) {
                    console.info('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Lines].replace('%s', replace) ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Lines].replace('%s', replace);
            }
            else {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Lines] ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Lines];
            }
        }
    }

    this.GetBlock = function (Lines, Block, replace = null) {
        if (this.error == false) {
            if (replace != null) {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Block][Lines].replace('%s', replace) ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Block][Lines].replace('%s', replace);
            }
            else {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Block][Lines] ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Block][Lines];
            }
        }
    }

    this.SetLine = function (json_key, json_data) {
        
        var jsonObj = JSON.parse(this.data);

        jsonObj.json_key = json_data;

        fs.writeFileSync(this.loc, JSON.stringify(jsonObj));

        if (this.debug == true) {
            console.log('\x1B[31m', "[DEBUG] : " + jsonObj.json_key ,'\x1B[0m\r\n');
        }
    }

    return this;

}