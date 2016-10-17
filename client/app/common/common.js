import angular from 'angular';
import Header from './header';

let commonModule = angular.module('app.common', [
    Header
])
    .name;

export default commonModule;
