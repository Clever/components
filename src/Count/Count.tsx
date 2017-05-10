import classnames from "classnames";
import * as React from "react";

import Number from "../Number";


const CLASSNAMES = {
  CONTAINER: "Count",
};

/**
 * Provides a convenient wrapper for displaying counts of things.
 * Renders a span containing a formatted number, using the `Number` component, followed by the given
 * singular or plural form of the subject, depending on the number.
 *
 * Specify a `zeroOverride` to provide an override message to be displayed in the zero case.
 *
 * Usage:
 *   const things = [1, 2, 3];
 *   <Count number={things.length} singular="thing">things</Count>
 *   // results in:
 *   <span>3 things</span>
 */
export default class Count extends React.PureComponent {
  static format({number, plural, short, singular, zeroOverride}) {
    const displayNumber = Number.format(number, short);
    const rawNumber = parseInt(number || 0, 10);

    if (rawNumber === 1) {
      return `${displayNumber} ${singular}`;
    }

    if (rawNumber === 0 && zeroOverride) {
      return zeroOverride;
    }

    const defaultPlural = `${singular}s`;
    return `${displayNumber} ${plural || defaultPlural}`;
  }

  render() {
    const {format} = Count;
    const {children, className, plural, short, singular, zeroOverride} = this.props;

    return (
      <span className={classnames(CLASSNAMES.CONTAINER, className)}>
        {format({number: children, plural, short, singular, zeroOverride})}
      </span>
    );
  }
}

Count.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  className: React.PropTypes.string,
  plural: React.PropTypes.string,
  singular: React.PropTypes.string.isRequired,
  short: React.PropTypes.bool,
  zeroOverride: React.PropTypes.string,
};
