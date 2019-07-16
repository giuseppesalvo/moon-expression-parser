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

/***/ "./src/evaluate.ts":
/*!*************************!*\
  !*** ./src/evaluate.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar token_1 = __webpack_require__(/*! ./token */ \"./src/token.ts\");\nvar variables = {\n    \"PI\": Math.PI\n};\nfunction evaluateNode(node) {\n    if (node.type === token_1.TokenType.Literal) {\n        return node.value;\n    }\n    else if (node.type === token_1.TokenType.BinaryExpression) {\n        var exp = node;\n        var left = evaluateNode(exp.left);\n        var right = evaluateNode(exp.right);\n        console.log(left, right);\n        if (typeof left === \"undefined\" && exp.operator.value === \"=\") {\n            if (exp.left.type === token_1.TokenType.Identifier) {\n                var identifier = exp.left;\n                variables[identifier.name] = right;\n            }\n            return right;\n        }\n        if (typeof left === \"undefined\")\n            return right;\n        if (typeof right === \"undefined\" && exp.operator.value === \"=\")\n            return;\n        if (typeof right === \"undefined\") {\n            return left;\n        }\n        switch (exp.operator.value) {\n            case \"+\": return left + right;\n            case \"-\": return left - right;\n            case \"*\": return left * right;\n            case \"/\": return left / right;\n            case \"^\": return Math.pow(left, right);\n            case \"=\":\n                {\n                    if (exp.left.type === token_1.TokenType.Identifier) {\n                        var identifier = exp.left;\n                        variables[identifier.name] = right;\n                    }\n                    return right;\n                }\n                ;\n        }\n    }\n    else if (node.type === token_1.TokenType.FunctionExpression) {\n        var fn = node;\n        var args = fn.args.map(function (arg) { return evaluateNode(arg); });\n        var M = Math;\n        return M[fn.callee.name].apply(M, args);\n    }\n    else if (node.type === token_1.TokenType.Identifier) {\n        var identifier = node;\n        return variables[identifier.name];\n    }\n}\nexports.evaluateNode = evaluateNode;\nfunction evaluate(head) {\n    return evaluateNode(head);\n}\nexports.evaluate = evaluate;\n\n\n//# sourceURL=webpack://Moon/./src/evaluate.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./token */ \"./src/token.ts\"));\n__export(__webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.ts\"));\n__export(__webpack_require__(/*! ./parser */ \"./src/parser.ts\"));\n__export(__webpack_require__(/*! ./evaluate */ \"./src/evaluate.ts\"));\nvar tokenizer_1 = __webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.ts\");\nvar parser_1 = __webpack_require__(/*! ./parser */ \"./src/parser.ts\");\nvar evaluate_1 = __webpack_require__(/*! ./evaluate */ \"./src/evaluate.ts\");\nfunction compile(input, options) {\n    var lines = input.split(\"\\n\");\n    return lines.map(function (line) {\n        var tokens = tokenizer_1.tokenize(line);\n        var asts = parser_1.parse(tokens);\n        return asts.map(function (a) { return evaluate_1.evaluate(a); });\n    });\n}\nexports.compile = compile;\nconsole.log(\"result: \", compile(\"1 + 2\"));\n\n\n//# sourceURL=webpack://Moon/./src/index.ts?");

/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar src_1 = __webpack_require__(/*! ../src */ \"./src/index.ts\");\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\nvar token_1 = __webpack_require__(/*! ./token */ \"./src/token.ts\");\nfunction parse(tokens) {\n    var outputAsts = [];\n    var outAst = [];\n    var opStack = [];\n    var state = {\n        index: 0,\n        end: 0 >= tokens.length,\n        token: tokens[0],\n    };\n    if (state.end) {\n        return [];\n    }\n    function next() {\n        state.index += 1;\n        state.token = tokens[state.index];\n        state.end = state.index === tokens.length;\n    }\n    function goTo(index) {\n        state.index = index;\n        state.token = tokens[index];\n        state.end = index >= tokens.length;\n    }\n    function prevToken() {\n        return tokens[state.index - 1];\n    }\n    function nextToken() {\n        return tokens[state.index + 1];\n    }\n    function findRightParentesisIndex(leftParentesisIndex) {\n        var index = leftParentesisIndex;\n        var deep = 0;\n        while (index < tokens.length) {\n            var token = tokens[index];\n            if (token.type === src_1.TokenType.LeftParentesis) {\n                deep += 1;\n            }\n            if (token.type === src_1.TokenType.RightParentesis) {\n                deep -= 1;\n            }\n            if (deep === 0) {\n                return index;\n            }\n            index += 1;\n        }\n        return -1;\n    }\n    function parseFunction() {\n        var identifier = state.token;\n        var nextT = nextToken();\n        var rightIndex = findRightParentesisIndex(state.index + 1);\n        if (rightIndex < 0) {\n            throw new Error('Mismatched parentesis');\n        }\n        var argsTokens = tokens.slice(state.index + 2, rightIndex);\n        var fn = new token_1.FunctionExpression(identifier.start, tokens[rightIndex].end + 1, identifier, parse(argsTokens));\n        opStack.push(fn);\n        goTo(rightIndex + 1);\n    }\n    function closeAst() {\n        while (opStack.length > 0) {\n            var top_1 = opStack.pop(); // It will never be undefined\n            if (top_1.type === src_1.TokenType.Operator) {\n                var right = outAst.pop();\n                var left = outAst.pop();\n                outAst.push(new token_1.BinaryExpression(left.start, right.end, top_1, left, right));\n            }\n            else if (top_1.type === src_1.TokenType.FunctionExpression) {\n                outAst.push(top_1);\n            }\n        }\n        outputAsts.push(outAst);\n        outAst = [];\n        opStack = [];\n    }\n    function parseAst() {\n        if (state.token.type === src_1.TokenType.Comma) {\n            closeAst();\n            next();\n            return;\n        }\n        if (state.token.type === src_1.TokenType.Literal) {\n            outAst.push(state.token);\n            next();\n            return;\n        }\n        if (state.token.type === src_1.TokenType.Identifier) {\n            // Checking for implicit multiplication between literals and identifiers\n            var prevT = prevToken();\n            if (prevT && prevT.type === src_1.TokenType.Literal) {\n                opStack.push(new token_1.Operator(prevT.start, state.token.end, \"*\", true));\n            }\n            // Function check\n            var nextT = nextToken();\n            if (nextT && nextT.type === src_1.TokenType.LeftParentesis) {\n                parseFunction();\n                return;\n            }\n            outAst.push(state.token);\n            next();\n            return;\n        }\n        if (state.token.type === src_1.TokenType.Operator) {\n            var o = utils_1.peek(opStack);\n            var token = state.token;\n            while (o &&\n                (o.type === src_1.TokenType.FunctionExpression\n                    || (o.type === src_1.TokenType.Operator && o.precedence() > token.precedence())\n                    || o.type === src_1.TokenType.Operator && o.precedence() === token.precedence() && o.associativity() === src_1.AssocDir.left)) {\n                if (o.type === src_1.TokenType.Operator) {\n                    var right = outAst.pop();\n                    var left = outAst.pop();\n                    outAst.push(new token_1.BinaryExpression(left.start, right.end, o, left, right));\n                }\n                else if (o.type === src_1.TokenType.FunctionExpression) {\n                    outAst.push(o);\n                }\n                opStack.pop();\n                o = utils_1.peek(opStack);\n            }\n            opStack.push(token);\n            next();\n            return;\n        }\n        if (state.token.type === src_1.TokenType.LeftParentesis) {\n            opStack.push(state.token);\n            next();\n            return;\n        }\n        if (state.token.type === src_1.TokenType.RightParentesis) {\n            var op = utils_1.peek(opStack);\n            while (op && op.type !== src_1.TokenType.LeftParentesis) {\n                if (op.type === src_1.TokenType.Operator) {\n                    var right = outAst.pop();\n                    var left = outAst.pop();\n                    outAst.push(new token_1.BinaryExpression(left.start, right.end, op, left, right));\n                }\n                else if (op.type === src_1.TokenType.FunctionExpression) {\n                    outAst.push(op);\n                }\n                console.log(opStack.pop());\n                op = utils_1.peek(opStack);\n            }\n            if (op && op.type === src_1.TokenType.LeftParentesis) {\n                opStack.pop();\n            }\n            else {\n                throw new Error('Mismatched parentesis');\n            }\n            next();\n            return;\n        }\n    }\n    do {\n        parseAst();\n    } while (!state.end);\n    closeAst();\n    // Returning heads only\n    return outputAsts.map(function (v) { return v[0]; });\n}\nexports.parse = parse;\n\n\n//# sourceURL=webpack://Moon/./src/parser.ts?");

/***/ }),

/***/ "./src/token.ts":
/*!**********************!*\
  !*** ./src/token.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar _a;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TokenType;\n(function (TokenType) {\n    TokenType[\"Comma\"] = \"Comma\";\n    TokenType[\"Whitespace\"] = \"Whitespace\";\n    TokenType[\"Literal\"] = \"Literal\";\n    TokenType[\"Identifier\"] = \"Identifier\";\n    TokenType[\"Operator\"] = \"Operator\";\n    TokenType[\"BinaryExpression\"] = \"BinaryExpression\";\n    TokenType[\"LeftParentesis\"] = \"LeftParentesis\";\n    TokenType[\"RightParentesis\"] = \"RightParentesis\";\n    TokenType[\"FunctionExpression\"] = \"FunctionExpression\";\n})(TokenType = exports.TokenType || (exports.TokenType = {}));\nvar AssocDir;\n(function (AssocDir) {\n    AssocDir[\"right\"] = \"right\";\n    AssocDir[\"left\"] = \"left\";\n})(AssocDir = exports.AssocDir || (exports.AssocDir = {}));\n;\nvar Assoc = {\n    \"^\": AssocDir.right,\n    \"*\": AssocDir.left,\n    \"/\": AssocDir.left,\n    \"+\": AssocDir.left,\n    \"-\": AssocDir.left,\n    \"=\": AssocDir.left,\n};\nvar PrecedenceMap = {\n    \"^\": 4,\n    \"*\": 3,\n    \"/\": 3,\n    \"+\": 2,\n    \"-\": 2,\n    \"=\": 1,\n};\nvar Token = /** @class */ (function () {\n    function Token(type, start, end) {\n        this.type = type;\n        this.start = start;\n        this.end = end;\n    }\n    return Token;\n}());\nexports.Token = Token;\nvar LeftParentesis = /** @class */ (function (_super) {\n    __extends(LeftParentesis, _super);\n    function LeftParentesis(start, end, char) {\n        var _this = _super.call(this, TokenType.LeftParentesis, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.char = char;\n        return _this;\n    }\n    return LeftParentesis;\n}(Token));\nexports.LeftParentesis = LeftParentesis;\nvar RightParentesis = /** @class */ (function (_super) {\n    __extends(RightParentesis, _super);\n    function RightParentesis(start, end, char) {\n        var _this = _super.call(this, TokenType.RightParentesis, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.char = char;\n        return _this;\n    }\n    return RightParentesis;\n}(Token));\nexports.RightParentesis = RightParentesis;\nvar CharToken = /** @class */ (function (_super) {\n    __extends(CharToken, _super);\n    function CharToken(type, start, end, char) {\n        var _this = _super.call(this, type, start, end) || this;\n        _this.type = type;\n        _this.start = start;\n        _this.end = end;\n        _this.char = char;\n        return _this;\n    }\n    return CharToken;\n}(Token));\nexports.CharToken = CharToken;\nvar Identifier = /** @class */ (function (_super) {\n    __extends(Identifier, _super);\n    function Identifier(start, end, name) {\n        var _this = _super.call(this, TokenType.Identifier, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.name = name;\n        return _this;\n    }\n    return Identifier;\n}(Token));\nexports.Identifier = Identifier;\nvar BinaryExpression = /** @class */ (function (_super) {\n    __extends(BinaryExpression, _super);\n    function BinaryExpression(start, end, operator, left, right) {\n        var _this = _super.call(this, TokenType.BinaryExpression, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.operator = operator;\n        _this.left = left;\n        _this.right = right;\n        return _this;\n    }\n    return BinaryExpression;\n}(Token));\nexports.BinaryExpression = BinaryExpression;\nvar Operator = /** @class */ (function (_super) {\n    __extends(Operator, _super);\n    function Operator(start, end, value, implicit) {\n        if (implicit === void 0) { implicit = false; }\n        var _this = _super.call(this, TokenType.Operator, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.value = value;\n        _this.implicit = implicit;\n        return _this;\n    }\n    Operator.prototype.precedence = function () {\n        return PrecedenceMap[this.value];\n    };\n    Operator.prototype.associativity = function () {\n        return Assoc[this.value];\n    };\n    Operator.prototype.toString = function () {\n        return this.value;\n    };\n    return Operator;\n}(Token));\nexports.Operator = Operator;\nvar Literal = /** @class */ (function (_super) {\n    __extends(Literal, _super);\n    function Literal(start, end, raw) {\n        var _this = _super.call(this, TokenType.Literal, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.raw = raw;\n        _this.value = parseFloat(raw);\n        return _this;\n    }\n    return Literal;\n}(Token));\nexports.Literal = Literal;\nvar FunctionExpression = /** @class */ (function (_super) {\n    __extends(FunctionExpression, _super);\n    function FunctionExpression(start, end, callee, args) {\n        if (args === void 0) { args = []; }\n        var _this = _super.call(this, TokenType.FunctionExpression, start, end) || this;\n        _this.start = start;\n        _this.end = end;\n        _this.callee = callee;\n        _this.args = args;\n        return _this;\n    }\n    return FunctionExpression;\n}(Token));\nexports.FunctionExpression = FunctionExpression;\nexports.TokenTestMap = (_a = {},\n    _a[TokenType.Comma] = {\n        type: TokenType.Comma,\n        test: function (char) { return /,/.test(char); },\n    },\n    _a[TokenType.Literal] = {\n        type: TokenType.Literal,\n        test: function (char) { return /[\\d\\.]/.test(char); },\n    },\n    _a[TokenType.Identifier] = {\n        type: TokenType.Identifier,\n        test: function (char) { return /[a-zA-Z\\_]/i.test(char); },\n    },\n    _a[TokenType.Operator] = {\n        type: TokenType.Operator,\n        test: function (char) { return /(\\+|\\-|\\*|\\/|\\^|=)/.test(char); },\n    },\n    _a[TokenType.LeftParentesis] = {\n        type: TokenType.LeftParentesis,\n        test: function (char) { return /[\\{\\[\\(]/.test(char); },\n    },\n    _a[TokenType.RightParentesis] = {\n        type: TokenType.RightParentesis,\n        test: function (char) { return /[\\)\\]\\}]/.test(char); },\n    },\n    _a[TokenType.Whitespace] = {\n        type: TokenType.Whitespace,\n        test: function (char) { return char === \" \"; },\n    },\n    _a);\nfunction getTokenType(input) {\n    var type = null;\n    for (var key in exports.TokenTestMap) {\n        if (exports.TokenTestMap[key].test(input)) {\n            type = exports.TokenTestMap[key].type;\n            break;\n        }\n    }\n    return type;\n}\nexports.getTokenType = getTokenType;\n\n\n//# sourceURL=webpack://Moon/./src/token.ts?");

/***/ }),

/***/ "./src/tokenizer.ts":
/*!**************************!*\
  !*** ./src/tokenizer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar token_1 = __webpack_require__(/*! ./token */ \"./src/token.ts\");\nfunction tokenize(input) {\n    var tokens = [];\n    var value = input.split(\"\");\n    var state = {\n        index: 0,\n        length: value.length,\n        value: value,\n        token: [],\n        eos: 0 >= value.length,\n        char: value[0],\n        type: token_1.getTokenType(value[0])\n    };\n    function next() {\n        state.index += 1;\n        state.eos = state.index === value.length;\n        state.char = value[state.index];\n        state.type = token_1.getTokenType(value[state.index]);\n    }\n    function skipWhitespaces() {\n        while (state.type === token_1.TokenType.Whitespace && !state.eos) {\n            next();\n        }\n    }\n    function checkTokenValidity() {\n        if (state.type === null) {\n            throw new Error(\"Unable to tokenize: \\\"\" + state.char + \"\\\"\");\n        }\n    }\n    function parseLiteral() {\n        while (state.type === token_1.TokenType.Literal && !state.eos) {\n            state.token.push(state.char);\n            next();\n        }\n        if (state.token.length > 0) {\n            tokens.push(new token_1.Literal(state.index - state.token.length, state.index, state.token.join(\"\")));\n            state.token = [];\n        }\n    }\n    function parseIdentifier() {\n        while ((state.type === token_1.TokenType.Identifier || state.type === token_1.TokenType.Literal) && !state.eos) {\n            state.token.push(state.char);\n            next();\n        }\n        if (state.token.length > 0) {\n            tokens.push(new token_1.Identifier(state.index - state.token.length, state.index, state.token.join(\"\")));\n            state.token = [];\n        }\n    }\n    function parseToken() {\n        checkTokenValidity();\n        skipWhitespaces();\n        if (state.type === token_1.TokenType.Literal) {\n            parseLiteral();\n            return;\n        }\n        if (state.type === token_1.TokenType.Identifier) {\n            parseIdentifier();\n            return;\n        }\n        if (state.type === token_1.TokenType.LeftParentesis) {\n            tokens.push(new token_1.LeftParentesis(state.index, state.index + 1, state.char));\n            next();\n            return;\n        }\n        if (state.type === token_1.TokenType.RightParentesis) {\n            tokens.push(new token_1.RightParentesis(state.index, state.index + 1, state.char));\n            next();\n            return;\n        }\n        if (state.type === token_1.TokenType.Comma) {\n            tokens.push(new token_1.CharToken(state.type, state.index, state.index + 1, state.char));\n            next();\n            return;\n        }\n        if (state.type === token_1.TokenType.Operator) {\n            tokens.push(new token_1.Operator(state.index, state.index + 1, state.char));\n            next();\n            return;\n        }\n    }\n    do {\n        parseToken();\n    } while (!state.eos);\n    return tokens;\n}\nexports.tokenize = tokenize;\n;\n\n\n//# sourceURL=webpack://Moon/./src/tokenizer.ts?");

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