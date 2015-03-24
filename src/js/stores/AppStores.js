'use strict';

var EventEmitter  = require('events').EventEmitter;
var Promise = require('es6-promise').Promise;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType = require('../actions/ActionType');
var request = require('superagent');
var assign = require('object.assign');

var _db = {
  insights: [],
  sites: [],
  loading: true,
  currentInsight: null,
  currentInsightId: null
};

var EVENT_CHANGE = 'store::change';

var AppStores = assign(EventEmitter.prototype, {
  get: function(name) {
    return _db[name];
  },
  getAll: function(name) {
    return _db;
  },
  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(EVENT_CHANGE, callback);
  },
  emitChange: function() {
    this.emit(EVENT_CHANGE);
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case actionType.GET_SITES:
      return getSites(action.params);
    case actionType.GET_INSIGHTS:
      return getInsights(action.params);
    case actionType.GET_INSIGHT:
      return getInsight(action.insightId);
    case actionType.NAV_INSIGHT_LIST:
      return navInsightList();
    case actionType.POST_NEW_INSIGHT:
      return postNewInsight(action.insightData);
    default:
      return true;
  }
});

function getSites() {
  request.get(app.apiRoot + '/sites.json').end(function(resp) {
    if (resp.body && resp.body.length) {
      _db.sites = resp.body;
      _db.loading = false;
      AppStores.emitChange();
    }
  });
}

function getInsights() {
  request.get(app.apiRoot + '/insights.json').end(function(resp) {
    if (resp.body && resp.body.length) {
      _db.insights = resp.body;
      _db.loading = false;
      AppStores.emitChange();
    }
  });
}

function getInsight (insightId) {
  request.get(app.apiRoot + '/insights/' + insightId +'.json').end(function(resp) {
    if (resp.body && resp.body) {
      _db.currentInsightId = insightId;
      _db.currentInsight = resp.body;
      AppStores.emitChange();
    }
  });
}

function navInsightList () {
  _db.currentInsightId = null;
  _db.currentInsight = null;
  AppStores.emitChange();
}

function postNewInsight(insightData) {
  console.info("log: " + 2, insightData); // log
  request.post(app.apiRoot + '/insights.json')
    .type('form')
    .send(insightData)
    .set('Content-Type', 'application/json')
    // .set('X-Requested-With', 'XMLHttpRequest')
    .end(function(resp) {
      if (resp.body && resp.body) {
        console.info("log: post successful", resp); // log
        AppStores.emitChange();
      }
    });
}

module.exports = AppStores;
