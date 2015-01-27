'use strict';

var React = require('react');
var Cello = require('./components/cello');

window.app = {
  start: function(mountNode) {
    React.render(<Cello />, mountNode);
  }
};

