'use strict';

function HitController() {
}

angular
    .module("sharedcomponents")
    .component("hit", {
        templateUrl: "modules/shared-components/hit/hit.template.html",
        controller: [HitController],
        bindings: {
            data: '='
        }
    });
