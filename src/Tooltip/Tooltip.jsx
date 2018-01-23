import _ from "lodash";

import classnames from "classnames";
import BootstrapTooltip from "react-bootstrap/lib/Tooltip";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import React, {Component, PropTypes} from "react";

import "./Tooltip.less";


/**
 * Standardized tooltip component with fade-in/out transition and customizable positioning.
 */
export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    // react-bootstrap Tooltips require an id. We simply autogenerate them with sequential numbers.
    this.id = `Tooltip-${Tooltip.nextID++}`;
  }

  render() {
    const {cssClass} = Tooltip;
    const {children, className, content, delayMs, hide, placement, textAlign, delayHideMs} = this.props;

    const tooltip = (
      <BootstrapTooltip id={this.id}>
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
        trigger={hide ? [] : ["focus", "hover"]}
      >
        {children}
      </OverlayTrigger>
    );
  }
}

Tooltip.nextID = 0;

Tooltip.Align = {
  CENTER: "center",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right",
};

Tooltip.Placement = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  delayMs: PropTypes.number,
  delayHideMs: PropTypes.number,
  hide: PropTypes.bool,
  placement: PropTypes.oneOf(_.values(Tooltip.Placement)),
  textAlign: PropTypes.oneOf(_.values(Tooltip.Align)),
  className: React.PropTypes.string,
};

Tooltip.defaultProps = {
  placement: "top",
  textAlign: "left",
};

Tooltip.cssClass = {
  CONTENT: "Tooltip--content",

  align: textAlign => `Tooltip--content--${textAlign}`,
};
