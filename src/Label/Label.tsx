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
} as const;

const Size = {
  S: "s",
  M: "m",
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
  color: Color.GRAY,
  size: Size.M,
};

export const cssClass = {
  CONTAINER: "Label",
  WITH_TOOLTIP: "Label--withTooltip",

  color: c => `Label--${c}`,
  size: s => `Label--${s}`,
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
