import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import Linkify from "react-linkify";
import * as cx from "classnames";
import { matchDecorator, componentDecorator } from "./linkifyUtils";
import { FlexBox } from "..";

import "./MessagingBubble.less";

const cssClasses = {
  CONTAINER: "MessagingBubble--Container",
  MESSAGE_BASE: "MessagingBubble--Message",
  MESSAGE_OWN: "MessagingBubble--Message--Own",
  MESSAGE_OTHER: "MessagingBubble--Message--Other",
  MESSAGE_REPLY_OWN: "MessagingBubble--Message--Reply--Own",
  MESSAGE_REPLY_OTHER: "MessagingBubble--Message--Reply--Other",
  MESSAGE_REPLY_PARENT: "MessagingBubble--Message--Reply--Parent",
  ERROR: "MessagingBubble--Error",
  ERROR_ICON: "MessagingBubble--Error--Icon",
  ERROR_PARENT: "MessagingBubble--Error--Parent",
};

interface Props {
  className?: string;
  children: React.ReactNode;
  errorMsg?: React.ReactNode;
  replyTo?: React.ReactNode;
  theme: "ownMessage" | "otherMessage";
}

export const MessagingBubble: React.FC<Props> = ({
  className,
  children,
  errorMsg,
  theme,
  replyTo,
}: Props) => {
  return (
    <div className={errorMsg && cssClasses.ERROR_PARENT}>
      <div
        className={cx(
          cssClasses.MESSAGE_BASE,
          theme === "ownMessage" ? cssClasses.MESSAGE_OWN : cssClasses.MESSAGE_OTHER,
          className,
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
            <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
              {replyTo}
            </Linkify>
          </div>
        )}
        <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
          {children}
        </Linkify>
        {errorMsg && formErrorContainer(errorMsg)}
      </div>
    </div>
  );
};

function formErrorContainer(errorMsg: React.ReactNode): JSX.Element {
  return (
    <FlexBox className={cssClasses.ERROR} grow alignItems="center" justify="start">
      <FontAwesome className={cssClasses.ERROR_ICON} name="exclamation-circle " />
      {errorMsg}
    </FlexBox>
  );
}
