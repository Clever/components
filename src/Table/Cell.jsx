import React, {PropTypes} from "react";

import {joinClasses} from "../utils";

require("./Cell.less");


export default function Cell({children, className, noWrap, width, ...additionalProps}) {
  const {cssClass} = Cell;

  return (
    <td
      className={joinClasses(
        cssClass.CELL,
        noWrap && cssClass.NO_WRAP,
        className
      )}
      style={{width}}
      {...additionalProps}
    >
      {children}
    </td>
  );
}

Cell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  noWrap: PropTypes.bool,
  width: PropTypes.string,
};

Cell.cssClass = {
  CELL: "Table--cell",
  NO_WRAP: "Table--cell--no_wrap",
};
