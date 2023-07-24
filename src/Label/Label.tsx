import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import Tooltip from "../Tooltip";
import { Values } from "../utils/types";

import "./Label.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  color?: Values<typeof Color>;
  tooltip?: React.ReactNode;
  tooltipPlacement?: Values<typeof Tooltip.Placement>;
  tooltipTextAlign?: Values<typeof Tooltip.Align>;
  size?: Values<typeof Size>;
}

const Color = {
  // General:
  DEFAULT: "default",
  INFO: "info",
  NEW_FEATURE: "new-feature",

  // Alerts:
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",

  // Accents:
  CATEGORY_1: "new-feature",
  CATEGORY_2: "category-2",
  TAG: "tag",

  // For backwards compatibility:
  BLUE: "new-feature",
  AQUA: "new-feature",
  PURPLE: "new-feature",
  PINK: "category-2",
  GRAY: "default",
} as const;

// We are reducing the options from S/M/L to only S/L so
// here we map M -> s for backwards compatibility.
const Size = {
  S: "s",
  M: "s",
  L: "l",
} as const;

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(_.values(Color)),
  tooltip: PropTypes.node,
  tooltipPlacement: Tooltip.propTypes.placement,
  tooltipTextAlign: Tooltip.propTypes.textAlign,
  size: PropTypes.oneOf(_.values(Size)),
};

const defaultProps = {
  color: Color.DEFAULT,
  size: Size.S,
};

export const cssClass = {
  CONTAINER: "Label",
  WITH_TOOLTIP: "Label--withTooltip",

  color: (c) => `Label--${c}`,
  size: (s) => `Label--${s}`,
};

export default class Label extends React.PureComponent<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static Color = Color;
  static Size = Size;

  private label = React.createRef<HTMLSpanElement>();

  focus() {
    this.label.current.focus();
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
