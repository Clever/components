import classnames from "classnames";
import React, {PropTypes} from "react";

import CodeSample from "./CodeSample";
import Demo from "./Demo";

import "./Example.less";


export default function Example({children: demo, className, code, title}) {
  const {cssClass} = Example;

  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      {title && <h3 className={cssClass.TITLE}>{title}</h3>}
      <Demo>
        {demo}
      </Demo>
      <CodeSample>
        {code}
      </CodeSample>
    </div>
  );
}

Example.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  code: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Example.cssClass = {
  CONTAINER: "Example",
  TITLE: "Example--title",
};