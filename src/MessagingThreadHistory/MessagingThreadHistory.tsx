import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import * as classNames from "classnames";
import * as moment from "moment";
import { MessageMetadata } from "./MessageMetadata";
import { cssClass as FlexBoxCSS } from "../flex/FlexBox";
import { cssClass as FlexItemCSS } from "../flex/FlexItem";

import "./MessagingThreadHistory.less";

const cssClasses = {
  CONTAINER: "ThreadHistory--Container",
  DIVIDER: "ThreadHistory--Divider",
  FIRST_MESSAGE: "ThreadHistory--FirstMessage",
};

// Each instance is exactly one message exchanged in this thread.
export interface MessageData {
  placement: "left" | "right" | "center";
  timestamp?: Date;
  content: React.ReactNode;
  index?: number;
}

interface Props {
  className?: string;
  threadID: string;
  messages: MessageData[];
}

export const MessagingThreadHistory = React.forwardRef(
  (
    { className, threadID, messages }: Props,
    containerRef: React.MutableRefObject<HTMLDivElement>,
  ) => {
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messagesWithDividers = _interleaveMessagesWithDividers(messages, lastMessageRef);

    // Scroll to the bottom if the user switches to a new non-null thread
    useLayoutEffect(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView();
      }
    }, [threadID]);

    return (
      <div
        className={classNames(
          cssClasses.CONTAINER,
          FlexBoxCSS.FLEXBOX,
          FlexBoxCSS.COLUMN,
          FlexItemCSS.GROW,
          className,
        )}
        ref={containerRef}
      >
        {messagesWithDividers}
      </div>
    );
  },
);

function _interleaveMessagesWithDividers(
  messages: MessageData[],
  lastMessageRef: React.MutableRefObject<HTMLDivElement>,
) {
  // Interleave dividers (e.g. "Today," "Yesterday", "May 20") with messages.
  const messagesWithDividers: React.ReactNode[] = [];
  let currentDay = "";
  messages.forEach((message: MessageData, i) => {
    // If the message has a timestamp (i.e. is not Clever-generated) and was sent on a different
    //  day than the previous message, we want a divider (with the date) in between.
    if (message.timestamp) {
      const messageDay = _formatDateForDivider(message.timestamp);
      if (currentDay !== messageDay) {
        messagesWithDividers.push(
          <div key={`divider-${messageDay}`} className={cssClasses.DIVIDER}>
            {messageDay}
          </div>,
        );
        currentDay = messageDay;
      }
    }
    // All content is wrapped in MessageMetadata, which handles placement and timestamps.
    messagesWithDividers.push(
      <MessageMetadata
        key={message.index ? `message-threadIndex-${message.index}` : `message-arrayIndex-${i}`}
        // Last message in the history gets a ref, to allow scrolling down to bottom message.
        ref={i === messages.length - 1 ? lastMessageRef : undefined}
        placement={message.placement}
        timestamp={message.timestamp}
        // First message needs 'auto' top margin to have messages fill container from bottom -> top
        className={i === 0 ? cssClasses.FIRST_MESSAGE : undefined}
      >
        {message.content}
      </MessageMetadata>,
    );
  });

  return messagesWithDividers;
}

// Helper function: Format a Date for our pretty timestamps.
//  Returns "Today"/"Yesterday" if appropriate, or "<month> <day>" date otherwise.
function _formatDateForDivider(date: Date): string {
  const [messageTimestamp, midnightToday, midnightYesterday] = [
    moment(date),
    moment().hours(0),
    moment()
      .hours(0)
      .subtract(1, "days"),
  ];

  if (messageTimestamp.isAfter(midnightToday)) {
    return "Today";
  }
  if (messageTimestamp.isAfter(midnightYesterday)) {
    return "Yesterday";
  }
  return messageTimestamp.format("MMM D");
}
