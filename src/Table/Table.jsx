import classnames from "classnames";
import lodash from "lodash";
import React, {Component, PropTypes} from "react";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import Column from "./Column";
import Footer from "./Footer";
import Header from "./Header";
import MorePropTypes from "../utils/MorePropTypes";
import sortDirection from "./sortDirection";

require("./Table.less");

const DEFAULT_PAGE_SIZE = 10;


export class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.initialPage || 1,
    };
  }

  /**
   * @param {number} page - 1-based index of the page to select.
   */
  setCurrentPage(page) {
    if (page === this.state.currentPage) {
      return;
    }

    this.setState({currentPage: page}, () => this.props.onPageChange(page));
  }

  _getColumn(columnID) {
    return lodash.find(this.props.children, column => column.props.id === columnID);
  }

  _toggleSort(columnID) {
    const oldSortState = this.state.sortState || this.props.initialSortState;

    const newSortState = {
      columnID,
      direction: sortDirection.ASCENDING,
    };

    if (oldSortState && oldSortState.columnID === columnID) {
      newSortState.direction = oldSortState.direction === sortDirection.ASCENDING
        ? sortDirection.DESCENDING
        : sortDirection.ASCENDING;
    }

    this.setState({sortState: newSortState}, () => this.props.onSortChange(this.state.sortState));
    // Reset to 1st page since table sort has changed.
    this.setCurrentPage(1);
  }

  render() {
    const {
      children: columns,
      className,
      data,
      filter,
      fixed,
      initialSortState,
      pageSize,
      paginated,
      rowIDFn,
      onRowClick,
    } = this.props;
    const {currentPage, sortState = initialSortState} = this.state;
    const {cssClass} = Table;

    let displayedData = lodash(data);
    if (filter) {
      displayedData = displayedData.filter(filter);
    }
    if (sortState) {
      const sortedColumn = this._getColumn(sortState.columnID);
      displayedData = displayedData.sortBy(row => {
        let value = sortedColumn.props.sortValueFn(row);

        if (typeof value === "string") {
          value = value.trim().toLowerCase();
        }

        return value;
      });

      if (sortState.direction === sortDirection.DESCENDING) {
        displayedData = displayedData.reverse();
      }
    }

    displayedData = displayedData.value();
    const disableSort = displayedData.length <= 1;

    let pages = [displayedData];
    if (paginated) {
      pages = lodash.chunk(displayedData, pageSize);
    }

    if (pages.length === 0) {
      // Chunking will return 0 pages if the data array is empty. Since we always show at least one
      // page of (potentially empty) data, add an empty page by default.
      pages = [[]];
    }

    const numPages = pages.length;
    const displayedPage = Math.min(currentPage, numPages);
    const displayedPageIndex = displayedPage - 1;

    return (
      <table className={classnames(cssClass.TABLE, fixed && cssClass.FIXED, className)}>
        <Header disableSort={disableSort} onSortChange={columnID => this._toggleSort(columnID)} sortState={sortState}>
          {columns}
        </Header>
        <tbody className={cssClass.BODY}>
          {displayedData.length === 0 ? (
            <tr className={cssClass.ROW}>
              <Cell className={cssClass.NO_DATA} colSpan={columns.length} noWrap>
                NO DATA
              </Cell>
            </tr>
            ) : pages[displayedPageIndex].map(rowData => (
            <tr
              className={classnames(cssClass.ROW, {rowClickEnabled: onRowClick})}
              key={rowIDFn(rowData)}
              onClick={onRowClick}
            >
              {columns.map(({props: col}) => (
                <Cell className={col.cell.className} key={col.id} noWrap={col.noWrap}>
                  {col.cell.renderer(rowData)}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
        {paginated && (
          <Footer
            currentPage={displayedPage}
            onPageChange={newPage => this.setCurrentPage(newPage)}
            numColumns={columns.length}
            numPages={numPages}
          />
        )}
      </table>
    );
  }
}

Table.propTypes = {
  children: PropTypes.arrayOf(MorePropTypes.instanceOfComponent(Column)),
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  filter: PropTypes.func,
  fixed: PropTypes.bool,
  initialPage: tablePropTypes.pageNumber,
  initialSortState: tablePropTypes.sortState,
  onPageChange: PropTypes.func,
  onRowClick: PropTypes.func,
  onSortChange: PropTypes.func,
  pageSize: PropTypes.number,
  paginated: PropTypes.bool,
  rowIDFn: PropTypes.func.isRequired,
};

Table.defaultProps = {
  filter: () => true,
  onPageChange: () => {},
  onSortChange: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
};

Table.cssClass = {
  BODY: "Table--body",
  FIXED: "Table--fixed",
  NO_DATA: "Table--no_data_cell",
  ROW: "Table--row",
  TABLE: "Table",
};

Table.Column = Column;

Table.sortDirection = sortDirection;
