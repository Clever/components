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
      return (
        <DeletedAnnouncementBubble
          theme="deleted"
          className={props.className}
          deletionNoticeText={props.deletionNoticeText}
        />
      );
    }
    case "quoted": {
      return (
        <QuotedAnnouncementBubble
          theme="quoted"
          announcementGroupName={props.announcementGroupName}
          className={props.className}
          colorTheme={props.colorTheme}
          isMessageTruncated={props.isMessageTruncated}
          postedInText={props.postedInText}
          senderIcon={props.senderIcon}
          senderName={props.senderName}
          sentAtTimestamp={props.sentAtTimestamp}
          showLessButtonText={props.showLessButtonText}
          showMoreButtonText={props.showMoreButtonText}
          truncationNoticeText={props.truncationNoticeText}
          truncationTooltipText={props.truncationTooltipText}
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
          replyButtonText={props.replyButtonText}
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
