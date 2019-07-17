import {
    Expression,
    parse,
    tokenize
} from '../src';
import util from 'util';

describe("expression", () => {
    it("1 + 2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + 2");
        expect(result).toEqual([ 3 ]);
    })

    it("1 + --+2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + --+2");
        expect(result).toEqual([ 3 ]);
    })

    it("1 + -+-2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + -+-2");
        expect(result).toEqual([ 3 ]);
    })

    it("1 +-+-+-----+-+-+ 1 + (1+2+2 * -4^ 2) + -(1*-+-2)", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 +-+-+-----+-+-+ 1 + (1+2+2 * -4^ 2) + -(1*-+-2)");
        expect(result).toEqual([ -31 ]);
    })

    it("1 +-+-+-----+-+-+ 1 + (1+2+2) + -(1*-+-2)", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 +-+-+-----+-+-+ 1 + (1+2+2) + -(1*-+-2)");
        expect(result).toEqual([ 3 ]);
    })

    it("1 +-+-+-----+-+-+ 1 + (1+2+2)", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 +-+-+-----+-+-+ 1 + (1+2+2)");
        expect(result).toEqual([ 5 ]);
    })

    it("1 + -6pow(2,2)", () => {
        const exp = new Expression({},{
            pow: (args: Array<number|undefined>) => Math.pow(args[0] as number, args[1] as number)
        });
        const result = exp.evaluate("1 + -6pow(2,2)");
        expect(result).toEqual([ -23 ]);
    })
    
    it("sin(10) + 0.1 + PI", () => {

        const exp = new Expression(
            {
                "PI": Math.PI
            },
            {
                "sin": (args: Array<number|undefined>) =>  Math.sin(args[0] as number)
            }
        );

        const res = exp.evaluate("sin(10) + 0.1 + PI");

        expect(res).toEqual([
            2.697571542700423
        ]);
    })

    it("3 + 4 * 2 + ( 100 - ( 5 * 4 ^ 2 ) + 20 / 2 ) ^ 2 ^ 3", () => {

        const exp = new Expression();
        const result = exp.evaluate("3 + 4 * 2 + ( 100 - ( 5 * 4 ^ 2 ) + 20 / 2 ) ^ 2 ^ 3");

        expect(result)
        .toEqual([656100000011]);
    });

    it("a + 2, a = 20, a * 2", () => {
        const exp = new Expression({
            "a": 2
        });
        const result = exp.evaluate("a + 2, a = 20, a * 2");
        expect(result).toEqual([ 4, 20, 40 ]);
    });

    it("Context should persists during evaluations", () => {
        const exp = new Expression({
            "a": 2
        });
        const result1 = exp.evaluate("a + 2");
        const result2 = exp.evaluate("a = 10");
        const result3 = exp.evaluate("a * 3");
        expect(result1).toEqual([ 4 ]);
        expect(result2).toEqual([ 10 ]);
        expect(result3).toEqual([ 30 ]);
    });

    it("3 + 4 * 2a2 + ( 100 - sin( 5 * 4 ^ a2 ) + 20 / 2 ) ^ 2", () => {

        const exp = new Expression(
            {
                "a2": 2
            },
            {
                "sin": (args: Array<number|undefined>) =>  Math.sin(args[0] as number)
            }
        );
        const result = exp.evaluate("3 + 4 * 2a2 + ( 100 - sin( 5 * 4 ^ a2 ) + 20 / 2 ) ^ 2");

        expect(result)
        .toEqual([12338.64331851954]);
    });

    it("multiple function arguments", () => {
        const exp = new Expression(
            {},
            {
                "pow": (args: Array<number|undefined>) =>  Math.pow(args[0] as number, args[1] as number)
            }
        );
        const result = exp.evaluate("pow(1 + 2 * 4, 2)");

        expect(result)
        .toEqual([81]);
    })

    it("2 * a = 3", () => {
        const exp = new Expression();
        const result = exp.evaluate("2 * a = 3");
        expect(result).toEqual([ 6 ]);
    })

    it("2 ^ a = 3", () => {
        const exp = new Expression();
        const result = exp.evaluate("2 ^ a = 3");
        expect(result).toEqual([ 8 ]);
    })

    it("hello man how are you", () => {
        const exp = new Expression();
        const result = exp.evaluate("hello man how are you");
        expect(result).toEqual([ undefined ]);
    })

    it("negative exponents: 2 ^ -10", () => {
        const exp = new Expression();
        const result = exp.evaluate("2 ^ -10");
        expect(result).toEqual([ 0.0009765625 ]);
    })

    it("negative power: -2 ^ 4", () => {
        const exp = new Expression();
        const result = exp.evaluate("-2 ^ 4");
        expect(result).toEqual([ -16 ]);
    })

    it("negative power with negative exp: -2 ^ -4", () => {
        const exp = new Expression();
        const result = exp.evaluate("-2 ^ -4");
        expect(result).toEqual([ -0.0625 ]);
    })

});
