import {
    TokenType,
    getTokenType,
    Literal,
    Identifier,
    FunctionIdentifier,
    Token,
    CharToken,
    Operator,
} from './token';

export function tokenize(input: string) {

    let numberBuffer: string[] = [];
    let textBuffer: string[] = [];

    const tokens: Token[] = [];

    const value = input
        .split("");

    function generateState(index: number) {
        return {
            index: index,
            length: value.length,
            char: value[index],
            str: input.substr(index, value.length),
            type: getTokenType(value[index]),
            eos: index === value.length
        };
    };

    let state = generateState(0);

    function next() {
        state = generateState(state.index+1);
    }

    function skipWhitespaces() {
        while ( state.type === TokenType.Whitespace ) {
            next()
        }
    }

    do {

        if ( state.type === null ) {
            throw new Error("Unable to tokenize: " + state.char);
        }

        if ( state.type === TokenType.Whitespace ) {

            skipWhitespaces();

            if (numberBuffer.length > 0) {
                tokens.push(
                    new Literal(
                        i - numberBuffer.length,
                        i+1,
                        numberBuffer.join("")
                    )
                );
                numberBuffer = [];
            }

            if (textBuffer.length > 0) {
                if ( state.type === TokenType.LeftParentesis ) {
                    tokens.push(
                        new FunctionIdentifier(
                            state.index - textBuffer.length,
                            state.index+1,
                            textBuffer.join("")
                        )
                    );
                } else {
                    tokens.push(
                        new Identifier(
                            i - textBuffer.length,
                            i+1,
                            textBuffer.join("")
                        )
                    );
                }
                textBuffer = [];
            }
            return;
        }

        if ( type === TokenType.LeftParentesis ) {

            if (textBuffer.length > 0) {
                tokens.push(
                    new FunctionIdentifier(
                        i - textBuffer.length,
                        i+1,
                        textBuffer.join("")
                    )
                )
                textBuffer = [];
            }
            tokens.push(
                new CharToken(
                    type,
                    i,
                    i+1,
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
                    new Literal(
                        i - numberBuffer.length,
                        i+1,
                        numberBuffer.join("")
                    )
                );
                numberBuffer = [];
            }
            if (textBuffer.length > 0) {
                tokens.push(
                    new Identifier(
                        i - textBuffer.length,
                        i+1,
                        textBuffer.join("")
                    )
                );
                textBuffer = [];
            }
            tokens.push(
                new CharToken(
                    type,
                    i,
                    i+1,
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

        if ( type === TokenType.Identifier ) {
            textBuffer.push(char);

            if ( numberBuffer.length > 0 ) {
                tokens.push(
                    new Literal(
                        i - numberBuffer.length,
                        i+1,
                        numberBuffer.join("")
                    )
                );
                tokens.push(
                    new Operator(
                        i,
                        i+1,
                        "*"
                    )
                );
                numberBuffer = [];
            }

            return;
        }
   
    } while ( index < value.length );

    if (numberBuffer.length > 0) {
        tokens.push(
            new Literal(
                value.length - numberBuffer.length,
                value.length,
                numberBuffer.join("")
            )
        );
        numberBuffer = [];
    }

    if (textBuffer.length > 0) {
        tokens.push(
            new Identifier(
                value.length - textBuffer.length,
                value.length,
                textBuffer.join("")
            )
        );
        textBuffer = [];
    }

    return tokens;
};

//console.log(tokenize("1 + 4 + sin(20)"))
