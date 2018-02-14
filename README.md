[![Travis](https://img.shields.io/travis/deathart/TranslateJSON.svg?style=for-the-badge)](https://travis-ci.org/deathart/TranslateJSON)[![Coveralls github](https://img.shields.io/coveralls/github/deathart/TranslateJSON.svg?style=for-the-badge)](https://coveralls.io/github/deathart/TranslateJSON)[![npm](https://img.shields.io/npm/v/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)[![npm](https://img.shields.io/npm/l/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)
# TranslateJSON
Translation and translation management system using json files

# Install
```shell
npm install --save translatejson
```

# Usage : 

### 1 step
Create a local folder at the root of your project (or at another location but don't forget to configure it)
Then create a. json file

### 2 step
```js
const translatejson = require('translatejson');

let Translate = new translatejson("en");

//Normal
Translate.GetLine("test_replace", "deathart");
Translate.GetLine("test");

//Block
Translate.GetBlock("first_block.block_test");
Translate.GetBlock("deux_block.block_test", "deathart");

//Update line
Translate.Update("test", "Hello");

//Add line
Translate.SetLine("test_set", "settings add");

//Delete line
Translate.Del("test_replace");
```

### 3 step (Optional)
To configure your folder
```js
let Translate = new translatejson("en", "./translations");
```