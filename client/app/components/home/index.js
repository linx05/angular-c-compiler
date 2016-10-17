import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
    uiRouter,
    'app.services.lexical',
    'app.services.constants',
    'app.services'
])

.component('home', homeComponent)
.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state('home', {
        url      : '',
        component: 'home'
    });
})
    .name;

export default homeModule;
