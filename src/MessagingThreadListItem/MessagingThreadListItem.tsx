import * as React from "react";
import * as classNames from "classnames";
import * as moment from "moment";

import { FlexBox, FlexItem, ItemAlign, Justify } from "../index";
import { DraftPencilIcon } from "./DraftPencilIcon";

import "./MessagingThreadListItem.less";

const cssClasses = {
  THREADLISTITEM: "ThreadListItem",
  THREADLISTITEM_OFF: "ThreadListItem--off",
  THREADLISTITEM_SELECTED: "ThreadListItem--selected",
  THREADLISTITEM_ICON: "ThreadListItem--Icon",
  THREADLISTITEM_DETAILS_CONTAINER: "ThreadListItem--Details--Container",
  THREADLISTITEM_NAME: "ThreadListItem--Name",
  THREADLISTITEM_PREVIEW: "ThreadListItem--Preview",
  THREADLISTITEM_OFF_TEXT: "ThreadListItem--OffText",
  THREADLISTITEM_TIMESTAMP: "ThreadListItem--Timestamp",
  THREADLISTITEM_TIMESTAMP_SELECTED: "ThreadListItem--Timestamp--selected",
  THREADLISTITEM_INDICATOR_CONTAINER: "ThreadListItem--Indicator--Container",
  THREADLISTITEM_DRAFT_INDICATOR: "ThreadListItem--DraftIndicator",
  THREADLISTITEM_UNREAD_ORB: "ThreadListItem--UnreadOrb",
  THREADLISTITEM_UNREAD_TEXT: "ThreadListItem--UnreadText",
};

export type Status = "active" | "off";

type Props = {
  children: any;
  className?: string;
  hasDraft: boolean;
  icon: React.ReactNode;
  isRead: boolean;
  offStatusText?: string;
  onClick?: (event: React.MouseEvent) => void;
  selected: boolean;
  status: Status;
  timestamp: Date;
  title: string;
};

export const MessagingThreadListItem: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    className,
    icon,
    isRead,
    timestamp,
    title,
    hasDraft,
    selected,
    status,
    offStatusText,
    onClick,
  } = props;
  return (
    <div ref={ref}>
      <FlexBox
        className={classNames(
          cssClasses.THREADLISTITEM,
          (selected && cssClasses.THREADLISTITEM_SELECTED) ||
            (status === "off" && cssClasses.THREADLISTITEM_OFF),
          className,
        )}
        onClick={onClick}
        alignItems={ItemAlign.CENTER}
      >
        <div className={cssClasses.THREADLISTITEM_ICON}>{icon}</div>
        <FlexItem grow className={cssClasses.THREADLISTITEM_DETAILS_CONTAINER}>
          <FlexBox alignItems={ItemAlign.CENTER}>
            <div
              className={classNames(
                cssClasses.THREADLISTITEM_NAME,
                !isRead && cssClasses.THREADLISTITEM_UNREAD_TEXT,
              )}
            >
              {title}
            </div>
            {(status === "active" || !isRead) && (
              <div
                className={classNames(
                  cssClasses.THREADLISTITEM_TIMESTAMP,
                  selected && cssClasses.THREADLISTITEM_TIMESTAMP_SELECTED,
                )}
              >
                {timestamp && _formatDateForTimestamp(timestamp)}
              </div>
            )}
          </FlexBox>
          <FlexBox alignItems={ItemAlign.CENTER}>
            {status === "active" || !isRead ? (
              <div
                className={classNames(
                  cssClasses.THREADLISTITEM_PREVIEW,
                  !isRead && cssClasses.THREADLISTITEM_UNREAD_TEXT,
                )}
              >
                {children}
              </div>
            ) : (
              <div className={cssClasses.THREADLISTITEM_OFF_TEXT}>
                {offStatusText || "Messages are turned off"}
              </div>
            )}
            <FlexBox
              className={cssClasses.THREADLISTITEM_INDICATOR_CONTAINER}
              justify={Justify.END}
            >
              {status === "active" && hasDraft ? (
                <DraftPencilIcon />
              ) : (
                !isRead && <div className={cssClasses.THREADLISTITEM_UNREAD_ORB} />
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
