"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default =

/**
 * Pagination footer for the Table component.
 * Only rendered if there are at least 2 pages of data available.
 */
Footer;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tablePropTypes = require("./tablePropTypes");

var tablePropTypes = _interopRequireWildcard(_tablePropTypes);

var _Cell = require("./Cell");

var _Cell2 = _interopRequireDefault(_Cell);

var _Button = require("../Button/Button");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./Footer.less");function Footer(_ref) {
  var currentPage = _ref.currentPage;
  var numColumns = _ref.numColumns;
  var numPages = _ref.numPages;
  var onPageChange = _ref.onPageChange;
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

  if (numPages < 2) {
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
        _react2.default.createElement(_Button.Button, {
          className: cssClass.BUTTON_SCROLL,
          disabled: currentPage === 1,
          onClick: function onClick() {
            return selectPage(currentPage - 1);
          },
          type: "linkPlain",
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
            type: "linkPlain",
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
              type: "linkPlain",
              value: "" + pageNumber
            });
          }),
          visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages - 1 && renderEllipsis(),
          visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages && _react2.default.createElement(_Button.Button, {
            className: cssClass.BUTTON_PAGE,
            key: numPages,
            onClick: function onClick() {
              return selectPage(numPages);
            },
            type: "linkPlain",
            value: "" + numPages
          })
        ),
        _react2.default.createElement(_Button.Button, {
          className: cssClass.BUTTON_SCROLL,
          disabled: currentPage === numPages,
          onClick: function onClick() {
            return selectPage(currentPage + 1, numPages);
          },
          type: "linkPlain",
          value: "Next"
        })
      )
    )
  );
}

Footer.propTypes = {
  currentPage: tablePropTypes.pageNumber.isRequired,
  onPageChange: _react.PropTypes.func,
  numColumns: _react.PropTypes.number.isRequired,
  numPages: _react.PropTypes.number.isRequired
};

Footer.defaultProps = {
  onPageChange: function onPageChange() {}
};

Footer.cssClass = {
  BUTTON_PAGE: "Table--footer--button--page",
  BUTTON_PAGE_SELECTED: "Table--footer--button--page--selected",
  BUTTON_SCROLL: "Table--footer--button--scroll",
  CELL: "Table--footer--cell",
  CONTAINER: "Table--footer",
  ELLIPSIS: "Table--footer--ellipsis",
  PAGE_NUMBERS: "Table--footer--page_numbers",
  ROW: "Table--footer--row"
};

Footer.VISIBLE_PAGE_RANGE_SIZE = 5;