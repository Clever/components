"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InfoPanelColumn;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InfoPanelColumn(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var cssClass = InfoPanelColumn.cssClass;


  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)(cssClass.CONTAINER, className) },
    children
  );
}

InfoPanelColumn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

InfoPanelColumn.cssClass = {
  CONTAINER: "InfoPanelColumn"
};