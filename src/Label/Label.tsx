import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import {Tooltip} from "../Tooltip";

import "./Label.less";

const CLASSNAMES = {
  CONTAINER: "Label",
  WITH_TOOLTIP: "Label--withTooltip",

  color: c => `Label--${c}`,
  size: s => `Label--${s}`,
};

export default class Label extends React.PureComponent {
  focus() {
    if (this.refs.label) {
      this.refs.label.focus();
    }
  }

  render() {
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
          CLASSNAMES.CONTAINER,
          color && CLASSNAMES.color(color),
          size && CLASSNAMES.size(size),
          tooltip && CLASSNAMES.WITH_TOOLTIP,
          className
        )}
        ref="label"
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

export const COLORS = {
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

export const SIZES = {
  S: "s",
  M: "m",
  L: "l",
};

Label.propTypes = {
  children:  React.PropTypes.node.isRequired,
  className:  React.PropTypes.string,
  color:  React.PropTypes.oneOf(_.values(COLORS)),
  tooltip:  React.PropTypes.node,
  tooltipPlacement: Tooltip.propTypes.placement,
  tooltipTextAlign: Tooltip.propTypes.textAlign,
  size:  React.PropTypes.oneOf(_.values(SIZES)),
};

Label.defaultProps = {
  color: COLORS.GRAY,
  size: SIZES.M,
};
