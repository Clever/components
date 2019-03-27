import React from "react";
import * as PropTypes from "prop-types";

/**
 * ExampleCode allows you to specify what portion of code to reveal in the code
 * window.
 */
export default function ExampleCode({ children, style }) {
  return <div style={style}>{children}</div>;
}

ExampleCode.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
