import classnames from "classnames";
import React, {PropTypes} from "react";

import {Button} from "../Button/Button";
import Cell from "./Cell";

require("./Footer.less");


/**
 * Pagination footer for the Table component.
 * Only rendered if there are more than 1 page of data available.
 */
export default function Footer({currentPage, numColumns, numPages, onPageChange}) {
  const {cssClass, VISIBLE_PAGE_RANGE_SIZE} = Footer;

  const renderEllipsis = () => <span className={cssClass.ELLIPSIS}>&hellip;</span>;

  const selectPage = page => {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  if (numPages < 2) {
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
    <tfoot className={cssClass.CONTAINER}>
      <tr className={cssClass.ROW}>
        <Cell
          className={cssClass.CELL}
          colSpan={numColumns}
        >
          <Button
            className={cssClass.BUTTON_SCROLL}
            disabled={currentPage === 1}
            onClick={() => selectPage(currentPage - 1)}
            type="linkPlain"
            value="Prev"
          />
          <div className={cssClass.PAGE_NUMBERS}>
            {visibleRange[0] > 1 && (
              <Button
                className={cssClass.BUTTON_PAGE}
                key={1}
                onClick={() => selectPage(1)}
                type="linkPlain"
                value="1"
              />
            )}
            {visibleRange[0] > 2 && renderEllipsis()}
            {visibleRange.map(pageNumber => (
              <Button
                className={classnames(
                  cssClass.BUTTON_PAGE,
                  pageNumber === currentPage && cssClass.BUTTON_PAGE_SELECTED
                )}
                key={pageNumber}
                onClick={() => selectPage(pageNumber)}
                type="linkPlain"
                value={`${pageNumber}`}
              />
            ))}
            {visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages - 1 && renderEllipsis()}
            {visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages && (
              <Button
                className={cssClass.BUTTON_PAGE}
                key={numPages}
                onClick={() => selectPage(numPages)}
                type="linkPlain"
                value={`${numPages}`}
              />
            )}
          </div>
          <Button
            className={cssClass.BUTTON_SCROLL}
            disabled={currentPage === numPages}
            onClick={() => selectPage(currentPage + 1, numPages)}
            type="linkPlain"
            value="Next"
          />
        </Cell>
      </tr>
    </tfoot>
  );
}

Footer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  numColumns: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
};

Footer.defaultProps = {
  onPageChange: () => {},
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
};

Footer.VISIBLE_PAGE_RANGE_SIZE = 5;
