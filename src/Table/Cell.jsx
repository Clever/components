import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

require("./Cell.less");


export default function Cell({children, className, noWrap, width, ...additionalProps}) {
  const {cssClass} = Cell;

  return (
    <td
      className={classnames(
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
