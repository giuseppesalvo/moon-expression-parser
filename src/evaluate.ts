import {
    Token,
    TokenType,
    Literal,
    BinaryExpression,
    FunctionExpression,
    Identifier,
    UnaryExpression
} from './token';
import {
    ExpressionContext
} from './types';

export function evaluateNode(node: Token, ctx: ExpressionContext): number|undefined {

    if ( !node ) {
        return;
    }

    if ( node.type === TokenType.Literal ) {
        return (node as Literal).value;
    } else if ( node.type === TokenType.UnaryExpression ) {

        const exp = node as UnaryExpression;
        const arg = evaluateNode(exp.argument, ctx);

        if ( typeof arg === "undefined" ) {
            return;
        }

        switch(exp.operator.value) {
            case "+": return arg;
            case "-": return -arg;
        }

    } else if ( node.type === TokenType.BinaryExpression )  {

        const exp = node as BinaryExpression;

        const left = evaluateNode(exp.left, ctx);
        const right = evaluateNode(exp.right, ctx);

        if ( typeof left === "undefined" && exp.operator.value === "=" ) {
            if ( exp.left.type === TokenType.Identifier ) {
                const identifier = exp.left as Identifier;
                ctx.variables[identifier.name] = right;
            }
            return right;
        }

        if ( typeof left === "undefined" )
            return right;

        if ( typeof right === "undefined" && exp.operator.value === "=" )
            return;

        if ( typeof right === "undefined" ) {
            return left;
        }
        
        switch(exp.operator.value) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            case "^": return left ** right;
            case "=": {
                if ( exp.left.type === TokenType.Identifier ) {
                    const identifier = exp.left as Identifier;
                    ctx.variables[identifier.name] = right;
                }
                return right;
            };
        }
    } else if ( node.type === TokenType.FunctionExpression ) {
        const fn = node as FunctionExpression;
        if ( ctx.functions.hasOwnProperty(fn.callee.name) ) {
            const args = fn.args.map(arg => evaluateNode(arg, ctx));
            return ctx.functions[fn.callee.name](args);
        } else {
            return;
        }
    } else if ( node.type === TokenType.Identifier ) {
        const identifier = node as Identifier;
        return ctx.variables[identifier.name];
    }
}

export function evaluate(head: Token, context: ExpressionContext): number|undefined {
    return evaluateNode(head, context);
}
