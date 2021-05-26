import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as cx from "classnames";

import { FlexBox } from "../flex";

import "./MessagingAttachment.less";

function cssClass(element: string) {
  return `MessagingAttachment--${element}`;
}

type Props = {
  attachmentID: string;
  errorMsg?: string;
  icon: React.ReactNode;
  onClickAttachment: (attachmentID: string) => void;
  onRemoveAttachment?: (attachmentID: string) => void;
  title?: string;
  subtitle?: string;
  isUpload?: boolean;
  uploadComplete?: boolean;
};

export const MessagingAttachment: React.FC<Props> = ({
  attachmentID,
  errorMsg,
  icon,
  onClickAttachment,
  onRemoveAttachment,
  title,
  subtitle,
  isUpload,
  uploadComplete,
}: Props) => {
  return (
    <FlexBox className={cssClass("ParentContainer")}>
      {onRemoveAttachment && (
        <button
          className={cssClass("CloseButton")}
          onClick={(e) => handleRemoveClick(e, onRemoveAttachment, attachmentID)}
          aria-label={`close attachment with title: "${title}"`}
        >
          <FontAwesome name="times" className={cssClass("CloseIcon")} />
        </button>
      )}
      <FlexBox
        className={cx(
          cssClass("Container"),
          isUpload && cssClass("Short"),
          isUpload && !uploadComplete && cssClass("IsUploading"),
          !!errorMsg && cssClass("Error"),
        )}
        onClick={() => onClickAttachment(attachmentID)}
      >
        <FlexBox className={cssClass("IconContainer")}>{icon}</FlexBox>
        <FlexBox className={cssClass("TextContainer")} column>
          <span className={cssClass("Title")}>{errorMsg || title}</span>
          {subtitle && <span className={cssClass("Subtitle")}>{subtitle}</span>}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

function handleRemoveClick(e, onRemoveAttachment, attachmentID) {
  e.stopPropagation();
  onRemoveAttachment(attachmentID);
}

// /// Sub-components, exported icon components to be used by consumers /// //

const draftAudio = require("./icons/draft-attachment-audio.svg");
const draftCatchall = require("./icons/draft-attachment-catchall.svg");
const draftDoc = require("./icons/draft-attachment-doc.svg");
const draftImage = require("./icons/draft-attachment-image.svg");
const draftPdf = require("./icons/draft-attachment-pdf.svg");
const draftPpt = require("./icons/draft-attachment-ppt.svg");
const draftVideo = require("./icons/draft-attachment-video.svg");
const draftXls = require("./icons/draft-attachment-xls.svg");
const sentAudio = require("./icons/sent-attachment-audio.svg");
const sentCatchall = require("./icons/sent-attachment-catchall.svg");
const sentDoc = require("./icons/sent-attachment-doc.svg");
const sentImage = require("./icons/sent-attachment-image.svg");
const sentPdf = require("./icons/sent-attachment-pdf.svg");
const sentPpt = require("./icons/sent-attachment-ppt.svg");
const sentVideo = require("./icons/sent-attachment-video.svg");
const sentXls = require("./icons/sent-attachment-xls.svg");

// TODO: Can this be replaced with a programmatic solution
// const fileIcon = `./icons/${isUpload ? "draft" : "sent"}-attachment-${fileType}.svg`; ?
// Will "require" allow this?
const fileIcons = {
  audio: { sent: sentAudio, draft: draftAudio },
  catchall: { sent: sentCatchall, draft: draftCatchall },
  doc: { sent: sentDoc, draft: draftDoc },
  image: { sent: sentImage, draft: draftImage },
  pdf: { sent: sentPdf, draft: draftPdf },
  ppt: { sent: sentPpt, draft: draftPpt },
  video: { sent: sentVideo, draft: draftVideo },
  xls: { sent: sentXls, draft: draftXls },
};

type AttachmentIconProps = {
  fileType: "audio" | "catchall" | "doc" | "image" | "pdf" | "ppt" | "video" | "xls";
  isUpload?: boolean;
  uploadComplete?: boolean;
  errorMsg?: string;
};

// TODO: handle undefined. Note: Components uses jsx, LP uses tsx
export function FileAttachmentIcon({
  fileType = "catchall",
  isUpload,
  uploadComplete,
  errorMsg,
}: AttachmentIconProps) {
  if (!!errorMsg) {
    return (
      <FontAwesome name="exclamation-circle" className={cx(cssClass("ErrorCircle"), "fa-lg")} />
    );
  } else if (isUpload && !uploadComplete) {
    return <FontAwesome name="spinner" className={cx(cssClass("ErrorCircle"), "fa-lg")} spin />;
  }
  return (
    <img
      src={isUpload ? fileIcons[fileType].draft : fileIcons[fileType].sent}
      className={cssClass("AttachmentTypeIcon")}
      alt={`MessagingAttachment ${fileType} icon`}
    />
  );
}