import * as React from "react";
import { useEffect, useRef } from "react";
import * as classNames from "classnames";
import * as moment from "moment";

import { FlexBox } from "clever-components";
import { MessageMetadata } from "./MessageMetadata";

import "./MessagingThreadHistory.less";

const cssClasses = {
  THREADHISTORY_CONTAINER: "ThreadHistory--Container",
  THREADHISTORY_DIVIDER: "ThreadHistory--Divider",
  THREADHISTORY_FIRST_MESSAGE: "ThreadHistory--FirstMessage",
};

// Each instance is exactly one message exchanged in this thread.
export interface MessageData {
  placement: "left" | "right" | "center";
  timestamp?: Date;
  content: React.ReactNode;
}

interface Props {
  className?: string;
  threadID: string;
  messages: MessageData[];
}

export const MessagingThreadHistory: React.FC<Props> = ({
  className,
  threadID,
  messages,
}: Props) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesWithDividers = _interleaveMessagesWithDividers(messages, lastMessageRef);

  // We want to scroll to the bottom if there is a new message (received in real-time, or
  //  user just sent one themselves) or if the user switches to another thread. Cannot rely
  //  on messages themselves (new reference each render) nor on message count alone (different
  //  threads can have the same message count). Instead, need the threadID AND message count.
  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages.length, threadID]);

  return (
    <FlexBox grow className={classNames(cssClasses.THREADHISTORY_CONTAINER, className)}>
      {messagesWithDividers}
    </FlexBox>
  );
};

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
          <div key={`divider-${messageDay}`} className={cssClasses.THREADHISTORY_DIVIDER}>
            {messageDay}
          </div>,
        );
        currentDay = messageDay;
      }
    }
    // All content is wrapped in MessageMetadata, which handles placement and timestamps.
    messagesWithDividers.push(
      <MessageMetadata
        key={`message-${i}`}
        // Last message in the history gets a ref, to allow scrolling down to bottom message.
        ref={i === messages.length - 1 ? lastMessageRef : undefined}
        placement={message.placement}
        timestamp={message.timestamp}
        // First message needs 'auto' top margin to have messages fill container from bottom -> top
        className={i === 0 ? cssClasses.THREADHISTORY_FIRST_MESSAGE : undefined}
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
  } else if (messageTimestamp.isAfter(midnightYesterday)) {
    return "Yesterday";
  } else {
    return messageTimestamp.format("MMM D");
  }
}
