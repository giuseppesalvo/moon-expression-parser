import { evaluate, parse, evaluateWithOptions} from '../src/index';

describe("evaluator", () => {

    it("1 + 2", () => {

        const result = evaluate("1 + 2");

        expect(result)
        .toEqual(3);

    })

    it("1 + 2 + 5", () => {

        const result = evaluate("1 + 2 + 5");

        expect(result)
        .toEqual(8);

    })

    it("1 + 4 - 5", () => {

        const result = evaluate("1 + 4 - 5");

        expect(result)
        .toEqual(0);

    })

    it("1 + 4 * 5", () => {

        const result = evaluate("1 + 4 * 5");

        expect(result)
        .toEqual(21);

    })

    it("1 + ( 4 * 5 ) / 2", () => {

        const result = evaluate("1 + ( 4 * 5 ) / 2");

        expect(result)
        .toEqual(11);

    })

    it("3 + 4 * 2 / ( 6 - 5 ) ^ 2 ^ 3", () => {

        const result = evaluate("3 + 4 * 2 / ( 6 - 5 ) ^ 2 ^ 3");

        expect(result)
        .toEqual(11);

    })

    it("3 + 4 * 2 + ( 100 - ( 5 * 4 ^ 2 ) + 20 / 2 ) ^ 2 ^ 3", () => {

        const result = evaluate("3 + 4 * 2 + ( 100 - ( 5 * 4 ^ 2 ) + 20 / 2 ) ^ 2 ^ 3");

        expect(result)
        .toEqual(656100000011);

    })

    it("5.07 + 40.1 * ( 20.5 / 2.1 )", () => {

        const result = evaluate("5.07 + 40.1 * ( 20.5 / 2.1 )");

        expect(result)
        .toEqual(396.5223809523809);

    });

    it("4 = 5", () => {

        const result = evaluate("4 = 5 + 5");

        expect(result)
        .toEqual(10);

    });

    it("4 + ( 10 = 5 )", () => {

        const result = evaluate("4 + ( 10 = 5 )");

        console.log('assignment: ', result)

        expect(result)
        .toEqual(9);
    });

});
