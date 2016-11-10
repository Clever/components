"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Cell;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require("./Cell.less");

function Cell(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var noWrap = _ref.noWrap;
  var width = _ref.width;

  var additionalProps = _objectWithoutProperties(_ref, ["children", "className", "noWrap", "width"]);

  var cssClass = Cell.cssClass;


  return _react2.default.createElement(
    "td",
    _extends({
      className: (0, _classnames2.default)(cssClass.CELL, noWrap && cssClass.NO_WRAP, className),
      style: { width: width }
    }, additionalProps),
    children
  );
}

Cell.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  noWrap: _react.PropTypes.bool,
  width: _react.PropTypes.string
};

Cell.cssClass = {
  CELL: "Table--cell",
  NO_WRAP: "Table--cell--no_wrap"
};