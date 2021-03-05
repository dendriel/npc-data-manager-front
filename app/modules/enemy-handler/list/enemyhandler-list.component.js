'use strict';

function EnemyHandlerListController($location, CoreGenericService, sharedData, FeedbackBarService) {
    let self = this;
    const entity = "enemy";
    sharedData.setParam(entity, null);

    CoreGenericService
        .getAll(entity)
        .then((res) => {
            self.enemies = res.data;
            sharedData.setParam("enemies", res.data);
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
        if (index > -1) {
            CoreGenericService
                .delete(entity, elem.idAsText)
                .then((res) => {
                    self.enemies.splice(index, 1);
                    FeedbackBarService.info(elem.name + " removed!");
                })
                .catch(reason =>
                    FeedbackBarService.error("Failed to delete element! Status: " + reason.status + ". Error: " + reason.data.error + ":" + reason.message)
                )
        }
        else {
            FeedbackBarService.error("Couldn't remove element from array. Enemy is not in the list");
        }
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
