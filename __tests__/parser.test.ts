import {
    parse,
    tokenize,
    BinaryExpression,
    Operator,
    Literal
} from '../src';

describe("parser", () => {

    it("1 + 2", () => {

        const tokens = tokenize("1 + 2")
        const asts = parse(tokens);

        expect(asts).toEqual([
            new BinaryExpression(
                0, 
                5,
                new Operator(2, 3, "+"),
                new Literal(0, 1, "1"),
                new Literal(4, 5, "2"),
            )
        ])
    });

});

