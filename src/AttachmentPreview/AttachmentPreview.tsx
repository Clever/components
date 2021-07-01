import * as classnames from "classnames";
import * as React from "react";
import { useEffect } from "react";
import * as FontAwesome from "react-fontawesome";

import { Button } from "../Button/Button";
import { FlexBox, FlexItem } from "../flex";
import { AttachmentFileType, FileAttachmentIcon } from "../MessagingAttachment/MessagingAttachment";

import "./AttachmentPreview.less";

export interface Props {
  attachmentID: string;
  attachmentName: string;
  attachmentURL: string;
  className?: string;
  closeButtonAriaLabel?: string;
  downloadButtonTextDesktop?: string;
  downloadButtonTextMobile?: string;
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

const ESC = 27;

/**
 * A full page preview for messaging attachments.
 * Currently only used for images, but eventually will be used for PDFs and other attachment types.
 */
export const AttachmentPreview: React.FC<Props> = ({
  attachmentID,
  attachmentName,
  attachmentURL,
  className,
  closeButtonAriaLabel = "close attachment preview",
  downloadButtonTextDesktop = "Download",
  downloadButtonTextMobile = "Save",
  fileType,
  onClickDownload,
  onClose,
}) => {
  function handleKeyUp(e) {
    if (e.keyCode === ESC) {
      onClose();
    }
  }

  // This is the react hooks version of componentDidMount() and componentWillUnmount()
  useEffect(() => {
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
        <FlexItem grow className={cssClass.ATTACHMENT_NAME}>
          {attachmentName}
        </FlexItem>
        <Button
          type="linkPlain"
          className={cssClass.DOWNLOAD_CONTAINER}
          onClick={() => onClickDownload(attachmentID)}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          {downloadButtonTextDesktop}
        </Button>
        <Button
          type="linkPlain"
          aria-label={closeButtonAriaLabel}
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
          className={cssClass.DOWNLOAD_CONTAINER}
          onClick={() => onClickDownload(attachmentID)}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonTextMobile}</span>
        </Button>
      </FlexBox>
    </div>
  );
};
