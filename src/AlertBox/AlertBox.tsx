import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import "./AlertBox.less";
import {CloseIcon, WarningIcon, SuccessIcon, ErrorIcon, InfoIcon} from "./icons";

const ICONS = {
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const CLASSNAMES = {
  CONTAINER: "AlertBox--container",
  HEADER: "AlertBox--header",
  TITLE: "AlertBox--title",
  CLOSE: "AlertBox--close",
};

/*
 * AlertBox is a closable, highlighted box
*/
export default class AlertBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isOpen: true};
  }

  closeBox() {
    this.setState({isOpen: false});
  }

  render() {
    const {children, className, type, title, isClosable} = this.props;
    const {isOpen} = this.state;
    const Icon = ICONS[type];
    if (!isOpen) {
      return null;
    }
    return (
      <div className={classnames(`AlertBox--${type}`, CLASSNAMES.CONTAINER, className)}>
        <div className={CLASSNAMES.HEADER}>
          <span><Icon /></span>
          <strong className={CLASSNAMES.TITLE}> {title} </strong>
          {isClosable &&
            <button className={CLASSNAMES.CLOSE} onClick={() => this.closeBox()}><CloseIcon /></button>
          }
        </div>
        {children}
      </div>
    );
  }
}

const TYPES = {
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

AlertBox.propTypes = {
  children:  React.PropTypes.node.isRequired,
  className:  React.PropTypes.string,
  title:  React.PropTypes.string.isRequired,
  type:  React.PropTypes.oneOf(_.values(TYPES)),
  isClosable:  React.PropTypes.bool,
};
