import * as classnames from "classnames";
import * as numeral from "numeral";
import * as React from "react";
import * as PropTypes from "prop-types";

export interface Props {
  children?: number | string;
  className?: string;
  zeroIsFree?: boolean;
  alwaysShowCents?: boolean;
}

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  zeroIsFree: PropTypes.bool,
  alwaysShowCents: PropTypes.bool,
};

export const cssClass = {
  CONTAINER: "DollarAmount",
};

/**
 * Provides consistent dollar value formatting (e.g. 4123456 -> $4,123,456)
 */
export default class DollarAmount extends React.PureComponent<Props> {
  static propTypes = propTypes;

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
    const { format } = DollarAmount;
    const { children, className, zeroIsFree, alwaysShowCents } = this.props;

    return (
      <span className={classnames(cssClass.CONTAINER, className)}>
        {format(children, zeroIsFree, alwaysShowCents)}
      </span>
    );
  }
}
