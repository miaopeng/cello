'use strict';

var React = require('react');
var Store = require('../stores/AppStores');
var shortdate = require('../utils/format').shortdate;

var Insight = React.createClass({
  getInitialState: function() {
    return Store.get('currentInsight');
  },

  createEndPoint: function(point) {
    return (<div className="endpoint-card">
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
                </div>
              </div>
            </div>);
  }
});

module.exports = Insight;
