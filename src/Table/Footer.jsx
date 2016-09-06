import classnames from "classnames";
import React, {Component, PropTypes} from "react";

import {Button} from "../Button/Button";
import Cell from "./Cell";

require("./Footer.less");


/**
 * Pagination footer for the Table component.
 * Only rendered if there are more than 1 page of data available.
 */
export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _selectPage(page) {
    if (page === this.props.currentPage) {
      return;
    }

    this.props.onPageChange(page);
  }

  _renderEllipsis() {
    return <span className={Footer.cssClass.ELLIPSIS}>{"•••"}</span>;
  }

  _renderPaginationControls() {
    const {cssClass, VISIBLE_PAGE_RANGE_SIZE} = Footer;
    const {currentPage, numPages} = this.props;

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
      <div>
        <Button
          className={cssClass.BUTTON_SCROLL}
          disabled={currentPage === 1}
          onClick={() => this._selectPage(currentPage - 1)}
          type="linkPlain"
          value="Prev"
        />
        <div className={cssClass.PAGE_NUMBERS}>
          {visibleRange[0] > 1 && (
            <Button
              className={cssClass.BUTTON_PAGE}
              key={1}
              onClick={() => this._selectPage(1)}
              type="linkPlain"
              value="1"
            />
          )}
          {visibleRange[0] > 2 && this._renderEllipsis()}
          {visibleRange.map(pageNumber => (
            <Button
              className={classnames(cssClass.BUTTON_PAGE, pageNumber === currentPage && cssClass.BUTTON_PAGE_SELECTED)}
              key={pageNumber}
              onClick={() => this._selectPage(pageNumber)}
              type="linkPlain"
              value={`${pageNumber}`}
            />
          ))}
          {visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages - 1 && this._renderEllipsis()}
          {visibleRange[VISIBLE_PAGE_RANGE_SIZE - 1] < numPages && (
            <Button
              className={cssClass.BUTTON_PAGE}
              key={numPages}
              onClick={() => this._selectPage(numPages)}
              type="linkPlain"
              value={`${numPages}`}
            />
          )}
        </div>
        <Button
          className={cssClass.BUTTON_SCROLL}
          disabled={currentPage === numPages}
          onClick={() => this._selectPage(currentPage + 1, numPages)}
          type="linkPlain"
          value="Next"
        />
      </div>
    );
  }

  render() {
    const {cssClass} = Footer;
    const {numColumns, numPages} = this.props;

    if (numPages < 2) {
      return null;
    }

    return (
      <tfoot className={cssClass.CONTAINER}>
        <tr className={cssClass.ROW}>
          <Cell
            className={cssClass.CELL}
            colSpan={numColumns}
          >
            {this._renderPaginationControls()}
          </Cell>
        </tr>
      </tfoot>
    );
  }
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
