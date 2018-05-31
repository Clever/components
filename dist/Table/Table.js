"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

    if (props.lazy) {
      var _arr = ["data", "filter", "initialPage"];

      for (var _i = 0; _i < _arr.length; _i++) {
        var p = _arr[_i];
        if (props[p]) {
          console.error("Table: prop \"" + p + "\" may not be set if \"lazy\"");
        }
      }
      if (!props.getData) {
        console.error("Table: prop \"getData\" must be set if \"lazy\"");
      }
    } else {
      if (!props.data) {
        console.error("Table: prop \"data\" must be set if not \"lazy\"");
      }
      var _arr2 = ["getData", "numRows"];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var _p = _arr2[_i2];
        if (props[_p]) {
          console.error("Table: prop \"" + _p + "\" may not be set if not \"lazy\"");
        }
      }
    }

    _this.state = {
      currentPage: props.initialPage || 1,
      sortState: props.initialSortState,

      // lazy table state
      lazyPages: [],
      pageLoading: false,
      allLoaded: false
    };

    // the epoch is incremented on calls to this.lazyReset, so we know to throw
    // out in-progress fetches if the table gets reset (see this._fetchLazy).
    _this._epoch = 0;
    return _this;
  }

  _createClass(Table, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.lazy) {
        this._fetchLazy(0);
      }
    }

    /**
     * @param {number} page - 1-based index of the page to select.
     */

  }, {
    key: "setCurrentPage",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(page) {
        var _this2 = this;

        var _props, onPageChange, onViewChange, lazy, _state, currentPage, pageLoading, pageIdx;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = this.props;
                onPageChange = _props.onPageChange;
                onViewChange = _props.onViewChange;
                lazy = _props.lazy;
                _state = this.state;
                currentPage = _state.currentPage;
                pageLoading = _state.pageLoading;

                if (!(page === currentPage || pageLoading)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                if (!lazy) {
                  _context.next = 13;
                  break;
                }

                pageIdx = page - 1;
                _context.next = 13;
                return this._fetchLazy(pageIdx);

              case 13:

                this.setState({ currentPage: page }, function () {
                  onPageChange(page);
                  if (onViewChange) {
                    var _getDisplayedData2 = _this2._getDisplayedData();

                    var displayedData = _getDisplayedData2.displayedData;

                    onViewChange(displayedData);
                  }
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setCurrentPage(_x) {
        return _ref.apply(this, arguments);
      }

      return setCurrentPage;
    }()
  }, {
    key: "_fetchLazy",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(pageIdx) {
        var _props2, pageSize, getData, rowIDFn, lazyPages, startEpoch, newPages, idx, query, lastPage, pageData;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _props2 = this.props;
                pageSize = _props2.pageSize;
                getData = _props2.getData;
                rowIDFn = _props2.rowIDFn;
                lazyPages = this.state.lazyPages;

                // if we've already fetched the page, no need to do anything here -- it's
                // cached

                if (!(pageIdx < lazyPages.length)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return");

              case 7:
                startEpoch = this._epoch;


                this.setState({ pageLoading: true });

                newPages = lazyPages.slice(0);
                idx = lazyPages.length;

              case 11:
                if (!(idx <= pageIdx)) {
                  _context2.next = 21;
                  break;
                }

                query = { pageSize: pageSize };

                // the first page shouldn't have a startingAfter parameter

                if (idx !== 0) {
                  lastPage = newPages[idx - 1];

                  query.startingAfter = rowIDFn(lastPage[lastPage.length - 1]);
                }

                _context2.next = 16;
                return getData(query);

              case 16:
                pageData = _context2.sent;

                newPages.push(pageData);

              case 18:
                idx++;
                _context2.next = 11;
                break;

              case 21:
                if (!(this._epoch !== startEpoch)) {
                  _context2.next = 23;
                  break;
                }

                return _context2.abrupt("return");

              case 23:

                if (newPages[newPages.length - 1].length < pageSize) {
                  this.setState({ allLoaded: true });
                  if (newPages[newPages.length - 1].length === 0) {
                    // remove the last page if it's empty (this happens if the number of
                    // rows is divisible by the page size)
                    newPages.splice(-1);
                  }
                }

                this.setState({ lazyPages: newPages, pageLoading: false });

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _fetchLazy(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _fetchLazy;
    }()

    /**
     * Resets all lazily-loaded data. Call this if you change the backing data
     * behind the `getData` function (i.e. apply a search filter).
     */

  }, {
    key: "lazyReset",
    value: function lazyReset() {
      var _this3 = this;

      if (this.props.lazy) {
        this._epoch++;
        this.setCurrentPage(1);
        this.setState({ lazyPages: [], allLoaded: false }, function () {
          _this3._fetchLazy(0);
        });
      }
    }
  }, {
    key: "_getColumn",
    value: function _getColumn(columnID) {
      return _lodash2.default.find(_react2.default.Children.toArray(this.props.children), function (column) {
        return column.props.id === columnID;
      });
    }
  }, {
    key: "_toggleSort",
    value: function _toggleSort(columnID) {
      var _this4 = this;

      var oldSortState = this.state.sortState;

      var newSortState = {
        columnID: columnID,
        direction: _sortDirection2.default.ASCENDING
      };

      if (oldSortState && oldSortState.columnID === columnID) {
        newSortState.direction = oldSortState.direction === _sortDirection2.default.ASCENDING ? _sortDirection2.default.DESCENDING : _sortDirection2.default.ASCENDING;
      }

      // Reset to 1st page since table sort has changed.
      this.setCurrentPage(1);
      this.setState({ sortState: newSortState }, function () {
        _this4.props.onSortChange(_this4.state.sortState);
        if (_this4.props.onViewChange) {
          var _getDisplayedData3 = _this4._getDisplayedData();

          var displayedData = _getDisplayedData3.displayedData;

          _this4.props.onViewChange(displayedData);
        }
      });
      this.lazyReset();
    }
  }, {
    key: "_getSynchronousData",
    value: function _getSynchronousData() {
      var _props3 = this.props;
      var data = _props3.data;
      var filter = _props3.filter;
      var pageSize = _props3.pageSize;
      var paginated = _props3.paginated;
      var _state2 = this.state;
      var currentPage = _state2.currentPage;
      var sortState = _state2.sortState;


      var displayedData = (0, _lodash2.default)(data);
      if (filter) {
        displayedData = displayedData.filter(filter);
      }
      if (sortState) {
        var sortedColumn = this._getColumn(sortState.columnID);
        // sortedColumn might not exist if a column is removed from the table
        // dynamically. in this case, just ignore the sort state.
        if (sortedColumn) {
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
        }
      }

      displayedData = displayedData.value();

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
      var idx = Math.min(currentPage, numPages) - 1;
      return { displayedData: pages[idx], numPages: numPages };
    }
  }, {
    key: "_getLazyData",
    value: function _getLazyData() {
      var _props4 = this.props;
      var numRows = _props4.numRows;
      var pageSize = _props4.pageSize;
      var _state3 = this.state;
      var currentPage = _state3.currentPage;
      var lazyPages = _state3.lazyPages;


      var numPages = void 0;
      if (numRows != null) {
        numPages = Math.max(Math.ceil(numRows / pageSize), 1);
      } else {
        if (lazyPages.length === 0) {
          numPages = 1;
        } else {
          numPages = lazyPages.length;
        }
      }

      var idx = Math.min(currentPage, numPages) - 1;

      if (idx < lazyPages.length) {
        return { displayedData: lazyPages[idx], numPages: numPages };
      }
      return { displayedData: [], numPages: numPages };
    }
  }, {
    key: "_getDisplayedData",
    value: function _getDisplayedData() {
      if (!this.props.lazy) {
        return this._getSynchronousData();
      }
      return this._getLazyData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _props5 = this.props;
      var children = _props5.children;
      var className = _props5.className;
      var fixed = _props5.fixed;
      var paginated = _props5.paginated;
      var rowIDFn = _props5.rowIDFn;
      var rowClassNameFn = _props5.rowClassNameFn;
      var onRowClick = _props5.onRowClick;
      var cssClass = Table.cssClass;
      var _props6 = this.props;
      var lazy = _props6.lazy;
      var numRows = _props6.numRows;
      var _state4 = this.state;
      var currentPage = _state4.currentPage;
      var sortState = _state4.sortState;
      var pageLoading = _state4.pageLoading;
      var allLoaded = _state4.allLoaded;


      var columns = _lodash2.default.compact(_react2.default.Children.toArray(children));
      if (columns.length < 2 && process.env.NODE_ENV !== "production") {
        console.error("Table requires at least 2 columns. Consider using the List component instead.");
      }

      var _getDisplayedData4 = this._getDisplayedData();

      var displayedData = _getDisplayedData4.displayedData;
      var numPages = _getDisplayedData4.numPages;

      var displayedPage = Math.min(currentPage, numPages);
      var disableSort = numPages <= 1 && displayedData.length <= 1;

      return _react2.default.createElement(
        "table",
        { className: (0, _classnames2.default)(cssClass.TABLE, fixed && cssClass.FIXED, className) },
        _react2.default.createElement(
          _Header2.default,
          { disableSort: disableSort, onSortChange: function onSortChange(columnID) {
              return _this5._toggleSort(columnID);
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
              !pageLoading && "NO DATA"
            )
          ) : displayedData.map(function (rowData) {
            return _react2.default.createElement(
              "tr",
              {
                className: (0, _classnames2.default)(cssClass.ROW, onRowClick && cssClass.CLICKABLE_ROW, rowClassNameFn && rowClassNameFn(rowData)),
                key: rowIDFn(rowData),
                onClick: function onClick(e) {
                  return onRowClick && onRowClick(e, rowIDFn(rowData), rowData);
                }
              },
              columns.map(function (_ref3) {
                var col = _ref3.props;
                return _react2.default.createElement(
                  _Cell2.default,
                  { className: getCellClassName(col, rowData), key: col.id, noWrap: col.noWrap },
                  col.cell.renderer(rowData)
                );
              })
            );
          })
        ),
        paginated && _react2.default.createElement(_Footer2.default, {
          currentPage: displayedPage,
          onPageChange: function onPageChange(newPage) {
            return _this5.setCurrentPage(newPage);
          },
          numColumns: columns.length,
          numPages: numPages,
          showLastPage: !lazy,
          isLoading: pageLoading,
          lengthUnknown: lazy && numRows == null && !allLoaded
        })
      );
    }
  }]);

  return Table;
}(_react.Component);

function getCellClassName(columnProps, rowData) {
  var className = columnProps.cell.className;


  if (typeof className === "function") {
    return className(rowData);
  }

  return className;
}

Table.propTypes = {
  children: PropTypes.arrayOf(_MorePropTypes2.default.instanceOfComponent(_Column2.default)),
  className: PropTypes.string,
  data: PropTypes.array,
  filter: PropTypes.func,
  fixed: PropTypes.bool,
  initialPage: tablePropTypes.pageNumber,
  initialSortState: tablePropTypes.sortState,
  onPageChange: PropTypes.func,
  onRowClick: PropTypes.func,
  onSortChange: PropTypes.func,
  onViewChange: PropTypes.func,
  pageSize: PropTypes.number,
  paginated: PropTypes.bool,
  rowIDFn: PropTypes.func.isRequired,
  rowClassNameFn: PropTypes.func,

  // these must all be set together
  lazy: PropTypes.bool,
  getData: PropTypes.func,
  numRows: PropTypes.number
};

Table.defaultProps = {
  onPageChange: function onPageChange() {},
  onSortChange: function onSortChange() {},
  pageSize: DEFAULT_PAGE_SIZE
};

Table.cssClass = {
  BODY: "Table--body",
  CLICKABLE_ROW: "Table--clickable_row",
  FIXED: "Table--fixed",
  NO_DATA: "Table--no_data_cell",
  ROW: "Table--row",
  TABLE: "Table"
};

Table.Column = _Column2.default;

Table.sortDirection = _sortDirection2.default;