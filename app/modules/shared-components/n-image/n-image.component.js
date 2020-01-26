'use strict';

function NImageController() {}

angular
    .module('sharedcomponents')
    .component('nImage', {
        templateUrl: "modules/shared-components/n-image/n-image.template.html",
        controller: [NImageController],
        bindings: {
            data: '='
        }
    });
