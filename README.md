[![Travis](https://img.shields.io/travis/deathart/TranslateJSON.svg?style=for-the-badge)](https://travis-ci.org/deathart/TranslateJSON)[![Coveralls github](https://img.shields.io/coveralls/github/deathart/TranslateJSON.svg?style=for-the-badge)](https://coveralls.io/github/deathart/TranslateJSON)[![npm](https://img.shields.io/npm/v/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)[![npm](https://img.shields.io/npm/l/translatejson.svg?style=for-the-badge)](https://www.npmjs.com/package/translatejson)

Translation and translation management system using json files

### Table of Contents

-   [Install](#Install)
-   [API](#API)
    - [Constructor](#Constructor)
    - [GetLine](#GetLine)
    - [GetBlock](#GetBlock)
    - [SetLine](#SetLine)
    - [Update](#Update)
    - [Del](#Del)
    - [resolve](#resolve)
-   [Tests](#Tests)
-   [Helps](#Helps)

# Install :
```shell
npm install --save translatejson
```
Create a local folder at the root of your project (or at another location but don't forget to configure it)
Then create a en.json, fr.json and other xx.json file

# API : 

## Constructor
Initialize the class

**Parameters**
- `files` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Files name
- `Directory` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** File path

**Examples**
```js
const translatejson = require("../index")

let Translate = new translatejson("fr", "./resources/locales/");
```

## Get Line
Select the line defined by the key

**Parameters**
- `Lines` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key name
- `Replace` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Replace string in value (Optional, default `null`)

**Examples**
```js
Translate.GetLine("hello");
Translate.GetLine("hello users", "deathart");
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**

## Get Block
Select block defined by the key

**Parameters**
- `Lines` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key name
- `Replace` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Replace string in value (Optional, default `null`)

**Examples**
```js
Translate.GetBlock("block.first_block");
Translate.GetBlock("block.sec_block", "deathart");
```

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## SetLine
Add a key to the json file

**Parameters**
- `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key name
- `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Value of the key

**Examples**
```js
Translate.SetLine("good bye", "Good Bye");
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## Update
Update a key in the json file

**Parameters**
- `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key name
- `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Value of the key

**Examples**
```js
Translate.Update("hello", "Bonjour");
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## Del
Deletes a key in the json file

**Parameters**
- `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key name

**Examples**
```js
Translate.Del("hello");
```

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## resolve
finds a key in the json file

**Parameters**
- `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key name

**Examples**
```js
Translate.resolve("hello");
Translate.resolve("block.first_bloc");
```

Returns **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** 


# Tests : 
```shell
npm test
```

# Helps :
Don't hesitate to help this project, to improve it to make it grow, even constructive criticism helps.