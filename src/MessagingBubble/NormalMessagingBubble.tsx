import * as React from "react";
import * as moment from "moment";
import Linkify from "react-linkify";
import * as cx from "classnames";
import { Button, FlexBox } from "..";
import { MessagingTheme } from "src/utils/messaging";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./NormalMessagingBubble.less";

const cssClasses = {
  MESSAGE_ATTACHMENT_BASE: "NormalMessagingBubble--Message--Attachment",
  MESSAGE_BASE: "NormalMessagingBubble--Message",
  MESSAGE_CONTAINER_BASE: "NormalMessagingBubble--Message--Container",
  MESSAGE_REPLY_BASE: "NormalMessagingBubble--Message--Reply",
  MESSAGE_REPLY_PARENT: "NormalMessagingBubble--Message--Reply--Parent",
  MESSAGE_METADATA_BASE: "NormalMessagingBubble--Message--Metadata",
  MESSAGE_ACTION_BUTTON_BASE: "NormalMessagingBubble--Message--ActionButton",
  MESSAGE_DELETE: "NormalMessagingBubble--Message--Delete",
  MESSAGE_TIMESTAMP_NONINTERACTIVE: "NormalMessagingBubble--Message--Timestamp--NonInteractive",
  MESSAGE_TIMESTAMP: "NormalMessagingBubble--Message--Timestamp",
  MESSAGE_TIME_BUBBLE_CONTAINER_BASE: "NormalMessagingBubble--Message--TimestampBubbleContainer",
  OWN_SUFFIX: "--Own",
  OTHER_SUFFIX: "--Other",
  FAMILY_PORTAL: "NormalMessagingBubble--FamilyPortal",
  HIDE_BUBBLE: "NormalMessagingBubble--HideBubble",
};

export interface Props {
  bubbleType: "normal";

  attachments?: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
  messageOwnership: "ownMessage" | "otherMessage";
  onClickDeleteButton?: () => void;
  replyTo?: React.ReactNode;
  theme?: MessagingTheme;
  timestamp: Date;
}

export const NormalMessagingBubble: React.FC<Props> = ({
  className,
  children,
  timestamp,
  theme,
  messageOwnership,
  onClickDeleteButton,
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

  const metadataClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_METADATA_BASE}${classSuffix}`,
  );

  const actionButtonClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_ACTION_BUTTON_BASE}${classSuffix}`,
  );

  const timeAndBubbleContainerClasses = cx(
    `${cssClasses.MESSAGE_TIME_BUBBLE_CONTAINER_BASE}${classSuffix}`,
  );

  const attachmentClassNames = cx(
    cssClasses.MESSAGE_BASE,
    `${cssClasses.MESSAGE_ATTACHMENT_BASE}${classSuffix}`,
  );

  return (
    <FlexBox column className={containerClassNames}>
      <FlexBox className={timeAndBubbleContainerClasses}>
        {_renderMetadata({
          renderHere: !hideBubble,
          timestamp,
          onClickDeleteButton,
          metadataClassNames,
          actionButtonClassNames,
        })}
        <div className={hideBubble ? null : bubbleClassNames}>
          {replyTo && <div className={replyClassNames}>{replyTo}</div>}
          <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
            {children}
          </Linkify>
        </div>
      </FlexBox>
      <FlexBox className={timeAndBubbleContainerClasses}>
        {_renderMetadata({
          renderHere: hideBubble,
          timestamp,
          onClickDeleteButton,
          metadataClassNames,
          actionButtonClassNames,
        })}
        {attachments?.length > 0 && (
          <FlexBox className={attachmentClassNames}>{attachments}</FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};

// Helper function: Format a Date for our pretty timestamps.
//  Always returns "xx:xx <AM/PM>" format.
function _formatDateForTimestamp(date: Date): string {
  return moment(date).format("h:mm A");
}

// Helper function: renders metadata, consisting of either the action button
//  or a non-interactive timestamp
function _renderMetadata({
  renderHere,
  timestamp,
  onClickDeleteButton,
  metadataClassNames,
  actionButtonClassNames,
}: {
  renderHere: boolean;
  timestamp: Date;
  onClickDeleteButton: () => void;
  metadataClassNames: string;
  actionButtonClassNames: string;
}): React.ReactNode {
  if (!renderHere) {
    return null;
  }

  if (!onClickDeleteButton) {
    return _renderNonInteractiveTimestamp({
      timestamp,
      metadataClassNames,
    });
  }
  return _renderActionButton({
    timestamp,
    onClickDeleteButton,
    metadataClassNames,
    actionButtonClassNames,
  });
}

// Helper function: renders a non-interactive timestamp
function _renderNonInteractiveTimestamp({
  timestamp,
  metadataClassNames,
}: {
  timestamp: Date;
  metadataClassNames: string;
}): React.ReactNode {
  return (
    <div className={metadataClassNames}>
      <span className={cssClasses.MESSAGE_TIMESTAMP_NONINTERACTIVE}>
        {_formatDateForTimestamp(timestamp)}
      </span>
    </div>
  );
}

// Helper function: renders Delete button or timestamp,
// depending on focus/hover/active state
function _renderActionButton({
  timestamp,
  onClickDeleteButton,
  metadataClassNames,
  actionButtonClassNames,
}: {
  timestamp: Date;
  onClickDeleteButton: () => void;
  metadataClassNames: string;
  actionButtonClassNames: string;
}): React.ReactNode {
  return (
    <div className={metadataClassNames}>
      <Button className={actionButtonClassNames} type="linkPlain" onClick={onClickDeleteButton}>
        <>
          <span className={cssClasses.MESSAGE_DELETE}>Delete</span>
          <span className={cssClasses.MESSAGE_TIMESTAMP}>{_formatDateForTimestamp(timestamp)}</span>
        </>
      </Button>
    </div>
  );
}
