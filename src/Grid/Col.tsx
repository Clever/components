import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import Size from "./Size";

import "../less/grid.less";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  span?: number | { dflt?: number; s?: number; m?: number; l?: number };
  wrapperComponent?: any;
  // TODO: It's theoretically possible to make this component generic and type these extra props, but it's a pain
  [additionalProp: string]: any;
}

export const cssClass = {
  COL: "Grid--Col",
};

export default function Col({
  children,
  className,
  span,
  wrapperComponent: Wrapper,
  ...additionalProps
}: Props) {
  let colSpanClasses;
  if (typeof span === "number") {
    colSpanClasses = `${cssClass.COL}--${Size.DEFAULT}--${span}`;
  } else {
    colSpanClasses = _.map(Size, s => span[s] && `${cssClass.COL}--${s}--${span[s]}`);
  }

  return (
    <Wrapper className={classnames(cssClass.COL, colSpanClasses, className)} {...additionalProps}>
      {children}
    </Wrapper>
  );
}

// Define the shape of the `span` prop as a map from viewport `Size` to the associated span length.
Col.colSpanPropShape = {};
_.forEach(Size, size => {
  Col.colSpanPropShape[size] = PropTypes.number;
});

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  span: PropTypes.oneOfType([PropTypes.number, PropTypes.shape(Col.colSpanPropShape)]),
  wrapperComponent: PropTypes.any,
};

Col.defaultProps = {
  span: 1,
  wrapperComponent: "div",
};
