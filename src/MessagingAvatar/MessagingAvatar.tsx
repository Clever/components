import * as React from "react";
import * as classNames from "classnames";

import "./MessagingAvatar.less";
import { convertNameToInitials } from "./utils";

const cssClasses = {
  IMAGE: "Avatar--Image",
  CIRCLE: "Avatar--Circle",
  TEXT: "Avatar--Text",
};

type Props = {
  className?: string;
  text: string;
  color:
    | { color: string; seed?: undefined }
    | {
        /** A piece of data used to select the color to be used. Should generally be a consistent piece of data about the user, usually their id. */
        seed: string;
        color?: undefined;
      };
  imageSrc?: string;
};

export const MessagingAvatar: React.FC<Props> = ({ className, text, color, imageSrc }: Props) => {
  // If an imageSrc is provided, it takes precedent over displaying text
  if (imageSrc) {
    return (
      <img
        alt={""}
        aria-hidden={"true"}
        className={classNames(cssClasses.IMAGE, className)}
        src={imageSrc}
      />
    );
  }

  return (
    <div
      className={classNames(cssClasses.CIRCLE, className)}
      // If defined, use color. Otherwise, use seed to determine color.
      style={{
        backgroundColor: color.color || `#${_determineAvatarColor(color.seed)}`,
      }}
    >
      <div className={cssClasses.TEXT}>{_getInitialsFromText(text)}</div>
    </div>
  );
};

// Helper function: Uses the convertNameToInitials util function to get
//  appropriate initials from the text prop, with a precautionary fallback.
function _getInitialsFromText(text: string): string {
  try {
    return convertNameToInitials(text);
  } catch (e) {
    return "";
  }
}

// Helper function: Uses a string as the seed to fairly randomly determine
//  the hex color for this avatar.
function _determineAvatarColor(determiningString: string): string {
  const colorPool = [
    "C9F2F1",
    "FDB9C0",
    "FAE5B8",
    "D9BDFD",
    "B4EAD8",
    "BFCEFF",
    "FFBADE",
    "FDBD81",
  ];

  let hash = 0;
  for (let i = 0; i < determiningString.length; i++) {
    hash = determiningString.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Converts to a 32bit int
  }

  return colorPool[Math.abs(hash % colorPool.length)];
}
