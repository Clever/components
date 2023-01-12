import * as classnames from "classnames";
import * as React from "react";
import { useState, useEffect } from "react";
import * as FontAwesome from "react-fontawesome";

import { Button } from "../Button/Button";
import { FlexBox, FlexItem } from "../flex";
import { AttachmentFileType, FileAttachmentIcon } from "../MessagingAttachment/MessagingAttachment";

import "./AttachmentPreview.less";

export interface Props {
  attachmentName: string;
  attachmentURL: string;
  className?: string;
  closeButtonAriaLabel?: string;
  downloadButtonTextDesktop?: string;
  downloadButtonTextMobile?: string;
  fileType: AttachmentFileType;
  onClickDownload: () => void;
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
  CLOSE_CONTAINER: "AttachmentPreview--CloseContainer",
  CLOSE_BUTTON: "AttachmentPreview--CloseButton",
  PREVIEW_WINDOW: "AttachmentPreview--PreviewWindow",
  IMAGE_CONTAINER: "AttachmentPreview--ImageContainer",
  ERROR_CONTAINER: "AttachmentPreview--ErrorContainer",
  ERROR_ICON: "AttachmentPreview--ErrorIcon",
  FOOTER_BAR: "AttachmentPreview--FooterBar",
};

const ESC = 27;

/**
 * A full page preview for messaging attachments.
 * Currently only used for images, but eventually will be used for PDFs and other attachment types.
 */
export const AttachmentPreview: React.FC<Props> = ({
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
  const [imageLoadError, setImageLoadError] = useState(false);

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

  const onBackgroundClick = (event) => {
    const backgroundWasClicked = event.target === event.currentTarget;
    if (backgroundWasClicked) {
      onClose();
    }
  };

  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <div className={cssClass.BACKGROUND} aria-hidden="true" />
      <FlexBox className={cssClass.HEADER_BAR}>
        <FileAttachmentIcon className={cssClass.FILE_ICON} fileType={fileType} />
        <FlexItem grow className={cssClass.ATTACHMENT_NAME}>
          {attachmentName}
        </FlexItem>
        <Button type="linkPlain" className={cssClass.DOWNLOAD_CONTAINER} onClick={onClickDownload}>
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          {downloadButtonTextDesktop}
        </Button>
        <Button
          type="linkPlain"
          className={cssClass.CLOSE_CONTAINER}
          ariaLabel={closeButtonAriaLabel}
          onClick={onClose}
        >
          <FontAwesome name="times" className={cssClass.CLOSE_BUTTON} />
        </Button>
      </FlexBox>
      <FlexBox className={cssClass.PREVIEW_WINDOW}>
        <FlexBox className={cssClass.IMAGE_CONTAINER} onClick={onBackgroundClick}>
          {!imageLoadError && (
            <img
              src={attachmentURL}
              alt={"attachment preview"}
              onError={() => setImageLoadError(true)}
            />
          )}
          {imageLoadError && (
            <FlexBox className={cssClass.ERROR_CONTAINER}>
              <FontAwesome name={"frown-o"} className={cssClass.ERROR_ICON} /> Image load error
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
      <div className={cssClass.FOOTER_BAR}>
        <Button type="linkPlain" className={cssClass.DOWNLOAD_CONTAINER} onClick={onClickDownload}>
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonTextMobile}</span>
        </Button>
      </div>
    </div>
  );
};
