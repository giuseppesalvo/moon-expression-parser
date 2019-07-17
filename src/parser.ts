import { Token, TokenType, AssocDir } from '../src';
import { peek } from './utils'; 
import {
    BinaryExpression,
    FunctionExpression,
    Identifier,
    Operator,
    UnaryExpression
} from './token';

export function parse(
    tokens: Token[],
): Token[] {
    
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
        state.end = state.index >= tokens.length;
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

    function findRightParentesisIndex(leftParentesisIndex: number): number {
        let index = leftParentesisIndex;
        let deep = 0;
        while ( index < tokens.length ) {

            const token = tokens[index];
            
            if ( token.type === TokenType.LeftParentesis ) {
                deep += 1;
            }
            if ( token.type === TokenType.RightParentesis ) {
                deep -= 1;
            }

            if ( deep === 0 ) {
                return index;
            }

            index += 1;
        }

        return -1;
    }

    function parseFunction() {
        const identifier = state.token;
        const rightIndex = findRightParentesisIndex(state.index+1);

        if ( rightIndex < 0 ) {
            throw new Error('Mismatched parentesis');
        }

        const argsTokens = tokens.slice(
            state.index+2,
            rightIndex
        );
        const fn = new FunctionExpression(
            identifier.start,
            tokens[rightIndex].end+1,
            identifier as Identifier,
            parse(argsTokens),
        );
        opStack.push(fn);
        goTo(rightIndex+1);
    }

    function addExpression(operator: Operator) {

        if ( operator.unary ) {
            const right = outAst.pop() as Token
            outAst.push(
                new UnaryExpression(
                    operator.start, right.end, operator, right,
                )
            )
        } else {
            const right = outAst.pop() as Token
            const left = outAst.pop() as Token
            outAst.push(
                new BinaryExpression(
                    left.start, right.end, operator, left, right,
                )
            )
        }
    }

    function closeAst() {
        while ( opStack.length > 0 ) {
            let top = opStack.pop() as Operator|FunctionExpression; // It will be never undefined
            if ( top.type === TokenType.Operator ) {
                addExpression(
                    top as Operator,
                )
            } else if ( top.type === TokenType.FunctionExpression ) {
                outAst.push(
                    top
                )
            }
        }
        if ( outAst.length > 0 ) {
            outputAsts.push(
                outAst
            );
        }
        outAst = [];
        opStack = [];
    }

    function parseAst() {

        if ( state.token.type === TokenType.Comment ) {
            goTo(tokens.length);
            closeAst();
            return;
        }

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
            
            // Checking for implicit multiplication between literals and identifiers
            const prevT = prevToken();
            if ( prevT && prevT.type === TokenType.Literal ) {
                opStack.push(
                    new Operator(
                        prevT.start, state.token.end, "*", true
                    )
                )
            }

            // Function check
            const nextT = nextToken();
            if ( nextT && nextT.type === TokenType.LeftParentesis ) {
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
                || o.type === TokenType.Operator && (o as Operator).precedence() === (token as Operator).precedence() && (o as Operator).associativity() === AssocDir.left && !(o as Operator).unary )
            ) {
                if ( o.type === TokenType.Operator ) {
                    addExpression(
                        o as Operator,
                    )
                } else if ( o.type === TokenType.FunctionExpression ) {
                    outAst.push(
                        o
                    )
                }
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
            while ( op && op.type !== TokenType.LeftParentesis ) {
                if ( op.type === TokenType.Operator ) {
                    addExpression(
                        op as Operator,
                    )
                } else if ( op.type === TokenType.FunctionExpression ) {
                    outAst.push(
                        op
                    )
                }
                opStack.pop();
                op = peek(opStack);
            }

            if ( op && op.type === TokenType.LeftParentesis ) {
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

    // Returning heads only
    return outputAsts.map(v => v[0]);
}
