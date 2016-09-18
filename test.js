'use strict';

var Trans = require('./translate.js');
var Translate = new Trans("fr");

var teste = Translate.GetLine("test_replace", "deathart");

console.log("Value for 'username' : " + teste);