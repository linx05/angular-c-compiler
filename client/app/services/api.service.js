const routes = {
    api: 'https://localhost:9000'
};

class ApiService {

    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
        routes.api += '/api/';
    }

    getApiUrl() {
        return this.apiServer;
    }

    httpExecute(urlResource, method, data = null) {
        return this.$http({
            url: routes.api + urlResource,
            method: method,
            data: data,
        })
            .then(this.requestComplete)
            .catch(this.requestFailed.bind(this));
    }

    httpGet(url) {
        return this.httpExecute(url, 'GET');
    }

    httpPost(url, data) {
        return this.httpExecute(url, 'POST', data);
    }

    httpPut(url, data) {
        return this.httpExecute(url, 'PUT', data);
    }

    httpDelete() {
        return this.httpExecute(url, 'DELETE');
    }

    requestComplete(response) {
        return response.data;
    }

    requestFailed(error) {
        return this.$q.reject(error);
    }

}

ApiService.$inject = ['$http', '$q'];

export default ApiService;
