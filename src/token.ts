export enum TokenType {
    Comma = "Comma",
    Whitespace = "Whitespace",
    Literal = "Literal",
    Variable = "Variable",
    Operator = "Operator",
    LeftParentesis = "LeftParentesis",
    RightParentesis = "RightParentesis",
    Function = "Function"
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
    "-" : AssocDir.left
};

const PrecedenceMap: Record<string, number> = {
    "^" : 4, 
    "*" : 3, 
    "/" : 3, 
    "+" : 2, 
    "-" : 2
};

export class Token {
    constructor(
        public type: TokenType,
        public value: string
    ) {}

    precedence(): number {
        return PrecedenceMap[this.value];
    }

    associativity(): AssocDir {
        return Assoc[this.value];
    }

    toString(): string {
        return this.value;
    }
};

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
        test: (char: string) => /[\d\.\$%€]/.test(char),
    },
    [TokenType.Variable]: { 
        type: TokenType.Variable,
        test: (char: string) => /[a-z]/i.test(char),
    },
    [TokenType.Operator]: { 
        type: TokenType.Operator,
        test: (char: string) => /(\+|\-|\*|\/|\^|in)/.test(char),
    },
    [TokenType.LeftParentesis]: { 
        type: TokenType.LeftParentesis,
        test: (char: string) => char === "(",
    },
    [TokenType.RightParentesis]: { 
        type: TokenType.RightParentesis,
        test: (char: string) => char === ")",
    },
    [TokenType.Whitespace]: { 
        type: TokenType.Whitespace,
        test: (char: string) => char === " ",
    }
}
