// import * as classnames from "classnames";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";

import { FlexBox } from "../flex";
import { AttachmentFileType, FileAttachmentIcon } from "../MessagingAttachment/MessagingAttachment";

import "./AttachmentPreview.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  closePreview: () => void;
  title: string;
  // TODO: are we doing key/bucket or just attachmentURL?
  fileURL: string;
  fileType: AttachmentFileType;
}

export const cssClass = {
  CONTAINER: "AttachmentPreview",
  BACKGROUND: "AttachmentPreview--Background",
  HEADER_BAR: "AttachmentPreview--HeaderBar",
  FILE_ICON: "AttachmentPreview--FileIcon",
  TITLE: "AttachmentPreview--Title",
  DOWNLOAD_CONTAINER: "AttachmentPreview--DownloadContainer",
  DOWNLOAD_BUTTON: "AttachmentPreview--DownloadButton",
  CLOSE_BUTTON: "AttachmentPreview--CloseButton",
  PREVIEW_WINDOW: "AttachmentPreview--PreviewWindow",
  IMAGE_CONTAINER: "AttachmentPreview--ImageContainer",
};

// TODO: set this
// TODO: make this work for both dev/prod environments
// const BASE_S3_URL = "";

/**
 * TODO: Add short description.
 */
export const AttachmentPreview: React.FC<Props> = ({
  children,
  className,
  closePreview,
  title,
  fileURL,
  fileType,
}) => {
  // const [showingPreview, setShowingPreview] = React.useState(false);

  // function showPreview() {
  //   setShowingPreview(true);
  // }

  // function hidePreview() {
  //   setShowingPreview(false);
  // }

  const preview = (
    <div className={cssClass.CONTAINER}>
      <div className={cssClass.BACKGROUND} onClick={closePreview} aria-hidden="true" />
      <FlexBox className={cssClass.HEADER_BAR}>
        <FileAttachmentIcon className={cssClass.FILE_ICON} fileType={fileType} />
        <FlexBox grow className={cssClass.TITLE}>
          {title}
        </FlexBox>
        <FlexBox className={cssClass.DOWNLOAD_CONTAINER}>
          <FontAwesome className={cssClass.DOWNLOAD_BUTTON} name="download" /> <span>Download</span>
        </FlexBox>
        <FlexBox className={cssClass.CLOSE_BUTTON}>
          <FontAwesome name="times" />
        </FlexBox>
      </FlexBox>
      <FlexBox className={cssClass.PREVIEW_WINDOW}>
        <FlexBox className={cssClass.IMAGE_CONTAINER} onClick={closePreview}>
          <img
            src={fileURL}
            alt={"attachment preview"}
            // onClick={(e) => e.stopPropagation()}
          />
        </FlexBox>
      </FlexBox>
    </div>
  );

  return preview;
};
