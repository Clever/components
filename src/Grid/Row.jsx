import classnames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import Col from "./Col";
import MorePropTypes from "../utils/MorePropTypes";

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

Row.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Col)),
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
