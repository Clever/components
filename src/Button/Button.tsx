import * as _ from "lodash";
import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import { Values } from "../utils/types";

import "./Button.less";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  value?: React.ReactNode;
  href?: string;
  target?: "_self" | "_blank";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  submit?: boolean;
  style?: React.CSSProperties;
  underlined?: boolean;
  ariaLabel?: string;
  dataTestID?: string;
  [additionalProp: string]: any;
}

type ButtonType = Values<typeof Type>;
type ButtonSize = Values<typeof Size>;

const Size = {
  S: "small",
  M: "regular",
  L: "large",
} as const;

const Type = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DESTRUCTIVE: "destructive",
  SECONDARY_DESTRUCTIVE: "secondaryDestructive",
  LINK: "link",
  LINK_PLAIN: "linkPlain",
  PLAIN: "plain",
} as const;

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(_.values(Type)),
  size: PropTypes.oneOf(_.values(Size)),
  value: PropTypes.node,
  href: PropTypes.string,
  target: PropTypes.oneOf(["_self", "_blank"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  style: PropTypes.object,
  underlined: PropTypes.bool,
  ariaLabel: PropTypes.string,
  dataTestID: PropTypes.string,
};

const defaultProps = {
  type: Type.SECONDARY,
  size: Size.M,
  target: "_blank",
};

export class Button extends React.PureComponent<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static Size = Size;
  static Type = Type;

  _buttonRef;

  focus() {
    if (this._buttonRef) {
      this._buttonRef.focus();
    }
  }

  blur() {
    if (this._buttonRef) {
      this._buttonRef.blur();
    }
  }

  render() {
    const {
      ariaLabel,
      dataTestID,
      children,
      className,
      disabled,
      href,
      onClick,
      size,
      style,
      submit,
      target,
      type,
      value,
      underlined,
    } = this.props;
    const additionalProps = _.omit(
      this.props,
      Object.keys(propTypes) as (keyof typeof propTypes)[],
    );

    if ((type === Type.DESTRUCTIVE || type === Type.SECONDARY_DESTRUCTIVE) && size === Size.S) {
      throw new Error("Small destructive buttons are not supported");
    }

    if (href && submit) {
      throw new Error("Buttons with href do not support the submit option");
    }

    if (type !== Type.LINK_PLAIN && underlined) {
      throw new Error(`Underlined ${type} button not supported`);
    }

    const classes = classnames(
      `Button Button--${type}`,
      `Button--${size}`,
      className,
      underlined ? "Button--linkUnderlined" : "",
    );

    const content = children || value;
    const aria = ariaLabel || (typeof content === "string" ? content : null);

    if (href == null || disabled) {
      // use <button>s for all disabled links and things with no href prop (buttons)
      return (
        <button
          {...additionalProps}
          aria-label={aria}
          data-testid={dataTestID}
          className={classes}
          disabled={disabled}
          onClick={onClick}
          ref={(ref) => {
            this._buttonRef = ref;
          }}
          style={style}
          type={submit ? "submit" : "button"}
        >
          {content}
        </button>
      );
    }
    return (
      <a
        {...additionalProps}
        aria-label={aria}
        className={classes}
        href={href}
        onClick={onClick}
        ref={(ref) => {
          this._buttonRef = ref;
        }}
        style={style}
        target={target}
      >
        {content}
      </a>
    );
  }
}
