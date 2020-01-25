'use strict';

function EnemyHandlerListController($location, CoreGenericService, sharedData, FeedbackBarService) {
    let self = this;
    sharedData.setParam("enemy", null);

    CoreGenericService
        .getAll('enemy')
        .then((res) => {
            self.enemies = res.data;
            sharedData.setParam("enemies", res.data);
        });

    self.edit = (entity) => {
        sharedData.setParam("enemy", entity);
        self.changeRoute('/enemy/edit');
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
