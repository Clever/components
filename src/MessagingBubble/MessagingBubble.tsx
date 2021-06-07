import * as React from "react";
import * as moment from "moment";
import Linkify from "react-linkify";
import * as cx from "classnames";
import FlexBox from "../flex/FlexBox";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./MessagingBubble.less";

const cssClasses = {
  MESSAGE_BASE: "MessagingBubble--Message",
  MESSAGE_OWN: "MessagingBubble--Message--Own",
  MESSAGE_OTHER: "MessagingBubble--Message--Other",
  MESSAGE_CONTAINER_OWN: "MessagingBubble--Message--Container--Own",
  MESSAGE_CONTAINER_OTHER: "MessagingBubble--Message--Container--Other",
  MESSAGE_REPLY_OWN: "MessagingBubble--Message--Reply--Own",
  MESSAGE_REPLY_OTHER: "MessagingBubble--Message--Reply--Other",
  MESSAGE_REPLY_PARENT: "MessagingBubble--Message--Reply--Parent",
  MESSAGE_TIME_BUBBLE_CONTAINER_OWN: "MessagingBubble--Message--TimestampBubbleContainer--Own",
  MESSAGE_TIME_BUBBLE_CONTAINER_OTHER: "MessagingBubble--Message--TimestampBubbleContainer--Other",
  MESSAGE_TIMESTAMP_OWN: "MessagingBubble--Message--Timestamp--Own",
  MESSAGE_TIMESTAMP_OTHER: "MessagingBubble--Message--Timestamp--Other",
  MESSAGE_ATTACHMENT_OWN: "MessagingBubble--Message--Attachment--Own",
  MESSAGE_ATTACHMENT_OTHER: "MessagingBubble--Message--Attachment--Other",
};

interface Props {
  className?: string;
  children: React.ReactNode;
  timestamp: Date;
  replyTo?: React.ReactNode;
  attachments?: React.ReactNode[];
  theme: "ownMessage" | "otherMessage";
}

// Helper function: Format a Date for our pretty timestamps.
//  Always returns "xx:xx <AM/PM>" format.
function _formatDateForTimestamp(date: Date): string {
  return moment(date).format("h:mm A");
}

export const MessagingBubble: React.FC<Props> = ({
  className,
  children,
  timestamp,
  theme,
  replyTo,
  attachments,
}: Props) => {
  const isOwnMessage = theme === "ownMessage";

  const containerClassNames = cx(
    className,
    isOwnMessage ? cssClasses.MESSAGE_CONTAINER_OWN : cssClasses.MESSAGE_CONTAINER_OTHER,
  );

  const bubbleClassNames = cx(
    cssClasses.MESSAGE_BASE,
    isOwnMessage ? cssClasses.MESSAGE_OWN : cssClasses.MESSAGE_OTHER,
    replyTo && cssClasses.MESSAGE_REPLY_PARENT,
  );

  const replyClassNames = cx(
    cssClasses.MESSAGE_BASE,
    isOwnMessage ? cssClasses.MESSAGE_REPLY_OWN : cssClasses.MESSAGE_REPLY_OTHER,
  );

  const timeAndBubbleContainerClasses = cx(
    isOwnMessage
      ? cssClasses.MESSAGE_TIME_BUBBLE_CONTAINER_OWN
      : cssClasses.MESSAGE_TIME_BUBBLE_CONTAINER_OTHER,
  );

  const timestampClassNames = cx(
    cssClasses.MESSAGE_BASE,
    isOwnMessage ? cssClasses.MESSAGE_TIMESTAMP_OWN : cssClasses.MESSAGE_TIMESTAMP_OTHER,
  );

  const attachmentClassNames = cx(
    cssClasses.MESSAGE_BASE,
    isOwnMessage ? cssClasses.MESSAGE_ATTACHMENT_OWN : cssClasses.MESSAGE_ATTACHMENT_OTHER,
  );

  return (
    <FlexBox column className={containerClassNames}>
      <FlexBox className={timeAndBubbleContainerClasses}>
        <span className={timestampClassNames}>{_formatDateForTimestamp(timestamp)}</span>
        <div className={bubbleClassNames}>
          {replyTo && <div className={replyClassNames}>{replyTo}</div>}
          <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
            {children}
          </Linkify>
        </div>
      </FlexBox>
      {attachments && <FlexBox className={attachmentClassNames}>{attachments}</FlexBox>}
    </FlexBox>
  );
};
