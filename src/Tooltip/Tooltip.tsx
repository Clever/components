import * as _ from "lodash";

import * as classnames from "classnames";
import * as BootstrapTooltip from "react-bootstrap/lib/Tooltip";
import * as OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Values } from "../utils/types";

import "./Tooltip.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  clickTrigger?: boolean;
  content: React.ReactNode;
  delayHideMs?: number;
  delayMs?: number;
  hide?: boolean;
  placement?: Values<typeof Placement>;
  textAlign?: Values<typeof Align>;
  tooltipClassName?: string;
}

const nextID = 0;

const Align = {
  CENTER: "center",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right",
} as const;

const Placement = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
} as const;

const propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  delayMs: PropTypes.number,
  delayHideMs: PropTypes.number,
  hide: PropTypes.bool,
  clickTrigger: PropTypes.bool,
  placement: PropTypes.oneOf(_.values(Placement)),
  textAlign: PropTypes.oneOf(_.values(Align)),
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
};

const defaultProps = {
  placement: "top",
  textAlign: "left",
};

export const cssClass = {
  CONTENT: "Tooltip--content",
  FOCUSABLE_TRIGGER: "Tooltip--focusable-trigger",

  align: textAlign => `Tooltip--content--${textAlign}`,
};

/**
 * Standardized tooltip component with fade-in/out transition and customizable positioning.
 */
export default class Tooltip extends React.Component<Props> {
  static nextID = nextID;
  static Align = Align;
  static Placement = Placement;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    // react-bootstrap Tooltips require an id. We simply autogenerate them with sequential numbers.
    this.id = `Tooltip-${Tooltip.nextID++}`;
  }

  id: string;

  render() {
    const {
      children,
      className,
      content,
      delayMs,
      hide,
      clickTrigger,
      tooltipClassName,
      placement,
      textAlign,
      delayHideMs,
    } = this.props;

    const tooltip = (
      <BootstrapTooltip id={this.id} className={tooltipClassName}>
        <div className={classnames(cssClass.CONTENT, cssClass.align(textAlign), className)}>
          {content}
        </div>
      </BootstrapTooltip>
    );

    return (
      <OverlayTrigger
        delayShow={delayMs}
        delayHide={delayHideMs}
        overlay={tooltip}
        placement={placement}
        rootClose
        trigger={hide ? [] : ["focus", clickTrigger ? "click" : "hover"]}
      >
        <span
          className={cssClass.FOCUSABLE_TRIGGER}
          onMouseDown={e => e.preventDefault()}
          tabIndex={0}
        >
          {children}
        </span>
      </OverlayTrigger>
    );
  }
}
