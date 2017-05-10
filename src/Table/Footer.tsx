import classnames from "classnames";
import * as React from "react";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import {Button} from "../Button/Button";

import "./Footer.less";


const CLASSNAMES = {
  BUTTON_PAGE: "Table--footer--button--page",
  BUTTON_PAGE_SELECTED: "Table--footer--button--page--selected",
  BUTTON_SCROLL: "Table--footer--button--scroll",
  CELL: "Table--footer--cell",
  CONTAINER: "Table--footer",
  ELLIPSIS: "Table--footer--ellipsis",
  PAGE_NUMBERS: "Table--footer--page_numbers",
  ROW: "Table--footer--row",
  LOADING_CONTAINER: "Table--footer--loadingContainer",
  LOADING_PILL: "Table--footer--loadingPill",
};

const VISIBLE_PAGE_RANGE_SIZE = 5;

/**
 * Pagination footer for the Table component.
 * Only rendered if there are at least 2 pages of data available.
 */
export default function Footer({currentPage, numColumns, numPages, onPageChange, showLastPage, isLoading, lengthUnknown}) {
  const renderEllipsis = () => <span className={CLASSNAMES.ELLIPSIS}>&hellip;</span>;

  const selectPage = page => {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  if (numPages < 2 && !lengthUnknown) {
    return null;
  }

  // Find the widest possible number range <= `VISIBLE_PAGE_RANGE_SIZE`.
  const pageNumberPadding = (VISIBLE_PAGE_RANGE_SIZE - 1) / 2;
  let pageNumStart;
  if ((currentPage + pageNumberPadding) >= numPages) {
    pageNumStart = Math.max(numPages - (VISIBLE_PAGE_RANGE_SIZE - 1), 1);
  } else {
    pageNumStart = Math.max(currentPage - pageNumberPadding, 1);
  }
  const pageNumEnd = Math.min(pageNumStart + (VISIBLE_PAGE_RANGE_SIZE - 1), numPages);

  const visibleRange = [];
  for (let i = pageNumStart; i <= pageNumEnd; i++) {
    visibleRange.push(i);
  }

  return (
    <tfoot className={CLASSNAMES.CONTAINER}>
      <tr className={CLASSNAMES.ROW}>
        <Cell
          className={CLASSNAMES.CELL}
          colSpan={numColumns}
        >
          {isLoading && (
            <div className={CLASSNAMES.LOADING_CONTAINER}>
              <div className={CLASSNAMES.LOADING_PILL}>Loading...</div>
            </div>
          )}
          <div>
            <Button
              className={CLASSNAMES.BUTTON_SCROLL}
              disabled={currentPage === 1}
              onClick={() => selectPage(currentPage - 1)}
              type="link"
              size="small"
              value="Prev"
            />
            <div className={CLASSNAMES.PAGE_NUMBERS}>
              {/* Make sure the first page is always visible. */}
              {visibleRange[0] > 1 && (
                <Button
                  className={CLASSNAMES.BUTTON_PAGE}
                  key={1}
                  onClick={() => selectPage(1)}
                  type="link"
                  size="small"
                  value="1"
                />
              )}
              {/*
                * Show ellipsis if there's at least one omitted page number between 1 and the start of
                * the visible rnage.
                */}
              {visibleRange[0] > 2 && renderEllipsis()}
              {visibleRange.map(pageNumber => (
                <Button
                  className={classnames(
                    CLASSNAMES.BUTTON_PAGE,
                    pageNumber === currentPage && CLASSNAMES.BUTTON_PAGE_SELECTED
                  )}
                  key={pageNumber}
                  onClick={() => selectPage(pageNumber)}
                  type="link"
                  size="small"
                  value={`${pageNumber}`}
                />
              ))}
              {/*
                * Show ellipsis if there's at least one omitted page number between the end of the
                * visible range and the last page number.
                */}
              {(visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages - 1 || lengthUnknown) &&
                renderEllipsis()}
              {/* Make sure the last page is always visible. */}
              {visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages && showLastPage && (
                <Button
                  className={CLASSNAMES.BUTTON_PAGE}
                  key={numPages}
                  onClick={() => selectPage(numPages)}
                  type="link"
                  size="small"
                  value={`${numPages}`}
                />
              )}
            </div>
            <Button
              className={CLASSNAMES.BUTTON_SCROLL}
              disabled={currentPage === numPages && !lengthUnknown}
              onClick={() => selectPage(currentPage + 1)}
              type="link"
              size="small"
              value="Next"
            />
          </div>
        </Cell>
      </tr>
    </tfoot>
  );
}

Footer.propTypes = {
  currentPage: tablePropTypes.pageNumber.isRequired,
  onPageChange:  React.PropTypes.func,
  numColumns:  React.PropTypes.number.isRequired,
  numPages:  React.PropTypes.number.isRequired,
  showLastPage:  React.PropTypes.bool,
  isLoading:  React.PropTypes.bool,
  lengthUnknown:  React.PropTypes.bool,
};

Footer.defaultProps = {
  onPageChange: () => {},
  showLastPage: true,
};

