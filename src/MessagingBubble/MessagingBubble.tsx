import * as React from "react";
import * as classNames from "classnames";

import "./MessagingBubble.less";

const cssClasses = {
  MESSAGINGBUBBLE_MESSAGE_OWN: "MessagingBubble--Message--Own",
  MESSAGINGBUBBLE_MESSAGE_OTHER: "MessagingBubble--Message--Other",
};

interface Props {
  className?: string;
  content: React.ReactNode;
  theme: "ownMessage" | "otherMessage";
}

export const MessagingBubble: React.FC<Props> = ({ className, content, theme }: Props) => {
  return (
    <div
      className={classNames(
        theme === "ownMessage"
          ? cssClasses.MESSAGINGBUBBLE_MESSAGE_OWN
          : cssClasses.MESSAGINGBUBBLE_MESSAGE_OTHER,
        className,
      )}
    >
      {content}
    </div>
  );
};
