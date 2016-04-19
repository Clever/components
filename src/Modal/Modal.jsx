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
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp);
    window.addEventListener("resize", this.handleResize);
  }

  handleKeyUp(e) {
    if (e.keyCode === 27) {
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
    // The content is 80% of the window height (same as the max height of the modal) less 75px (the height of the header and padding)
    let contentStyle = {
      maxHeight: (this.state.windowHeight * 0.8) - 75,
    };
    return (
      <div className="Modal">
        <div className="Modal--background" onClick={this.props.closeModal} />
        <div className="Modal--window" style={windowStyle} >
          <div className="Modal--header">
            <button className="Modal--close" onClick={this.props.closeModal} />
            <h2>{this.props.title}</h2>
          </div>
          <div style={contentStyle} className="Modal--window--content">
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
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};
