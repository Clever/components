"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RichText;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _reactLinkify = require("react-linkify");

var _reactLinkify2 = _interopRequireDefault(_reactLinkify);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RichText(props) {
  return _react2.default.createElement(
    _reactLinkify2.default,
    { properties: { target: "_blank" } },
    props.text.split("\n").map(function (item, key) {
      return _react2.default.createElement(
        "span",
        { key: key },
        item,
        _react2.default.createElement("br", null)
      );
    })
  );
}

RichText.propTypes = {
  text: PropTypes.string.isRequired
};