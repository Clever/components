import * as React from "react";
import * as classnames from "classnames";
import * as _ from "lodash";

import icons from "./icons";
import { Values } from "../utils/types";

import "./Icon.less";

export interface Props {
  name: Values<typeof Icon.names>;
  size?: Values<typeof Icon.sizes>;
  className?: string;
}

interface IconComponent extends React.FunctionComponent<Props> {
  names: typeof names;
  sizes: typeof sizes;
}

export const cssClass = {
  CONTAINER: "Icon",
  size: (size) => `Icon--${size}`,
};

export const Icon: IconComponent = function Icon(props) {
  const IconImage = icons[props.name];
  return (
    <span className={classnames(cssClass.CONTAINER, cssClass.size(props.size), props.className)}>
      <IconImage />
    </span>
  );
};

const names = {
  BLOCKS: "blocks",
  BOOK: "book",
  BULLSEYE: "bullseye",
  CAMERA: "camera",
  CHART: "chart",
  CHAT: "chat",
  CHAT_HEART: "chat-heart",
  CHECKMARK: "checkmark",
  CIRCLE_C: "circle-c",
  CLEVER_ACADEMY: "clever-academy",
  CLOCK: "clock",
  CLOSE_FLOATING_BUTTON: "close-floating-button",
  DIPLOMA: "diploma",
  FUNNEL: "funnel",
  GEAR: "gear",
  GLASSES: "glasses",
  GLUE: "glue",
  GRAPH: "graph",
  HAND_CLICK: "hand-click",
  HANDSHAKE: "handshake",
  HEADSET: "headset",
  JUGGLER: "juggler",
  LEADER: "leader",
  LIGHTNING_JAR: "lightning-jar",
  LOCK: "lock",
  MAP: "map",
  MAGIC_LAMP: "magic-lamp",
  MAGNIFY_C: "magnify-c",
  MAGNIFY_USER: "magnify-user",
  MAN: "man",
  MENU: "menu",
  MICROPHONE: "microphone",
  MICROSCOPE: "microscope",
  MOBILE_APPS: "mobile-apps",
  NO_ENTRY: "no-entry",
  ORIGAMI: "origami",
  PAPER: "paper",
  PEN: "pen",
  PEN_PAPER: "pen-paper",
  PHONE: "phone",
  PHONE_SYNC: "phone-sync",
  PICKAX: "pickax",
  PLAY_BUTTON: "play",
  PORTAL_OPEN: "portal-open",
  PRESENT_GIFT: "present-gift",
  PRESENTATION: "presentation",
  PRINTER: "printer",
  QR: "qr",
  RIBBON_AWARD: "ribbon-award",
  SCHOOL: "school",
  SERVER: "server",
  SHIELD: "shield",
  SHOPPING_CART: "shopping-cart",
  SMILEY_FACE: "smiley-face",
  SQUARE_C: "square-c",
  SYNC_ARROWS: "sync-arrows",
  TABLET: "tablet",
  TARGET: "target",
  THREE_PEOPLE: "three-people",
  THREE_USERS: "three-users",
  TICKET: "ticket",
  TIE: "tie",
  TROPHY: "trophy",
  TYPEWRITER: "typewriter",
  USER: "user",
  WALLET: "wallet",
  WEBSITE_DASHBOARD: "website-dashboard",
  WEBSITE_HTML: "website-html",
  WOMAN: "woman",
} as const;

Icon.names = names;

const sizes = {
  XXS: "2xs",
  XS: "xs",
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

Icon.sizes = sizes;

Icon.defaultProps = {
  size: "medium",
};
