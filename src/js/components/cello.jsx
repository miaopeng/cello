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
    return (
      <div className="cello">
        <Sites />
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
      </div>
    );
  }
});

module.exports = Cello;
