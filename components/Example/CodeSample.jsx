import classnames from "classnames";
import Prism from "prismjs";
import React, {Component, PropTypes} from "react";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-less";

import "prismjs/themes/prism-solarizedlight.css";

import "./CodeSample.less";


export default class CodeSample extends Component {
  static stripIndentation(code) {
    const indents = code.match(/^[ \t]*(?=\S)/gm);
    if (!indents) {
      return code;
    }

    // Strip indentation up to the shortest indentation in the given code sample.
    const shortestIndentLength = Math.min(...indents.map(indent => indent.length));
    const shortestIndentRegex = new RegExp(`^[ \\t]{${shortestIndentLength}}`, "gm");

    return code.replace(shortestIndentRegex, "");
  }

  getCodeSample() {
    const rawCode = this.props.children || "";
    return CodeSample.stripIndentation(rawCode.replace(/(^\n+|\n\s*$)/g, ""));
  }

  render() {
    const {cssClass} = CodeSample;
    const {className, type} = this.props;

    return (
      <code className={cssClass.CONTAINER}>
        <pre
          className={classnames(cssClass.CONTENT, "javascript", className)}
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(this.getCodeSample(), Prism.languages[type]),
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
