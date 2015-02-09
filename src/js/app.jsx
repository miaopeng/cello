'use strict';

var React = require('react');
var Cello = require('./components/cello');
var assign = require('object.assign');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

window.app = {
  start: function(options) {
    assign(this, options);
    React.render(<Cello />, options.mountNode);
  }
};

