import * as classnames from "classnames";
import * as _ from "lodash";
import * as React from "react";
import * as PropTypes from "prop-types";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import { Column, Props as ColumnProps } from "./Column";
import Footer from "./Footer";
import Header from "./Header";
import MorePropTypes from "../utils/MorePropTypes";
import sortDirection from "./sortDirection";
import { ChildrenOf } from "../utils/types";

import "./Table.less";

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnID?: string;
  direction?: SortDirection;
}

export type PageRangeSize = 1 | 3 | 5 | 7 | 9;

// Webpack will inject process.env in so declare it here so we can use it to decide to log or not
declare var process: {
  env: {
    NODE_ENV: string;
  };
};

export interface Props {
  children?: ChildrenOf<typeof Column>;
  className?: string;
  data?: any[];
  filter?: Function;
  fixed?: boolean;
  initialPage?: number;
  initialSortState?: SortState;
  firstSortDirection?: SortDirection;
  onPageChange?: Function;
  onRowClick?: Function;
  onRowMouseOver?: (e: any, rowID: any, rowData: any) => void;
  onSortChange?: Function;
  onViewChange?: Function;
  pageSize?: number;
  paginated?: boolean;
  visiblePageRangeSize?: PageRangeSize;
  rowIDFn: Function;
  rowClassNameFn?: Function;
  noDataContent?: React.ReactNode;

  // These must be all set together. TODO: enforce that
  lazy?: boolean;
  getData?: Function;
  numRows?: number;
}

interface State {
  currentPage: number;
  sortState: SortState;

  // lazy table state
  lazyPages: any[];
  pageLoading: boolean;
  allLoaded: boolean;
}

const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_VISIBLE_PAGE_RANGE_SIZE = 5;

const propTypes = {
  children: PropTypes.arrayOf(MorePropTypes.instanceOfComponent(Column)),
  className: PropTypes.string,
  data: PropTypes.array,
  filter: PropTypes.func,
  fixed: PropTypes.bool,
  initialPage: tablePropTypes.pageNumber,
  initialSortState: tablePropTypes.sortState,
  firstSortDirection: tablePropTypes.sortDirection,
  onPageChange: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowMouseOver: PropTypes.func,
  onSortChange: PropTypes.func,
  onViewChange: PropTypes.func,
  pageSize: PropTypes.number,
  paginated: PropTypes.bool,
  visiblePageRangeSize: PropTypes.number,
  rowIDFn: PropTypes.func.isRequired,
  rowClassNameFn: PropTypes.func,
  noDataContent: PropTypes.node,

  // these must all be set together
  lazy: PropTypes.bool,
  getData: PropTypes.func,
  numRows: PropTypes.number,
};

const defaultProps = {
  onPageChange: () => {},
  onSortChange: () => {},
  pageSize: DEFAULT_PAGE_SIZE,
  visiblePageRangeSize: DEFAULT_VISIBLE_PAGE_RANGE_SIZE,
  firstSortDirection: sortDirection.ASCENDING,
};

export const cssClass = {
  BODY: "Table--body",
  CLICKABLE_ROW: "Table--clickable_row",
  FIXED: "Table--fixed",
  NO_DATA: "Table--no_data_cell",
  NO_DATA_CONTENT: "Table--no_data_cell_with_content",
  ROW: "Table--row",
  TABLE: "Table",
};

export class Table extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static Column = Column;
  static sortDirection = sortDirection;

  constructor(props: Props) {
    super(props);

    if (props.lazy) {
      for (const p of ["data", "filter", "initialPage"]) {
        if (props[p]) {
          console.error(`Table: prop "${p}" may not be set if "lazy"`);
        }
      }
      if (!props.getData) {
        console.error('Table: prop "getData" must be set if "lazy"');
      }
    } else {
      if (!props.data) {
        console.error('Table: prop "data" must be set if not "lazy"');
      }
      for (const p of ["getData", "numRows"]) {
        if (props[p]) {
          console.error(`Table: prop "${p}" may not be set if not "lazy"`);
        }
      }
    }

    this.state = {
      currentPage: props.initialPage || 1,
      sortState: props.initialSortState,

      // lazy table state
      lazyPages: [],
      pageLoading: false,
      allLoaded: false,
    };

    // the epoch is incremented on calls to this.lazyReset, so we know to throw
    // out in-progress fetches if the table gets reset (see this._fetchLazy).
    this._epoch = 0;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.lazy) {
      this._fetchLazy(0);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // eslint-disable-next-line react/sort-comp
  private _epoch: number;
  private _isMounted: boolean;

  /**
   * @param {number} page - 1-based index of the page to select.
   */
  async setCurrentPage(page) {
    const { onPageChange, onViewChange, lazy } = this.props;
    const { currentPage, pageLoading } = this.state;

    if (page === currentPage || pageLoading) {
      return;
    }

    if (lazy) {
      const pageIdx = page - 1;
      await this._fetchLazy(pageIdx);
    }

    this.setState({ currentPage: page }, () => {
      onPageChange(page);
      if (onViewChange) {
        const { displayedData } = this._getDisplayedData();
        onViewChange(displayedData);
      }
    });
  }

  async _fetchLazy(pageIdx) {
    const { pageSize, getData, rowIDFn } = this.props;
    const { lazyPages } = this.state;

    // if we've already fetched the page, no need to do anything here -- it's
    // cached
    if (pageIdx < lazyPages.length) {
      return;
    }

    const startEpoch = this._epoch;

    this.setState({ pageLoading: true });

    const newPages = lazyPages.slice(0);
    for (let idx = lazyPages.length; idx <= pageIdx; idx++) {
      const query: { pageSize: number; startingAfter?: any } = { pageSize };

      // the first page shouldn't have a startingAfter parameter
      if (idx !== 0) {
        const lastPage = newPages[idx - 1];
        query.startingAfter = rowIDFn(lastPage[lastPage.length - 1]);
      }

      const pageData = await getData(query);
      // Check if we should bail out to prevent updating state on an unmounted component.
      if (!this._isMounted) {
        return;
      }
      newPages.push(pageData);
    }

    if (this._epoch !== startEpoch) {
      // the table was reset while we were fetching, so we don't want to
      // actually insert our data
      return;
    }

    if (newPages[newPages.length - 1].length < pageSize) {
      this.setState({ allLoaded: true });
      if (newPages[newPages.length - 1].length === 0) {
        // remove the last page if it's empty (this happens if the number of
        // rows is divisible by the page size)
        newPages.splice(-1);
      }
    }

    this.setState({ lazyPages: newPages, pageLoading: false });
  }

  /**
   * Resets all lazily-loaded data. Call this if you change the backing data
   * behind the `getData` function (i.e. apply a search filter).
   */
  lazyReset() {
    if (this.props.lazy) {
      this._epoch++;
      this.setCurrentPage(1);
      this.setState({ lazyPages: [], allLoaded: false }, () => {
        this._fetchLazy(0);
      });
    }
  }

  _getColumn(columnID) {
    return _.find(
      React.Children.toArray(this.props.children) as React.ReactElement<ColumnProps>[],
      (column) => column.props.id === columnID,
    );
  }

  _toggleSort(columnID) {
    const oldSortState = this.state.sortState;

    const newSortState: SortState = {
      columnID,
      direction: this.props.firstSortDirection,
    };

    if (oldSortState && oldSortState.columnID === columnID) {
      newSortState.direction =
        oldSortState.direction === sortDirection.ASCENDING
          ? sortDirection.DESCENDING
          : sortDirection.ASCENDING;
    }

    // Reset to 1st page since table sort has changed.
    this.setCurrentPage(1);
    this.setState({ sortState: newSortState }, () => {
      this.props.onSortChange(this.state.sortState);
      if (this.props.onViewChange) {
        const { displayedData } = this._getDisplayedData();
        this.props.onViewChange(displayedData);
      }
    });
    this.lazyReset();
  }

  _getSynchronousData() {
    const { data, filter, pageSize, paginated } = this.props;
    const { currentPage, sortState } = this.state;

    let displayedData: any = _(data);
    if (filter) {
      displayedData = displayedData.filter(filter);
    }
    if (sortState) {
      const sortedColumn = this._getColumn(sortState.columnID);
      // sortedColumn might not exist if a column is removed from the table
      // dynamically. in this case, just ignore the sort state.
      if (sortedColumn) {
        displayedData = displayedData.sortBy((row) => {
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
    }

    displayedData = displayedData.value();

    let pages = [displayedData];
    if (paginated) {
      pages = _.chunk(displayedData, pageSize);
    }

    if (pages.length === 0) {
      // Chunking will return 0 pages if the data array is empty. Since we always show at least one
      // page of (potentially empty) data, add an empty page by default.
      pages = [[]];
    }

    const numPages = pages.length;
    const idx = Math.min(currentPage, numPages) - 1;
    return { displayedData: pages[idx], numPages };
  }

  _getLazyData() {
    const { numRows, pageSize } = this.props;
    const { currentPage, lazyPages } = this.state;

    let numPages;
    if (numRows != null) {
      numPages = Math.max(Math.ceil(numRows / pageSize), 1);
    } else {
      if (lazyPages.length === 0) {
        numPages = 1;
      } else {
        numPages = lazyPages.length;
      }
    }

    const idx = Math.min(currentPage, numPages) - 1;

    if (idx < lazyPages.length) {
      return { displayedData: lazyPages[idx], numPages };
    }
    return { displayedData: [], numPages };
  }

  _getDisplayedData() {
    if (!this.props.lazy) {
      return this._getSynchronousData();
    }
    return this._getLazyData();
  }

  render() {
    const {
      children,
      className,
      fixed,
      paginated,
      rowIDFn,
      rowClassNameFn,
      onRowClick,
      onRowMouseOver,
      noDataContent,
      visiblePageRangeSize,
    } = this.props;
    const { lazy, numRows } = this.props;
    const { currentPage, sortState, pageLoading, allLoaded } = this.state;

    const columns = _.compact(React.Children.toArray(children));
    if (columns.length < 2 && process.env.NODE_ENV !== "production") {
      console.error(
        "Table requires at least 2 columns. Consider using the List component instead.",
      );
    }

    const { displayedData, numPages } = this._getDisplayedData();
    const displayedPage = Math.min(currentPage, numPages);
    const disableSort = numPages <= 1 && displayedData.length <= 1;

    return (
      <table className={classnames(cssClass.TABLE, fixed && cssClass.FIXED, className)}>
        <Header
          disableSort={disableSort}
          onSortChange={(columnID) => this._toggleSort(columnID)}
          sortState={sortState}
        >
          {columns}
        </Header>
        <tbody className={cssClass.BODY}>
          {displayedData.length === 0 ? (
            <tr className={cssClass.ROW}>
              {noDataContent ? (
                <Cell className={cssClass.NO_DATA_CONTENT} colSpan={columns.length} noWrap>
                  {noDataContent}
                </Cell>
              ) : (
                <Cell className={cssClass.NO_DATA} colSpan={columns.length} noWrap>
                  {!pageLoading && "NO DATA"}
                </Cell>
              )}
            </tr>
          ) : (
            displayedData.map((rowData) => (
              <tr
                className={classnames(
                  cssClass.ROW,
                  onRowClick && cssClass.CLICKABLE_ROW,
                  rowClassNameFn && rowClassNameFn(rowData),
                )}
                key={rowIDFn(rowData)}
                onClick={(e) => onRowClick && onRowClick(e, rowIDFn(rowData), rowData)}
                tabIndex={onRowClick ? 0 : undefined}
                onMouseOver={(e) => onRowMouseOver && onRowMouseOver(e, rowIDFn(rowData), rowData)}
              >
                {columns.map(({ props: col }: { props: any }) => (
                  <Cell className={getCellClassName(col, rowData)} key={col.id} noWrap={col.noWrap}>
                    {col.cell.renderer(rowData)}
                  </Cell>
                ))}
              </tr>
            ))
          )}
        </tbody>
        {paginated && (
          <Footer
            currentPage={displayedPage}
            onPageChange={(newPage) => this.setCurrentPage(newPage)}
            numColumns={columns.length}
            numPages={numPages}
            showLastPage={!lazy}
            visiblePageRangeSize={visiblePageRangeSize}
            isLoading={pageLoading}
            lengthUnknown={lazy && numRows == null && !allLoaded}
          />
        )}
      </table>
    );
  }
}

function getCellClassName(columnProps, rowData) {
  const { className } = columnProps.cell;

  if (typeof className === "function") {
    return className(rowData);
  }

  return className;
}
