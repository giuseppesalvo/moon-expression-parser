import {
    Expression
} from '../src/index';

describe("expression", () => {

    it("1 + 2", () => {
        const exp = new Expression();
        const result = exp.evaluate("1 + 2");
        expect(result).toEqual([ 3 ]);
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

});
