"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

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

var _Button = require("../Button/Button");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./Footer.less");

/**
 * Pagination footer for the Table component.
 * Only rendered if there are at least 2 pages of data available.
 */
function Footer(_ref) {
  var currentPage = _ref.currentPage;
  var numColumns = _ref.numColumns;
  var numPages = _ref.numPages;
  var onPageChange = _ref.onPageChange;
  var showLastPage = _ref.showLastPage;
  var isLoading = _ref.isLoading;
  var lengthUnknown = _ref.lengthUnknown;
  var cssClass = Footer.cssClass;
  var VISIBLE_PAGE_RANGE_SIZE = Footer.VISIBLE_PAGE_RANGE_SIZE;


  var renderEllipsis = function renderEllipsis() {
    return _react2.default.createElement(
      "span",
      { className: cssClass.ELLIPSIS },
      "\u2026"
    );
  };

  var selectPage = function selectPage(page) {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  if (numPages < 2 && !lengthUnknown && !isLoading) {
    return null;
  }

  // Find the widest possible number range <= `VISIBLE_PAGE_RANGE_SIZE`.
  var pageNumberPadding = (VISIBLE_PAGE_RANGE_SIZE - 1) / 2;
  var pageNumStart = void 0;
  if (currentPage + pageNumberPadding >= numPages) {
    pageNumStart = Math.max(numPages - (VISIBLE_PAGE_RANGE_SIZE - 1), 1);
  } else {
    pageNumStart = Math.max(currentPage - pageNumberPadding, 1);
  }
  var pageNumEnd = Math.min(pageNumStart + (VISIBLE_PAGE_RANGE_SIZE - 1), numPages);

  var visibleRange = [];
  for (var i = pageNumStart; i <= pageNumEnd; i++) {
    visibleRange.push(i);
  }

  return _react2.default.createElement(
    "tfoot",
    { className: cssClass.CONTAINER },
    _react2.default.createElement(
      "tr",
      { className: cssClass.ROW },
      _react2.default.createElement(
        _Cell2.default,
        {
          className: cssClass.CELL,
          colSpan: numColumns
        },
        isLoading && _react2.default.createElement(
          "div",
          { className: cssClass.LOADING_CONTAINER },
          _react2.default.createElement(
            "div",
            { className: cssClass.LOADING_PILL },
            "Loading..."
          )
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_Button.Button, {
            className: cssClass.BUTTON_SCROLL,
            disabled: currentPage === 1,
            onClick: function onClick() {
              return selectPage(currentPage - 1);
            },
            type: "link",
            size: "small",
            value: "Prev"
          }),
          _react2.default.createElement(
            "div",
            { className: cssClass.PAGE_NUMBERS },
            visibleRange[0] > 1 && _react2.default.createElement(_Button.Button, {
              className: cssClass.BUTTON_PAGE,
              key: 1,
              onClick: function onClick() {
                return selectPage(1);
              },
              type: "link",
              size: "small",
              value: "1"
            }),
            visibleRange[0] > 2 && renderEllipsis(),
            visibleRange.map(function (pageNumber) {
              return _react2.default.createElement(_Button.Button, {
                className: (0, _classnames2.default)(cssClass.BUTTON_PAGE, pageNumber === currentPage && cssClass.BUTTON_PAGE_SELECTED),
                key: pageNumber,
                onClick: function onClick() {
                  return selectPage(pageNumber);
                },
                type: "link",
                size: "small",
                value: "" + pageNumber
              });
            }),
            (visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages - 1 || lengthUnknown) && renderEllipsis(),
            visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages && showLastPage && _react2.default.createElement(_Button.Button, {
              className: cssClass.BUTTON_PAGE,
              key: numPages,
              onClick: function onClick() {
                return selectPage(numPages);
              },
              type: "link",
              size: "small",
              value: "" + numPages
            })
          ),
          _react2.default.createElement(_Button.Button, {
            className: cssClass.BUTTON_SCROLL,
            disabled: currentPage === numPages && !lengthUnknown,
            onClick: function onClick() {
              return selectPage(currentPage + 1, numPages);
            },
            type: "link",
            size: "small",
            value: "Next"
          })
        )
      )
    )
  );
}

Footer.propTypes = {
  currentPage: tablePropTypes.pageNumber.isRequired,
  onPageChange: PropTypes.func,
  numColumns: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  showLastPage: PropTypes.bool,
  isLoading: PropTypes.bool,
  lengthUnknown: PropTypes.bool
};

Footer.defaultProps = {
  onPageChange: function onPageChange() {},
  showLastPage: true
};

Footer.cssClass = {
  BUTTON_PAGE: "Table--footer--button--page",
  BUTTON_PAGE_SELECTED: "Table--footer--button--page--selected",
  BUTTON_SCROLL: "Table--footer--button--scroll",
  CELL: "Table--footer--cell",
  CONTAINER: "Table--footer",
  ELLIPSIS: "Table--footer--ellipsis",
  PAGE_NUMBERS: "Table--footer--page_numbers",
  ROW: "Table--footer--row",
  LOADING_CONTAINER: "Table--footer--loadingContainer",
  LOADING_PILL: "Table--footer--loadingPill"
};

Footer.VISIBLE_PAGE_RANGE_SIZE = 5;