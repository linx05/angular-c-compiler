loadingBarConfig.$inject = ['cfpLoadingBarProvider'];
function loadingBarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}

export { loadingBarConfig };
