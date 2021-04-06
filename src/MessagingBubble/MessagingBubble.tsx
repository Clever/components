import * as React from "react";
import * as classNames from "classnames";
import Linkify from "react-linkify";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./MessagingBubble.less";

const cssClasses = {
  MESSAGE_BASE: "MessagingBubble--Message",
  MESSAGE_OWN: "MessagingBubble--Message--Own",
  MESSAGE_OTHER: "MessagingBubble--Message--Other",
  MESSAGE_REPLY_OWN: "MessagingBubble--Message--Reply--Own",
  MESSAGE_REPLY_OTHER: "MessagingBubble--Message--Reply--Other",
};

interface Props {
  className?: string;
  children: React.ReactNode;
  replyTo?: React.ReactNode;
  theme: "ownMessage" | "otherMessage";
}

export const MessagingBubble: React.FC<Props> = ({
  className,
  children,
  theme,
  replyTo,
}: Props) => {
  return (
    <div
      className={classNames(
        cssClasses.MESSAGE_BASE,
        theme === "ownMessage" ? cssClasses.MESSAGE_OWN : cssClasses.MESSAGE_OTHER,
        className,
      )}
    >
      {replyTo && (
        <div
          className={classNames(
            cssClasses.MESSAGE_BASE,
            theme === "ownMessage" ? cssClasses.MESSAGE_REPLY_OWN : cssClasses.MESSAGE_REPLY_OTHER,
          )}
        >
          <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
            {replyTo}
          </Linkify>
        </div>
      )}
      <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
        {children}
      </Linkify>
    </div>
  );
};
