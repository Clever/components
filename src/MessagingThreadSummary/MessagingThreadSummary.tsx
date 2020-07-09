import * as React from "react";
import * as classNames from "classnames";
import * as moment from "moment";

import { FlexBox, FlexItem, ItemAlign, Justify } from "clever-components";

import "./MessagingThreadSummary.less";

const cssClasses = {
  THREADSUMMARY: "ThreadSummary",
  THREADSUMMARY_OFF: "ThreadSummary--off",
  THREADSUMMARY_SELECTED: "ThreadSummary--selected",
  THREADSUMMARY_ICON: "ThreadSummary--Icon",
  THREADSUMMARY_DETAILS_CONTAINER: "ThreadSummary--Details--Container",
  THREADSUMMARY_NAME: "ThreadSummary--Name",
  THREADSUMMARY_PREVIEW: "ThreadSummary--Preview",
  THREADSUMMARY_OFF_TEXT: "ThreadSummary--OffText",
  THREADSUMMARY_TIMESTAMP: "ThreadSummary--Timestamp",
  THREADSUMMARY_TIMESTAMP_SELECTED: "ThreadSummary--Timestamp--selected",
  THREADSUMMARY_INDICATOR_CONTAINER: "ThreadSummary--Indicator--Container",
  THREADSUMMARY_DRAFT_INDICATOR: "ThreadSummary--DraftIndicator",
  THREADSUMMARY_UNREAD_ORB: "ThreadSummary--UnreadOrb",
  THREADSUMMARY_UNREAD_TEXT: "ThreadSummary--UnreadText",
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

export const MessagingThreadSummary: React.FC<
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
          cssClasses.THREADSUMMARY,
          (selected && cssClasses.THREADSUMMARY_SELECTED) ||
            (status === "off" && cssClasses.THREADSUMMARY_OFF),
          className,
        )}
        onClick={onClick}
        alignItems={ItemAlign.CENTER}
      >
        <div className={cssClasses.THREADSUMMARY_ICON}>{icon}</div>
        <FlexItem grow className={cssClasses.THREADSUMMARY_DETAILS_CONTAINER}>
          <FlexBox alignItems={ItemAlign.CENTER}>
            <div
              className={classNames(
                cssClasses.THREADSUMMARY_NAME,
                !isRead && cssClasses.THREADSUMMARY_UNREAD_TEXT,
              )}
            >
              {title}
            </div>
            {(status === "active" || !isRead) && (
              <div
                className={classNames(
                  cssClasses.THREADSUMMARY_TIMESTAMP,
                  selected && cssClasses.THREADSUMMARY_TIMESTAMP_SELECTED,
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
                  cssClasses.THREADSUMMARY_PREVIEW,
                  !isRead && cssClasses.THREADSUMMARY_UNREAD_TEXT,
                )}
              >
                {children}
              </div>
            ) : (
              <div className={cssClasses.THREADSUMMARY_OFF_TEXT}>
                {offStatusText || "Messages are turned off"}
              </div>
            )}
            <FlexBox className={cssClasses.THREADSUMMARY_INDICATOR_CONTAINER} justify={Justify.END}>
              {status === "active" && hasDraft ? (
                <img alt="message draft icon" src={require("./draft_pencil.svg")} />
              ) : (
                !isRead && <div className={cssClasses.THREADSUMMARY_UNREAD_ORB} />
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
