import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import "./GoalsLogo.less";

const Size = {
  S: "small",
  M: "medium",
  L: "large",
};

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
};

const SizeClass = {
  [Size.S]: "text--large",
  [Size.M]: "text--huge",
  [Size.L]: "text--gargantuan",
};

const cssClass = {
  CONTAINER: "GoalsLogo",
  PROGRESS_BAR_INNER: "GoalsLogo--progressBar--inner",
  PROGRESS_BAR: "GoalsLogo--progressBar",
  TEXT: "GoalsLogo--text",
};

/**
 * Brand logo for the Clever Goals product.
 */
export default class GoalsLogo extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;
  static Size = Size;

  static defaultProps = {
    size: Size.M,
  };

  render() {
    const {className, size} = this.props;

    return (
      <div className={classnames(cssClass.CONTAINER, SizeClass[size], className)}>
        <div className={cssClass.TEXT}>Goals</div>
        <div className={cssClass.PROGRESS_BAR}>
          <div className={cssClass.PROGRESS_BAR_INNER} />
        </div>
      </div>
    );
  }
}
