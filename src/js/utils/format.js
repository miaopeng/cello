'use strict';

var moment = require('moment');

var shortdate = function(date) {
  return moment(date).format('MMM DD HH:mm');
};

module.exports = {
  shortdate: shortdate
};
