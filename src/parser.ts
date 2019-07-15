import { tokenize, Token, TokenType, AssocDir, AST } from '../src';
import { peek } from './utils'; 
import { BinaryExpression } from './token';

export function parse(input: string): AST<Token> {
    
    const outAst: AST<Token> = new AST<Token>();
    const opStack: Array<Token> = new Array();
    
    const tokens = tokenize(input);

    const state = {
        index: 0,
        finish: false,
        token: tokens[0]
    }

    function next() {
        state.index += 1;
        state.token = tokens[state.index];
        state.finish = state.index === tokens.length;
    }

    function prevToken() {
        return tokens[state.index - 1];
    }

    function nextToken() {
        return tokens[state.index + 1];
    }

    function parseAst() {

        if ( state.token.type === TokenType.Operator ) {
            
            outAst.addNode(
                BinaryExpression(
                    
                )
            )

        }

    }

    do {

        parseAst();

    } while ( state.index < tokens.length );

    return outAst;
}
