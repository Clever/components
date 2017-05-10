import classnames from "classnames";
import * as React from "react";

import "./Cell.less";


const CLASSNAMES = {
  CELL: "Table--cell",
  NO_WRAP: "Table--cell--no_wrap",
};

export default function Cell({children, className, noWrap, width, ...additionalProps}) {
  return (
    <td
      className={classnames(
        CLASSNAMES.CELL,
        noWrap && CLASSNAMES.NO_WRAP,
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
  className:  React.PropTypes.string,
  children:  React.PropTypes.node,
  noWrap:  React.PropTypes.bool,
  width:  React.PropTypes.string,
};
