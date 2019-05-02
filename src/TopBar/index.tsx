import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Logo from "../Logo";
import { FlexBox, Justify } from "../flex";
import { TopBarButton } from "./TopBarButton";
import { TopBarMenu } from "./TopBarMenu";

import "./index.less";

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  logoHref: PropTypes.string.isRequired,
  title: PropTypes.node,
};

/**
 * Global page-level header component.
 */
export class TopBar extends React.PureComponent {
  static propTypes = propTypes;

  static Button = TopBarButton;
  static Menu = TopBarMenu;

  render() {
    const { children, className, title } = this.props;

    return (
      <FlexBox alignItems="center" className={classnames("dewey--TopBar", className)}>
        <TopBarButton href={this.props.logoHref} className="dewey-TopBar--logoLink">
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
