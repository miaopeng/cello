'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Actions = require('../actions/AppActions');
var Store = require('../stores/AppStores');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var InsightList = require('./InsightList');
var Insight = require('./Insight');

function getAppState() {
  return {
    insights: Store.get('insights'),
    loading: Store.get('loading'),
    currentInsight: Store.get('currentInsight'),
    currentInsightId: Store.get('currentInsightId')
  };
}

var Cello = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
    Actions.getInsights();
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  render: function() {
    var loading = null,
      currentView = (<InsightList insights={this.state.insights} />);

    if (this.state.loading) {
      loading = (<RaisedButton label="Loading..."
          primary={true} visible={this.state.loading} />);
    }

    if (this.state.currentInsight) {
       currentView= (<Insight />);
    }

    return (
      <div id="cello">
        {loading}
        <aside>
          <ul>
            <li><a href="#" onClick={this.navHome}>Insights</a></li>
          </ul>
        </aside>
        <article>
          <ReactCSSTransitionGroup transitionName="example">
          {currentView}
          </ReactCSSTransitionGroup>
        </article>
      </div>
    );
  },

  navHome: function() {
    Actions.navInsightList();
  },

  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = Cello;
