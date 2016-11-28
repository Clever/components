import classnames from "classnames";
import Prism from "prismjs";
import React, {Component, PropTypes} from "react";
import stripIndentation from "strip-indent";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-less";

import "prismjs/themes/prism-solarizedlight.css";

import "./CodeSample.less";


export default class CodeSample extends Component {
  render() {
    const {cssClass} = CodeSample;
    const {children, className, type} = this.props;

    const codeSample = stripIndentation(children.replace(/(^\n+|\n\s*$)/g, ""));

    return (
      <code className={cssClass.CONTAINER}>
        <pre
          className={classnames(cssClass.CONTENT, "javascript", className)}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(codeSample, Prism.languages[type]),
          }}
          ref="code"
        />
      </code>
    );
  }
}

CodeSample.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["jsx", "less"]),
};

CodeSample.defaultProps = {
  type: "jsx",
};

CodeSample.cssClass = {
  CONTAINER: "Demo--CodeSample",
  CONTENT: "Demo--CodeSample--content",
};
