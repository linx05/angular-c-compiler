import StateLexerService from './state-lexer.service';
import TokenGeneratorService from './token-generator.service';
import LexicalAnalysisService from './lexical-analysis.service';
import config from './lexical.config';
const services = angular
.module('app.services.lexical', [
    'app.services.constants'
])
.service({
    LexicalAnalysisService,
    StateLexerService,
    TokenGeneratorService
})
.run(config.LexicalConfig)
    .name;

export default services;
