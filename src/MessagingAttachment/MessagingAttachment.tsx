import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as cx from "classnames";

import { AttachmentPreview } from "../AttachmentPreview";
import { FlexBox } from "../flex";

import "./MessagingAttachment.less";

function cssClass(element: string) {
  return `MessagingAttachment--${element}`;
}

type Props = {
  attachmentID: string;
  // TODO: should this be optional?
  attachmentURL: string;
  errorMsg?: string;
  // TODO: is this needed, or only mimeType?
  fileType: AttachmentFileType;
  icon?: React.ReactNode;
  onClickAttachment: (attachmentID: string) => void;
  onRemoveAttachment?: (attachmentID: string) => void;
  title?: string;
  subtitle?: string;
  isUpload?: boolean;
  uploadComplete?: boolean;
  mimeType?: string;
};

// TODO: should I use a discriminated union here? to keep the props neat?
export const MessagingAttachment: React.FC<Props> = ({
  attachmentID,
  attachmentURL,
  errorMsg,
  fileType,
  icon,
  onClickAttachment,
  onRemoveAttachment,
  title,
  subtitle,
  isUpload,
  uploadComplete,
  mimeType,
}: Props) => {
  const [attachmentPreviewIsShowing, setAttachmentPreviewIsShowing] = React.useState(false);

  const imageMimeTypes = ["image/jpeg", "image/gif", "image/png", "image/svg+xml"];
  const isImageAttachment = imageMimeTypes.includes(mimeType);

  return (
    <FlexBox
      className={cx(cssClass("ParentContainer"), isUpload && cssClass("ParentContainer--IsUpload"))}
    >
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
        onClick={() => {
          if (isImageAttachment) {
            setAttachmentPreviewIsShowing(true);
          } else {
            onClickAttachment(attachmentID);
          }
        }}
      >
        <FlexBox className={cssClass("IconContainer")}>
          {icon || (
            <FileAttachmentIcon
              fileType={fileType}
              isUpload={isUpload}
              uploadComplete={uploadComplete}
            />
          )}
        </FlexBox>
        <FlexBox className={cssClass("TextContainer")} column>
          <span className={cssClass("Title")}>{errorMsg || title}</span>
          {subtitle && <span className={cssClass("Subtitle")}>{subtitle}</span>}
        </FlexBox>
      </FlexBox>
      {attachmentPreviewIsShowing && isImageAttachment && (
        <AttachmentPreview
          attachmentID={attachmentID}
          attachmentName={title}
          attachmentURL={attachmentURL}
          fileType={fileType}
          onClickDownload={() => {
            // TODO: remove this console.log
            console.log("download!");
            onClickAttachment(attachmentID);
          }}
          onClose={() => setAttachmentPreviewIsShowing(false)}
        />
      )}
    </FlexBox>
  );
};

function handleRemoveClick(e, onRemoveAttachment, attachmentID) {
  e.stopPropagation();
  onRemoveAttachment(attachmentID);
}

// /// Sub-components, exported icon components to be used by consumers /// //

export type AttachmentFileType =
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "csv"
  | "ppt"
  | "pptx"
  | "jpg"
  | "jpeg"
  | "gif"
  | "png"
  | "svg"
  | "mp4"
  | "mov"
  | "wmv"
  | "mp3"
  | "wav"
  | "m4a"
  | "flv"
  | "txt"
  | null;

function fileTypeToIcon(fileType: string): AttachmentIconType {
  const mapFileTypeToIcon = {
    pdf: "pdf",
    doc: "doc",
    docx: "doc",
    xls: "xls",
    xlsx: "xls",
    csv: "catchall",
    ppt: "ppt",
    pptx: "ppt",
    jpg: "image",
    jpeg: "image",
    gif: "image",
    png: "image",
    svg: "image",
    mp4: "audio",
    mov: "video",
    wmv: "video",
    mp3: "audio",
    wav: "audio",
    m4a: "audio",
    flv: "video",
    txt: "doc",
    null: "catchall",
  };

  return mapFileTypeToIcon[fileType] || "catchall";
}

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

export type AttachmentIconType =
  | "audio"
  | "catchall"
  | "doc"
  | "image"
  | "pdf"
  | "ppt"
  | "video"
  | "xls";

type AttachmentIconProps = {
  fileType: string;
  isUpload?: boolean;
  uploadComplete?: boolean;
  errorMsg?: string;
  className?: string;
};

// TODO: handle undefined. Note: Components uses jsx, LP uses tsx
export function FileAttachmentIcon({
  fileType,
  isUpload,
  uploadComplete,
  errorMsg,
  className,
}: AttachmentIconProps) {
  const cleanedFileType = fileTypeToIcon(fileType);

  if (!!errorMsg) {
    return (
      <FontAwesome name="exclamation-circle" className={cx(cssClass("ErrorCircle"), "fa-lg")} />
    );
  } else if (isUpload && !uploadComplete) {
    return <FontAwesome name="spinner" className={cx(cssClass("ErrorCircle"), "fa-lg")} spin />;
  }
  return (
    <img
      src={isUpload ? fileIcons[cleanedFileType].draft : fileIcons[cleanedFileType].sent}
      className={cx(cssClass("AttachmentTypeIcon"), className)}
      alt={`MessagingAttachment ${cleanedFileType} icon`}
    />
  );
}
