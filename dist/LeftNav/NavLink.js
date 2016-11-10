"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavLink = NavLink;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NavLink(props) {
  var cssClass = NavLink.cssClass;

  return _react2.default.createElement(
    _.FlexBox,
    {
      component: "li",
      className: (0, _classnames2.default)(cssClass.CONTAINER, props.className),
      onClick: props.onClick,
      alignItems: _.ItemAlign.CENTER
    },
    _react2.default.createElement(
      _.FlexItem,
      { className: cssClass.ICON },
      props.icon
    ),
    _react2.default.createElement(
      _.FlexItem,
      { className: cssClass.LABEL, "data-text": props.label },
      props.label
    )
  );
}

NavLink.cssClass = {
  CONTAINER: "NavLink",
  LABEL: "NavLink--label",
  ICON: "NavLink--icon"
};