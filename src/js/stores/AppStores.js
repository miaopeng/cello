'use strict';

var EventEmitter  = require('events').EventEmitter;
var Promise       = require('es6-promise').Promise;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType    = require('../actions/ActionType');
var request       = require('superagent');
var assign        = require('object.assign');

var _db = {
  insights: [],
  sites: [],
  loading: true
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
    default:
      return true;
  }
});

function getSites(params) {
  // fetch data & update
  request.get('http://localhost:3000/sites.json').end(function(resp) {
    if (resp.body && resp.body.length) {
      _db.sites = resp.body;
      _db.loading = false;
      AppStores.emitChange();
    }
  });
}

function getInsights(params) {
  // fetch data & update
  request.get('http://localhost:3000/insights.json').end(function(resp) {
    if (resp.body && resp.body.length) {
      _db.insights = resp.body;
      _db.loading = false;
      AppStores.emitChange();
    }
  });
}

module.exports = AppStores;
