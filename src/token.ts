export enum TokenType {
    Comma = "Comma",
    Whitespace = "Whitespace",
    Literal = "Literal",
    Identifier = "Identifier",
    Operator = "Operator",
    UnaryExpression = "UnaryExpression",
    BinaryExpression = "BinaryExpression",
    LeftParentesis = "LeftParentesis",
    RightParentesis = "RightParentesis",
    FunctionExpression = "FunctionExpression",
    Comment = "Comment",
    Unit = "Unit"
}

export enum AssocDir {
    right = "right",
    left = "left"
};

const Assoc: Record<string, AssocDir> = {
    "^" : AssocDir.right, 
    "*" : AssocDir.left, 
    "/" : AssocDir.left, 
    "+" : AssocDir.left, 
    "-" : AssocDir.left,
    "=" : AssocDir.left,
    "of" : AssocDir.left,
    "times" : AssocDir.left,
};

const PrecedenceMap: Record<string, number> = {
    "^" : 5, 
    "*" : 3, 
    "/" : 3, 
    "+" : 2, 
    "-" : 2,
    "=" : 6,
    "of" : 1,
    "times" : 3,
};

const UnaryPrecedenceMap: Record<string, number> = {
    "+" : 4, 
    "-" : 4, 
};

export abstract class Token {
    constructor(
        public type: TokenType,
        public start: number,
        public end: number
    ) {}
}

export class Unit extends Token {
    constructor(
        public start: number,
        public end: number,
        public value: string,
    ) {
        super(TokenType.Unit, start, end);
    }
}

export class Comment extends Token {
    constructor(
        public start: number,
        public end: number,
        public content: string,
    ) {
        super(TokenType.Comment, start, end);
    }
}

export class LeftParentesis extends Token {
    constructor(
        public start: number,
        public end: number,
        public char: string,
    ) {
        super(TokenType.LeftParentesis, start, end);
    }
}

export class RightParentesis extends Token {
    constructor(
        public start: number,
        public end: number,
        public char: string,
    ) {
        super(TokenType.RightParentesis, start, end);
    }
}

export class CharToken extends Token {
    constructor(
        public type: TokenType,
        public start: number,
        public end: number,
        public char: string,
    ) {
        super(type, start, end);
    }
}

export class Identifier extends Token {
    constructor(
        public start: number,
        public end: number,
        public name: string
    ) {
        super(TokenType.Identifier, start, end);
    }
}

export class UnaryExpression extends Token {
    constructor(
        public start: number,
        public end: number,
        public operator: Operator,
        public argument: Token,
    ) {
        super(TokenType.UnaryExpression, start, end);
    }
}

export class BinaryExpression extends Token {
    constructor(
        public start: number,
        public end: number,
        public operator: Operator,
        public left: Token,
        public right: Token,
    ) {
        super(TokenType.BinaryExpression, start, end);
    }
}

export class Operator extends Token {
    constructor(
        public start: number,
        public end: number,
        public value: string,
        public implicit = false,
        public unary = false,
    ) {
        super(TokenType.Operator, start, end);
    }

    precedence(): number {
        if ( this.unary ) {
            return UnaryPrecedenceMap[this.value];
        } else {
            return PrecedenceMap[this.value];
        }
    }

    associativity(): AssocDir {
        return Assoc[this.value];
    }

    toString(): string {
        return this.value;
    }
}

export class Literal extends Token {
    public value: number

    constructor(
        public start: number,
        public end: number,
        public raw: string,
        public unit?: Unit,
    ) {
        super(TokenType.Literal, start, end);
        this.value = parseFloat(raw);
    }
}

export class FunctionExpression extends Token {
    constructor(
        public start: number,
        public end: number,
        public callee: Identifier,
        public args: Token[] = []
    ) {
        super(TokenType.FunctionExpression, start, end);
    }
}

type TokenTestMap = {
    [prop: string]: {
        type: TokenType,
        test: (char: string) => boolean
    }
}

export const TokenTestMap: TokenTestMap = {
    [TokenType.Comma]: { 
        type: TokenType.Comma,
        test: (char: string) => /,/.test(char),
    },
    [TokenType.Literal]: { 
        type: TokenType.Literal,
        test: (char: string) => /[\d\.]/.test(char),
    },
    [TokenType.Identifier]: { 
        type: TokenType.Identifier,
        test: (char: string) => /[a-zA-Z\_]/i.test(char),
    },
    [TokenType.Operator]: { 
        type: TokenType.Operator,
        test: (char: string) => /^(\+|\-|\*|\/|\^|=|of|times)$/.test(char),
    },
    [TokenType.LeftParentesis]: { 
        type: TokenType.LeftParentesis,
        test: (char: string) => /[\{\[\(]/.test(char),
    },
    [TokenType.RightParentesis]: { 
        type: TokenType.RightParentesis,
        test: (char: string) => /[\)\]\}]/.test(char),
    },
    [TokenType.Whitespace]: { 
        type: TokenType.Whitespace,
        test: (char: string) => char === " ",
    },
    [TokenType.Comment]: { 
        type: TokenType.Comment,
        test: (char: string) => char === "#",
    },
    [TokenType.Unit]: { 
        type: TokenType.Unit,
        test: (char: string) => /^(cm|m|mm)$/.test(char),
    },
}

export function getTokenType(input: string): TokenType|null {
    let type = null;

    for ( let key in TokenTestMap ) {
        if ( TokenTestMap[key].test(input) ) {
            type = TokenTestMap[key].type
            break;
        }
    }

    return type
}
