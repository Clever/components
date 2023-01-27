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

/**
 * @deprecated Do not use. Instead, use [@clever/msg-bubble Bubble](https://github.com/Clever/clever-ui/blob/master/packages/msg-bubble/src/lib/bubble/Bubble.tsx)
 */
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
          messageBody={props.messageBody}
          messageOwnership={props.messageOwnership}
          onClickDeleteButton={props.onClickDeleteButton}
          theme={props.theme}
        />
      );
    }
  }
};
