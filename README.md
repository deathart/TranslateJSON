# TranslateJSON
<a href="https://www.npmjs.com/package/translatejson"><img src="https://nodei.co/npm/translatejson.png?downloads=true" /></a>

Usage : 
```JavaScript
var translatejson = require('translatejson'),
    option_for_translate = {
    Directory : "./locales/",
    exts : ".json",
    debug : false
}

var Translate = new translatejson("en", option_for_translate);
```

>//Normal
```JavaScript
console.log("Value for 'test_replace' : " + Translate.GetLine("test_replace", "deathart"));
console.log("Value for 'test' : " + Translate.GetLine("test"));
console.log("Value for 'username' : " + Translate.GetLine("username"));
```

>//Block
```JavaScript
console.log("Value for 'first_block' : " + Translate.GetBlock("first_block", "block_test"));
console.log("Value for 'deux_block' : " + Translate.GetBlock("deux_block", "block_test", "deathart"));
```

>//Add line
```JavaScript
Translate.SetLine("test_set", "settings add");
```
