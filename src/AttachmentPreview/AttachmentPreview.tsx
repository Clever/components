import * as classnames from "classnames";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { Button } from "src/Button/Button";
import { FlexBox, FlexItem } from "../flex";
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
  const ESC = 27;

  // function onKeyDownDownloadHandler(e) {
  //   if (e.key === "Enter") {
  //     onClickDownload(attachmentID);
  //   }
  // }

  function handleKeyUp(e) {
    console.log("\ne:", e);
    if (e.keyCode === ESC) {
      onClose();
    }
  }
  React.useEffect(() => {
    console.log("\nusing effect!");
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const preview = (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <div className={cssClass.BACKGROUND} aria-hidden="true" />
      <FlexBox className={cssClass.HEADER_BAR}>
        <FileAttachmentIcon className={cssClass.FILE_ICON} fileType={fileType} />
        <FlexBox grow className={cssClass.ATTACHMENT_NAME}>
          {attachmentName}
        </FlexBox>
        {/* TODO: add styling for Butoon */}
        <Button
          type="linkPlain"
          className={cssClass.DOWNLOAD_CONTAINER}
          tabIndex={0}
          onClick={() => onClickDownload(attachmentID)}
          // onKeyDown={(e) => onKeyDownDownloadHandler(e)}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonText || "Download"}</span>
        </Button>
        {/* TODO: add styling for Butoon */}
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
          <img
            // TODO: is this use of tabIndex kosher?
            tabIndex={0}
            src={attachmentURL}
            alt={"attachment preview"}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox className={cssClass.FOOTER_BAR}>
        <FlexItem
          grow
          className={cssClass.DOWNLOAD_CONTAINER}
          tabIndex={0}
          onClick={() => onClickDownload(attachmentID)}
          // onKeyDown={(e) => onKeyDownDownloadHandler(e)}
        >
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" />{" "}
          <span>{downloadButtonText || "Save"}</span>
        </FlexItem>
      </FlexBox>
    </div>
  );

  return preview;
};
