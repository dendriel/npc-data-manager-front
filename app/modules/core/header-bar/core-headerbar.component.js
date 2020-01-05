'use strict';

function HeaderBarController() {
    let self = this;
}


angular
    .module('core')
    .component('headerBar', {
        templateUrl: 'modules/core/header-bar/core-headerbar.template.html',
        controller: HeaderBarController
    });
