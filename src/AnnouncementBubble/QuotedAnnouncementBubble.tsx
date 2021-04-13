import * as React from "react";
import { useState } from "react";
import * as cx from "classnames";
import Linkify from "react-linkify";
import * as _ from "lodash";
import { FlexBox, Button } from "../";
import { formatDateForTimestamp } from "./NormalAnnouncementBubble";
import { componentDecorator, matchDecorator } from "../MessagingBubble/linkifyUtils";

import "./QuotedAnnouncementBubble.less";

function cssClass(element: string) {
  return `QuotedAnnouncementBubble--${element}`;
}

export interface Props {
  theme: "quoted";
  announcementGroupName: string;
  children: React.ReactNode;
  className?: string;
  colorTheme: "white" | "light" | "dark";
  senderIcon: React.ReactNode;
  senderName: string;
  sentAtTimestamp: Date;
}

export const QuotedAnnouncementBubble: React.FC<Props> = ({
  announcementGroupName,
  children,
  className,
  colorTheme,
  senderIcon,
  senderName,
  sentAtTimestamp,
}: Props) => {
  const [isExpanded, setisExpanded] = useState(false);

  /* If the content is not expanded, limit the message length so that screen readers
    don't attempt to read the entire hidden message. This only works for plain-string children */
  let content = children;
  if (!isExpanded && typeof content === "string") {
    let previewLength = 100;
    let firstLineBreak = content.indexOf("\n");
    /* If we have a line break and the first line of text is shorter than the preview length
     and another line in the body of text, we should preserve the line break in the preview 
     and adjust the preview width accordingly */
    if (firstLineBreak > -1 && firstLineBreak < previewLength - 1) {
      const allLines = content.split("\n");
      const firstLine = allLines[0];
      const longestLine = allLines.reduce((longestLine, line) =>
        longestLine.length > line.length ? longestLine : line,
      );

      content = _.padEnd(firstLine, longestLine.length, "\xa0");
    } else {
      content = content.substring(0, previewLength);
    }
  }

  const buttonText = isExpanded ? "Show less" : "Show more";

  return (
    <FlexBox
      alignItems="start"
      column
      className={cx(cssClass("container"), cssClass(`container--${colorTheme}`), className)}
      grow
    >
      <FlexBox alignItems="center">
        <div className={cssClass("senderIcon")}>{senderIcon}</div>
        <div className={cssClass("senderName")}>{senderName}</div>
      </FlexBox>
      <div
        className={cx(cssClass("messageBody"), !isExpanded && cssClass("messageBody--truncated"))}
      >
        <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
          {content}
        </Linkify>
      </div>
      {isExpanded && (
        <span className={cssClass(`messageDetails--${colorTheme}`)}>
          Posted in {announcementGroupName} | {formatDateForTimestamp(sentAtTimestamp)}
        </span>
      )}
      <Button
        className={cssClass("button--outer")}
        onClick={() => setisExpanded(!isExpanded)}
        type="linkPlain"
      >
        <span
          className={cx(cssClass("button--inner"), cssClass(`button--${colorTheme}`))}
          tabIndex={-1} // Allows for accessible focus behavior
        >
          {buttonText}
        </span>
      </Button>
    </FlexBox>
  );
};
