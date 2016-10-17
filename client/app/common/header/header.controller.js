let state, authService;

class HeaderController {

    constructor ($state, AuthService) {
        state = $state;
        authService = AuthService;
    }

    getLoginName () {
        return authService.getLoginName();
    }

    isAdmin () {
        return authService.isAdmin();
    }

    isEmployee () {
        return authService.isEmployee();
    }

    isLogged () {
        return authService.isLogged();
    }

    isUser () {
        return authService.isUser();
    }

    logout () {
        authService.logout();
        state.go('login');
    }

}

HeaderController.$inject = ['$state', 'AuthService'];

export default HeaderController;
