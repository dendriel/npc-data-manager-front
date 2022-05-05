'use strict';

function SpriteController() {
    let self = this;
    self.$onInit = function() {
        self.data.resource = self.data.resource ?? { resource: { resId: 63, dirId: 1, storageId: "", name: "" } }
    };

}

angular
    .module('sharedcomponents')
    .component('sprite', {
        templateUrl: 'modules/shared-components/sprite/sprite.template.html',
        controller: [SpriteController],
        bindings: {
            data: '='
        }
    });
