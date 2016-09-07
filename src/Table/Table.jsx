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
  }

  render() {
    const {children: columns, className, data, filter, fixed, initialSortState, rowIDFn} = this.props;
    const {sortState = initialSortState} = this.state;
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

    return (
      <table className={classnames(cssClass.TABLE, fixed && cssClass.FIXED, className)}>
        <Header disableSort={disableSort} onSortChange={columnID => this._toggleSort(columnID)} sortState={sortState}>
          {columns}
        </Header>
        <tbody className={cssClass.BODY}>
          {displayedData.map(rowData => (
            <tr className={cssClass.ROW} key={rowIDFn(rowData)}>
              {columns.map(({props: col}) => (
                <Cell className={col.cell.className} key={col.id} noWrap={col.noWrap}>
                  {col.cell.renderer(rowData)}
                </Cell>
              ))}
            </tr>
          ))}
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
