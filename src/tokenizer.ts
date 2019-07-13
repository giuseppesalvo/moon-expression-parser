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

const TokenTestMap: TokenTestMap = {
    [TokenType.Comma]: { 
        type: TokenType.Comma,
        test: (char: string) => /,/.test(char),
    },
    [TokenType.Literal]: { 
        type: TokenType.Literal,
        test: (char: string) => /[\d\.]/.test(char),
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

export function tokenize(input: string) {


    let numberBuffer: string[] = [];
    let textBuffer: string[] = [];

    const tokens: Token[] = [];

    const value = input
        .replace(/\s+/g, ' ')
        .replace(/\s?(\(|\))\s?/g, "$1")
        .split("");

    value
    .forEach((char, i) => {

        let type = null;

        for ( let key in TokenTestMap ) {
            if ( TokenTestMap[key].test(char) ) {
                type = TokenTestMap[key].type
                break;
            }
        }

        if ( type === null ) {
            throw new Error("Unable to tokenize: " + char);
        }

        if ( type === TokenType.Whitespace ) {

            if (numberBuffer.length > 0) {
                tokens.push(
                    new Token(
                        TokenType.Literal,
                        numberBuffer.join("")
                    )
                );
                numberBuffer = [];
            }
            if (textBuffer.length > 0) {
                tokens.push(
                    new Token(
                        TokenType.Variable,
                        textBuffer.join("")
                    )
                );
                textBuffer = [];
            }
            return;
        }

        if ( type === TokenType.LeftParentesis ) {
            if (textBuffer.length > 0) {
                tokens.push(
                    new Token(
                        TokenType.Function,
                        textBuffer.join("")
                    )
                );
                textBuffer = [];
            }
            tokens.push(
                new Token(
                    type,
                    char
                )
            );
            return
        }

        if (   type === TokenType.Comma
            || type === TokenType.Operator
            || type === TokenType.RightParentesis ) {
                
            if (numberBuffer.length > 0) {
                tokens.push(
                    new Token(
                        TokenType.Literal,
                        numberBuffer.join("")
                    )
                );
                numberBuffer = [];
            }
            if (textBuffer.length > 0) {
                tokens.push(
                    new Token(
                        TokenType.Variable,
                        textBuffer.join("")
                    )
                );
                textBuffer = [];
            }
            tokens.push(
                new Token(
                    type,
                    char
                )
            );
            return;
        }

        if ( type === TokenType.Literal) {

            if ( textBuffer.length > 0 ) {
                textBuffer.push(char);
            } else {
                numberBuffer.push(char);
            }

            return;
        }

        if ( type === TokenType.Variable ) {
            textBuffer.push(char);

            if ( numberBuffer.length > 0 ) {
                tokens.push(
                    new Token(
                        TokenType.Literal,
                        numberBuffer.join("")
                    )
                );
                numberBuffer = [];
            }

            return;
        }
   
    });

    if (numberBuffer.length > 0) {
        tokens.push(
            new Token(
                TokenType.Literal,
                numberBuffer.join("")
            )
        );
        numberBuffer = [];
    }
    if (textBuffer.length > 0) {
        tokens.push(
            new Token(
                TokenType.Variable,
                textBuffer.join("")
            )
        );
        textBuffer = [];
    }

    return tokens;
};
