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
import Checkbox from "../Checkbox";
import HeaderCell from "./HeaderCell";
import SelectedRowsHeader from "./SelectedRowsHeader";
import Menu from "../Menu";
import { Button } from "../Button/Button";

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

export interface ActionInput {
  callback(selectedRows: Set<any>): void;
  title: { singular: React.ReactNode; plural?: React.ReactNode };
  icon?: string;
  hoverIcon?: string;
}

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
  selectable?: boolean;
  singleActions?: Array<ActionInput>;
  checkboxClassName?: string;
  showSingleActionsOnHover?: boolean;
  singleActionsClassName?: string;
  selectedRowsHeaderContentType?: { singular: string; plural?: string };
  selectedRowsHeaderContentTypeNoSelection?: string;
  selectedRowsHeaderActions?: Array<ActionInput>;
  disableSelectedRowsHeader?: boolean;
  selectedRowsColumnName?: string;
  preselectedRowFn?: Function;
  numDisplayedActions?: number;
  onSelect?: Function;

  // These must be all set together. TODO: enforce that
  lazy?: boolean;
  getData?: Function;
  numRows?: number;
}

interface State {
  currentPage: number;
  sortState: SortState;
  selectedRows: Set<any>;
  allSelected: boolean;
  allData: Set<any>;

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
  selectable: PropTypes.bool,
  checkboxClassName: PropTypes.string,
  singleActions: PropTypes.array,
  singleActionsClassName: PropTypes.string,
  showSingleActionsOnHover: PropTypes.bool,

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
  singleActions: [],
  selectedRowsHeaderActions: [],
  numDisplayedActions: 4,
};

export const cssClass = {
  BODY: "Table2Beta--body",
  HEADER: "Table2Beta--header",
  CLICKABLE_ROW: "Table2Beta--clickable_row",
  SELECTABLE: "Table2Beta--selectable_row",
  FIXED: "Table2Beta--fixed",
  NO_DATA: "Table2Beta--no_data_cell",
  NO_DATA_CONTENT: "Table2Beta--no_data_cell_with_content",
  ROW: "Table2Beta--row",
  ROW_ODD: "Table2Beta--rowOdd",
  ROW_EVEN: "Table2Beta--rowEven",
  ROW_SELECTED: "Table2Beta--rowSelected",
  SINGLE_ACTIONS: "Table2Beta--singleActions",
  SINGLE_ACTION_TRIGGER: "Table2Beta--singleActionTrigger",
  ACTION_ICON: "Table2Beta--actions--icon",
  ACTION_ICON_CONTAINER: "Table2Beta--actions--iconContainer",
  ACTION_HOVER_ICON: "Table2Beta--actions--hoverIcon",
  ACTION_TITLE: "Table2Beta--actions--title",
  ACTION_MENU: "Table2Beta--actions--menu",
  ACTION_MENU_ITEM: "Table2Beta--actions--menu--item",
  ACTION_MENU_ITEM_TITLE: "Table2Beta--actions--menu--item--title",
  TABLE: "Table2Beta",
  CHECKBOX_HEADER: "Table2Beta--Checkbox--Header",
};

export class Table2Beta extends React.Component<Props, State> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static Column = Column;
  static sortDirection = sortDirection;

  constructor(props: Props) {
    super(props);

    if (props.lazy) {
      for (const p of ["data", "filter", "initialPage", "preselectedRowFn"]) {
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

    const selectedRows = new Set();
    let allSelected = false;
    if (props.selectable && props.preselectedRowFn && props.data?.length > 0) {
      props.data.forEach((d) => {
        if (props.preselectedRowFn(d)) {
          selectedRows.add(d);
        }
      });

      allSelected = selectedRows.size === props.data.length;
    }

    this.state = {
      currentPage: props.initialPage || 1,
      sortState: props.initialSortState,
      selectedRows,
      allSelected,
      allData: new Set(),

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

  componentDidUpdate() {
    const { selectedRows, allSelected } = this.state;
    const { allRows } = this._getDisplayedData();

    // This occurs when a new external filter is applied.
    // We want selectedRows to change if the filter affects the selection
    const newSelectedRows = new Set(selectedRows);
    newSelectedRows.forEach((item) => {
      if (!allRows.includes(item)) {
        newSelectedRows.delete(item);
      }
    });
    const newAllSelected = !!(allRows && newSelectedRows.size === allRows.length);
    if (newSelectedRows.size !== selectedRows.size || allSelected !== newAllSelected) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selectedRows: newSelectedRows });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allSelected: newAllSelected });
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
    return { displayedData: pages[idx], numPages, allRows: displayedData };
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

  _getDisplayedData(): { displayedData: any; numPages: any; allRows?: any } {
    if (!this.props.lazy) {
      return this._getSynchronousData();
    }
    return this._getLazyData();
  }

  _singleActionsRender(rowData) {
    const { singleActions } = this.props;
    if (singleActions.length === 1) {
      return (
        <Button
          className={singleActions[0].hoverIcon && cssClass.ACTION_ICON_CONTAINER}
          type="link"
          value={
            <>
              {singleActions[0].icon && (
                <img className={cssClass.ACTION_ICON} src={singleActions[0].icon} />
              )}
              {singleActions[0].hoverIcon && (
                <img className={cssClass.ACTION_HOVER_ICON} src={singleActions[0].hoverIcon} />
              )}
              <div className={cssClass.ACTION_TITLE}>{singleActions[0].title.singular}</div>
            </>
          }
          onClick={() => singleActions[0].callback(rowData)}
          size="small"
        />
      );
    } else if (singleActions.length >= 2) {
      return (
        <>
          <Button
            className={singleActions[0].hoverIcon && cssClass.ACTION_ICON_CONTAINER}
            type="link"
            value={
              <>
                <span className={singleActions[0].hoverIcon && cssClass.ACTION_ICON_CONTAINER}>
                  {singleActions[0].icon && (
                    <img className={cssClass.ACTION_ICON} src={singleActions[0].icon} />
                  )}
                  {singleActions[0].hoverIcon && (
                    <img className={cssClass.ACTION_HOVER_ICON} src={singleActions[0].hoverIcon} />
                  )}
                </span>
                <div className={cssClass.ACTION_TITLE}>{singleActions[0].title.singular}</div>
              </>
            }
            onClick={() => singleActions[0].callback(rowData)}
            size="small"
          />
          <Menu
            trigger={
              <Button size="small" className={cssClass.ACTION_MENU} type="link">
                <img className={cssClass.SINGLE_ACTION_TRIGGER} src={require("./ellipsis.svg")} />
              </Button>
            }
            placement={Menu.Placement.RIGHT}
          >
            {singleActions.slice(1).map((action) => (
              <Menu.Item
                className={classnames(
                  cssClass.ACTION_MENU_ITEM,
                  singleActions[0].hoverIcon && cssClass.ACTION_ICON_CONTAINER,
                )}
                onClick={(e) => action.callback(rowData)}
                key="action.title.singular"
              >
                <div className={cssClass.ACTION_MENU_ITEM_TITLE}>
                  {action.icon && <img className={cssClass.ACTION_ICON} src={action.icon} />}
                  {action.hoverIcon && (
                    <img className={cssClass.ACTION_HOVER_ICON} src={action.hoverIcon} />
                  )}
                  <div className={cssClass.ACTION_TITLE}>{action.title.singular}</div>
                </div>
              </Menu.Item>
            ))}
          </Menu>
        </>
      );
    }
    return <></>;
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
      numDisplayedActions,
      selectable,
      checkboxClassName,
      singleActions,
      showSingleActionsOnHover,
      singleActionsClassName,
      visiblePageRangeSize,
      selectedRowsHeaderContentType,
      selectedRowsHeaderContentTypeNoSelection,
      selectedRowsHeaderActions,
      disableSelectedRowsHeader,
      selectedRowsColumnName,
      onSelect,
    } = this.props;
    const { lazy, numRows } = this.props;
    const { currentPage, sortState, pageLoading, allLoaded } = this.state;
    let { selectedRows } = this.state;

    const columns = _.compact(React.Children.toArray(children));
    if (columns.length < 2 && process.env.NODE_ENV !== "production") {
      console.error(
        "Table requires at least 2 columns. Consider using the List component instead.",
      );
    }

    const { displayedData, numPages, allRows } = this._getDisplayedData();

    const displayedPage = Math.min(currentPage, numPages);
    const disableSort = numPages <= 1 && displayedData.length <= 1;

    let numColumns = columns.length;
    // Additional column for selectable checkboxes
    if (selectable) {
      numColumns += 1;
    }
    // Additional column for single actions
    if (singleActions.length > 0) {
      numColumns += 1;
    }

    return (
      <>
        {selectable && !disableSelectedRowsHeader && (
          <SelectedRowsHeader
            className={className}
            selectedRows={selectedRows}
            contentType={selectedRowsHeaderContentType}
            contentTypeNoSelection={selectedRowsHeaderContentTypeNoSelection}
            actions={selectedRowsHeaderActions}
            numDisplayedActions={numDisplayedActions}
            allSelected={this.state.allSelected}
          />
        )}
        <table className={classnames(cssClass.TABLE, fixed && cssClass.FIXED, className)}>
          <thead>
            <tr className={cssClass.HEADER}>
              {selectable && (
                <HeaderCell>
                  <Checkbox
                    checked={selectedRows.size > 0}
                    partial={selectedRows.size < allRows.length}
                    onChange={(newState) => {
                      if (selectedRows.size === 0) {
                        selectedRows = new Set(allRows);
                        this.setState({ allSelected: true });
                      } else {
                        selectedRows.clear();
                        this.setState({ allSelected: false });
                      }
                      if (onSelect) {
                        onSelect(selectedRows);
                      }

                      this.setState({ selectedRows });
                    }}
                    disabled={displayedData.length === 0}
                    className={cssClass.CHECKBOX_HEADER}
                  >
                    {selectedRowsColumnName}
                  </Checkbox>
                </HeaderCell>
              )}
              <Header
                disableSort={disableSort}
                onSortChange={(columnID) => this._toggleSort(columnID)}
                sortState={sortState}
                selectable={selectable}
              >
                {columns}
              </Header>
              {singleActions.length > 0 && (
                <HeaderCell>{!showSingleActionsOnHover && "Actions"}</HeaderCell>
              )}
            </tr>
          </thead>
          <tbody className={cssClass.BODY}>
            {displayedData.length === 0 ? (
              <tr className={cssClass.ROW}>
                {noDataContent ? (
                  <Cell className={cssClass.NO_DATA_CONTENT} colSpan={numColumns} noWrap>
                    {noDataContent}
                  </Cell>
                ) : (
                  <Cell className={cssClass.NO_DATA} colSpan={numColumns} noWrap>
                    {!pageLoading && "NO DATA"}
                  </Cell>
                )}
              </tr>
            ) : (
              displayedData.map((rowData, index) => (
                <tr
                  className={classnames(
                    cssClass.ROW,
                    index % 2 ? cssClass.ROW_ODD : cssClass.ROW_EVEN,
                    onRowClick && cssClass.CLICKABLE_ROW,
                    selectable && cssClass.SELECTABLE,
                    rowClassNameFn && rowClassNameFn(rowData),
                    selectedRows.has(rowData) && cssClass.ROW_SELECTED,
                  )}
                  key={rowIDFn(rowData)}
                  onClick={(e) => {
                    if (onRowClick) {
                      onRowClick(e, rowIDFn(rowData), rowData);
                    }
                  }}
                  onMouseOver={(e) =>
                    onRowMouseOver && onRowMouseOver(e, rowIDFn(rowData), rowData)
                  }
                >
                  {selectable && (
                    <Cell className={checkboxClassName}>
                      <Checkbox
                        checked={selectedRows.has(rowData)}
                        onChange={(newState) => {
                          if (newState.checked) {
                            selectedRows.add(rowData);
                            if (selectedRows.size === (allRows || displayedData).length) {
                              this.setState({ allSelected: true });
                            }
                          } else {
                            selectedRows.delete(rowData);
                            this.setState({ allSelected: false });
                          }
                          this.setState({ selectedRows });
                        }}
                      >
                        {""}
                      </Checkbox>
                    </Cell>
                  )}
                  {columns.map(({ props: col }: { props: any }) => (
                    <Cell
                      className={getCellClassName(col, rowData)}
                      key={col.id}
                      noWrap={col.noWrap}
                    >
                      {col.cell.renderer(rowData)}
                    </Cell>
                  ))}
                  {selectable && (
                    <Cell noWrap className={singleActionsClassName}>
                      <div
                        className={
                          cssClass.SINGLE_ACTIONS + (showSingleActionsOnHover ? "--hidden" : "")
                        }
                      >
                        {this._singleActionsRender(rowData)}
                      </div>
                    </Cell>
                  )}
                </tr>
              ))
            )}
          </tbody>
          {paginated && (
            <Footer
              currentPage={displayedPage}
              onPageChange={(newPage) => this.setCurrentPage(newPage)}
              numColumns={numColumns}
              numPages={numPages}
              showLastPage={!lazy}
              visiblePageRangeSize={visiblePageRangeSize}
              isLoading={pageLoading}
              lengthUnknown={lazy && numRows == null && !allLoaded}
            />
          )}
        </table>
      </>
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
