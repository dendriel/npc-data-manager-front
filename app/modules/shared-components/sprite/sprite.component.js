'use strict';

function SpriteController() {
    // let self = this;
    // self.$onInit = function() {
    //     console.log("SpriteController: " + JSON.stringify(self.data));
    // };
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
