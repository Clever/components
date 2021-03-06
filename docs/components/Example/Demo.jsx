import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

import "./Demo.less";

export default function Demo({ children, className }) {
  const { cssClass } = Demo;

  return <div className={classnames(cssClass.CONTAINER, className)}>{children}</div>;
}

Demo.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Demo.cssClass = {
  CONTAINER: "Demo",
};
