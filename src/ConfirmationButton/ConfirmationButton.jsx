import React, {PropTypes} from "react";

import {Button, ModalButton} from "..";
import {propsFor, prefixKeys, unprefixKeys} from "../utils";

require("./ConfirmationButton.less");

export class ConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleConfirm() {
    this.refs.modalButton.hideModal();
    if (this.props.onConfirm) this.props.onConfirm();
  }

  handleCancel() {
    this.refs.modalButton.hideModal();
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    const modalButtonProps = propsFor(ModalButton, this.props);
    const confirmButtonProps = propsFor(Button, unprefixKeys(this.props, "confirmButton"));
    return (<ModalButton {...modalButtonProps} ref="modalButton">
      {this.props.children}
      <div className="ConfirmationButton--dialog-buttons">
        <Button type="link" value="Cancel" onClick={this.handleCancel} />
        <Button {...confirmButtonProps} onClick={this.handleConfirm} />
      </div>
    </ModalButton>);
  }
}

ConfirmationButton.propTypes = Object.assign(
  {}, prefixKeys(Button.propTypes, "confirmButton"), ModalButton.propTypes, {
    confirmButtonType: Button.propTypes.type,
    confirmButtonText: PropTypes.string,
    onConfirm: PropTypes.func,
  }
);

ConfirmationButton.defaultProps = Object.assign(
  {}, prefixKeys(Button.defaultProps, "confirmButton"), ModalButton.defaultProps, {
    confirmButtonType: "primary",
    confirmButtonValue: "Confirm",
  }
);
