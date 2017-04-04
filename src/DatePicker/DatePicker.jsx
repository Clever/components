import classnames from "classnames";
import moment from "moment";
import React, {Component, PropTypes} from "react";
import DatePicker from "react-datepicker";

import {FlexBox, FlexItem, ItemAlign} from "../flex";
import FontAwesome from "react-fontawesome";

import "./DatePicker.less";

class DatePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.value ? moment(this.props.value) : moment(),
    };
  }

  _onChange(newDate) {
    this.setState({selected: newDate});
    if (this.props.onChange) {
      this.props.onChange(newDate);
    }
  }

  render() {
    const {cssClass} = DatePickerComponent;
    const {title, className, onClose, datePickerProps, footer} = this.props;
    const {selected} = this.state;

    return (
      <div className={classnames(cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.HEADER} alignItems={ItemAlign.CENTER}>
          <span className={cssClass.TITLE}>{title}</span>
          <FlexItem grow />
          <FlexItem onClick={onClose}>
            <FontAwesome className={cssClass.CLOSE_BUTTON} name="times" />
          </FlexItem>
        </FlexBox>
        <div className={cssClass.DATE_INPUT}>
          <DatePicker
            inline
            selected={selected}
            onChange={d => this._onChange(d)}
            {...datePickerProps}
          />
        </div>
        {footer}
      </div>
    );
  }
}

DatePickerComponent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  footer: PropTypes.node,
  datePickerProps: PropTypes.object,
};

DatePickerComponent.cssClass = {
  CONTAINER: "DatePicker",
  HEADER: "DatePicker--Header",
  TITLE: "DatePicker--Title",
  CLOSE_BUTTON: "DatePicker--Close",
  DATE_INPUT: "DatePicker--DateInput",
};

export {
  DatePickerComponent as default,
  DatePickerComponent as DatePicker,
};
