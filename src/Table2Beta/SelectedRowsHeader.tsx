import * as React from "react";

import Cell from "./Cell";
import "./SelectedRowsHeader.less";
import { FlexBox } from "../../src";

interface Props {
  selectedRows: Set<any>;
  contentType?: { singular: string; plural?: string };
  actions: Array<ActionInput>;
  allSelected: boolean;
}

export interface ActionInput {
  callback(selectedRows: Set<any>): void;
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

export default function SelectedRowsHeader({
  selectedRows,
  contentType,
  actions,
  allSelected,
}: Props) {
  const rowsAreSelected = selectedRows.size > 0;
  const singleRowSelected = selectedRows.size === 1;

  // console.log(selectedRows);
  return (
    <>
      <tr className={cssClasses.ROW}>
        <Cell className={cssClasses.TITLE_CELL} colSpan={3}>
          {/* Figure out how to not hard code colspans */}
          {!rowsAreSelected && <div>Select {contentType.plural || "rows"} to access tools</div>}
          {rowsAreSelected && !allSelected && (
            <>
              <div>
                {selectedRows.size}{" "}
                {singleRowSelected ? contentType.singular || "row" : contentType.plural || "rows"}{" "}
                selected
              </div>
            </>
          )}
          {allSelected && (
            <div>{`All ${contentType.plural || "rows"} selected (${selectedRows.size})`}</div>
          )}
        </Cell>
        <Cell className={cssClasses.ACTIONS_CELL} colSpan={3}>
          {/* Figure out how to not hard code colspans? */}
          <FlexBox className={cssClasses.ACTIONS_FLEXBOX}>
            {rowsAreSelected &&
              actions.map(action => (
                <Action
                  actionInput={{
                    callback: action.callback,
                    title: action.title,
                    icon: action.icon,
                  }}
                  selectedRows={selectedRows}
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

interface ActionProps {
  actionInput: ActionInput;
  selectedRows: Set<any>;
}

function Action({ actionInput, selectedRows }: ActionProps) {
  const { callback, title, icon } = actionInput;
  const singleRowSelected = selectedRows.size === 1;
  return (
    <>
      <a
        className={`${cssClasses.ACTION} flexbox items--center`}
        onClick={e => callback(selectedRows)}
      >
        {icon && <img className={cssClasses.ACTION_ICON} src={icon} />}
        <div className={cssClasses.ACTION_TITLE}>
          {singleRowSelected || !title.plural ? title.singular : title.plural}
        </div>
      </a>
    </>
  );
}
