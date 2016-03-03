var React = require('react');

require("./Modal.less");

var DEFAULT_WIDTH = 400;

var Modal = React.createClass({
  render: function() {
    var width = this.props.width || DEFAULT_WIDTH;
    return (
      <div className="Modal">
        <div className="Modal--background" onClick={this.props.closeModal}/>
        <div
          className="Modal--window"
          style={{
            width: width + "px",
            marginLeft: "-" + (width / 2) + "px"
          }}>
          <div className="Modal--window--container">
            <h2>{this.props.title}</h2>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
