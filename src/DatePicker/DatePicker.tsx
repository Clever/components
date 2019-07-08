import * as classnames from "classnames";
import * as React from "react";
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
};
