import { tokenize } from './tokenizer';
import { parse } from './parser';
import { evaluate } from './evaluate';
import {
    ExpressionContext,
    Functions,
    Variables
} from './types';

export class Expression {

    public context: ExpressionContext = {
        variables: {},
        functions: {}
    }

    constructor(
        variables: Variables = {},
        functions: Functions = {}
    ) {
        this.addVariables(variables);
        this.addFunctions(functions);
    }

    evaluate(input: string): (number|undefined)[] {
        const tokens = tokenize(input);
        const asts = parse(tokens);
        return asts.map(a => evaluate(a, this.context));
    }

    addVariables(variables: Variables) {
        Object.assign(this.context.variables, variables);
    }

    addFunctions(functions: Functions) {
        Object.assign(this.context.functions, functions);
    }
}
