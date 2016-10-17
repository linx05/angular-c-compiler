import alphabet from './alphabet.constants';
import keywords from './keywords.constants';
import states from './states.constants';

const services = angular
.module('app.services.constants', [])
.constant('ALPHABET', alphabet)
.constant('KEYWORDS', keywords)
.constant('STATES', states)
    .name;

export default services;
