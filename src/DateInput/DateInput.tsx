import * as moment from "moment";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import * as ReactDateTime from "react-datetime";

import { FormElementSize, formElementSizeClassName, Size } from "../utils/Forms";
import { Values } from "../utils/types";

import "./DateInput.less";
import "../less/forms.less";

export interface Props {
  disabled?: boolean;
  error?: string;
  label?: string;
  name: string;
  onChange?: (...args: any[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
  value?: moment.Moment;
  className?: string;
  min?: moment.Moment;
  max?: moment.Moment;
  useTime?: boolean;
  popperPlacement?: Values<typeof popperPlacementPositions>;
  size?: Size;
  dateFormat?: string[];
}

interface State {
  hasBeenFocused: boolean;
  inFocus: boolean;
}

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
} as const;

const dateType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.instanceOf(moment as any),
]);

const propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
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
  dateFormat: PropTypes.arrayOf(PropTypes.string),
};

export default class DateInput extends React.Component<Props, State> {
  static propTypes = propTypes;
  static popperPlacementPositions = popperPlacementPositions;

  static defaultProps = {
    size: FormElementSize.FULL_WIDTH,
  };

  constructor(props: Props) {
    super(props);
    this.state = { inFocus: false, hasBeenFocused: false };

    this.isValidDate = this.isValidDate.bind(this);
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
      inputNote = (
        <span
          className={`DateInput--${
            this.state.hasBeenFocused && !this.props.value ? "error" : "required"
          }`}
        >
          required
        </span>
      );
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
            onBlur={() => this.setState({ inFocus: false, hasBeenFocused: true })}
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
            onBlur={() => this.setState({ inFocus: false, hasBeenFocused: true })}
            onFocus={() => this.setState({ inFocus: true })}
            placeholderText={this.props.placeholder}
            readOnly={this.props.readOnly}
            required={this.props.required}
            selected={this.props.value}
            popperClassName="DatePicker--Popper"
            popperPlacement={this.props.popperPlacement}
            onChange={this.props.onChange}
            dateFormat={this.props.dateFormat}
          />
        )}
      </div>
    );
  }
}
