import classnames from "classnames";
import numeral from "numeral";
import * as React from "react";


const CLASSNAMES = {
  CONTAINER: "DollarAmount",
};

/**
 * Provides consistent dollar value formatting (e.g. 4123456 -> $4,123,456)
 */
export default class DollarAmount extends React.PureComponent {
  static format(number, zeroIsFree = false, alwaysShowCents = false) {
    const rawNumber = parseFloat(number || 0);

    if (isNaN(rawNumber)) {
      throw new Error("A number is required.");
    }

    if (rawNumber === 0 && zeroIsFree) {
      return "Free";
    }

    const format = alwaysShowCents ? "$0,0.00" : "$0,0[.]00";
    return numeral(rawNumber).format(format);
  }

  render() {
    const {format} = DollarAmount;
    const {children, className, zeroIsFree, alwaysShowCents} = this.props;

    return (
      <span className={classnames(CLASSNAMES.CONTAINER, className)}>
        {format(children, zeroIsFree, alwaysShowCents)}
      </span>
    );
  }
}

DollarAmount.propTypes = {
  children:  React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  className:  React.PropTypes.string,
  zeroIsFree:  React.PropTypes.bool,
  alwaysShowCents:  React.PropTypes.bool,
};
