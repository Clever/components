import * as classnames from "classnames";
import * as React from "react";

import "./AttachmentPreview.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  closePreview: () => void;
}

export const cssClass = {
  CONTAINER: "AttachmentPreview",
  BACKGROUND: "AttachmentPreview--Background",
  PREVIEW_WINDOW: "AttachmentPreview--PreviewWindow",
};

/**
 * TODO: Add short description.
 */
export const AttachmentPreview: React.FC<Props> = ({ children, className, closePreview }) => {
  // const [showingPreview, setShowingPreview] = React.useState(false);

  // function showPreview() {
  //   setShowingPreview(true);
  // }

  // function hidePreview() {
  //   setShowingPreview(false);
  // }

  const preview = (
    <div className={classnames(cssClass.CONTAINER)}>
      <div className={classnames(cssClass.BACKGROUND)} onClick={closePreview} aria-hidden="true" />
      <div className={classnames(cssClass.PREVIEW_WINDOW)}></div>
    </div>
  );

  return preview;
};
