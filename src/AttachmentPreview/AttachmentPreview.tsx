import * as classnames from "classnames";
import * as React from "react";

import { FlexBox } from "src";

import "./AttachmentPreview.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  closePreview: () => void;
  title: string;
  // TODO: are we doing key/bucket or just attachmentURL?
  key: string;
  bucket: string;
}

export const cssClass = {
  CONTAINER: "AttachmentPreview",
  BACKGROUND: "AttachmentPreview--Background",
  HEADER_BAR: "AttachmentPreview--HeaderBar",
  PREVIEW_WINDOW: "AttachmentPreview--PreviewWindow",
  TITLE: "AttachmentPreview--Title",
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
    <div className={classnames(cssClass.CONTAINER)}>
      <div className={classnames(cssClass.BACKGROUND)} onClick={closePreview} aria-hidden="true" />
      <FlexBox className={classnames(cssClass.HEADER_BAR)}>
        <img src={imageSourceURL} alt={"attachment preview icon"} />
        <FlexBox className={classnames(cssClass.TITLE)}>{title}</FlexBox>
      </FlexBox>
      <FlexBox className={classnames(cssClass.PREVIEW_WINDOW)}>
        <img src={imageSourceURL} alt={"attachment preview icon"} />
      </FlexBox>
    </div>
  );

  return preview;
};
