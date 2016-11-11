"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageNumber = exports.sortState = exports.sortDirection = undefined;

var _react = require("react");

var _sortDirection = require("./sortDirection");

var _sortDirection2 = _interopRequireDefault(_sortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortDirection = exports.sortDirection = _react.PropTypes.oneOf([_sortDirection2.default.ASCENDING, _sortDirection2.default.DESCENDING]);

var sortState = exports.sortState = _react.PropTypes.shape({
  columnID: _react.PropTypes.string,
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