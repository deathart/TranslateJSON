'use strict';

var Trans = require('./translate.js'),
    option_for_translate = {
    Directory : "./locales/",
    exts : ".json",
    debug : false
}
var Translate = new Trans("en", option_for_translate);

//Normal
console.log("Value for 'test_replace' : " + Translate.GetLine("test_replace", "deathart"));
console.log("Value for 'test' : " + Translate.GetLine("test"));
console.log("Value for 'username' : " + Translate.GetLine("username"));

//Block
console.log("Value for 'first_block' : " + Translate.GetBlock("first_block", "block_test"));
console.log("Value for 'deux_block' : " + Translate.GetBlock("deux_block", "block_test", "deathart"));