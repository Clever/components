import * as React from "react";
import * as cx from "classnames";
import * as FontAwesome from "react-fontawesome";
import { FlexBox } from "../";
import { MessagingTheme } from "src/utils/messaging";

import "./DeletedMessagingBubble.less";

function cssClass(element: string) {
  return `DeletedMessagingBubble--${element}`;
}

export interface Props {
  bubbleType: "deleted";

  className?: string;
  messageOwnership: "ownMessage" | "otherMessage";
  theme?: MessagingTheme;

  // Temporary props to allow overriding text with translations
  deletionNoticeText: string;
}

export const DeletedMessagingBubble: React.FC<Props> = ({
  className,
  messageOwnership,
  deletionNoticeText,
}: Props) => {
  return (
    <FlexBox className={cssClass(`Container--${messageOwnership}`)}>
      <FlexBox
        grow
        alignItems="center"
        justify="start"
        className={cx(cssClass(`Message--${messageOwnership}`), className)}
      >
        <FontAwesome name="trash-o" className={cssClass("icon")} aria-hidden="true" />
        <div className={cssClass("text")}>{deletionNoticeText}</div>
      </FlexBox>
    </FlexBox>
  );
};
