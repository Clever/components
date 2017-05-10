import * as React from "react";
import classnames from "classnames";

import {Button, ModalButton} from "..";
import {propsFor, prefixKeys, unprefixKeys} from "../utils";

import "./ConfirmationButton.less";

const propPrefix = "confirmButton";

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
    const confirmButtonProps = propsFor(Button, unprefixKeys(this.props, propPrefix));
    const wrapperClass = "ConfirmationButton--dialog-buttons";

    return (<ModalButton {...modalButtonProps} ref="modalButton">
      {this.props.children}
      <div className={classnames(wrapperClass, this.props.className)}>
        <Button type="link" value="Cancel" onClick={this.handleCancel} />
        <Button {...confirmButtonProps} onClick={this.handleConfirm} />
      </div>
    </ModalButton>);
  }
}

ConfirmationButton.propTypes = Object.assign({},
  prefixKeys(Button.propTypes, propPrefix),
  ModalButton.propTypes,
  {
    className:  React.PropTypes.string,
    onConfirm:  React.PropTypes.func,
  },
);

ConfirmationButton.defaultProps = Object.assign({},
  prefixKeys(Button.defaultProps, propPrefix),
  ModalButton.defaultProps,
  {
    confirmButtonType: "primary",
    confirmButtonValue: "Confirm",
  }
);
