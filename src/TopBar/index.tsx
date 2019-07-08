import * as classnames from "classnames";
import * as PropTypes from "prop-types";
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
  title: React.ReactNode;
  onLogoClick?: Function;
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  logoHref: PropTypes.string.isRequired,
  title: PropTypes.node,
  onLogoClick: PropTypes.func,
};

/**
 * Global page-level header component.
 */
export class TopBar extends React.PureComponent<Props> {
  static propTypes = propTypes;

  static Button = TopBarButton;

  render() {
    const { children, className, title } = this.props;

    // If the last element is a "rounded" TopBarButton we need to add some additional padding to the right side.
    // To determine this we need to inspect the children;
    let needsRightPadding = false;
    const childrenArray = React.Children.toArray(children);
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
        <TopBarButton href={this.props.logoHref} onClick={this.props.onLogoClick} className="dewey-TopBar--logoLink">
          <Logo className="dewey--TopBar--logo" />
        </TopBarButton>
        {title && (
          <h1 className="dewey--TopBar--title" title={title}>
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
