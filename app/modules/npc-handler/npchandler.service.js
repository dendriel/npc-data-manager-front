'use strict';

function NpcHandlerService($http) {
    var self = this;
    self.getById = function(id) {
        let url = "http://localhost:8080/npc/getById?id="+id;
        console.log(url);
        return $http.get(url);
    };

    self.getAll = function() {
        let url = "http://localhost:8080/npc/getAll";
        console.log(url);
        return $http.get(url);
    };

    self.save = function(npcData) {
        let url = "http://localhost:8080/npc/save";
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

    self.export = function(filePath) {
        let url = "http://localhost:8080/npc/export";
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
    .module('npchandler')
    .service('NpcHandlerService', ['$http', NpcHandlerService]);
