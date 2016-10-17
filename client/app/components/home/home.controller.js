class HomeController {
    constructor (LexicalAnalyzer, StateLexer) {
        this.lexical = LexicalAnalyzer;
        this.state = StateLexer;


        this.name = 'home';
    }

    analize () {
        this.lexical.generateTokens(this.text)
        .then((tokens)=> {
            console.log(tokens);
        })
        .catch((err)=> {
            console.log(err);
        })
    }
}
HomeController.$inject = ['LexicalAnalysisService', 'StateLexerService'];
export default HomeController;
