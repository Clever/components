import classnames from "classnames";
import lodash from "lodash";
import React, {Component, PropTypes} from "react";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import Column from "./Column";
import Header from "./Header";
import sortDirection from "./sortDirection";

require("./Table.less");


export class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this._setInitialData(this.props.data, this.props.initialSortState);
  }

  componentWillReceiveProps({data}) {
    this._setInitialData(data, this.state.sortState);
  }

  _setInitialData(data, sortState) {
    if (sortState) {
      this._sort(data, sortState);
      return;
    }

    this.setState({sortedData: data});
  }

  _toggleSort(columnIndex) {
    const {sortedData, sortState} = this.state;

    if (sortState && sortState.columnIndex === columnIndex) {
      sortState.direction =
        sortState.direction === sortDirection.ASCENDING ? sortDirection.DESCENDING : sortDirection.ASCENDING;
      this.setState({sortState, sortedData: sortedData.reverse()});
      this.props.onSortChange(sortState);
      return;
    }

    this._sort(this.props.data, {
      columnIndex,
      direction: sortDirection.ASCENDING,
    });
  }

  _sort(data, sortState) {
    const columns = this.props.children;

    if (typeof sortState.columnIndex !== "number" && sortState.columnID) {
      sortState.columnIndex = lodash.findIndex(columns, column => column.props.id === sortState.columnID);
    }

    const sortedColumn = this.props.children[sortState.columnIndex];
    if (!sortedColumn || !sortedColumn.props.sortable) {
      return;
    }

    let sortedData = lodash(data)
      .sortBy(row => {
        let value = sortedColumn.props.sortValueFn(row);

        if (typeof value === "string") {
          value = value.trim().toLowerCase();
        }

        return value;
      });

    if (sortState.direction === sortDirection.DESCENDING) {
      sortedData = sortedData.reverse();
    }

    sortState.columnID = sortedColumn.props.id;
    this.setState({sortState, sortedData: sortedData.value()});
    this.props.onSortChange(sortState);
  }

  render() {
    const {children, className, filter, fixed, rowIDFn} = this.props;
    const {sortedData, sortState} = this.state;
    const {cssClass} = Table;

    return (
      <table className={classnames(cssClass.TABLE, fixed && cssClass.FIXED, className)}>
        <Header onSortChange={columnIndex => this._toggleSort(columnIndex)} sortState={sortState}>
          {children}
        </Header>
        <tbody className={cssClass.BODY}>
          {sortedData.map(rowData => (filter(rowData) ? (
            <tr className={cssClass.ROW} key={rowIDFn(rowData)}>
              {children.map(({props: col}, colIndex) => (
                <Cell className={col.cell.className} key={col.id || colIndex} noWrap={col.noWrap}>
                  {col.cell.renderer(rowData)}
                </Cell>
              ))}
            </tr>
          ) : null))}
        </tbody>
      </table>
      // TODO(kofi): Add pagination footer or maybe a PagingTable wrapper.
    );
  }
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([Column]),
  })),
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  filter: PropTypes.func,
  fixed: PropTypes.bool,
  initialSortState: tablePropTypes.sortState,
  onSortChange: PropTypes.func,
  rowIDFn: PropTypes.func.isRequired,
};

Table.defaultProps = {
  filter: () => true,
  onSortChange: () => {},
};

Table.cssClass = {
  BODY: "Table--body",
  FIXED: "Table--fixed",
  ROW: "Table--row",
  TABLE: "Table",
};

Table.Column = Column;

Table.sortDirection = sortDirection;
