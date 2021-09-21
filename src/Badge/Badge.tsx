import * as classnames from "classnames";
import * as React from "react";

import { Values } from "../utils/types";

import "./Badge.less";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  superscript?: boolean;
  color?: Values<typeof Color>;
  size?: Values<typeof Size>;
}

export const cssClass = {
  CONTAINER: "Badge",
  EMPTY: "Badge--empty",
  SUPER: "Badge--super",
  color: (c) => `Badge--${c}`,
  size: (s) => `Badge--${s}`,
};

const Size = {
  S: "s",
  M: "m",
  L: "l",
} as const;

const Color = {
  RED: "red",
  BLUE: "blue",
  GRAY: "gray",
} as const;

const defaultProps = {
  color: Color.BLUE,
  size: Size.M,
};

export class Badge extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  static Color = Color;
  static Size = Size;

  render() {
    const { color, children, className, size, superscript } = this.props;
    const classes = classnames(
      cssClass.CONTAINER,
      children === undefined && cssClass.EMPTY,
      color && cssClass.color(color),
      size && cssClass.size(size),
      superscript && cssClass.SUPER,
      className,
    );

    return <span className={classes}>{children}</span>;
  }
}
