'use strict';

var React = require('react');
var Cello = require('./components/cello');
var assign = require('object.assign');

window.app = {
  start: function(options) {
    assign(this, options);
    React.render(<Cello />, options.mountNode);
  }
};

