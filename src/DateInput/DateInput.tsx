import moment from "moment";
import * as React from "react";
import classnames from "classnames";
import * as ReactDatePicker from "../../vendor/react-datepicker/dist/react-datepicker.min.js";

import "./DateInput.less";

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inFocus: false};
  }

  onChange(v) {
    this.input.blur();
    this.props.onChange(v);
  }

  input;

  render() {
    let wrapperClass = "DateInput";

    // add additional wrapper classes
    if (this.props.error) wrapperClass += " DateInput--hasError";

    // TODO:  throw error for mutually exclusive states
    if (this.props.disabled) {
      wrapperClass += " DateInput--disabled";
    } else if (this.state.inFocus) {
      wrapperClass += " DateInput--inFocus";
    }

    // placeholder shown
    if (!this.props.value && this.props.placeholder) {
      wrapperClass += " DateInput--placeholder-shown";
    }

    // note on the upper right corner
    let inputNote;
    if (this.props.required) {
      inputNote = <span className="DateInput--required">required</span>;
    }
    if (this.props.error) {
      inputNote = <span className="DateInput--error">{this.props.error}</span>;
    }


    return (
      <div className={classnames(wrapperClass, this.props.className)}>
        <div className="DateInput--infoRow">
          <label className="DateInput--label" htmlFor={this.props.name}>{this.props.label}</label>
          {inputNote}
        </div>
        <ReactDatePicker
          ref="input"
          className="DateInput--input"
          calendarClassName="DatePicker"
          disabled={this.props.disabled}
          name={this.props.name}
          onFocus={() => this.setState({inFocus: true})}
          onBlur={() => this.setState({inFocus: false})}
          placeholderText={this.props.placeholder}
          required={this.props.required}
          onSelect={this.props.onChange}
          selected={this.props.value}
          minDate={this.props.min}
          maxDate={this.props.max}
        />
      </div>
    );
  }
}

const dateType = React.PropTypes.oneOfType([
  React.PropTypes.instanceOf(Date),
  React.PropTypes.instanceOf(moment),
]);

DateInput.propTypes = {
  disabled: React.PropTypes.bool,
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  placeholder: React.PropTypes.node,
  required: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: dateType,
  className: React.PropTypes.string,
  min: dateType,
  max: dateType,
};
