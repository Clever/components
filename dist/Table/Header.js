"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _tablePropTypes = require("./tablePropTypes");

var tablePropTypes = _interopRequireWildcard(_tablePropTypes);

var _Column = require("./Column");

var _Column2 = _interopRequireDefault(_Column);

var _HeaderCell = require("./HeaderCell");

var _HeaderCell2 = _interopRequireDefault(_HeaderCell);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Header(_ref) {
  var children = _ref.children;
  var disableSort = _ref.disableSort;
  var _onSortChange = _ref.onSortChange;
  var sortState = _ref.sortState;
  var cssClass = Header.cssClass;


  return _react2.default.createElement(
    "thead",
    { className: cssClass.CONTAINER },
    _react2.default.createElement(
      "tr",
      { className: cssClass.ROW },
      children.map(function (_ref2) {
        var column = _ref2.props;
        return _react2.default.createElement(
          _HeaderCell2.default,
          {
            activeSortDirection: sortState.columnID === column.id ? sortState.direction : null,
            className: column.header && column.header.className,
            key: column.id,
            onSortChange: function onSortChange() {
              return _onSortChange(column.id);
            },
            sortable: column.sortable && !disableSort,
            width: column.width
          },
          column.header && column.header.content
        );
      })
    )
  );
}

exports.default = Header;
Header.propTypes = {
  children: PropTypes.arrayOf(_MorePropTypes2.default.instanceOfComponent(_Column2.default)),
  disableSort: PropTypes.bool,
  onSortChange: PropTypes.func,
  sortState: tablePropTypes.sortState
};

Header.defaultProps = {
  sortState: {}
};

Header.cssClass = {
  CONTAINER: "Table--header",
  ROW: "Table--header--row",
  SORTABLE: "Table--header--cell--sortable"
};