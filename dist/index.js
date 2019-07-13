exports["Moon"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.ts\"));\n\n\n//# sourceURL=webpack://Moon/./src/index.ts?");

/***/ }),

/***/ "./src/tokenizer.ts":
/*!**************************!*\
  !*** ./src/tokenizer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar _a;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TokenType;\n(function (TokenType) {\n    TokenType[\"Comma\"] = \"Comma\";\n    TokenType[\"Whitespace\"] = \"Whitespace\";\n    TokenType[\"Literal\"] = \"Literal\";\n    TokenType[\"Variable\"] = \"Variable\";\n    TokenType[\"Operator\"] = \"Operator\";\n    TokenType[\"LeftParentesis\"] = \"LeftParentesis\";\n    TokenType[\"RightParentesis\"] = \"RightParentesis\";\n    TokenType[\"Function\"] = \"Function\";\n})(TokenType = exports.TokenType || (exports.TokenType = {}));\nvar Token = /** @class */ (function () {\n    function Token(type, value) {\n        this.type = type;\n        this.value = value;\n    }\n    return Token;\n}());\nexports.Token = Token;\n;\nvar TokenTestMap = (_a = {},\n    _a[TokenType.Comma] = {\n        type: TokenType.Comma,\n        test: function (char) { return /,/.test(char); },\n    },\n    _a[TokenType.Literal] = {\n        type: TokenType.Literal,\n        test: function (char) { return /[\\d\\.]/.test(char); },\n    },\n    _a[TokenType.Variable] = {\n        type: TokenType.Variable,\n        test: function (char) { return /[a-z]/i.test(char); },\n    },\n    _a[TokenType.Operator] = {\n        type: TokenType.Operator,\n        test: function (char) { return /(\\+|\\-|\\*|\\/|\\^|in)/.test(char); },\n    },\n    _a[TokenType.LeftParentesis] = {\n        type: TokenType.LeftParentesis,\n        test: function (char) { return char === \"(\"; },\n    },\n    _a[TokenType.RightParentesis] = {\n        type: TokenType.RightParentesis,\n        test: function (char) { return char === \")\"; },\n    },\n    _a[TokenType.Whitespace] = {\n        type: TokenType.Whitespace,\n        test: function (char) { return char === \" \"; },\n    },\n    _a);\nfunction tokenize(value) {\n    var numberBuffer = [];\n    var textBuffer = [];\n    var tokens = [];\n    value\n        .replace(/\\s+/g, ' ')\n        .split(\"\")\n        .forEach(function (char) {\n        var type = null;\n        for (var key in TokenTestMap) {\n            if (TokenTestMap[key].test(char)) {\n                type = TokenTestMap[key].type;\n                break;\n            }\n        }\n        if (type === null) {\n            throw new Error(\"Unable to tokenize: \" + char);\n        }\n        if (type === TokenType.Whitespace) {\n            if (numberBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n                numberBuffer = [];\n            }\n            if (textBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Variable, textBuffer.join(\"\")));\n                textBuffer = [];\n            }\n            return;\n        }\n        if (type === TokenType.LeftParentesis) {\n            if (textBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Function, textBuffer.join(\"\")));\n                textBuffer = [];\n            }\n            tokens.push(new Token(type, char));\n            return;\n        }\n        if (type === TokenType.Comma\n            || type === TokenType.Operator\n            || type === TokenType.RightParentesis) {\n            if (numberBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n                numberBuffer = [];\n            }\n            if (textBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Variable, textBuffer.join(\"\")));\n                textBuffer = [];\n            }\n            tokens.push(new Token(type, char));\n            return;\n        }\n        if (type === TokenType.Literal) {\n            if (textBuffer.length > 0) {\n                textBuffer.push(char);\n            }\n            else {\n                numberBuffer.push(char);\n            }\n            return;\n        }\n        if (type === TokenType.Variable) {\n            textBuffer.push(char);\n            if (numberBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n                numberBuffer = [];\n            }\n            return;\n        }\n    });\n    if (numberBuffer.length > 0) {\n        tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n        numberBuffer = [];\n    }\n    if (textBuffer.length > 0) {\n        tokens.push(new Token(TokenType.Variable, textBuffer.join(\"\")));\n        textBuffer = [];\n    }\n    return tokens;\n}\nexports.tokenize = tokenize;\n;\n\n\n//# sourceURL=webpack://Moon/./src/tokenizer.ts?");

/***/ })

/******/ });