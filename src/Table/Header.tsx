import * as React from "react";

import * as tablePropTypes from "./tablePropTypes";
import Column from "./Column";
import HeaderCell from "./HeaderCell";
import MorePropTypes from "../utils/MorePropTypes";


const CLASSNAMES = {
  CONTAINER: "Table--header",
  ROW: "Table--header--row",
  SORTABLE: "Table--header--cell--sortable",
};

export default function Header({children, disableSort, onSortChange, sortState}) {
  return (
    <thead className={CLASSNAMES.CONTAINER}>
      <tr className={CLASSNAMES.ROW}>
        {children.map(({props: column}) => (
          <HeaderCell
            activeSortDirection={sortState.columnID === column.id ? sortState.direction : null}
            className={column.header && column.header.className}
            key={column.id}
            onSortChange={() => onSortChange(column.id)}
            sortable={column.sortable && !disableSort}
            width={column.width}
          >
            {column.header && column.header.content}
          </HeaderCell>
        ))}
      </tr>
    </thead>
  );
}

Header.propTypes = {
  children:  React.PropTypes.arrayOf(MorePropTypes.instanceOfComponent(Column)),
  disableSort:  React.PropTypes.bool,
  onSortChange:  React.PropTypes.func,
  sortState: tablePropTypes.sortState,
};

Header.defaultProps = {
  sortState: {},
};
