import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import "./SelectedRowsHeader.less";
import { FlexBox } from "../../src";
import { FlexItem } from "src/flex";
import Menu from "src/Menu";
import { ActionInput } from "./Table";

interface Props {
  selectedRows: Set<any>;
  contentType?: { singular: string; plural?: string };
  actions: Array<ActionInput>;
  allSelected: boolean;
  numDisplayedActions: number;
}

const cssClasses = {
  ROW: "Table2Beta--selectedRowsHeader",
  TITLE_CELL: "Table2Beta--selectedRowsHeader--titleCell",
  ACTIONS_CELL: "Table2Beta--selectedRowsHeader--actionsCell",
  ACTIONS_FLEXBOX: "Table2Beta--selectedRowsHeader--actionsFlexbox",
  ACTION: "Table2Beta--selectedRowsHeader--action",
  ACTION_ICON: "Table2Beta--selectedRowsHeader--actionIcon",
  ACTION_TITLE: "Table2Beta--selectedRowsHeader--actionTitle",
  ACTION_MENU: "Table2Beta--selectedRowsHeader--actionMenu",
  ACTION_MENU_TRIGGER: "Table2Beta--selectedRowsHeader--actionMenu--trigger",
  ACTION_MENU_ITEM: "Table2Beta--selectedRowsHeader--actionMenu--item",
};

export default function SelectedRowsHeader({
  selectedRows,
  contentType,
  actions,
  numDisplayedActions,
  allSelected,
}: Props) {
  const rowsAreSelected = selectedRows.size > 0;
  const singleRowSelected = selectedRows.size === 1;

  let displayedActions;
  let moreActions;
  if (actions.length > numDisplayedActions) {
    displayedActions = actions.slice(0, numDisplayedActions);
    moreActions = actions.slice(numDisplayedActions);
  } else {
    displayedActions = actions;
  }

  return (
    <>
      <FlexBox grow className={cssClasses.ROW}>
        <FlexItem grow className={cssClasses.TITLE_CELL}>
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
        </FlexItem>
        <FlexItem className={cssClasses.ACTIONS_CELL}>
          <FlexBox className={cssClasses.ACTIONS_FLEXBOX}>
            {rowsAreSelected &&
              displayedActions.map(action => (
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
            {rowsAreSelected && moreActions && (
              <Menu
                className={cssClasses.ACTION_MENU}
                trigger={
                  <div>
                    <FontAwesome name="ellipsis-v" className={cssClasses.ACTION_MENU_TRIGGER} />
                  </div>
                }
                placement={Menu.Placement.RIGHT}
              >
                {moreActions.map(action => (
                  <MenuAction
                    actionInput={{
                      callback: action.callback,
                      title: action.title,
                      icon: action.icon,
                    }}
                    selectedRows={selectedRows}
                    key={action.title.singular}
                  />
                ))}
              </Menu>
            )}
          </FlexBox>
        </FlexItem>
      </FlexBox>
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

function MenuAction({ actionInput, selectedRows }: ActionProps) {
  const { callback, title, icon } = actionInput;
  const singleRowSelected = selectedRows.size === 1;
  return (
    <Menu.Item
      className={cssClasses.ACTION_MENU_ITEM}
      onClick={e => callback(selectedRows)}
      key={title.singular}
    >
      <p className={"Table2Beta--selectedRowsHeader--actionMenu--item--title"}>
        {icon && <img className={cssClasses.ACTION_ICON} src={icon} />}
        <div className={cssClasses.ACTION_TITLE}>
          {singleRowSelected || !title.plural ? title.singular : title.plural}
        </div>
      </p>
    </Menu.Item>
  );
}
