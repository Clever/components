import * as React from "react";
import * as cx from "classnames";
import * as FontAwesome from "react-fontawesome";
import { FlexBox } from "../";

import "./DeletedAnnouncementBubble.less";

function cssClass(element: string) {
  return `DeletedAnnouncementBubble--${element}`;
}

export interface Props {
  theme: "deleted";
  className?: string;
}

export const DeletedAnnouncementBubble: React.FC<Props> = ({ className }: Props) => {
  return (
    <FlexBox
      grow
      alignItems="center"
      justify="start"
      className={cx(cssClass("container"), className)}
    >
      <FontAwesome name="trash-o" className={cssClass("icon")} aria-hidden="true" />
      <div className={cssClass("text")}>This announcement was deleted.</div>
    </FlexBox>
  );
};
