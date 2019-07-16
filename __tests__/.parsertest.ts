/*
import { TokenType, Token, parse } from '../src';

describe("tokenizer", () => {
/*
    it("1 + 2", () => {

        const tokens = parse("1 + 2");

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "1"),
            new Token(TokenType.Literal, "2"),
            new Token(TokenType.Operator, "+"),
        ])

    });

    it("1.4 + 2", () => {

        const tokens = parse("1.4 + 2");

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "1.4"),
            new Token(TokenType.Literal, "2"),
            new Token(TokenType.Operator, "+"),
        ])

    });

    it("456.7xy + 6sin(7.04x) - min(a, 7)", () => {

        const tokens = parse("456.7xy + 6sin(7.04x) - min(a, 7)");

        console.log(tokens);

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "456.7"),
            new Token(TokenType.Variable, "xy"),
            new Token(TokenType.Literal, "6"),
            new Token(TokenType.Literal, "7.04"),
            new Token(TokenType.Variable, "x"),
            new Token(TokenType.Function, "sin"),
            new Token(TokenType.Operator, "+"),
            new Token(TokenType.Variable, "a"),
            new Token(TokenType.Literal, "7"),
            new Token(TokenType.Function, "min"),
            new Token(TokenType.Operator, "-"),
        ])
    })

    it("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3", () => {

        const tokens = parse("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3");

        console.log(tokens.nodes.toString());

        expect(tokens).toEqual([
            new Token(TokenType.Literal, "3"),
            new Token(TokenType.Literal, "4"),
            new Token(TokenType.Literal, "2"),
            new Token(TokenType.Operator, "*"),
            new Token(TokenType.Literal, "1"),
            new Token(TokenType.Literal, "5"),
            new Token(TokenType.Operator, "-"),
            new Token(TokenType.Literal, "2"),
            new Token(TokenType.Literal, "3"),
            new Token(TokenType.Operator, "^"),
            new Token(TokenType.Operator, "^"),
            new Token(TokenType.Operator, "/"),
            new Token(TokenType.Operator, "+"),
        ])

    })

    it("sin ( max ( 2, 3 ) / 3 * p )", () => {

        const tokens = parse("sin ( max ( 2, 3 ) / 3 * p )");

        expect(tokens).toEqual([
            //2 3 max 3 ÷ p × sin
            new Token(TokenType.Literal, "2"),
            new Token(TokenType.Literal, "3"),
            new Token(TokenType.Function, "max"),
            new Token(TokenType.Literal, "3"),
            new Token(TokenType.Operator, "/"),
            new Token(TokenType.Variable, "p"),
            new Token(TokenType.Operator, "*"),
            new Token(TokenType.Function, "sin"),
        ])

    })
});
*/
