import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import "./Item.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const cssClass = {
  CONTAINER: "List--Item",
  CONTENT_WRAPPER: "List--Item--ContentWrapper",
  CONTENT_ONCLICK: "List--Item--ContentWrapperClickable",

  type: type => `List--Item--${type}`,
};

export default class Item extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { children, className, onClick } = this.props;

    let Wrapper: Extract<keyof JSX.IntrinsicElements, "div" | "button"> = "div";
    if (onClick) {
      Wrapper = "button";
    }

    return (
      <li className={classnames(cssClass.CONTAINER, className)}>
        <Wrapper
          className={classnames(cssClass.CONTENT_WRAPPER, !!onClick && cssClass.CONTENT_ONCLICK)}
          onClick={onClick}
        >
          {children}
        </Wrapper>
      </li>
    );
  }
}
