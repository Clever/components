import * as React from "react";
import * as classNames from "classnames";

import "./MessagingAvatar.less";

const cssClasses = {
  AVATAR_CIRCLE: "Avatar--Circle",
  AVATAR_TEXT: "Avatar--Text",
};

type Props = {
  className?: string;
  text: string;
  color?: { color: string; seed?: undefined } | { seed: string; color?: undefined };
};

export const MessagingAvatar: React.FC<Props> = ({ className, text, color }: Props) => {
  return (
    <div
      className={classNames(cssClasses.AVATAR_CIRCLE, className)}
      // If defined, use color. Otherwise, use seed to determine color.
      // If all else fails, we can use text as the seed to determine color.
      style={{
        backgroundColor:
          "color" in color
            ? color.color
            : `hsl(${_determineAvatarHue(color.seed || text)}, 80%, 85%)`,
      }}
    >
      <div className={cssClasses.AVATAR_TEXT}>{text}</div>
    </div>
  );
};

// Helper function: Uses a string to determine the hue value for an HSL
//  (Hue, Saturation, Lightness) color, to be used in an inline style.
//  Unlikely to be the final method, waiting for direction from Design.
function _determineAvatarHue(determiningString: string): number {
  let hash = 0;
  for (let i = 0; i < determiningString.length; i++) {
    hash = determiningString.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Converts to a 32bit int
  }

  // Hue values for HSL color function are between 0 and 359,
  //  for degrees on the color wheel.
  return hash % 360;
}
