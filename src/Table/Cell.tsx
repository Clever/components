import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import "./Cell.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  noWrap?: boolean;
  width?: string;
  [additionalProp: string]: any;
}

export const cssClass = {
  CELL: "Table--cell",
  NO_WRAP: "Table--cell--no_wrap",
};

export default function Cell({ children, className, noWrap, width, ...additionalProps }: Props) {
  return (
    <td
      className={classnames(cssClass.CELL, noWrap && cssClass.NO_WRAP, className)}
      style={{ width }}
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
