"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Column;

var _react = require("react");

function Column() {
  throw new Error("Configuration component - not meant to be rendered.");
}

Column.propTypes = {
  cell: _react.PropTypes.shape({
    className: _react.PropTypes.string,
    renderer: _react.PropTypes.func.isRequired
  }),
  id: _react.PropTypes.string.isRequired,
  header: _react.PropTypes.shape({
    className: _react.PropTypes.string,
    content: _react.PropTypes.node
  }),
  noWrap: _react.PropTypes.bool,
  sortable: _react.PropTypes.bool,
  sortValueFn: _react.PropTypes.func
};