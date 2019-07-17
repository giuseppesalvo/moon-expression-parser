import {
    TokenType,
    getTokenType,
    Literal,
    Identifier,
    Token,
    CharToken,
    Operator,
    LeftParentesis,
    RightParentesis,
    Comment
} from './token';
import { peek } from './utils';

export function tokenize(input: string) {

    const tokens: Token[] = [];
    const value = input.split("");
    
    const state = {
        index: 0,
        length: value.length,
        value,
        token: [] as string[],
        eos: 0 >= value.length,
        char: value[0],
        type: getTokenType(value[0])
    };

    function next() {
        state.index += 1;
        state.eos = state.index >= value.length;
        state.char = value[state.index]
        state.type = getTokenType(value[state.index])
    }

    function goTo(index: number) {
        state.index = index;
        state.eos = index >= value.length;
        state.char = value[index]
        state.type = getTokenType(value[index])
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

        if ( state.type === TokenType.Comment ) {
            tokens.push(
                new Comment(
                    state.index,
                    input.length,
                    input.substr(state.index)
                )
            )
            goTo(value.length);
            return;
        }

        if ( state.type === TokenType.Literal ) {
            parseLiteral();
            return;
        }

        if ( state.type === TokenType.Identifier ) {
            parseIdentifier();
            return;
        }

        if ( state.type === TokenType.LeftParentesis ) {
                tokens.push(
                    new LeftParentesis(
                        state.index,
                        state.index+1,
                        state.char,
                    )
                )
                next();
                return;
        }

        if ( state.type === TokenType.RightParentesis ) {
            tokens.push(
                new RightParentesis(
                    state.index,
                    state.index+1,
                    state.char,
                )
            )
            next();
            return;
    }

        if ( state.type === TokenType.Comma ) {
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
            const prev = peek(tokens);
            tokens.push(
                new Operator(
                    state.index,
                    state.index+1,
                    state.char,
                    false,
                    !prev ||
                        ( prev.type === TokenType.Operator
                        || prev.type == TokenType.LeftParentesis
                        || prev.type == TokenType.Comma )
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
