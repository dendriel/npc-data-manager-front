'use strict';

function HeaderBarController($location, $route, sharedData, CoreAuthenticationService) {
    let self = this;
    let loginRoute = "/login";

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
        if (window.location.href.indexOf(newRoute) !== -1) {
            sharedData.clear();
            $route.reload();
        } else {
            $location.path(newRoute);
        }
    };

    self.logout = function () {
        if (!CoreAuthenticationService.isAuthenticated()) {
            return
        }
        CoreAuthenticationService.logout();
        $location.path(loginRoute);
    }
}


angular
    .module('core')
    .component('headerBar', {
        templateUrl: 'modules/core/header-bar/core-headerbar.template.html',
        controller: ['$location', '$route', 'CoreSharedDataService', 'CoreAuthenticationService', HeaderBarController]
    });
