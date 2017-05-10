import classnames from "classnames";
import * as React from "react";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import SortIcons from "./SortIcons";

import "./HeaderCell.less";


const CLASSNAMES = {
  CONTENT: "Table--header--cell--content",
  HEADER_CELL: "Table--header--cell",
  LABEL: "Table--header--cell--label",
  SORTABLE: "Table--header--cell--sortable",
  SORT: "Table--header--cell--sort_icons",
};

export default function HeaderCell({
  children,
  className,
  onSortChange,
  sortable,
  activeSortDirection,
  width,
}) {
  return (
    <Cell
      className={classnames(
        CLASSNAMES.HEADER_CELL,
        sortable && CLASSNAMES.SORTABLE,
        className
      )}
      noWrap
      onClick={() => sortable && onSortChange()}
      width={width}
    >
      <div className={CLASSNAMES.LABEL}>
        {children}
      </div>
      {sortable && <SortIcons direction={activeSortDirection} className={CLASSNAMES.SORT} />}
    </Cell>
  );
}

HeaderCell.propTypes = {
  className:  React.PropTypes.string,
  children:  React.PropTypes.node,
  onSortChange:  React.PropTypes.func,
  sortable:  React.PropTypes.bool,
  activeSortDirection: tablePropTypes.sortDirection,
  width:  React.PropTypes.string,
};
