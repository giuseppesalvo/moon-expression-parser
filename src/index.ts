export * from './token';
export * from './tokenizer';
export * from './parser';
export * from './evaluate';
export * from './expression';

import { parse } from './parser';
import { tokenize } from './tokenizer';
import { Expression } from './expression';

const exp = new Expression();
const v = "1+-+-2";
const result = exp.evaluate(v);
const asts = parse(tokenize(v));
console.log(result);
