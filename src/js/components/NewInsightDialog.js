'use strict';

var React = require('react');
var Actions = require('../actions/AppActions');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var TextField = mui.TextField;
var RadioButton = mui.RadioButton;
var RadioButtonGroup = mui.RadioButtonGroup;

var React = require('react');

var NewInsightDialog = React.createClass({

  render: function() {
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    return (
      <Dialog
        ref="dialog"
        title="Create new insight"
        actions={standardActions}>

        <div className="field-group">
          <TextField ref="urlField"
            defaultValue="http://douban.com"
            floatingLabelText="Site URL" />
        </div>

        <div className="field-group">
          <label>Strategy</label>
          <hr />
          <RadioButtonGroup 
            ref="strategyField" 
            name="strategy"
            defaultSelected="desktop">
            <RadioButton
              value="desktop"
              label="Desktop"
              defaultChecked={true} />
            <RadioButton
              value="mobile"
              label="Mobile" />
          </RadioButtonGroup>
        </div>

      </Dialog>
      
    );
  },

  show: function() {
    this.refs.dialog.show();
    this.refs.urlField.focus();
  },
  
  _onDialogSubmit: function() {
    Actions.postNewInsight({
      'insight': { 
        'url': this.refs.urlField.getValue(),
        'locale': 'zh_CN',
        'screenshot': 1,
        'strategy': this.refs.strategyField.getSelectedValue(),
        'filter_third_party_resources': true
      }
    });
    this.refs.dialog.dismiss();
  }

});

module.exports = NewInsightDialog;
