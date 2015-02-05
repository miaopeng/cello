'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var request = require('superagent');
var Sites = require('./sites');
var Actions = require('../actions/AppActions');
var Store = require('../stores/AppStores');

function getAppState() {
  return {
    sites: Store.get('sites')
  };
}

var Cello = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
    Actions.getSites();
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="cello">
        <Sites sites={this.state.sites}/>
        <RaisedButton label="Loading..." primary={true}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
    window.console.info("log: change" + 1, this.state); // log
    window.console.info("log: change" + 1, Store.getAll()); // log
  }
});

module.exports = Cello;
