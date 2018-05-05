"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Row;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Col = require("./Col");

var _Col2 = _interopRequireDefault(_Col);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require("../less/flex.less");
require("../less/grid.less");

function Row(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var grow = _ref.grow;
  var Wrapper = _ref.wrapperComponent;

  var additionalProps = _objectWithoutProperties(_ref, ["children", "className", "grow", "wrapperComponent"]);

  var cssClass = Row.cssClass;


  return _react2.default.createElement(
    Wrapper,
    _extends({
      className: (0, _classnames2.default)(cssClass.ROW, grow && cssClass.GROW, className)
    }, additionalProps),
    children
  );
}

Row.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(_MorePropTypes2.default.instanceOfComponent(_Col2.default)),
  className: PropTypes.string,
  grow: PropTypes.bool,
  wrapperComponent: PropTypes.any
};

Row.defaultProps = {
  wrapperComponent: "div"
};

Row.cssClass = {
  GROW: "flex--grow",
  ROW: "Grid--Row"
};