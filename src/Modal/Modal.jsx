var React = require('react');

require("./Modal.less");

var DEFAULT_WIDTH = 400;

var Modal = React.createClass({
  propTypes: {
    closeModal: React.PropTypes.func.isRequired,
    title: React.PropTypes.string,
    width: React.PropTypes.number,
  },
  render: function() {
    var width = this.props.width || DEFAULT_WIDTH;
    var modalStyles = {
      width: width + "px",
      marginLeft: "-" + (width / 2) + "px"
    };

    return (
      <div className="Modal">
        <div className="Modal--background" onClick={this.props.closeModal}/>
        <div className="Modal--window" style={modalStyles}>
          <div className="Modal--window--container">
            <h2>{this.props.title}</h2>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
