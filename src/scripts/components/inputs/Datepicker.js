'use strict';

import React from 'react';
import fecha from 'fecha';
import Pikaday from 'pikaday';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import 'pikaday/css/pikaday.css';
import './datepicker.css';

const Datepicker = React.createClass({
  mixins: [Formsy.Mixin],

  componentWillMount() {
    const value = this.getValue();
    this.setState({ shownValue: value ? this.format(new Date(value)) : '' });
  },

  componentDidMount() {

    new Pikaday({
     field: React.findDOMNode(this.refs.input),
     onSelect: (date) => {
      date = new Date(date - date.getTimezoneOffset() * 60 * 1000);
      this.setValue(date.toISOString());
      this.setState({ shownValue: this.format(date) });
     }
    });

  },

  format(date) {
    return fecha.format(date, 'D MMM YYYY');
  },

  render() {
    return (
      <FRC.Row layout="horizontal" label={this.props.label} required={this.props.required}>
        <input
          ref="hidden"
          {...this.props}
          type="hidden"
          value={this.getValue()}
          label={null}
        />
        <input
          ref="input"
          className="form-control datepicker"
          readOnly
          value={this.state.shownValue}
          disabled={this.isFormDisabled() || this.props.disabled}
        />
      </FRC.Row>
    );
  }

});

export default Datepicker;
