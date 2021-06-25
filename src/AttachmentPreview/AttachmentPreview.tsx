import * as classnames from "classnames";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { FlexBox } from "../flex";
import { AttachmentFileType, FileAttachmentIcon } from "../MessagingAttachment/MessagingAttachment";

import "./AttachmentPreview.less";

export interface Props {
  attachmentID: string;
  attachmentName: string;
  attachmentURL: string;
  className?: string;
  closeButtonAriaLabel?: string;
  downloadButtonText?: string;
  fileType: AttachmentFileType;
  onClickDownload: (attachmentID: string) => void;
  onClose: () => void;
}

export const cssClass = {
  CONTAINER: "AttachmentPreview",
  BACKGROUND: "AttachmentPreview--Background",
  HEADER_BAR: "AttachmentPreview--HeaderBar",
  FILE_ICON: "AttachmentPreview--FileIcon",
  ATTACHMENT_NAME: "AttachmentPreview--AttachmentName",
  DOWNLOAD_CONTAINER: "AttachmentPreview--DownloadContainer",
  DOWNLOAD_BUTTON: "AttachmentPreview--DownloadButton",
  CLOSE_BUTTON: "AttachmentPreview--CloseButton",
  PREVIEW_WINDOW: "AttachmentPreview--PreviewWindow",
  IMAGE_CONTAINER: "AttachmentPreview--ImageContainer",
};

/**
 * TODO: Add short description.
 */
export const AttachmentPreview: React.FC<Props> = ({
  attachmentID,
  attachmentName,
  attachmentURL,
  className,
  closeButtonAriaLabel,
  downloadButtonText,
  fileType,
  onClickDownload,
  onClose,
}) => {
  // const [showingPreview, setShowingPreview] = React.useState(false);

  // function showPreview() {
  //   setShowingPreview(true);
  // }

  // function hidePreview() {
  //   setShowingPreview(false);
  // }

  const preview = (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <div className={cssClass.BACKGROUND} onClick={onClose} aria-hidden="true" />
      <FlexBox className={cssClass.HEADER_BAR}>
        <FileAttachmentIcon className={cssClass.FILE_ICON} fileType={fileType} />
        <FlexBox grow className={cssClass.ATTACHMENT_NAME}>
          {attachmentName}
        </FlexBox>
        <FlexBox
          className={cssClass.DOWNLOAD_CONTAINER}
          tabIndex={0}
          onClick={() => onClickDownload(attachmentID)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickDownload(attachmentID);
            }
          }}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonText || "Download"}</span>
        </FlexBox>
        <FlexBox
          aria-label={closeButtonAriaLabel || "close attachment preview"}
          className={cssClass.CLOSE_BUTTON}
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClose();
            }
          }}
        >
          <FontAwesome name="times" />
        </FlexBox>
      </FlexBox>
      <FlexBox className={cssClass.PREVIEW_WINDOW}>
        <FlexBox className={cssClass.IMAGE_CONTAINER} onClick={onClose}>
          <img
            // TODO: is this use of tabIndex kosher?
            tabIndex={0}
            src={attachmentURL}
            alt={"attachment preview"}
            onClick={(e) => e.stopPropagation()}
            // note: this is only here because Axe Linter "Axe Linter
            // (click-events-have-key-events): Ensure a clickable non-interactive element has at
            // least one keyboard event"

            // TODO: is there a way to just tell Axe linter to ignore the above line?
            onKeyDown={(e) => {
              // TODO: is there a standardized way to do this in dewey?
              // TODO: Should this just be on the image, or elsewhere too?
              if (e.key === "Escape") {
                onClose();
              }
            }}
          />
        </FlexBox>
      </FlexBox>
    </div>
  );

  return preview;
};
