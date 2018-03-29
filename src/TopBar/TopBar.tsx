import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {FlexBox} from "../flex";
import Heart from "./Heart";
import MenuToggle from "./MenuToggle";
import TopBarButton from "./TopBarButton";
import TopBarMenu from "./TopBarMenu";

import "./TopBar.less";

const TopBarColor = {
  BLUE: "blue",
  PURPLE: "purple",
  TEAL: "teal",
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(TopBarColor)),
  logo: PropTypes.node,
  logoLinkHref: PropTypes.string,
  logoLinkTarget: PropTypes.string,
  onToggleMenu: PropTypes.func,
  showHeart: PropTypes.bool,
  showMenuToggle: PropTypes.bool,
  title: PropTypes.node,
  titleWrap: PropTypes.bool,
};

const defaultProps = {
  color: TopBarColor.BLUE,
};

const cssClass = {
  CONTAINER: "dewey--TopBar",
  HEART: "dewey--TopBar--heart",
  LOGO_LINK: "dewey--TopBar--logo--link",
  LOGO: "dewey--TopBar--logo",
  TITLE: "dewey--TopBar--title",
  TITLE_WRAP: "dewey--TopBar--title--wrap",

  color: c => `dewey--TopBar--color--${c}`,
};

// TODO: Just use the official React typings to avoid this mess.
let UntypedReact = null;
UntypedReact = React;

/**
 * Global page-level header component.
 */
export default class TopBar extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  static Button = TopBarButton;
  static Color = TopBarColor;
  static Menu = TopBarMenu;

  render() {
    const {
      children,
      className,
      color,
      onToggleMenu,
      showHeart,
      showMenuToggle,
      title,
      titleWrap,
    } = this.props;

    return (
      <FlexBox
        alignItems="center"
        className={classnames(cssClass.CONTAINER, cssClass.color(color), className)}
      >
        {showMenuToggle && <MenuToggle onClick={onToggleMenu} />}
        {this._renderLogo()}
        {showHeart && <Heart className={cssClass.HEART} />}
        {title && (
          <h1
            className={classnames(cssClass.TITLE, titleWrap && cssClass.TITLE_WRAP)}
            title={title}
          >
            {title}
          </h1>
        )}
        {children}
      </FlexBox>
    );
  }

  _renderLogo() {
    const {logoLinkHref, logoLinkTarget, logo} = this.props;

    if (!logo) {
      return null;
    }

    const styledLogo = UntypedReact.cloneElement(logo, {
      className: classnames(logo.props.className, cssClass.LOGO),
    });
    if (!logoLinkHref) {
      return styledLogo;
    }

    return (
      <TopBarButton className={cssClass.LOGO_LINK} href={logoLinkHref} target={logoLinkTarget}>
        {styledLogo}
      </TopBarButton>
    );
  }
}
