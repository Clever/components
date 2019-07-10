import * as classnames from "classnames";
import * as numeral from "numeral";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as shortNumber from "short-number";

export interface Props {
  children?: number | string;
  className?: string;
  short?: boolean;
}

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  short: PropTypes.bool,
};

export const cssClass = {
  CONTAINER: "Number",
};

/**
 * Provides consistent number formatting for long numbers (e.g. 4123456 -> 4,123,456), with optional
 * shortening (e.g. 4123456 -> 4.1M).
 */
export default class Number extends React.PureComponent<Props> {
  static propTypes = propTypes;

  static format(num: number | string, short = false) {
    const rawNumber = parseInt(`${num || 0}`, 10);

    if (isNaN(rawNumber)) {
      throw new Error("A number is required.");
    }

    return short ? shortNumber(rawNumber) : numeral(rawNumber).format("0,0");
  }

  render() {
    const { format } = Number;
    const { children, className, short } = this.props;

    return (
      <span className={classnames(cssClass.CONTAINER, className)}>{format(children, short)}</span>
    );
  }
}
