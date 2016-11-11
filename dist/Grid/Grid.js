"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Grid = Grid;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Col = require("./Col");

var _Col2 = _interopRequireDefault(_Col);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

var _Size = require("./Size");

var _Size2 = _interopRequireDefault(_Size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require("../less/grid.less");

function Grid(_ref) {
  var className = _ref.className;
  var children = _ref.children;
  var Wrapper = _ref.wrapperComponent;

  var additionalProps = _objectWithoutProperties(_ref, ["className", "children", "wrapperComponent"]);

  var cssClass = Grid.cssClass;


  return _react2.default.createElement(
    Wrapper,
    _extends({ className: (0, _classnames2.default)(cssClass.GRID, className) }, additionalProps),
    children
  );
}

Grid.Row = _Row2.default;
Grid.Col = _Col2.default;
Grid.Size = _Size2.default;

Grid.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(_MorePropTypes2.default.instanceOfComponent(_Row2.default)),
  className: _react.PropTypes.string,
  wrapperComponent: _react.PropTypes.any
};

Grid.defaultProps = {
  wrapperComponent: "div"
};

Grid.cssClass = {
  GRID: "Grid"
};