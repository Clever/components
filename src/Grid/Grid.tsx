import classnames from "classnames";
import * as React from "react";

import Row from "./Row";
import MorePropTypes from "../utils/MorePropTypes";

import "../less/grid.less";

const CLASSNAMES = {
  GRID: "Grid",
};

export function Grid({
  className,
  children,
  wrapperComponent: Wrapper,
  ...additionalProps,
}) {
  return (
    <Wrapper className={classnames(CLASSNAMES.GRID, className)} {...additionalProps}>
      {children}
    </Wrapper>
  );
}

Grid.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Row)),
  className:  React.PropTypes.string,
  wrapperComponent:  React.PropTypes.any,
};

Grid.defaultProps = {
  wrapperComponent: "div",
};

export {default as Col} from "./Col";
export {default as Row} from "./Row";
export {default as Size} from "./Size";
