import React from "react";
import classnames from "classnames";

import {Button, Modal} from "..";
import {omitKeys, prefixKeys, propsFor, unprefixKeys} from "../utils";

const excludeModalProps = ["closeModal", "children"];

import "./ModalButton.less";
export class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showingModal: false};
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({showingModal: true});
  }

  hideModal() {
    this.setState({showingModal: false});
  }

  render() {
    const buttonProps = propsFor(Button, this.props);
    const modalProps = propsFor(Modal, unprefixKeys(this.props, "modal"));

    return (<div className={classnames("ModalButton", this.props.className)}>
      <Button
        {...buttonProps} onClick={() => {
          if (this.props.onClick) this.props.onClick();
          this.showModal();
        }}
      />
      {this.state.showingModal ? <Modal
        {...modalProps}
        closeModal={() => {
          if (this.props.onClose) this.props.onClose();
          this.hideModal();
        }}
      >{this.props.children}</Modal> : null}
    </div>);
  }
}

// inherit properties from Button and Modal except closeModal; don't prefix children,
// but prefix the rest of Modal's keys.
const modalPropTypes = prefixKeys(omitKeys(Modal.propTypes, ...excludeModalProps), "modal");

ModalButton.propTypes = Object.assign({},
  Button.propTypes,
  modalPropTypes,
  {
    children: Modal.propTypes.children,
    onClose: React.PropTypes.func, // not required; just closes modal otherwise
  }
);

// closeModal has no default, so no need to filter out of defaultProps
ModalButton.defaultProps = Object.assign({},
  Button.defaultProps,
  prefixKeys(Modal.defaultProps, "modal")
);
