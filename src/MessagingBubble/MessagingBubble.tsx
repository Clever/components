import * as React from "react";
import * as classNames from "classnames";
import Linkify from "react-linkify";
import { matchDecorator, componentDecorator } from "./linkifyUtils";

import "./MessagingBubble.less";

const cssClasses = {
  MESSAGE_OWN: "MessagingBubble--Message--Own",
  MESSAGE_OTHER: "MessagingBubble--Message--Other",
};

interface Props {
  className?: string;
  children: React.ReactNode;
  theme: "ownMessage" | "otherMessage";
}

export const MessagingBubble: React.FC<Props> = ({ className, children, theme }: Props) => {
  return (
    <div
      className={classNames(
        theme === "ownMessage" ? cssClasses.MESSAGE_OWN : cssClasses.MESSAGE_OTHER,
        className,
      )}
    >
      <Linkify componentDecorator={componentDecorator} matchDecorator={matchDecorator}>
        {children}
      </Linkify>
    </div>
  );
};
