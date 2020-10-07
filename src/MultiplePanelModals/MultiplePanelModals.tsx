import * as React from "react";
import * as PropTypes from "prop-types";

import { Button } from "../Button/Button";
import { Modal, Props as ModalProps } from "../Modal/Modal";
import "./MultiplePanelModals.less";

export interface Props {
  className?: string;
  componentArray: any[];
  closeModal: ModalProps["closeModal"];
  defaultOnClickLeftButton?: Function;
  defaultOnClickRightButton?: Function;
  height?: string | number;
  rightButtonDisabled?: boolean;
  startingPanel?: number;
  showStepNumber?: boolean;
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
  showStepNumber: PropTypes.bool,
};

const defaultProps = {
  startingPanel: 0,
  rightButtonDisabled: false,
  defaultOnClickLeftButton: () => {},
  defaultOnClickRightButton: () => {},
  showStepNumber: false,
};

export const Classes = {
  STEP_NUMBER: "MultiplePanelModals--stepNumber",
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
      showStepNumber,
    } = this.props;
    const { currentPanel } = this.state;
    const isFirstPanel = currentPanel === 0;
    const isLastPanel = currentPanel + 1 === componentArray.length;

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

    const totalPanels = componentArray.length;

    return (
      <div className={className}>
        <Modal
          className={panelClassName}
          focusLocked={focusLocked}
          title={title}
          closeModal={closeModal}
          width={width}
        >
          <div style={{ height }}>{panel}</div>
          <footer>
            {showStepNumber && (
              <span className={Classes.STEP_NUMBER}>{`Step ${
                currentPanel + 1
              } of ${totalPanels}`}</span>
            )}
            <Button
              value={leftButtonValue}
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
