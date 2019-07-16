export type Variables = Record<string, number|undefined>;
export type Functions = Record<string, (args: Array<number|undefined>) => number|undefined>;

export interface ExpressionContext {
    variables: Variables
    functions: Functions;
}
