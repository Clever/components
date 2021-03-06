import * as React from "react";
import { useMediaQuery } from "react-responsive";

import "./SelectedRowsHeader.less";
import { FlexBox, Button } from "../";
import { FlexItem } from "../flex";
import Menu from "../Menu";
import { ActionInput } from "./Table";

interface Props {
  className?: string;
  selectedRows: Set<any>;
  contentType?: { singular: string; plural?: string };
  contentTypeNoSelection?: string;
  actions: Array<ActionInput>;
  allSelected: boolean;
  numDisplayedActions: number;
}

const cssClasses = {
  ROW: "Table2Beta--selectedRowsHeader",
  SELECTED_TEXT: "Table2Beta--selectedRowsHeader--selectedText",
  SINGLE_ACTION_TRIGGER: "Table2Beta--singleActionTrigger",
  ACTIONS_FLEXBOX: "Table2Beta--selectedRowsHeader--actionsFlexbox",
  ACTION: "Table2Beta--selectedRowsHeader--action",
  ACTION_ICON: "Table2Beta--actions--icon",
  ACTION_TITLE: "Table2Beta--actions--title",
  ACTION_MENU: "Table2Beta--actions--menu",
  ACTION_MENU_TRIGGER: "Table2Beta--actions--menu--trigger",
  ACTION_MENU_ITEM: "Table2Beta--actions--menu--item",
  ACTION_MENU_ITEM_TITLE: "Table2Beta--actions--menu--item--title",
};

export default function SelectedRowsHeader({
  className,
  selectedRows,
  contentType,
  contentTypeNoSelection,
  actions,
  numDisplayedActions,
  allSelected,
}: Props) {
  const rowsAreSelected = selectedRows.size > 0;
  const singleRowSelected = selectedRows.size === 1;

  const compact = useMediaQuery({
    query: "(max-width: 52rem)",
  });

  let displayedActions;
  let moreActions;
  if (actions.length > numDisplayedActions) {
    displayedActions = actions.slice(0, numDisplayedActions);
    moreActions = actions.slice(numDisplayedActions);
  } else {
    displayedActions = actions;
  }

  return (
    <div className={className}>
      <FlexBox grow className={cssClasses.ROW} column={compact}>
        <FlexItem className={cssClasses.SELECTED_TEXT} grow>
          {!rowsAreSelected && <div>Select {contentTypeNoSelection || "rows"} to access tools</div>}
          {rowsAreSelected && !allSelected && (
            <>
              <div>
                {selectedRows.size}{" "}
                {singleRowSelected ? contentType.singular || "row" : contentType.plural || "rows"}{" "}
                selected
              </div>
            </>
          )}
          {rowsAreSelected && allSelected && (
            <div>{`All ${contentType.plural || "rows"} selected (${selectedRows.size})`}</div>
          )}
        </FlexItem>
        <FlexItem className={cssClasses.ACTIONS_FLEXBOX}>
          {rowsAreSelected &&
            displayedActions.map((action) => (
              <Action
                actionInput={{
                  callback: action.callback,
                  title: action.title,
                  icon: action.icon,
                }}
                selectedRows={selectedRows}
                key={action.title.singular}
              />
            ))}
          {rowsAreSelected && moreActions && (
            <Menu
              trigger={
                <Button size="small" className={cssClasses.ACTION_MENU} type="link">
                  <img
                    className={cssClasses.SINGLE_ACTION_TRIGGER}
                    src={require("./ellipsis.svg")}
                  />
                </Button>
              }
              placement={Menu.Placement.RIGHT}
            >
              {moreActions.map((action) => (
                <Menu.Item
                  className={cssClasses.ACTION_MENU_ITEM}
                  onClick={(e) => action.callback(selectedRows)}
                  key={action.title.singular}
                >
                  <div className={cssClasses.ACTION_MENU_ITEM_TITLE}>
                    {action.icon && <img className={cssClasses.ACTION_ICON} src={action.icon} />}
                    <div className={cssClasses.ACTION_TITLE}>
                      {singleRowSelected || !action.title.plural
                        ? action.title.singular
                        : action.title.plural}
                    </div>
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          )}
        </FlexItem>
      </FlexBox>
    </div>
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
    <Button
      className={cssClasses.ACTION}
      type="link"
      value={
        <>
          {icon && <img className={cssClasses.ACTION_ICON} src={icon} />}
          <div className={cssClasses.ACTION_TITLE}>
            {singleRowSelected || !title.plural ? title.singular : title.plural}
          </div>
        </>
      }
      onClick={(e) => callback(selectedRows)}
      size="small"
    />
  );
}
