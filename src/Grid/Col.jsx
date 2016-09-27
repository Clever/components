import _ from "lodash";
import classnames from "classnames";
import React, {PropTypes} from "react";

import Size from "./Size";

require("../less/grid.less");


export default function Col({
  children,
  className,
  span,
  wrapperComponent: Wrapper,
  ...additionalProps,
}) {
  const {cssClass} = Col;
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
  span: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape(Col.colSpanPropShape),
  ]),
  wrapperComponent: PropTypes.any,
};

Col.defaultProps = {
  span: 1,
  wrapperComponent: "div",
};

Col.cssClass = {
  COL: "Grid--Col",
};
