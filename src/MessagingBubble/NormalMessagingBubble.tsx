import * as React from "react";
import * as moment from "moment";
import Linkify from "react-linkify";
import * as cx from "classnames";
import FlexBox from "../flex/FlexBox";
import { MessagingTheme } from "src/utils/messaging";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./NormalMessagingBubble.less";

const cssClasses = {
  MESSAGE_ATTACHMENT_BASE: "NormalMessagingBubble--Message--Attachment",
  MESSAGE_BASE: "NormalMessagingBubble--Message",
  MESSAGE_CONTAINER_BASE: "NormalMessagingBubble--Message--Container",
  MESSAGE_REPLY_BASE: "NormalMessagingBubble--Message--Reply",
  MESSAGE_REPLY_PARENT: "NormalMessagingBubble--Message--Reply--Parent",
  MESSAGE_TIMESTAMP_BASE: "NormalMessagingBubble--Message--Timestamp",
  MESSAGE_TIME_BUBBLE_CONTAINER_BASE: "NormalMessagingBubble--Message--TimestampBubbleContainer",
  OWN_SUFFIX: "--Own",
  OTHER_SUFFIX: "--Other",
  FAMILY_PORTAL: "NormalMessagingBubble--FamilyPortal",
  HIDE_BUBBLE: "NormalMessagingBubble--HideBubble",
};

export interface Props {
  bubbleType: "normal" | "deleted";
  className?: string;
  children: React.ReactNode;
  timestamp: Date;
  replyTo?: React.ReactNode;
  attachments?: React.ReactNode[];
  messageOwnership: "ownMessage" | "otherMessage";
  theme?: MessagingTheme;
}

// Helper function: Format a Date for our pretty timestamps.
//  Always returns "xx:xx <AM/PM>" format.
function _formatDateForTimestamp(date: Date): string {
  return moment(date).format("h:mm A");
}

export const NormalMessagingBubble: React.FC<Props> = ({
  className,
  children,
  timestamp,
  theme,
  messageOwnership,
  replyTo,
  attachments,
}: Props) => {
  const hideBubble = !children && !replyTo; // if message is only attachments, no body and not a reply
  const isOwnMessage = messageOwnership === "ownMessage";
  const classSuffix = isOwnMessage ? cssClasses.OWN_SUFFIX : cssClasses.OTHER_SUFFIX;
  const containerClassNames = cx(
    className,
    `${cssClasses.MESSAGE_CONTAINER_BASE}${classSuffix}`,
    theme === "familyPortal" && cssClasses.FAMILY_PORTAL,
    hideBubble && cssClasses.HIDE_BUBBLE,
  );

  const bubbleClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_BASE}${classSuffix}`,
    replyTo && cssClasses.MESSAGE_REPLY_PARENT,
  );

  const replyClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_REPLY_BASE}${classSuffix}`,
    children && `${cssClasses.MESSAGE_REPLY_BASE}--MarginBottom`,
  );

  const timeAndBubbleContainerClasses = cx(
    `${cssClasses.MESSAGE_TIME_BUBBLE_CONTAINER_BASE}${classSuffix}`,
  );

  const timestampClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_TIMESTAMP_BASE}${classSuffix}`,
  );

  const attachmentClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_ATTACHMENT_BASE}${classSuffix}`,
  );

  return (
    <FlexBox column className={containerClassNames}>
      <FlexBox className={timeAndBubbleContainerClasses}>
        {!hideBubble && (
          <span className={timestampClassNames}>{_formatDateForTimestamp(timestamp)}</span>
        )}
        <div className={hideBubble ? null : bubbleClassNames}>
          {replyTo && <div className={replyClassNames}>{replyTo}</div>}
          <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
            {children}
          </Linkify>
        </div>
      </FlexBox>
      <FlexBox className={timeAndBubbleContainerClasses}>
        {hideBubble && (
          <span className={timestampClassNames}>{_formatDateForTimestamp(timestamp)}</span>
        )}
        {attachments?.length > 0 && (
          <FlexBox className={attachmentClassNames}>{attachments}</FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};
