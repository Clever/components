import classnames from "classnames";
import React, {PropTypes} from "react";

import * as tablePropTypes from "./tablePropTypes";
import Cell from "./Cell";
import SortIcons from "./SortIcons";
import {FlexBox, ItemAlign} from "../flex";

require("./HeaderCell.less");


export default function HeaderCell({
  children,
  className,
  onSortChange,
  sortable,
  activeSortDirection,
  width,
}) {
  const {cssClass} = HeaderCell;

  return (
    <Cell
      className={classnames(
        cssClass.HEADER_CELL,
        sortable && cssClass.SORTABLE,
        className
      )}
      onClick={() => sortable && onSortChange()}
      width={width}
    >
      <FlexBox alignItems={ItemAlign.CENTER} >
        <div className={cssClass.LABEL}>
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

HeaderCell.cssClass = {
  CONTENT: "Table--header--cell--content",
  HEADER_CELL: "Table--header--cell",
  LABEL: "Table--header--cell--label",
  SORTABLE: "Table--header--cell--sortable",
  SORT: "Table--header--cell--sort_icons",
};
