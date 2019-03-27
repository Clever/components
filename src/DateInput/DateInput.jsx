import moment from "moment";
import React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import ReactDateTime from "react-datetime";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";

import "./DateInput.less";
import "../less/forms.less";

const popperPlacementPositions = {
  BOTTOM: "bottom",
  BOTTOM_END: "bottom-end",
  BOTTOM_START: "bottom-start",
  LEFT: "left",
  LEFT_END: "left-end",
  LEFT_START: "left-start",
  RIGHT: "right",
  RIGHT_END: "right-end",
  RIGHT_START: "right-start",
  TOP: "top",
  TOP_END: "top-end",
  TOP_START: "top-start",
};

export default class DateInput extends React.Component {
  static popperPlacementPositions = popperPlacementPositions;

  static defaultProps = {
    size: FormElementSize.FULL_WIDTH,
  };

  constructor(props) {
    super(props);
    this.state = { inFocus: false };

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
      <div
        className={classnames(
          classes,
          formElementSizeClassName(this.props.size),
          this.props.className,
        )}
      >
        <div className="DateInput--infoRow">
          <label className="DateInput--label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
          {inputNote}
        </div>
        {this.props.useTime ? (
          <ReactDateTime
            className="DateTimePicker"
            onChange={this.props.onChange}
            value={this.props.value}
            onBlur={() => this.setState({ inFocus: false })}
            onFocus={() => this.setState({ inFocus: true })}
            isValidDate={this.isValidDate}
            inputProps={{
              className: "DateInput--input",
              placeholder: this.props.placeholder,
              name: this.props.name,
              disabled: this.props.disabled || this.props.readOnly,
              required: this.props.required,
            }}
          />
        ) : (
          <ReactDatePicker
            fixedHeight
            calendarClassName="DatePicker"
            className="DateInput--input"
            disabled={this.props.disabled || this.props.readOnly}
            maxDate={this.props.max}
            minDate={this.props.min}
            name={this.props.name}
            onBlur={() => this.setState({ inFocus: false })}
            onFocus={() => this.setState({ inFocus: true })}
            onSelect={this.props.onChange}
            placeholderText={this.props.placeholder}
            readOnly={this.props.readOnly}
            ref="input"
            required={this.props.required}
            selected={this.props.value}
            popperClassName="DatePicker--Popper"
            popperPlacement={this.props.popperPlacement}
          />
        )}
      </div>
    );
  }
}

const dateType = PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.instanceOf(moment)]);

DateInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: dateType,
  className: PropTypes.string,
  min: dateType,
  max: dateType,
  useTime: PropTypes.bool,
  popperPlacement: PropTypes.oneOf(Object.values(popperPlacementPositions)),
  size: PropTypes.oneOf(Object.values(FormElementSize)),
};
