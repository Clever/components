import * as moment from "moment";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import "./DatePicker.less";

export interface Props {
  className?: string;

  // The following are the subset of react-datepicker props that this component supports.
  // More can be added here as needed.
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  onChange(date: moment.Moment | null, event: React.SyntheticEvent<any> | undefined): void;
  selected?: moment.Moment | null;
}

export default function DatePicker(props: Props) {
  return (
    <ReactDatePicker
      {...props}
      inline
      calendarClassName={classnames("DatePicker", props.className)}
    />
  );
}

const dateType = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.instanceOf(moment as any),
]);

DatePicker.propTypes = {
  className: PropTypes.string,

  // The following are the subset of react-datepicker props that this component supports.
  // More can be added here as needed.
  maxDate: dateType,
  minDate: dateType,
  onChange: PropTypes.func.isRequired,
  selected: dateType,
};
