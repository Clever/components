"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavGroup = NavGroup;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _NavLink = require("./NavLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NavGroup doesn't render its children because the LeftNav will render them in
// a drawer if the NavGroup is open.
function NavGroup(props) {
  var cssClass = NavGroup.cssClass;

  var open = props.open ? cssClass.OPEN : null;
  return _react2.default.createElement(_NavLink.NavLink, {
    className: (0, _classnames2.default)(cssClass.CONTAINER, open),
    label: props.label,
    icon: props.icon,
    onClick: props.onClick
  });
}

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open"
};