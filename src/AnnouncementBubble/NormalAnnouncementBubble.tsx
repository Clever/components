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
  bubbleType: "normal";
  attachments?: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
  inlineErrorMsg?: string;
  numTranslatedLanguages?: number;
  onDelete?: () => void;
  onReadReceiptsClick?: () => void;
  onReadReceiptsHover?: () => void;
  onReply?: () => void;
  readBy?: string[];
  recipientType: "student" | "guardian";
  repliesDisabledMsg?: string;
  senderIcon: React.ReactNode;
  senderName: string;
  sentAtTimestamp: Date;
  theme?: "launchpad" | "familyPortal";

  // Temporary props to allow overriding text with translations
  replyButtonText?: string;
}

export const NormalAnnouncementBubble: React.FC<Props> = ({
  attachments,
  children,
  className,
  inlineErrorMsg,
  numTranslatedLanguages,
  onDelete,
  onReadReceiptsClick,
  onReadReceiptsHover,
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
    readBy?.length > 0
      ? formReadReceiptsTooltip(onReadReceiptsClick, onReadReceiptsHover, readBy, recipientType)
      : null;

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
      <FlexBox justify="between">
        {numTranslatedLanguages > 0 && (
          <NumTranslatedLanguagesTooltip numTranslatedLanguages={numTranslatedLanguages} />
        )}
        {readReceiptsTooltip}
      </FlexBox>
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
  onReadReceiptsClick: () => void,
  onReadReceiptsHover: () => void,
  readBy: string[],
  recipientType: "student" | "guardian",
): JSX.Element {
  const readReceiptCount = readBy.length;
  const readReceiptString = convertReadReceiptArrayToString(readBy);
  const displayRecipientType = recipientType === "guardian" ? "parent" : recipientType;
  const recipientString = readBy.length === 1 ? displayRecipientType : `${displayRecipientType}s`;
  return (
    <FlexBox alignItems="center" justify="end" className={cssClass("readReceipts--container")}>
      <Tooltip
        className={cssClass("readReceipts--tooltip")}
        content={readReceiptString}
        placement={"top"}
        textAlign={"left"}
      >
        <div onMouseEnter={onReadReceiptsHover}>
          <FlexBox role="button" tabIndex={0} onClick={onReadReceiptsClick}>
            <Checkmark className={cssClass("readReceipts--icon")} />
            <span className={cssClass("readReceipts--text--desktop")}>
              Read by {readReceiptCount} {recipientString}
            </span>
            <span className={cssClass("readReceipts--text--mobile")}>{readReceiptCount}</span>
          </FlexBox>
        </div>
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

function NumTranslatedLanguagesTooltip({
  numTranslatedLanguages,
}: {
  numTranslatedLanguages: number;
}): JSX.Element {
  return (
    <FlexBox
      className={cssClass("translatedLanguages--container")}
      alignItems="center"
      justify="start"
    >
      <Tooltip
        className={cssClass("translatedLanguages--tooltip")}
        content={"Each parent will see this announcement in their home language."}
        placement={"top"}
        textAlign={"left"}
      >
        <FlexBox>
          <TranslateIcon />
          <span className={cssClass("translatedLanguages--text--desktop")}>
            {numTranslatedLanguages === 1
              ? "Translated into 1 language"
              : `Translated into ${numTranslatedLanguages} languages`}
          </span>
          <span className={cssClass("translatedLanguages--text--mobile")}>
            {numTranslatedLanguages}
          </span>
        </FlexBox>
      </Tooltip>
    </FlexBox>
  );
}

function TranslateIcon(): JSX.Element {
  return (
    <svg
      className={cssClass("translatedLanguages--icon")}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.55364 10.3173L6.93727 8.72L6.95636 8.70091C8.06364 7.46636 8.85273 6.04727 9.31727 4.54545H11.1818V3.27273H6.72727V2H5.45455V3.27273H1V4.53909H8.10818C7.68182 5.76727 7.00727 6.93182 6.09091 7.95C5.49909 7.29455 5.00909 6.57545 4.62091 5.81818H3.34818C3.81273 6.85545 4.44909 7.83545 5.24455 8.72L2.00545 11.9145L2.90909 12.8182L6.09091 9.63636L8.07 11.6155L8.55364 10.3173ZM12.1364 7.09091H10.8636L8 14.7273H9.27273L9.98545 12.8182H13.0082L13.7273 14.7273H15L12.1364 7.09091ZM10.4691 11.5455L11.5 8.79L12.5309 11.5455H10.4691Z" />
    </svg>
  );
}

// Helper function: Format a Date for our pretty timestamps.
//  Always returns "xx:xx <AM/PM>" format.
export function formatDateForTimestamp(date: Date): string {
  return moment(date).format("h:mm A");
}
