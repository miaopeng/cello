/** @jsx React.DOM */
var React = require('react');
var Cello = require('./components/cello');

window.app = {
  start: function(mountNode) {
    /* jshint ignore:start */
    React.render(<Cello />, mountNode);
    /* jshint ignore:end */
  }
};

