import React, {PropTypes} from "react";


/**
 * ExampleCode allows you to specify what portion of code to reveal in the code
 * window.
 */
export default function ExampleCode({children}) {
  return <div>{children}</div>;
}

ExampleCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
