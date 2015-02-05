'use strict';

var React = require('react');

var Sites = React.createClass({
  createSite: function(site) {
    return (<li key={site.id}>{site.url}</li>);
  },

  render: function() {
    if (!this.props.sites.length) {
      return null;
    }

    return (<ul className='sites'>
              {this.props.sites.map(this.createSite, this)}
            </ul>);
  }
});

module.exports = Sites;
