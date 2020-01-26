'use strict';

function IconController() {
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
