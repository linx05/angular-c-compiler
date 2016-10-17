import angular from 'angular';
import storage from 'angular-storage';
import jwt from 'angular-jwt';

import ApiService from './api.service';
import AuthService from './auth.service';

const services = angular
	.module('app.services', [
		storage,
		jwt
	])
	.service({
		ApiService,
		AuthService
	})
	.name;

export default services;
