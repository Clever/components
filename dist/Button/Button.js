"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./Button.less");

function Button(props) {
  if (props.type === "destructive" && props.size === "small") {
    throw new Error("Small destructive buttons are not supported");
  }

  if (props.href && props.submit) {
    throw new Error("Buttons with href do not support the submit option");
  }

  var classes = (0, _classnames2.default)("Button Button--" + props.type, "Button--" + props.size, props.className);
  var type = props.submit ? "submit" : "button";

  if (props.href == null || props.disabled) {
    // use <button>s for all disabled links and things with no href prop (buttons)
    return _react2.default.createElement(
      "button",
      { type: type, className: classes, onClick: props.onClick, disabled: props.disabled, style: props.style },
      props.value
    );
  }
  return _react2.default.createElement(
    "a",
    { className: classes, target: props.target, href: props.href, onClick: props.onClick, style: props.style },
    props.value
  );
}

Button.defaultProps = {
  type: "secondary",
  size: "regular",
  target: "_blank"
};

Button.propTypes = {
  className: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.oneOf(["primary", "secondary", "destructive", "link", "linkPlain"]),
  size: _react2.default.PropTypes.oneOf(["large", "regular", "small"]),
  value: _react2.default.PropTypes.node.isRequired,
  href: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.oneOf(["_self", "_blank"]),
  disabled: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  submit: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object
};