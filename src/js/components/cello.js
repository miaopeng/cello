/** @jsx React.DOM */
'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var request = require('superagent');
var Sites = require('./sites');

var Cello = React.createClass({

  componentDidMount: function() {
    request.get('/data/sites.json')
      .end();
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div className="cello">
        <Sites />
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
      </div>
    );
    /* jshint ignore:end */
  },

  _handleTouchTap: function() {
    alert('1-2-3-4-5');
  }

});

module.exports = Cello;
