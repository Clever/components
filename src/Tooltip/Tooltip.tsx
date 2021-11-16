import * as _ from "lodash";

import * as classnames from "classnames";
import * as BootstrapTooltip from "react-bootstrap/lib/Tooltip";
import * as Overlay from "react-bootstrap/lib/Overlay";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Values } from "../utils/types";

import "./Tooltip.less";

export interface Props {
  children: React.ReactElement;
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

interface State {
  showTooltip: boolean;
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
  align: (textAlign) => `Tooltip--content--${textAlign}`,
};

/**
 * Standardized tooltip component with fade-in/out transition and customizable positioning.
 */
export default class Tooltip extends React.Component<Props, State> {
  static nextID = nextID;
  static Align = Align;
  static Placement = Placement;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      showTooltip: false,
    };

    // react-bootstrap Tooltips require an id. We simply autogenerate them with sequential numbers.
    this.id = `Tooltip-${Tooltip.nextID++}`;
  }

  id: string;
  private tooltipTarget = React.createRef();

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

    const handleShowTooltip = () => {
      if (hide) return;
      setTimeout(() => this.setState({ showTooltip: true }), delayMs);
    };
    const handleHideTooltip = () => {
      if (hide) return;
      setTimeout(() => this.setState({ showTooltip: false }), delayHideMs);
    };
    const handleOnClick = this.state.showTooltip ? handleHideTooltip : handleShowTooltip;

    const tooltip = (
      <BootstrapTooltip
        id={this.id}
        className={tooltipClassName}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
      >
        <div className={classnames(cssClass.CONTENT, cssClass.align(textAlign), className)}>
          {content}
        </div>
      </BootstrapTooltip>
    );

    const child = React.Children.only(children);

    return (
      <>
        {React.cloneElement(child, {
          ref: this.tooltipTarget,
          tabIndex: 0,
          "aria-describedby": this.id,
          className: cssClass.FOCUSABLE_TRIGGER,
          onFocus: handleShowTooltip,
          onBlur: handleHideTooltip,
          onMouseEnter: clickTrigger ? undefined : handleShowTooltip,
          onMouseLeave: clickTrigger ? undefined : handleHideTooltip,
          onMouseDown: !clickTrigger || hide ? undefined : handleOnClick,
          ...child.props,
        })}
        <Overlay
          target={this.tooltipTarget.current}
          onHide={handleHideTooltip}
          show={this.state.showTooltip}
          placement={placement}
          rootClose
        >
          {tooltip}
        </Overlay>
      </>
    );
  }
}
