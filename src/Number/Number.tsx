import classnames from "classnames";
import numeral from "numeral";
import * as React from "react";
import shortNumber from "short-number";


const CLASSNAMES = {
  CONTAINER: "Number",
};

/**
 * Provides consistent number formatting for long numbers (e.g. 4123456 -> 4,123,456), with optional
 * shortening (e.g. 4123456 -> 4.1M).
 */
export default class Number extends React.PureComponent {
  static format(number, short = false) {
    const rawNumber = parseInt(number || 0, 10);

    if (isNaN(rawNumber)) {
      throw new Error("A number is required.");
    }

    return short
      ? shortNumber(rawNumber)
      : numeral(rawNumber).format("0,0");
  }

  render() {
    const {format} = Number;
    const {children, className, short} = this.props;

    return (
      <span className={classnames(CLASSNAMES, className)}>
        {format(children, short)}
      </span>
    );
  }
}

Number.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  className: React.PropTypes.string,
  short: React.PropTypes.bool,
};
