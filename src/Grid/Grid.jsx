import classnames from "classnames";
import React, {PropTypes} from "react";

import Col from "./Col";
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

Grid.rowPropType = (props, propName) => {
  const value = props[propName];

  if (value === null || value === undefined) {
    return null;
  }

  if (!value.type || value.type !== Row) {
    return new Error("All children of the Grid should be `Row` components.");
  }

  return null;
};

Grid.propTypes = {
  children: PropTypes.oneOfType([
    Grid.rowPropType,
    PropTypes.arrayOf(Grid.rowPropType),
  ]),
  className: PropTypes.string,
  wrapperComponent: PropTypes.any,
};

Grid.defaultProps = {
  wrapperComponent: "div",
};

Grid.cssClass = {
  GRID: "Grid",
};
