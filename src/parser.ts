import { tokenize, Token, TokenType, AssocDir, AST } from '../src';
import { peek } from './utils'; 

export function parse(input: string): AST<Token> {
    
    const outStack: AST<Token> = new AST<Token>();
    const opStack: Array<Token> = new Array();
    
    const tokens = tokenize(input);

    tokens.forEach((token, i) => {

        if ( token.type === TokenType.Literal
        ||   token.type === TokenType.Variable ) {
            outStack.push(
                token,
            )
        }

        if ( token.type === TokenType.Function ) {
            opStack.push(token);
        }

        if ( token.type === TokenType.Comma ) {
            let stackTop = peek(opStack);
            while ( stackTop.type !== TokenType.LeftParentesis
                  && opStack.length > 0 ) {
                outStack.addNode(
                    opStack.pop() as Token
                );
                let stackTop = peek(opStack);
            }
        }

        if ( token.type === TokenType.Operator ) {

            let o = peek(opStack)
            while (
                o &&
                (o.type === TokenType.Function
                || (o.type === TokenType.Operator && o.precedence() > token.precedence())
                || o.type === TokenType.Operator && o.precedence() === token.precedence() && o.associativity() === AssocDir.left )
                //&& o.type !== TokenType.LeftParentesis
            ) {
                outStack.addNode(
                    opStack.pop() as Token
                );
                o = peek(opStack)
            }

            opStack.push(token)
        }

        if ( token.type === TokenType.LeftParentesis ) {
            opStack.push(token);
        }

        if ( token.type === TokenType.RightParentesis ) {
            let stackTop = peek(opStack);
            while ( stackTop && stackTop.type !== TokenType.LeftParentesis ) {
                outStack.addNode(
                    opStack.pop() as Token
                );
                stackTop = peek(opStack);
            }

            if ( !stackTop ) {
                throw new Error("Mismatched parentesis");
            }

            if ( stackTop.type === TokenType.LeftParentesis ) {
                opStack.pop();
            }
        }
    })

    while ( outStack && opStack.length > 0 ) {
        outStack.addNode(
            opStack.pop() as Token
        )
    }

    return outStack;
}
