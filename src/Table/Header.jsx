import React from "react";
import * as PropTypes from "prop-types";

import * as tablePropTypes from "./tablePropTypes";
import Column from "./Column";
import HeaderCell from "./HeaderCell";
import MorePropTypes from "../utils/MorePropTypes";


export default function Header({children, disableSort, onSortChange, sortState}) {
  const {cssClass} = Header;

  return (
    <thead className={cssClass.CONTAINER}>
      <tr className={cssClass.ROW}>
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
  children: PropTypes.arrayOf(MorePropTypes.instanceOfComponent(Column)),
  disableSort: PropTypes.bool,
  onSortChange: PropTypes.func,
  sortState: tablePropTypes.sortState,
};

Header.defaultProps = {
  sortState: {},
};

Header.cssClass = {
  CONTAINER: "Table--header",
  ROW: "Table--header--row",
  SORTABLE: "Table--header--cell--sortable",
};
