'use strict';

var React = require('react');
var _ = require('underscore');
var Icon = require('material-ui').Icon;
var classnames = require('classnames');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

/**
 * Transform arg array to object
 * @param {Array} args
 * @return {Object}
 */
function getArgObj (args) {
  var data = {};
  if (args && args.length) {
    args.map(function(item) {
      data[item.key] = item.value;
    });
  }
  return data;
}

var UrlList = React.createClass({

  getInitialState: function() {
    return {
      collapsed: true
    };
  },

  toggleUrlList: function() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function() {
    var urls = [];
    if (this.props.urls && this.props.urls.length) {
      this.props.urls.map(function(url) {
        var urlValue = url.result.args[0].value;
        urls.push(<li><a href={urlValue}>{urlValue}</a></li>);
      });
    }
    if (urls.length > 5) {
      urls.push(<a onClick={this.toggleUrlList}
                className="link-toggle"
                href="javascript:;">toggle all {urls.length} items</a>);
    }

    var cls = classnames({
      'url-list': true,
      'state-collapsed': this.state.collapsed
    });
    return (
        <ul className={cls}>{urls}</ul>
    );
  }

});

var UrlBlocks = React.createClass({

  createBlocks: function() {
    var data = this.props.urlBlocks;
    var blocks = [];
    if (data && data.length) {
      blocks = data.map(function(item, index) {
        var splited = item.header.format.split(/{{|}}/);
        var args = getArgObj(item.header.args);
        var isLink = false;
        splited = splited.map(function(substr){
          if (substr === 'BEGIN_LINK') {
            isLink = true;
            return '';
          }
          if (substr === 'END_LINK') {
            isLink = false;
            return '';
          }
          if (isLink && args.LINK) {
            return (<a href={args.LINK} target="_blank">{substr}</a>);
          }

          // variable
          if (args[substr]) {
            return args[substr];
          }
          return substr;
        });
        
        var urlList = (<UrlList urls={item.urls}/>);
        return (<li key={index}>{splited}{urlList}</li>);
      });
    }
    return blocks;
  },

  render: function() {
    var urlBlocks = this.createBlocks();
    return (
      <ul className="url-block-list">
        {urlBlocks}
      </ul>
    );
  }

});

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
      if (summary.args && summary.args.length) {
        summary.args.map(function(item) {
          data[item.key] = item.key ==='LINK' ? item.value : '<b>' + item.value + '</b>';
        });
      }

      var linkMatch = rLink.exec(source);
      if (linkMatch && data.LINK) {
        source = source.replace(rLink, function(match, p1) {
          return '<a href="' + data.LINK + '" target="_blank">' + p1 + '</a>';
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
          content: renderSummary(rule.summary),
          urlBlocks: rule.urlBlocks
        });
      }
    }
    rules.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });

    var isGoodRules = this.props.type === 'good';
    var ruleList = rules.map(function(item) {
      var severityCls = item.score > 10 ? 'state-critical' : 'state-warning';
      var icon = isGoodRules ? 
        (<Icon icon="action-done" />) :
        (<Icon icon="action-info-outline" className={severityCls}/>);

      var score = isGoodRules ? null : (<span className="rule-score">{item.score}</span>);

      return (<div key={item.key} className="rule-card">
                <div className="hd">
                  {icon}
                  {score}
                  <span className="rule-name">{item.name}</span>
                </div>
                <div className="bd">
                  <div dangerouslySetInnerHTML={{__html: item.content}} />
                  <UrlBlocks urlBlocks={item.urlBlocks}/>
                </div>
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
