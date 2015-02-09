'use strict';

var moment = require('moment');

function shortdate(date) {
  return moment(date).format('MMM DD HH:mm');
}

function numberToHumanSize(size) {
  if(size < 1024) {
    return size + ' bytes';
  }
  else if(size < 1024.0 * 1024.0) {
    return (size / 1024.0).toFixed(2) + ' KB';
  }
  else if(size < 1024.0 * 1024.0 * 1024.0) {
    return (size / 1024.0 / 1024.0).toFixed(2) + ' MB';
  }
  else {
    return (size / 1024.0 / 1024.0 / 1024.0).toFixed(2) + ' GB';
  }
}

module.exports = {
  shortdate: shortdate,
  numberToHumanSize: numberToHumanSize
};
