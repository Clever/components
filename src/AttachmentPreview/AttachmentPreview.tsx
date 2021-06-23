// import * as classnames from "classnames";
import * as React from "react";

import { FlexBox } from "src";
import {
  AttachmentFileType,
  FileAttachmentIcon,
} from "src/MessagingAttachment/MessagingAttachment";

import "./AttachmentPreview.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  closePreview: () => void;
  title: string;
  // TODO: are we doing key/bucket or just attachmentURL?
  key: string;
  bucket: string;
  fileType: AttachmentFileType;
}

export const cssClass = {
  CONTAINER: "AttachmentPreview",
  BACKGROUND: "AttachmentPreview--Background",
  HEADER_BAR: "AttachmentPreview--HeaderBar",
  PREVIEW_WINDOW: "AttachmentPreview--PreviewWindow",
  TITLE: "AttachmentPreview--Title",
  FILE_ICON: "AttachmentPreview--FileIcon",
  // DOWNLOAD_BUTTON: "AttachmentPreview--DownloadButton",
  // CLOSE_BUTTON: "AttachmentPreview--CloseButton",
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
  key,
  bucket,
  fileType,
}) => {
  // const [showingPreview, setShowingPreview] = React.useState(false);

  // function showPreview() {
  //   setShowingPreview(true);
  // }

  // function hidePreview() {
  //   setShowingPreview(false);
  // }

  // const imageSourceURL = `${BASE_S3_URL}/${bucket}/${key}`;
  const imageSourceURL =
    "http://www.itcsales.co.uk/blog/wp-content/uploads/2018/05/Free-Desktop-Wallpaper-HD-1920-x-1080.jpg";
  // "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fppcorn.com%2Fus%2Fwp-content%2Fuploads%2Fsites%2F14%2F2016%2F01%2Fcute-raccoon-ppcorn.jpg&f=1&nofb=1";

  const preview = (
    <div className={cssClass.CONTAINER}>
      <div className={cssClass.BACKGROUND} onClick={closePreview} aria-hidden="true" />
      <FlexBox className={cssClass.HEADER_BAR}>
        <FileAttachmentIcon className={cssClass.FILE_ICON} fileType={fileType} />
        <FlexBox className={cssClass.TITLE}>{title}</FlexBox>
        {/* <FlexBox className={cssClass.DOWNLOAD_BUTTON} />
        <FlexBox className={cssClass.CLOSE_BUTTON} /> */}
      </FlexBox>
      <FlexBox className={cssClass.PREVIEW_WINDOW}>
        <img src={imageSourceURL} alt={"attachment preview icon"} />
      </FlexBox>
    </div>
  );

  return preview;
};
