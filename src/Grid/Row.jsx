import classnames from "classnames";
import React, {PropTypes} from "react";

import Col from "./Col";

require("../less/flex.less");
require("../less/grid.less");


export default function Row({
  children,
  className,
  grow,
  wrapperComponent: Wrapper,
  ...additionalProps,
}) {
  const {cssClass} = Row;

  return (
    <Wrapper
      className={classnames(cssClass.ROW, grow && cssClass.GROW, className)}
      {...additionalProps}
    >
      {children}
    </Wrapper>
  );
}

Row.colPropType = (props, propName) => {
  const value = props[propName];

  if (value === null || value === undefined) {
    return null;
  }

  if (!value.type || value.type !== Col) {
    return new Error("All children of the Row should be `Col` components.");
  }

  return null;
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    Row.colPropType,
    PropTypes.arrayOf(Row.colPropType),
  ]),
  className: PropTypes.string,
  grow: PropTypes.bool,
  wrapperComponent: PropTypes.any,
};

Row.defaultProps = {
  wrapperComponent: "div",
};

Row.cssClass = {
  GROW: "flex--grow",
  ROW: "Grid--Row",
};
