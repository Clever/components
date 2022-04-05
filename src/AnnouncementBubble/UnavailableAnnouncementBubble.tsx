import * as React from "react";
import * as cx from "classnames";
import { FlexBox } from "../";

import "./UnavailableAnnouncementBubble.less";

type ColorTheme = "white" | "light" | "dark";

function cssClass(element: string) {
  return `UnavailableAnnouncementBubble--${element}`;
}

function cssClassWithColorTheme(element: string, colorTheme: ColorTheme) {
  return [
    `UnavailableAnnouncementBubble--${element}`,
    `UnavailableAnnouncementBubble--${element}--${colorTheme}`,
  ];
}

export interface Props {
  bubbleType: "unavailable";

  className?: string;
  colorTheme: ColorTheme;

  // Temporary props to allow overriding text with translations
  unavailableNoticeHeader: string;
  unavailableNoticeText: string;
}

export const UnavailableAnnouncementBubble: React.FC<Props> = ({
  className,
  colorTheme,
  unavailableNoticeHeader,
  unavailableNoticeText,
}: Props) => {
  // The light colorTheme icon is reused for the white colorTheme as well.
  const iconName =
    colorTheme === "dark"
      ? "megaphone-slash-darkColorTheme.svg"
      : "megaphone-slash-lightColorTheme.svg";

  return (
    <FlexBox
      grow
      alignItems="center"
      justify="start"
      className={cx(cssClassWithColorTheme("container", colorTheme), className)}
    >
      <img alt="" className={cssClass("icon")} src={require(`./${iconName}`)} />
      <div className={cssClass("textContainer")}>
        <div className={cx(cssClassWithColorTheme("header", colorTheme))}>
          {unavailableNoticeHeader}
        </div>
        <div className={cx(cssClassWithColorTheme("text", colorTheme))}>
          {unavailableNoticeText}
        </div>
      </div>
    </FlexBox>
  );
};
