"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FlexBox;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _ContentAlign = require("./ContentAlign");

var _ContentAlign2 = _interopRequireDefault(_ContentAlign);

var _FlexItem = require("./FlexItem");

var _FlexItem2 = _interopRequireDefault(_FlexItem);

var _ItemAlign = require("./ItemAlign");

var _ItemAlign2 = _interopRequireDefault(_ItemAlign);

var _Justify = require("./Justify");

var _Justify2 = _interopRequireDefault(_Justify);

require("../less/flex.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FlexBox(_ref) {
  var alignContent = _ref.alignContent;
  var alignItems = _ref.alignItems;
  var children = _ref.children;
  var className = _ref.className;
  var column = _ref.column;
  var inline = _ref.inline;
  var justify = _ref.justify;
  var wrap = _ref.wrap;

  var additionalProps = _objectWithoutProperties(_ref, ["alignContent", "alignItems", "children", "className", "column", "inline", "justify", "wrap"]);

  var cssClass = FlexBox.cssClass;


  return _react2.default.createElement(
    _FlexItem2.default,
    _extends({
      className: (0, _classnames2.default)(inline ? cssClass.FLEXBOX_INLINE : cssClass.FLEXBOX, column && cssClass.COLUMN, alignContent && cssClass.alignContent(alignContent), alignItems && cssClass.alignItems(alignItems), justify && cssClass.justify(justify), wrap && cssClass.WRAP, className)
    }, additionalProps),
    children
  );
}

FlexBox.propTypes = _extends({}, _FlexItem2.default.propTypes, {
  alignContent: PropTypes.oneOf(_lodash2.default.values(_ContentAlign2.default)),
  alignItems: PropTypes.oneOf(_lodash2.default.values(_ItemAlign2.default)),
  children: PropTypes.node,
  className: PropTypes.string,
  column: PropTypes.bool,
  inline: PropTypes.bool,
  justify: PropTypes.oneOf(_lodash2.default.values(_Justify2.default)),
  wrap: PropTypes.bool
});

FlexBox.defaultProps = {
  component: "div"
};

FlexBox.cssClass = {
  FLEXBOX: "flexbox",
  COLUMN: "flex--direction--column",
  FLEXBOX_INLINE: "flexbox--inline",
  WRAP: "flex--wrap",

  alignContent: function alignContent(value) {
    return "content--" + value;
  },
  alignItems: function alignItems(value) {
    return "items--" + value;
  },
  justify: function justify(value) {
    return "justify--" + value;
  }
};