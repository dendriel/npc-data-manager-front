'use strict';

function AppAuthentication($rootScope, $location, CoreAuthenticationService) {
    let freeRoutes = ['/login'];

    let isAuthenticationRequired = function(newRoute) {
        return freeRoutes.indexOf(newRoute) === -1;
    };

    $rootScope.$on('$routeChangeStart', function (event) {
        let newRoute = $location.url();

        // if (isAuthenticationRequired(newRoute) && !CoreAuthenticationService.isAuthenticated()) {
        //     console.log('DENY : Redirecting to Login');
        //     event.preventDefault();
        //     $location.path('/login');
        // }
    });
}

angular
    .module('npcDataManager')
    .run(['$rootScope', '$location', 'CoreAuthenticationService', AppAuthentication]);
