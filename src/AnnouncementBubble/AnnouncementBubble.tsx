import * as React from "react";

import {
  DeletedAnnouncementBubble,
  Props as DeletedAnnouncementBubbleProps,
} from "./DeletedAnnouncementBubble";
import {
  QuotedAnnouncementBubble,
  Props as QuotedAnnouncementBubbleProps,
} from "./QuotedAnnouncementBubble";
import {
  NormalAnnouncementBubble,
  Props as NormalAnnouncementBubbleProps,
} from "./NormalAnnouncementBubble";

type AnnouncementBubbleProps =
  | NormalAnnouncementBubbleProps
  | QuotedAnnouncementBubbleProps
  | DeletedAnnouncementBubbleProps;

export const AnnouncementBubble: React.FC<AnnouncementBubbleProps> = (
  props: AnnouncementBubbleProps,
) => {
  switch (props.theme) {
    case "deleted": {
      return <DeletedAnnouncementBubble theme="deleted" className={props.className} />;
    }
    case "quoted": {
      return (
        <QuotedAnnouncementBubble
          theme="quoted"
          announcementGroupName={props.announcementGroupName}
          className={props.className}
          colorTheme={props.colorTheme}
          senderIcon={props.senderIcon}
          senderName={props.senderName}
          sentAtTimestamp={props.sentAtTimestamp}
          isMessageTruncated={props.isMessageTruncated}
        >
          {props.children}
        </QuotedAnnouncementBubble>
      );
    }
    default: {
      return (
        <NormalAnnouncementBubble
          theme="normal"
          className={props.className}
          onDelete={props.onDelete}
          onReply={props.onReply}
          repliesDisabledMsg={props.repliesDisabledMsg}
          senderIcon={props.senderIcon}
          senderName={props.senderName}
          sentAtTimestamp={props.sentAtTimestamp}
        >
          {props.children}
        </NormalAnnouncementBubble>
      );
    }
  }
};
