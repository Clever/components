import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import SortIcons from "./SortIcons";
import { FlexBox, ItemAlign } from "../flex";

import "./HeaderCell.less";

export interface Props {
  className?: string;
  children?: React.ReactNode;
  onSortChange?: Function;
  sortable?: boolean;
  activeSortDirection?: "asc" | "desc";
  width?: string;
}

export const cssClass = {
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
}: Props) {
  return (
    <Cell
      className={classnames(cssClass.HEADER_CELL, sortable && cssClass.SORTABLE, className)}
      onClick={() => sortable && onSortChange()}
      width={width}
    >
      <FlexBox alignItems={ItemAlign.CENTER}>
        <div className={cssClass.LABEL} role={sortable ? "button" : null}>
          {children}
        </div>
        {sortable && (
          <div>
            <SortIcons direction={activeSortDirection} className={cssClass.SORT} />
          </div>
        )}
      </FlexBox>
    </Cell>
  );
}

HeaderCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSortChange: PropTypes.func,
  sortable: PropTypes.bool,
  activeSortDirection: tablePropTypes.sortDirection,
  width: PropTypes.string,
};
