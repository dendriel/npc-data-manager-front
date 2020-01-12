'use strict';

function HeaderBarController($location, $route, sharedData) {
    let self = this;

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
        if (window.location.href.indexOf(newRoute) !== -1) {
            sharedData.clear();
            $route.reload();
        } else {
            $location.path(newRoute);
        }
    };
}


angular
    .module('core')
    .component('headerBar', {
        templateUrl: 'modules/core/header-bar/core-headerbar.template.html',
        controller: ['$location', '$route', 'CoreSharedDataService', HeaderBarController]
    });
