import * as React from "react";
import Linkify from "react-linkify";
import * as cx from "classnames";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./MessagingBubble.less";

const cssClasses = {
  FLEXBOX: "flexbox",
  MESSAGE_BASE: "MessagingBubble--Message",
  MESSAGE_OWN: "MessagingBubble--Message--Own",
  MESSAGE_OTHER: "MessagingBubble--Message--Other",
  MESSAGE_REPLY_OWN: "MessagingBubble--Message--Reply--Own",
  MESSAGE_REPLY_OTHER: "MessagingBubble--Message--Reply--Other",
  MESSAGE_REPLY_PARENT: "MessagingBubble--Message--Reply--Parent",
  MESSAGE_ATTACHMENT_OWN: "MessagingBubble--Message--Attachment--Own",
  MESSAGE_ATTACHMENT_OTHER: "MessagingBubble--Message--Attachment--Other",
};

interface Props {
  className?: string;
  children: React.ReactNode;
  replyTo?: React.ReactNode;
  attachments?: React.ReactNode[];
  theme: "ownMessage" | "otherMessage";
}

export const MessagingBubble: React.FC<Props> = ({
  className,
  children,
  theme,
  replyTo,
  attachments,
}: Props) => {
  return (
    <div className={className}>
      <div
        className={cx(
          cssClasses.MESSAGE_BASE,
          theme === "ownMessage" ? cssClasses.MESSAGE_OWN : cssClasses.MESSAGE_OTHER,
          replyTo && cssClasses.MESSAGE_REPLY_PARENT,
        )}
      >
        {replyTo && (
          <div
            className={cx(
              cssClasses.MESSAGE_BASE,
              theme === "ownMessage"
                ? cssClasses.MESSAGE_REPLY_OWN
                : cssClasses.MESSAGE_REPLY_OTHER,
            )}
          >
            {replyTo}
          </div>
        )}
        <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
          {children}
        </Linkify>
      </div>
      {attachments && (
        <div
          className={cx(
            cssClasses.MESSAGE_BASE,
            cssClasses.FLEXBOX,
            theme === "ownMessage"
              ? cssClasses.MESSAGE_ATTACHMENT_OWN
              : cssClasses.MESSAGE_ATTACHMENT_OTHER,
          )}
        >
          {attachments}
        </div>
      )}
    </div>
  );
};
