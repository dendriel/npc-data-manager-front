'use strict';

function CoreStorageService($http, $location, sharedData) {
    let self = this;
    const authTokenKey = "authToken";

    const directoryPath = "directory";
    const resourcePath = "resource";

    const storageAddress = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port + "/storage/";
    sharedData.setPersistentParam("storageAddress", storageAddress);

    self.getAllDirectories = function() {
        let url = storageAddress + directoryPath + "/" + "all";
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
        let url = storageAddress + directoryPath + "/" + id;
        console.log(url);
        return $http({
            method: 'DELETE',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    }

    self.getResourcesByDirectoryId = function(id) {
        let url = storageAddress + directoryPath + "/" + id + "/list";
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    }

    self.getResourceTypes = function() {
        let url = storageAddress + resourcePath + "/" + "types";
        console.log(url);
        return $http({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            }
        });
    }

    self.createResource = function(name, type, directoryId, file) {
        let url = storageAddress + resourcePath + "/" + "upload";
        console.log(url);

        let formData = new FormData();
        formData.append('type', type);
        formData.append('name', name);
        formData.append('directoryId', directoryId);
        formData.append('file', file);

        return $http({
            method: 'POST',
            url: url,
            headers: {
                "Content-Type": undefined,
                'Authorization': "Bearer " + sharedData.getParam(authTokenKey)
            },
            data: formData
        });
    }

    self.removeResource = function(id) {
        let url = storageAddress + resourcePath + "/" + id;
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
