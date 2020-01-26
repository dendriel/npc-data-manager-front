'use strict';

function ItemHandlerListController($location, CoreGenericService, sharedData, FeedbackBarService) {
    const entity = "item";
    let self = this;
    sharedData.setParam("item", null);

    self.edit = (item) => {
        sharedData.setParam("item", item);
        self.changeRoute('/item/edit');
    };

    self.clone = (item) => {
        let clone = JSON.parse(JSON.stringify(item));
        clone.idAsText = null;
        clone.uid = null;
        sharedData.setParam("item", clone);
        self.changeRoute('/item/edit');
    };

    self.remove = (item) => {
        let remove = confirm("Do you really want to remove " + item.name + "?");
        if (remove === false) {
            return;
        }

        const index = self.items.indexOf(item);
        if (index > -1) {
            CoreGenericService
                .delete(entity, item.idAsText)
                .then((res) => {
                    self.items.splice(index, 1);
                    FeedbackBarService.info(item.name + " removed!");
                })
                .catch(reason =>
                    FeedbackBarService.error("Failed to delete element! Status: " + reason.status + ". Error: " + reason.data.error + ":" + reason.message)
                )
        }
        else {
            FeedbackBarService.error("Couldn't remove element from array. Item is not in the list");
        }
    };

    self.changeRoute = function(newRoute) {
        $location.path(newRoute);
    };

    CoreGenericService
        .getAll(entity)
        .then((res) => {
            self.items = res.data;
            sharedData.setParam("items", res.data);
        });

    FeedbackBarService.hide();
}

angular
    .module('itemhandler')
    .component('itemList', {
        templateUrl: 'modules/item-handler/list/itemhandler-list.template.html',
        controller: ['$location', 'CoreGenericService', 'CoreSharedDataService', "FeedbackBarService", ItemHandlerListController]
    });
