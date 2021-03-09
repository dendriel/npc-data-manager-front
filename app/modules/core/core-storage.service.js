'use strict';

function CoreStorageService($http, $location, sharedData) {
    let self = this;
    const authTokenKey = "authToken";

    const directoryPath = "directory/";
    const resourcePath = "resource/";

    const storageAddress = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port + "/storage/";
    sharedData.setPersistentParam("storageAddress", storageAddress);

    self.getAllDirectories = function() {
        let url = storageAddress + directoryPath + "all";
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    };

    self.createDirectory = function(name) {
        let url = storageAddress + directoryPath + `?name=${name}`;
        console.log(url);
        return $http({
            method: 'POST',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    };

    self.removeDirectory = function(id) {
        let url = storageAddress + directoryPath + id;
        console.log(url);
        return $http({
            method: 'DELETE',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    }
}


angular
    .module('core')
    .service('CoreStorageService', ['$http', '$location', 'CoreSharedDataService', CoreStorageService]);
