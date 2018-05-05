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

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _Size = require("./Size");

var _Size2 = _interopRequireDefault(_Size);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
  Col.colSpanPropShape[size] = PropTypes.number;
});

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  span: PropTypes.oneOfType([PropTypes.number, PropTypes.shape(Col.colSpanPropShape)]),
  wrapperComponent: PropTypes.any
};

Col.defaultProps = {
  span: 1,
  wrapperComponent: "div"
};

Col.cssClass = {
  COL: "Grid--Col"
};