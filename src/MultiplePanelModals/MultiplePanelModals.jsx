import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";

import {Button} from "../Button/Button";
import {Modal} from "../Modal/Modal";

export const Classes = {
  CONTAINER: "goals--MultiplePanelModals",
  FIRST_BUTTON: "goals--MultiplePanelModals--later",
  SECOND_BUTTON: "goals--MultiplePanelModals--next",
};

export class MultiplePanelModals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPanel: this.props.startingPanel};
  }

  render() {
    const {
      closeModal,
      componentArray,
      className,
      defaultOnClickButton1,
      defaultOnClickButton2,
      height,
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
      firstButtonName,
      overrideOnClickButton1,
      secondButtonName,
      overrideOnClickButton2,
    } = componentArray[this.state.currentPanel];

    let firstButtonValue;
    if (firstButtonName) {
      firstButtonValue = firstButtonName;
    } else if (isFirstPanel) {
      firstButtonValue = "Remind me later";
    } else {
      firstButtonValue = "Back";
    }

    let secondButtonValue;
    if (secondButtonName) {
      secondButtonValue = firstButtonName;
    } else if (isLastPanel) {
      secondButtonValue = "Done";
    } else {
      secondButtonValue = "Next";
    }

    let firstButtonOnClick = defaultOnClickButton1;
    if (overrideOnClickButton1) {
      firstButtonOnClick = overrideOnClickButton1;
    }

    let secondButtonOnClick = defaultOnClickButton2;
    if (overrideOnClickButton2) {
      secondButtonOnClick = overrideOnClickButton2;
    }

    return (<div className={classNames(Classes.CONTAINER, className)}>
        <Modal
          className={panelClassName}
          focusLocked={focusLocked}
          title={title}
          closeModal={closeModal}
          width={width}
        >
          <div style={{height}}>{panel}</div>
          <footer>
            <Button
              value={firstButtonValue}
              className={Classes.FIRST_BUTTON}
              type="link"
              onClick={() => {
                if (!isFirstPanel) {
                  this.setState({currentPanel: this.state.currentPanel - 1});
                }
                firstButtonOnClick();
              }}
            />
            <Button
              value={secondButtonValue}
              className={Classes.SECOND_BUTTON}
              type="primary"
              onClick={() => {
                secondButtonOnClick();
                if (isLastPanel) {
                  closeModal();
                }
                this.setState({currentPanel: this.state.currentPanel + 1});
              }}
            />
          </footer>
        </Modal>
      </div>);
  }
}

MultiplePanelModals.propTypes = {
  className: PropTypes.string,
  componentArray: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  defaultOnClickButton1: PropTypes.func,
  defaultOnClickButton2: PropTypes.func,
  height: PropTypes.string,
  startingPanel: PropTypes.number,
};

MultiplePanelModals.defaultProps = {
  startingPanel: 0,
  defaultOnClickButton1: () => {},
  defaultOnClickButton2: () => {},
};
