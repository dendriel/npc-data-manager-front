'use strict';

function WearableHolderController() {
}

angular
    .module('sharedcomponents')
    .component('wearableHolder', {
        templateUrl: 'modules/shared-components/wearable-holder/wearable-holder.template.html',
        controller: [WearableHolderController],
        bindings: {
            data: '='
        }
    });
