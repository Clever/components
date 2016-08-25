import React, {PropTypes} from "react";

import * as tablePropTypes from "./tablePropTypes";
import Column from "./Column";
import HeaderCell from "./HeaderCell";


export default function Header({children, onSortChange, sortState}) {
  const {cssClass} = Header;

  return (
    <thead className={cssClass.CONTAINER}>
      <tr className={cssClass.ROW}>
        {children.map(({props: column}, columnIndex) => (
          <HeaderCell
            activeSortDirection={sortState.columnIndex === columnIndex ? sortState.direction : null}
            className={column.header && column.header.className}
            key={column.id || columnIndex}
            onSortChange={() => onSortChange(columnIndex)}
            sortable={column.sortable}
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
  children: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([Column]),
  })),
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
