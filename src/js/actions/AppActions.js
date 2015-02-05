'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType    = require('./ActionType');

module.exports = {
  getSites: function() {
    AppDispatcher.handleViewAction({
      actionType: actionType.GET_SITES
    });
  },

  getInsights: function() {
    AppDispatcher.handleViewAction({
      actionType: actionType.GET_INSIGHTS
    });
  }
};
