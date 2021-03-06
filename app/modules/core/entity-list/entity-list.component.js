'use strict';

function EntityHandlerListController($location, $routeParams, CoreGenericService, sharedData, FeedbackBarService) {
    let self = this;
    self.entitiesLabel = "entities";

    const entity = $routeParams.entity;

    sharedData.setParam(entity, null);

    CoreGenericService
        .getAll(entity)
        .then((res) => {
            self.entities = res.data;
            // sharedData.setParam(entitiesLabel, res.data);
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

        const index = self.entities.indexOf(elem);
        if (index <= -1) {
            FeedbackBarService.error("Couldn't remove element from array. Enemy is not in the list");
            return;
        }

        CoreGenericService
            .delete(entity, elem.idAsText)
            .then((res) => {
                self.entities.splice(index, 1);
                FeedbackBarService.info(elem.name + " removed!");
            })
            .catch(reason =>
                FeedbackBarService.error("Failed to delete element! Status: " + reason.status + ". Error: " + reason.data.error + ":" + reason.message)
            )
    };


    self.removeAll = () => {
        let remove = confirm("Do you really want to remove ALL " + self.entitiesLabel + "?");
        if (remove === false) {
            return;
        }

        const idsToRemove = self.entities.map(e => e.idAsText);
        if (idsToRemove.length === 0) {
            FeedbackBarService.info("There is no " + self.entitiesLabel + " to remove.");
            return;
        }

        CoreGenericService
            .deleteAll(entity, idsToRemove)
            .then((res) => {
                FeedbackBarService.info(res.data + " " + self.entitiesLabel + " removed!");
                self.entities = [];
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
    .module('core')
    .component('entityList', {
        templateUrl: 'modules/core/entity-list/entity-list.template.html',
        controller: ['$location', '$routeParams', 'CoreGenericService', 'CoreSharedDataService', "FeedbackBarService", EntityHandlerListController]
    });
