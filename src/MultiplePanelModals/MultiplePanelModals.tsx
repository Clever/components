import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";

import { Button } from "../Button/Button";
import { Modal, Props as ModalProps } from "../Modal/Modal";

export interface Props {
  className?: string;
  componentArray: any[];
  closeModal: ModalProps["closeModal"];
  defaultOnClickLeftButton?: Function;
  defaultOnClickRightButton?: Function;
  height?: string | number;
  rightButtonDisabled?: boolean;
  startingPanel?: number;
}

interface State {
  currentPanel: number;
}

const propTypes = {
  className: PropTypes.string,
  componentArray: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  defaultOnClickLeftButton: PropTypes.func,
  defaultOnClickRightButton: PropTypes.func,
  height: PropTypes.string,
  rightButtonDisabled: PropTypes.bool,
  startingPanel: PropTypes.number,
};

const defaultProps = {
  startingPanel: 0,
  rightButtonDisabled: false,
  defaultOnClickLeftButton: () => {},
  defaultOnClickRightButton: () => {},
};

export const Classes = {
  CONTAINER: "MultiplePanelModals",
  FIRST_BUTTON: "MultiplePanelModals--later",
  SECOND_BUTTON: "MultiplePanelModals--next",
};

export class MultiplePanelModals extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = { currentPanel: this.props.startingPanel };
  }

  render() {
    const {
      closeModal,
      componentArray,
      className,
      defaultOnClickLeftButton,
      defaultOnClickRightButton,
      height,
      rightButtonDisabled,
    } = this.props;
    const isFirstPanel = this.state.currentPanel === 0;
    const isLastPanel = this.state.currentPanel + 1 === componentArray.length;

    if (this.state.currentPanel >= componentArray.length) {
      return <div />;
    }

    const {
      panelClassName,
      focusLocked,
      title,
      width,
      panel,
      leftButtonName,
      leftButtonType,
      overrideOnClickLeftButton,
      rightButtonName,
      rightButtonType,
      overrideOnClickRightButton,
    } = componentArray[this.state.currentPanel];

    let leftButtonValue;
    if (leftButtonName) {
      leftButtonValue = leftButtonName;
    } else if (isFirstPanel) {
      leftButtonValue = "Remind me later";
    } else {
      leftButtonValue = "Back";
    }

    let rightButtonValue;
    if (rightButtonName) {
      rightButtonValue = rightButtonName;
    } else if (isLastPanel) {
      rightButtonValue = "Done";
    } else {
      rightButtonValue = "Next";
    }

    let leftButtonOnClick = defaultOnClickLeftButton;
    if (overrideOnClickLeftButton) {
      leftButtonOnClick = overrideOnClickLeftButton;
    }

    let rightButtonOnClick = defaultOnClickRightButton;
    if (overrideOnClickRightButton) {
      rightButtonOnClick = overrideOnClickRightButton;
    }

    return (
      <div className={classnames(Classes.CONTAINER, className)}>
        <Modal
          className={panelClassName}
          focusLocked={focusLocked}
          title={title}
          closeModal={closeModal}
          width={width}
        >
          <div style={{ height }}>{panel}</div>
          <footer>
            <Button
              value={leftButtonValue}
              className={Classes.FIRST_BUTTON}
              type={leftButtonType || "link"}
              onClick={() => {
                if (!isFirstPanel) {
                  this.setState({ currentPanel: this.state.currentPanel - 1 });
                }
                leftButtonOnClick();
              }}
            />
            <Button
              value={rightButtonValue}
              className={Classes.SECOND_BUTTON}
              type={rightButtonType || "primary"}
              onClick={() => {
                rightButtonOnClick();
                if (isLastPanel) {
                  if (overrideOnClickRightButton) {
                    return;
                  }
                  closeModal();
                }
                this.setState({ currentPanel: this.state.currentPanel + 1 });
              }}
              disabled={rightButtonDisabled}
            />
          </footer>
        </Modal>
      </div>
    );
  }
}
