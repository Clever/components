import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import * as classNames from "classnames";
import * as moment from "moment";
import { AlertMessage } from "./AlertMessage";
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
  placement: "left" | "right" | "center" | "fullWidth";
  timestamp?: Date;
  content: React.ReactNode;
  index: number;
  readStatusText?: string;
  displayAlertMessageAfter?: { icon: string; messageText: string };
  errorMsg?: string;
}

interface Props {
  className?: string;
  threadID: string;
  messages: MessageData[];
  onScroll?: () => void;
}

const SCROLL_BUFFER = 200;

// Always returns true with current mobile strategy of scrolling the entire thread history
function calcIsScrolledToBottom(ref: React.MutableRefObject<HTMLDivElement>): boolean {
  return (
    ref &&
    ref.current &&
    ref.current.scrollTop + SCROLL_BUFFER >= ref.current.scrollHeight - ref.current.clientHeight
  );
}

function isOwnMessage(message: MessageData) {
  return message.placement === "right";
}

export const MessagingThreadHistory = React.forwardRef(
  (
    { className, threadID, messages, onScroll }: Props,
    containerRef: React.MutableRefObject<HTMLDivElement>,
  ) => {
    // ----------- Scroll position references

    // Reference attached to the last message's DOM element
    const lastMessageRef = useRef<HTMLDivElement>(null);

    // Maintains a reference as to what the last (highest) messages index was on the last render
    const lastMessageIndex = useRef(
      messages.length > 0 ? messages[messages.length - 1].index : null,
    );

    // Determines whether the user was scrolled to the bottom before we potentially
    //  insert new messages at _interleaveMessagesWithDividers()
    const isScrolledToBottom = calcIsScrolledToBottom(containerRef);

    // ----------- Scroll effects

    // Scroll to the bottom if the user switches to a new non-null thread
    useLayoutEffect(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView();
      }
    }, [threadID]);

    // Scroll to bottom if:
    //  1. the user sends a new message OR
    //  2. if they are viewing the last message when a new message comes in
    useLayoutEffect(() => {
      const isNewMessage =
        messages.length > 0 && messages[messages.length - 1].index !== lastMessageIndex.current;
      if (isNewMessage) {
        const newMessage = messages[messages.length - 1];
        if (isOwnMessage(newMessage) || isScrolledToBottom) {
          lastMessageRef.current.scrollIntoView();
        }
        lastMessageIndex.current = newMessage.index;
      }
    }, [messages]);

    // ----------- Render

    const messagesWithDividers = _interleaveMessagesWithDividers(messages, lastMessageRef);

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
        onScroll={onScroll}
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
        key={`message-${message.index}`}
        // Last message in the history gets a ref, to allow scrolling down to bottom message.
        ref={i === messages.length - 1 ? lastMessageRef : undefined}
        placement={message.placement}
        timestamp={message.timestamp}
        readStatusText={isOwnMessage(message) && message.readStatusText}
        // First message needs 'auto' top margin to have messages fill container from bottom -> top
        className={i === 0 ? cssClasses.FIRST_MESSAGE : undefined}
        errorMsg={message.errorMsg}
      >
        {message.content}
      </MessageMetadata>,
    );
    if (message.displayAlertMessageAfter) {
      const { icon, messageText } = message.displayAlertMessageAfter;
      messagesWithDividers.push(
        <AlertMessage
          key={`alertMessage-${message.index}`}
          icon={icon}
          messageText={messageText}
        />,
      );
    }
  });

  return messagesWithDividers;
}

// Helper function: Format a Date for our pretty timestamps.
//  Returns "Today"/"Yesterday" if appropriate, or "<month> <day>" date otherwise.
function _formatDateForDivider(date: Date): string {
  const [messageTimestamp, midnightToday, midnightYesterday] = [
    moment(date),
    moment().hours(0),
    moment().hours(0).subtract(1, "days"),
  ];

  if (messageTimestamp.isAfter(midnightToday)) {
    return "Today";
  }
  if (messageTimestamp.isAfter(midnightYesterday)) {
    return "Yesterday";
  }
  return messageTimestamp.format("MMM D");
}
