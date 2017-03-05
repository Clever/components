import _ from "lodash";

import classnames from "classnames";
import BootstrapTooltip from "react-bootstrap/lib/Tooltip";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import React, {Component, PropTypes} from "react";

require("./Tooltip.less");


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
    const {children, content, placement, textAlign} = this.props;

    const tooltip = (
      <BootstrapTooltip id={this.id}>
        <div className={classnames(cssClass.CONTENT, `${cssClass.CONTENT}--${textAlign}`)}>
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
  placement: PropTypes.oneOf(_.values(Tooltip.Placement)),
  textAlign: PropTypes.oneOf(_.values(Tooltip.Align)),
};

Tooltip.defaultProps = {
  placement: "top",
  textAlign: "left",
};

Tooltip.cssClass = {
  CONTENT: "Tooltip--content",
};
