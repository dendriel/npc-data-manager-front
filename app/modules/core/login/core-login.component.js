'use strict';

function CoreLogin($location, CoreAuthenticationService, FeedbackBarService) {
    let self = this;
    const dashboardPath = "/dashboard";
    self.data = "";

    self.submit = function() {
        if (CoreAuthenticationService.isAuthenticated()) {
            $location.path(dashboardPath);
            return;
        }
        //
        // // validate parameters.
        //
        CoreAuthenticationService.login(self.data,
            () => {
                FeedbackBarService.info("Logged!");
                $location.path(dashboardPath);
            },
            () => {
                self.clearCredentials();
                FeedbackBarService.error("Invalid username or password.");
            });
    };

    self.clearCredentials = function () {
        self.data = { username: "", password: "" };
    };

    self.clearCredentials();
}

angular
    .module('core')
    .component('login', {
        templateUrl: "modules/core/login/core-login.template.html",
        controller: [ '$location', 'CoreAuthenticationService', 'FeedbackBarService',  CoreLogin ]
    });
