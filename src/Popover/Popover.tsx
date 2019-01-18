import * as _ from "lodash";

import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import * as OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import * as BootstrapPopover from "react-bootstrap/lib/Popover";


import "./Popover.less";

const Placement = {
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
};

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.node.isRequired,
  delayMs: PropTypes.number,
  delayHideMs: PropTypes.number,
  hide: PropTypes.bool,
  placement: PropTypes.oneOf(_.values(Placement)),
  title: PropTypes.node,
};

const cssClass = {
  POPOVER: "Popover--component",
  CONTENT: "Popover--content",
  placement: placement => `Popover--positioned--${placement}`,
};

let nextID = 0;


/**
 * TODO: Add short description.
 */
export default class Popover extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;
  static Placement = Placement;

  static id = `Popover-${nextID++}`;


  render() {
    const {children, className, content, delayMs, delayHideMs, placement, title} = this.props;

    const popover = (
      <BootstrapPopover
        className={cssClass.POPOVER}
        title={title}
        id={Popover.id}
      >
          <div
            className={classnames(cssClass.CONTENT, className)}
          >
            {content}
          </div>
      </BootstrapPopover>
    );


    return (
      <OverlayTrigger
        delayShow={delayMs}
        delayHide={delayHideMs}
        overlay={popover}
        placement={placement}
        trigger={["hover", "focus"]}
        rootClose
      >
       {children}
      </OverlayTrigger>
    );
  }

}
