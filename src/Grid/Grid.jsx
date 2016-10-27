import classnames from "classnames";
import React, {PropTypes} from "react";

import Col from "./Col";
import MorePropTypes from "../utils/MorePropTypes";
import Row from "./Row";
import Size from "./Size";

require("../less/grid.less");


export function Grid({
  className,
  children,
  wrapperComponent: Wrapper,
  ...additionalProps,
}) {
  const {cssClass} = Grid;

  return (
    <Wrapper className={classnames(cssClass.GRID, className)} {...additionalProps}>
      {children}
    </Wrapper>
  );
}

Grid.Row = Row;
Grid.Col = Col;
Grid.Size = Size;

Grid.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(Row)),
  className: PropTypes.string,
  wrapperComponent: PropTypes.any,
};

Grid.defaultProps = {
  wrapperComponent: "div",
};

Grid.cssClass = {
  GRID: "Grid",
};
