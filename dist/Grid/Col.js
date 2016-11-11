"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Col;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Size = require("./Size");

var _Size2 = _interopRequireDefault(_Size);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require("../less/grid.less");

function Col(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var span = _ref.span;
  var Wrapper = _ref.wrapperComponent;

  var additionalProps = _objectWithoutProperties(_ref, ["children", "className", "span", "wrapperComponent"]);

  var cssClass = Col.cssClass;

  var colSpanClasses = void 0;
  if (typeof span === "number") {
    colSpanClasses = cssClass.COL + "--" + _Size2.default.DEFAULT + "--" + span;
  } else {
    colSpanClasses = _lodash2.default.map(_Size2.default, function (s) {
      return span[s] && cssClass.COL + "--" + s + "--" + span[s];
    });
  }

  return _react2.default.createElement(
    Wrapper,
    _extends({ className: (0, _classnames2.default)(cssClass.COL, colSpanClasses, className) }, additionalProps),
    children
  );
}

// Define the shape of the `span` prop as a map from viewport `Size` to the associated span length.
Col.colSpanPropShape = {};
_lodash2.default.forEach(_Size2.default, function (size) {
  Col.colSpanPropShape[size] = _react.PropTypes.number;
});

Col.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  span: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape(Col.colSpanPropShape)]),
  wrapperComponent: _react.PropTypes.any
};

Col.defaultProps = {
  span: 1,
  wrapperComponent: "div"
};

Col.cssClass = {
  COL: "Grid--Col"
};