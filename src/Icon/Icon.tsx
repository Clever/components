import * as React from "react";
import classnames from "classnames";
import lodash from "lodash";

import "./Icon.less";

import images from "./iconImages";

const CLASSNAMES = {
  CONTAINER: "Icon",
  size: size => `Icon--${size}`,
};

export function Icon(props) {
  const IconImage = images[`${props.name}.svg`];
  return (
    <span className={classnames(CLASSNAMES.CONTAINER, CLASSNAMES.size(props.size), props.className)}>
      <IconImage />
    </span>
  );
}

export const NAMES = {
  BLOCKS:             "blocks",
  BOOK:               "book",
  BULLSEYE:           "bullseye",
  CAMERA:             "camera",
  CHART:              "chart",
  CHAT:               "chat",
  CHAT_HEART:         "chat-heart",
  CHECKMARK:          "checkmark",
  CIRCLE_C:           "circle-c",
  CLOCK:              "clock",
  DIPLOMA:            "diploma",
  FUNNEL:             "funnel",
  GEAR:               "gear",
  GLASSES:            "glasses",
  GLUE:               "glue",
  GRAPH:              "graph",
  HAND_CLICK:         "hand-click",
  HANDSHAKE:          "handshake",
  HEADSET:            "headset",
  JUGGLER:            "juggler",
  LEADER:             "leader",
  LIGHTNING_JAR:      "lightning-jar",
  LOCK:               "lock",
  MAGNIFY_C:          "magnify-c",
  MAGNIFY_USER:       "magnify-user",
  MAN:                "man",
  MENU:               "menu",
  MICROPHONE:         "microphone",
  MICROSCOPE:         "microscope",
  MOBILE_APPS:        "mobile-apps",
  NO_ENTRY:           "no-entry",
  ORIGAMI:            "origami",
  PAPER:              "paper",
  PEN:                "pen",
  PEN_PAPER:          "pen-paper",
  PHONE:              "phone",
  PHONE_SYNC:         "phone-sync",
  PICKAX:             "pickax",
  PLAY_BUTTON:        "play",
  PORTAL_OPEN:        "portal-open",
  PRESENT_GIFT:       "present-gift",
  PRESENTATION:       "presentation",
  PRINTER:            "printer",
  QR:                 "qr",
  RIBBON_AWARD:       "ribbon-award",
  SCHOOL:             "school",
  SERVER:             "server",
  SHIELD:             "shield",
  SMILEY_FACE:        "smiley-face",
  SQUARE_C:           "square-c",
  SYNC_ARROWS:        "sync-arrows",
  TABLET:             "tablet",
  TARGET:             "target",
  THREE_PEOPLE:       "three-people",
  THREE_USERS:        "three-users",
  TICKET:             "ticket",
  TIE:                "tie",
  TROPHY:             "trophy",
  TYPEWRITER:         "typewriter",
  USER:               "user",
  WALLET:             "wallet",
  WEBSITE_DASHBOARD:  "website-dashboard",
  WEBSITE_HTML:       "website-html",
  WOMAN:              "woman",
};

export const SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

Icon.defaultProps = {
  size: "medium",
};

Icon.propTypes = {
  name: React.PropTypes.oneOf(lodash.values(NAMES)).isRequired,
  size: React.PropTypes.oneOf(lodash.values(SIZES)),
  className: React.PropTypes.string,
};

