'use strict';

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var request = require('superagent');
var InsightList = require('./InsightList');
var Actions = require('../actions/AppActions');
var Store = require('../stores/AppStores');

function getAppState() {
  return {
    insights: Store.get('insights'),
    loading: Store.get('loading')
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
    var loading = null;
    if (this.state.loading) {
      loading = (<RaisedButton label="Loading..."
          primary={true} visible={this.state.loading} />);
    }
    return (
      <div id="cello">
        {loading}
        <aside>
          <ul>
            <li><a href="">Insights</a></li>
          </ul>
        </aside>
        <article>
          <InsightList insights={this.state.insights} />
        </article>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = Cello;
