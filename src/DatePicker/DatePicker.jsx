import moment from "moment";
import classnames from "classnames";
import React, {PropTypes} from "react";
import ReactDatePicker from "react-datepicker";

import "./DatePicker.less";

export default function DatePicker(props) {
  return (<ReactDatePicker
    {...props}
    inline
    calendarClassName={classnames("DatePicker", props.className)}
  />);
}

const dateType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.instanceOf(moment),
]);

DatePicker.propTypes = { // A subset of the react-datepicker properties we support. Will maybe need to add more later
  className: PropTypes.string,
  minDate: dateType,
  maxDate: dateType,
  selected: dateType,
};
