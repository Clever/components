"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tablePropTypes = require("./tablePropTypes");

var tablePropTypes = _interopRequireWildcard(_tablePropTypes);

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _Column = require("./Column");

var _Column2 = _interopRequireDefault(_Column);

var _Footer = require("./Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _sortDirection = require("./sortDirection");

var _sortDirection2 = _interopRequireDefault(_sortDirection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./Table.less");

var DEFAULT_PAGE_SIZE = 10;

var Table = exports.Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = {
      currentPage: props.initialPage || 1
    };
    return _this;
  }

  /**
   * @param {number} page - 1-based index of the page to select.
   */


  _createClass(Table, [{
    key: "setCurrentPage",
    value: function setCurrentPage(page) {
      var _this2 = this;

      if (page === this.state.currentPage) {
        return;
      }

      this.setState({ currentPage: page }, function () {
        return _this2.props.onPageChange(page);
      });
    }
  }, {
    key: "_getColumn",
    value: function _getColumn(columnID) {
      return _lodash2.default.find(this.props.children, function (column) {
        return column.props.id === columnID;
      });
    }
  }, {
    key: "_toggleSort",
    value: function _toggleSort(columnID) {
      var _this3 = this;

      var oldSortState = this.state.sortState || this.props.initialSortState;

      var newSortState = {
        columnID: columnID,
        direction: _sortDirection2.default.ASCENDING
      };

      if (oldSortState && oldSortState.columnID === columnID) {
        newSortState.direction = oldSortState.direction === _sortDirection2.default.ASCENDING ? _sortDirection2.default.DESCENDING : _sortDirection2.default.ASCENDING;
      }

      this.setState({ sortState: newSortState }, function () {
        return _this3.props.onSortChange(_this3.state.sortState);
      });
      // Reset to 1st page since table sort has changed.
      this.setCurrentPage(1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props;
      var columns = _props.children;
      var className = _props.className;
      var data = _props.data;
      var filter = _props.filter;
      var fixed = _props.fixed;
      var initialSortState = _props.initialSortState;
      var pageSize = _props.pageSize;
      var paginated = _props.paginated;
      var rowIDFn = _props.rowIDFn;
      var _state = this.state;
      var currentPage = _state.currentPage;
      var _state$sortState = _state.sortState;
      var sortState = _state$sortState === undefined ? initialSortState : _state$sortState;
      var cssClass = Table.cssClass;


      var displayedData = (0, _lodash2.default)(data);
      if (filter) {
        displayedData = displayedData.filter(filter);
      }
      if (sortState) {
        (function () {
          var sortedColumn = _this4._getColumn(sortState.columnID);
          displayedData = displayedData.sortBy(function (row) {
            var value = sortedColumn.props.sortValueFn(row);

            if (typeof value === "string") {
              value = value.trim().toLowerCase();
            }

            return value;
          });

          if (sortState.direction === _sortDirection2.default.DESCENDING) {
            displayedData = displayedData.reverse();
          }
        })();
      }

      displayedData = displayedData.value();
      var disableSort = displayedData.length <= 1;

      var pages = [displayedData];
      if (paginated) {
        pages = _lodash2.default.chunk(displayedData, pageSize);
      }

      if (pages.length === 0) {
        // Chunking will return 0 pages if the data array is empty. Since we always show at least one
        // page of (potentially empty) data, add an empty page by default.
        pages = [[]];
      }

      var numPages = pages.length;
      var displayedPage = Math.min(currentPage, numPages);
      var displayedPageIndex = displayedPage - 1;

      return _react2.default.createElement(
        "table",
        { className: (0, _classnames2.default)(cssClass.TABLE, fixed && cssClass.FIXED, className) },
        _react2.default.createElement(
          _Header2.default,
          { disableSort: disableSort, onSortChange: function onSortChange(columnID) {
              return _this4._toggleSort(columnID);
            }, sortState: sortState },
          columns
        ),
        _react2.default.createElement(
          "tbody",
          { className: cssClass.BODY },
          displayedData.length === 0 ? _react2.default.createElement(
            "tr",
            { className: cssClass.ROW },
            _react2.default.createElement(
              _Cell2.default,
              { className: cssClass.NO_DATA, colSpan: columns.length, noWrap: true },
              "NO DATA"
            )
          ) : pages[displayedPageIndex].map(function (rowData) {
            return _react2.default.createElement(
              "tr",
              { className: cssClass.ROW, key: rowIDFn(rowData) },
              columns.map(function (_ref) {
                var col = _ref.props;
                return _react2.default.createElement(
                  _Cell2.default,
                  { className: col.cell.className, key: col.id, noWrap: col.noWrap },
                  col.cell.renderer(rowData)
                );
              })
            );
          })
        ),
        paginated && _react2.default.createElement(_Footer2.default, {
          currentPage: displayedPage,
          onPageChange: function onPageChange(newPage) {
            return _this4.setCurrentPage(newPage);
          },
          numColumns: columns.length,
          numPages: numPages
        })
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  children: _react.PropTypes.arrayOf(_MorePropTypes2.default.instanceOfComponent(_Column2.default)),
  className: _react.PropTypes.string,
  data: _react.PropTypes.array.isRequired,
  filter: _react.PropTypes.func,
  fixed: _react.PropTypes.bool,
  initialPage: tablePropTypes.pageNumber,
  initialSortState: tablePropTypes.sortState,
  onPageChange: _react.PropTypes.func,
  onSortChange: _react.PropTypes.func,
  pageSize: _react.PropTypes.number,
  paginated: _react.PropTypes.bool,
  rowIDFn: _react.PropTypes.func.isRequired
};

Table.defaultProps = {
  filter: function filter() {
    return true;
  },
  onPageChange: function onPageChange() {},
  onSortChange: function onSortChange() {},
  pageSize: DEFAULT_PAGE_SIZE
};

Table.cssClass = {
  BODY: "Table--body",
  FIXED: "Table--fixed",
  NO_DATA: "Table--no_data_cell",
  ROW: "Table--row",
  TABLE: "Table"
};

Table.Column = _Column2.default;

Table.sortDirection = _sortDirection2.default;