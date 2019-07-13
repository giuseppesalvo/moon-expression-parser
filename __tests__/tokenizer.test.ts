import { tokenize, Token, TokenType } from '../src/index';

describe("tokenizer", () => {

    it("1 + 2", () => {

        const tokens = tokenize("1 + 2");

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "1"),
            new Token(TokenType.Operator, "+"),
            new Token(TokenType.Literal, "2"),
        ])

    })

    it("1.4 + 2", () => {

        const tokens = tokenize("1.4 + 2");

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "1.4"),
            new Token(TokenType.Operator, "+"),
            new Token(TokenType.Literal, "2"),
        ])

    })

    it("456.7xy + 6sin(7.04x) — min(a, 7)", () => {

        const tokens = tokenize("456.7xy + 6sin(7.04x) - min(a, 7)");

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "456.7"),
            new Token(TokenType.Variable, "xy"),
            new Token(TokenType.Operator, "+"),
            new Token(TokenType.Literal, "6"),
            new Token(TokenType.Function, "sin"),
            new Token(TokenType.LeftParentesis, "("),
            new Token(TokenType.Literal, "7.04"),
            new Token(TokenType.Variable, "x"),
            new Token(TokenType.RightParentesis, ")"),
            new Token(TokenType.Operator, "-"),
            new Token(TokenType.Function, "min"),
            new Token(TokenType.LeftParentesis, "("),
            new Token(TokenType.Variable, "a"),
            new Token(TokenType.Comma, ","),
            new Token(TokenType.Literal, "7"),
            new Token(TokenType.RightParentesis, ")"),
        ])

    })

    it("5+3kmlkmd in 4o ciao4 ciao4a 1", () => {

        const tokens = tokenize("5+3kmlkmd in 4o ciao4 ciao4a 1");

        expect(tokens).toEqual([
            //5+3kmlkmdin 4o ciao4 ciao4a 1
            new Token(TokenType.Literal, "5"),
            new Token(TokenType.Operator, "+"),
            new Token(TokenType.Literal, "3"),
            new Token(TokenType.Variable, "kmlkmd"),
            new Token(TokenType.Variable, "in"),
            new Token(TokenType.Literal, "4"),
            new Token(TokenType.Variable, "o"),
            new Token(TokenType.Variable, "ciao4"),
            new Token(TokenType.Variable, "ciao4a"),
            new Token(TokenType.Literal, "1"),
        ])

    });

});
