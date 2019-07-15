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
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./token */ \"./src/token.ts\"));\n__export(__webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.ts\"));\n/*\nexport * from './ast';\nexport * from './parser';\nexport * from './evaluate';\n*/\n\n\n//# sourceURL=webpack://Moon/./src/index.ts?");

/***/ }),

/***/ "./src/token.ts":
/*!**********************!*\
  !*** ./src/token.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar _a;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TokenType;\n(function (TokenType) {\n    TokenType[\"Comma\"] = \"Comma\";\n    TokenType[\"Whitespace\"] = \"Whitespace\";\n    TokenType[\"Literal\"] = \"Literal\";\n    TokenType[\"Identifier\"] = \"Identifier\";\n    TokenType[\"FunctionIdentifier\"] = \"FunctionIdentifier\";\n    TokenType[\"Operator\"] = \"Operator\";\n    TokenType[\"BinaryExpression\"] = \"BinaryExpression\";\n    TokenType[\"LeftParentesis\"] = \"LeftParentesis\";\n    TokenType[\"RightParentesis\"] = \"RightParentesis\";\n    TokenType[\"FunctionExpression\"] = \"FunctionExpression\";\n})(TokenType = exports.TokenType || (exports.TokenType = {}));\nvar AssocDir;\n(function (AssocDir) {\n    AssocDir[\"right\"] = \"right\";\n    AssocDir[\"left\"] = \"left\";\n})(AssocDir = exports.AssocDir || (exports.AssocDir = {}));\n;\nvar Assoc = {\n    \"^\": AssocDir.right,\n    \"*\": AssocDir.left,\n    \"/\": AssocDir.left,\n    \"+\": AssocDir.left,\n    \"-\": AssocDir.left,\n    \"=\": AssocDir.left,\n};\nvar PrecedenceMap = {\n    \"^\": 4,\n    \"*\": 3,\n    \"/\": 3,\n    \"+\": 2,\n    \"-\": 2,\n    \"=\": 1,\n};\nvar Token = /** @class */ (function () {\n    function Token(type, start, end) {\n        this.type = type;\n        this.start = start;\n        this.end = end;\n    }\n    return Token;\n}());\nexports.Token = Token;\nvar CharToken = /** @class */ (function (_super) {\n    __extends(CharToken, _super);\n    function CharToken(type, start, end, char) {\n        var _this = _super.call(this, type, start, end) || this;\n        _this.type = type;\n        _this.start = start;\n        _this.end = end;\n        _this.char = char;\n        return _this;\n    }\n    return CharToken;\n}(Token));\nexports.CharToken = CharToken;\nvar Identifier = /** @class */ (function (_super) {\n    __extends(Identifier, _super);\n    function Identifier(start, end, name) {\n        var _this = _super.call(this, TokenType.Identifier, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.name = name;\n        return _this;\n    }\n    return Identifier;\n}(Token));\nexports.Identifier = Identifier;\nvar BinaryExpression = /** @class */ (function (_super) {\n    __extends(BinaryExpression, _super);\n    function BinaryExpression(start, end, operator, right, left) {\n        var _this = _super.call(this, TokenType.BinaryExpression, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.operator = operator;\n        _this.right = right;\n        _this.left = left;\n        return _this;\n    }\n    return BinaryExpression;\n}(Token));\nexports.BinaryExpression = BinaryExpression;\nvar Operator = /** @class */ (function (_super) {\n    __extends(Operator, _super);\n    function Operator(start, end, operator) {\n        var _this = _super.call(this, TokenType.Operator, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.operator = operator;\n        return _this;\n    }\n    Operator.prototype.precedence = function () {\n        return PrecedenceMap[this.operator];\n    };\n    Operator.prototype.associativity = function () {\n        return Assoc[this.operator];\n    };\n    Operator.prototype.toString = function () {\n        return this.operator;\n    };\n    return Operator;\n}(Token));\nexports.Operator = Operator;\nvar Literal = /** @class */ (function (_super) {\n    __extends(Literal, _super);\n    function Literal(start, end, raw) {\n        var _this = _super.call(this, TokenType.Literal, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.raw = raw;\n        _this.value = parseFloat(raw);\n        return _this;\n    }\n    return Literal;\n}(Token));\nexports.Literal = Literal;\nvar FunctionExpression = /** @class */ (function (_super) {\n    __extends(FunctionExpression, _super);\n    function FunctionExpression(start, end, callee, args) {\n        var _this = _super.call(this, TokenType.FunctionExpression, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.callee = callee;\n        _this.args = args;\n        return _this;\n    }\n    return FunctionExpression;\n}(Token));\nexports.FunctionExpression = FunctionExpression;\nexports.TokenTestMap = (_a = {},\n    _a[TokenType.Comma] = {\n        type: TokenType.Comma,\n        test: function (char) { return /,/.test(char); },\n    },\n    _a[TokenType.Literal] = {\n        type: TokenType.Literal,\n        test: function (char) { return /[\\d\\.]/.test(char); },\n    },\n    _a[TokenType.Identifier] = {\n        type: TokenType.Identifier,\n        test: function (char) { return /[a-zA-Z\\_]/i.test(char); },\n    },\n    _a[TokenType.Operator] = {\n        type: TokenType.Operator,\n        test: function (char) { return /(\\+|\\-|\\*|\\/|\\^|=)/.test(char); },\n    },\n    _a[TokenType.LeftParentesis] = {\n        type: TokenType.LeftParentesis,\n        test: function (char) { return /[\\{\\[\\(]/.test(char); },\n    },\n    _a[TokenType.RightParentesis] = {\n        type: TokenType.RightParentesis,\n        test: function (char) { return /[\\)\\]\\}]/.test(char); },\n    },\n    _a[TokenType.Whitespace] = {\n        type: TokenType.Whitespace,\n        test: function (char) { return char === \" \"; },\n    },\n    _a);\nfunction getTokenType(input) {\n    var type = null;\n    for (var key in exports.TokenTestMap) {\n        if (exports.TokenTestMap[key].test(input)) {\n            type = exports.TokenTestMap[key].type;\n            break;\n        }\n    }\n    return type;\n}\nexports.getTokenType = getTokenType;\n\n\n//# sourceURL=webpack://Moon/./src/token.ts?");

/***/ }),

/***/ "./src/tokenizer.ts":
/*!**************************!*\
  !*** ./src/tokenizer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar token_1 = __webpack_require__(/*! ./token */ \"./src/token.ts\");\nfunction tokenize(input) {\n    var tokens = [];\n    var value = input.split(\"\");\n    var state = {\n        index: 0,\n        length: value.length,\n        value: value,\n        token: [],\n        eos: false,\n        char: value[0],\n        type: token_1.getTokenType(value[0])\n    };\n    function next() {\n        state.index += 1;\n        state.eos = state.index === value.length;\n        state.char = value[state.index];\n        state.type = token_1.getTokenType(value[state.index]);\n    }\n    function skipWhitespaces() {\n        while (state.type === token_1.TokenType.Whitespace && !state.eos) {\n            next();\n        }\n    }\n    function checkTokenValidity() {\n        if (state.type === null) {\n            throw new Error(\"Unable to tokenize: \\\"\" + state.char + \"\\\"\");\n        }\n    }\n    function parseLiteral() {\n        while (state.type === token_1.TokenType.Literal && !state.eos) {\n            state.token.push(state.char);\n            next();\n        }\n        if (state.token.length > 0) {\n            tokens.push(new token_1.Literal(state.index - state.token.length, state.index, state.token.join(\"\")));\n            state.token = [];\n        }\n    }\n    function parseIdentifier() {\n        while ((state.type === token_1.TokenType.Identifier || state.type === token_1.TokenType.Literal) && !state.eos) {\n            state.token.push(state.char);\n            next();\n        }\n        if (state.token.length > 0) {\n            tokens.push(new token_1.Identifier(state.index - state.token.length, state.index, state.token.join(\"\")));\n            state.token = [];\n        }\n    }\n    function parseToken() {\n        checkTokenValidity();\n        skipWhitespaces();\n        if (state.type === token_1.TokenType.Literal) {\n            parseLiteral();\n            return;\n        }\n        if (state.type === token_1.TokenType.Identifier) {\n            parseIdentifier();\n            return;\n        }\n        if (state.type === token_1.TokenType.LeftParentesis\n            || state.type === token_1.TokenType.RightParentesis\n            || state.type === token_1.TokenType.Comma) {\n            tokens.push(new token_1.CharToken(state.type, state.index, state.index + 1, state.char));\n            next();\n            return;\n        }\n        if (state.type === token_1.TokenType.Operator) {\n            tokens.push(new token_1.Operator(state.index, state.index + 1, state.char));\n            next();\n            return;\n        }\n    }\n    do {\n        parseToken();\n    } while (!state.eos);\n    return tokens;\n}\nexports.tokenize = tokenize;\n;\n\n\n//# sourceURL=webpack://Moon/./src/tokenizer.ts?");

/***/ })

/******/ });