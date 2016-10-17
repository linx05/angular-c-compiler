const routes = {
    token  : 'auth/token',
    refresh: 'auth/refresh',
    logout : 'auth/logout'
};

let apiService, jwt, localStorage;

class AuthService {

    constructor(ApiService, jwtHelper, store) {
        apiService = ApiService;
        jwt = jwtHelper;
        localStorage = store;
    }

    login(name, password) {
        return apiService.httpPost(routes.token, {login: name, password: password})
            .then((data) => localStorage.set('jwt', data.token))
            .catch(apiService.requestFailed.bind(apiService));
    }

    logout() {
        return localStorage.remove('jwt');
    }

    refresh() {
        return apiService.httpGet(routes.refresh)
            .then((data) => localStorage.set('jwt', data.token))
            .catch(apiService.requestFailed.bind(apiService));
    }

    getId() {
        const token = this.getToken();
        return token ? jwt.decodeToken(token).id : null;
    }

    getToken() {
        return localStorage.get('jwt');
    }

    getLoginLevel() {
        const token = this.getToken();
        return token ? jwt.decodeToken(token).level : null;
    }

    getLoginName() {
        const token = this.getToken();
        return token ? jwt.decodeToken(token).name : null;
    }

    isLogged() {
        const token = this.getToken();
        return token ? true : false;
    }

    isAdmin() {
        return this.getLoginLevel() === 'admin';
    }

    isEmployee() {
        return this.getLoginLevel() === 'employee';
    }

    isUser() {
        return this.getLoginLevel() === 'user';
    }

    isTokenExpired() {
        const token = this.getToken();
        return token ? jwt.isTokenExpired(token) : true;
    }

}

AuthService.$inject = ['ApiService', 'jwtHelper', 'store'];

export default AuthService;
