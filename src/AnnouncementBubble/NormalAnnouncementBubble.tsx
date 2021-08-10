import * as React from "react";
import * as moment from "moment";
import * as cx from "classnames";
import * as FontAwesome from "react-fontawesome";
import Linkify from "react-linkify";
import { FlexBox, Button, Menu, Tooltip } from "../";
import { componentDecorator, matchDecorator } from "../MessagingBubble/linkifyUtils";
import Checkmark from "../Checkbox/CheckMark";

import "./NormalAnnouncementBubble.less";

function cssClass(element: string) {
  return `NormalAnnouncementBubble--${element}`;
}

export interface Props {
  theme: "normal";
  attachments?: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
  inlineErrorMsg?: string;
  onDelete?: () => void;
  onReply?: () => void;
  readBy?: string[];
  recipientType: "student" | "guardian";
  repliesDisabledMsg?: string;
  senderIcon: React.ReactNode;
  senderName: string;
  sentAtTimestamp: Date;

  // Temporary props to allow overriding text with translations
  replyButtonText?: string;
}

export const NormalAnnouncementBubble: React.FC<Props> = ({
  attachments,
  children,
  className,
  inlineErrorMsg,
  onDelete,
  onReply,
  readBy,
  recipientType,
  repliesDisabledMsg,
  replyButtonText,
  senderIcon,
  senderName,
  sentAtTimestamp,
}: Props) => {
  const deleteMenu = formDeleteMenu(onDelete);
  const replyButton = formReplyButton(onReply, repliesDisabledMsg, replyButtonText);
  const readReceiptsTooltip =
    readBy?.length > 0 ? formReadReceiptsTooltip(readBy, recipientType) : null;

  return (
    <FlexBox
      grow
      column
      className={cx(cssClass("container"), onReply && cssClass("containerWithReply"), className)}
    >
      <FlexBox>
        <div className={cssClass("senderIcon")}>{senderIcon}</div>
        <FlexBox column alignItems="start" justify="center">
          <div className={cssClass("senderName")}>{senderName}</div>
          <div className={cssClass("timestamp")}>{formatDateForTimestamp(sentAtTimestamp)}</div>
        </FlexBox>
        {deleteMenu}
      </FlexBox>
      {children && (
        <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
          <div className={cssClass("messageBody")}>{children}</div>
        </Linkify>
      )}
      {inlineErrorMsg && (
        <FlexBox className={cssClass("inlineError")} grow alignItems="center">
          <div className={cssClass("inlineError--contents")}>
            <FontAwesome className={cssClass("inlineError--icon")} name="exclamation-circle " />
            {inlineErrorMsg}
          </div>
        </FlexBox>
      )}
      {attachments?.length > 0 && (
        <FlexBox className={cssClass("attachmentContainer")}>{attachments}</FlexBox>
      )}
      {readReceiptsTooltip}
      {replyButton}
    </FlexBox>
  );
};

function formDeleteMenu(onDelete: () => void): JSX.Element {
  // If no onDelete callback is passed, don't show any menu for the delete button
  if (!onDelete) {
    return undefined;
  }

  return (
    <Menu
      className={cssClass("menu")}
      placement="right"
      trigger={
        <Button size="small" className={cssClass("menuIconContainer")} type="link">
          <FlexBox alignItems="center" justify="center">
            <img alt="announcement menu" src={require("./menu-triple-dot.svg")} />
          </FlexBox>
        </Button>
      }
    >
      <Menu.Item className={cssClass("deleteMenuItem")} onClick={onDelete} key="delete">
        Delete
      </Menu.Item>
    </Menu>
  );
}

function formReplyButton(
  onReply: () => void,
  repliesDisabledMsg: string,
  replyButtonText?: string,
): JSX.Element {
  // If a repliesDisabledMsg prop is provided, show the disabled reply button
  if (repliesDisabledMsg) {
    return (
      <DisabledReplyButton disabledMsg={repliesDisabledMsg} replyButtonText={replyButtonText} />
    );
  }

  // If an onReply callback prop is provided, show the reply button
  if (onReply) {
    return <ReplyButton onReply={onReply} replyButtonText={replyButtonText} />;
  }

  // Default case is to show no reply button
  return undefined;
}

function formReadReceiptsTooltip(
  readBy: string[],
  recipientType: "student" | "guardian",
): JSX.Element {
  const readReceiptCount = readBy.length;
  const readReceiptString = convertReadReceiptArrayToString(readBy);
  const displayRecipientType = recipientType === "guardian" ? "parent" : recipientType;
  const recipientString = readBy.length === 1 ? displayRecipientType : `${displayRecipientType}s`;
  return (
    <FlexBox className={cssClass("readReceipts--container")} alignItems="center" justify="end">
      <Tooltip
        className={cssClass("readReceipts--tooltip")}
        content={readReceiptString}
        placement={"top"}
        textAlign={"left"}
      >
        <FlexBox>
          <Checkmark className={cssClass("readReceipts--icon")} />
          <span className={cssClass("readReceipts--text--desktop")}>
            Read by {readReceiptCount} {recipientString}
          </span>
          <span className={cssClass("readReceipts--text--mobile")}>{readReceiptCount}</span>
        </FlexBox>
      </Tooltip>
    </FlexBox>
  );
}

function convertReadReceiptArrayToString(readBy: string[]): string {
  const readReceiptCount = readBy.length;
  if (readReceiptCount === 1) {
    return readBy[0];
  }
  readBy.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  readBy[readReceiptCount - 1] = `and ${readBy[readReceiptCount - 1]}`;

  if (readReceiptCount === 2) {
    return readBy.join(" ");
  }
  return readBy.join(", ");
}

function ReplyButton({
  onReply,
  replyButtonText,
}: {
  onReply: () => void;
  replyButtonText?: string;
}): JSX.Element {
  return (
    <Button className={cssClass("replyButton")} onClick={onReply} type={"secondary"}>
      <FlexBox alignItems="center" justify="center">
        <img
          alt=""
          className={cssClass("replyButton--icon")}
          src={require("./messages-black-icon.svg")}
        />
        <span className={cssClass("replyButton--text")}>{replyButtonText || "Reply"}</span>
      </FlexBox>
    </Button>
  );
}

function DisabledReplyButton({
  disabledMsg,
  replyButtonText,
}: {
  disabledMsg: string;
  replyButtonText?: string;
}): JSX.Element {
  return (
    <Button
      ariaLabel={disabledMsg}
      className={cx(cssClass("replyButton"), cssClass("replyButton--disabled"))}
      disabled
      type={"secondary"}
    >
      <Tooltip
        content={disabledMsg}
        placement={"top"}
        textAlign={"center"}
        tooltipClassName={cssClass("tooltip")}
      >
        <FlexBox alignItems="center" justify="center">
          <img
            alt=""
            className={cssClass("replyButton--icon")}
            src={require("./messages-dark-gray-icon.svg")}
          />
          <span
            className={cx(cssClass("replyButton--text"), cssClass("replyButton--text--disabled"))}
          >
            {replyButtonText || "Reply"}
          </span>
        </FlexBox>
      </Tooltip>
    </Button>
  );
}

// Helper function: Format a Date for our pretty timestamps.
//  Always returns "xx:xx <AM/PM>" format.
export function formatDateForTimestamp(date: Date): string {
  return moment(date).format("h:mm A");
}
