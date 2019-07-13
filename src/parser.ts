import { tokenize, Token, TokenType, AssocDir } from './tokenizer';
import { peek } from './utils'; 

class ASTNode {
    constructor(
        public token: Token,
        public rightChild: ASTNode,
        public leftChild: ASTNode
    ) {}
}

export function parse(input: string): Token[] {
    const outQueue: Token[] = [];
    const opStack: Token[] = [];
    const tokens = tokenize(input);

    //console.log("Parsing: " + input);

    tokens.forEach((token, i) => {

        if ( token.type === TokenType.Literal
        ||   token.type === TokenType.Variable ) {
            outQueue.push(token);
        }

        if ( token.type === TokenType.Function ) {
            opStack.push(token);
        }

        if ( token.type === TokenType.Comma ) {
            let stackTop = peek(opStack);
            while ( stackTop.type !== TokenType.LeftParentesis
                  && opStack.length > 0 ) {
                outQueue.push(
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
                outQueue.push(
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
                outQueue.push(
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
/*
        console.log(
            "iteration: " + i + "\n" +
            `token: ${token.value}, ${token.type}` + "\n" +
            "operatorsStack: " + opStack.map(v => v.value).toString() + "\n" +
            "outputQueue: " + outQueue.map(v => v.value).toString()
        );
        */
    })

    return outQueue.concat(opStack.reverse());
}
