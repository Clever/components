import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import "./DatePicker.less";

export interface Props extends ReactDatePickerProps {}

export default function DatePicker(props: Props) {
  return (
    <ReactDatePicker
      {...props}
      inline
      calendarClassName={classnames("DatePicker", props.className)}
    />
  );
}

DatePicker.propTypes = {
  ...ReactDatePicker.propTypes,
  // This is incorrectly marked as required in ReactDatePicker.propTypes.
  dropdownMode: PropTypes.oneOf(["scroll", "select"]),
};
