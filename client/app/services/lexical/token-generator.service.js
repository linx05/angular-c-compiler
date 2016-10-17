const TokenTypes = {
    KEYWORD : 'keyword',
    VARIABLE: 'variable'
};


class TokenGeneratorService {

    constructor (KEYWORDS) {
        this.keywords = KEYWORDS;
    }

    generateToken ({ lexeme,state,charNum,lineNum}) {
        let token = {
            lexeme,
            state,
            charNum,
            lineNum
        };
        if (state === 101) {
            token.type = TokenTypes.VARIABLE;
            if (this.keywords.includes(lexeme)) {
                token.type = TokenTypes.KEYWORD
            }
        }
        return token;
    }
}

TokenGeneratorService.$inject = ['KEYWORDS'];
export default TokenGeneratorService;
