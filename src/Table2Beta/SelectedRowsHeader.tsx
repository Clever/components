// import { NewComponent } from "bin/NewComponent";
import * as React from "react";
// import * as PropTypes from "prop-types";

// import * as tablePropTypes from "./tablePropTypes";
// import Column from "./Column";
import Cell from "src/Table/Cell";

import "./SelectedRowsHeader.less";

export interface Props {
  selectedRows: Set<any>;
  contentType?: string;
}

export const cssClass = {
  ROW: "Table2Beta--selectedRowsHeader",
  TITLE_CELL: "Table2Beta--selectedRowsHeader--titleCell",
  ACTIONS_CELL: "Table2Beta--selectedRowsHeader--actionsCell",
};

export default function SelectedRowsHeader({ selectedRows: selectedRows, contentType }: Props) {
  const rowsAreSelected = selectedRows.size > 0;
  const singleRowSelected = selectedRows.size === 1;

  return (
    <>
      <tr className={cssClass.ROW}>
        <Cell class={cssClass.TITLE_CELL} colspan={3}>
          {/* Figure out how to not hard code colspans */}
          {!rowsAreSelected && <div>Select {contentType || "row"}s to access tools</div>}
          {rowsAreSelected && (
            <div>
              {selectedRows.size} {contentType || "row"}
              {!singleRowSelected && "s"} selected
            </div>
          )}
        </Cell>
        <Cell class={cssClass.ACTIONS_CELL} colspan={3}>
          {/* Figure out how to not hard code colspans */}
          {rowsAreSelected && <div>PLACEHOLDER: Actions go here</div>}
        </Cell>
      </tr>
    </>
  );
}

// SelectedRowsHeader.propTypes = {}
