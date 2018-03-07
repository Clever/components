import React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import FocusTrap from "focus-trap-react";

require("./Modal.less");

const DEFAULT_WIDTH = 400;
const ESC = 27;
const closeIcon = <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" /></svg>;

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {windowHeight: window.innerHeight};
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("resize", this.handleResize);
  }

  handleKeyUp(e) {
    if (e.keyCode === ESC) {
      this.props.closeModal();
    }
  }

  handleResize() {
    this.setState({windowHeight: window.innerHeight});
  }

  render() {
    let windowStyle = {
      width: `${this.props.width}px`,
      marginLeft: `-${this.props.width / 2}px`,
    };
    // The content is max 90% of the window height less 60px (height of the header)
    let contentStyle = {maxHeight: (this.state.windowHeight * 0.9) - 60};
    const modalContent = (
      <div className={classnames("Modal", this.props.className)}>
        <div className="Modal--background" onClick={this.props.closeModal} aria-hidden="true" />
        <div className="Modal--window" style={windowStyle}>
          <header className="Modal--header">
            <button className="Modal--close" onClick={this.props.closeModal} type="button" aria-label="close modal window">{closeIcon}</button>
            <h1>{this.props.title}</h1>
          </header>
          <div style={contentStyle} className="Modal--window--content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
    let modal;
    if (this.props.focusLocked) {
      modal = <FocusTrap>{modalContent}</FocusTrap>;
    } else {
      modal = modalContent;
    }
    return modal;
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  focusLocked: PropTypes.bool,
};

Modal.defaultProps = {
  width: DEFAULT_WIDTH,
  focusLocked: true,
};
