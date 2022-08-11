import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as cx from "classnames";

import { AttachmentPreview } from "../AttachmentPreview";
import { FlexBox } from "../flex";
import KeyCode from "../utils/KeyCode";
import { MessagingTheme } from "../utils/messaging";

import "./MessagingAttachment.less";

function cssClass(element: string) {
  return `MessagingAttachment--${element}`;
}

type AttachmentPreviewProps = {
  attachmentURL: string;
  className?: string;
  closeButtonAriaLabel?: string;
  closeButtonText?: string;
  downloadButtonTextDesktop?: string;
  downloadButtonTextMobile?: string;
};

type Props = {
  attachmentPreviewProps: AttachmentPreviewProps;
  className?: string;
  errorMsg?: string;
  fileType: AttachmentFileType;
  icon?: React.ReactNode;
  isUpload?: boolean;
  onPreviewAttachment?: () => void;
  onClickDownload: () => void;
  onRemoveAttachment?: () => void;
  subtitle?: string;
  title?: string;
  uploadComplete?: boolean;
  theme?: MessagingTheme;
};

// TODO: replace with a discriminated union to keep the props neat
export const MessagingAttachment: React.FC<Props> = ({
  attachmentPreviewProps,
  className,
  errorMsg,
  fileType,
  icon,
  onPreviewAttachment,
  onClickDownload,
  onRemoveAttachment,
  title,
  subtitle,
  isUpload,
  uploadComplete,
  theme,
}: Props) => {
  const [attachmentPreviewIsShowing, setAttachmentPreviewIsShowing] = React.useState(false);
  const isPreviewableAttachment = PreviewableFileTypes.has(fileType);

  return (
    <FlexBox
      className={cx(
        cssClass("ParentContainer"),
        isUpload && cssClass("ParentContainer--IsUpload"),
        className,
        theme === "familyPortal" && cssClass("FamilyPortal"),
      )}
    >
      {onRemoveAttachment && (
        <button
          className={cssClass("CloseButton")}
          onClick={(e) => handleRemoveClick(e, onRemoveAttachment)}
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
        aria-label={"Attachment"}
        tabIndex={0}
        onClick={(e) =>
          handleClickAttachment(
            e,
            isUpload,
            uploadComplete,
            isPreviewableAttachment,
            setAttachmentPreviewIsShowing,
            onPreviewAttachment,
            onClickDownload,
          )
        }
        onKeyDown={(e) => {
          if (e.key === KeyCode.ENTER) {
            handleClickAttachment(
              e,
              isUpload,
              uploadComplete,
              isPreviewableAttachment,
              setAttachmentPreviewIsShowing,
              onPreviewAttachment,
              onClickDownload,
            );
          }
        }}
      >
        <FlexBox className={cssClass("IconContainer")}>
          {icon || (
            <FileAttachmentIcon
              fileType={fileType}
              isUpload={isUpload}
              uploadError={!!errorMsg}
              uploadComplete={uploadComplete}
            />
          )}
        </FlexBox>
        <FlexBox className={cssClass("TextContainer")} column>
          <span role="status" className={cssClass("Title")}>
            {errorMsg || title}
          </span>
          {subtitle && <span className={cssClass("Subtitle")}>{subtitle}</span>}
        </FlexBox>
      </FlexBox>
      {attachmentPreviewIsShowing && isPreviewableAttachment && (
        <AttachmentPreview
          attachmentName={title}
          attachmentURL={attachmentPreviewProps.attachmentURL}
          className={attachmentPreviewProps.className}
          closeButtonAriaLabel={attachmentPreviewProps.closeButtonAriaLabel}
          downloadButtonTextDesktop={attachmentPreviewProps.downloadButtonTextDesktop}
          downloadButtonTextMobile={attachmentPreviewProps.downloadButtonTextMobile}
          fileType={fileType}
          onClickDownload={onClickDownload}
          onClose={() => setAttachmentPreviewIsShowing(false)}
        />
      )}
    </FlexBox>
  );
};

function handleClickAttachment(
  e,
  isUpload,
  uploadComplete,
  isPreviewableAttachment,
  setAttachmentPreviewIsShowing,
  onPreviewAttachment,
  onClickDownload,
) {
  if (isUpload && !uploadComplete) {
    e.stopPropagation();
  } else if (isPreviewableAttachment) {
    setAttachmentPreviewIsShowing(true);
    if (onPreviewAttachment) {
      onPreviewAttachment();
    }
  } else {
    onClickDownload();
  }
}

function handleRemoveClick(e, onRemoveAttachment) {
  e.stopPropagation();
  onRemoveAttachment();
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

// the set of fileTypes we are previewing in AttachmentPreviews
export const PreviewableFileTypes = new Set(["jpg", "jpeg", "gif", "png", "svg"]);

function fileTypeToIconType(fileType: string): AttachmentIconType {
  const mapFileTypeToIconType = {
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

  return mapFileTypeToIconType[fileType] || "catchall";
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
  uploadError?: boolean;
  className?: string;
};

// TODO: handle undefined. Note: Components uses jsx, LP uses tsx
export function FileAttachmentIcon({
  fileType,
  isUpload,
  uploadComplete,
  uploadError,
  className,
}: AttachmentIconProps) {
  const iconType = fileTypeToIconType(fileType);

  if (uploadError) {
    return (
      <FontAwesome name="exclamation-circle" className={cx(cssClass("ErrorCircle"), "fa-lg")} />
    );
  } else if (isUpload && !uploadComplete) {
    return <FontAwesome name="spinner" className={cx(cssClass("ErrorCircle"), "fa-lg")} spin />;
  }
  return (
    <img
      src={isUpload ? fileIcons[iconType].draft : fileIcons[iconType].sent}
      className={cx(cssClass("AttachmentTypeIcon"), className)}
      alt={`MessagingAttachment ${iconType} icon`}
    />
  );
}
