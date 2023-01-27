import * as React from "react";
import * as classNames from "classnames";
import * as moment from "moment";
import * as FontAwesome from "react-fontawesome";

import { FlexBox, FlexItem, ItemAlign, Justify } from "../index";
import { DraftPencilIcon } from "./DraftPencilIcon";
import { Tooltip } from "../Tooltip";
import Label from "../Label/Label";

import "./MessagingThreadListItem.less";

const cssClasses = {
  CONTAINER: "ThreadListItem",
  CONTAINER_OFF: "ThreadListItem--off",
  CONTAINER_SELECTED: "ThreadListItem--selected",
  ICON: "ThreadListItem--Icon",
  DETAILS_CONTAINER: "ThreadListItem--Details--Container",
  NAME: "ThreadListItem--Name",
  PREVIEW: "ThreadListItem--Preview",
  PREVIEW_ITALICS: "ThreadListItem--Preview--italics",
  TIMESTAMP: "ThreadListItem--Timestamp",
  TIMESTAMP_SELECTED: "ThreadListItem--Timestamp--selected",
  INDICATOR_CONTAINER: "ThreadListItem--Indicator--Container",
  NEW_LABEL_CONTAINER: "ThreadListItem--NewLabel--Container",
  DRAFT_INDICATOR: "ThreadListItem--DraftIndicator",
  UNREAD_ORB: "ThreadListItem--UnreadOrb",
  UNREAD_TEXT: "ThreadListItem--UnreadText",
};

type UnreadOrbColor = "accent_teal" | "primary_blue";

const unreadOrbColorClasses: Record<UnreadOrbColor, String> = {
  accent_teal: "ThreadListItem--UnreadOrb--AccentTeal",
  primary_blue: "ThreadListItem--UnreadOrb--PrimaryBlue",
};

export type Status = "active" | "off";

type Props = {
  children?: any;
  className?: string;
  hasDraft: boolean;
  icon: React.ReactNode;
  isRead?: boolean;
  italicizeSubtitle?: boolean;
  offStatusText?: string;
  onClick?: (event: React.MouseEvent) => void;
  selected: boolean;
  status?: Status;
  timestamp?: Date;
  title: string;
  hasAlert?: boolean;
  alertTooltip?: string;
  unreadOrbColor?: UnreadOrbColor;
  showNewLabel?: boolean;
};

/**
 * @deprecated Do not use. Instead, use [@clever/msg-thread-list-item](https://github.com/Clever/clever-ui/tree/master/packages/msg-thread-list-item)
 */
export const MessagingThreadListItem: React.FC<
  Props & { ref?: React.Ref<HTMLDivElement> }
> = React.forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    className,
    icon,
    isRead = true,
    italicizeSubtitle,
    timestamp,
    title,
    hasDraft,
    selected,
    status = "active",
    offStatusText,
    onClick,
    hasAlert,
    alertTooltip,
    unreadOrbColor,
    showNewLabel,
  } = props;

  let subContent: React.ReactNode;
  let subContentClass: string;
  if (status === "active" || !isRead) {
    subContent = _filterChildren(children);
    subContentClass = classNames(
      cssClasses.PREVIEW,
      !isRead && cssClasses.UNREAD_TEXT,
      italicizeSubtitle && cssClasses.PREVIEW_ITALICS,
    );
  } else {
    subContent = offStatusText || "Messages are turned off";
    subContentClass = classNames(cssClasses.PREVIEW, cssClasses.PREVIEW_ITALICS);
  }

  let indicatorIcon: React.ReactNode;
  let indicator: React.ReactNode;
  if (showNewLabel) {
    indicator = (
      <FlexBox className={cssClasses.NEW_LABEL_CONTAINER} justify={Justify.END}>
        {showNewLabel && <Label color="new-feature">New</Label>}
      </FlexBox>
    );
  } else {
    if (hasAlert) {
      indicatorIcon = alertTooltip ? (
        <Tooltip
          content={alertTooltip}
          placement={Tooltip.Placement.BOTTOM}
          textAlign={Tooltip.Align.CENTER}
        >
          <FontAwesome name="exclamation-triangle" />
        </Tooltip>
      ) : (
        <FontAwesome name="exclamation-triangle" />
      );
    } else if (!isRead) {
      indicatorIcon = (
        <div
          role="status"
          aria-label={`Unread messages in thread ${title}`}
          className={classNames(
            cssClasses.UNREAD_ORB,
            unreadOrbColor && unreadOrbColorClasses[unreadOrbColor],
          )}
        />
      );
    } else if (status === "active" && hasDraft) {
      indicatorIcon = <DraftPencilIcon />;
    }
    indicator = (
      <FlexBox className={cssClasses.INDICATOR_CONTAINER} justify={Justify.END}>
        {indicatorIcon}
      </FlexBox>
    );
  }

  // "New" Label overrides timestamp
  const showTimestamp = timestamp && !showNewLabel;
  const isIndicatorAlignedWithSubContent = subContent && showTimestamp;

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
                {showTimestamp && _formatDateForTimestamp(timestamp)}
              </div>
            )}
          </FlexBox>
          {subContent && (
            <FlexBox alignItems={ItemAlign.CENTER}>
              <div className={subContentClass}>{subContent}</div>
              {isIndicatorAlignedWithSubContent && indicator}
            </FlexBox>
          )}
        </FlexItem>
        <FlexItem>{!isIndicatorAlignedWithSubContent && indicator}</FlexItem>
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

// Helper function: Filters out falsey values if multiple children,
//  which avoids having 'blank' child elements that disrupt the styling.
function _filterChildren(children: any) {
  // If an array, we want to filter out the falsey elements.
  if (children && Array.isArray(children)) {
    const filteredChildren = children.filter((child) => !!child);
    // If now an empty array, nothing to render. Otherwise, render children!
    return filteredChildren.length === 0 ? undefined : filteredChildren;
  }
  // If not an array, then there's no filtering we need to do.
  return children;
}
