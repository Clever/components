"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FlexItem;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _ItemAlign = require("./ItemAlign");

var _ItemAlign2 = _interopRequireDefault(_ItemAlign);

require("../less/flex.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TYPE_ANY = void 0;

function FlexItem(_ref) {
  var _ref$alignSelf = _ref.alignSelf;
  var alignSelf = _ref$alignSelf === undefined ? "" : _ref$alignSelf;
  var _ref$children = _ref.children;
  var children = _ref$children === undefined ? TYPE_ANY : _ref$children;
  var _ref$className = _ref.className;
  var className = _ref$className === undefined ? "" : _ref$className;
  var _ref$component = _ref.component;
  var Wrapper = _ref$component === undefined ? "div" : _ref$component;
  var _ref$grow = _ref.grow;
  var grow = _ref$grow === undefined ? false : _ref$grow;

  var additionalProps = _objectWithoutProperties(_ref, ["alignSelf", "children", "className", "component", "grow"]);

  var cssClass = FlexItem.cssClass;


  return _react2.default.createElement(
    Wrapper,
    _extends({
      className: (0, _classnames2.default)(alignSelf && cssClass.alignSelf(alignSelf), grow && cssClass.GROW, className)
    }, additionalProps),
    children
  );
}

FlexItem.propTypes = {
  alignSelf: PropTypes.oneOf(_lodash2.default.values(_ItemAlign2.default)),
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.any,
  grow: PropTypes.bool
};

FlexItem.defaultProps = {
  component: "div"
};

FlexItem.cssClass = {
  GROW: "flex--grow",

  alignSelf: function alignSelf(value) {
    return "self--" + value;
  }
};