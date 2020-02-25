'use strict';

function WearableStatusController() {
}

angular
    .module('sharedcomponents')
    .component('wearableStatus', {
        templateUrl: 'modules/shared-components/wearable-status/wearable-status.template.html',
        controller: [WearableStatusController],
        bindings: {
            data: '='
        }
    });
