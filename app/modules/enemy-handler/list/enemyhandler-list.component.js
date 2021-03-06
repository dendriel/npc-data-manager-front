'use strict';

function EnemyHandlerListController($location, CoreGenericService, sharedData, FeedbackBarService) {
    let self = this;
    const entity = "enemy";
    const entities = "enemies";
    sharedData.setParam(entity, null);

    CoreGenericService
        .getAll(entity)
        .then((res) => {
            self.enemies = res.data;
            sharedData.setParam(entities, res.data);
        });

    self.edit = (elem) => {
        sharedData.setParam(entity, elem);
        self.changeRoute('/' + entity + '/edit');
    };

    self.clone = (elem) => {
        let clone = JSON.parse(JSON.stringify(elem));
        clone.idAsText = null;
        clone.uid = null;
        sharedData.setParam(entity, clone);
        self.changeRoute('/' + entity + '/edit');
    };

    self.remove = (elem) => {
        let remove = confirm("Do you really want to remove " + elem.name + "?");
        if (remove === false) {
            return;
        }

        const index = self.enemies.indexOf(elem);
        if (index <= -1) {
            FeedbackBarService.error("Couldn't remove element from array. Enemy is not in the list");
            return;
        }

        CoreGenericService
            .delete(entity, elem.idAsText)
            .then((res) => {
                self.enemies.splice(index, 1);
                FeedbackBarService.info(elem.name + " removed!");
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to delete element! Status: " + reason.status + ". Error: " + reason.data.error + ":" + reason.message)
            )
    };


    self.removeAll = (elem) => {
        let remove = confirm("Do you really want to remove ALL " + entities + "?");
        if (remove === false) {
            return;
        }

        const idsToRemove = self.enemies.map(e => e.idAsText);
        if (idsToRemove.length === 0) {
            FeedbackBarService.info("There is no " + entities + " to remove.");
            return;
        }

        CoreGenericService
            .deleteAll(entity, idsToRemove)
            .then((res) => {
                FeedbackBarService.info(res.data + " " + entities + " removed!");
                self.enemies = [];
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to delete element! Status: " + reason.status + ". Error: " + reason.data.error + ":" + reason.message)
            )
    };

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
    };

    FeedbackBarService.hide();
}

angular
    .module('enemyhandler')
    .component('enemyList', {
        templateUrl: 'modules/enemy-handler/list/enemyhandler-list.template.html',
        controller: ['$location', 'CoreGenericService', 'CoreSharedDataService', "FeedbackBarService", EnemyHandlerListController]
});
