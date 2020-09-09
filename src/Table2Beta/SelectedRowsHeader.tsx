import * as React from "react";

import Cell from "src/Table/Cell";
import "./SelectedRowsHeader.less";
import { FlexBox } from "src/flex";

interface Props {
  selectedRows: Set<any>;
  contentType?: string;
  actions: Array<ActionInput>;
}

export interface ActionInput {
  callback: () => void;
  // callback(selectedRows: Set<any>): void;
  // selectedRows?: Set<any>;
  // Todo: Account for singular vs multiple selected
  title: string;
  // should icon be required?
  icon?: string;
}

const cssClasses = {
  ROW: "Table2Beta--selectedRowsHeader",
  TITLE_CELL: "Table2Beta--selectedRowsHeader--titleCell",
  ACTIONS_CELL: "Table2Beta--selectedRowsHeader--actionsCell",
  ACTIONS_FLEXBOX: "Table2Beta--selectedRowsHeader--actionsFlexbox",
  ACTION: "Table2Beta--selectedRowsHeader--action",
  ACTION_ICON: "Table2Beta--selectedRowsHeader--actionIcon",
  ACTION_TITLE: "Table2Beta--selectedRowsHeader--actionTitle",
};

export default function SelectedRowsHeader({ selectedRows, contentType, actions }: Props) {
  const rowsAreSelected = selectedRows.size > 0;
  const singleRowSelected = selectedRows.size === 1;

  // console.log(selectedRows);
  return (
    <>
      <tr className={cssClasses.ROW}>
        <Cell class={cssClasses.TITLE_CELL} colspan={3}>
          {/* Figure out how to not hard code colspans */}
          {!rowsAreSelected && <div>Select {contentType || "row"}s to access tools</div>}
          {rowsAreSelected && (
            <div>
              {selectedRows.size} {contentType || "row"}
              {!singleRowSelected && "s"} selected
            </div>
          )}
        </Cell>
        <Cell class={cssClasses.ACTIONS_CELL} colspan={3}>
          {/* Figure out how to not hard code colspans? */}
          <FlexBox row className={cssClasses.ACTIONS_FLEXBOX}>
            {rowsAreSelected &&
              actions.map(action => (
                <Action
                  callback={action.callback}
                  // selectedRows={selectedRows}
                  title={action.title}
                  icon={action.icon}
                />
              ))}
          </FlexBox>
        </Cell>
      </tr>
    </>
  );
}

function Action({ callback, title, icon }: ActionInput) {
  return (
    <>
      <a className={`${cssClasses.ACTION} flexbox items--center`} onClick={e => callback()}>
        {icon && <img className={cssClasses.ACTION_ICON} src={icon} />}
        <div className={cssClasses.ACTION_TITLE}>{title}</div>
      </a>
    </>
  );
}
