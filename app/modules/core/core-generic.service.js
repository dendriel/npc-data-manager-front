'use strict';

function CoreGenericService($http) {
    var self = this;

    self.getById = function(entity, id) {
        let url = "http://localhost:8080/" + entity + "/getById?id="+id;
        console.log(url);
        return $http.get(url);
    };

    self.delete = function(entity, id) {
        let url = "http://localhost:8080/" + entity + "/delete?id="+id;
        console.log(url);
        return $http.get(url);
    };

    self.getAll = function(entity) {
        let url = "http://localhost:8080/" + entity + "/getAll";
        console.log(url);
        return $http.get(url);
    };

    self.save = function(entity, npcData) {
        let url = "http://localhost:8080/" + entity + "/save";
        console.log(url + " - " + npcData);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            },
            data: npcData
        });
    };

    self.import = function(entity, filePath) {
        let url = "http://localhost:8080/" + entity + "/import";
        let data = filePath;
        console.log(url + " - " + data);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            },
            data: data
        });
    };

    self.export = function(entity, filePath) {
        let url = "http://localhost:8080/" + entity + "/export";
        let data = filePath;
        console.log(url + " - " + data);
        return $http({
            method: 'POST',
            dataType: 'json',
            url: url,
            headers: {
                'Content-Type': "application/json;charset=utf-8"
            },
            data: data
        });
    }
}

angular
    .module('core')
    .service('CoreGenericService', ['$http', CoreGenericService]);
