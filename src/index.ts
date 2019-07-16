export * from './token';
export * from './tokenizer';
export * from './parser';

import { tokenize } from './tokenizer';
import { parse } from './parser';
import util from 'util';

/*
export * from './parser';
export * from './evaluate';
*/

export function compile(input: string) {
    const tokens = tokenize(input);
    const ast = parse(tokens);
    return ast;
}
