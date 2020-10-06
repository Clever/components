import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";

import { Button, Props as ButtonProps } from "../Button/Button";
import { Modal, Props as ModalProps } from "../Modal/Modal";
import { omitKeys, prefixKeys, propsFor, unprefixKeys } from "../utils";

export interface Props extends ButtonProps {
  // Copied from ModalProps
  modalClassName?: string;
  modalWidth?: number;
  modalTitle: React.ReactNode; // PropTypes says this can only be a string
  modalFocusLocked?: boolean;

  children?: ModalProps["children"];
  onClose?: Function;
}

interface State {
  showingModal: boolean;
}

const excludeModalProps = ["closeModal", "children"];
const excludedButtonProps = ["children"];

// inherit properties from Button and Modal except closeModal; don't prefix children,
// but prefix the rest of Modal's keys.
const modalPropTypes = prefixKeys(omitKeys(Modal.propTypes, ...excludeModalProps), "modal");

const propTypes = {
  ...Button.propTypes,
  ...modalPropTypes,
  children: Modal.propTypes.children,
  onClose: PropTypes.func, // not required; just closes modal otherwise
};

// closeModal has no default, so no need to filter out of defaultProps
const defaultProps = {
  ...Button.defaultProps,
  ...prefixKeys(Modal.defaultProps, "modal"),
};

export class ModalButton extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = { showingModal: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ showingModal: true });
  }

  hideModal() {
    this.setState({ showingModal: false });
  }

  render() {
    const buttonProps = omitKeys(propsFor(Button, this.props), ...excludedButtonProps);
    const modalProps = propsFor(Modal, unprefixKeys(this.props, "modal"));

    return (
      <div className={classnames("ModalButton", this.props.className)}>
        <Button
          {...(buttonProps as ButtonProps)}
          onClick={(e) => {
            if (this.props.onClick) this.props.onClick(e);
            this.showModal();
          }}
        />
        {this.state.showingModal ? (
          <Modal
            {...(modalProps as ModalProps)}
            closeModal={() => {
              if (this.props.onClose) this.props.onClose();
              this.hideModal();
            }}
          >
            {this.props.children}
          </Modal>
        ) : null}
      </div>
    );
  }
}
