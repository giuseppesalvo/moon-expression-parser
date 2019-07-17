import {
    Unit
} from './token'

export type ENumber = {
    value: number|undefined,
    unit?: string
}
export type Variables = Record<string, ENumber>;
export type Functions = Record<string, (args: Array<ENumber>) => ENumber>;

export interface ExpressionContext {
    variables: Variables
    functions: Functions;
}
