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

var _ItemAlign = require("./ItemAlign");

var _ItemAlign2 = _interopRequireDefault(_ItemAlign);

require("../less/flex.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FlexItem(_ref) {
  var alignSelf = _ref.alignSelf;
  var children = _ref.children;
  var className = _ref.className;
  var Wrapper = _ref.component;
  var grow = _ref.grow;

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
  alignSelf: _react.PropTypes.oneOf(_lodash2.default.values(_ItemAlign2.default)),
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  component: _react.PropTypes.any,
  grow: _react.PropTypes.bool
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