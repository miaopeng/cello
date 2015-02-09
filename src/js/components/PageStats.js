'use strict';

var React = require('react');
var mui = require('material-ui');
var numberToHumanSize = require('../utils/format').numberToHumanSize;
var Menu = mui.Menu;
var StateMap = {
  "numberResources": "Resources",
  "numberHosts": "Hosts",
  "totalRequestBytes": "Total size",
  "numberStaticResources": "Static resources",
  "htmlResponseBytes": "HTML size",
  "textResponseBytes": "Text Size",
  "cssResponseBytes": "CSS size",
  "imageResponseBytes": "Image size",
  "javascriptResponseBytes": "JavaScript size",
  "flashResponseBytes": "Flash size",
  "otherResponseBytes": "Other size",
  "numberJsResources": "JS resouces",
  "numberCssResources": "CSS resources"
};

var PageStats = React.createClass({
  getInitialState: function() {
    return {
      endpoint: this.props.endpoint
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      endpoint: nextProps.endpoint
    });
  },

  render: function() {
    var items = [];
    var pageStats = this.state.endpoint.result.pageStats;
    for (var key in pageStats) {
      items.push({
        payload: key,
        text: StateMap[key],
        data: key.indexOf('Bytes') > -1 ? numberToHumanSize(pageStats[key]) : '' + pageStats[key]
      });
    }

    return (<Menu menuItems={items} />);
  }

});


module.exports = PageStats;
