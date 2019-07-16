import {
    Token,
    TokenType,
    Literal,
    BinaryExpression,
    FunctionExpression,
    Identifier
} from './token';
import { parse } from './parser';

const variables: Record<string,number|undefined> = {
    "PI": Math.PI
};

export function evaluateNode(node: Token): number|undefined {

    if ( !node ) {
        return;
    }

    if ( node.type === TokenType.Literal ) {
        return (node as Literal).value;
    } else if ( node.type === TokenType.BinaryExpression )  {

        const exp = node as BinaryExpression;

        const left = evaluateNode(exp.left);
        const right = evaluateNode(exp.right);

        console.log(left, right)

        if ( typeof left === "undefined" && exp.operator.value === "=" ) {
            if ( exp.left.type === TokenType.Identifier ) {
                const identifier = exp.left as Identifier;
                variables[identifier.name] = right;
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
                    variables[identifier.name] = right;
                }
                return right;
            };
        }
    } else if ( node.type === TokenType.FunctionExpression ) {
        const fn = node as FunctionExpression;
        const args = fn.args.map(arg => evaluateNode(arg));
        const M = Math as any;
        return M[fn.callee.name](...args);
    } else if ( node.type === TokenType.Identifier ) {
        const identifier = node as Identifier;
        return variables[identifier.name];
    }
}

export function evaluate(head: Token): number|undefined {
    return evaluateNode(head);
}
