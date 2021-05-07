import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as cx from "classnames";

import { FlexBox } from "src/flex";
// import LoadingSpinner from "../LoadingSpinner";

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
  title: string;
  subtitle?: string;
  // TODO: better name? short/small?
  isUpload?: boolean;
};

// can this not be functional?
export const MessagingAttachment: React.FC<Props> = ({
  // todo use this?
  attachmentID,
  errorMsg,
  icon,
  onClickAttachment,
  onRemoveAttachment,
  title,
  subtitle,
  isUpload,
}: Props) => {
  return (
    <FlexBox
      className={cx(cssClass("Container"), isUpload && cssClass("Short"))}
      onClick={() => onClickAttachment(attachmentID)}
    >
      {/* only show reply remove attachment button if onRemoveAttachment callback provided */}
      {onRemoveAttachment && (
        <button
          className={cssClass("CloseButton")}
          onClick={() => onRemoveAttachment(attachmentID)}
        >
          <FontAwesome name="times" className={cssClass("CloseIcon")} />
        </button>
      )}
      <FlexBox className={cssClass("IconContainer")}>{icon}</FlexBox>
      <FlexBox className={cssClass("TextContainer")} column>
        <span className={cssClass("title")}>{errorMsg || title}</span>
        {subtitle && <span className={cssClass("subtitle")}>{subtitle}</span>}
      </FlexBox>
    </FlexBox>
  );
};

// /// Sub-components, exported icon components to be used by consumers /// //

const draftAudio = require("./icons/draft-attachment-audio.svg");
const draftCatchall = require("./icons/draft-attachment-catchall.svg");
const draftDoc = require("./icons/draft-attachment-doc.svg");
const draftImage = require("./icons/draft-attachment-image.svg");
const draftPdf = require("./icons/draft-attachment-pdf.svg");
const draftPpt = require("./icons/draft-attachment-ppt.svg");
const draftVideo = require("./icons/draft-attachment-video.svg");
const draftXls = require("./icons/draft-attachment-xls.svg");
const sentAudio = require("./icons/sent-attachment-audio-download.svg");
const sentCatchall = require("./icons/sent-attachment-catchall-download.svg");
const sentDoc = require("./icons/sent-attachment-doc-download.svg");
const sentImage = require("./icons/sent-attachment-image-view.svg");
const sentPdf = require("./icons/sent-attachment-pdf-view.svg");
const sentPpt = require("./icons/sent-attachment-ppt-download.svg");
const sentVideo = require("./icons/sent-attachment-video-download.svg");
const sentXls = require("./icons/sent-attachment-xls-download.svg");

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
};

// TODO: handle undefined. Note: Components uses jsx, LP uses tsx
export function FileAttachmentIcon({ fileType = "catchall", isUpload }: AttachmentIconProps) {
  return (
    <img
      src={isUpload ? fileIcons[fileType].draft : fileIcons[fileType].sent}
      className={cssClass("AttachmentTypeIcon")}
      alt={`MessagingAttachment ${fileType} icon`}
    />
  );
}

// TODO: how do I import this? It exists in LP
// TODO: is this necessary? Helpful?
// export function LoadingSpinnerIcon() {
//   return <LoadingSpinner size={"s"} />;
// }
