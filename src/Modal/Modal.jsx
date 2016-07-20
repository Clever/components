import React from "react";

require("./Modal.less");

const DEFAULT_WIDTH = 400;

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
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  handleResize() {
    // The ensures the modal can scroll when it exceeds 90% of the window height
    const scrollable = this.modal && this.modal.scrollHeight >= (0.9 * window.innerHeight) - 60;
    this.setState({
      windowHeight: window.innerHeight,
      scrollable,
    });
  }

  render() {
    let windowStyle = {
      width: `${this.props.width}px`,
      marginLeft: `-${this.props.width / 2}px`,
    };
    // The content is max 90% of the window height less 60px (height of the header)
    let contentStyle = {
      maxHeight: (this.state.windowHeight * 0.9) - 60,
      overflowY: this.state.scrollable ? "scroll" : "hidden",
    };
    return (
      <div className="Modal">
        <div className="Modal--background" onClick={this.props.closeModal} />
        <div className="Modal--window" style={windowStyle}>
          <header className="Modal--header">
            <button className="Modal--close" onClick={this.props.closeModal} />
            <h2>{this.props.title}</h2>
          </header>
          <div style={contentStyle} className="Modal--window--content" ref={(ref) => {this.modal = ref;}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  width: DEFAULT_WIDTH,
};

Modal.propTypes = {
  width: React.PropTypes.number,
  title: React.PropTypes.string.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};
