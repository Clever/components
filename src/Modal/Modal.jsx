var React = require("react");

require("./Modal.less");

export function Modal(props) {
  return (
    <div className="Modal">
      <div className="Modal--background" onClick={props.closeModal} />
      <div
        className="Modal--window"
        style={{
          width: `${props.width}px`,
          marginLeft: `-${props.width / 2}px`,
        }}
      >
        <div className="Modal--window--container">
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  width: React.PropTypes.number,
  closeModal: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

Modal.defaultProps = {
  width: 400,
};
