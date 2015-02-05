'use strict';

var React = require('react');

var InsightList = React.createClass({
  createInsight: function(insight) {
    return (<li key={insight.id}>{insight.url}</li>);
  },

  render: function() {
    if (!this.props.insights.length) {
      return null;
    }

    return (<ul className='insights'>
              {this.props.insights.map(this.createInsight, this)}
            </ul>);
  }
});

module.exports = InsightList;

