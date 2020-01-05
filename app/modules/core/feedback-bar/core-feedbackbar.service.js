'use strict';

function FeedbackBarService(feedbackBar) {
    let self = this;
    self.feedbackBar = null;

    self.registerFeedbackBar = (feedbackBar) => {
        self.feedbackBar = feedbackBar;
    };

    self.info = (text) => {
        if (self.feedbackBar == null) return;
        self.feedbackBar.info(text);
    };

    self.error = (text) => {
        if (self.feedbackBar == null) return;
        self.feedbackBar.error(text);
    };

    self.hide = () => {
        if (self.feedbackBar == null) return;
        self.feedbackBar.hide();
    }
}


angular
    .module('core')
    .service('FeedbackBarService', [FeedbackBarService]);
