import moment from "moment";
import React from "react";
import classnames from "classnames";
import ReactDatePicker from "../../vendor/react-datepicker/dist/react-datepicker.min.js";
import ReactDateTime from "react-datetime";

import "./DateInput.less";

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inFocus: false};

    this.isValidDate = this.isValidDate.bind(this);
  }

  onChange(v) {
    this.input.blur();
    this.props.onChange(v);
  }

  isValidDate(current) {
    let afterMin = true;
    let beforeMax = true;
    if (this.props.min) {
      afterMin = current.isSameOrAfter(this.props.min);
    }
    if (this.props.max) {
      beforeMax = current.isSameOrBefore(this.props.max);
    }
    return afterMin && beforeMax;
  }

  render() {
    const classes = ["DateInput"];

    // add additional wrapper classes
    if (this.props.error) {
      classes.push("DateInput--hasError");
    }

    // TODO:  throw error for mutually exclusive states
    if (this.props.readOnly) {
      classes.push("DateInput--readonly");
    } else if (this.props.disabled) {
      classes.push("DateInput--disabled");
    } else if (this.state.inFocus) {
      classes.push("DateInput--inFocus");
    }

    // placeholder shown
    if (!this.props.value && this.props.placeholder) {
      classes.push("DateInput--placeholder-shown");
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
      <div className={classnames(classes, this.props.className)}>
        <div className="DateInput--infoRow">
          <label className="DateInput--label" htmlFor={this.props.name}>{this.props.label}</label>
          {inputNote}
        </div>
        {this.props.useTime ?
          <ReactDateTime
            className="DateTimePicker"
            onChange={this.props.onChange}
            value={this.props.value}
            onBlur={() => this.setState({inFocus: false})}
            onFocus={() => this.setState({inFocus: true})}
            isValidDate={this.isValidDate}
            inputProps={{
              className: "DateInput--input",
              placeholder: this.props.placeholder,
              name: this.props.name,
              disabled: this.props.disabled || this.props.readOnly,
              required: this.props.required,
            }}
          /> :
          <ReactDatePicker
            calendarClassName="DatePicker"
            className="DateInput--input"
            disabled={this.props.disabled || this.props.readOnly}
            maxDate={this.props.max}
            minDate={this.props.min}
            name={this.props.name}
            onBlur={() => this.setState({inFocus: false})}
            onFocus={() => this.setState({inFocus: true})}
            onSelect={this.props.onChange}
            placeholderText={this.props.placeholder}
            readOnly={this.props.readOnly}
            ref="input"
            required={this.props.required}
            selected={this.props.value}
          />
        }
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
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: dateType,
  className: React.PropTypes.string,
  min: dateType,
  max: dateType,
  useTime: React.PropTypes.bool,
};
