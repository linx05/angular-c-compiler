import angular from 'angular';
import Home from './home';

let componentModule = angular.module('app.components', [
    Home
])
    .name;

export default componentModule;
