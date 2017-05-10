import classnames from "classnames";
import * as React from "react";

import Col from "./Col";
import MorePropTypes from "../utils/MorePropTypes";

import "../less/flex.less";
import "../less/grid.less";

const CLASSNAMES = {
  GROW: "flex--grow",
  ROW: "Grid--Row",
};

export default function Row({
  children,
  className,
  grow,
  wrapperComponent: Wrapper,
  ...additionalProps,
}) {
  return (
    <Wrapper
      className={classnames(CLASSNAMES.ROW, grow && CLASSNAMES.GROW, className)}
      {...additionalProps}
    >
      {children}
    </Wrapper>
  );
}

Row.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Col)),
  className:  React.PropTypes.string,
  grow:  React.PropTypes.bool,
  wrapperComponent:  React.PropTypes.any,
};

Row.defaultProps = {
  wrapperComponent: "div",
};
