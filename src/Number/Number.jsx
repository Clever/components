import classnames from "classnames";
import numeral from "numeral";
import React, {PropTypes, PureComponent} from "react";
import shortNumber from "short-number";


/**
 * Provides consistent number formatting for long numbers (e.g. 4123456 -> 4,123,456), with optional
 * shortening (e.g. 4123456 -> 4.1M).
 */
export default class Number extends PureComponent {
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
    const {cssClass, format} = Number;
    const {children, className, short} = this.props;

    return (
      <span className={classnames(cssClass.CONTAINER, className)}>
        {format(children, short)}
      </span>
    );
  }
}

Number.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  short: PropTypes.bool,
};

Number.cssClass = {
  CONTAINER: "Number",
};
