'use strict';

function CoreAuthenticationService(CoreGenericService, sharedData) {
    let self = this;
    const authTokenKey = "authToken";

    self.isAuthenticated = function() {
        return sharedData.getParam(authTokenKey) !== null;
    };

    self.getAuthToken = function() {
        return sharedData.getParam(authTokenKey);
    };

    self.login = function(authParams, onSuccess, onError) {
        CoreGenericService
            .login(authParams)
            .then((res) => {
                if (res.status === 200) {
                    sharedData.setPersistentParam(authTokenKey, res.data.jwt);
                    console.log("Authentication successfully. " + res.data.jwt);
                    onSuccess();
                } else {
                    console.log("Authentication failed. " + res.status);
                    onError();
                }
            })
            .catch(reason => {
                    console.log("Authentication failed. " + reason);
                    sharedData.setParam(authTokenKey, null);
                    onError();
                }
            );
    };

    self.logout = function () {
        sharedData.setParam(authTokenKey, null);
    }
}


angular
    .module('core')
    .service('CoreAuthenticationService', [ 'CoreGenericService', 'CoreSharedDataService', CoreAuthenticationService ]);
