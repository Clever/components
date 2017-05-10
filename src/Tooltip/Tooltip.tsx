import _ from "lodash";

import classnames from "classnames";
import BootstrapTooltip from "react-bootstrap/lib/Tooltip";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import * as React from "react";

import "./Tooltip.less";


const CLASSNAMES = {
  CONTENT: "Tooltip--content",
};

let NEXT_ID = 0;

/**
 * Standardized tooltip component with fade-in/out transition and customizable positioning.
 */
export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    // react-bootstrap Tooltips require an id. We simply autogenerate them with sequential numbers.
    this.id = `Tooltip-${NEXT_ID++}`;
  }

  id;

  render() {
    const {children, content, placement, textAlign} = this.props;

    const tooltip = (
      <BootstrapTooltip id={this.id}>
        <div className={classnames(CLASSNAMES.CONTENT, `${CLASSNAMES.CONTENT}--${textAlign}`, this.props.className)}>
          {content}
        </div>
      </BootstrapTooltip>
    );

    return (
      <OverlayTrigger overlay={tooltip} placement={placement}>
        {children}
      </OverlayTrigger>
    );
  }
}

export const ALIGN = {
  CENTER: "center",
  JUSTIFY: "justify",
  LEFT: "left",
  RIGHT: "right",
};

export const PLACEMENT = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
};

Tooltip.propTypes = {
  children:  React.PropTypes.node.isRequired,
  content:  React.PropTypes.node.isRequired,
  placement:  React.PropTypes.oneOf(_.values(PLACEMENT)),
  textAlign:  React.PropTypes.oneOf(_.values(ALIGN)),
  className: React.PropTypes.string,
};

Tooltip.defaultProps = {
  placement: "top",
  textAlign: "left",
};
