"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageNumber = exports.sortState = exports.sortDirection = undefined;

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _sortDirection = require("./sortDirection");

var _sortDirection2 = _interopRequireDefault(_sortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var sortDirection = exports.sortDirection = PropTypes.oneOf([_sortDirection2.default.ASCENDING, _sortDirection2.default.DESCENDING]);

var sortState = exports.sortState = PropTypes.shape({
  columnID: PropTypes.string,
  direction: sortDirection
});

var pageNumber = exports.pageNumber = function pageNumber(props, propName, componentName) {
  var value = props[propName];

  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "number" || value < 1) {
    return new Error("Invalid prop `" + propName + "` supplied to " + componentName + ". Must be a 1-based page index.");
  }

  return null;
};

pageNumber.isRequired = function (props, propName, componentName) {
  var value = props[propName];
  if (value === null || value === undefined) {
    return new Error("Missing required prop `" + propName + "` in " + componentName + ".");
  }

  return pageNumber(props, propName, componentName);
};