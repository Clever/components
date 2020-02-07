import * as classnames from "classnames";
import * as React from "react";

import Logo from "../Logo";
import { FlexBox, Justify } from "../flex";
import { TopBarButton } from "./TopBarButton";

import "./index.less";
import Menu from "../Menu";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  logoHref: string;
  title?: React.ReactNode;
  customLogo?: React.ReactNode;
  onLogoClick?: Function;
}

/**
 * Global page-level header component.
 */
export class TopBar extends React.PureComponent<Props> {
  static Button = TopBarButton;

  render() {
    const { children, className, title, customLogo } = this.props;

    // If the last element is a "rounded" TopBarButton we need to add some additional padding to the right side.
    // To determine this we need to inspect the children;
    let needsRightPadding = false;
    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    if (childrenArray.length) {
      const lastItem = childrenArray[childrenArray.length - 1];
      const lastTrigger = lastItem.type === Menu ? lastItem.props.trigger : lastItem;
      if (lastTrigger && lastTrigger.type === TopBarButton && lastTrigger.props.round) {
        needsRightPadding = true;
      }
    }

    return (
      <FlexBox
        alignItems="center"
        className={classnames(
          "dewey--TopBar",
          className,
          needsRightPadding && "dewey--TopBar--rightPadding",
        )}
      >
        <TopBarButton
          href={this.props.logoHref}
          onClick={this.props.onLogoClick}
          className="dewey-TopBar--logoLink"
        >
          {customLogo || (
            <Logo className="dewey--TopBar--logo" svgClassName="dewey--TopBar--logo--mobile" />
          )}
        </TopBarButton>
        {title && (
          <h1 className="dewey--TopBar--title" title={title as any}>
            {title}
          </h1>
        )}
        <FlexBox alignItems="center" justify={Justify.END} grow>
          {children}
        </FlexBox>
      </FlexBox>
    );
  }
}
