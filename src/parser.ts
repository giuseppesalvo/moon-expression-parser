import { tokenize, Token, TokenType, AssocDir, AST } from '../src';
import { peek } from './utils'; 
import { BinaryExpression, FunctionExpression, Identifier, LeftParentesis, Operator } from './token';

export function parse(
    tokens: Token[],
): Token[][] {
    
    const outputAsts: Token[][] = []

    let outAst: Token[] = [];
    let opStack: Token[] = [];

    const state = {
        index: 0,
        end: 0 >= tokens.length,
        token: tokens[0],
    }

    if ( state.end ) {
        return [];
    }

    function next() {
        state.index += 1;
        state.token = tokens[state.index];
        state.end = state.index === tokens.length;
    }

    function goTo(index: number) {
        state.index = index;
        state.token = tokens[index];
        state.end = index >= tokens.length;
    }

    function prevToken() {
        return tokens[state.index - 1];
    }

    function nextToken() {
        return tokens[state.index + 1];
    }

    function parseFunction() {
        const identifier = state.token;
        const nextT = nextToken() as LeftParentesis;
        const argsTokens = tokens.slice(
            state.index+1,
            nextT.endIndex
        );
        const fn = new FunctionExpression(
            identifier.start,
            nextT.endIndex+1,
            identifier as Identifier,
            parse(argsTokens),
        );
        opStack.push(fn);
        goTo(nextT.endIndex+1);
    }

    function closeAst() {
        while ( opStack.length > 0 ) {
            let top = opStack.pop() as Operator|FunctionExpression; // It will never be undefined
            if ( top.type === TokenType.Operator ) {
                const right = outAst.pop() as Token;
                const left = outAst.pop() as Token;
                outAst.push(
                    new BinaryExpression(
                        -1, -1, top as Operator, right, left,
                    )
                )
            } else if ( top.type === TokenType.FunctionExpression ) {
                outAst.push(
                    top
                )
            }
        }
        outputAsts.push(
            outAst
        );
        outAst = [];
        opStack = [];
    }

    function parseAst() {

        if ( state.token.type === TokenType.Comma ) {
            closeAst();
            next();
            return;
        }

        if ( state.token.type === TokenType.Literal ) {
            outAst.push(
                state.token
            );
            next();
            return;
        }

        if ( state.token.type === TokenType.Identifier ) {
            const nextT = nextToken();
            if ( nextT.type === TokenType.LeftParentesis ) {
                parseFunction();
                return;
            }
            outAst.push(
                state.token
            );
            next();
            return;
        }

        if ( state.token.type === TokenType.Operator ) {
            let o = peek(opStack);
            const token = state.token;
            while (
                o &&
                (o.type === TokenType.FunctionExpression
                || (o.type === TokenType.Operator && (o as Operator).precedence() > (token as Operator).precedence())
                || o.type === TokenType.Operator && (o as Operator).precedence() === (token as Operator).precedence() && (o as Operator).associativity() === AssocDir.left )
            ) {
                const right = outAst.pop();
                const left = outAst.pop();
                outAst.push(
                    new BinaryExpression(
                        -1,-1, o as Operator, right, left,
                    )
                )
                opStack.pop();
                o = peek(opStack);
            }
            opStack.push(
                token
            );
            next();
            return;
        } 

        if ( state.token.type === TokenType.LeftParentesis ) {
            opStack.push(
                state.token
            );
            next();
            return;
        }

        if ( state.token.type === TokenType.RightParentesis ) {
            let op = peek(opStack);
            while ( op.type !== TokenType.LeftParentesis ) {
                const right = outAst.pop();
                const left = outAst.pop();
                outAst.push(
                    new BinaryExpression(
                        -1,-1, op as Operator, right, left,
                    )
                )
                opStack.pop()
                op = peek(opStack);
            }

            if ( op.type === TokenType.LeftParentesis ) {
                opStack.pop()
            } else {
                throw new Error('Mismatched parentesis');
            }
            next();
            return;
        }

    }

    do {

        parseAst();

    } while ( !state.end );

    closeAst();

    return outputAsts;
}
