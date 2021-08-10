import * as React from "react";
import { useState } from "react";
import * as cx from "classnames";
import Linkify from "react-linkify";
import * as FontAwesome from "react-fontawesome";
import * as _ from "lodash";
import { FlexBox, Button, Tooltip } from "../";
import { formatDateForTimestamp } from "./NormalAnnouncementBubble";
import { componentDecorator, matchDecorator } from "../MessagingBubble/linkifyUtils";

import "./QuotedAnnouncementBubble.less";

function cssClass(element: string) {
  return `QuotedAnnouncementBubble--${element}`;
}

export interface Props {
  bubbleType: "quoted";
  announcementGroupName: string;
  attachments?: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
  colorTheme: "white" | "light" | "dark";
  inlineErrorMsg?: string;
  isMessageTruncated?: boolean;
  senderIcon: React.ReactNode;
  senderName: string;
  sentAtTimestamp: Date;
  onToggleShow?: () => void;
  theme?: "launchpad" | "familyPortal";

  // Temporary props to allow overriding text with translations
  postedInText?: string;
  showLessButtonText?: string;
  showMoreButtonText?: string;
  truncationNoticeText?: string;
  truncationTooltipText?: string;
}

export const QuotedAnnouncementBubble: React.FC<Props> = ({
  announcementGroupName,
  attachments,
  children,
  className,
  colorTheme,
  inlineErrorMsg,
  isMessageTruncated,
  postedInText,
  senderIcon,
  senderName,
  sentAtTimestamp,
  showLessButtonText,
  showMoreButtonText,
  theme,
  truncationNoticeText,
  truncationTooltipText,
  onToggleShow,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let messageDetails = postedInText || `Posted in ${announcementGroupName}`;
  messageDetails += ` | ${formatDateForTimestamp(sentAtTimestamp)}`;

  /* If the content is not expanded, limit the message length so that screen readers
    don't attempt to read the entire hidden message. This only works for plain-string children */
  let content = children;
  let showEllipsis = false;
  if (!isExpanded && typeof content === "string") {
    const previewLength = 100;
    const firstLineBreak = content.indexOf("\n");

    /* If we have a line break and the first line of text is shorter than the preview length,
    pad the first line up until the longest line in the expanded view so the width of the bubble 
    is the same when expanded and when not. */
    if (firstLineBreak > -1 && firstLineBreak < previewLength - 1) {
      let allLines = content.split("\n");
      allLines = allLines.concat([messageDetails]); // Also consider the message details
      const firstLine = allLines[0];
      const longestLine = allLines.reduce((longest, current) =>
        longest.length > current.length ? longest : current,
      );
      content = _.padEnd(firstLine, longestLine.length, "\xa0");
    } else {
      // If there is no line break, add padding if the message is shorter than the message details
      // as long as the message details are shorter than the preview length
      if (content.length < messageDetails.length && messageDetails.length < previewLength) {
        content = _.padEnd(content, messageDetails.length, "\xa0");
      } else {
        // If the message is not truncated, it's safe to add the ellipsis via css. We do
        // not add it in all other cases since we don't want to to show ellipsis after whitespace
        content = content.substring(0, previewLength);
        showEllipsis = true;
      }
    }
  }

  const buttonText = isExpanded
    ? showLessButtonText || "Show less"
    : showMoreButtonText || "Show more";

  return (
    <FlexBox
      alignItems="start"
      column
      className={cx(
        cssClass("container"),
        cssClass(`container--${colorTheme}`),
        theme === "familyPortal" && cssClass("familyPortal"),
        className,
      )}
      grow
    >
      <FlexBox alignItems="center">
        <div className={cssClass("senderIcon")}>{senderIcon}</div>
        <div className={cssClass("senderName")}>{senderName}</div>
      </FlexBox>
      {content && (
        <div
          className={cx(
            cssClass("messageBody"),
            !isExpanded && cssClass("messageBody--truncated"),
            showEllipsis && cssClass("messageBody--ellipsis"),
          )}
        >
          <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
            {content}
          </Linkify>
        </div>
      )}
      {isMessageTruncated && isExpanded && (
        <FlexBox className={cssClass("messageTruncatedNotice")} alignItems="center">
          <span>
            {truncationNoticeText || "Complete announcement not shown"}
            <Tooltip
              content={
                truncationTooltipText ||
                "This announcement exceeds the preview character limit. See original announcement for complete content."
              }
              placement={Tooltip.Placement.TOP}
            >
              <FontAwesome
                name="question-circle"
                className={cssClass("messageTruncatedNotice--icon")}
              />
            </Tooltip>
          </span>
        </FlexBox>
      )}
      {(isExpanded || !content) && (
        <>
          {isExpanded && inlineErrorMsg && (
            <FlexBox className={cssClass(`inlineError--${colorTheme}`)} grow alignItems="center">
              <div className={cssClass("inlineError--contents")}>
                <FontAwesome className={cssClass("inlineError--icon")} name="exclamation-circle " />
                {inlineErrorMsg}
              </div>
            </FlexBox>
          )}
          {attachments?.length > 0 && (
            <FlexBox
              className={cx(
                cssClass("attachmentContainer"),
                cssClass(`attachmentContainer--${colorTheme}`),
                !content && cssClass("attachmentContainer--marginTop"),
              )}
            >
              {attachments}
            </FlexBox>
          )}
          {isExpanded && (
            <span className={cssClass(`messageDetails--${colorTheme}`)}>{messageDetails}</span>
          )}
        </>
      )}
      <Button
        className={cssClass("button--outer")}
        onClick={() => {
          if (onToggleShow) {
            onToggleShow();
          }
          setIsExpanded(!isExpanded);
        }}
        type="linkPlain"
      >
        <span
          className={cx(cssClass("button--inner"), cssClass(`button--${colorTheme}`))}
          tabIndex={-1} // Allows for accessible focus behavior
        >
          {buttonText}
        </span>
      </Button>
    </FlexBox>
  );
};
