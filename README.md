[![Travis](https://img.shields.io/travis/deathart/TranslateJSON.svg?style=for-the-badge)](https://travis-ci.org/deathart/TranslateJSON)[![Coveralls github](https://img.shields.io/coveralls/github/deathart/TranslateJSON.svg?style=for-the-badge)](https://coveralls.io/github/deathart/TranslateJSON)[![npm](https://img.shields.io/npm/v/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)[![npm](https://img.shields.io/npm/l/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)
# TranslateJSON
Translation and translation management system using json files

# Install
```shell
npm install --save translatejson
```

# Usage : 

### 1) 
Create a local folder at the root of your project (or at another location but don't forget to configure it)
Then create a. json file

### 2)
index.js : 
```js
const translatejson = require('translatejson');

let Translate = new translatejson("en");

//Normal
Translate.GetLine("hello users", "deathart");
Translate.GetLine("hello");

//Block
Translate.GetBlock("block.first_block");
Translate.GetBlock("block.sec_block", "deathart");

//Update line
Translate.Update("hello", "Bonjour");

//Add line
Translate.SetLine("good bye", "Good Bye");

//Delete line
Translate.Del("hello");
```

./translations/fr.json :
```json
{
    "hello users": "Bonjour %s",
    "block": {
      "first_block": "[FR] block",
      "sec_block": "[FR] block %s remplacé"
    },
    "hello": "Bonjour"
}
```

### 3) step (Optional)
To configure your folder
```js
let Translate = new translatejson("en", "./translations");
```