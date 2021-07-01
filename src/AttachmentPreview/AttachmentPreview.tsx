import * as classnames from "classnames";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { Button } from "../Button/Button";
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
  FOOTER_BAR: "AttachmentPreview--FooterBar",
};

/**
 * A full page preview for messaging attachments.
 * Currently only used for images, but eventually will be used for PDFs and other attachment types.
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
  const ESC = 27;

  function handleKeyUp(e) {
    console.log("\ne:", e);
    if (e.keyCode === ESC) {
      onClose();
    }
  }

  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <div className={cssClass.BACKGROUND} aria-hidden="true" />
      <FlexBox className={cssClass.HEADER_BAR}>
        <FileAttachmentIcon className={cssClass.FILE_ICON} fileType={fileType} />
        <FlexBox grow className={cssClass.ATTACHMENT_NAME}>
          {attachmentName}
        </FlexBox>
        <Button
          type="linkPlain"
          className={cssClass.DOWNLOAD_CONTAINER}
          onClick={() => onClickDownload(attachmentID)}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonText || "Download"}</span>
        </Button>
        <Button
          type="linkPlain"
          aria-label={closeButtonAriaLabel || "close attachment preview"}
          className={cssClass.CLOSE_BUTTON}
          onClick={onClose}
        >
          <FontAwesome name="times" />
        </Button>
      </FlexBox>
      <FlexBox className={cssClass.PREVIEW_WINDOW}>
        <FlexBox className={cssClass.IMAGE_CONTAINER}>
          <img src={attachmentURL} alt={"attachment preview"} />
        </FlexBox>
      </FlexBox>
      <FlexBox className={cssClass.FOOTER_BAR}>
        <Button
          type="linkPlain"
          grow
          className={cssClass.DOWNLOAD_CONTAINER}
          onClick={() => onClickDownload(attachmentID)}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonText || "Save"}</span>
        </Button>
      </FlexBox>
    </div>
  );
};
