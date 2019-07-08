import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import Col from "./Col";
import MorePropTypes from "../utils/MorePropTypes";
import Row from "./Row";
import Size from "./Size";
import { ChildrenOf } from "../utils/types";

import "../less/grid.less";

export interface Props {
  children?: ChildrenOf<typeof Row>;
  className?: string;
  wrapperComponent?: any;
  // TODO: It's theoretically possible to make this component generic and type these extra props, but it's a pain
  [additionalProp: string]: any;
}

interface GridComponent extends React.FunctionComponent<Props> {
  Row: typeof Row;
  Col: typeof Col;
  Size: typeof Size;
}

export const cssClass = {
  GRID: "Grid",
};

export const Grid: GridComponent = function Grid({
  className,
  children,
  wrapperComponent: Wrapper,
  ...additionalProps
}) {
  return (
    <Wrapper className={classnames(cssClass.GRID, className)} {...additionalProps}>
      {children}
    </Wrapper>
  );
};

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
