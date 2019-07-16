import {
    expression
} from '../src/index';

describe("expression", () => {

    it("1 + 2", () => {
        const result = expression("1 + 2");
        expect(result).toEqual([ 3 ]);
    })

});
