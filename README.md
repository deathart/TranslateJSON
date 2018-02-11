[![Travis](https://api.travis-ci.org/deathart/TranslateJSON.svg?branch=master)](https://travis-ci.org/deathart/TranslateJSON)
# TranslateJSON
Translation and translation management system using json files

# Install
`npm install --save translatejson`

# Usage : 
```JavaScript
const translatejson = require('translatejson'),
    option_for_translate = {
    Directory : "./locales/",
    exts : ".json",
    debug : false
}

let Translate = new translatejson("en", option_for_translate);
```

>//Normal
```JavaScript
Translate.GetLine("test_replace", "deathart");
Translate.GetLine("test");
```

>//Block
```JavaScript
Translate.GetBlock("first_block", "block_test");
Translate.GetBlock("deux_block", "block_test", "deathart");
```

>//Add line
```JavaScript
Translate.SelLine({"test_set" : "settings add", "blabla_set" : "blabla_set is OK"});
```

>//Delete line
```JavaScript
Translate.Del("test_replace");
```