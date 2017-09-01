import _ from "lodash";
import classnames from "classnames";
import React, {PureComponent, PropTypes} from "react";

import {CloseIcon, WarningIcon, SuccessIcon, ErrorIcon, InfoIcon} from "./icons";
import {FlexBox, ItemAlign} from "../flex";

import "./AlertBox.less";

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
export default class AlertBox extends PureComponent {
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
        <FlexBox className={CLASSNAMES.HEADER} alignItems={ItemAlign.CENTER}>
          <Icon />
          <FlexBox className={CLASSNAMES.TITLE} grow>{title}</FlexBox>
          {isClosable && (
            <button className={CLASSNAMES.CLOSE} onClick={() => this.closeBox()}>
              <CloseIcon />
            </button>
          )}
        </FlexBox>
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(_.values(TYPES)),
  isClosable: PropTypes.bool,
};
