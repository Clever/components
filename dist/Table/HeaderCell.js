"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeaderCell;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _tablePropTypes = require("./tablePropTypes");

var tablePropTypes = _interopRequireWildcard(_tablePropTypes);

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _SortIcons = require("./SortIcons");

var _SortIcons2 = _interopRequireDefault(_SortIcons);

var _flex = require("../flex");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./HeaderCell.less");

function HeaderCell(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var onSortChange = _ref.onSortChange;
  var sortable = _ref.sortable;
  var activeSortDirection = _ref.activeSortDirection;
  var width = _ref.width;
  var cssClass = HeaderCell.cssClass;


  return _react2.default.createElement(
    _Cell2.default,
    {
      className: (0, _classnames2.default)(cssClass.HEADER_CELL, sortable && cssClass.SORTABLE, className),
      onClick: function onClick() {
        return sortable && onSortChange();
      },
      width: width
    },
    _react2.default.createElement(
      _flex.FlexBox,
      { alignItems: _flex.ItemAlign.CENTER },
      _react2.default.createElement(
        "div",
        { className: cssClass.LABEL },
        children
      ),
      sortable && _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_SortIcons2.default, { direction: activeSortDirection, className: cssClass.SORT })
      )
    )
  );
}

HeaderCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSortChange: PropTypes.func,
  sortable: PropTypes.bool,
  activeSortDirection: tablePropTypes.sortDirection,
  width: PropTypes.string
};

HeaderCell.cssClass = {
  CONTENT: "Table--header--cell--content",
  HEADER_CELL: "Table--header--cell",
  LABEL: "Table--header--cell--label",
  SORTABLE: "Table--header--cell--sortable",
  SORT: "Table--header--cell--sort_icons"
};