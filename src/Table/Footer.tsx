import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import { Button } from "../Button/Button";
import { PageRangeSize, DEFAULT_VISIBLE_PAGE_RANGE_SIZE } from "./Table";

import "./Footer.less";

export interface Props {
  currentPage: number;
  onPageChange?: Function;
  numColumns: number;
  numPages: number;
  showLastPage?: boolean;
  isLoading?: boolean;
  lengthUnknown?: boolean;
  visiblePageRangeSize: PageRangeSize;
}

export const cssClass = {
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

/**
 * Pagination footer for the Table component.
 * Only rendered if there are at least 2 pages of data available.
 */
export default function Footer({
  currentPage,
  numColumns,
  numPages,
  onPageChange,
  showLastPage,
  isLoading,
  lengthUnknown,
  visiblePageRangeSize,
}: Props) {
  const renderEllipsis = () => <span className={cssClass.ELLIPSIS}>&hellip;</span>;

  const selectPage = (page) => {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  if (numPages < 2 && !lengthUnknown && !isLoading) {
    return null;
  }

  // As a safeguard for when the typescript PageSizeNumber type is not enforced (jsx files),
  // check if the visiblePageRangeSize is a valid PageSizeNumber (1, 3, 5, 7, 9),
  // and if not, set it to the default value.
  let safeVisiblePageRangeSize = visiblePageRangeSize;
  if (visiblePageRangeSize < 1 || visiblePageRangeSize > 11 || visiblePageRangeSize % 2 === 0) {
    safeVisiblePageRangeSize = DEFAULT_VISIBLE_PAGE_RANGE_SIZE;
  }

  // Find the widest possible number range <= `safeVisiblePageRangeSize`.
  const pageNumberPadding = (safeVisiblePageRangeSize - 1) / 2;
  let pageNumStart;
  if (currentPage + pageNumberPadding >= numPages) {
    pageNumStart = Math.max(numPages - (safeVisiblePageRangeSize - 1), 1);
  } else {
    pageNumStart = Math.max(currentPage - pageNumberPadding, 1);
  }
  const pageNumEnd = Math.min(pageNumStart + (safeVisiblePageRangeSize - 1), numPages);

  const visibleRange = [];
  for (let i = pageNumStart; i <= pageNumEnd; i++) {
    visibleRange.push(i);
  }

  return (
    <tfoot className={cssClass.CONTAINER}>
      <tr className={cssClass.ROW}>
        <Cell className={cssClass.CELL} colSpan={numColumns}>
          {isLoading && (
            <div className={cssClass.LOADING_CONTAINER}>
              <div className={cssClass.LOADING_PILL}>Loading...</div>
            </div>
          )}
          <div>
            <Button
              className={cssClass.BUTTON_SCROLL}
              disabled={currentPage === 1}
              onClick={() => selectPage(currentPage - 1)}
              type="link"
              size="small"
              value="Prev"
            />
            <div className={cssClass.PAGE_NUMBERS}>
              {/* Make sure the first page is always visible. */}
              {visibleRange[0] > 1 && (
                <Button
                  className={cssClass.BUTTON_PAGE}
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
              {visibleRange.map((pageNumber) => (
                <Button
                  className={classnames(
                    cssClass.BUTTON_PAGE,
                    pageNumber === currentPage && cssClass.BUTTON_PAGE_SELECTED,
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
              {(visibleRange[safeVisiblePageRangeSize - 1] < numPages - 1 || lengthUnknown) &&
                renderEllipsis()}
              {/* Make sure the last page is always visible. */}
              {visibleRange[safeVisiblePageRangeSize - 1] < numPages && showLastPage && (
                <Button
                  className={cssClass.BUTTON_PAGE}
                  key={numPages}
                  onClick={() => selectPage(numPages)}
                  type="link"
                  size="small"
                  value={`${numPages}`}
                />
              )}
            </div>
            <Button
              className={cssClass.BUTTON_SCROLL}
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
  onPageChange: PropTypes.func,
  numColumns: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  showLastPage: PropTypes.bool,
  isLoading: PropTypes.bool,
  lengthUnknown: PropTypes.bool,
  visiblePageRangeSize: PropTypes.number,
};

Footer.defaultProps = {
  onPageChange: () => {},
  showLastPage: true,
};
