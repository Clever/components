import * as React from "react";

import {
  DeletedMessagingBubble,
  Props as DeletedMessagingBubbleProps,
} from "./DeletedMessagingBubble";
import {
  NormalMessagingBubble,
  Props as NormalMessagingBubbleProps,
} from "./NormalMessagingBubble";

type MessagingBubbleProps = DeletedMessagingBubbleProps | NormalMessagingBubbleProps;

export const MessagingBubble: React.FC<MessagingBubbleProps> = (props: MessagingBubbleProps) => {
  switch (props.bubbleType) {
    case "deleted": {
      return (
        <DeletedMessagingBubble
          bubbleType="deleted"
          className={props.className}
          theme={props.theme}
          deletionNoticeText={props.deletionNoticeText}
          messageOwnership={props.messageOwnership}
        />
      );
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
