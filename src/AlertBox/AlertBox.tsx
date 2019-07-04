import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import { CloseIcon, WarningIcon, SuccessIcon, ErrorIcon, InfoIcon } from "./icons";
import { FlexBox, FlexItem } from "../flex";

import "./AlertBox.less";

type AlertBoxType = "warning" | "success" | "error" | "info";

export interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
  type?: AlertBoxType;
  isClosable?: boolean;
  onClose?: () => void;
}

const ICONS = {
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const cssClass = {
  CONTAINER: "AlertBox--container",
  HEADER: "AlertBox--header",
  ICON_CONTAINER: "AlertBox--Icon--container",
  ICON: "AlertBox--Icon",
  TITLE: "AlertBox--title",
  CLOSE: "AlertBox--close",
};

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf<AlertBoxType>(["warning", "success", "error", "info"]),
  isClosable: PropTypes.bool,
};

/*
 * AlertBox is a closable, highlighted box
 */
export default class AlertBox extends React.PureComponent<Props> {
  static propTypes = propTypes;

  state = { isOpen: true };

  closeBox() {
    const { onClose } = this.props;
    this.setState({ isOpen: false });
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { children, className, type, title, isClosable } = this.props;
    const { isOpen } = this.state;
    const Icon = ICONS[type];
    if (!isOpen) {
      return null;
    }
    return (
      <div
        data-testid="AlertBoxType"
        className={classnames(`AlertBox--${type}`, cssClass.CONTAINER, className)}
      >
        <FlexBox className={cssClass.HEADER}>
          <FlexItem className={cssClass.ICON_CONTAINER}>
            <Icon className={cssClass.ICON} />
          </FlexItem>
          <FlexItem>
            <div className={cssClass.TITLE}>{title}</div>
            {children}
          </FlexItem>
          <FlexItem grow>
            {isClosable && (
              <button aria-label="Close" className={cssClass.CLOSE} onClick={() => this.closeBox()}>
                <CloseIcon />
              </button>
            )}
          </FlexItem>
        </FlexBox>
      </div>
    );
  }
}
