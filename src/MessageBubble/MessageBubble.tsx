import * as React from "react";
import * as classNames from "classnames";

import "./MessageBubble.less";

const cssClasses = {
  MESSAGEBUBBLE_MESSAGE_OWN: "MessageBubble--Message--Own",
  MESSAGEBUBBLE_MESSAGE_OTHER: "MessageBubble--Message--Other",
};

interface Props {
  className?: string;
  content: React.ReactNode;
  theme: "ownMessage" | "otherMessage";
}

export const MessageBubble: React.FC<Props> = ({ className, content, theme }: Props) => {
  return (
    <div
      className={classNames(
        theme === "ownMessage"
          ? cssClasses.MESSAGEBUBBLE_MESSAGE_OWN
          : cssClasses.MESSAGEBUBBLE_MESSAGE_OTHER,
        className,
      )}
    >
      {content}
    </div>
  );
};
