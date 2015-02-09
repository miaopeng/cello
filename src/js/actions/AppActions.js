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
  },

  getInsight: function(insightId) {
    AppDispatcher.handleViewAction({
      actionType: actionType.GET_INSIGHT,
      insightId: insightId
    });
  },

  navInsightList: function() {
    AppDispatcher.handleViewAction({
      actionType: actionType.NAV_INSIGHT_LIST
    });
  }
};
