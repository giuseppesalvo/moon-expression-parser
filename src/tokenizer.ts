import {
    TokenType,
    getTokenType,
    Literal,
    Identifier,
    Token,
    CharToken,
    Operator,
    FunctionExpression,
} from './token';

export function tokenize(input: string) {

    const tokens: Token[] = [];
    const value = input.split("");
    
    const state = {
        index: 0,
        length: value.length,
        value,
        token: [] as string[],
        eos: false,
        char: value[0],
        type: getTokenType(value[0])
    };

    function next() {
        state.index += 1;
        state.eos = state.index === value.length;
        state.char = value[state.index]
        state.type = getTokenType(value[state.index])
    }

    function skipWhitespaces() {
        while ( state.type === TokenType.Whitespace && !state.eos ) {
            next()
        }
    }

    function checkTokenValidity() {
        if ( state.type === null ) {
            throw new Error(`Unable to tokenize: "${state.char}"`);
        }
    }

    function parseLiteral() {
        while ( state.type === TokenType.Literal && !state.eos ) {
            state.token.push(state.char);
            next();
        }
        if ( state.token.length > 0 ) {
            tokens.push(
                new Literal(
                    state.index - state.token.length,
                    state.index,
                    state.token.join("")
                )
            );
            state.token = [];
        }
    }

    function parseIdentifier() {
        while ( (state.type === TokenType.Identifier || state.type === TokenType.Literal) && !state.eos ) {
            state.token.push(state.char);
            next();
        }
        if ( state.token.length > 0 ) {
            tokens.push(
                new Identifier(
                    state.index - state.token.length,
                    state.index,
                    state.token.join("")
                )
            );
            state.token = [];
        }
    }

    function parseToken() {
        
        checkTokenValidity();

        skipWhitespaces();

        if ( state.type === TokenType.Literal ) {
            parseLiteral();
            return;
        }

        if ( state.type === TokenType.Identifier ) {
            parseIdentifier();
            return;
        }

        if ( state.type === TokenType.LeftParentesis
        || state.type === TokenType.RightParentesis
        || state.type === TokenType.Comma ) {
            tokens.push(
                new CharToken(
                    state.type,
                    state.index,
                    state.index+1,
                    state.char
                )
            )
            next();
            return;
        }

        if ( state.type === TokenType.Operator ) {
            tokens.push(
                new Operator(
                    state.index,
                    state.index+1,
                    state.char
                )
            )
            next();
            return;
        }
    }

    do {
        parseToken();
    } while ( !state.eos );
 
    return tokens;
};
