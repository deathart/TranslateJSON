'use strict';

var Trans = require('./translate.js');
var Translate = new Trans("fr");

console.log("Value for 'test_replace' : " + Translate.GetLine("test_replace", "deathart"));
console.log("Value for 'test' : " + Translate.GetLine("test"));
console.log("Value for 'username' : " + Translate.GetLine("username"));