import * as classnames from "classnames";
import * as FontAwesome from "react-fontawesome";
import * as PropTypes from "prop-types";
import * as React from "react";

import {Button} from "../Button/Button";
import {FlexBox, ItemAlign} from "../flex";
import {ToastType} from "./ToastType";

import "./ToastNotification.less";

export const actionPropType = PropTypes.shape({
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
});

const propTypes = {
  action: actionPropType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(ToastType)).isRequired,
};

const defaultProps = {
  showCloseButton: true,
};

const cssClass = {
  CONTAINER: "ToastNotification",
  CONTENT: "ToastNotification--content",
  ACTION: "ToastNotification--action",
  CLOSE_BUTTON: "ToastNotification--closeButton",
};

function typeCssClass(type: string): string {
  return `ToastNotification--${type}`;
}

const iconMap = {
  [ToastType.ERROR]: "minus-circle",
  [ToastType.INFO]: "bell",
  [ToastType.PROCESSING]: "hourglass",
  [ToastType.SUCCESS]: "thumbs-up",
  [ToastType.WARNING]: "exclamation-triangle",
};

/**
 * A building block for the <ToastStack>. Renders an individual toast notification.
 */
export class ToastNotification extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  render() {
    const {
      action,
      children,
      className,
      onClose,
      showCloseButton,
      type,
    } = this.props;

    return (
      <FlexBox
        className={classnames(cssClass.CONTAINER, typeCssClass(type), className)}
        alignItems={ItemAlign.CENTER}
      >
        <FontAwesome
          name={iconMap[type]}
          size="lg"
          spin={type === ToastType.PROCESSING}
        />
        <FlexBox className={cssClass.CONTENT} grow>{children}</FlexBox>
        {action && (
          <Button
            className={cssClass.ACTION}
            href={action.href}
            onClick={action.onClick}
            type="link"
            value={action.text}
          />
        )}
        {showCloseButton && (
          <Button
            className={cssClass.CLOSE_BUTTON}
            onClick={onClose}
            type="linkPlain"
            value={<FontAwesome name="times" size="lg" />}
          />
        )}
      </FlexBox>
    );
  }
}
