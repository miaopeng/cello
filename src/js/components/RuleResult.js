'use strict';

var React = require('react');
var _ = require('underscore');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var RuleResult = React.createClass({
  getInitialState: function() {
    return {
      ruleResults: this.props.endpoint.result.formattedResults.ruleResults 
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      ruleResults: nextProps.endpoint.result.formattedResults.ruleResults 
    });
  },

  createRules: function() {
    var rules = [],
      allRules = this.state.ruleResults,
      rule;
    
    function impactScore (ruleImpact) {
      return ruleImpact > 0 ? ruleImpact.toFixed(2) : 0;
    }

    function renderSummary (summary) {
      if (!summary) {
        return '';
      }
      var source = summary.format;
      var rLink = /{{BEGIN_LINK}}(.*){{END_LINK}}/;

      var data = {};
      summary.args && summary.args.map(function(item) {
        data[item.key] = '<b>' + item.value + '</b>';
      })

      var linkMatch = rLink.exec(source);
      if (linkMatch && data.LINK) {
        source = source.replace(rLink, function(match, p1) {
          return '<a href="' + data.LINK + '" target="_blank">' + p1 + '</a>'
        });
      }
      var tpl = _.template(source);
      var html = tpl(data);
      return html;
    }

    for(var key in allRules) {
      rule = allRules[key];
      if ((this.props.type === 'good' && rule.ruleImpact <= 0) ||
          (this.props.type === 'bad' && rule.ruleImpact > 0))
      {
        rules.push({
          key: key,
          score: impactScore(rule.ruleImpact),
          name: rule.localizedRuleName,
          content: renderSummary(rule.summary)
        });
      }
    }
    rules.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });

    var ruleList = rules.map(function(item) {
        return (<div key={item.key} className="rule-card">
                   <div className="hd">
                     <span className="rule-score">{item.score}</span>
                     <span className="rule-name">{item.name}</span>
                   </div>
                   <div className="bd" dangerouslySetInnerHTML={{__html: item.content}} />
                   </div>);
    });

    return ruleList;
  },

  render: function() {
    var rules = this.createRules();
    return (
      <div className="rule-list">
        <div className="hd">{this.props.title}</div>
        <div className="bd">
          {rules} 
        </div>
      </div>
      
    );
  }
});

module.exports = RuleResult;
