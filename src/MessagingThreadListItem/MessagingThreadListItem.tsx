import * as React from "react";
import * as classNames from "classnames";
import * as moment from "moment";

import { FlexBox, FlexItem, ItemAlign, Justify } from "../index";
import { DraftPencilIcon } from "./DraftPencilIcon";

import "./MessagingThreadListItem.less";

const cssClasses = {
  CONTAINER: "ThreadListItem",
  CONTAINER_OFF: "ThreadListItem--off",
  CONTAINER_SELECTED: "ThreadListItem--selected",
  ICON: "ThreadListItem--Icon",
  DETAILS_CONTAINER: "ThreadListItem--Details--Container",
  NAME: "ThreadListItem--Name",
  PREVIEW: "ThreadListItem--Preview",
  OFF_TEXT: "ThreadListItem--OffText",
  TIMESTAMP: "ThreadListItem--Timestamp",
  TIMESTAMP_SELECTED: "ThreadListItem--Timestamp--selected",
  INDICATOR_CONTAINER: "ThreadListItem--Indicator--Container",
  DRAFT_INDICATOR: "ThreadListItem--DraftIndicator",
  UNREAD_ORB: "ThreadListItem--UnreadOrb",
  UNREAD_TEXT: "ThreadListItem--UnreadText",
};

export type Status = "active" | "off";

type Props = {
  children: any;
  className?: string;
  hasDraft: boolean;
  icon: React.ReactNode;
  isRead?: boolean;
  offStatusText?: string;
  onClick?: (event: React.MouseEvent) => void;
  selected: boolean;
  status?: Status;
  timestamp?: Date;
  title: string;
};

export const MessagingThreadListItem: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    className,
    icon,
    isRead = true,
    timestamp,
    title,
    hasDraft,
    selected,
    status = "active",
    offStatusText,
    onClick,
  } = props;
  return (
    <div ref={ref}>
      <FlexBox
        className={classNames(
          cssClasses.CONTAINER,
          (selected && cssClasses.CONTAINER_SELECTED) ||
            (status === "off" && cssClasses.CONTAINER_OFF),
          className,
        )}
        onClick={onClick}
        alignItems={ItemAlign.CENTER}
      >
        <div className={cssClasses.ICON}>{icon}</div>
        <FlexItem grow className={cssClasses.DETAILS_CONTAINER}>
          <FlexBox alignItems={ItemAlign.CENTER}>
            <div className={classNames(cssClasses.NAME, !isRead && cssClasses.UNREAD_TEXT)}>
              {title}
            </div>
            {(status === "active" || !isRead) && (
              <div
                className={classNames(
                  cssClasses.TIMESTAMP,
                  selected && cssClasses.TIMESTAMP_SELECTED,
                )}
              >
                {timestamp && _formatDateForTimestamp(timestamp)}
              </div>
            )}
          </FlexBox>
          <FlexBox alignItems={ItemAlign.CENTER}>
            {status === "active" || !isRead ? (
              <div className={classNames(cssClasses.PREVIEW, !isRead && cssClasses.UNREAD_TEXT)}>
                {children}
              </div>
            ) : (
              <div className={cssClasses.OFF_TEXT}>
                {offStatusText || "Messages are turned off"}
              </div>
            )}
            <FlexBox className={cssClasses.INDICATOR_CONTAINER} justify={Justify.END}>
              {status === "active" && hasDraft ? (
                <DraftPencilIcon />
              ) : (
                !isRead && <div className={cssClasses.UNREAD_ORB} />
              )}
            </FlexBox>
          </FlexBox>
        </FlexItem>
      </FlexBox>
    </div>
  );
});

// Helper function: Format a Date for our pretty timestamps.
//  Returns "xx:xx <AM|PM>" time if today, otherwise returns "<month> <day>" date.
function _formatDateForTimestamp(date: Date): string {
  const [messageTimestamp, midnightToday] = [moment(date), moment().hours(0)];

  if (messageTimestamp.isAfter(midnightToday)) {
    return messageTimestamp.format("h:mm A");
  }
  return messageTimestamp.format("MMM D");
}
