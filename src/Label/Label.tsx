import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import Tooltip from "../Tooltip";

import "./Label.less";

export default class Label extends React.PureComponent {
  private label = React.createRef<HTMLSpanElement>();

  focus() {
    this.label.current.focus();
  }

  render() {
    const { cssClass } = Label;
    const {
      children,
      className,
      color,
      size,
      tooltip,
      tooltipPlacement,
      tooltipTextAlign,
    } = this.props;

    const label = (
      <span
        className={classnames(
          cssClass.CONTAINER,
          color && cssClass.color(color),
          size && cssClass.size(size),
          tooltip && cssClass.WITH_TOOLTIP,
          className,
        )}
        ref={this.label}
        tabIndex={tooltip ? 0 : undefined}
      >
        {children}
      </span>
    );

    if (!tooltip) {
      return label;
    }

    return (
      <Tooltip content={tooltip} placement={tooltipPlacement} textAlign={tooltipTextAlign}>
        {label}
      </Tooltip>
    );
  }
}

Label.Color = {
  // Primary:
  BLUE: "blue",

  // Neutrals:
  GRAY: "gray",

  // Alerts:
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",

  // Accents:
  AQUA: "aqua",
  PINK: "pink",
  PURPLE: "purple",
};

Label.Size = {
  S: "s",
  M: "m",
  L: "l",
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(_.values(Label.Color)),
  tooltip: PropTypes.node,
  tooltipPlacement: Tooltip.propTypes.placement,
  tooltipTextAlign: Tooltip.propTypes.textAlign,
  size: PropTypes.oneOf(_.values(Label.Size)),
};

Label.defaultProps = {
  color: Label.Color.GRAY,
  size: Label.Size.M,
};

Label.cssClass = {
  CONTAINER: "Label",
  WITH_TOOLTIP: "Label--withTooltip",

  color: c => `Label--${c}`,
  size: s => `Label--${s}`,
};
