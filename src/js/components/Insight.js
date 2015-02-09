'use strict';

var React = require('react');
var Store = require('../stores/AppStores');
var classnames= require('classnames');
var shortdate = require('../utils/format').shortdate;
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var PageStats = require('./PageStats');
var RuleResult = require('./RuleResult');


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
    var cls = classnames({
      "endpoint-card": true,
      'on': point === this.state.currentEndPoint
    });
    return (<div className={cls} onClick={this.selectEndPoint.bind(this, point)}>
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
                    <Tab label="Bad"><RuleResult type="bad" endpoint={this.state.currentEndPoint}/></Tab>
                    <Tab label="Good"><RuleResult type="good" endpoint={this.state.currentEndPoint}/></Tab>
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
