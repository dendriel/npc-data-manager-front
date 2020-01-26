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
