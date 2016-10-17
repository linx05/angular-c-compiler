//const readline = require('linebyline');
const Readable = require('stream').Readable;

class LexicalAnalysisService {

    constructor ($q, states, tokenGenerator) {
        this.q = $q;
        this.states = states;
        this.tokenGenerator = tokenGenerator;

        this.state = 0;
        this.lexeme = '';
        this.tokens = [];
        this.line = 0;
        this.char = 0;
    }

    generateTokens (text) {
        let analyzer = new LexicalAnalysisService(this.q, this.states, this.tokenGenerator);
        return analyzer._generateTokens(text);
    }


    _analyzeState (char, lineNum, charNum) {
        //TODO: RETURN THE STATE AND IF IT RETURNS A TOKEN GENERATE TOKEN
        //PASS TOKEN THROUGH RULE ANALYSIS
        //this.lexeme += char;
        //if (char === 'EOF') console.log('found EOF!', char, lineNum, charNum,this.state);

        let result = this.states.evaluate(this.state, char);
        if (!result) {
            return;
        }
        if (result.type === this.states.StateTypes.ACCEPTING) {
            this.lexeme += char;
            this.state = 0;
            if (result.otherChar) {
                this.lexeme = this.lexeme.slice(0, -1);
            }
            this.tokens.push(this._generateToken(this.lexeme.trim(), result.value, lineNum, charNum));
            this.lexeme = '';
            if (result.otherChar) {
                return this._analyzeState(char, lineNum, charNum);
            }
        }
        else if (result.type === this.states.StateTypes.COMMENTARY) {
            this.state = 0;
            this.lexeme = '';
        }
        else if (result.type === this.states.StateTypes.TRANSITION) {
            this.lexeme += char;
            this.state = result.value;
        }
        else if (result.type === this.states.StateTypes.ERROR) {
            console.log(`lexical error: unexpected character ${char} at ${lineNum}:${charNum}`, result, this.state);
            this.state = 0;
            return {
                error: {
                    type: 'lexical',
                    line: lineNum,
                    num : charNum,
                    char
                }
            };
        }
    }

    _generateTokens (text) {
        this.error = false;
        let deferred = this.q.defer();
        let lineNum = 0;
        let charNum = 0;

        _.forEach(text.split("\n"), (line) => {
            if (lineNum != 0) {
                this._analyzeState('\n', lineNum, charNum + 1)
            }
            lineNum += 1;
            charNum = 1;
            _.forEach(line, (char) => {
                charNum += 1;
                let result = this._analyzeState(char, lineNum, charNum);
                if (result && result.hasOwnProperty('error')) {
                    this.error = true;
                    deferred.reject(result.error);
                    return false;
                }
            });
            if (this.error === true) return false;
        });

        if (!this.error) {
            let result = this._analyzeState('EOF', 0, 0);
            if (result && result.hasOwnProperty('error')) {
                deferred.reject(result.error);
            }
            else deferred.resolve(this.tokens);
        }
        return deferred.promise;
    }

    _generateToken (lexeme, state, charNum, lineNum) {
        return this.tokenGenerator.generateToken({
            lexeme,
            state,
            charNum,
            lineNum
        });
    }
}

LexicalAnalysisService.$inject = ['$q', 'StateLexerService', 'TokenGeneratorService'];
export default LexicalAnalysisService;

