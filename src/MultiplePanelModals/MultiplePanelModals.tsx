import "core-js";

import {Modal} from "../Modal/Modal";
import {Button} from "../Button/Button";
import * as React from "react";

import "./MultiplePanelModals.less";
import * as classNames from "classnames";

export type ModalPanel = {
  panel: any;
  className?: string;
  focusLocked?: boolean;
  title: string;
  width?: number;
};

export type Props = {
  closeModal: any;
  componentArray: ModalPanel[];
  className?: string;
  onClickNext?: any;
  onClickBack?: any;
  onClickLater: any;
  height?: string;
  startingPanel?: number;
};

export type State = {
  currentPanel: number;
};

export const Classes = {
  CONTAINER: "goals--MultiplePanelModals",
  SUB_ELEMENT: "goals--MultiplePanelModals--subElement",
  LATER_BUTTON: "goals--MultiplePanelModals--later",
  NEXT_BUTTON: "goals--MultiplePanelModals--next",
  BACK_BUTTON: "goals--MultiplePanelModals--back",
  DONE_BUTTON: "goals--MultiplePanelModals--done",
};

/**
 * MultiplePanelModals creates a number of panels that a user can walk through. They can click back/next to scroll
 * through the panels. Each panel renders the React Components passed into the array (first panel = array[0], etc).
 */
export default class MultiplePanelModals extends React.PureComponent {
  static defaultProps = {
    onClickNext: () => {
      return;
    },
    onClickBack: () => {
      return;
    },
    startingPanel: 0,
  };

  constructor(props) {
    super(props);
    this.state = {currentPanel: props.startingPanel};
  }

  /**
   * @param closeModal = function that closes the modal, which runs upon clicking outside the modal, x'ing out of the modal, and on the last panel of the modal upon clicking "done".
   * @param componentArray = an array of modal panels.
   * @param className = (optional) class name for the div surrounding the modals.
   * @param onClickNext = (optional) function that runs upon clicking the next button.
   * @param onClickBack = (optional) function that run upon clicking the back button.
   * @param onClickLater = function that runs upon clicking the "remind me later" button, which appears on the first panel.
   * @param height = (optional) string of height (ex// "400px") to be fixed for the children of the modal.
   * @param startingPanel = (optional) the index of the componentArray that will be displayed initially. Default is 0.
   */
  render() {
    const {
      closeModal,
      componentArray,
      className,
      onClickNext,
      onClickBack,
      onClickLater,
      height,
    } = this.props;
    const isFirstPanel = this.state.currentPanel === 0;
    const isLastPanel = this.state.currentPanel + 1 === componentArray.length;

    return this.state.currentPanel < componentArray.length ? (
      <div className={classNames(Classes.CONTAINER, className)}>
        <Modal
          className={componentArray[this.state.currentPanel].className}
          focusLocked={componentArray[this.state.currentPanel].focusLocked}
          title={componentArray[this.state.currentPanel].title}
          closeModal={closeModal}
          width={componentArray[this.state.currentPanel].width}
        >
          <div style={{height}}>{componentArray[this.state.currentPanel].panel}</div>
          <footer>
            {
              <Button
                value={isFirstPanel ? "Remind me later" : "Back"}
                className={isFirstPanel ? Classes.LATER_BUTTON : Classes.BACK_BUTTON}
                type="link"
                onClick={() => {
                  if (isFirstPanel) {
                    onClickLater();
                  } else {
                    onClickBack();
                    this.setState({currentPanel: this.state.currentPanel - 1});
                  }
                }}
              />
            }
            <Button
              value={isLastPanel ? "Done" : "Next"}
              className={isLastPanel ? Classes.DONE_BUTTON : Classes.NEXT_BUTTON}
              type="primary"
              onClick={() => {
                {
                  onClickNext();
                  if (isLastPanel) {
                    closeModal();
                  }
                }
                this.setState({currentPanel: this.state.currentPanel + 1});
              }}
            />
          </footer>
        </Modal>
      </div>
    ) : null;
  }
}
