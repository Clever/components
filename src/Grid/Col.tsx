import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import Size from "./Size";

import "../less/grid.less";


const CLASSNAMES = {
  COL: "Grid--Col",
};

export default function Col({
  children,
  className,
  span,
  wrapperComponent: Wrapper,
  ...additionalProps,
}) {
  let colSpanClasses;
  if (typeof span === "number") {
    colSpanClasses = `${CLASSNAMES.COL}--${Size.DEFAULT}--${span}`;
  } else {
    colSpanClasses = _.map(Size, s => span[s] && `${CLASSNAMES.COL}--${s}--${span[s]}`);
  }

  return (
    <Wrapper className={classnames(CLASSNAMES.COL, colSpanClasses, className)} {...additionalProps}>
      {children}
    </Wrapper>
  );
}

// Define the shape of the `span` prop as a map from viewport `Size` to the associated span length.
const COL_SPAN_SHAPE = {};
_.forEach(Size, size => {
  COL_SPAN_SHAPE[size] = React.PropTypes.number;
});

Col.propTypes = {
  children:  React.PropTypes.node,
  className:  React.PropTypes.string,
  span:  React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.shape(COL_SPAN_SHAPE),
  ]),
  wrapperComponent:  React.PropTypes.any,
};

Col.defaultProps = {
  span: 1,
  wrapperComponent: "div",
};
