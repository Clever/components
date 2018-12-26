import _ from "lodash";
import classnames from "classnames";
import React, {PureComponent} from "react";
import * as PropTypes from "prop-types";

import {CloseIcon, WarningIcon, SuccessIcon, ErrorIcon, InfoIcon} from "./icons";
import {FlexBox, FlexItem, ItemAlign} from "../flex";

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
  state = {isOpen: true};

  closeBox() {
    const {onClose} = this.props;
    this.setState({isOpen: false});
    if (onClose) {
      onClose();
    }
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
          <FlexItem className={CLASSNAMES.TITLE} grow>{title}</FlexItem>
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
