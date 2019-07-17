import {
    Token,
    TokenType,
    Literal,
    BinaryExpression,
    FunctionExpression,
    Identifier,
    UnaryExpression,
} from './token';
import {
    ENumber,
    ExpressionContext
} from './types';

export function evaluateNode(node: Token|undefined, ctx: ExpressionContext): ENumber {

    if ( !node ) {
        return {
            value: undefined
        }
    }

    if ( node.type === TokenType.Literal ) {
        const literal = (node as Literal);
        return {
            value: literal.value,
            unit: literal.unit
        };
    } else if ( node.type === TokenType.UnaryExpression ) {

        const exp = node as UnaryExpression;
        const arg = evaluateNode(exp.argument, ctx);

        if ( typeof arg.value === "undefined" ) {
            return arg;
        }

        switch(exp.operator.value) {
            case "+": return arg;
            case "-": return {
                value: -arg.value,
            };
        }

    } else if ( node.type === TokenType.BinaryExpression )  {

        const exp = node as BinaryExpression;

        const left = evaluateNode(exp.left, ctx);
        const right = evaluateNode(exp.right, ctx);

        if ( typeof left.value === "undefined" && exp.operator.value === "=" ) {
            if ( exp.left.type === TokenType.Identifier ) {
                const identifier = exp.left as Identifier;
                ctx.variables[identifier.name] = right;
            }
            return right;
        }

        if ( typeof left.value === "undefined" )
            return right;

        if ( typeof right.value === "undefined" && exp.operator.value === "=" )
            return right;

        if ( typeof right.value === "undefined" ) {
            return left;
        }
        
        switch(exp.operator.value) {
            case "+": return {
                value: left.value + right.value,
            }
            case "-": return {
                value: left.value - right.value,
            }
            case "*": return {
                value: left.value * right.value,
            }
            case "times": return {
                value: left.value * right.value
            }
            case "of": return {
                value: left.value * (right.value/100)
            }
            case "/": return {
                value: left.value / right.value
            }
            case "^": return {
                value: left.value ** right.value
            }
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
            return {
                value: undefined
            }
        }
    } else if ( node.type === TokenType.Identifier ) {
        const identifier = node as Identifier;
        if ( ctx.variables.hasOwnProperty(identifier.name) ) {
            return ctx.variables[identifier.name];
        } else {
            return { value: undefined }
        }
    }

    return {
        value: undefined,
    };
}

export function evaluate(head: Token, context: ExpressionContext): ENumber {
    return evaluateNode(head, context);
}
