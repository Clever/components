import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Col from "./Col";
import MorePropTypes from "../utils/MorePropTypes";
import { ChildrenOf } from "../utils/types";

import "../less/flex.less";
import "../less/grid.less";

export interface Props {
  children?: ChildrenOf<typeof Col>;
  className?: string;
  grow?: boolean;
  wrapperComponent?: any;
  [additionalProp: string]: any;
}

export const cssClass = {
  GROW: "flex--grow",
  ROW: "Grid--Row",
};

export default function Row({
  children,
  className,
  grow,
  wrapperComponent: Wrapper,
  ...additionalProps
}: Props) {
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
