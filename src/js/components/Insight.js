'use strict';

var React = require('react');
var Store = require('../stores/AppStores');
var shortdate = require('../utils/format').shortdate;
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var Menu = mui.Menu;
var PageStats = require('./PageStats');


var Insight = React.createClass({
  getInitialState: function() {
    return Store.get('currentInsight');
  },

  componentWillMount: function() {
    var curEndPoint = this.state.endpoints[0];
    this.state.currentEndPoint = curEndPoint;
  },

  selectEndPoint: function(point) {
    this.setState({
      currentEndPoint: point
    });
  },

  createEndPoint: function(point) {
    return (<div className="endpoint-card" onClick={this.selectEndPoint.bind(this, point)}>
            <span className="score-circle">{point.speed_score}</span>
            <span className="meta">{shortdate(point.created_at)}</span>
           </div>);
  },

  render: function() {
    return (<div className='insight-panel'>
              <h1>{this.state.url}</h1>
              <div className="bd">
                <div className="endpoint-list">
                  {this.state.endpoints.map(this.createEndPoint, this)} 
                </div>
                <div className="endpoint-panel">
                  <Tabs>
                    <Tab label="Page Stats"><PageStats endpoint={this.state.currentEndPoint}/></Tab>
                    <Tab label="Bad">Bad</Tab>
                    <Tab label="Good">Good</Tab>
                  </Tabs>
                </div>
              </div>
            </div>);
  },

  _onActive: function(tab){ 
    this.transitionTo(tab.props.route); 
  }
});

module.exports = Insight;
