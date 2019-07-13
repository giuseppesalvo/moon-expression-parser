import { TokenType, TokenTestMap, Token } from './token';

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
                tokens.push(
                    new Token(
                        TokenType.Operator,
                        "*"
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
