import {
    tokenize,
    TokenType,
    getTokenType,
    Literal,
    Identifier,
    Token,
    CharToken,
    Operator,
} from '../src/index';

describe("tokenizer", () => {

    it("1 + 2", () => {

        const tokens = tokenize("1 + 2");

        expect(tokens).toEqual([
            new Literal(
                0, 1, "1"
            ),
            new Operator(2, 3, "+"),
            new Literal(
                4, 5, "2"
            ),
        ])

    })

    it("1.4 + 2", () => {

        const tokens = tokenize("1.4 + 2");

        expect(tokens).toEqual([
            new Literal(
                0, 3, "1.4"
            ),
            new Operator(4, 5, "+"),
            new Literal(
                6, 7, "2"
            ),
        ])
    })

    it("456.7xy + 6sin(7.04x) — min(a, 7)", () => {

        const tokens = tokenize("456.7xy + 6sin(7.04x) - min(a, 7)");

        expect(tokens).toEqual([
            new Literal(
                0, 5, "456.7"
            ),
            new Identifier(
                5, 7, "xy"
            ),
            new Operator(8, 9, "+"),
            new Literal(
                10, 11, "6"
            ),
            new Identifier(
                11, 14, "sin"
            ),
            new CharToken(
                TokenType.LeftParentesis, 14, 15, "("
            ),
            new Literal(
                15, 19, "7.04"
            ),
            new Identifier(
                19, 20, "x"
            ),
            new CharToken(
                TokenType.RightParentesis, 20, 21, ")"
            ),
            new Operator(
                22, 23, "-"
            ),
            new Identifier(
                24, 27, "min"
            ),
            new CharToken(
                TokenType.LeftParentesis, 27, 28, "("
            ),
            new Identifier(
                28, 29, "a"
            ),
            new CharToken(
                TokenType.Comma, 29, 30, ","
            ),
            new Literal(
                31, 32, "7"
            ),
            new CharToken(
                TokenType.RightParentesis, 32, 33, ")"
            ),
        ])

    })

/*
    it("5+3kmlkmd in 4o ciao4 ciao4a 1", () => {

        const tokens = tokenize("5+3kmlkmd in 4o ciao4 ciao4a 1");

        expect(tokens).toEqual([
            //5+3kmlkmdin 4o ciao4 ciao4a 1
            new Token(TokenType.Literal, "5"),
            new Token(TokenType.Operator, "+"),
            new Token(TokenType.Literal, "3"),
            new Token(TokenType.Operator, "*"),
            new Token(TokenType.Variable, "kmlkmd"),
            new Token(TokenType.Variable, "in"),
            new Token(TokenType.Literal, "4"),
            new Token(TokenType.Operator, "*"),
            new Token(TokenType.Variable, "o"),
            new Token(TokenType.Variable, "ciao4"),
            new Token(TokenType.Variable, "ciao4a"),
            new Token(TokenType.Literal, "1"),
        ])

    });
*/
});
