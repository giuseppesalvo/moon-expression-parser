import { tokenize } from './tokenizer';
import { parse } from './parser';
import { evaluate } from './evaluate';

interface Options {
    variables?: Record<string, number>
    functions: Record<string, (args: number[]) => number[]>
}

export function expression(input: string, options?: Options): (number|undefined)[] {
    const tokens = tokenize(input);
    const asts = parse(tokens);
    return asts.map(a => evaluate(a));
}

console.log(
    "result: ", expression("1 + 2, 1 # ciao uomo come stai")
);
