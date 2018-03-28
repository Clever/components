"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortIcons;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _tablePropTypes = require("./tablePropTypes");

var tablePropTypes = _interopRequireWildcard(_tablePropTypes);

var _sortDirection = require("./sortDirection");

var _sortDirection2 = _interopRequireDefault(_sortDirection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIDTH = 7;
var HEIGHT = 12;

function SortIcons(_ref) {
  var direction = _ref.direction;
  var className = _ref.className;
  var scale = _ref.scale;
  var cssClass = SortIcons.cssClass;


  return _react2.default.createElement(
    "svg",
    {
      className: (0, _classnames2.default)(cssClass.CONTAINER, className),
      width: WIDTH * scale,
      height: HEIGHT * scale,
      viewBox: "0 0 " + WIDTH + " " + HEIGHT
    },
    _react2.default.createElement("polygon", {
      className: (0, _classnames2.default)(cssClass.DIRECTION, cssClass.ASCENDING, direction === _sortDirection2.default.ASCENDING && cssClass.ACTIVE),
      points: "3.5 0 7 5 0 5"
    }),
    _react2.default.createElement("polygon", {
      className: (0, _classnames2.default)(cssClass.DIRECTION, cssClass.DESCENDING, direction === _sortDirection2.default.DESCENDING && cssClass.ACTIVE),
      points: "3.5 12 7 7 0 7"
    })
  );
}

SortIcons.propTypes = {
  direction: tablePropTypes.sortDirection,
  className: PropTypes.string,
  scale: PropTypes.number
};

SortIcons.defaultProps = {
  scale: 1
};

SortIcons.cssClass = {
  ACTIVE: "Table--sort_icons--direction--active",
  ASCENDING: "Table--sort_icons--direction--ascending",
  CONTAINER: "Table--sort_icons",
  DESCENDING: "Table--sort_icons--direction--descending",
  DIRECTION: "Table--sort_icons--direction"
};