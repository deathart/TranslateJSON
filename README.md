[![Travis](https://img.shields.io/travis/deathart/TranslateJSON.svg?style=for-the-badge)](https://travis-ci.org/deathart/TranslateJSON)[![npm](https://img.shields.io/npm/v/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)[![npm](https://img.shields.io/npm/l/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)
# TranslateJSON
Translation and translation management system using json files

# Install
`npm install --save translatejson`

# Usage : 
```JavaScript
const translatejson = require('translatejson');

let Translate = new translatejson("en");

>//Normal
Translate.GetLine("test_replace", "deathart");
Translate.GetLine("test");

>//Block
Translate.GetBlock("first_block", "block_test");
Translate.GetBlock("deux_block", "block_test", "deathart");

>//Add line
Translate.SelLine({"test_set" : "settings add", "blabla_set" : "blabla_set is OK"});

>//Delete line
Translate.Del("test_replace");
```