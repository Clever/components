import "core-js";

import {FlexBox, FlexItem} from "../flex";
import * as classnames from "classnames";
import * as React from "react";

import "./Card.less";

export type Props = {
  children: React.ReactNode;
  className?: string;
  component?: string;
  footer?: React.ReactNode;
  htmlProps?: React.ReactNode;
  inline?: boolean;
  noFooterPadding?: boolean;
  noPadding?: boolean;
  raised?: boolean;
  title?: React.ReactNode;
};

export const Classes = {
  BODY: "Card--body",
  NO_PADDING: "Card--body--noPadding",
  CONTAINER: "Card",
  FOOTER: "Card--footer",
  FOOTER_NO_PADDING: "Card--footer--noPadding",
  HEADER: "Card--header",
  INLINE: "Card--inline",
  RAISED: "Card--raised",
  TITLE: "Card--header--title",
};

export default class Card extends React.PureComponent {
  static defaultProps = {
    component: "div",
  };

  render() {
    const {
      children,
      className,
      component: Wrapper,
      footer,
      inline,
      noFooterPadding,
      noPadding,
      raised,
      title,
    } = this.props;

    return (
      <Wrapper
        className={classnames(
          Classes.CONTAINER,
          inline && Classes.INLINE,
          raised && Classes.RAISED,
          className,
        )}
      >
        {title && (
          <FlexBox className={Classes.HEADER} component="header">
            <FlexItem className={Classes.TITLE} grow>
              {title}
            </FlexItem>
          </FlexBox>
        )}

        <div className={classnames(Classes.BODY, noPadding && Classes.NO_PADDING)}>{children}</div>

        {footer && (
          <div className={classnames(Classes.FOOTER, noFooterPadding && Classes.FOOTER_NO_PADDING)}>
            {footer}
          </div>
        )}
      </Wrapper>
    );
  }
}
