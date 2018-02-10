'use strict';
var fs = require('fs');

module.exports = function (files, params) {
    
    this.file = files;
    this.error = false;
    this.location = params.Directory || "./locales/";
    this.ext = params.exts || ".json";
    this.debug = params.debug || false;
    this.loc = this.location + this.file + this.ext;

    try {
        this.data = fs.readFileSync(this.loc);
        if (this.debug == true) {
            console.info("[DEBUG] : " + this.loc + " load success !\r\n content : " + this.data);
        }
    } catch (err) {
        this.error = true;
        if (err.code === 'ENOENT') {
            console.error('[ERROR] : Translation file not found ! (' + this.loc + ')');
        } else {
            console.error('[ERROR] : (' + err + ')');
        }
    }

    this.GetLine = function (Lines, replace = null) {

        if (this.error == false) {
            if (replace != null) {
                if (this.debug == true) {
                    console.debug("[DEBUG] : " + JSON.parse(this.data)[Lines].replace('%s', replace));
                }
                return JSON.parse(this.data)[Lines].replace('%s', replace);
            }
            else {
                if (this.debug == true) {
                    console.debug("[DEBUG] : " + JSON.parse(this.data)[Lines]);
                }
                return JSON.parse(this.data)[Lines];
            }
        }
    }

    this.GetBlock = function (Lines, Block, replace = null) {
        if (this.error == false) {
            if (replace != null) {
                if (this.debug == true) {
                    console.debug("[DEBUG] : " + JSON.parse(this.data)[Block][Lines].replace('%s', replace));
                }
                return JSON.parse(this.data)[Block][Lines].replace('%s', replace);
            }
            else {
                if (this.debug == true) {
                    console.debug("[DEBUG] : " + JSON.parse(this.data)[Block][Lines]);
                }
                return JSON.parse(this.data)[Block][Lines];
            }
        }
    }

    this.SelLine = function (json_value) {
        
        var jsonObj = JSON.parse(this.data);

        for(var i in json_value) {
            jsonObj[i] = json_value[i];
            if (this.debug == true) {
                console.debug("[DEBUG] : " + JSON.stringify(json_value));
            }
        }

        fs.writeFileSync(this.loc, JSON.stringify(jsonObj, null, 2));

    }

    this.Del = function (json_value) {

        var jsonObj = JSON.parse(this.data);

        delete jsonObj[json_value];

        fs.writeFile(this.loc, JSON.stringify(jsonObj, null, 2), function(err) {
            if (err != null) {
                if (this.debug == true) {
                    console.debug("[DEBUG] : Line " + json_value + " is delete");
                }
            }
            else {
                console.error("[ERROR] : Line " + json_value + " not found");
            }
        });

    }

    return this;

}