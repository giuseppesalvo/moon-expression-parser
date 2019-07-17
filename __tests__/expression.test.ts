import {
    Expression,
    parse,
    tokenize
} from '../src';
import util from 'util';
import { ENumber } from '../src/types';

describe("expression", () => {
    it("1 + 2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + 2");
        expect(result).toEqual([{ value: 3 }]);
    })

    it("1 + --+2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + --+2");
        expect(result).toEqual([{ value: 3 }]);
    })

    it("1 + -+-2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + -+-2");
        expect(result).toEqual([{ value:  3 }]);
    })

    it("1 +-+-+-----+-+-+ 1 + (1+2+2 * -4^ 2) + -(1*-+-2)", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 +-+-+-----+-+-+ 1 + (1+2+2 * -4^ 2) + -(1*-+-2)");
        expect(result).toEqual([{ value: -31 }]);
    })

    it("1 +-+-+-----+-+-+ 1 + (1+2+2) + -(1*-+-2)", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 +-+-+-----+-+-+ 1 + (1+2+2) + -(1*-+-2)");
        expect(result).toEqual([{ value:  3 }]);
    })

    it("1 +-+-+-----+-+-+ 1 + (1+2+2)", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 +-+-+-----+-+-+ 1 + (1+2+2)");
        expect(result).toEqual([{ value:  5 }]);
    })

    it("1 + -6pow(2,2)", () => {
        const exp = new Expression({},{
            pow: (args: Array<ENumber>) => ({
                value: Math.pow(args[0].value as number, args[1].value as number)
            })
        });
        const result = exp.evaluate("1 + -6pow(2,2)");
        expect(result).toEqual([{ value: -23 }]);
    })
    
    it("sin(10) + 0.1 + PI", () => {

        const exp = new Expression(
            {
                "PI": {
                    value: Math.PI,
                }
            },
            {
                "sin": (args: Array<ENumber>) => ({
                    value: Math.sin(args[0].value as number)
                })
            }
        );

        const res = exp.evaluate("sin(10) + 0.1 + PI");

        expect(res).toEqual([{
            value: 2.697571542700423
        }]);
    })

    it("3 + 4 * 2 + ( 100 - ( 5 * 4 ^ 2 ) + 20 / 2 ) ^ 2 ^ 3", () => {

        const exp = new Expression();
        const result = exp.evaluate("3 + 4 * 2 + ( 100 - ( 5 * 4 ^ 2 ) + 20 / 2 ) ^ 2 ^ 3");

        expect(result)
        .toEqual([{ value: 656100000011 }]);
    })

    it("a + 2, a = 20, a * 2", () => {
        const exp = new Expression({
            "a": {
                value: 2
            }
        });
        const result = exp.evaluate("a + 2, a = 20, a * 2");
        expect(result).toEqual([
            { value: 4 },
            { value: 20 },
            { value: 40 },
        ]);
    })

    it("Context should persists during evaluations", () => {
        const exp = new Expression({
            "a": {
                value: 2
            }
        });
        const result1 = exp.evaluate("a + 2");
        const result2 = exp.evaluate("a = 10");
        const result3 = exp.evaluate("a * 3");
        expect(result1).toEqual([{ value: 4 }]);
        expect(result2).toEqual([{ value: 10 }]);
        expect(result3).toEqual([{ value: 30 }]);
    })

    it("3 + 4 * 2a2 + ( 100 - sin( 5 * 4 ^ a2 ) + 20 / 2 ) ^ 2", () => {

        const exp = new Expression(
            {
                "a2": { value: 2 }
            },
            {
                "sin": (args: Array<ENumber>) => ({
                    value: Math.sin(args[0].value as number)
                })
            }
        );
        const result = exp.evaluate("3 + 4 * 2a2 + ( 100 - sin( 5 * 4 ^ a2 ) + 20 / 2 ) ^ 2");

        expect(result)
        .toEqual([{ value: 12338.64331851954 }]);
    })

    it("multiple function arguments", () => {
        const exp = new Expression(
            {},
            {
                "pow": (args: Array<ENumber>) => ({
                    value: Math.pow(args[0].value as number, args[1].value as number)
                })
            }
        );
        const result = exp.evaluate("pow(1 + 2 * 4, 2)");

        expect(result)
        .toEqual([{ value: 81 }]);
    })

    it("2 * a = 3", () => {
        const exp = new Expression();
        const result = exp.evaluate("2 * a = 3");
        expect(result).toEqual([{ value: 6 }]);
    })

    it("2 ^ a = 3", () => {
        const exp = new Expression();
        const result = exp.evaluate("2 ^ a = 3");
        expect(result).toEqual([{ value: 8 }]);
    })

    it("hello man how are you", () => {
        const exp = new Expression();
        const result = exp.evaluate("hello man how are you");
        expect(result).toEqual([{ value: undefined }]);
    })

    it("negative exponents: 2 ^ -10", () => {
        const exp = new Expression();
        const result = exp.evaluate("2 ^ -10");
        expect(result).toEqual([{ value: 0.0009765625 }]);
    })

    it("negative power: -2 ^ 4", () => {
        const exp = new Expression();
        const result = exp.evaluate("-2 ^ 4");
        expect(result).toEqual([{ value:  -16 }]);
    })

    it("negative power with negative exp: -2 ^ -4", () => {
        const exp = new Expression();
        const result = exp.evaluate("-2 ^ -4");
        expect(result).toEqual([{ value:  -0.0625 }]);
    })

    it("4 times 2", () => {
        const exp = new Expression();
        const result = exp.evaluate("4 times 2");
        expect(result).toEqual([{ value:  8 }]);
    })

    it("20 of 150", () => {
        const exp = new Expression();
        const result = exp.evaluate("20 of 150");
        expect(result).toEqual([{ value:  30 }]);
    })

});
