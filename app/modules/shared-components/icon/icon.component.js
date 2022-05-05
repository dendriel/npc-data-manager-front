'use strict';

function IconController() {
    let self = this;
    self.$onInit = function() {
        self.data.resource = self.data.resource ?? { resource: { resId: 63, dirId: 1, storageId: "", name: "" } }
    };
}

angular
    .module("sharedcomponents")
    .component("icon", {
        templateUrl: "modules/shared-components/icon/icon.template.html",
        controller: [IconController],
        bindings: {
            data: '='
        }
    });
