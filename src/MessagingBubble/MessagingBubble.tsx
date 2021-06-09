import * as React from "react";
import * as moment from "moment";
import Linkify from "react-linkify";
import * as cx from "classnames";
import FlexBox from "../flex/FlexBox";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./MessagingBubble.less";

const cssClasses = {
  MESSAGE_BASE: "MessagingBubble--Message",
  MESSAGE_CONTAINER_BASE: "MessagingBubble--Message--Container",
  MESSAGE_REPLY_BASE: "MessagingBubble--Message--Reply",
  MESSAGE_REPLY_PARENT: "MessagingBubble--Message--Reply--Parent",
  MESSAGE_TIME_BUBBLE_CONTAINER_BASE: "MessagingBubble--Message--TimestampBubbleContainer",
  MESSAGE_TIMESTAMP_BASE: "MessagingBubble--Message--Timestamp",
  MESSAGE_ATTACHMENT_BASE: "MessagingBubble--Message--Attachment",
  OWN_SUFFIX: "--Own",
  OTHER_SUFFIX: "--Other",
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
  const classSuffix = isOwnMessage ? cssClasses.OWN_SUFFIX : cssClasses.OTHER_SUFFIX;
  const containerClassNames = cx(className, `${cssClasses.MESSAGE_CONTAINER_BASE}${classSuffix}`);

  const bubbleClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_BASE}${classSuffix}`,
    replyTo && cssClasses.MESSAGE_REPLY_PARENT,
  );

  const replyClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_REPLY_BASE}${classSuffix}`,
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
