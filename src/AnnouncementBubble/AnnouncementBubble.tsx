import * as React from "react";

import {
  UnavailableAnnouncementBubble,
  Props as UnavailableAnnouncementBubbleProps,
} from "./UnavailableAnnouncementBubble";
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
  | DeletedAnnouncementBubbleProps
  | UnavailableAnnouncementBubbleProps;

export const AnnouncementBubble: React.FC<AnnouncementBubbleProps> = (
  props: AnnouncementBubbleProps,
) => {
  switch (props.bubbleType) {
    case "unavailable": {
      return (
        <UnavailableAnnouncementBubble
          bubbleType="unavailable"
          className={props.className}
          colorTheme={props.colorTheme}
          unavailableNoticeHeader={props.unavailableNoticeHeader}
          unavailableNoticeText={props.unavailableNoticeText}
        />
      );
    }
    case "deleted": {
      return (
        <DeletedAnnouncementBubble
          bubbleType="deleted"
          theme={props.theme}
          className={props.className}
          deletionNoticeText={props.deletionNoticeText}
        />
      );
    }
    case "quoted": {
      return (
        <QuotedAnnouncementBubble
          bubbleType="quoted"
          theme={props.theme}
          announcementGroupName={props.announcementGroupName}
          attachments={props.attachments}
          className={props.className}
          colorTheme={props.colorTheme}
          inlineErrorMsg={props.inlineErrorMsg}
          isMessageTruncated={props.isMessageTruncated}
          postedInText={props.postedInText}
          senderIcon={props.senderIcon}
          senderName={props.senderName}
          sentAtTimestamp={props.sentAtTimestamp}
          showLessButtonText={props.showLessButtonText}
          showMoreButtonText={props.showMoreButtonText}
          truncationNoticeText={props.truncationNoticeText}
          truncationTooltipText={props.truncationTooltipText}
          onToggleShow={props.onToggleShow}
        >
          {props.children}
        </QuotedAnnouncementBubble>
      );
    }
    default: {
      return (
        <NormalAnnouncementBubble
          bubbleType="normal"
          theme={props.theme}
          attachments={props.attachments}
          className={props.className}
          inlineErrorMsg={props.inlineErrorMsg}
          onDelete={props.onDelete}
          onReadReceiptsClick={props.onReadReceiptsClick}
          onReadReceiptsHover={props.onReadReceiptsHover}
          onReply={props.onReply}
          onTranslatedLanguagesClick={props.onTranslatedLanguagesClick}
          onTranslatedLanguagesHover={props.onTranslatedLanguagesHover}
          readBy={props.readBy}
          recipientType={props.recipientType}
          repliesDisabledMsg={props.repliesDisabledMsg}
          replyButtonText={props.replyButtonText}
          senderIcon={props.senderIcon}
          senderName={props.senderName}
          sentAtTimestamp={props.sentAtTimestamp}
          translatedLanguages={props.translatedLanguages}
        >
          {props.children}
        </NormalAnnouncementBubble>
      );
    }
  }
};
