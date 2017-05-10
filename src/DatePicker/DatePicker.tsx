import moment from "moment";
import classnames from "classnames";
import * as React from "react";
import * as ReactDatePicker from "../../vendor/react-datepicker/dist/react-datepicker.min.js";

import "./DatePicker.less";

export default function DatePicker(props) {
  return (<ReactDatePicker
    {...props}
    inline
    calendarClassName={classnames("DatePicker", props.className)}
  />);
}

const dateType =  React.PropTypes.oneOfType([
  React.PropTypes.instanceOf(Date),
  React.PropTypes.instanceOf(moment),
]);

DatePicker.propTypes = { // A subset of the react-datepicker properties we support. Will maybe need to add more later
  className:  React.PropTypes.string,
  minDate: dateType,
  maxDate: dateType,
  selected: dateType,
};
