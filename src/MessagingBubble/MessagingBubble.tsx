import * as React from "react";

import {
  NormalMessagingBubble,
  Props as NormalMessagingBubbleProps,
} from "./NormalMessagingBubble";

type MessagingBubbleProps = NormalMessagingBubbleProps;

export const MessagingBubble: React.FC<MessagingBubbleProps> = (props: MessagingBubbleProps) => {
  switch (props.bubbleType) {
    case "deleted": {
      return null;
    }
    default: {
      return (
        <NormalMessagingBubble
          bubbleType="normal"
          className={props.className}
          children={props.children}
          timestamp={props.timestamp}
          replyTo={props.replyTo}
          attachments={props.attachments}
          messageOwnership={props.messageOwnership}
          theme={props.theme}
        />
      );
    }
  }
};
