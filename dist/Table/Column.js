"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Column;

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Column() {
  throw new Error("Configuration component - not meant to be rendered.");
}

Column.propTypes = {
  cell: PropTypes.shape({
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    renderer: PropTypes.func.isRequired
  }),
  id: PropTypes.string.isRequired,
  header: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node
  }),
  noWrap: PropTypes.bool,
  sortable: PropTypes.bool,
  sortValueFn: PropTypes.func
};