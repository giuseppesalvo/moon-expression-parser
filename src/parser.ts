import { tokenize, Token, TokenType, AssocDir } from './tokenizer';
import { peek } from './utils'; 

class ASTNode<T> {
    constructor(
        public value: T,
        public leftChildNode?: ASTNode<T> | undefined,
        public rightChildNode?: ASTNode<T> | undefined,
    ) {}

    toString(count = 1): string {
        if (!this.leftChildNode && !this.rightChildNode)
            return this.value + " =>null\n" + Array(count + 1).join(" ") + "=>null";
        const left: string = this.leftChildNode ? this.leftChildNode.toString(count+1) : "";
        const right: string = this.rightChildNode ? this.rightChildNode.toString(count+1) : "";
        return this.value + " =>" + left + "\n" + Array(count).join(" ") + "=>" + right;
    }
}

class AST<T> {

    public nodes: Array<ASTNode<T>> = []

    addNode(value: T): void {
        const leftChildNode = this.nodes.pop();
        const rightChildNode = this.nodes.pop();
        this.nodes.push(
            new ASTNode(
                value,
                leftChildNode,
                rightChildNode,
            )
        )
    }

    push(value: T) {
        this.nodes.push(
            new ASTNode(
                value,
            )
        )
    }

    toString(): String {
        //a little hack I put together so it prints out in a readable formASTNode.prototype.toString = function(count) {
        return this.nodes.toString();
    }
}

export function parse(input: string): AST<Token> {
    
    const outStack: AST<Token> = new AST<Token>();
    const opStack: Array<Token> = new Array();
    
    const tokens = tokenize(input);

    //console.log("Parsing: " + input);

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
/*
        console.log(
            "iteration: " + i + "\n" +
            `token: ${token.value}, ${token.type}` + "\n" +
            "operatorsStack: " + opStack.map(v => v.value).toString() + "\n" +
            "outputQueue: " + outQueue.map(v => v.value).toString()
        );
        */
    })

    while ( outStack && opStack.length > 0 ) {
        outStack.addNode(
            opStack.pop() as Token
        )
    }

    return outStack;
}

console.log(parse("1+2").toString())
