"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = ProgressBar;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

require("./ProgressBar.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALID_DIRECTIONS = ["up", "down", "right", "left"];
var DEFAULT_DIRECTION = "right";

function ProgressBar(_ref) {
  var percentage = _ref.percentage;
  var className = _ref.className;
  var _ref$direction = _ref.direction;
  var direction = _ref$direction === undefined ? DEFAULT_DIRECTION : _ref$direction;
  var style = _ref.style;
  var _ref$length = _ref.length;
  var length = _ref$length === undefined ? "100%" : _ref$length;

  var truePercentage = Math.max(0, Math.min(percentage, 1)) * 100;
  var progressStyle = void 0;
  var lengthStyle = void 0;

  switch (direction) {
    case "up":
    case "down":
      progressStyle = { height: truePercentage + "%" };
      lengthStyle = { height: length };
      break;
    case "right":
    case "left":
      progressStyle = { width: truePercentage + "%" };
      lengthStyle = { width: length };
      break;
    default:
      console.error("Unexpected direction " + direction + ", assuming \"right\"");
      progressStyle = { width: truePercentage + "%" };
      lengthStyle = { width: length };
  }

  var trueDirection = _lodash2.default.includes(VALID_DIRECTIONS, direction) ? direction : DEFAULT_DIRECTION;

  return _react2.default.createElement(
    "div",
    {
      className: (0, _classnames2.default)("ProgressBar", "ProgressBar--" + trueDirection, className),
      style: _lodash2.default.assign({}, lengthStyle, style)
    },
    _react2.default.createElement("div", {
      className: "ProgressBar--filledIn",
      style: _lodash2.default.assign({}, progressStyle)
    })
  );
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  percentage: PropTypes.number,
  style: PropTypes.object,
  direction: PropTypes.oneOf(VALID_DIRECTIONS),
  length: PropTypes.string
};