import { ASTNode, AST } from './ast';
import { Token, TokenType } from './token';
import { parse } from './parser';

export function evaluateNode(node?: ASTNode<Token>): number {
    
    if ( !node ) {
        throw new Error("Null node")
    }

    if ( node.value.type === TokenType.Literal ) {
        return parseFloat(node.value.value);
    } else {
        const left = evaluateNode(node.leftChildNode);
        const right = evaluateNode(node.rightChildNode);
        
        switch(node.value.value) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            case "^": return left ** right;
        }
    }

    throw new Error("Incorrect three");
}

export function evaluateAST(ast: AST<Token>): number {
    return evaluateNode(ast.head());
}

export function evaluate(input: string): number {
    const ast = parse(input);
    return evaluateAST(ast);
}

interface EvaluationOptions {
    variables?: Record<string, string|number>,
}

export function evaluateWithOptions(input: string, options: EvaluationOptions = {}): number {
    
    let newInput = input

    const variables = options.variables || []

    const ast = parse(newInput);
    return evaluateAST(ast);
}
