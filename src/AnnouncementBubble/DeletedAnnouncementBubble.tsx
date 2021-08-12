import * as React from "react";
import * as cx from "classnames";
import * as FontAwesome from "react-fontawesome";
import { FlexBox } from "../";
import { MessagingTheme } from "src/utils/messaging";

import "./DeletedAnnouncementBubble.less";

function cssClass(element: string) {
  return `DeletedAnnouncementBubble--${element}`;
}

export interface Props {
  bubbleType: "deleted";
  theme?: MessagingTheme;
  className?: string;

  // Temporary props to allow overriding text with translations
  deletionNoticeText?: string;
}

export const DeletedAnnouncementBubble: React.FC<Props> = ({
  className,
  deletionNoticeText,
}: Props) => {
  return (
    <FlexBox
      grow
      alignItems="center"
      justify="start"
      className={cx(cssClass("container"), className)}
    >
      <FontAwesome name="trash-o" className={cssClass("icon")} aria-hidden="true" />
      <div className={cssClass("text")}>
        {deletionNoticeText || "This announcement was deleted."}
      </div>
    </FlexBox>
  );
};
