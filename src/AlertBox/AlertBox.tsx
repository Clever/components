import * as classnames from "classnames";
import * as React from "react";

import * as FontAwesome from "react-fontawesome";

import { CloseIcon } from "./CloseIcon";
import { FlexBox, FlexItem } from "../flex";

import "./AlertBox.less";

type AlertBoxType = "processing" | "warning" | "success" | "error" | "info";

export interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
  type?: AlertBoxType;
  isClosable?: boolean;
  onClose?: () => void;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

const cssClass = {
  CONTAINER: "AlertBox--container",
  HEADER: "AlertBox--header",
  ICON_CONTAINER: "AlertBox--Icon--container",
  ICON: "AlertBox--Icon",
  TITLE: "AlertBox--title",
  CLOSE: "AlertBox--close",
  CHILDREN: "AlertBox--children",
};

const iconMap = {
  processing: "spinner",
  warning: "exclamation-triangle",
  success: "thumbs-up",
  error: "exclamation-circle",
  info: "bell",
};

/*
 * AlertBox is a closable, highlighted box
 */
export default class AlertBox extends React.PureComponent<Props> {
  state = { isOpen: true };

  closeBox() {
    const { onClose } = this.props;
    this.setState({ isOpen: false });
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { children, className, type, title, isClosable, headingLevel = 3 } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }
    return (
      <div className={classnames(`AlertBox--${type}`, cssClass.CONTAINER, className)}>
        <FlexBox className={cssClass.HEADER}>
          <FlexItem className={cssClass.ICON_CONTAINER}>
            <FontAwesome
              fixedWidth
              size="lg"
              name={iconMap[type]}
              className={classnames(`AlertBox--Icon--${type}`, cssClass.ICON)}
              spin={type === "processing"}
            />
          </FlexItem>
          <FlexItem>
            {/* Use an <h3> for accessibility. Visual headings must be marked as such. The US Gov
              design system also uses <h3>s for their alert box titles */}
            {title && (
              <div role="heading" aria-level={headingLevel} className={cssClass.TITLE}>
                {title}
              </div>
            )}
            <div className={cssClass.CHILDREN}>{children}</div>
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
