import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as cx from "classnames";

import { FlexBox } from "src/flex";
// import LoadingSpinner from "../LoadingSpinner";

import "./MessagingAttachment.less";

function cssClass(element: string) {
  return `MessagingAttachment--${element}`;
}

type Props = {
  attachmentID: string;
  errorMsg?: string;
  icon: React.ReactNode;
  onClickAttachment: (attachmentID: string) => void;
  onRemoveAttachment?: (attachmentID: string) => void;
  title: string;
  subtitle?: string;
  // TODO: better name? short/small?
  isUpload?: boolean;
};

export const MessagingAttachment: React.FC<Props> = ({
  // todo use this?
  attachmentID,
  errorMsg,
  icon,
  onClickAttachment,
  onRemoveAttachment,
  title,
  subtitle,
  isUpload,
}: Props) => {
  return (
    <FlexBox
      className={cx(cssClass("Container"), isUpload && cssClass("Short"))}
      onClick={onClickAttachment}
    >
      {/* only show reply remove attachment button if onRemoveAttachment callback provided */}
      {onRemoveAttachment && (
        <button className={cssClass("CloseButton")} onClick={() => onRemoveAttachment}>
          <FontAwesome name="times" className={cssClass("CloseIcon")} />
        </button>
      )}
      <FlexBox className={cssClass("IconContainer")}>{icon}</FlexBox>
      <FlexBox className={cssClass("TextContainer")} column>
        <span className={cssClass("title")}>{errorMsg || title}</span>
        {subtitle && <span className={cssClass("subtitle")}>{subtitle}</span>}
      </FlexBox>
    </FlexBox>
  );
};

// /// Sub-components, exported icon components to be used by consumers /// //

type AttachmentIconProps = {
  isUpload?: boolean;
};

export function FileAttachmentIcon({ isUpload }: AttachmentIconProps) {
  return (
    <img
      src={require(isUpload
        ? "./icons/draft-attachment-doc.svg"
        : "./icons/sent-attachment-doc-download.svg")}
      className={cssClass("AttachmentTypeIcon")}
      alt="FileAttachment icon"
    />
  );
}

export function ImageAttachmentIcon({ isUpload }: AttachmentIconProps) {
  return (
    <img
      src={require(isUpload
        ? "./icons/draft-attachment-image.svg"
        : "./icons/sent-attachment-image-view.svg")}
      className={cssClass("AttachmentTypeIcon")}
      alt="ImageAttachment icon"
    />
  );
}

export function AudioAttachmentIcon({ isUpload }: AttachmentIconProps) {
  return (
    <img
      src={require(isUpload
        ? "./icons/draft-attachment-audio.svg"
        : "./icons/sent-attachment-audio-download.svg")}
      className={cssClass("AttachmentTypeIcon")}
      alt="AudioAttachment icon"
    />
  );
}

// TODO: is this necessary? Helpful?
// export function LoadingSpinnerIcon() {
//   return <LoadingSpinner size={"s"} />;
// }
