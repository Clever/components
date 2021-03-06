import * as React from "react";
import * as moment from "moment";
import * as cx from "classnames";
import Linkify from "react-linkify";
import { FlexBox, Button, Menu, Tooltip } from "../";
import { componentDecorator, matchDecorator } from "../MessagingBubble/linkifyUtils";

import "./NormalAnnouncementBubble.less";

function cssClass(element: string) {
  return `NormalAnnouncementBubble--${element}`;
}

export interface Props {
  theme: "normal";
  attachments?: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  onReply?: () => void;
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
  onDelete,
  onReply,
  repliesDisabledMsg,
  replyButtonText,
  senderIcon,
  senderName,
  sentAtTimestamp,
}: Props) => {
  const deleteMenu = formDeleteMenu(onDelete);
  const replyButton = formReplyButton(onReply, repliesDisabledMsg, replyButtonText);

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
      {attachments?.length > 0 && (
        <FlexBox className={cssClass("attachmentContainer")}>{attachments}</FlexBox>
      )}
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
