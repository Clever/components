import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";

import { Button, Props as ButtonProps } from "../Button/Button";
import { ModalButton, Props as ModalButtonProps } from "../ModalButton/ModalButton";
import { propsFor, prefixKeys, unprefixKeys } from "../utils";

import "./ConfirmationButton.less";

export interface Props extends ModalButtonProps {
  // The variadic type proposal would cover this, but for now, we copy-pasta
  confirmButtonClassName?: string;
  confirmButtonType?: "primary" | "secondary" | "destructive" | "link" | "linkPlain" | "plain";
  confirmButtonSize?: "small" | "regular" | "large";
  confirmButtonValue?: React.ReactNode;
  confirmButtonHref?: string;
  confirmButtonTarget?: "_self" | "_blank";
  confirmButtonDisabled?: boolean;
  confirmButtonOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  confirmButtonSubmit?: boolean;
  confirmButtonStyle?: React.CSSProperties;

  className?: string;
  onConfirm?: () => void;
}

const propPrefix = "confirmButton";

const propTypes = {
  ...prefixKeys(Button.propTypes, propPrefix),
  ...ModalButton.propTypes,
  className: PropTypes.string,
  onConfirm: PropTypes.func,
};

const defaultProps = {
  ...prefixKeys(Button.defaultProps, propPrefix),
  ...ModalButton.defaultProps,
  confirmButtonType: "primary",
  confirmButtonValue: "Confirm",
};

export class ConfirmationButton extends React.Component<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  private modalButton = React.createRef<ModalButton>();

  handleConfirm() {
    this.modalButton.current.hideModal();
    if (this.props.onConfirm) this.props.onConfirm();
  }

  handleCancel() {
    this.modalButton.current.hideModal();
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    const modalButtonProps = propsFor(ModalButton, this.props);
    const confirmButtonProps = propsFor(Button, unprefixKeys(this.props, propPrefix));
    const wrapperClass = "ConfirmationButton--dialog-buttons";

    return (
      <ModalButton {...(modalButtonProps as ModalButtonProps)} ref={this.modalButton}>
        {this.props.children}
        <div className={classnames(wrapperClass, this.props.className)}>
          <Button type="link" value="Cancel" onClick={this.handleCancel} />
          <Button {...(confirmButtonProps as ButtonProps)} onClick={this.handleConfirm} />
        </div>
      </ModalButton>
    );
  }
}
