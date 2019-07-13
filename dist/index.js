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
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.ts\"));\n__export(__webpack_require__(/*! ./parser */ \"./src/parser.ts\"));\n\n\n//# sourceURL=webpack://Moon/./src/index.ts?");

/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tokenizer_1 = __webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.ts\");\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\nvar ASTNode = /** @class */ (function () {\n    function ASTNode(value, leftChildNode, rightChildNode) {\n        this.value = value;\n        this.leftChildNode = leftChildNode;\n        this.rightChildNode = rightChildNode;\n    }\n    ASTNode.prototype.toString = function (count) {\n        if (count === void 0) { count = 1; }\n        if (!this.leftChildNode && !this.rightChildNode)\n            return this.value + \" =>null\\n\" + Array(count + 1).join(\" \") + \"=>null\";\n        var left = this.leftChildNode ? this.leftChildNode.toString(count + 1) : \"\";\n        var right = this.rightChildNode ? this.rightChildNode.toString(count + 1) : \"\";\n        return this.value + \" =>\" + left + \"\\n\" + Array(count).join(\" \") + \"=>\" + right;\n    };\n    return ASTNode;\n}());\nvar AST = /** @class */ (function () {\n    function AST() {\n        this.nodes = [];\n    }\n    AST.prototype.addNode = function (value) {\n        var leftChildNode = this.nodes.pop();\n        var rightChildNode = this.nodes.pop();\n        this.nodes.push(new ASTNode(value, leftChildNode, rightChildNode));\n    };\n    AST.prototype.push = function (value) {\n        this.nodes.push(new ASTNode(value));\n    };\n    AST.prototype.toString = function () {\n        //a little hack I put together so it prints out in a readable formASTNode.prototype.toString = function(count) {\n        return this.nodes.toString();\n    };\n    return AST;\n}());\nfunction parse(input) {\n    var outStack = new AST();\n    var opStack = new Array();\n    var tokens = tokenizer_1.tokenize(input);\n    //console.log(\"Parsing: \" + input);\n    tokens.forEach(function (token, i) {\n        if (token.type === tokenizer_1.TokenType.Literal\n            || token.type === tokenizer_1.TokenType.Variable) {\n            outStack.push(token);\n        }\n        if (token.type === tokenizer_1.TokenType.Function) {\n            opStack.push(token);\n        }\n        if (token.type === tokenizer_1.TokenType.Comma) {\n            var stackTop = utils_1.peek(opStack);\n            while (stackTop.type !== tokenizer_1.TokenType.LeftParentesis\n                && opStack.length > 0) {\n                outStack.addNode(opStack.pop());\n                var stackTop_1 = utils_1.peek(opStack);\n            }\n        }\n        if (token.type === tokenizer_1.TokenType.Operator) {\n            var o = utils_1.peek(opStack);\n            while (o &&\n                (o.type === tokenizer_1.TokenType.Function\n                    || (o.type === tokenizer_1.TokenType.Operator && o.precedence() > token.precedence())\n                    || o.type === tokenizer_1.TokenType.Operator && o.precedence() === token.precedence() && o.associativity() === tokenizer_1.AssocDir.left)\n            //&& o.type !== TokenType.LeftParentesis\n            ) {\n                outStack.addNode(opStack.pop());\n                o = utils_1.peek(opStack);\n            }\n            opStack.push(token);\n        }\n        if (token.type === tokenizer_1.TokenType.LeftParentesis) {\n            opStack.push(token);\n        }\n        if (token.type === tokenizer_1.TokenType.RightParentesis) {\n            var stackTop = utils_1.peek(opStack);\n            while (stackTop && stackTop.type !== tokenizer_1.TokenType.LeftParentesis) {\n                outStack.addNode(opStack.pop());\n                stackTop = utils_1.peek(opStack);\n            }\n            if (!stackTop) {\n                throw new Error(\"Mismatched parentesis\");\n            }\n            if (stackTop.type === tokenizer_1.TokenType.LeftParentesis) {\n                opStack.pop();\n            }\n        }\n        /*\n                console.log(\n                    \"iteration: \" + i + \"\\n\" +\n                    `token: ${token.value}, ${token.type}` + \"\\n\" +\n                    \"operatorsStack: \" + opStack.map(v => v.value).toString() + \"\\n\" +\n                    \"outputQueue: \" + outQueue.map(v => v.value).toString()\n                );\n                */\n    });\n    while (outStack && opStack.length > 0) {\n        outStack.addNode(opStack.pop());\n    }\n    return outStack;\n}\nexports.parse = parse;\nconsole.log(parse(\"1+2\").toString());\n\n\n//# sourceURL=webpack://Moon/./src/parser.ts?");

/***/ }),

/***/ "./src/tokenizer.ts":
/*!**************************!*\
  !*** ./src/tokenizer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar _a;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TokenType;\n(function (TokenType) {\n    TokenType[\"Comma\"] = \"Comma\";\n    TokenType[\"Whitespace\"] = \"Whitespace\";\n    TokenType[\"Literal\"] = \"Literal\";\n    TokenType[\"Variable\"] = \"Variable\";\n    TokenType[\"Operator\"] = \"Operator\";\n    TokenType[\"LeftParentesis\"] = \"LeftParentesis\";\n    TokenType[\"RightParentesis\"] = \"RightParentesis\";\n    TokenType[\"Function\"] = \"Function\";\n})(TokenType = exports.TokenType || (exports.TokenType = {}));\nvar AssocDir;\n(function (AssocDir) {\n    AssocDir[\"right\"] = \"right\";\n    AssocDir[\"left\"] = \"left\";\n})(AssocDir = exports.AssocDir || (exports.AssocDir = {}));\n;\nvar Assoc = {\n    \"^\": AssocDir.right,\n    \"*\": AssocDir.left,\n    \"/\": AssocDir.left,\n    \"+\": AssocDir.left,\n    \"-\": AssocDir.left\n};\nvar PrecedenceMap = {\n    \"^\": 4,\n    \"*\": 3,\n    \"/\": 3,\n    \"+\": 2,\n    \"-\": 2\n};\nvar Token = /** @class */ (function () {\n    function Token(type, value) {\n        this.type = type;\n        this.value = value;\n    }\n    Token.prototype.precedence = function () {\n        return PrecedenceMap[this.value];\n    };\n    Token.prototype.associativity = function () {\n        return Assoc[this.value];\n    };\n    Token.prototype.toString = function () {\n        return this.value;\n    };\n    return Token;\n}());\nexports.Token = Token;\n;\nvar TokenTestMap = (_a = {},\n    _a[TokenType.Comma] = {\n        type: TokenType.Comma,\n        test: function (char) { return /,/.test(char); },\n    },\n    _a[TokenType.Literal] = {\n        type: TokenType.Literal,\n        test: function (char) { return /[\\d\\.]/.test(char); },\n    },\n    _a[TokenType.Variable] = {\n        type: TokenType.Variable,\n        test: function (char) { return /[a-z]/i.test(char); },\n    },\n    _a[TokenType.Operator] = {\n        type: TokenType.Operator,\n        test: function (char) { return /(\\+|\\-|\\*|\\/|\\^|in)/.test(char); },\n    },\n    _a[TokenType.LeftParentesis] = {\n        type: TokenType.LeftParentesis,\n        test: function (char) { return char === \"(\"; },\n    },\n    _a[TokenType.RightParentesis] = {\n        type: TokenType.RightParentesis,\n        test: function (char) { return char === \")\"; },\n    },\n    _a[TokenType.Whitespace] = {\n        type: TokenType.Whitespace,\n        test: function (char) { return char === \" \"; },\n    },\n    _a);\nfunction tokenize(input) {\n    var numberBuffer = [];\n    var textBuffer = [];\n    var tokens = [];\n    var value = input\n        .replace(/\\s+/g, ' ')\n        .replace(/\\s?(\\(|\\))\\s?/g, \"$1\")\n        .split(\"\");\n    value\n        .forEach(function (char, i) {\n        var type = null;\n        for (var key in TokenTestMap) {\n            if (TokenTestMap[key].test(char)) {\n                type = TokenTestMap[key].type;\n                break;\n            }\n        }\n        if (type === null) {\n            throw new Error(\"Unable to tokenize: \" + char);\n        }\n        if (type === TokenType.Whitespace) {\n            if (numberBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n                numberBuffer = [];\n            }\n            if (textBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Variable, textBuffer.join(\"\")));\n                textBuffer = [];\n            }\n            return;\n        }\n        if (type === TokenType.LeftParentesis) {\n            if (textBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Function, textBuffer.join(\"\")));\n                textBuffer = [];\n            }\n            tokens.push(new Token(type, char));\n            return;\n        }\n        if (type === TokenType.Comma\n            || type === TokenType.Operator\n            || type === TokenType.RightParentesis) {\n            if (numberBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n                numberBuffer = [];\n            }\n            if (textBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Variable, textBuffer.join(\"\")));\n                textBuffer = [];\n            }\n            tokens.push(new Token(type, char));\n            return;\n        }\n        if (type === TokenType.Literal) {\n            if (textBuffer.length > 0) {\n                textBuffer.push(char);\n            }\n            else {\n                numberBuffer.push(char);\n            }\n            return;\n        }\n        if (type === TokenType.Variable) {\n            textBuffer.push(char);\n            if (numberBuffer.length > 0) {\n                tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n                numberBuffer = [];\n            }\n            return;\n        }\n    });\n    if (numberBuffer.length > 0) {\n        tokens.push(new Token(TokenType.Literal, numberBuffer.join(\"\")));\n        numberBuffer = [];\n    }\n    if (textBuffer.length > 0) {\n        tokens.push(new Token(TokenType.Variable, textBuffer.join(\"\")));\n        textBuffer = [];\n    }\n    return tokens;\n}\nexports.tokenize = tokenize;\n;\n\n\n//# sourceURL=webpack://Moon/./src/tokenizer.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction peek(array) {\n    return array.slice(-1)[0];\n}\nexports.peek = peek;\n\n\n//# sourceURL=webpack://Moon/./src/utils.ts?");

/***/ })

/******/ });