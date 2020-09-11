import * as React from "react";

import Cell from "./Cell";
import "./SelectedRowsHeader.less";
import { FlexBox } from "../../src";

interface Props {
  selectedRows: Set<any>;
  contentType?: { singular: string; plural?: string };
  actions: Array<ActionInput>;
}

export interface ActionInput {
  callback(selectedRows?: Set<any>): void;
  selectedRows?: Set<any>;
  title: { singular: string; plural?: string };
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
        <Cell className={cssClasses.TITLE_CELL} colSpan={3}>
          {/* Figure out how to not hard code colspans */}
          {!rowsAreSelected && <div>Select {contentType.plural || "rows"} to access tools</div>}
          {rowsAreSelected && (
            <div>
              {selectedRows.size}{" "}
              {singleRowSelected ? contentType.singular || "row" : contentType.plural || "rows"}{" "}
              selected
            </div>
          )}
        </Cell>
        <Cell className={cssClasses.ACTIONS_CELL} colSpan={3}>
          {/* Figure out how to not hard code colspans? */}
          <FlexBox className={cssClasses.ACTIONS_FLEXBOX}>
            {rowsAreSelected &&
              actions.map(action => (
                <Action
                  callback={action.callback}
                  selectedRows={selectedRows}
                  title={action.title}
                  icon={action.icon}
                  // Is this necessary? Is it the ideal value?
                  key={action.title.singular}
                />
              ))}
          </FlexBox>
        </Cell>
      </tr>
    </>
  );
}

function Action({ callback, selectedRows, title, icon }: ActionInput) {
  const singleRowSelected = selectedRows.size === 1;
  return (
    <>
      <a
        className={`${cssClasses.ACTION} flexbox items--center`}
        onClick={e => (selectedRows ? callback(selectedRows) : callback())}
      >
        {icon && <img className={cssClasses.ACTION_ICON} src={icon} />}
        <div className={cssClasses.ACTION_TITLE}>
          {singleRowSelected || !title.plural ? title.singular : title.plural}
        </div>
      </a>
    </>
  );
}
