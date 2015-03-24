'use strict';

var React = require('react');
var Actions = require('../actions/AppActions');
var shortdate = require('../utils/format').shortdate;
var mui = require('material-ui');
var Icon = mui.Icon;
var IconButton = mui.IconButton;
var NewInsightDialog = require('./NewInsightDialog');

var InsightList = React.createClass({

  handleClick: function(insightId) {
    Actions.getInsight(insightId);
  },

  createInsight: function(insight) {
    var score = 'N/A';

    if (insight.last_sample_score) {
      score = (<span className="score-circle">{insight.last_sample_score.split('/')[0]}</span>);
    }

    var strategyIcon = insight.strategy === 'desktop' ?
      (<Icon icon="hardware-laptop-chromebook" />) :
      (<Icon icon="hardware-phone-iphone" />);
    
    return (<div key={insight.id} onClick={this.handleClick.bind(this, insight.id)} className="insight-card">
              <div className="hd">
                  <div className="meta">LAST SCORE</div>
                  <div className="score-card">{score}</div>
              </div>
              <div className="hd">
                  <div className="meta">STRATEGY</div>
                  <div className="strategy-card">{strategyIcon}</div>
              </div>
              <div className="bd">
                <div className="meta">created at {shortdate(insight.created_at)}</div>
                <div className="title">{insight.url}</div>
                <div className="bio">endpoints: {insight.endpoints_count}</div>
              </div>
            </div>);
  },

  render: function() {
    if (!this.props.insights.length) {
      return null;
    }

    return (<div className='insight-list'>
              <div className="hd">
                <div className="tools">
                  <IconButton icon="content-add-circle" onClick={this.openCreateDialog}/>
                </div>
                Insights
              </div>
              <div className="bd">
                {this.props.insights.map(this.createInsight, this)}
              </div>
              <NewInsightDialog
                ref="newInsightDialog"/>
            </div>);
  },

  openCreateDialog: function() {
    this.refs.newInsightDialog.show();
  }

});

module.exports = InsightList;

